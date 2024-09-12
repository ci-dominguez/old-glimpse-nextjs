import { NextResponse, type NextRequest } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';
import { db } from '@/db/db';
import { users, colorSystems, subscriptionTiers } from '@/db/schema';
import { authenticateUser, handleApiError } from '@/utils/apiHandlers';
import { eq, sql } from 'drizzle-orm';

//Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

//Define input schema
const promptSchema = z.object({
  prompt: z.string().min(1).max(200),
  mode: z.enum(['light', 'dark']),
});

//Define output schema
const colorSchema = z
  .string()
  .regex(/^okHsl\(\d{1,3}\s\d{1,3}%\s\d{1,3}%\)$/, 'Invalid color format');
const responseSchema = z.object({
  colors: z.array(colorSchema).length(6),
});

//Define system prompts for light and dark mode palettes
const LIGHT_MODE_SYSTEM_PROMPT =
  'You are an expert in color theory and design systems. Generate a harmonious color palette for light mode interfaces based on the given description. Consider accessibility, color harmony principles (complementary, analogous, or triadic), and perceptual uniformity. Respond ONLY with 5 OKHsl main color values and 1 light background color, separated by commas, in the format: okHsl(H S% L%). For the main colors: Use hue values between 0-360, saturation between 50-80%, lightness between 40-60%. For the background color: Use a neutral tone with saturation below 10%, lightness between 85-95% for a light background. Ensure sufficient contrast between colors for accessibility, especially between the main colors and the light background. Use a wide gamut to allow for vibrant and muted colors while maintaining readability on the light background.';

const DARK_MODE_SYSTEM_PROMPT =
  'You are an expert in color theory and design systems. Generate a harmonious color palette for dark mode interfaces based on the given description. Consider accessibility, color harmony principles (complementary, analogous, or triadic), and perceptual uniformity. Respond ONLY with 5 OKHsl main color values and 1 dark background color, separated by commas, in the format: okHsl(H S% L%). For the main colors: Use hue values between 0-360, saturation between 50-80%, lightness between 60-80% for better visibility on dark backgrounds. For the background color: Use a neutral tone with saturation below 10%, lightness between 5-15% for a dark background. Ensure sufficient contrast between colors for accessibility, especially between the main colors and the dark background. Use a wide gamut to allow for vibrant and muted colors while maintaining readability and reducing eye strain in dark interfaces.';

//Check if user has any generations and storage left
async function checkUserLimits(userId: string) {
  const [user] = await db
    .select({
      currMonthGenerations: users.currMonthColorSystemGenerations,
      totalStored: users.totalStoredColorSystems,
      subscriptionTierId: users.currentSubscriptionTierId,
    })
    .from(users)
    .where(eq(users.id, userId));

  if (!user) {
    throw new Error('User not found');
  }

  const [subscription] = await db
    .select({
      monthlyLimit: subscriptionTiers.monthlyColorSystemGenerationLimit,
      maxStorage: subscriptionTiers.maxStoredColorSystems,
    })
    .from(subscriptionTiers)
    .where(eq(subscriptionTiers.id, user.subscriptionTierId));

  if (!subscription) {
    throw new Error('Subscription not found');
  }

  //Return true/false based on user limits and current count
  return {
    canGenerate: user.currMonthGenerations < subscription.monthlyLimit,
    canStore: user.totalStored < subscription.maxStorage,
  };
}

export async function POST(req: NextRequest) {
  //Validate API key
  if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
    console.error('OpenAI API key is not set');
    return NextResponse.json(
      { message: 'Server configuration error: OpenAI API key is not set' },
      { status: 500 }
    );
  }

  try {
    //Look up user in database
    const user = await authenticateUser(req);

    const dbUserId = user.id;

    try {
      //Parse and validate request body
      const body = await req.json();
      const parseResult = promptSchema.safeParse(body);

      if (!parseResult.success) {
        console.error('Invalid input:', parseResult.error);
        return NextResponse.json(
          { message: 'Invalid input: ' + parseResult.error.issues[0].message },
          { status: 400 }
        );
      }

      const { prompt, mode } = parseResult.data;

      //Select prompt based on the mode
      const systemPrompt =
        mode === 'light' ? LIGHT_MODE_SYSTEM_PROMPT : DARK_MODE_SYSTEM_PROMPT;

      const { canGenerate, canStore } = await checkUserLimits(dbUserId);

      //Check if user can generate based on subscription limits
      if (!canGenerate) {
        return NextResponse.json(
          { error: 'Monthly color system generation limit reached' },
          { status: 403 }
        );
      }

      if (!canStore) {
        return NextResponse.json(
          { error: 'Maximum stored color system limit reached' },
          { status: 403 }
        );
      }

      //Call OpenAI API
      console.log('Calling OpenAI API with prompt:', prompt, 'and mode:', mode);

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt },
        ],
        max_tokens: 100,
        temperature: 0.8,
      });

      //Parse and validate AI response
      const aiResp = completion.choices[0].message.content;
      const colors = aiResp?.split(',').map((color) => color.trim()) || [];
      const { colors: validatedColors } = responseSchema.parse({ colors });

      const baseColors = validatedColors.slice(0, 5) as [
        string,
        string,
        string,
        string,
        string
      ];
      const backgroundColor = validatedColors[5];

      let colorSystemId: string | undefined;

      console.log('OpenAI API response:', aiResp);

      if (canStore && canGenerate) {
        const [newColorSystem] = await db
          .insert(colorSystems)
          .values({
            userId: dbUserId,
            name: `My ${
              mode.charAt(0).toUpperCase() + mode.slice(1)
            } Color System ✨`,
            description: prompt,
            mode,
            baseColors,
            backgroundColor,
          })
          .returning({ id: colorSystems.id });

        colorSystemId = newColorSystem.id;

        await db
          .update(users)
          .set({
            totalColorSystemGenerations: sql`${users.totalColorSystemGenerations} + 1`,
            currMonthColorSystemGenerations: sql`${users.currMonthColorSystemGenerations} + 1`,
            totalStoredColorSystems: sql`${users.totalStoredColorSystems} + 1`,
          })
          .where(eq(users.id, dbUserId));
      }
    } catch (error) {
      console.error('Error in API route:', error);
      return NextResponse.json(
        {
          message: `Unexpected error: ${
            error instanceof Error ? error.message : 'Unknown error'
          }`,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    return handleApiError(error);
  }
}

export async function GET(req: NextRequest) {
  try {
    //Look up user in database
    const user = await authenticateUser(req);

    //Fetch all color systems for user
    const systems = await db
      .select({
        id: colorSystems.id,
        name: colorSystems.name,
        description: colorSystems.description,
      })
      .from(colorSystems)
      .where(eq(colorSystems.userId, user.id));

    return NextResponse.json(systems);
  } catch (error) {
    return handleApiError(error);
  }
}

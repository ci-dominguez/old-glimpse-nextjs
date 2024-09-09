import { NextResponse, type NextRequest } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import OpenAI from 'openai';
import { z } from 'zod';

//Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);

  //Check if user is authenticated
  if (!userId) {
    console.error('User is not authenticated');
    return NextResponse.json(
      { message: 'User is not authenticated' },
      { status: 401 }
    );
  }

  try {
    //Validate API key
    if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
      console.error('OpenAI API key is not set');
      return NextResponse.json(
        { message: 'Server configuration error: OpenAI API key is not set' },
        { status: 500 }
      );
    }

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

    const aiResp = completion.choices[0].message.content;
    console.log('OpenAI API response:', aiResp);

    //Parse and validate AI response
    const colors = aiResp?.split(',').map((color) => color.trim()) || [];
    const validationResult = responseSchema.safeParse({ colors });

    if (!validationResult.success) {
      console.error('Invalid response from AI:', colors);
      return NextResponse.json(
        {
          message:
            'Invalid response from AI: Incorrect number or format of colors',
          details: colors,
          error: validationResult.error.format(),
        },
        { status: 500 }
      );
    }

    // Return validated colors
    return NextResponse.json({ colors: validationResult.data.colors });
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
}

import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';

//Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

//Define input schema
const promptSchema = z.object({
  prompt: z.string().min(1).max(200),
});

//Define output schema
const colorSchema = z
  .string()
  .regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid color format');
const responseSchema = z.object({
  colors: z.array(colorSchema).length(5),
});

const SYSTEM_PROMPT =
  'You are an expert in branding and graphic design with deep knowledge of color theory. Generate a perfect color palette based on the given description. Use your expertise to create a harmonious set of colors. Respond ONLY with 5 hex color codes, separated by commas, without any additional text or explanation.';

export async function POST(req: Request) {
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

    const { prompt } = parseResult.data;

    //Call OpenAI API
    console.log('Calling OpenAI API with prompt:', prompt);
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt },
      ],
      max_tokens: 30,
      temperature: 0.7,
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

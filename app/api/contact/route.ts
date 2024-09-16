import { NextResponse } from 'next/server';
import { z } from 'zod';
import { contactMsgSchema } from '@/utils/validations/contactMsgSchema';
import { db } from '@/db/db';
import { contactMsgs } from '@/db/schema';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validateData = contactMsgSchema.parse(body);

    //Create new msg
    const newContactMsg = await db.insert(contactMsgs).values({
      firstName: validateData.first_name,
      lastName: validateData.last_name,
      email: validateData.email,
      message: validateData.message,
    });

    return NextResponse.json(
      {
        message: 'Message sent successfully',
        contactMsg: newContactMsg,
      },
      { status: 201 }
    );
  } catch (error) {
    //Zod error
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: 'Invalid input',
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    //Internal error
    console.error('Error creating contact message:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

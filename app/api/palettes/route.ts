import { NextResponse, type NextRequest } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { db } from '@/db/db';
import { users, colorPalettes } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  const { userId: clerkUserId } = getAuth(req);

  if (!clerkUserId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    //Fetch the database user.id for the authenticated user
    const [user] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.clerkId, clerkUserId));

    if (!user) {
      console.error('Authenticated user not found in database');
      return NextResponse.json(
        { error: 'User not found in the system' },
        { status: 404 }
      );
    }

    //Fetch all palettes for the authenticated user
    const palettes = await db
      .select({
        id: colorPalettes.id,
        name: colorPalettes.name,
        description: colorPalettes.description,
      })
      .from(colorPalettes)
      .where(eq(colorPalettes.userId, user.id));

    return NextResponse.json(palettes);
  } catch (error) {
    console.error('Error fetching palettes:', error);
    return NextResponse.json(
      { error: 'Error fetching palettes' },
      { status: 500 }
    );
  }
}

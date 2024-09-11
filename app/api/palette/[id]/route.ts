import { NextResponse, type NextRequest } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { db } from '@/db/db';
import { users, colorPalettes } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId: clerkUserId } = getAuth(req);
  const { id: paletteId } = params;

  try {
    //Fetch palette data
    const [palette] = await db
      .select()
      .from(colorPalettes)
      .where(eq(colorPalettes.id, paletteId));

    if (!palette) {
      return NextResponse.json({ error: 'Palette not found' }, { status: 404 });
    }

    //Return palette immediately if it's public (regardless of authentication)
    if (!palette.isPrivate) {
      return NextResponse.json(palette);
    }

    //Checks for private palettes

    //Is user authenticated
    if (!clerkUserId) {
      return NextResponse.json(
        { error: 'Authentication is required to view this private palette' },
        { status: 401 }
      );
    }

    //Fetch the database user.id for the authenticated user
    const [user] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.clerkId, clerkUserId));

    if (!user) {
      console.error('Authenticated user not found in database');
      return NextResponse.json(
        { error: 'User not found in the system' },
        { status: 500 }
      );
    }

    //Is user the owner of the palette
    if (user.id !== palette.userId) {
      return NextResponse.json(
        { error: 'You do not have permission to view this private palette' },
        { status: 403 }
      );
    }

    //Return the palette after all checks pass
    return NextResponse.json(palette);
  } catch (error) {
    console.error('Error processing palette request:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}

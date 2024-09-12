import { NextResponse, type NextRequest } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { db } from '@/db/db';
import { users, colorSystems } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId: clerkUserId } = getAuth(req);

  const { id: colorSystemId } = params;

  try {
    //Fetch color system data
    const [colorSystem] = await db
      .select()
      .from(colorSystems)
      .where(eq(colorSystems.id, colorSystemId));

    if (!colorSystem) {
      return NextResponse.json(
        { error: 'Color system not found' },
        { status: 404 }
      );
    }

    //Return color system immediately if it's public (regardless of authentication)
    if (!colorSystem.isPrivate) {
      return NextResponse.json(colorSystem);
    }

    //Checks for private color systems

    //Is user authenticated
    if (!clerkUserId) {
      return NextResponse.json(
        {
          error: 'Authentication is required to view this private color system',
        },
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

    //Is user the owner of the color system
    if (user.id !== colorSystem.userId) {
      return NextResponse.json(
        { error: 'You do not have permission to view this color system' },
        { status: 403 }
      );
    }

    //Return the color system after all checks pass
    return NextResponse.json(colorSystem);
  } catch (error) {
    console.error('Error processing color system request:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { db } from '@/db/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function authenticateUser(req: NextRequest) {
  const { userId: clerkUserId } = getAuth(req);

  if (!clerkUserId) {
    throw new Error('User is not authenticated');
  }

  const [user] = await db
    .select({
      id: users.id,
    })
    .from(users)
    .where(eq(users.clerkId, clerkUserId));

  if (!user) {
    throw new Error('User not found in database');
  }

  return user;
}

export function handleApiError(error: unknown) {
  console.error('API Error:', error);
  if (error instanceof Error) {
    return NextResponse.json({ message: error.message }, { status: 401 });
  }
  return NextResponse.json(
    { message: 'An unexpected error occurred' },
    { status: 500 }
  );
}

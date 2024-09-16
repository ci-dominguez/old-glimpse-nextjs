import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser, handleApiError } from '@/utils/apiUtils/authUtils';

export async function GET(req: NextRequest) {
  try {
    const user = await authenticateUser(req);
    return NextResponse.json({ id: user.id });
  } catch (error) {
    return handleApiError(error);
  }
}

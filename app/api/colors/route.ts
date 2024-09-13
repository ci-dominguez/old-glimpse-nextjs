import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/db';
import { colors } from '@/db/schema';
import { inArray } from 'drizzle-orm';
import { createOrRetrieveColor } from '@/utils/apiUtils/colorUtils';

export async function POST(req: NextRequest) {
  try {
    const { okhslColor } = await req.json();
    console.log('Received okhslColor:', okhslColor);

    const colorId = await createOrRetrieveColor(okhslColor);

    return NextResponse.json({ id: colorId });
  } catch (error) {
    console.error('Error creating color:', error);
    return NextResponse.json(
      { error: 'Failed to create color' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const ids = searchParams.get('ids');

    if (!ids) {
      return NextResponse.json(
        { error: 'No color IDs provided' },
        { status: 400 }
      );
    }

    const colorIds = ids.split(',');

    const colorDetails = await db
      .select()
      .from(colors)
      .where(inArray(colors.id, colorIds));

    if (colorDetails.length === 0) {
      return NextResponse.json(
        { error: 'No colors found for the provided IDs' },
        { status: 404 }
      );
    }

    return NextResponse.json(colorDetails);
  } catch (error) {
    console.error('Error in /api/colors GET handler:', error);
    return NextResponse.json(
      { error: 'Failed to process color' },
      { status: 500 }
    );
  }
}

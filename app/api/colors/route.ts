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
    let colorDetails;
    const { searchParams } = new URL(req.url);
    const ids = searchParams.get('ids');

    if (!ids) {
      colorDetails = await db.select().from(colors);

      return NextResponse.json(colorDetails);
    } else {
      const colorIds = ids.split(',');

      colorDetails = await db
        .select()
        .from(colors)
        .where(inArray(colors.id, colorIds));

      return NextResponse.json(colorDetails);
    }
  } catch (error) {
    console.error('Error in /api/colors GET handler:', error);
    return NextResponse.json(
      { error: 'Failed to process color' },
      { status: 500 }
    );
  }
}

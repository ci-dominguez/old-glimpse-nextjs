import { db } from '@/db/db';
import { colors } from '@/db/schema';
import { eq } from 'drizzle-orm';
import {
  parseOkhsl,
  generateAllColorSpaces,
} from '@/utils/ops/colorConversionOps';
import colorNameList from 'color-name-list';

function colorDifference(color1: string, color2: string) {
  const r1 = parseInt(color1.slice(1, 3), 16);
  const g1 = parseInt(color1.slice(3, 5), 16);
  const b1 = parseInt(color1.slice(5, 7), 16);
  const r2 = parseInt(color2.slice(1, 3), 16);
  const g2 = parseInt(color2.slice(3, 5), 16);
  const b2 = parseInt(color2.slice(5, 7), 16);
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

export async function createOrRetrieveColor(okhslColor: string) {
  const existingColor = await db
    .select()
    .from(colors)
    .where(eq(colors.okhsl, okhslColor))
    .limit(1);

  //Return color if it already exists
  if (existingColor.length > 0) {
    return existingColor[0].id;
  }

  //Create, name, and return a new color
  const parsedOkhsl = parseOkhsl(okhslColor);
  const colorSpaces = generateAllColorSpaces(parsedOkhsl);

  let nearestColor = colorNameList[0];
  let minDiff = Infinity;
  for (const namedColor of colorNameList) {
    const diff = colorDifference(colorSpaces.hex, namedColor.hex);
    if (diff < minDiff) {
      minDiff = diff;
      nearestColor = namedColor;
    }
  }

  const colorName = nearestColor.name || 'New Discovery';

  const [insertedColor] = await db
    .insert(colors)
    .values({
      name: colorName,
      ...colorSpaces,
    })
    .returning({ id: colors.id });

  return insertedColor.id;
}

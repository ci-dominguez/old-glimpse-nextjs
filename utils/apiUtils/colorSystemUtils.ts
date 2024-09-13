import { db } from '@/db/db';
import { colorSystems } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { ColorSystemCard } from '@/utils/types/interfaces';

export async function getUserColorSystems(
  userId: string
): Promise<ColorSystemCard[]> {
  return db
    .select({
      id: colorSystems.id,
      name: colorSystems.name,
      description: colorSystems.description,
      baseColors: colorSystems.baseColors,
      backgroundColor: colorSystems.backgroundColor,
      isFavorite: colorSystems.isFavorite,
    })
    .from(colorSystems)
    .where(eq(colorSystems.userId, userId));
}

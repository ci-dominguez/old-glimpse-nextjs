'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ColorSystemCard as ColorSystemCardType } from '@/utils/types/interfaces';
import { Skeleton } from '../ui/skeleton';

interface ColorSystemCardProps {
  colorSystem: ColorSystemCardType;
}

interface ColorData {
  id: string;
  hex: string;
}

const ColorSystemCard = ({ colorSystem }: ColorSystemCardProps) => {
  const [colors, setColors] = useState<ColorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchColors = async () => {
      const colorIds = [...colorSystem.baseColors, colorSystem.backgroundColor];

      try {
        const resp = await fetch(`/api/colors?ids=${colorIds.join(',')}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!resp.ok) {
          throw new Error(
            `Failed to fetch colors for this color system: ${colorSystem.id}`
          );
        }

        const data: ColorData[] = await resp.json();
        setColors(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : `An error occurred while fetching colors for this color system: ${colorSystem.id}`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchColors();
  }, [colorSystem.baseColors, colorSystem.backgroundColor, colorSystem.id]);

  const backgroundColorHex =
    colors.find((c) => c.id === colorSystem.backgroundColor)?.hex || '#FFFFFF';
  const baseColorHexes = colorSystem.baseColors.map(
    (id) => colors.find((c) => c.id === id)?.hex || '#FFFFFF'
  );

  return (
    <Link href={`/color-systems/${colorSystem.id}`}>
      <Card className='hover:shadow-lg transition-shadow duration-300 text-left'>
        <CardHeader>
          {loading ? (
            <Skeleton className='w-full h-8 rounded' />
          ) : (
            <CardTitle>{colorSystem.name}</CardTitle>
          )}
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className='w-full h-16 rounded mb-4' />
          ) : (
            <div
              className='w-full h-16 rounded mb-4'
              style={{ backgroundColor: backgroundColorHex }}
            />
          )}

          <div className='flex justify-between mb-4'>
            {loading ? (
              <>
                <Skeleton className='w-8 h-8 rounded' />
                <Skeleton className='w-8 h-8 rounded' />
                <Skeleton className='w-8 h-8 rounded' />
                <Skeleton className='w-8 h-8 rounded' />
                <Skeleton className='w-8 h-8 rounded' />
              </>
            ) : (
              baseColorHexes.map((hex, index) => (
                <div
                  key={index}
                  className='w-8 h-8 rounded'
                  style={{ backgroundColor: hex }}
                />
              ))
            )}
          </div>

          {loading ? (
            <Skeleton className='w-full h-24 rounded' />
          ) : colorSystem.description!.length > 100 ? (
            `${colorSystem.description!.slice(0, 100)}...`
          ) : (
            <CardDescription>{colorSystem.description}</CardDescription>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default ColorSystemCard;

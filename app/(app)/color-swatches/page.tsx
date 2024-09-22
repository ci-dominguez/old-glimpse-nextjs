'use client';
import { useState, useEffect } from 'react';
import { useNav } from '@/contexts/NavContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Color } from '@/utils/types/interfaces';
import ColorCard from '@/components/cards/ColorCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ColorCardSkeleton from '@/components/skeletons/ColorCardSkeleton';

const colorSpaces = [
  { value: 'hex', label: 'Hex' },
  { value: 'rgb', label: 'RGB' },
  { value: 'hsl', label: 'HSL' },
  { value: 'okhsl', label: 'OKHsl' },
  { value: 'oklch', label: 'OKLch' },
  { value: 'cmyk', label: 'CMYK' },
  { value: 'hsb', label: 'HSB' },
  { value: 'lab', label: 'LAB' },
  { value: 'lch', label: 'LCH' },
  { value: 'displayp3', label: 'Display P3' },
  { value: 'a98', label: 'A98 RGB' },
  { value: 'prophoto', label: 'ProPhoto RGB' },
  { value: 'xyz', label: 'XYZ' },
];

const ColorSwatchesPage = () => {
  const { setExtended } = useNav();
  const [colors, setColors] = useState<Color[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedColorSpace, setSelectedColorSpace] =
    useState<ColorSpaceKey>('hex');

  useEffect(() => {
    setIsLoading(true);
    const fetchColors = async () => {
      try {
        const response = await fetch('/api/colors');
        const data = await response.json();
        setColors(data);
      } catch (error) {
        console.error('Error fetching colors:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchColors();
  }, []);
  return (
    <main className='flex flex-col min-h-screen'>
      <section className='flex flex-col m-2 px-6 pt-40 pb-12 space-y-24 rounded-xl bg-sky-blue-to-soft-peach text-center'>
        <div className='flex flex-col space-y-6'>
          <h1 className='text-4xl font-bold'>Color Swatches</h1>
          <p className='font-medium'>
            A library of all public colors made in Glimpse.
          </p>
          <Button className='p-0 text-md self-start mx-auto'>
            <Link
              onClick={() => {
                setExtended(false);
              }}
              href='/sign-up'
              className='px-4 py-2 w-full'
            >
              Sign up for full access
            </Link>
          </Button>
        </div>
      </section>
      <section className='flex flex-col m-2 px-6 py-12 space-y-6 rounded-xl bg-off text-center'>
        <div className='flex items-center space-x-2 ml-auto mx-auto'>
          <label htmlFor='colorSpace' className='text-md font-medium'>
            Select Color Space
          </label>
          <Select
            onValueChange={(value) =>
              setSelectedColorSpace(value as ColorSpaceKey)
            }
            defaultValue={selectedColorSpace}
          >
            <SelectTrigger className='w-[75px]'>
              <SelectValue placeholder='Select a color space' />
            </SelectTrigger>
            <SelectContent>
              {colorSpaces.map((space) => (
                <SelectItem key={space.value} value={space.value}>
                  {space.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='grid grid-cols-2 gap-x-6 gap-y-12'>
          {isLoading ? (
            <>
              <ColorCardSkeleton />
              <ColorCardSkeleton />
              <ColorCardSkeleton />
              <ColorCardSkeleton />
              <ColorCardSkeleton />
              <ColorCardSkeleton />
              <ColorCardSkeleton />
            </>
          ) : (
            <>
              {colors.map((color) => {
                return (
                  <div key={color.id}>
                    <ColorCard color={color} colorSpace={selectedColorSpace} />
                    <h3 className='underline'>
                      <Link href={`/color-swatches/${color.id}`}>
                        {color.name}
                      </Link>
                    </h3>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default ColorSwatchesPage;

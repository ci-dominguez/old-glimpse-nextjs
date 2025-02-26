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
import { SignedIn, SignedOut } from '@clerk/nextjs';

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
      <section className='flex flex-col m-2 lg:m-4 px-6 lg:px-16 xl:px-32 3xl:px-80 4xl:px-[39rem] pt-40 pb-12 lg:pb-20 space-y-24 text-center'>
        <div className='flex flex-col space-y-6'>
          <h1 className='text-4xl font-bold'>Color Swatches</h1>
          <p className='font-medium'>
            A library of all public colors made in Glimpse.
          </p>
          <SignedOut>
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
          </SignedOut>
        </div>
      </section>

      <section className='flex flex-col m-2 lg:m-4 px-6 lg:px-16 xl:px-32 3xl:px-80 4xl:px-[39rem] py-12 lg:py-20 space-y-6 rounded-xl bg-off'>
        <div className='flex flex-col space-y-2 items-center'>
          <div className='flex items-center space-x-2'>
            <label htmlFor='colorSpace' className='text-md font-medium'>
              Color Space
            </label>
            <Select
              onValueChange={(value) =>
                setSelectedColorSpace(value as ColorSpaceKey)
              }
              defaultValue={selectedColorSpace}
            >
              <SelectTrigger className='w-[75px]'>
                <SelectValue placeholder='Color Space' />
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

          {/* <div className='flex items-center space-x-2'>
            <label htmlFor='colorSpace' className='text-md font-medium'>
              Similar Colors to
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
          </div> */}
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 4xl:grid-cols-8 gap-x-6 gap-y-12'>
          {isLoading ? (
            <>
              <ColorCardSkeleton />
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
              <SignedOut>
                {colors.length > 0 ? (
                  colors.slice(0, 8).map((color) => (
                    <div key={color.id}>
                      <ColorCard
                        color={color}
                        colorSpace={selectedColorSpace}
                      />
                      <h3 className='underline'>
                        <Link href={`/color-swatches/${color.id}`}>
                          {color.name}
                        </Link>
                      </h3>
                    </div>
                  ))
                ) : (
                  <p>Waiting for colors.</p>
                )}
              </SignedOut>
              <SignedIn>
                {colors.length > 0 ? (
                  colors.map((color) => (
                    <div key={color.id}>
                      <ColorCard
                        color={color}
                        colorSpace={selectedColorSpace}
                      />
                      <h3 className='underline text-center'>
                        <Link href={`/color-swatches/${color.id}`}>
                          {color.name}
                        </Link>
                      </h3>
                    </div>
                  ))
                ) : (
                  <p>Waiting for colors.</p>
                )}
              </SignedIn>
            </>
          )}
        </div>
        <SignedOut>
          <Button className='p-0 text-md mx-auto'>
            <Link
              onClick={() => {
                setExtended(false);
              }}
              href='/sign-up'
              className='px-4 py-2 w-full'
            >
              Get started for free
            </Link>
          </Button>
        </SignedOut>
      </section>
    </main>
  );
};

export default ColorSwatchesPage;

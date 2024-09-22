'use client';
import { useEffect, useState } from 'react';
import { Color } from '@/utils/types/interfaces';
import ColorCard from '../cards/ColorCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface ColorSwatchProps {
  colorId: string;
}

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

const ColorSwatchDisplay = ({ colorId }: ColorSwatchProps) => {
  const [color, setColor] = useState<Color | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedColorSpace, setSelectedColorSpace] =
    useState<ColorSpaceKey>('hex');

  useEffect(() => {
    async function fetchColor() {
      try {
        //Fetch color info
        const resp = await fetch(`/api/colors?ids=${colorId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!resp.ok) {
          const errorData = await resp.json();
          throw new Error(errorData.error || 'Failed to fetch colors');
        }

        const colorData: Color[] = await resp.json();

        if (colorData.length > 0) {
          setColor(colorData[0]);
        } else {
          throw new Error('No color found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching data');
      } finally {
        setLoading(false);
      }
    }

    fetchColor();
  }, [colorId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!color) return <div>Color not found</div>;

  console.log(color);

  return (
    <section className='flex flex-col m-2 px-6 py-12 space-y-6 rounded-xl bg-white border-[1px] border-off'>
      <h2 className='text-2xl font-bold text-on text-center'>{color.name}</h2>
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
      <ColorCard color={color} colorSpace='hex' />
      <div className='flex flex-col space-y-6'>
        <h2 className='text-2xl font-bold text-on text-center'>Color Spaces</h2>
        <div className='flex flex-col'>
          {Object.entries(color).map(([key, value]) => (
            <div
              key={key}
              className='grid grid-cols-2 border-b-[1px] border-on py-6'
            >
              <h3 className='font-medium'>{key}</h3>
              <span className='font-bold'>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ColorSwatchDisplay;

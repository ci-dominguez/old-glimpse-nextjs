'use client';
import { useEffect, useState } from 'react';
import ColorCard from './ColorCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface PaletteDisplayProps {
  paletteId: string;
}

interface Color {
  id: string;
  name: string;
  okhsl: string;
  hex: string;
  rgb: string;
  hsl: string;
  oklch: string;
  cmyk: string;
  hsb: string;
  lab: string;
  lch: string;
  displayp3: string;
  a98: string;
  prophoto: string;
  xyz: string;
}

interface Palette {
  id: string;
  name: string;
  description: string;
  baseColors: string[];
  backgroundColor: string;
  mode: 'light' | 'dark';
  isPrivate: boolean;
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

const PaletteDisplay = ({ paletteId }: PaletteDisplayProps) => {
  const [palette, setPalette] = useState<Palette | null>(null);
  const [colors, setColors] = useState<Color[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedColorSpace, setSelectedColorSpace] =
    useState<keyof Color>('hex');

  useEffect(() => {
    async function fetchPaletteAndColors() {
      try {
        // Fetch palette information
        const paletteResponse = await fetch(`/api/color-systems/${paletteId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!paletteResponse.ok) {
          const errorData = await paletteResponse.json();
          throw new Error(errorData.error || 'Failed to fetch palette');
        }

        const paletteData: Palette = await paletteResponse.json();
        setPalette(paletteData);

        // Fetch color details
        const colorIds = [
          ...paletteData.baseColors,
          paletteData.backgroundColor,
        ];
        const colorResponse = await fetch(
          `/api/colors?ids=${colorIds.join(',')}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!colorResponse.ok) {
          const errorData = await colorResponse.json();
          throw new Error(errorData.error || 'Failed to fetch colors');
        }

        const colorData: Color[] = await colorResponse.json();
        setColors(colorData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching data');
      } finally {
        setLoading(false);
      }
    }

    fetchPaletteAndColors();
  }, [paletteId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!palette || colors.length === 0) return <div>Palette not found</div>;

  const baseColors = palette.baseColors.map(
    (id) => colors.find((color) => color.id === id)!
  );
  const backgroundColor = colors.find(
    (color) => color.id === palette.backgroundColor
  )!;

  return (
    <section>
      <h2>{palette.name}</h2>
      <p>{palette.description}</p>
      <div className='flex flex-col pt-10 space-y-4 items-center justify-center content-center'>
        <div className='flex items-center space-x-2'>
          <label htmlFor='colorSpace' className='text-sm font-medium'>
            Color Space:
          </label>
          <Select
            onValueChange={(value) =>
              setSelectedColorSpace(value as keyof Color)
            }
            defaultValue={selectedColorSpace}
          >
            <SelectTrigger className='w-[180px]'>
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
        <p className='text-sm text-muted-foreground mb-4'>
          Click the color to copy
        </p>
        <div className='max-w-lg'>
          <h2 className='text-2xl font-bold mb-2 text-center'>
            Base Colors ✨
          </h2>
          <div className='grid grid-cols-5 gap-2'>
            {baseColors.map((color, index) => (
              <ColorCard
                key={index}
                color={color}
                colorSpace={selectedColorSpace}
              />
            ))}
          </div>
        </div>
        <div className='max-w-lg'>
          <h2 className='text-2xl font-bold mb-2 text-center'>
            Background Color {palette.mode === 'light' ? '🌇' : '🌃'}
          </h2>
          <div className=' gap-2'>
            <ColorCard
              color={backgroundColor}
              colorSpace={selectedColorSpace}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaletteDisplay;

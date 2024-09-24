'use client';
import { useEffect, useState } from 'react';
import ColorCard from '../cards/ColorCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Color,
  ColorSystemCard as ColorSystem,
} from '@/utils/types/interfaces';
import { Eye, Heart, PencilIcon, Share2 } from 'lucide-react';
import { Button } from '../ui/button';
import ColorScale from './ColorScale';

interface ColorSystemDisplayProps {
  colorSystemId: string;
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

const ColorSystemDisplay = ({ colorSystemId }: ColorSystemDisplayProps) => {
  const [colorSystem, setColorSystem] = useState<ColorSystem | null>(null);
  const [colors, setColors] = useState<Color[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedColorSpace, setSelectedColorSpace] =
    useState<ColorSpaceKey>('hex');

  useEffect(() => {
    async function fetchColorSystemAndColors() {
      try {
        //Fetch color system info
        const colorSysResp = await fetch(
          `/api/color-systems/${colorSystemId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!colorSysResp.ok) {
          const errorData = await colorSysResp.json();
          throw new Error(errorData.error || 'Failed to fetch color system');
        }

        const colorSysData: ColorSystem = await colorSysResp.json();
        setColorSystem(colorSysData);

        // Fetch color details
        const colorIds = [
          ...colorSysData.baseColors,
          colorSysData.backgroundColor,
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

    fetchColorSystemAndColors();
  }, [colorSystemId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!colorSystem || colors.length === 0)
    return <div>Color system not found</div>;

  const baseColors = colorSystem.baseColors.map(
    (id) => colors.find((color) => color.id === id)!
  );
  const backgroundColor = colors.find(
    (color) => color.id === colorSystem.backgroundColor
  )!;

  return (
    <section className='flex flex-col m-2 px-6 py-12 space-y-6 rounded-xl bg-white border-[1px] border-off'>
      <div className='flex space-x-1 justify-end flex-wrap'>
        <div className='flex items-center space-x-2 self-start ml-auto'>
          <label htmlFor='colorSpace' className='text-sm font-medium hidden'>
            Color Space:
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
        <Button variant='outline' className='self-start'>
          <Share2 className='size-4' />
        </Button>
        <Button variant='outline' className='self-start'>
          <Eye className='size-4' />
        </Button>
        <Button variant='outline' className='self-start'>
          <Heart className='size-4' />
        </Button>
        <Button variant='outline' className='self-start'>
          <PencilIcon className='size-4' />
        </Button>
      </div>

      <h1 className='text-2xl font-bold text-on'>{colorSystem.name}</h1>
      <p>{colorSystem.description}</p>
      <div className='flex flex-col space-y-4'>
        <div>
          <h2 className='text-xl font-bold mb-2'>Color Palette</h2>
          <div className='grid grid-cols-6 gap-2'>
            {baseColors.map((color, index) => (
              <ColorCard
                key={index}
                color={color}
                colorSpace={selectedColorSpace}
              />
            ))}
            <ColorCard
              color={backgroundColor}
              colorSpace={selectedColorSpace}
            />
          </div>
        </div>
        <div>
          <h2 className='text-xl font-bold mb-2'>Color Details</h2>
          <div className='grid grid-cols-2 gap-y-2'>
            {baseColors.map((color, index) => (
              <div key={index} className='flex space-x-2'>
                <ColorCard color={color} colorSpace={selectedColorSpace} />
                <span>{color.name}</span>
              </div>
            ))}
            <div className='flex space-x-2'>
              <ColorCard
                color={backgroundColor}
                colorSpace={selectedColorSpace}
              />
              <span>{backgroundColor.name}</span>
            </div>
          </div>
        </div>
        <div>
          <h2 className='text-xl font-bold mb-2'>Color Scales</h2>
          {colors.map((color, index) => (
            <div key={index} className='flex space-x-2'>
              <ColorScale
                baseColor={color}
                bgColor={colors[5]}
                colorSpace={selectedColorSpace}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ColorSystemDisplay;

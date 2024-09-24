'use client';
import { useState, useEffect, use } from 'react';
import { Color } from '@/utils/types/interfaces';
import { generateColorScale } from '@/utils/ops/scaleOps';
import {
  generateAllColorSpaces,
  hexToRgb,
  rgbToOkhsl,
} from '@/utils/ops/colorConversionOps';

interface colorScaleProps {
  baseColor: Color;
  bgColor: Color;
  colorSpace: ColorSpaceKey;
}

const ColorScale = ({ baseColor, bgColor, colorSpace }: colorScaleProps) => {
  const [colorScale, setColorScale] = useState<string[] | null>([]);
  const [colorValues, setColorValues] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
  };

  useEffect(() => {
    async function generateScale() {
      try {
        if (!baseColor || !bgColor) {
          setError('Base color or background color is missing');
          return;
        }
        const scale = generateColorScale(baseColor.hex, bgColor.hex);
        setColorScale(scale);
        console.log('Scale generated: ', scale);

        const values = scale.map((hexColor) => {
          const rgbColor = hexToRgb(hexColor);
          const allSpaces = generateAllColorSpaces(rgbToOkhsl(rgbColor));
          return allSpaces[colorSpace];
        });
        setColorValues(values);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching data');
      } finally {
        setLoading(false);
      }
    }
    generateScale();
  }, [baseColor, bgColor, colorSpace]);

  if (!baseColor) {
    console.log(baseColor);
    return (
      <div className='mb-4'>
        <p>Color scale not available</p>
      </div>
    );
  }

  return (
    <div className='mb-4'>
      <h3 className='text-lg font-semibold mb-2'>{baseColor.name}</h3>
      <div className='flex flex-wrap gap-2'>
        {colorScale?.map((color, index) => (
          <div
            key={index}
            className='w-8 h-8 cursor-pointer rounded'
            style={{ backgroundColor: color }}
            onClick={() => copyToClipboard(colorValues[index])}
            title={`Click to copy: ${color}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorScale;

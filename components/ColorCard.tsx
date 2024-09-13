'use client';
import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Card, CardContent } from './ui/card';

interface ColorCardProps {
  color: {
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
  };
  colorSpace: keyof ColorCardProps['color'];
}

const ColorCard = ({ color, colorSpace }: ColorCardProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(color[colorSpace]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Card className='group relative cursor-pointer' onClick={copyToClipboard}>
      <CardContent className='p-2'>
        <div
          className='w-full aspect-square rounded'
          style={{ backgroundColor: color.hex }}
        />
        <div className='flex flex-col items-center mt-2'>
          <p className='text-center text-xs font-medium'>{color.name}</p>
          <div className='flex items-center space-x-2'>
            {copied ? (
              <Check className='h-4 w-4 stroke-green-500' />
            ) : (
              <Copy className='h-4 w-4 stroke-muted-foreground hover:stroke-black' />
            )}
            <p className='text-center text-sm'>{color[colorSpace]}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorCard;

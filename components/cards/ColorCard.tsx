'use client';
import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

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
    <div
      className='group relative cursor-pointer flex flex-col'
      onClick={copyToClipboard}
    >
      <div
        className='w-full aspect-square rounded'
        style={{ backgroundColor: color.hex }}
      />
      <div className='flex items-center space-x-2 opacity-0 group-hover:opacity-100 group-active:flex mx-auto pt-1'>
        {copied ? (
          <Check className='h-4 w-4 stroke-green-500' />
        ) : (
          <Copy className='h-4 w-4 stroke-muted-foreground hover:stroke-black' />
        )}
      </div>
    </div>
  );
};

export default ColorCard;

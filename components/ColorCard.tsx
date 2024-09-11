'use client';
import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { convertOKHslToHex, parseOkhsl } from '@/utils/conversions';

const ColorCard = ({ color }: { color: string }) => {
  const [copied, setCopied] = useState(false);
  const hexColor = convertOKHslToHex(color);

  console.log('OKHsl color:', color);
  console.log('Converted hex color:', hexColor);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(hexColor);
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
          style={{ backgroundColor: hexColor }}
        />
        <div className='flex items-center space-x-2 mt-2'>
          {copied ? (
            <Check className='h-4 w-4 stroke-green-500' />
          ) : (
            <Copy className='h-4 w-4 stroke-muted-foreground hover:stroke-black' />
          )}
          <p className='text-center text-sm'>{hexColor}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorCard;

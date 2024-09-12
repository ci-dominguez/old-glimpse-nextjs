'use client';
import { useEffect, useState } from 'react';
import ColorCard from './ColorCard';

interface PaletteDisplayProps {
  paletteId: string;
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

const PaletteDisplay = ({ paletteId }: PaletteDisplayProps) => {
  const [palette, setPalette] = useState<Palette | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPalette() {
      try {
        const response = await fetch(`/api/color-systems/${paletteId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch palette');
        }

        const data: Palette = await response.json();
        setPalette(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching palette');
      } finally {
        setLoading(false);
      }
    }

    fetchPalette();
  }, [paletteId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!palette) return <div>Palette not found</div>;

  return (
    <section>
      <h2>{palette.name}</h2>
      <p>{palette.description}</p>
      <div className='flex flex-col pt-10 space-y-x items-center justify-center content-center'>
        <p className='text-sm text-muted-foreground mb-4'>
          Click the color to copy
        </p>
        <div className='max-w-lg'>
          <h2 className='text-2xl font-bold mb-2 text-center'>
            Base Colors ✨
          </h2>
          <div className='grid grid-cols-5 gap-2'>
            {palette.baseColors.map((color, index) => (
              <ColorCard key={index} color={color} />
            ))}
          </div>
        </div>
        <div className='max-w-lg'>
          <h2 className='text-2xl font-bold mb-2 text-center'>
            Background Color {palette.mode === 'light' ? '🌇' : '🌃'}
          </h2>
          <div className=' gap-2'>
            <ColorCard color={palette.backgroundColor} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaletteDisplay;

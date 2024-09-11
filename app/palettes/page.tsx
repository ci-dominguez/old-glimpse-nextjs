'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Palette {
  id: string;
  name: string;
  description: string;
}

const PalettesPage = () => {
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPalettes() {
      try {
        const response = await fetch('/api/palettes', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch palettes');
        }
        const data: Palette[] = await response.json();
        setPalettes(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Error fetching palettes'
        );
      } finally {
        setLoading(false);
      }
    }
    fetchPalettes();
  }, []); // Empty dependency array ensures this runs once on mount

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main>
      <h1>Palettes 🎨</h1>
      {palettes.length === 0 ? (
        <p>No palettes found.</p>
      ) : (
        <ul>
          {palettes.map((palette) => (
            <li key={palette.id}>
              <Link href={`/palette/${palette.id}`}>
                <h2>{palette.name}</h2>
                <p>{palette.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default PalettesPage;

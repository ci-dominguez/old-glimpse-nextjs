'use client';
import ColorSystemCard from '@/components/cards/ColorSystemCard';
import { ColorSystemCard as SystemCardType } from '@/utils/types/interfaces';
import { useEffect, useState } from 'react';

const ColorSystemsPage = () => {
  const [systems, setSystems] = useState<SystemCardType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSystemData() {
      try {
        const resp = await fetch('/api/color-systems', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!resp.ok) {
          throw new Error('Failed to fetch color system data for user');
        }

        const data: SystemCardType[] = await resp.json();
        console.log('fetched data:', data);
        setSystems(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'Error fetching color system data'
        );
      } finally {
        setLoading(false);
      }
    }

    fetchSystemData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!systems || systems.length === 0)
    return <div>No Color Systems found!</div>;

  return (
    <main className='flex flex-col min-h-screen'>
      <section className='flex flex-col m-2 px-6 pt-40 pb-12 space-y-24 rounded-xl bg-sky-blue-to-soft-peach'>
        <div className='flex flex-col space-y-6 text-center'>
          <h1 className='text-4xl font-bold'>Your color systems</h1>
          <p className='text-md font-medium'>
            A color system is the heart of your brand, with each color
            representing a world of possibilities for your idea.
          </p>
        </div>
      </section>

      <section className='flex flex-col m-2 px-6 py-12 space-y-6 rounded-xl bg-off text-center'>
        {systems.map((system) => {
          console.log('Current Color system in data:', system);
          return <ColorSystemCard key={system.id} colorSystem={system} />;
        })}
      </section>
    </main>
  );
};

export default ColorSystemsPage;

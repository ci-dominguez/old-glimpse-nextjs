'use client';
import { useNav } from '@/contexts/NavContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { tools } from '@/utils/tools';
import Blob from '@/components/icons/blob';

const FeaturesPage = () => {
  const { setExtended } = useNav();
  return (
    <main className='flex flex-col min-h-screen'>
      <section className='flex flex-col m-2 px-6 pt-40 pb-12 space-y-24 rounded-xl bg-sky-blue-to-soft-peach text-center'>
        <div className='flex flex-col space-y-6'>
          <h1 className='text-4xl font-bold'>Features</h1>
          <p className='font-medium'>Where power meets simplicity.</p>
        </div>
      </section>
      <section className='flex flex-col m-2 px-6 py-12 space-y-10 rounded-xl bg-off'>
        {tools.map((tool) => {
          return (
            <div key={tool.category} className='space-y-6 flex flex-col'>
              <h2 className='text-2xl font-bold'>{tool.category}</h2>
              {tool.tools.map((feature) => {
                return (
                  <div key={feature.name}>
                    <h3 className='text-xl font-bold flex space-x-1 items-center'>
                      <Blob className='fill-black' />
                      <span>{feature.name}</span>
                    </h3>
                    <p className='text-left text-lg'>{feature.description}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </section>
      <section className='flex flex-col m-2 px-6 py-12 space-y-6 rounded-xl bg-sky-blue-to-soft-peach'>
        <h2 className='text-2xl font-bold text-center'>
          Get started with Glimpse today
        </h2>
        <p>
          Join a growing community of designers using Glimpse to create
          stunning, accessible designs faster than ever.
        </p>
        <Button className='p-0 text-md' variant='secondary'>
          <Link
            onClick={() => {
              setExtended(false);
            }}
            href='/pricing'
            className='px-4 py-2 w-full'
          >
            View pricing
          </Link>
        </Button>
        <Button className='p-0 text-md'>
          <Link
            onClick={() => {
              setExtended(false);
            }}
            href='/sign-up'
            className='px-4 py-2 w-full'
          >
            Get started for free
          </Link>
        </Button>
      </section>
    </main>
  );
};

export default FeaturesPage;

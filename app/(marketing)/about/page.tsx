'use client';
import { useNav } from '@/contexts/NavContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const values = [
  {
    header: 'Thinking outside the color wheel',
    description:
      "We're constantly pushing boundaries to create innovative solutions that make your design process smoother and more intuitive.",
  },
  {
    header: 'Colors for all',
    description:
      'We believe great design should be accessible to everyone. Our tools are built to ensure your color choices work for all users, regardless of visual abilities or device types.',
  },
  {
    header: 'Room for growth',
    description:
      "We design our tools to be intuitive for beginners yet powerful enough for pros. Whether you're making your first palette or your thousandth, Glimpse grows with you, offering deeper functionality as you explore.",
  },
];

const AboutPage = () => {
  const { setExtended } = useNav();
  return (
    <main className='flex flex-col min-h-screen'>
      <section className='flex flex-col m-2 px-6 pt-40 pb-12 space-y-24 rounded-xl bg-sky-blue-to-soft-peach text-center'>
        <div className='flex flex-col space-y-6'>
          <h1 className='text-4xl font-bold'>About us</h1>
          <p className='font-medium'>
            Glimpse was born out of frustration. We were tired of spending hours
            tweaking colors for our designs. So, we decided to shake things up
            and create a tool that does the heavy lifting for us.
          </p>
        </div>
      </section>
      <section className='flex flex-col m-2 px-6 py-12 space-y-6 rounded-xl bg-off'>
        <h2 className='text-2xl font-bold'>Our values</h2>
        {values.map((value) => {
          return (
            <div key={value.header}>
              <h3 className='text-xl font-bold'>{value.header}</h3>
              <p className='text-left text-lg'>{value.description}</p>
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

export default AboutPage;

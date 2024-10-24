'use client';
import { useNav } from '@/contexts/NavContext';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Cpu, Library, Rocket, Share2 } from 'lucide-react';
import Blob from '@/components/icons/blob';
import { tools } from '@/utils/tools';

const categories = [
  {
    name: 'Ai-Powered Generation',
    category: 'AI Tools',
    icon: <Cpu />,
  },
  {
    name: 'Extensive Asset Libraries',
    category: 'Libraries',
    icon: <Library />,
  },
  {
    name: 'Export & Integration Options',
    category: 'Exports & Integrations',
    icon: <Share2 />,
  },
  {
    name: 'More Shipping Soon!',
    category: 'Soon',
    icon: <Rocket />,
  },
];

export default function Home() {
  const { setExtended } = useNav();
  return (
    <main className='flex flex-col min-h-screen'>
      <section className='flex flex-col m-2 lg:m-4 px-6 lg:px-16 xl:px-32 3xl:px-80 4xl:px-[39rem] pt-40 pb-12 lg:pb-20 space-y-24 rounded-xl bg-periwinkle text-center'>
        <div className='flex flex-col space-y-6'>
          <h1 className='text-4xl font-bold lg:text-5xl'>
            Design your design system
          </h1>
          <p className='font-medium lg:w-4/5 lg:mx-auto 3xl:w-1/2'>
            Bring your ideas to life at a click of a button. Glimpse equips you
            with an adaptable toolkit ranging from ai and intuitive algorithms
            to professional and community-driven asset libraries.
          </p>
          <Button className='p-0 text-md self-start mx-auto'>
            <Link
              onClick={() => {
                setExtended(false);
              }}
              href='/sign-up'
              className='px-4 py-2 w-full'
            >
              Start designing for free
            </Link>
          </Button>
        </div>
        <div
          className='bg-slate-100 h-40 4xl:h-[675px] 96 rounded-lg shadow-lg shadow-black/[0.07]
'
        />
      </section>

      <section className='flex flex-col m-2 lg:m-4 px-6 lg:px-16 xl:px-32 py-12 lg:py-20 space-y-6 rounded-xl bg-off text-center'>
        <h3 className='text-xl font-bold text-on lg:text-2xl'>
          Everything you need bundled together
        </h3>
        <ul className='grid grid-cols-1 sm:grid-cols-2 text-left font-bold text-lg lg:text-xl ml-4 gap-4 lg:gap-8 lg:flex lg:flex-wrap lg:mx-auto 2xl:w-1/2 2xl:justify-center'>
          {categories.map((cat) => {
            return (
              <li key={cat.name} className='flex space-x-2 items-center'>
                {cat.icon}
                <span>{cat.name}</span>
              </li>
            );
          })}
        </ul>
      </section>

      <section className='flex flex-col m-2 lg:m-4 px-6 lg:px-16 xl:px-32 3xl:px-80 4xl:px-[39rem] py-12 lg:py-20 space-y-6 rounded-xl bg-periwinkle'>
        <h2 className='text-2xl font-bold text-center lg:text-4xl'>
          Tools for everyone
        </h2>

        <div className='flex flex-col space-y-6 lg:grid lg:grid-cols-3 lg:space-y-0 lg:gap-6'>
          {tools.map((cat) => {
            return (
              <div
                key={cat.category}
                className='bg-black bg-opacity-5 rounded-xl px-4 py-8'
              >
                <h3 className='text-xl font-bold flex space-x-2 items-center pb-4'>
                  <span className='flex items-center'>
                    {categories.map(
                      (cats) =>
                        cats.category === cat.category && (
                          <span key={cats.category}>{cats.icon}</span>
                        )
                    )}
                  </span>
                  <span>{cat.category}</span>
                </h3>
                <div className='flex flex-col space-y-6'>
                  {cat.tools.map((tool) => {
                    return (
                      <div key={tool.name} className='flex flex-col pl-2'>
                        <h4 className='text-lg font-medium flex space-x-2 items-center pb-1'>
                          <Blob className=' h-3 fill-black' />
                          <span>{tool.name}</span>
                        </h4>
                        <p className='text-md text-on'>{tool.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className='flex flex-col m-2 lg:m-4 px-6 lg:px-16 xl:px-32 py-12 lg:py-20 space-y-6 rounded-xl bg-black text-white text-center'>
        <h3 className='text-xl font-bold lg:text-4xl'>
          Shape the future of Glimpse
        </h3>
        <p className='text-blind lg:w-1/2 lg:mx-auto 3xl:w-1/3'>
          Your feedback is invaluable to us. Whether you&apos;ve encountered a
          bug or have a brilliant idea to improve the platform, we want to hear
          from you.
        </p>
        <div className='flex flex-col space-y-6 sm:flex-row sm:space-y-0 sm:gap-4 sm:mx-auto lg:pt-10'>
          <Button className='p-0 text-md' variant='secondary'>
            <Link
              onClick={() => {
                setExtended(false);
              }}
              href='/suggest'
              className='px-4 py-2 w-full'
            >
              Suggest something
            </Link>
          </Button>
          <Button className='p-0 text-md' variant='secondary'>
            <Link
              onClick={() => {
                setExtended(false);
              }}
              href='/report'
              className='px-4 py-2 w-full'
            >
              Report our flaws
            </Link>
          </Button>
        </div>
      </section>

      <div className='flex flex-col space-y-4 my-4 lg:flex-row lg:space-y-0 lg:gap-8'>
        <section className='flex flex-col m-2 lg:mr-0 lg:my-0 lg:m-4 px-6 lg:px-16 py-12 lg:py-20 space-y-6 rounded-xl bg-off 3xl:w-1/2'>
          <h3 className='text-xl font-bold text-on lg:text-left lg:text-3xl 3xl:text-center'>
            Design for everyone
          </h3>
          <p className='3xl:w-1/2 3xl:mx-auto 3xl:text-center'>
            We believe great design should be accessible to all. Our suite of
            tools ensures that your designs meet WCAG standards.
            <br />
            <br />
            Take your accessibility testing further with our visual impairment
            and color blindness simulators as well as our color contrast
            checker.
          </p>
        </section>
        <section className='flex flex-col m-2 lg:ml-0 lg:my-0 lg:m-4 px-6 lg:px-16 py-12 lg:py-20 space-y-6 rounded-xl bg-off 3xl:w-1/2'>
          <h3 className='text-xl font-bold text-on lg:text-left lg:text-3xl 3xl:text-center'>
            Design with anyone
          </h3>
          <p className='3xl:w-1/2 3xl:mx-auto 3xl:text-center'>
            Create shareable palette URLs to get instant feedback from
            colleagues or clients, and control your project&apos;s visibility
            with public and private settings. <br />
            <br />
            Showcase your best work to the Glimpse community, drawing
            inspiration from fellow designers worldwide.
          </p>
        </section>
      </div>

      <section className='flex flex-col m-2 lg:m-4 px-6 lg:px-16 xl:px-32 py-12 lg:py-20 space-y-6 rounded-xl bg-periwinkle text-center '>
        <h2 className='text-2xl font-bold lg:text-4xl'>
          Get started with Glimpse today
        </h2>
        <p className='sm:text-center lg:mx-auto lg:w-1/2 3xl:w-1/3'>
          Join a growing community of designers using Glimpse to create
          stunning, accessible designs faster than ever.
        </p>
        <div className='flex flex-col space-y-6 sm:flex-row sm:space-y-0 sm:gap-4 sm:mx-auto lg:pt-10'>
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
        </div>
      </section>
    </main>
  );
}

'use client';
import { useNav } from '@/contexts/NavContext';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Cpu, Library, Rocket, Share2, Users } from 'lucide-react';
import Blob from '@/components/icons/blob';
import { tools } from '@/utils/tools';

const categories = [
  {
    name: 'Ai-Powered Generation',
    category: 'Glimpse AI',
    icon: <Cpu />,
  },
  {
    name: 'Realtime Collaboration Suite',
    category: 'Essential Tools',
    icon: <Users />,
  },
  {
    name: 'Extensive Asset Libraries',
    category: 'Libraries',
    icon: <Library />,
  },
  // {
  //   name: 'Accessibility Simulation Suite',
  //   category: 'Accessibility Suite',
  //   icon: <Accessibility />,
  // },
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
      <section className='flex flex-col m-2 px-6 pt-40 pb-12 space-y-24 rounded-xl bg-sky-blue-to-soft-peach text-center'>
        <div className='flex flex-col space-y-6'>
          <h1 className='text-4xl font-bold'>Design your design system</h1>
          <p className='font-medium'>
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
        <div className='bg-slate-100 h-40 rounded-lg' />
      </section>

      <section className='flex flex-col m-2 px-6 py-12 space-y-6 rounded-xl bg-off text-center'>
        <h3 className='text-xl font-bold text-on'>
          Everything you need bundled together
        </h3>
        <ul className='flex flex-col text-left font-bold text-lg ml-4 space-y-4'>
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

      <section className='flex flex-col m-2 px-6 py-12 space-y-6 rounded-xl bg-sky-blue-to-soft-peach'>
        <h2 className='text-2xl font-bold text-center'>Tools for everyone</h2>

        <div className='flex flex-col space-y-6'>
          {tools.map((cat) => {
            return (
              <div key={cat.category} className='bg-off rounded-xl px-4 py-8'>
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
                          <Link
                            onClick={() => {
                              setExtended(false);
                            }}
                            href={tool.link}
                            className='underline underline-offset-2'
                          >
                            {tool.name}
                          </Link>
                        </h4>
                        <p className='text-md text-on'>{tool.description}</p>
                      </div>
                    );
                  })}
                  <Button className='p-0 text-md w-full'>
                    <Link
                      onClick={() => {
                        setExtended(false);
                      }}
                      href='/features'
                      className='py-2 w-full'
                    >
                      Learn more
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className='flex flex-col m-2 px-6 py-12 space-y-6 rounded-xl bg-black text-white text-center'>
        <h3 className='text-xl font-bold'>Shape the future of Glimpse</h3>
        <p className='text-blind'>
          Your feedback is invaluable to us. Whether you&apos;ve encountered a
          bug or have a brilliant idea to improve the platform, we want to hear
          from you.
        </p>
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
      </section>

      <section className='flex flex-col m-2 px-6 py-12 space-y-6 rounded-xl bg-off'>
        <h3 className='text-xl font-bold text-on'>Design for everyone</h3>
        <p>
          We believe great design should be accessible to all. Our suite of
          tools ensures that your designs meet WCAG standards.
          <br />
          <br />
          Take your accessibility testing further with our visual impairment and
          color blindness simulators as well as our color contrast checker.
        </p>
      </section>

      <section className='flex flex-col m-2 px-6 py-12 space-y-6 rounded-xl bg-off'>
        <h3 className='text-xl font-bold text-on'>Design with anyone</h3>
        <p>
          Create shareable palette URLs to get instant feedback from colleagues
          or clients, and control your project&apos;s visibility with public and
          private settings. <br />
          <br />
          Showcase your best work to the Glimpse community, drawing inspiration
          from fellow designers worldwide.
        </p>
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
}

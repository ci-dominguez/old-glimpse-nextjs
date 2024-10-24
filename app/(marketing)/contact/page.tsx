'use client';
import ContactForm from '@/components/forms/ContactForm';
import { Button } from '@/components/ui/button';
import { useNav } from '@/contexts/NavContext';
import Link from 'next/link';

const ContactPage = () => {
  const { setExtended } = useNav();
  return (
    <main className='flex flex-col min-h-screen'>
      <section className='flex flex-col m-2 lg:m-4 px-6 lg:px-16 xl:px-32 3xl:px-80 4xl:px-[39rem] pt-40 pb-12 lg:pb-20 space-y-24 rounded-xl bg-periwinkle text-center'>
        <div className='flex flex-col space-y-6'>
          <h1 className='text-4xl font-bold lg:text-5xl'>Send us a message</h1>
          <p className='font-medium'>
            Get in touch with us and we&apos;ll reply as soon as we can.
          </p>
        </div>
      </section>
      <section className='flex flex-col m-2 lg:m-4 px-6 py-12 lg:px-16 xl:px-32 3xl:px-80 4xl:px-[39rem] space-y-10 rounded-xl bg-off'>
        <ContactForm />
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
};

export default ContactPage;

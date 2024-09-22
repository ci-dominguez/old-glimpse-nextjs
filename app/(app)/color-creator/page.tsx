import ConvertColorsForm from '@/components/forms/ConvertColorsForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const ColorCreatorPage = () => {
  return (
    <main className='flex flex-col min-h-screen'>
      <section className='flex flex-col m-2 px-6 pt-40 pb-12 space-y-24 rounded-xl bg-sky-blue-to-soft-peach text-center'>
        <div className='flex flex-col space-y-6'>
          <h1 className='text-4xl font-bold'>Convert your colors</h1>
          <p className='font-medium'>
            Start with a hex code, and convert it to various major color spaces.
          </p>
        </div>
      </section>
      <ConvertColorsForm />
      <section className='flex flex-col m-2 px-6 py-12 space-y-6 rounded-xl bg-black text-white text-center'>
        <h3 className='text-xl font-bold'>Shape the future of Glimpse</h3>
        <p className='text-blind'>
          Your feedback is invaluable to us. Whether you&apos;ve encountered a
          bug or have a brilliant idea to improve the platform, we want to hear
          from you.
        </p>
        <Button className='p-0 text-md' variant='secondary'>
          <Link href='/suggest' className='px-4 py-2 w-full'>
            Suggest something
          </Link>
        </Button>
        <Button className='p-0 text-md' variant='secondary'>
          <Link href='/report' className='px-4 py-2 w-full'>
            Report our flaws
          </Link>
        </Button>
      </section>
    </main>
  );
};

export default ColorCreatorPage;

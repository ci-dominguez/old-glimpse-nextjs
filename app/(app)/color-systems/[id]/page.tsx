import ColorSystemDisplay from '@/components/ColorSystemDisplay';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const ColorSystemDetailsPage = ({ params }: { params: { id: string } }) => {
  return (
    <main className='flex flex-col min-h-screen'>
      <section className='flex flex-col m-2 px-6 pt-40 pb-12 space-y-24 rounded-xl bg-off text-center'>
        <div className='flex flex-col space-y-6'>
          <Link
            href='/color-systems'
            className='font-medium align-items flex space-x-1 underline underline-offset-1 mx-auto'
          >
            <ChevronLeft className='size-5 my-auto' />
            <span>Go back to all color systems</span>
          </Link>
        </div>
      </section>
      <ColorSystemDisplay colorSystemId={params.id} />
    </main>
  );
};

export default ColorSystemDetailsPage;

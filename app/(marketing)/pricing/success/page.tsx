import { Link } from 'lucide-react';

const SuccessPage = () => {
  return (
    <main className='flex flex-col min-h-screen'>
      <section className='flex flex-col m-2 px-6 pt-40 pb-12 space-y-24 rounded-xl bg-sky-blue-to-soft-peach text-center'>
        <Link href='/'>nice</Link>
      </section>
    </main>
  );
};

export default SuccessPage;

import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <main className='flex flex-col min-h-screen'>
      <section className='flex flex-col m-2 px-6 pt-40 pb-12 space-y-24 rounded-xl bg-sky-blue-to-soft-peach'>
        <div className='flex flex-col space-y-6 text-center'>
          <Skeleton className='h-12 w-3/4 mx-auto' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-5/6 mx-auto' />
        </div>
      </section>

      <section className='flex flex-col m-2 px-6 py-12 space-y-6 rounded-xl bg-off text-center'>
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className='h-48 w-full' />
        ))}
      </section>
    </main>
  );
}

import ColorSwatchDisplay from '@/components/displays/ColorSwatchDisplay';

const ColorSwatchDetailsPage = ({ params }: { params: { id: string } }) => {
  return (
    <main className='flex flex-col min-h-screen'>
      <section className='flex flex-col m-2 px-6 pt-40 pb-12 space-y-24 rounded-xl bg-sky-blue-to-soft-peach text-center'>
        <div className='flex flex-col space-y-6'>
          <h1 className='text-4xl font-bold'>Color Swatch</h1>
          <p className='font-medium'>
            We convert colors between major color spaces with accuracy.
          </p>
        </div>
      </section>
      <ColorSwatchDisplay colorId={params.id} />
    </main>
  );
};

export default ColorSwatchDetailsPage;

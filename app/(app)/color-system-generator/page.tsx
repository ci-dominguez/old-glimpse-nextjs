import GenerateColorSystemForm from '@/components/forms/GenerateColorSystemForm';

const ColorPaletteGeneratorPage = () => {
  return (
    <main className='flex flex-col min-h-screen'>
      <section className='flex flex-col m-2 px-6 pt-40 pb-12 space-y-24 rounded-xl bg-sky-blue-to-soft-peach'>
        <div className='flex flex-col space-y-6'>
          <h1 className='text-4xl font-bold  text-center'>
            Create a color system
          </h1>
          <div className='flex flex-col space-y-2'>
            <p className='text-lg font-bold'>A two part process:</p>
            <p className='text-md font-medium'>
              1. Masterfully design a base-palette with 5 colors and 1
              background color.
            </p>
            <p className='text-md font-medium'>
              2. Our algorithm then creates a full 37-shade color system for
              your brand or app.
            </p>
          </div>
        </div>
      </section>
      <GenerateColorSystemForm />
    </main>
  );
};

export default ColorPaletteGeneratorPage;

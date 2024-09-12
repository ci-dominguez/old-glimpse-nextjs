import GenerateColorSystemForm from '@/components/forms/GenerateColorSystemForm';

const ColorPaletteGeneratorPage = () => {
  return (
    <main className='flex flex-col min-h-screen'>
      <section className='flex flex-col m-2 px-6 pt-40 pb-12 space-y-24 rounded-xl bg-sky-blue-to-soft-peach'>
        <div className='flex flex-col space-y-6'>
          <h1 className='text-4xl font-bold  text-center'>Color System</h1>
          <p className='font-medium text-left'>
            <b>A two part process:</b>
            <br />
            <br />
            1. Masterfully design a{' '}
            <b>base-palette with 5 colors and 1 background color.</b>
            <br />
            2. Leverage our algorithm to create a full{' '}
            <b>37-shade color system for your brand or app.</b>
          </p>
        </div>
      </section>
      <GenerateColorSystemForm />
    </main>
  );
};

export default ColorPaletteGeneratorPage;

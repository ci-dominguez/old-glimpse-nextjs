// import {Auth} from '@clerk/nextjs'
import ColorPaletteGenerator from '@/components/ColorPaletteGenerator';

const ColorPaletteGeneratorPage = () => {
  return (
    <main className='flex flex-col items-center justify-center min-h-screen'>
      <ColorPaletteGenerator />
    </main>
  );
};

export default ColorPaletteGeneratorPage;

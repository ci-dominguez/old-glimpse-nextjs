import ColorPaletteGenerator from '@/components/ColorPaletteGenerator';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">
        AI Color Palette Generator 🤖🧑‍🎨
      </h1>
      <ColorPaletteGenerator />
      <h2 className="text-violet-400 font-bold pt-10">
        Made by{' '}
        <Link
          href="https://cidominguez.com"
          className="underline text-violet-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          @cidominguez
        </Link>
      </h2>
      <h2 className="text-blue-400 font-bold">
        Repo{' '}
        <Link
          href="https://github.com/ci-dominguez/ai-color-palette-nextjs-ts"
          className="underline text-blue-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </Link>
      </h2>
    </main>
  );
}

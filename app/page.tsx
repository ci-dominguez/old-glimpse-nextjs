"use client";
import { useState } from "react";
import ColorPaletteGenerator from "@/components/ColorPaletteGenerator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='text-3xl font-bold mb-4'>
        AI Color Palette Generator 🤖🧑‍🎨
      </h1>
      <ColorPaletteGenerator />

      <h2 className='text-violet-400 font-bold pt-10'>
        Made by{" "}
        <Link
          href='https://cidominguez.com'
          className='underline'
          target='_blank'
          rel='noopener noreferrer'
        >
          @cidominguez
        </Link>
      </h2>
      <h2 className='text-blue-400 font-bold'>
        Repo{" "}
        <Link
          href='https://github.com/ci-dominguez/ai-color-palette-nextjs-ts'
          className='underline'
          target='_blank'
          rel='noopener noreferrer'
        >
          here
        </Link>
      </h2>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant='outline' className='mt-6'>
            View Example
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[600px]'>
          <DialogHeader>
            <DialogTitle>How to Use the AI Color Palette Generator</DialogTitle>
            <DialogDescription>
              Watch this short video to learn how to use the generator
              effectively.
            </DialogDescription>
          </DialogHeader>
          <div className='aspect-video'>
            <iframe
              width='100%'
              height='100%'
              src='https://www.youtube.com/embed/watch?v=0nF69UTw99E&list=RD0nF69UTw99E'
              title='AI Color Palette Generator Tutorial'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}

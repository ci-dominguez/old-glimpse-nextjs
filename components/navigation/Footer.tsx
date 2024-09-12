'use client';
import { useNav } from '@/contexts/NavContext';
import Link from 'next/link';
import Logo from '../icons/logo';
import { Button } from '../ui/button';
import { toolLinks, resourceLinks } from '@/utils/links';

const Footer = () => {
  const { setExtended } = useNav();
  return (
    <footer className='flex flex-col m-2 px-6 py-12 space-y-12 rounded-xl bg-black text-white text-center'>
      <Link
        onClick={() => {
          setExtended(false);
        }}
        href='/'
        className='flex items-center space-x-2 font-medium text-lg justify-center'
      >
        <Logo className='size-8 fill-white' />
        <h1>Glimpse</h1>
      </Link>
      <div className='grid grid-cols-2 gap-x-2 gap-y-6 text-left'>
        {toolLinks.map((link) => {
          return (
            <ul key={link.categoryName}>
              <li>{link.categoryName}</li>
              {link.tools.map((tool) => {
                return (
                  <li key={tool.name} className='font-medium text-on ml-2'>
                    <Link
                      onClick={() => {
                        setExtended(false);
                      }}
                      href={tool.href}
                    >
                      {tool.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          );
        })}
        <ul>
          <li>Resources</li>
          {resourceLinks.map((link) => {
            return (
              <li key={link.name} className='font-medium text-on ml-2'>
                <Link
                  onClick={() => {
                    setExtended(false);
                  }}
                  href={link.href}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className='flex flex-col space-y-2'>
        <h2 className='font-bold text-left'>
          What if my creative process was more efficient?
        </h2>
        <Button className='p-0 text-md' variant='secondary'>
          <Link
            onClick={() => {
              setExtended(false);
            }}
            href='/sign-up'
            className='px-4 py-2 w-full'
          >
            It can be &mdash; discover how
          </Link>
        </Button>
      </div>
    </footer>
  );
};

export default Footer;

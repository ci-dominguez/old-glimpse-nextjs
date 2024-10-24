'use client';
import { useNav } from '@/contexts/NavContext';
import Link from 'next/link';
import Logo from '../icons/logo';
import { Button } from '../ui/button';
import { toolLinks, resourceLinks } from '@/utils/links';

const Footer = () => {
  const { setExtended } = useNav();
  return (
    <footer className='flex flex-col m-2 lg:m-4 px-6 lg:px-16 py-12 lg:py-20 space-y-12 rounded-xl bg-black text-white text-center'>
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
      <div className='flex flex-col lg:flex-row lg:gap-20 lg:w-full lg:justify-center'>
        <div className='hidden lg:flex lg:flex-col self-start space-y-2 text-center'>
          <h2 className='font-bold'>
            What if my creative process was more efficient?
          </h2>
          <Button
            className='p-0 text-md sm:self-start sm:mx-auto lg:mx-0'
            variant='secondary'
          >
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
        <div className='grid grid-cols-1 gap-x-2 gap-y-6 mx-auto text-center lg:mx-0 lg:flex lg:text-left lg:gap-14'>
          {toolLinks.map((link) => {
            return (
              <ul key={link.categoryName} className='flex flex-col'>
                <li>{link.categoryName}</li>
                {link.tools.map((tool) => {
                  return (
                    <li key={tool.name} className='font-medium text-on'>
                      <Link
                        onClick={() => {
                          setExtended(false);
                        }}
                        href={tool.href}
                        className='hover:text-neutral-400 active:text-neutral-400'
                      >
                        {tool.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            );
          })}
          <ul className='flex flex-col'>
            <li>Resources</li>
            {resourceLinks.map((link) => {
              return (
                <li key={link.name} className='font-medium text-on'>
                  <Link
                    onClick={() => {
                      setExtended(false);
                    }}
                    href={link.href}
                    className='hover:text-neutral-400 active:text-neutral-400'
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className='flex flex-col space-y-2 text-center lg:hidden'>
        <h2 className='font-bold'>
          What if my creative process was more efficient?
        </h2>
        <Button
          className='p-0 text-md sm:self-start sm:mx-auto'
          variant='secondary'
        >
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

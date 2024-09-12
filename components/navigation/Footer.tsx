'use client';
import { useNav } from '@/contexts/NavContext';
import { links } from '@/utils/links';
import Link from 'next/link';
import Logo from '../icons/logo';
import { Button } from '../ui/button';

const Footer = () => {
  const { setExtended } = useNav();
  return (
    <footer className='flex flex-col m-2 px-6 py-12 space-y-6 rounded-xl bg-black text-white text-center'>
      <Link
        href='/'
        className='flex items-center space-x-2 font-medium text-lg justify-center'
      >
        <Logo className='size-8 fill-white' />
        <span>Glimpse</span>
      </Link>
      <ul className='flex flex-col space-y-2'>
        <li>
          <h2 className='font-bold'>Resources</h2>
        </li>
        {links.map((link) => {
          return (
            <li key={link.name} className='font-medium text-on'>
              <Link href={link.href}>{link.name}</Link>
            </li>
          );
        })}
      </ul>
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
          It is &mdash; discover how
        </Link>
      </Button>
    </footer>
  );
};

export default Footer;

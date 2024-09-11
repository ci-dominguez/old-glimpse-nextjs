'use client';
import { useNav } from '@/contexts/NavContext';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { links } from '@/utils/links';
import { Button } from '../ui/button';

const Nav = () => {
  const { extended, setExtended } = useNav();
  const path = usePathname();
  return (
    <nav className='fixed top-8 left-8 right-8 py-3 px-5 space-y-8 rounded-xl bg-white'>
      <div
        className={`flex justify-between items-center ${
          extended && 'pb-3 border-b-[1px] border-muted-background'
        }`}
      >
        <Link
          href='/'
          className='flex items-center space-x-1 font-bold text-lg '
        >
          <span className='text-3xl'>✨</span>
          <span>Glimpse</span>
        </Link>
        <button onClick={() => setExtended(!extended)}>
          {extended ? <X className='size-7' /> : <Menu className='size-7' />}
        </button>
      </div>
      {extended && (
        <>
          <ul className='flex flex-col items-center space-y-4 font-semibold'>
            {links.map((link) => {
              return (
                <li key={link.name}>
                  <Link href={link.href}>{link.name}</Link>
                </li>
              );
            })}
          </ul>
          <div className='flex flex-col space-y-4 pb-3'>
            <Button variant='secondary' className='p-0 text-md'>
              <Link href='/sign-in' className='px-4 py-2 w-full'>
                Login
              </Link>
            </Button>
            <Button className='p-0 text-md'>
              <Link href='/sign-up' className='px-4 py-2 w-full'>
                Join
              </Link>
            </Button>
          </div>
        </>
      )}
    </nav>
  );
};

export default Nav;

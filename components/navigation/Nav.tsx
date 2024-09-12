'use client';
import { useNav } from '@/contexts/NavContext';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { links } from '@/utils/links';
import { Button } from '../ui/button';
import Logo from '@/components/icons/logo';

const Nav = () => {
  const { extended, setExtended } = useNav();
  const path = usePathname();
  return (
    <nav className='fixed top-6 inset-x-6 py-3 px-4 space-y-8 rounded-xl bg-white'>
      <div
        className={`flex justify-between items-center ${
          extended && 'pb-3 border-b-[1px] border-muted-background'
        }`}
      >
        <Link
          onClick={() => {
            setExtended(false);
          }}
          href='/'
          className='flex items-center space-x-2 font-bold text-lg '
        >
          <Logo className='size-8 fill-black' />
          <span>Glimpse</span>
        </Link>
        <button onClick={() => setExtended(!extended)}>
          {extended ? <X className='size-6' /> : <Menu className='size-6' />}
        </button>
      </div>
      {extended && (
        <>
          <ul className='flex flex-col items-center space-y-4 font-semibold'>
            {links.map((link) => {
              return (
                <li key={link.name} className='w-full'>
                  <Button
                    variant={path === link.href ? 'outline' : 'ghost'}
                    className='p-0 text-md w-full'
                  >
                    <Link
                      onClick={() => {
                        setExtended(false);
                      }}
                      href={link.href}
                      className='px-4 py-2 w-full'
                    >
                      {link.name}
                    </Link>
                  </Button>
                </li>
              );
            })}
          </ul>
          <div className='flex flex-col space-y-4 pb-3'>
            <Button variant='secondary' className='p-0 text-md'>
              <Link
                onClick={() => {
                  setExtended(false);
                }}
                href='/sign-in'
                className='px-4 py-2 w-full'
              >
                Login
              </Link>
            </Button>
            <Button className='p-0 text-md'>
              <Link
                onClick={() => {
                  setExtended(false);
                }}
                href='/sign-up'
                className='px-4 py-2 w-full'
              >
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

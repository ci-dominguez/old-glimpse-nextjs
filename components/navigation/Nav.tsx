'use client';
import { useEffect, useState } from 'react';
import { useNav } from '@/contexts/NavContext';
import { usePathname } from 'next/navigation';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { motion, useAnimation } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Menu, X } from 'lucide-react';
import { resourceLinks as links, toolLinks } from '@/utils/links';
import { Button } from '../ui/button';
import Logo from '@/components/icons/logo';
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs';

const Nav = () => {
  const { user } = useUser();
  const { extended, setExtended } = useNav();
  const path = usePathname();
  const { scrollDirection, currentScrollY } = useScrollDirection();
  const [isVisible, setIsVisible] = useState(true);
  const [isHomeHovered, setIsHomeHovered] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (extended) {
      setIsVisible(true);
    } else if (scrollDirection === 'down' && currentScrollY > 150) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [scrollDirection, currentScrollY, extended]);

  const handleHoverStart = () => {
    setIsHomeHovered(true);
    controls.start({
      rotate: [0, 360],
      transition: {
        duration: 2,
        times: [0, 0.4, 0.7, 1],
        ease: [0.4, 0, 0.2, 1],
      },
    });
  };

  const handleHoverEnd = () => {
    setIsHomeHovered(false);
    controls.start({
      rotate: 360,
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    });
  };

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : '-200%' }}
      transition={{ duration: 0.3, delay: 0.25 }}
      className={`fixed py-3 px-4 rounded-xl bg-white border-[1px] border-muted-background flex flex-col z-50 ${
        extended ? 'inset-6' : 'top-6 inset-x-6'
      }`}
    >
      <div
        className={`flex justify-between items-center ${
          extended && 'pb-3 border-b-[1px] border-muted-background'
        }`}
      >
        <motion.div onHoverStart={handleHoverStart} onHoverEnd={handleHoverEnd}>
          <Link
            href='/'
            onClick={() => setExtended(false)}
            className='flex items-center space-x-2 font-bold text-lg'
          >
            <motion.span animate={controls}>
              <Logo className='size-8 fill-black' />
            </motion.span>
            <span>Glimpse</span>
          </Link>
        </motion.div>
        <button onClick={() => setExtended(!extended)}>
          {extended ? <X className='size-6' /> : <Menu className='size-6' />}
        </button>
      </div>
      {extended && (
        <div className='flex-grow py-8 overflow-y-auto max-h-[calc(100vh-6rem)]'>
          <div className='space-y-8'>
            {toolLinks.map((cat) => {
              return (
                <div className='space-y-3' key={cat.categoryName}>
                  <h2 className='font-bold text-xl'>{cat.categoryName}</h2>
                  <ul className='flex flex-col gap-2 items-center font-semibold'>
                    {cat.tools.map((tool) => {
                      return (
                        <li key={tool.name} className='w-full'>
                          <Button
                            variant={path === tool.href ? 'outline' : 'ghost'}
                            className='p-0 text-md w-full text-left'
                          >
                            <Link
                              onClick={() => {
                                setExtended(false);
                              }}
                              href={tool.href}
                              className='px-4 py-2 w-full'
                            >
                              {tool.name}
                            </Link>
                          </Button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
            <div className='space-y-3'>
              <h2 className='font-bold text-xl'>Resources</h2>
              <ul className='grid grid-cols-1 gap-2 items-center font-semibold'>
                {links.map((link) => {
                  return (
                    <li key={link.name} className='w-full '>
                      <Button
                        variant={path === link.href ? 'outline' : 'ghost'}
                        className='p-0 text-md w-full'
                      >
                        <Link
                          onClick={() => {
                            setExtended(false);
                          }}
                          href={link.href}
                          className='px-4 py-2 w-full text-left'
                        >
                          {link.name}
                        </Link>
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
      {extended && (
        <div className='flex flex-col space-y-4 pt-3 border-t-[1px] border-muted-background'>
          <SignedOut>
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
          </SignedOut>
          <SignedIn>
            {user && (
              <Link
                onClick={() => {
                  setExtended(false);
                }}
                href='profile'
                className='flex justify-between items-center'
              >
                <div className='flex items-center space-x-2'>
                  <Image
                    src={user!.imageUrl}
                    alt={`${user!.firstName}'s profile`}
                    width='35'
                    height='35'
                    className='rounded-full'
                  />
                  <span className='text-md font-medium'>{user?.firstName}</span>
                </div>
                <ChevronRight className='size-5' />
              </Link>
            )}
          </SignedIn>
        </div>
      )}
    </motion.nav>
  );
};

export default Nav;

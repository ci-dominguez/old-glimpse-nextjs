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
      className={`4xl:w-1/2 4xl:mx-auto fixed py-3 px-4 rounded-xl bg-white flex flex-col z-50 shadow-lg shadow-black/[0.07]
 ${
   extended
     ? 'top-6 lg:top-10 inset-x-6 lg:inset-x-10 3xl:inset-x-80'
     : 'top-6 lg:top-10 inset-x-6 lg:inset-x-10 3xl:inset-x-80'
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

        <SignedOut>
          <ul className='hidden lg:grid lg:grid-cols-3 items-center font-semibold'>
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
          <div className='hidden lg:flex gap-4'>
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
                Sign up
              </Link>
            </Button>
          </div>
        </SignedOut>
        <SignedIn>
          <ul className='flex items-center font-semibold'>
            <li className='w-full hidden lg:block'>
              <Button
                variant={path === 'color-systems' ? 'outline' : 'ghost'}
                className='p-0 text-md w-full'
              >
                <Link
                  onClick={() => {
                    setExtended(false);
                  }}
                  href='/color-systems'
                  className='px-4 py-2 w-full'
                >
                  Color Systems
                </Link>
              </Button>
            </li>
            <li className='w-full hidden lg:block'>
              <Button
                variant={path === 'color-swatches' ? 'outline' : 'ghost'}
                className='p-0 text-md w-full'
              >
                <Link
                  onClick={() => {
                    setExtended(false);
                  }}
                  href='/color-swatches'
                  className='px-4 py-2 w-full'
                >
                  Swatches
                </Link>
              </Button>
            </li>
            <li className='w-full hidden lg:block'>
              <Button
                variant={path === 'contact' ? 'outline' : 'ghost'}
                className='p-0 text-md w-full'
              >
                <Link
                  onClick={() => {
                    setExtended(false);
                  }}
                  href='/contact'
                  className='px-4 py-2 w-full'
                >
                  Contact
                </Link>
              </Button>
            </li>
          </ul>
          {user && (
            <Link
              onClick={() => {
                setExtended(false);
              }}
              href='profile'
              className='hidden justify-between items-center lg:flex'
            >
              <div className='flex items-center space-x-2'>
                <span className='text-md font-medium'>{user?.firstName}</span>
                <Image
                  src={user!.imageUrl}
                  alt={`${user!.firstName}'s profile`}
                  width='35'
                  height='35'
                  className='rounded-full'
                />
              </div>
            </Link>
          )}
        </SignedIn>
        <button
          onClick={() => setExtended(!extended)}
          className='block lg:hidden'
        >
          {extended ? <X className='size-6' /> : <Menu className='size-6' />}
        </button>
      </div>
      {extended && (
        <div className='flex-grow py-8 overflow-y-auto max-h-[calc(100vh/2)] lg:hidden'>
          <div className='space-y-8 text-center'>
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
                            className='p-0 text-md w-full'
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
            </div>
          </div>
        </div>
      )}
      {extended && (
        <div className='flex flex-col space-y-4 pt-3 border-t-[1px] border-muted-background lg:hidden'>
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
                Sign up
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

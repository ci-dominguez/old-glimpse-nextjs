'use client';

import { useEffect, useState } from 'react';

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [currentScrollY, setCurrentScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const newScrollY = window.scrollY;
      setCurrentScrollY(newScrollY);

      if (newScrollY > prevScrollY) {
        setScrollDirection('down');
      } else if (newScrollY < prevScrollY) {
        setScrollDirection('up');
      }

      setPrevScrollY(newScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollY]);

  return {
    scrollDirection,
    currentScrollY,
    prevScrollY,
  };
};

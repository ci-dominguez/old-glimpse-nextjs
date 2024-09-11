'use client';

import { createContext, useContext, useState } from 'react';

interface NavContextProps {
  extended: boolean;
  setExtended: (val: boolean) => void;
}

const NavContext = createContext<NavContextProps | undefined>(undefined);

export const NavProvider = ({ children }: { children: React.ReactNode }) => {
  const [extended, setExtended] = useState(false);

  return (
    <NavContext.Provider value={{ extended, setExtended }}>
      {children}
    </NavContext.Provider>
  );
};

export const useNav = () => {
  const context = useContext(NavContext);
  if (!context) throw new Error('UseNav must be used within a NavProvider');
  return context;
};

import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Arimo } from 'next/font/google';
import './globals.css';
import Nav from '@/components/navigation/Nav';
import { NavProvider } from '@/contexts/NavContext';
import Footer from '@/components/navigation/Footer';
import { Toaster } from '@/components/ui/toaster';

const arimo = Arimo({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  fallback: ['arial'],
  preload: true,
});

export const metadata: Metadata = {
  title: 'Glimpse - Design System Tools',
  description:
    'Leverage our intuitive ai and innovative tool-set to assist you in creating stunning design systems for brands and applications.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={arimo.className}>
          <NavProvider>
            <Nav />
            {children}
            <Toaster />
            <Footer />
          </NavProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

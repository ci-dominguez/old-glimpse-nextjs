import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      backgroundImage: {
        'cotton-candy-to-peach':
          'linear-gradient(to right bottom, rgb(251, 215, 255) 10%, rgb(255, 222, 193) 80%)',
        'soft-peach-to-pale-lemon':
          'linear-gradient(to right bottom, rgb(255, 236, 219) 10%, rgb(255, 249, 196) 80%)',
        'light-apricot-to-cream':
          'linear-gradient(to right bottom, rgb(251, 239, 210) 10%, rgb(255, 243, 224) 80%)',
        'lavender-mist-to-blush':
          'linear-gradient(to right bottom, rgb(234, 224, 255) 10%, rgb(255, 227, 236) 80%)',
        'cotton-candy-to-pale-lemon':
          'linear-gradient(to right bottom, rgb(251, 215, 255) 10%, rgb(255, 249, 196) 80%)',
        'sky-blue-to-light-apricot':
          'linear-gradient(to right bottom, rgb(224, 248, 255) 10%, rgb(251, 239, 210) 80%)',
        'lavender-mist-to-mint':
          'linear-gradient(to right bottom, rgb(234, 224, 255) 10%, rgb(236, 255, 207) 80%)',
        'cotton-candy-to-sky-blue':
          'linear-gradient(to right bottom, rgb(251, 215, 255) 10%, rgb(224, 248, 255) 80%)',
        'mint-to-light-apricot':
          'linear-gradient(to right bottom, rgb(236, 255, 207) 10%, rgb(251, 239, 210) 80%)',
        'sky-blue-to-soft-peach':
          'linear-gradient(to right bottom, rgb(224, 248, 255) 10%, rgb(255, 236, 219) 80%)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;

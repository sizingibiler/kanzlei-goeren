import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{json,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A2342',
        secondary: '#2C5D8E',
        // Premium golden accent with variations
        accent: {
          DEFAULT: '#D4A574',  // Richer, more saturated gold
          light: '#E8C89B',
          dark: '#B8925C',
          50: '#FAF5EE',
          100: '#F4E7D6',
          200: '#E8CFAD',
          300: '#D4A574',
          400: '#C69456',
          500: '#B8925C',
          600: '#9A7A4E',
          700: '#7C6240',
          800: '#5E4A31',
          900: '#403223'
        },
        background: '#F8F9FA',
        'text-primary': '#1A1A1A',
        'text-secondary': '#6C757D'
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'ui-serif', 'serif']
      },
      boxShadow: {
        card: '0 2px 10px rgba(0,0,0,0.06)'
      },
      keyframes: {
        'hero-pan': {
          '0%': { transform: 'scale(1) translateY(0)' },
          '100%': { transform: 'scale(1.05) translateY(-1.5%)' }
        },
        'fadeInUp': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fadeIn': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'slideInRight': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 165, 116, 0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(212, 165, 116, 0)' }
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      },
      animation: {
        'hero-pan': 'hero-pan 18s ease-in-out infinite alternate',
        'fadeInUp': 'fadeInUp 0.8s ease-out',
        'fadeIn': 'fadeIn 0.6s ease-out',
        'slideInRight': 'slideInRight 0.4s ease-out',
        'pulse-gold': 'pulse-gold 2s infinite',
        'shimmer': 'shimmer 3s linear infinite'
      }
    }
  },
  plugins: []
};

export default config;

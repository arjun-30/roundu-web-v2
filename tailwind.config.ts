import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── BRAND PALETTE ──
        ink: '#030916',           // text — deep almost-black
        bg: '#EEF2F7',            // background — soft cool white
        // ── EDITORIAL SURFACES (marketing site) ──
        paper: '#F6F3EE',         // warm off-white page
        sand: '#EDE7DD',          // secondary surface
        line: '#DCD4C7',          // hairline rules
        muted: '#5B6472',         // secondary text on paper
        navy: {
          50: '#E7EBF1',
          100: '#C3CCDB',
          200: '#9DACC2',
          300: '#778CA9',
          400: '#516B90',
          500: '#2B4A77',
          600: '#1F3C66',
          700: '#152E4B',         // primary — main brand
          800: '#0E2238',
          900: '#071527',
          950: '#030916',
        },
        amber: {
          50: '#FFF3E8',
          100: '#FFE2C8',
          200: '#FEC594',
          300: '#FDA65C',
          400: '#FD8C2E',
          500: '#FC7508',         // logo orange
          600: '#E8690A',
          700: '#FC7508',         // accent — logo orange
          800: '#B54F07',
          900: '#5E2A04',
          950: '#2E1502',
        },
      },
      fontFamily: {
        display: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      fontSize: {
        'hero': ['clamp(3rem, 9vw, 8rem)', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
        'display': ['clamp(2rem, 5vw, 4.5rem)', { lineHeight: '1', letterSpacing: '-0.03em' }],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'spin-slow': 'spin 30s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 50s linear infinite',
        'gradient-x': 'gradient-x 8s ease infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'glow': 'glow 4s ease-in-out infinite',
        'tilt': 'tilt 10s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', filter: 'blur(40px)' },
          '50%': { opacity: '0.8', filter: 'blur(60px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(245,158,11,0.3), 0 0 40px rgba(245,158,11,0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(245,158,11,0.6), 0 0 80px rgba(245,158,11,0.4)' },
        },
        tilt: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

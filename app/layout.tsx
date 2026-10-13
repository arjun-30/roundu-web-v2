import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import LayoutDebug from '@/components/LayoutDebug';

// One family for the whole site: headings use the heavier weights, body the regular.
const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RoundU — The Circle of Convenience | Home Services On Demand',
  description: 'Book verified home service providers in under 15 minutes. Electricians, plumbers, cleaners, mechanics and 5+ more services at your doorstep. Join the waitlist.',
  keywords: ['home services', 'on demand', 'electrician', 'plumber', 'india', 'handyman', 'booking app'],
  authors: [{ name: 'RoundU' }],
  metadataBase: new URL('https://roundu.in'),
  openGraph: {
    title: 'RoundU — The Circle of Convenience',
    description: 'Book verified home services in under 15 minutes. Join the waitlist.',
    url: 'https://roundu.in',
    siteName: 'RoundU',
    locale: 'en_IN',
    type: 'website',
  },
  icons: { icon: '/brand/roundu-mark-192.png', apple: '/apple-touch-icon.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable}>
      <body>
        {children}
        <LayoutDebug />
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RoundU — The Circle of Convenience | Home Services On Demand',
  description: 'Book verified home service providers in under 5 minutes. Electricians, plumbers, cleaners, mechanics and 5+ more services at your doorstep. Join the waitlist.',
  keywords: ['home services', 'on demand', 'electrician', 'plumber', 'india', 'handyman', 'booking app'],
  authors: [{ name: 'RoundU' }],
  metadataBase: new URL('https://roundu.in'),
  openGraph: {
    title: 'RoundU — The Circle of Convenience',
    description: 'Book verified home services in under 5 minutes. Join the waitlist.',
    url: 'https://roundu.in',
    siteName: 'RoundU',
    locale: 'en_IN',
    type: 'website',
  },
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="noise">{children}</body>
    </html>
  );
}

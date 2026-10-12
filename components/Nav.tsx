'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

const links = [
  { label: 'Services', href: '/services' },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'For professionals', href: '/professionals' },
  { label: 'About', href: '/about' },
];

/** RoundU logo: the round mark plus the "roundu" lettering. Use tone="light" on dark backgrounds. */
export function Wordmark({ className = '', tone = 'dark' }: { className?: string; tone?: 'dark' | 'light' }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {tone === 'light' ? (
        <span className="grid aspect-square h-[1.15em] place-items-center rounded-full bg-paper p-[0.08em]">
          <img src="/brand/roundu-mark-192.png" alt="" className="h-full w-full" />
        </span>
      ) : (
        <img src="/brand/roundu-mark-192.png" alt="" className="h-[1.15em] w-auto" />
      )}
      <img
        src={tone === 'light' ? '/brand/roundu-wordmark-light.png' : '/brand/roundu-wordmark.png'}
        alt="RoundU"
        className="h-[0.78em] w-auto"
      />
    </span>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open ? 'border-b border-line bg-paper/90 backdrop-blur-sm' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-6 lg:px-10">
        <Link href="/" aria-label="RoundU home" className="text-navy-700">
          <Wordmark className="text-[1.75rem]" />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative rounded-full px-4 py-2 text-[0.9rem] transition-colors ${
                  active ? 'text-ink' : 'text-ink/65 hover:text-ink'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-sand"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                {l.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <Link href="/early-access" className="btn-primary h-10 px-5 text-[0.875rem]">
            Early access
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center md:hidden"
          >
            <span className="relative block h-3 w-5">
              <motion.span
                animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                className="absolute left-0 top-0 h-[1.5px] w-full bg-ink"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                className="absolute bottom-0 left-0 h-[1.5px] w-full bg-ink"
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100svh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden bg-paper md:hidden"
          >
            <ul className="px-6 pt-6">
              {[{ label: 'Home', href: '/' }, ...links, { label: 'Contact', href: '/contact' }].map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.1, duration: 0.4 }}
                  className="border-b border-line"
                >
                  <Link
                    href={l.href}
                    className={`block py-5 font-serif text-3xl ${pathname === l.href ? 'text-amber-700' : 'text-navy-700'}`}
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

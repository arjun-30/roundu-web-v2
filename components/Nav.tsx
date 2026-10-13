'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

const links = [
  { label: 'Home', href: '/' },
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
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      {/* floating navy pill; tightens a little once you scroll */}
      <motion.nav
        initial={false}
        animate={{ maxWidth: scrolled ? 1040 : 1240 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`relative mx-auto flex h-[60px] items-center justify-between rounded-full bg-navy-900/95 pl-5 pr-2 ring-1 ring-white/10 backdrop-blur-xl backdrop-saturate-150 transition-shadow duration-500 ${
          scrolled || open ? 'shadow-[0_18px_40px_-18px_rgba(21,46,75,0.6)]' : 'shadow-[0_10px_30px_-20px_rgba(21,46,75,0.45)]'
        }`}
      >
        <Link href="/" aria-label="RoundU home" className="shrink-0">
          <Wordmark tone="light" className="text-[1.45rem]" />
        </Link>

        <div className="hidden items-center gap-0.5 md:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative rounded-full px-4 py-2 text-[0.875rem] transition-colors duration-300 ${
                  active ? 'text-white' : 'text-white/65 hover:text-white'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-white/[0.12]"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                {l.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5">
          <Link
            href="/early-access"
            className="group inline-flex h-11 items-center gap-2 btn-shine rounded-full pl-5 pr-2 text-[0.875rem] font-semibold"
          >
            Join waitlist
            <span className="grid h-7 w-7 place-items-center rounded-full bg-navy-900 text-white transition-transform duration-300 group-hover:translate-x-0.5">
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="grid h-11 w-11 place-items-center rounded-full bg-white/10 md:hidden"
          >
            <span className="relative block h-3 w-[18px]">
              <motion.span
                animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                className="absolute left-0 top-0 h-[1.5px] w-full bg-white"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                className="absolute bottom-0 left-0 h-[1.5px] w-full bg-white"
              />
            </span>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-2 max-h-[calc(100svh-88px)] overflow-y-auto rounded-[28px] bg-navy-900/95 p-3 ring-1 ring-white/10 shadow-[0_18px_40px_-18px_rgba(21,46,75,0.6)] backdrop-blur-xl md:hidden"
          >
            <ul>
              {[...links,{ label: 'Contact', href: '/contact' }].map((l, i) => {
                const active = pathname === l.href;
                return (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i + 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={l.href}
                      className={`flex items-center justify-between rounded-[18px] px-4 py-4 text-[1.35rem] font-semibold tracking-tight ${
                        active ? 'bg-white/10 text-white' : 'text-white/70'
                      }`}
                    >
                      {l.label}                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

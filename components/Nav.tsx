'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}>
      <div className="container mx-auto px-6 lg:px-12">
        <div
          className={`flex items-center justify-between transition-all duration-300 px-6 py-3 rounded-full ${
            scrolled
              ? 'bg-slate-900/90 backdrop-blur-md border border-slate-800 shadow-xl'
              : 'bg-transparent'
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 group">
            <span className="text-2xl font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
              round<span className="text-amber-500">U</span>
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/#features"
              className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors"
            >
              Why RoundU
            </Link>
            <Link
              href="/#providers"
              className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors"
            >
              For Providers
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors"
            >
              About
            </Link>
          </div>

          {/* Waitlist CTA Button */}
          <Link
            href="/#waitlist"
            className="btn-amber px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
          >
            Join Waitlist
          </Link>
        </div>
      </div>
    </nav>
  );
}

'use client';

import { useEffect, useState } from 'react';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-6'}`}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className={`flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'glass-dark rounded-full px-6 py-3 glow-amber' : ''
        }`}>
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center font-display font-bold text-ink text-lg group-hover:scale-110 transition-transform">
              <span className="relative z-10">R</span>
              <div className="absolute inset-0 rounded-xl bg-amber-500 blur-xl opacity-50 group-hover:opacity-80 transition-opacity"></div>
            </div>
            <span className="font-display text-2xl font-semibold text-bg">roundu</span>
          </a>

          {/* Links */}
          <div className="hidden md:flex items-center gap-10">
            <a href="#features" className="text-sm text-bg/70 hover:text-amber-500 transition-colors font-medium">Features</a>
            <a href="#how" className="text-sm text-bg/70 hover:text-amber-500 transition-colors font-medium">How it works</a>
            <a href="#providers" className="text-sm text-bg/70 hover:text-amber-500 transition-colors font-medium">For providers</a>
          </div>

          {/* CTA */}
          <a
            href="#waitlist"
            className="btn-primary px-6 py-2.5 rounded-full text-ink text-sm font-bold"
          >
            <span>Join waitlist</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

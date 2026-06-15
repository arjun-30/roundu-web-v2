'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-6'}`}>
      <div className="container mx-auto px-6 lg:px-12 relative">
        <div className={`flex items-center justify-between transition-all duration-700 group/nav ${
          scrolled ? 'glass-dark rounded-full px-6 py-3 glow-amber border border-white/5' : ''
        } hover:bg-white/[0.03] hover:backdrop-blur-3xl hover:border-white/20 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] relative overflow-hidden`}>
          
          {/* Scroll Progress Bar */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-500 origin-left z-20"
            style={{ scaleX }}
          />
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-bold tracking-wide text-blue-500 group-hover:text-blue-400 transition-colors">
              round<span className="text-amber-500 group-hover:text-amber-400">U</span>
            </span>
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center gap-10">
            <Link href="/#features" className="text-sm text-bg/70 hover:text-amber-500 transition-colors font-medium">Features</Link>
            <Link href="/#providers" className="text-sm text-bg/70 hover:text-amber-500 transition-colors font-medium">For providers</Link>
          </div>

          {/* CTA */}
          <Link
            href="/#waitlist"
            className="btn-waitlist px-6 py-2.5 rounded-full text-ink text-sm font-bold"
          >
            <span>Join waitlist</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

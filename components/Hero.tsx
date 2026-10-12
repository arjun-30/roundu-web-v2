'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { PrimaryLink } from './ui';

const NeighbourhoodScene = dynamic(() => import('./three/NeighbourhoodScene'), { ssr: false });

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease },
  });

  return (
    <section className="relative h-[100svh] min-h-[820px] lg:min-h-[760px] overflow-hidden">
      {/* 3D stage */}
      <div
        className={`absolute inset-0 top-[60%] lg:top-0 lg:left-[22%] transition-opacity duration-[1400ms] ${
          ready ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden
      >
        <NeighbourhoodScene onReady={() => setReady(true)} />
      </div>

      {/* Readability scrims — fade the scene into the page behind the copy */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block bg-[linear-gradient(90deg,#F6F3EE_0%,#F6F3EE_30%,rgba(246,243,238,0.85)_42%,rgba(246,243,238,0)_62%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[60%] h-24 lg:hidden bg-gradient-to-b from-paper to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 lg:h-56 bg-gradient-to-t from-paper via-paper/70 to-transparent" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1280px] flex-col px-6 pt-[118px] lg:px-10 lg:pt-0 lg:justify-center pointer-events-none">
        <div className="max-w-[40rem] pointer-events-auto">
          <motion.p {...rise(0)} className="eyebrow mb-8 lg:mb-10">
            Vellore &amp; Chennai · Opening 2026
          </motion.p>

          <motion.h1
            {...rise(0.08)}
            className="font-serif text-navy-700 text-[2.5rem] leading-[1.04] sm:text-[3.4rem] lg:text-[4.1rem] lg:leading-[1.02]"
          >
            Trusted hands at your door, <em className="text-navy-300">within fifteen minutes.</em>
          </motion.h1>

          <motion.p {...rise(0.18)} className="mt-6 lg:mt-8 max-w-[31rem] text-base sm:text-lg leading-relaxed text-muted">
            Verified local professionals, priced upfront and tracked to your door.
          </motion.p>

          <motion.div {...rise(0.28)} className="mt-8 lg:mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <PrimaryLink href="/early-access">Get early access</PrimaryLink>
            <Link href="/professionals" className="btn-ghost text-[0.95rem]">
              I&rsquo;m a professional
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

/** Wraps a control so it leans gently toward the cursor. */
export function Magnetic({ children, strength = 0.3 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });
  return (
    <motion.span
      ref={ref}
      style={{ x, y }}
      className="inline-flex"
      onPointerMove={(e) => {
        if (reduce || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

export function PrimaryLink({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return (
    <Magnetic>
      <Link
        href={href}
        className={`group inline-flex h-[52px] items-center gap-3 rounded-[4px] px-7 text-[0.95rem] font-medium transition-colors ${
          light ? 'bg-paper text-navy-700 hover:bg-white' : 'bg-navy-700 text-paper hover:bg-ink'
        }`}
      >
        {children}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} />
      </Link>
    </Magnetic>
  );
}

/** Top of every inner page: small label, big serif title, one line of context. */
export function PageHeader({ label, title, lead }: { label: string; title: React.ReactNode; lead?: string }) {
  return (
    <header className="mx-auto max-w-[1280px] px-6 pb-16 pt-36 lg:px-10 lg:pb-24 lg:pt-44">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="eyebrow mb-6"
      >
        {label}
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.06, ease }}
        className="max-w-4xl font-serif text-[2.5rem] leading-[1.05] text-navy-700 sm:text-[3.4rem] lg:text-[4.25rem]"
      >
        {title}
      </motion.h1>
      {lead && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.16, ease }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
        >
          {lead}
        </motion.p>
      )}
    </header>
  );
}

/** Closing call to action used at the bottom of pages. */
export function CtaBand({
  title = 'Opening soon in Vellore & Chennai.',
  action = 'Get early access',
  href = '/early-access',
}: {
  title?: string;
  action?: string;
  href?: string;
}) {
  return (
    <section className="px-4 pb-4 lg:px-6 lg:pb-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease }}
        className="relative overflow-hidden rounded-[24px] bg-navy-700 px-6 py-20 text-paper lg:px-16 lg:py-28"
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(233,162,74,0.22),rgba(233,162,74,0)_70%)]" />
        <div className="relative mx-auto flex max-w-[1180px] flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <h2 className="max-w-2xl font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">{title}</h2>
          <PrimaryLink href={href} light>
            {action}
          </PrimaryLink>
        </div>
      </motion.div>
    </section>
  );
}

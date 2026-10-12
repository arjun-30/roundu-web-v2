'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'section';
}

// Quiet fade-up on first view. No bounce, no scale — content just settles in.
export default function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}

'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.q} className="border-t border-line last:border-b">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span className="font-serif text-xl text-ink sm:text-2xl">{item.q}</span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="text-2xl leading-none text-amber-700"
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-6 leading-relaxed text-muted">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

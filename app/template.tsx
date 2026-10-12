'use client';

import { motion } from 'framer-motion';

// Re-mounts on every navigation, giving each page a soft entrance. Opacity only:
// a transform here would break the fixed nav and sticky sections.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

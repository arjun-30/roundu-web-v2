'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Search, UserCheck, Star } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Find what you need',
    description: 'Browse 5+ services. Describe your problem. Add photos if needed. Set it for now or schedule later.',
  },
  {
    icon: UserCheck,
    title: 'Match with the best',
    description: 'Our AI finds the top-rated verified provider near you. See their video intro, photos, and reviews before confirming.',
  },
  {
    icon: Star,
    title: 'Track, pay, rate',
    description: 'Watch them arrive in real-time. Pay securely. Get 5% cashback. Rate and help our AI get smarter.',
  },
];

export default function HowItWorks() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="how" ref={ref} className="relative py-32 bg-navy-950 overflow-hidden">
      {/* Center vertical line */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-amber-500/30 to-transparent" />
      </div>

      {/* Background orbs */}
      <div className="orb orb-amber w-[500px] h-[500px] top-0 left-1/4 animate-pulse-glow" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs tracking-[0.3em] text-amber-500 uppercase mb-6"
          >
            [ how it works ]
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-display font-semibold text-bg"
          >
            Three taps to a <span className="text-gradient-amber italic">fixed home.</span>
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-4 max-w-6xl mx-auto">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.15 }}
                className="relative"
              >
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[calc(50%+4rem)] right-0 h-px bg-gradient-to-r from-amber-500/40 via-amber-500/20 to-transparent" />
                )}

                <div className="relative text-center md:text-left">
                  {/* Number + Icon */}
                  <div className="relative inline-flex items-center justify-center mb-8">
                    <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full" />
                    <div className="relative w-32 h-32 rounded-full glass-dark border border-amber-500/40 flex items-center justify-center glow-amber">
                      <Icon className="w-10 h-10 text-amber-500" strokeWidth={1.5} />
                    </div>
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl font-semibold text-bg mb-4">
                    {step.title}
                  </h3>
                  <p className="text-bg/65 leading-relaxed max-w-xs mx-auto md:mx-0">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

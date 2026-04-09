'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TrendingUp, Zap, Users, Wallet, UserCheck, Briefcase } from 'lucide-react';

export default function ForProviders() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { scrollY } = useScroll();
  const yOrb = useTransform(scrollY, [0, 3000], [0, 200]);

  const benefits = [
    { icon: TrendingUp, label: 'Keep 90%', sublabel: 'of every booking' },
    { icon: Zap, label: '15 min', sublabel: 'response time' },
    { icon: Users, label: '100+', sublabel: 'customers at launch' },
    { icon: Wallet, label: 'Daily', sublabel: 'payouts to bank' },
  ];

  return (
    <section id="providers" ref={ref} className="relative py-32 overflow-hidden">
      {/* Navy gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-700 via-navy-900 to-navy-950" />
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Glow with Parallax */}
      <motion.div style={{ y: yOrb }} className="absolute orb orb-amber w-[700px] h-[700px] top-0 right-0 animate-pulse-glow" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-mono text-xs tracking-[0.3em] text-amber-400 uppercase mb-6">
              [ for providers ]
            </p>

            <h2 className="font-display text-display font-semibold text-bg">
              Your skills <br />
              <span className="italic text-orange glow-text-orange">deserve more than word of mouth.</span>
            </h2>

            <p className="mt-8 text-lg text-bg/65 leading-relaxed max-w-lg">
              Build a steady flow of customers. Get paid directly to your bank
              account. Showcase your work with video intros and before/after photos.
              Keep 90% of what you charge — we only take 10%.
            </p>

            <div className="mt-10">
              <a
                href="#waitlist"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('setWaitlistRole', { detail: 'provider' }));
                }}
                className="btn-waitlist inline-flex items-center gap-3 px-8 py-4 rounded-full text-ink font-bold text-base"
              >
                <span>Register as provider</span>
                <span className="text-lg">→</span>
              </a>
            </div>
          </motion.div>

          {/* RIGHT — Benefit cards in offset grid */}
          <div className="grid grid-cols-2 gap-4">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  className="glass-dark rounded-2xl p-6 hover:bg-amber-500/5 transition-colors border border-amber-500/20 hover:border-amber-500/40"
                  style={{ transform: `translateY(${i % 2 === 0 ? '0' : '2rem'})` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-amber-500" />
                  </div>
                  <div className="font-display text-3xl md:text-4xl font-bold text-bg">
                    {benefit.label}
                  </div>
                  <div className="text-sm text-bg/50 mt-1">
                    {benefit.sublabel}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

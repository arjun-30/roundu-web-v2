'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Zap, ShieldCheck, MapPin, Wallet, Calendar, Video, Star, RefreshCw } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: '15-Minute Hyperlocal Match',
    description: 'Instant pairing with top-rated service professionals nearest to your house. No endless calling or waiting around.',
    span: 'md:col-span-2',
  },
  {
    icon: ShieldCheck,
    title: 'DigiLocker Verified Pros',
    description: 'Every provider\'s Aadhaar, PAN, and identity are government-verified before their first job.',
  },
  {
    icon: MapPin,
    title: 'Real-Time GPS Tracking',
    description: 'Track your service provider\'s route on a live map from dispatch straight to your doorstep.',
  },
  {
    icon: Wallet,
    title: '5% Instant Cashback',
    description: 'Earn instant wallet credits on every completed service to save on your next booking.',
  },
  {
    icon: Calendar,
    title: 'Automated Subscriptions',
    description: 'Set weekly car washing, bi-weekly house cleaning, or quarterly AC maintenance on autopilot.',
    span: 'md:col-span-2',
  },
  {
    icon: Video,
    title: 'Video Intros & Portfolios',
    description: 'Watch 30-second provider intros and inspect before-and-after work photos before you book.',
  },
];

export default function Features() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="features" ref={ref} className="relative py-28 bg-slate-950/40">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <span className="badge-pill">
              Why RoundU
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight"
          >
            Not just another booking app. <br />
            <span className="text-amber-400">A better way to run your home.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed"
          >
            We rebuilt home services around speed, trust, and total transparency — built specifically for households in Vellore and Chennai.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`surface-card rounded-2xl p-7 border border-slate-800 hover:border-amber-500/30 flex flex-col justify-between ${
                  feature.span || ''
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center mb-5 text-amber-400">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {feature.description}
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

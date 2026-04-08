'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Video, Wallet, Gift, Calendar, Bell, MapPin, Shield } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI Recommendations',
    description: 'Personalized service suggestions based on your home, preferences, and past bookings. The more you use, the smarter it gets.',
    span: 'md:col-span-2',
  },
  {
    icon: Video,
    title: 'Video Profiles',
    description: 'Watch provider intros and see before/after photos before you book.',
  },
  {
    icon: Wallet,
    title: '5% Cashback',
    description: 'Earn instant wallet credit on every booking.',
  },
  {
    icon: Gift,
    title: 'Refer & Earn',
    description: 'Share your code, both of you get ₹100 when your friend books.',
  },
  {
    icon: Calendar,
    title: 'Subscription Plans',
    description: 'Weekly car wash, monthly cleaning, quarterly AC service. Set it once, your home stays perfect.',
    span: 'md:col-span-2',
  },
  {
    icon: Bell,
    title: 'Smart Reminders',
    description: 'Push notifications + AI voice calls 30 min before service.',
  },
  {
    icon: MapPin,
    title: 'Live Tracking',
    description: 'See your provider on the map in real-time, just like Ola.',
  },
  {
    icon: Shield,
    title: 'Verified via DigiLocker',
    description: 'Every provider\'s Aadhaar and PAN are government-verified. Real people, real credentials.',
    span: 'md:col-span-2',
  },
];

export default function Features() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="features" ref={ref} className="relative py-32 mesh-bg overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-25" />

      {/* Background orbs */}
      <div className="orb orb-amber w-[500px] h-[500px] top-1/4 -left-32 animate-pulse-glow" />
      <div className="orb orb-secondary w-[500px] h-[500px] bottom-0 -right-32 animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section header */}
        <div className="max-w-3xl mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs tracking-[0.3em] text-amber-500 uppercase mb-6"
          >
            [ why roundu ]
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-display font-semibold text-bg"
          >
            Not just an app.
            <br />
            <span className="text-gradient-amber italic">A whole new way</span> to run your home.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 text-lg text-bg/65 max-w-2xl"
          >
            We rebuilt home services from scratch — AI-powered, hyperlocal,
            and designed for people who don't have time to wait.
          </motion.p>
        </div>

        {/* Bento grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.08 }}
                className={`tilt-card tilt-card-amber group relative glass-dark rounded-3xl p-8 overflow-hidden ${feature.span || ''}`}
              >
                {/* Hover gradient overlay */}
                <div className="absolute -top-20 -right-20 w-48 h-48 bg-amber-500/20 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-500 rounded-full" />


                {/* Icon with glow */}
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center mb-6 glow-amber">
                  <Icon className="w-7 h-7 text-ink" strokeWidth={2.5} />
                </div>

                {/* Content */}
                <h3 className="relative font-display text-2xl font-semibold text-bg mb-3">
                  {feature.title}
                </h3>
                <p className="relative text-bg/60 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

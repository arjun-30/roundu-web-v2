'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Clock, Star } from 'lucide-react';
import AppPreview from './AppPreview';

const categoryPills = [
  'Housekeeping',
  'Plumbers',
  'Electricians',
  'Mechanics',
  'Car Wash',
  'Acting Drivers',
];

export default function Hero() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-grid-pattern">
      {/* Organic Subtle Ambient Lighting (No Neon Orbs) */}
      <div className="ambient-glow ambient-glow-amber w-[600px] h-[600px] -top-32 -left-32" />
      <div className="ambient-glow ambient-glow-blue w-[700px] h-[700px] -bottom-32 -right-32" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT — Copy & Hero Action */}
          <div className="lg:col-span-7">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="text-xs font-semibold text-amber-300 tracking-wide uppercase">
                Launching Soon in Vellore & Chennai
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] mb-6"
            >
              Home services, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600">
                delivered in a heartbeat.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-300 max-w-xl leading-relaxed mb-8"
            >
              RoundU matches you with background-checked local professionals at your doorstep in under 15 minutes. Transparent pricing, zero haggling.
            </motion.p>

            {/* Service Pills Selector */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-10"
            >
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Select a service to preview:
              </p>
              <div className="flex flex-wrap gap-2">
                {categoryPills.map((cat, idx) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(idx)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeCategory === idx
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#waitlist"
                className="btn-amber inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-slate-950 font-bold text-base"
              >
                <Sparkles className="w-4 h-4" />
                <span>Join the Waitlist</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#providers"
                className="btn-secondary inline-flex items-center justify-center px-6 py-4 rounded-xl text-slate-200 font-semibold text-base"
              >
                Register as Provider
              </a>
            </motion.div>

            {/* Trust Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-6 max-w-lg"
            >
              <div>
                <div className="flex items-center gap-1.5 text-2xl font-extrabold text-white">
                  <span>100+</span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">Verified Pros</div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-2xl font-extrabold text-white">
                  <span>&lt;15m</span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">Dispatch Time</div>
              </div>

              <div>
                <div className="flex items-center gap-1 text-2xl font-extrabold text-white">
                  <span>4.9</span>
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <div className="text-xs text-slate-400 mt-0.5">Average Rating</div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Photorealistic App Preview Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 flex justify-center"
          >
            <AppPreview />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

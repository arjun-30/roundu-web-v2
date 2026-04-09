'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';

const services = [
  'electricians',
  'plumbers',
  'cleaners',
  'mechanics',
  'car washers',
  'AC repairers',
  'painters',
  'carpenters',
  'beauticians',
  'gardeners'
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % services.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden mesh-bg">
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* Animated neon orbs */}
      <div className="orb orb-amber w-[600px] h-[600px] -top-32 -left-32 animate-pulse-glow" />
      <div className="orb orb-secondary w-[700px] h-[700px] -bottom-32 -right-32 animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      <div className="orb orb-navy w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-glow" style={{ animationDelay: '3s' }} />

      {/* Scan line */}
      <div className="scan-line" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10 py-10 mt-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — Copy */}
          <div>
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full glass-amber glow-launch-amber mb-10"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="text-base font-medium text-amber-300 font-mono tracking-wide uppercase text-glow-amber">LAUNCHING SOON IN VELLORE & CHENNAI</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-hero font-semibold text-bg leading-[0.9] tracking-tight"
            >
              Home services
              <br />
              <span className="text-orange italic">in a heartbeat.</span>
            </motion.h1>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 text-lg md:text-xl text-bg/65 max-w-xl leading-relaxed"
            >
              RoundU connects you with verified{' '}
              <span className="inline-block min-w-[140px] text-left">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={services[index]}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="font-serif font-bold italic text-orange glow-text-orange"
                  >
                    {services[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
              , and 100+ more service providers — at your doorstep in under 15 minutes.
              Join the waitlist to be first in line.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#waitlist"
                className="btn-waitlist group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-ink font-bold text-base"
              >
                <Sparkles className="w-4 h-4" />
                <span>Join the waitlist</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-14 flex flex-wrap gap-10"
            >
              {[
                { value: '5+', label: 'Services' },
                { value: '<15 min', label: 'Response time' },
                { value: '24/7', label: 'Availability' },
              ].map((stat, i) => (
                <div key={i} className="relative">
                  <div className="font-display text-4xl font-bold text-bg">{stat.value}</div>
                  <div className="text-xs text-amber-500/80 mt-1 font-mono uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — 3D Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative perspective-2000"
          >
            <div className="phone-3d relative mx-auto w-[280px] md:w-[320px]">
              {/* Phone frame */}
              <div className="relative rounded-[3rem] p-3 phone-frame">
                <div className="rounded-[2.5rem] overflow-hidden bg-navy-950 aspect-[9/19]">
                  <div className="h-full flex flex-col p-4 mesh-bg">
                    {/* Status bar */}
                    <div className="flex justify-between items-center text-[10px] text-bg/60 mb-4 font-mono">
                      <span>9:41</span>
                      <span>roundu</span>
                    </div>

                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-[10px] text-amber-400">Good morning!</div>
                        <div className="font-display text-lg font-semibold text-bg">What do you need?</div>
                      </div>
                      <div className="w-8 h-8 rounded-full glass-amber flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                      </div>
                    </div>

                    {/* Search */}
                    <div className="glass rounded-xl px-3 py-2 mb-4 text-[11px] text-bg/40">
                      Search any service...
                    </div>

                    {/* Services grid */}
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {[
                        { icon: '⚡', label: 'Electric' },
                        { icon: '💧', label: 'Plumber' },
                        { icon: '🚗', label: 'Wash' },
                        { icon: '🔧', label: 'Fix' },
                      ].map((s, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-base mb-1">
                            {s.icon}
                          </div>
                          <span className="text-[8px] text-bg/50">{s.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Emergency banner */}
                    <div className="rounded-xl p-3 bg-gradient-to-r from-amber-500/30 to-amber-700/30 border border-amber-500/40 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-amber-500/30 flex items-center justify-center">
                          <Zap className="w-3 h-3 text-amber-300" />
                        </div>
                        <div>
                          <div className="text-[10px] font-semibold text-bg">Emergency service</div>
                          <div className="text-[8px] text-amber-300">Get help in 15 min</div>
                        </div>
                      </div>
                    </div>

                    {/* Pro card */}
                    <div className="glass-dark rounded-xl p-3 border border-amber-500/30">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center text-[10px] font-bold text-ink">RK</div>
                        <div className="flex-1">
                          <div className="text-[10px] font-semibold text-bg">Rajesh Kumar</div>
                          <div className="text-[8px] text-bg/40">★ 4.8 · 1.2 km</div>
                        </div>
                        <div className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[8px] font-semibold border border-amber-500/30">
                          Available
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-20 top-20 glass-dark px-4 py-3 rounded-2xl border border-amber-500/30 glow-amber"
                style={{ transform: 'translateZ(80px)' }}
              >
                <div className="text-[10px] text-bg/50 font-mono">NEW BOOKING</div>
                <div className="text-sm font-semibold text-bg">Electrician</div>
                <div className="text-[10px] text-amber-400 mt-1">₹500 · Confirmed</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -right-12 bottom-32 glass-dark px-4 py-3 rounded-2xl border border-amber-500/30 glow-amber"
                style={{ transform: 'translateZ(60px)' }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
                  </div>
                  <div>
                    <div className="text-[10px] text-bg/50 font-mono">ARRIVING IN</div>
                    <div className="text-sm font-semibold text-bg">4 min</div>
                  </div>
                </div>
              </motion.div>

              {/* Orbiting accent dot */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-amber-500 rounded-full glow-amber-strong orbit"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-bg/40 text-xs flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-amber-500 to-transparent animate-shimmer"></div>
        <span className="font-mono tracking-wider">SCROLL</span>
      </div>
    </section>
  );
}

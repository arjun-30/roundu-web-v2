'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TrendingUp, Clock, Users, Wallet, ShieldCheck, ArrowRight } from 'lucide-react';

export default function ForProviders() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const benefits = [
    { icon: TrendingUp, label: 'Keep 90%', sublabel: 'Of every booking revenue' },
    { icon: Clock, label: '<15 Mins', sublabel: 'Average customer dispatch match' },
    { icon: Wallet, label: 'Daily Payouts', sublabel: 'Direct settlement to your bank' },
    { icon: ShieldCheck, label: 'DigiLocker Badge', sublabel: 'Build instant customer trust' },
  ];

  return (
    <section id="providers" ref={ref} className="relative py-28 bg-slate-900/60 border-y border-slate-800/80">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* LEFT — Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <span className="badge-pill mb-6 inline-flex">
              For Local Service Providers
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-6">
              Your skills deserve more <br />
              <span className="text-amber-400">than word-of-mouth.</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-xl">
              Build a steady daily income with RoundU. Get direct customer bookings near your area, showcase video intros and past work, and enjoy transparent 90% payout rates.
            </p>

            <a
              href="#waitlist"
              onClick={() => {
                window.dispatchEvent(new CustomEvent('setWaitlistRole', { detail: 'provider' }));
              }}
              className="btn-amber inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-slate-950 font-bold text-sm"
            >
              <span>Register as a Provider</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* RIGHT — Benefit Grid */}
          <div className="lg:col-span-6 grid sm:grid-cols-2 gap-4">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                  className="surface-card rounded-2xl p-6 border border-slate-800 flex flex-col justify-between"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 text-amber-400">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="text-2xl font-extrabold text-white tracking-tight mb-1">
                      {b.label}
                    </div>
                    <div className="text-xs text-slate-400 font-medium">
                      {b.sublabel}
                    </div>
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

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Loader2, AlertCircle, Sparkles } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';

export default function Waitlist() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'customer' | 'provider'>('customer');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [services, setServices] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [position, setPosition] = useState<number | null>(null);

  useEffect(() => {
    const handleSetRole = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setRole(customEvent.detail);
      }
    };
    window.addEventListener('setWaitlistRole', handleSetRole);
    return () => window.removeEventListener('setWaitlistRole', handleSetRole);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      if (!name.trim()) {
        setStatus('error');
        setMessage('Please enter your name.');
        return;
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setStatus('error');
        setMessage('Please enter a valid email.');
        return;
      }
      if (!phone.trim() || !/^\d{10}$/.test(phone.replace(/\s+/g, ''))) {
        setStatus('error');
        setMessage('Please enter a valid 10-digit phone number.');
        return;
      }
      if (!city.trim()) {
        setStatus('error');
        setMessage('Please enter your city.');
        return;
      }

      const existing = await getDocs(query(collection(db, 'waitlist'), where('email', '==', email.toLowerCase())));
      if (!existing.empty) {
        setStatus('error');
        setMessage("You're already registered on the waitlist!");
        return;
      }

      const allDocs = await getDocs(collection(db, 'waitlist'));
      const newPos = allDocs.size + 101;

      await addDoc(collection(db, 'waitlist'), {
        email: email.toLowerCase(),
        name: name || '',
        role: role || 'customer',
        city: city || '',
        phone: phone || '',
        services: services || '',
        position: newPos,
        createdAt: serverTimestamp(),
        userAgent: window.navigator.userAgent || '',
      });

      setStatus('success');
      setMessage("You're on the list! We'll notify you as soon as RoundU goes live in your city.");
      setPosition(newPos);
    } catch (error: any) {
      console.error('Waitlist error:', error);
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  return (
    <section id="waitlist" ref={ref} className="relative py-28 bg-slate-950">
      <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-2xl">
        
        {/* Section Title */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <span className="badge-pill">
              Join the Priority Waitlist
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4"
          >
            Be first in line when <span className="text-amber-400">RoundU launches.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base text-slate-300 max-w-lg mx-auto"
          >
            Join 2,000+ early users & service pros in Vellore & Chennai. Get priority access + early bird booking credits.
          </motion.p>
        </div>

        {/* Success Card or Form */}
        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="surface-card rounded-2xl p-8 sm:p-10 text-center border border-amber-500/30"
          >
            <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-5 text-amber-400">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">You're on the list!</h3>
            <p className="text-slate-300 text-sm mb-6">{message}</p>
            {position && (
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-sm font-medium">
                <span>Waitlist Spot:</span>
                <span className="text-amber-400 font-bold">#{position}</span>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="surface-card rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-2xl"
          >
            {/* Role Switcher Tabs */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Register as
              </label>
              <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800">
                <button
                  type="button"
                  onClick={() => setRole('customer')}
                  className={`py-2.5 px-4 rounded-lg text-xs font-bold transition-all ${
                    role === 'customer'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Customer
                </button>
                <button
                  type="button"
                  onClick={() => setRole('provider')}
                  className={`py-2.5 px-4 rounded-lg text-xs font-bold transition-all ${
                    role === 'provider'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Service Provider
                </button>
              </div>
            </div>

            {/* Inputs */}
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 text-sm focus:border-amber-500/60 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 text-sm focus:border-amber-500/60 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98765 43210"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 text-sm focus:border-amber-500/60 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Vellore, Chennai..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 text-sm focus:border-amber-500/60 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {role === 'provider' && (
              <div className="mb-6">
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Services Provided
                </label>
                <input
                  type="text"
                  value={services}
                  onChange={(e) => setServices(e.target.value)}
                  placeholder="e.g. Plumbing, Electrical, Car Detailing..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 text-sm focus:border-amber-500/60 focus:outline-none transition-colors"
                />
              </div>
            )}

            {status === 'error' && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/40 border border-red-500/30 flex items-center gap-2 text-red-400 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{message}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading' || !email || !name || !phone || !city}
              className="btn-amber w-full py-3.5 rounded-xl text-slate-950 font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <span>Reserve My Spot</span>
              )}
            </button>
          </motion.form>
        )}

      </div>
    </section>
  );
}

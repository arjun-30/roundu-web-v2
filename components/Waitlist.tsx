'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Loader2, AlertCircle } from 'lucide-react';
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
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setStatus('error');
        setMessage('Please enter a valid email.');
        return;
      }

      const existing = await getDocs(query(collection(db, 'waitlist'), where('email', '==', email.toLowerCase())));
      if (!existing.empty) {
        setStatus('error');
        setMessage("You're already on the waitlist!");
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
      setMessage("You're in! We'll notify you when RoundU launches.");
      setPosition(newPos);
    } catch (error: any) {
      console.error('Waitlist error:', error);
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  return (
    <section id="waitlist" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 mesh-bg" />
      <div className="absolute inset-0 grid-bg opacity-25" />

      {/* Big center glow */}
      <div className="orb orb-amber w-[900px] h-[900px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-glow" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs tracking-[0.3em] text-amber-500 uppercase mb-6"
          >
            [ join the waitlist ]
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-display font-semibold text-bg mb-6"
          >
            Be <span className="text-gradient-amber italic glow-text-amber">first</span> in line.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg text-bg/65 mb-12"
          >
            Join 2,000+ others waiting for launch. Get notified the moment we go
            live in your city — plus exclusive early-bird perks and free credits.
          </motion.p>

          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-dark rounded-3xl p-12 border border-amber-500/30 glow-amber"
            >
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto mb-6 glow-amber">
                <Check className="w-8 h-8 text-amber-500" strokeWidth={3} />
              </div>
              <h3 className="font-display text-3xl font-semibold text-bg mb-3">
                You're in!
              </h3>
              <p className="text-bg/70 mb-4">{message}</p>
              {position && (
                <div className="inline-block px-6 py-3 rounded-full glass-amber border border-amber-500/40">
                  <span className="text-bg/50 text-sm">You're </span>
                  <span className="font-display text-amber-400 font-bold text-lg">#{position}</span>
                  <span className="text-bg/50 text-sm"> on the list</span>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              onSubmit={handleSubmit}
              className="glass-dark rounded-3xl p-8 md:p-10 text-left border border-amber-500/20"
            >
              {/* Role toggle */}
              <div className="mb-6">
                <label className="block text-xs font-mono tracking-wider text-amber-500/80 uppercase mb-3">
                  I am a
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['customer', 'provider'] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => {
                        setRole(r);
                      }}
                      className={`py-3 px-4 rounded-xl font-bold transition-all ${
                        role === r
                          ? 'btn-orange text-ink glow-amber'
                          : 'glass text-bg/60 hover:bg-amber-500/5 hover:text-bg'
                      } ${r === 'provider' ? 'font-display' : ''}`}
                    >
                      {r === 'customer' ? 'Customer' : 'Service Provider'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div className="mb-4">
                <label className="block text-xs font-mono tracking-wider text-amber-500/80 uppercase mb-2">
                  Your name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 rounded-xl glass text-bg placeholder-bg/30 border border-amber-500/20 focus:border-amber-500/60 focus:outline-none transition-colors"
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-xs font-mono tracking-wider text-amber-500/80 uppercase mb-2">
                  Email address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl glass text-bg placeholder-bg/30 border border-amber-500/20 focus:border-amber-500/60 focus:outline-none transition-colors"
                />
              </div>

              {/* Phone */}
              <div className="mb-4">
                <label className="block text-xs font-mono tracking-wider text-amber-500/80 uppercase mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 98765 43210"
                  className="w-full px-4 py-3 rounded-xl glass text-bg placeholder-bg/30 border border-amber-500/20 focus:border-amber-500/60 focus:outline-none transition-colors"
                />
              </div>

              {/* City */}
              <div className="mb-6">
                <label className="block text-xs font-mono tracking-wider text-amber-500/80 uppercase mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Vellore, Chennai, Bengaluru..."
                  className="w-full px-4 py-3 rounded-xl glass text-bg placeholder-bg/30 border border-amber-500/20 focus:border-amber-500/60 focus:outline-none transition-colors"
                />
              </div>

              {/* Services (Provider Only) */}
              {role === 'provider' && (
                <div className="mb-6">
                  <label className="block text-xs font-mono tracking-wider text-amber-500/80 uppercase mb-2">
                    What services do you provide?
                  </label>
                  <input
                    type="text"
                    value={services}
                    onChange={(e) => setServices(e.target.value)}
                    placeholder="e.g. Plumbing, Electrician, Cleaning..."
                    className="w-full px-4 py-3 rounded-xl glass text-bg placeholder-bg/30 border border-amber-500/20 focus:border-amber-500/60 focus:outline-none transition-colors"
                  />
                </div>
              )}

              {status === 'error' && (
                <div className="mb-4 flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{message}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading' || !email}
                className="btn-waitlist w-full py-4 rounded-xl text-ink font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Joining...</span>
                  </>
                ) : (
                  <span>Reserve my spot →</span>
                )}
              </button>

              <p className="text-xs text-bg/40 text-center mt-4">
                We'll never spam you. Unsubscribe anytime.
              </p>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}

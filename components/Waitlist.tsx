'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import Reveal from './Reveal';
import { CyclingScene } from './fixit/TradeExplorer';

export default function Waitlist() {
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
    if (new URLSearchParams(window.location.search).get('role') === 'provider') setRole('provider');
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
      setMessage("We'll write to you as soon as RoundU opens in your city.");
      setPosition(newPos);
    } catch (error: any) {
      console.error('Waitlist error:', error);
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  return (
    <section id="waitlist" className="pt-36 pb-24 lg:pt-44 lg:pb-32">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10 grid lg:grid-cols-12 gap-14 lg:gap-10">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow mb-6">Early access</p>
            <h1 className="font-serif text-navy-700 text-[2.8rem] sm:text-6xl leading-[1.02]">
              Be first through <em className="text-navy-300">the door.</em>
            </h1>
            <p className="mt-6 mb-12 text-lg leading-relaxed text-muted max-w-md">
              Opening in Vellore and Chennai first.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white border border-line rounded-[6px] p-10 sm:p-14"
              >
                <p className="eyebrow">Confirmed</p>
                <h3 className="mt-4 font-serif text-4xl text-navy-700">You&rsquo;re on the list.</h3>
                <p className="mt-4 text-muted leading-relaxed">{message}</p>
                {position && (
                  <div className="mt-10 pt-6 border-t border-line flex items-baseline justify-between">
                    <span className="text-sm text-muted">Your place in line</span>
                    <span className="font-serif text-5xl tabular text-ink">
                      <span className="text-amber-700 text-3xl mr-1">№</span>
                      {position}
                    </span>
                  </div>
                )}
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white border border-line rounded-[6px] p-8 sm:p-12"
                noValidate
              >
                <fieldset>
                  <legend className="eyebrow mb-4">I&rsquo;m joining as</legend>
                  <div className="grid grid-cols-2 border border-line rounded-[4px] p-1">
                    {(['customer', 'provider'] as const).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRole(r)}
                        aria-pressed={role === r}
                        className={`h-11 rounded-[3px] text-sm transition-colors duration-300 ${
                          role === r ? 'bg-navy-700 text-paper' : 'text-muted hover:text-ink'
                        }`}
                      >
                        {r === 'customer' ? 'A customer' : 'A professional'}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-6">
                  <label className="block">
                    <span className="text-xs text-muted">Full name</span>
                    <input
                      type="text"
                      required
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Rahul Sharma"
                      className="field"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs text-muted">Email</span>
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="field"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs text-muted">Phone</span>
                    <input
                      type="tel"
                      required
                      autoComplete="tel-national"
                      inputMode="numeric"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98765 43210"
                      className="field tabular"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs text-muted">City</span>
                    <input
                      type="text"
                      required
                      autoComplete="address-level2"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Vellore"
                      className="field"
                    />
                  </label>
                  {role === 'provider' && (
                    <label className="block sm:col-span-2">
                      <span className="text-xs text-muted">Services you offer</span>
                      <input
                        type="text"
                        value={services}
                        onChange={(e) => setServices(e.target.value)}
                        placeholder="Plumbing, electrical, car detailing…"
                        className="field"
                      />
                    </label>
                  )}
                </div>

                {status === 'error' && (
                  <p role="alert" className="mt-6 text-sm text-red-700 border-l-2 border-red-700 pl-3">
                    {message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading' || !email || !name || !phone || !city}
                  className="btn-primary mt-10 w-full h-[54px] text-[0.95rem] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Reserving your place
                    </>
                  ) : (
                    <>
                      Reserve my place
                      <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
                    </>
                  )}
                </button>
                <p className="mt-4 text-xs text-muted text-center">
                  No spam. We&rsquo;ll only contact you about your RoundU launch.
                </p>
              </form>
            )}
          </Reveal>
        </div>

        <aside className="hidden lg:block lg:col-span-5 lg:col-start-8">
          <Reveal delay={0.15} className="sticky top-28 pb-8">
            <CyclingScene />
            <p className="mt-14 text-sm text-muted">Verified professionals for every corner of your home.</p>
          </Reveal>
        </aside>
      </div>
    </section>
  );
}

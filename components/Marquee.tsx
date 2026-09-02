'use client';

import { motion } from 'framer-motion';

const services1 = [
  'Housekeeping', 'Plumbing', 'Car Detailing', 'Mechanics', 'Electricians', 'Acting Drivers',
];

const services2 = [
  'AC Repair', 'Carpentry', 'Home Cleaning', 'Pest Control', 'Appliance Repair', 'Painters',
];

export default function Marquee() {
  return (
    <section className="py-16 border-y border-slate-800/80 bg-slate-950/60 overflow-hidden relative">
      <div className="container mx-auto px-6 mb-8 text-center">
        <span className="badge-pill">
          Explore Our Category Spectrum
        </span>
      </div>

      <div className="relative marquee-mask">
        {/* Row 1 */}
        <div className="marquee mb-4">
          {[...services1, ...services1, ...services1, ...services1].map((service, i) => (
            <div
              key={i}
              className="shrink-0 mx-6 text-2xl sm:text-4xl font-bold text-slate-300 hover:text-amber-400 transition-colors cursor-default tracking-tight uppercase"
            >
              {service}
              <span className="inline-block mx-6 w-1.5 h-1.5 rounded-full bg-slate-700 align-middle" />
            </div>
          ))}
        </div>

        {/* Row 2 — Reverse */}
        <div className="marquee-reverse">
          {[...services2, ...services2, ...services2, ...services2].map((service, i) => (
            <div
              key={i}
              className="shrink-0 mx-6 text-xl sm:text-3xl font-medium text-slate-500 hover:text-white transition-colors cursor-default tracking-tight"
            >
              {service}
              <span className="inline-block mx-6 w-1.5 h-1.5 rounded-full bg-amber-500/40 align-middle" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

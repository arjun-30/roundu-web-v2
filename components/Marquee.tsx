'use client';

import { motion } from 'framer-motion';

const services = [
  'Housekeeping', 'Plumbing', 'Car Wash', 'Mechanics', 'Electrician', 'Acting Drivers',
];

const services2 = [
  'Housekeeping', 'Plumbing', 'Car Wash', 'Mechanics', 'Electrician', 'Acting Drivers',
];

export default function Marquee() {
  return (
    <section className="py-20 border-y border-amber-500/10 overflow-hidden bg-navy-950 relative">
      <div className="absolute inset-0 grid-bg-fine opacity-30" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-10 text-center relative z-10">
          <p className="font-mono text-xs tracking-[0.3em] text-orange uppercase">
            [ your core services · one app · zero hassle ]
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-navy-950 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-navy-950 to-transparent z-10" />

          {/* Row 1 */}
          <div className="marquee mb-4">
            {[...services, ...services, ...services, ...services].map((service, i) => (
              <div key={i} className="shrink-0 mx-6 text-4xl md:text-6xl font-display font-bold text-white/90 hover:text-amber-500 hover:text-glow-amber transition-all duration-500 cursor-default tracking-tight inline-block uppercase">
                {service}
                <span className="inline-block mx-6 w-2 h-2 rounded-full bg-white/20 align-middle" />
              </div>
            ))}
          </div>

          {/* Row 2 — reverse direction */}
          <div className="marquee-reverse">
            {[...services2, ...services2, ...services2, ...services2].map((service, i) => (
              <div key={i} className="shrink-0 mx-6 text-3xl md:text-5xl font-mono font-bold text-amber-500/60 hover:text-white hover:text-glow-white transition-all duration-500 cursor-default tracking-tight inline-block">
                {service}
                <span className="inline-block mx-6 w-1.5 h-1.5 rounded-full bg-amber-500 align-middle opacity-30 shadow-[0_0_8px_rgba(245,158,11,0.2)]" />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

'use client';

const services = [
  'Housekeeping', 'Plumbing', 'Car Wash', 'Mechanics', 'Electrician',
];

const services2 = [
  'Housekeeping', 'Plumbing', 'Car Wash', 'Mechanics', 'Electrician',
];

export default function Marquee() {
  return (
    <section className="py-20 border-y border-amber-500/10 overflow-hidden bg-navy-950 relative">
      <div className="absolute inset-0 grid-bg-fine opacity-30" />
      <div className="mb-10 text-center relative z-10">
        <p className="font-mono text-xs tracking-[0.3em] text-orange uppercase text-glow-amber">
          [ your core services · one app · zero hassle ]
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-navy-950 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-navy-950 to-transparent z-10" />

        {/* Row 1 */}
        <div className="marquee mb-4">
          {[...services, ...services, ...services, ...services].map((service, i) => (
            <div key={i} className="shrink-0 mx-6 text-4xl md:text-6xl font-display font-bold text-bg/10 hover:text-orange hover:text-glow-amber transition-all cursor-default tracking-wide">
              {service}
              <span className="inline-block mx-6 w-2 h-2 rounded-full bg-orange align-middle shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
            </div>
          ))}
        </div>

        {/* Row 2 — reverse direction */}
        <div className="marquee-reverse">
          {[...services2, ...services2, ...services2, ...services2].map((service, i) => (
            <div key={i} className="shrink-0 mx-6 text-3xl md:text-5xl font-display font-bold text-orange/15 hover:text-orange hover:text-glow-amber transition-all cursor-default italic tracking-wide">
              {service}
              <span className="inline-block mx-6 w-1.5 h-1.5 rounded-full bg-orange align-middle opacity-50" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

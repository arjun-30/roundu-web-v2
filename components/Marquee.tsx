'use client';

const services = [
  'Electrician', 'Plumber', 'Car Wash', 'Mechanic', 'Home Cleaner', 'Painter',
  'Carpenter', 'AC Repair', 'Pest Control', 'Locksmith', 'Salon at Home',
  'Bike Service', 'Gardener', 'Interior Design', 'Mason', 'Tow Truck',
  'Welder', 'Massage', 'Yoga Trainer', 'Personal Chef', 'TV Repair',
  'Fridge Repair', 'Pool Cleaning', 'CCTV Install', 'IT Support',
];

const services2 = [
  'Deep Cleaning', 'Tile Work', 'Waterproofing', 'Pet Grooming', 'Wallpaper',
  'Curtain Install', 'Computer Repair', 'Solar Install', 'Battery Service',
  'AC Install', 'Modular Kitchen', 'Roofing', 'Glass Work', 'Sofa Repair',
];

export default function Marquee() {
  return (
    <section className="py-20 border-y border-amber-500/10 overflow-hidden bg-navy-950 relative">
      <div className="absolute inset-0 grid-bg-fine opacity-30" />

      <div className="mb-10 text-center relative z-10">
        <p className="font-mono text-xs tracking-[0.3em] text-amber-500 uppercase">
          [ 5+ services · one app · zero hassle ]
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-navy-950 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-navy-950 to-transparent z-10" />

        {/* Row 1 */}
        <div className="marquee mb-4">
          {[...services, ...services].map((service, i) => (
            <div key={i} className="shrink-0 mx-6 text-4xl md:text-6xl font-serif font-medium text-bg/10 hover:text-amber-500 transition-colors cursor-default tracking-wide">
              {service}
              <span className="inline-block mx-6 w-2 h-2 rounded-full bg-amber-500 align-middle" />
            </div>
          ))}
        </div>

        {/* Row 2 — reverse direction */}
        <div className="marquee-reverse">
          {[...services2, ...services2].map((service, i) => (
            <div key={i} className="shrink-0 mx-6 text-3xl md:text-5xl font-serif font-medium text-amber-500/15 hover:text-amber-500 transition-colors cursor-default italic tracking-wide">
              {service}
              <span className="inline-block mx-6 w-1.5 h-1.5 rounded-full bg-amber-700 align-middle" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

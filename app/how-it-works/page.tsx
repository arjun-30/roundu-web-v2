import { BadgeCheck, IndianRupee, MapPin } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import HowItWorks from '@/components/HowItWorks';
import Faq from '@/components/Faq';
import { CtaBand, PageHeader } from '@/components/ui';

export const metadata = {
  title: 'How it works · RoundU',
  description: 'Ask, match, arrive. How RoundU gets a verified professional to your door.',
};

const promises = [
  { icon: BadgeCheck, title: 'Verified', body: 'Every pro is ID-checked on DigiLocker.' },
  { icon: IndianRupee, title: 'Upfront price', body: 'See it before you book. Pay after.' },
  { icon: MapPin, title: 'Live tracking', body: 'Follow them to your door.' },
];

const faqs = [
  { q: 'How fast can someone arrive?', a: 'We aim to match you with a nearby professional within fifteen minutes of booking.' },
  { q: 'When do I pay?', a: 'Only after the job is done. The price is shown before you confirm.' },
  { q: 'How are professionals checked?', a: 'Identity is verified through DigiLocker and every pro is onboarded in person.' },
  { q: 'Where is RoundU available?', a: 'We open first in Coimbatore.' },
];

export default function HowItWorksPage() {
  return (
    <main>
      <Nav />
      <PageHeader
        label="How it works"
        title={
          <>
            Three steps. <em className="text-navy-300">About fifteen minutes.</em>
          </>
        }
        lead="Scroll to walk through a booking."
      />

      <HowItWorks heading={false} />

      <section className="mx-auto max-w-[1280px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-px overflow-hidden rounded-[20px] border border-line bg-line sm:grid-cols-3">
          {promises.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className="group bg-paper p-8 transition-colors duration-500 hover:bg-white lg:p-10">
              <p.icon
                className="h-7 w-7 text-amber-700 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110"
                strokeWidth={1.5}
              />
              <h3 className="mt-8 font-serif text-3xl text-navy-700">{p.title}</h3>
              <p className="mt-2 text-muted">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1280px] gap-10 px-6 pb-24 lg:grid-cols-12 lg:px-10 lg:pb-32">
        <Reveal className="lg:col-span-4">
          <h2 className="font-serif text-4xl leading-[1.05] text-navy-700">Questions</h2>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <Faq items={faqs} />
        </Reveal>
      </section>

      <CtaBand />
      <Footer />
    </main>
  );
}

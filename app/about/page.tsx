import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { CtaBand, PageHeader } from '@/components/ui';

export const metadata = {
  title: 'About · RoundU',
  description: 'Why we are building RoundU, and where we are starting.',
};

const values = [
  { title: 'Fast', body: 'A professional matched in minutes, not a day of phone calls.' },
  { title: 'Trusted', body: 'Every pro is verified before their first job.' },
  { title: 'Fair', body: 'Clear prices for you, a fair share for them.' },
];

const founderNote = [
  'I started RoundU with a simple thought: technology should make everyday life easier, not more complicated.',
  'Finding the right service professional can often be time-consuming and uncertain. At the same time, many local service providers have the skills to deliver great work but lack the digital tools to reach more customers.',
  'I saw an opportunity to bring these two sides together through a single platform.',
  'My vision for RoundU goes beyond building an app. I want to build a technology-driven ecosystem that makes local services easier to access, helps service professionals grow, and creates a more connected experience for everyone.',
  'As a founder, I believe in starting small, learning continuously, and building for the long term. There is a lot to accomplish, and RoundU is only the beginning.',
];

export default function AboutPage() {
  return (
    <main>
      <Nav />
      <PageHeader
        label="About"
        title={
          <>
            Home services, <em className="text-navy-300">done properly.</em>
          </>
        }
      />

      <section className="mx-auto grid max-w-[1280px] gap-10 px-6 pb-24 lg:grid-cols-12 lg:px-10 lg:pb-32">
        <Reveal className="lg:col-span-7">
          <p className="font-serif text-2xl leading-snug text-ink sm:text-3xl">
            Finding someone reliable to fix things at home still means calling five people and waiting all day. We
            started RoundU to make it as simple as booking a ride.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="text-lg leading-relaxed text-muted lg:col-span-4 lg:col-start-9 lg:pt-2">
          We&rsquo;re a small team in Vellore. We open in Coimbatore first, then the rest of Tamil Nadu.
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="grid gap-10 sm:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08} className="border-t border-ink/70 pt-6">
              <h2 className="font-serif text-4xl text-navy-700">{v.title}</h2>
              <p className="mt-3 text-muted">{v.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="grid gap-10 border-t border-line pt-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow mb-5">A note from the founder</p>
            <h2 className="font-serif text-4xl leading-[1.05] text-navy-700 sm:text-5xl">
              Technology should make life <em className="text-navy-300">easier.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
            <div className="space-y-5 text-lg leading-relaxed text-muted">
              {founderNote.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
            <p className="mt-10 border-l-2 border-amber-500 pl-5 font-serif text-2xl leading-snug text-navy-700 sm:text-[1.7rem]">
              We&rsquo;re building RoundU one step at a time, with a clear vision of where we want to go.
            </p>
            <div className="mt-10">
              <p className="text-lg font-semibold text-ink">Arjun Ramesh</p>
              <p className="text-muted">Founder, RoundU</p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand title="Want to build this with us?" action="Write to us" href="/contact" />
      <Footer />
    </main>
  );
}

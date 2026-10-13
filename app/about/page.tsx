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

      <CtaBand title="Want to build this with us?" action="Write to us" href="/contact" />
      <Footer />
    </main>
  );
}

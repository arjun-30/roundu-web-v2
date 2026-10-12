import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { CyclingScene } from '@/components/fixit/TradeExplorer';
import { CtaBand, PageHeader, PrimaryLink } from '@/components/ui';

export const metadata = {
  title: 'For professionals · RoundU',
  description: 'Keep 90% of every job, get paid daily, and find work in your own neighbourhood.',
};

const terms = [
  { figure: '90%', label: 'of every booking is yours' },
  { figure: 'Daily', label: 'payouts to your bank' },
  { figure: '₹0', label: 'lead fees or subscriptions' },
];

const joining = [
  { title: 'Apply', body: 'Tell us your trade and area.' },
  { title: 'Get verified', body: 'A quick DigiLocker check and a short meeting.' },
  { title: 'Start earning', body: 'Jobs from your neighbourhood, straight to your phone.' },
];

export default function ProfessionalsPage() {
  return (
    <main>
      <Nav />
      <PageHeader
        label="For professionals"
        title={
          <>
            Your skill deserves more than <em className="text-amber-700">word of mouth.</em>
          </>
        }
      />

      <section className="mx-auto grid max-w-[1280px] gap-16 px-6 pb-24 lg:grid-cols-12 lg:gap-10 lg:px-10 lg:pb-32">
        <div className="lg:col-span-5">
          <dl>
            {terms.map((t, i) => (
              <Reveal key={t.label} delay={i * 0.08} className="flex items-baseline gap-6 border-t border-line py-7 last:border-b">
                <dt className="w-32 shrink-0 font-serif text-5xl tabular text-navy-700">{t.figure}</dt>
                <dd className="text-lg text-ink">{t.label}</dd>
              </Reveal>
            ))}
          </dl>
          <Reveal delay={0.3} className="mt-10">
            <PrimaryLink href="/early-access?role=provider">Apply now</PrimaryLink>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="pb-8 lg:col-span-6 lg:col-start-7">
          <CyclingScene />
        </Reveal>
      </section>

      <section className="bg-navy-700 py-24 text-paper lg:py-32">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <Reveal>
            <h2 className="font-serif text-4xl leading-[1.05] sm:text-5xl">Joining takes three steps.</h2>
          </Reveal>
          <ol className="mt-14 grid gap-10 sm:grid-cols-3">
            {joining.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.1} className="border-t border-paper/20 pt-6">
                <span className="font-serif text-amber-400">0{i + 1}</span>
                <h3 className="mt-3 font-serif text-3xl">{s.title}</h3>
                <p className="mt-2 text-paper/65">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <div className="pt-4 lg:pt-6" />
      <CtaBand title="Be one of our first professionals." action="Apply now" href="/early-access?role=provider" />
      <Footer />
    </main>
  );
}

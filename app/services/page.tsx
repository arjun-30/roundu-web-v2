import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import TradeExplorer from '@/components/fixit/TradeExplorer';
import { CtaBand, PageHeader } from '@/components/ui';

export const metadata = {
  title: 'Services · RoundU',
  description: 'Plumbing, electrical, cleaning, painting, AC service, carpentry and more, from verified local professionals.',
};

const more = ['Appliance repair', 'Pest control', 'Housekeeping', 'Mechanics', 'Car care', 'Acting drivers'];

export default function ServicesPage() {
  return (
    <main>
      <Nav />
      <PageHeader
        label="Services"
        title={
          <>
            Twelve trades. <em className="text-navy-300">One standard.</em>
          </>
        }
        lead="Hover a trade to see it being fixed."
      />

      <section className="mx-auto max-w-[1280px] px-6 pb-24 lg:px-10 lg:pb-32">
        <TradeExplorer />
      </section>

      <section className="mx-auto max-w-[1280px] px-6 pb-24 lg:px-10 lg:pb-32">
        <Reveal className="border-t border-line pt-12">
          <p className="eyebrow mb-8">Also on RoundU</p>
          <ul className="flex flex-wrap gap-3">
            {more.map((m) => (
              <li
                key={m}
                className="rounded-full border border-line px-5 py-2.5 text-ink transition-colors duration-300 hover:border-navy-700 hover:bg-navy-700 hover:text-paper"
              >
                {m}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <CtaBand />
      <Footer />
    </main>
  );
}

import Link from 'next/link';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import TradeExplorer from '@/components/fixit/TradeExplorer';
import { CtaBand, PrimaryLink } from '@/components/ui';

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />

      <section className="mx-auto max-w-[1280px] px-6 py-24 lg:px-10 lg:py-32">
        <Reveal className="mb-14 flex flex-col justify-between gap-6 lg:mb-20 lg:flex-row lg:items-end">
          <h2 className="max-w-xl font-serif text-4xl leading-[1.05] text-navy-700 sm:text-5xl">
            Whatever breaks, <em className="text-navy-300">someone nearby can fix it.</em>
          </h2>
          <Link href="/services" className="btn-ghost self-start lg:self-auto">
            All services
          </Link>
        </Reveal>
        <TradeExplorer />
      </section>

      <HowItWorks />

      <section className="mx-auto max-w-[1280px] px-6 py-24 lg:px-10 lg:py-32">
        <Reveal className="grid gap-10 border-t border-line pt-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow mb-5">For professionals</p>
            <h2 className="font-serif text-4xl leading-[1.05] text-navy-700 sm:text-5xl">
              Keep <em className="text-success">90%</em> of every job.
            </h2>
          </div>
          <div className="flex flex-col items-start justify-end gap-8 lg:col-span-5 lg:col-start-8">
            <p className="text-lg leading-relaxed text-muted">Jobs from your own area, paid out daily. No lead fees.</p>
            <PrimaryLink href="/professionals">Join as a professional</PrimaryLink>
          </div>
        </Reveal>
      </section>

      <CtaBand />
      <Footer />
    </main>
  );
}

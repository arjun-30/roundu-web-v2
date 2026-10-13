import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { CtaBand, PrimaryLink } from '@/components/ui';

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />

      <HowItWorks />

      <section className="mx-auto max-w-[1280px] px-6 py-24 lg:px-10 lg:py-32">
        <Reveal className="grid gap-10 border-t border-line pt-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow mb-5">For professionals</p>
            <h2 className="font-serif text-4xl leading-[1.05] text-navy-700 sm:text-5xl">
              Keep <em className="text-success">82%</em> of every job.
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

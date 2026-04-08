import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import ForProviders from '@/components/ForProviders';
import Waitlist from '@/components/Waitlist';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Marquee />
      <Features />
      <HowItWorks />
      <ForProviders />
      <Waitlist />
      <Footer />
    </main>
  );
}

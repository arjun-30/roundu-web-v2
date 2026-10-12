import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Waitlist from '@/components/Waitlist';

export const metadata = {
  title: 'Early access · RoundU',
  description: 'Join the RoundU waitlist for Vellore and Chennai.',
};

export default function EarlyAccessPage() {
  return (
    <main>
      <Nav />
      <Waitlist />
      <Footer />
    </main>
  );
}

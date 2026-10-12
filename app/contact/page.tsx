import { ArrowUpRight } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { PageHeader } from '@/components/ui';

export const metadata = {
  title: 'Contact · RoundU',
  description: 'Get in touch with the RoundU team.',
};

const channels = [
  { label: 'Customers', subject: 'Booking help' },
  { label: 'Professionals', subject: 'Joining RoundU' },
  { label: 'Press', subject: 'Press inquiry' },
  { label: 'Investors', subject: 'Investor' },
];

export default function ContactPage() {
  return (
    <main>
      <Nav />
      <PageHeader
        label="Contact"
        title={
          <>
            Say <em className="text-navy-300">hello.</em>
          </>
        }
        lead="We reply within a working day."
      />

      <section className="mx-auto max-w-[1280px] px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="grid gap-px overflow-hidden rounded-[20px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.06} className="bg-paper">
              <a
                href={`mailto:admin@roundu.in?subject=${encodeURIComponent(c.subject)}`}
                className="group flex h-full flex-col justify-between gap-16 p-8 transition-colors duration-500 hover:bg-navy-700 hover:text-paper"
              >
                <ArrowUpRight
                  className="h-6 w-6 self-end text-amber-700 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
                <div>
                  <h2 className="font-serif text-3xl">{c.label}</h2>
                  <p className="mt-1 text-sm text-muted transition-colors group-hover:text-paper/60">admin@roundu.in</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 grid gap-10 border-t border-line pt-10 sm:grid-cols-2">
          <div>
            <p className="eyebrow mb-3">Office</p>
            <p className="text-ink">
              RoundU Technologies Private Limited
              <br />
              Vellore, Tamil Nadu 632001
            </p>
          </div>
          <div>
            <p className="eyebrow mb-3">Follow</p>
            <p className="flex flex-wrap gap-x-6 gap-y-2 text-ink">
              <a className="link-underline" href="https://instagram.com/roundu.in" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              <a
                className="link-underline"
                href="https://www.linkedin.com/in/roundu-in-4b4140402/?skipRedirect=true"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a className="link-underline" href="https://twitter.com/roundu_in" target="_blank" rel="noopener noreferrer">
                X / Twitter
              </a>
            </p>
          </div>
        </Reveal>
      </section>
      <Footer />
    </main>
  );
}

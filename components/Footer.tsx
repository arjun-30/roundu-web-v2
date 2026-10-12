import Link from 'next/link';
import { Wordmark } from './Nav';

const socials = [
  { label: 'Instagram', href: 'https://instagram.com/roundu.in' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/roundu-in-4b4140402/?skipRedirect=true' },
  { label: 'X / Twitter', href: 'https://twitter.com/roundu_in' },
  { label: 'Facebook', href: 'https://facebook.com/roundu.in' },
  { label: 'YouTube', href: 'https://youtube.com/@roundu' },
];

const columns = [
  {
    title: 'RoundU',
    links: [
      { label: 'Services', href: '/services' },
      { label: 'How it works', href: '/how-it-works' },
      { label: 'For professionals', href: '/professionals' },
      { label: 'Early access', href: '/early-access' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of service', href: '/terms' },
      { label: 'Privacy policy', href: '/privacy' },
      { label: 'Refund policy', href: '/refund' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-paper/70">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10 pt-20 pb-10">
        <div className="grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5">
            <Link href="/" aria-label="RoundU home" className="text-paper">
              <Wordmark tone="light" className="text-5xl" />
            </Link>
            <p className="mt-6 max-w-sm leading-relaxed">
              Verified home services, at your door in minutes.
            </p>
            <a href="mailto:admin@roundu.in" className="link-underline mt-6 inline-block text-paper">
              admin@roundu.in
            </a>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 grid grid-cols-2 sm:grid-cols-3 gap-10">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs tracking-[0.14em] uppercase text-paper/45 mb-5">{col.title}</h4>
                <ul className="space-y-3 text-sm">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="link-underline hover:text-paper">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h4 className="text-xs tracking-[0.14em] uppercase text-paper/45 mb-5">Follow</h4>
              <ul className="space-y-3 text-sm">
                {socials.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-paper">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-paper/10 flex flex-col sm:flex-row justify-between gap-3 text-xs text-paper/45">
          <p>© {new Date().getFullYear()} RoundU Technologies Private Limited</p>
          <p>Made in Vellore, Tamil Nadu</p>
        </div>
      </div>
    </footer>
  );
}

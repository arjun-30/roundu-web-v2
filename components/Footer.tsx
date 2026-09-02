'use client';

import Link from 'next/link';
import { Instagram, Linkedin, Twitter, Facebook, Youtube, Mail, MapPin } from 'lucide-react';

const socials = [
  { icon: Instagram, href: 'https://instagram.com/roundu.in', label: 'Instagram' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/roundu-in-4b4140402/?skipRedirect=true', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/roundu_in', label: 'Twitter' },
  { icon: Facebook, href: 'https://facebook.com/roundu.in', label: 'Facebook' },
  { icon: Youtube, href: 'https://youtube.com/@roundu', label: 'YouTube' },
];

const footerLinks = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'For Providers', href: '/#providers' },
  ],
  legal: [
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Refund Policy', href: '/refund' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 mb-12">

          {/* Brand Column */}
          <div className="lg:col-span-6">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold tracking-tight text-white">
                round<span className="text-amber-500">U</span>
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-sm">
              The circle of convenience. Hyperlocal verified home services in under 15 minutes across Vellore and Chennai.
            </p>

            <div className="space-y-2 text-xs text-slate-400 mb-6">
              <a href="mailto:admin@roundu.in" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                <Mail className="w-3.5 h-3.5" />
                <span>admin@roundu.in</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>Vellore & Chennai, Tamil Nadu, India</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-2">
              {socials.map((social, i) => {
                const Icon = social.icon;
                return (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Column */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-2.5 text-xs">
                {footerLinks.company.map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="hover:text-amber-400 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Legal</h4>
              <ul className="space-y-2.5 text-xs">
                {footerLinks.legal.map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="hover:text-amber-400 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} RoundU. Built with care in Tamil Nadu, India.</p>
          <p className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Serving Vellore & Chennai</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

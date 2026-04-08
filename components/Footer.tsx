'use client';

import { Instagram, Linkedin, Twitter, Facebook, Youtube, Mail, MapPin } from 'lucide-react';

const socials = [
  { icon: Instagram, href: 'https://instagram.com/roundu.in', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com/company/roundu', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/roundu_in', label: 'Twitter' },
  { icon: Facebook, href: 'https://facebook.com/roundu.in', label: 'Facebook' },
  { icon: Youtube, href: 'https://youtube.com/@roundu', label: 'YouTube' },
];

const footerLinks = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'How it works', href: '#how' },
    { label: 'For providers', href: '#providers' },
    { label: 'Download', href: '#' },
  ],
  company: [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  legal: [
    { label: 'Terms of Service', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'Refund Policy', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-navy-950 border-t border-amber-500/10 overflow-hidden">
      {/* Massive background wordmark */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none">
        <div className="font-display font-bold text-[20vw] leading-none text-amber-500/[0.04] text-center translate-y-1/4 select-none">
          roundu
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-20 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">

          {/* Brand column */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center font-display font-bold text-ink text-xl">
                <span className="relative z-10">R</span>
                <div className="absolute inset-0 rounded-xl bg-amber-500 blur-xl opacity-50"></div>
              </div>
              <span className="font-display text-3xl font-semibold text-bg">roundu</span>
            </div>

            <p className="text-bg/55 leading-relaxed mb-8 max-w-sm">
              The circle of convenience. Home services in a heartbeat.
              Book verified providers in under 5 minutes.
            </p>

            {/* Contact */}
            <div className="space-y-3 mb-8">
              <a href="mailto:admin@roundu.in" className="flex items-center gap-2 text-bg/60 hover:text-amber-500 transition-colors text-sm">
                <Mail className="w-4 h-4" />
                <span>admin@roundu.in</span>
              </a>
              <div className="flex items-center gap-2 text-bg/60 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Vellore, Tamil Nadu, India</span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              {socials.map((social, i) => {
                const Icon = social.icon;
                return (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="group w-11 h-11 rounded-full glass-amber flex items-center justify-center text-bg/60 hover:bg-amber-500 hover:text-ink hover:border-amber-500 transition-all hover:-translate-y-1 hover:glow-amber"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-7 grid grid-cols-3 gap-8">
            <div>
              <h4 className="font-mono text-xs tracking-wider text-amber-500 uppercase mb-5">Product</h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link, i) => (
                  <li key={i}>
                    <a href={link.href} className="text-bg/60 hover:text-bg hover:text-amber-500 transition-colors text-sm">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs tracking-wider text-amber-500 uppercase mb-5">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, i) => (
                  <li key={i}>
                    <a href={link.href} className="text-bg/60 hover:text-amber-500 transition-colors text-sm">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs tracking-wider text-amber-500 uppercase mb-5">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, i) => (
                  <li key={i}>
                    <a href={link.href} className="text-bg/60 hover:text-amber-500 transition-colors text-sm">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-amber-500/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-bg/40 font-mono">
            © 2026 RoundU. Built with care in India.
          </p>
          <p className="text-xs text-bg/40 font-mono flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            All systems operational
          </p>
        </div>
      </div>
    </footer>
  );
}

import LegalPage from '@/components/LegalPage';
import { Mail, MapPin, Instagram, Linkedin, Twitter } from 'lucide-react';

export const metadata = {
    title: 'Contact RoundU',
    description: 'Get in touch with the RoundU team.',
};

export default function ContactPage() {
    return (
        <LegalPage title="Contact us" updated="April 2026">
            <p>
                We'd love to hear from you. Whether you're a customer, a service provider,
                an investor, or just curious — drop us a line.
            </p>

            <h2>General Inquiries</h2>
            <p>
                Email: <a href="mailto:admin@roundu.in">admin@roundu.in</a>
                <br />
                We respond within 24 hours on business days.
            </p>

            <h2>For Customers</h2>
            <p>
                Need help with a booking or have a complaint? Email{' '}
                <a href="mailto:admin@roundu.in">admin@roundu.in</a> with your
                booking ID and a description of the issue.
            </p>

            <h2>For Service Providers</h2>
            <p>
                Want to join RoundU as a verified provider? Sign up at{' '}
                <a href="/">roundu.in</a> and follow the registration steps. Have questions
                first? Email <a href="mailto:admin@roundu.in">admin@roundu.in</a>.
            </p>

            <h2>For Press and Media</h2>
            <p>
                For interviews, press kits, or media inquiries, contact{' '}
                <a href="mailto:admin@roundu.in">admin@roundu.in</a> with the subject "Press inquiry".
            </p>

            <h2>For Investors</h2>
            <p>
                We're currently fundraising for our pre-seed round. If you're an angel
                investor or early-stage VC interested in the Indian home services space,
                email <a href="mailto:admin@roundu.in">admin@roundu.in</a> with the
                subject "Investor".
            </p>

            <h2>Office Address</h2>
            <p>
                RoundU Technologies Private Limited
                <br />
                Vellore, Tamil Nadu — 632001
                <br />
                India
            </p>

            <h2>Follow Us</h2>
            <p>
                Stay updated on our launch and the latest features:
            </p>
            <ul>
                <li><a href="https://instagram.com/roundu.in" target="_blank" rel="noopener noreferrer">Instagram — @roundu.in</a></li>
                <li><a href="https://linkedin.com/company/roundu" target="_blank" rel="noopener noreferrer">LinkedIn — RoundU</a></li>
                <li><a href="https://twitter.com/roundu_in" target="_blank" rel="noopener noreferrer">Twitter — @roundu_in</a></li>
            </ul>
        </LegalPage>
    );
}

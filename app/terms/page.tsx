import LegalPage from '@/components/LegalPage';

export const metadata = {
    title: 'Terms of Service · RoundU',
    description: 'RoundU Terms of Service — the rules and guidelines for using our platform.',
};

export default function TermsPage() {
    return (
        <LegalPage title="Terms of Service" updated="April 2026">
            <p>
                Welcome to RoundU. By using our website (roundu.in) and mobile application
                (collectively, the "Platform"), you agree to these Terms of Service. Please
                read them carefully.
            </p>

            <h2>1. About RoundU</h2>
            <p>
                RoundU is a hyperlocal home services marketplace operated by RoundU
                Technologies Private Limited, headquartered in Vellore, Tamil Nadu, India.
                We connect customers with verified independent service providers across
                100+ home and vehicle service categories.
            </p>

            <h2>2. Eligibility</h2>
            <p>
                You must be at least 18 years old to create an account. By signing up, you
                confirm that all information you provide is accurate and that you have the
                legal capacity to enter into this agreement.
            </p>

            <h2>3. Account Registration</h2>
            <p>
                To use RoundU, you must verify your phone number via OTP. You are
                responsible for all activities under your account. Notify us immediately
                if you suspect unauthorized access.
            </p>

            <h2>4. Service Bookings</h2>
            <p>
                RoundU is a marketplace platform — we do not provide services directly.
                All services are performed by independent providers who set their own
                prices and schedules. Once a provider accepts your booking, a contract is
                formed between you and the provider, with RoundU acting as the facilitator.
            </p>

            <h3>4.1 Quotes and Payments</h3>
            <p>
                Providers may quote a price after assessing the work in person. You can
                approve or decline the quote. Payments are processed securely through
                Stripe and held until the service is completed. RoundU charges a platform
                fee of 10% on every completed booking.
            </p>

              <p className="text-bg/70 leading-relaxed">
                Customers earn upto 5% cashback on every paid booking, automatically credited
                to their RoundU Wallet. Credits are non-transferable and cannot be
                converted to cash.
              </p>

            <h2>5. Cancellation Policy</h2>
            <p>
                We follow a transparent IRCTC-style cancellation policy:
            </p>
            <ul>
                <li><strong>More than 48 hours before service:</strong> 100% refund</li>
                <li><strong>24-48 hours before:</strong> 75% refund</li>
                <li><strong>12-24 hours before:</strong> 50% refund</li>
                <li><strong>6-12 hours before:</strong> 25% refund</li>
                <li><strong>3-6 hours before:</strong> 10% refund</li>
                <li><strong>Less than 3 hours:</strong> No refund</li>
            </ul>
            <p>
                If a provider cancels an accepted booking, 80% of the amount is refunded
                to the customer and the provider pays a penalty.
            </p>

            <h2>6. Provider Verification</h2>
            <p>
                All providers undergo identity verification through DigiLocker (Aadhaar
                and PAN). However, RoundU does not guarantee the quality of work
                performed. You are responsible for assessing each provider through their
                ratings, reviews, video profile, and portfolio before booking.
            </p>

            <h2>7. User Conduct</h2>
            <p>You agree not to:</p>
            <ul>
                <li>Use the Platform for any unlawful purpose</li>
                <li>Harass, threaten, or abuse other users or providers</li>
                <li>Bypass the platform to arrange services directly with providers (this is detected via our GPS monitoring system)</li>
                <li>Upload false information, fake reviews, or misleading content</li>
                <li>Attempt to reverse-engineer or hack the Platform</li>
            </ul>

            <h2>8. Intellectual Property</h2>
            <p>
                All content on the Platform — including the RoundU name, logo, design,
                and software — is the property of RoundU Technologies Private Limited and
                protected by Indian and international copyright laws.
            </p>

            <h2>9. Limitation of Liability</h2>
            <p>
                RoundU is provided "as is" without warranties. We are not liable for any
                damages arising from the use of the Platform or services performed by
                providers, except as required by Indian law. Our maximum liability is
                limited to the platform fee paid by you for the disputed booking.
            </p>

            <h2>10. Dispute Resolution</h2>
            <p>
                Any disputes will be resolved through good-faith negotiation first. If
                unresolved, disputes will be subject to the exclusive jurisdiction of the
                courts in Vellore, Tamil Nadu, India.
            </p>

            <h2>11. Changes to Terms</h2>
            <p>
                We may update these Terms periodically. We will notify users of material
                changes via email or in-app notification. Continued use of the Platform
                after changes constitutes acceptance.
            </p>

            <h2>12. Contact Us</h2>
            <p>
                For questions about these Terms, contact us at{' '}
                <a href="mailto:admin@roundu.in">admin@roundu.in</a>.
            </p>
        </LegalPage>
    );
}

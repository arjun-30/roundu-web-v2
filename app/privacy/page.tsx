import LegalPage from '@/components/LegalPage';

export const metadata = {
    title: 'Privacy Policy · RoundU',
    description: 'How RoundU collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
    return (
        <LegalPage title="Privacy Policy" updated="April 2026">
            <p>
                Your privacy matters to us. This Privacy Policy explains how RoundU
                Technologies Private Limited collects, uses, and protects your personal
                information when you use our website (roundu.in) and mobile app.
            </p>
            <p>
                We comply with the Information Technology Act 2000 and the Digital
                Personal Data Protection Act 2023 (DPDP) of India.
            </p>

            <h2>1. Information We Collect</h2>

            <h3>1.1 Information You Provide</h3>
            <ul>
                <li><strong>Account info:</strong> Phone number, name, email address, profile photo</li>
                <li><strong>Address info:</strong> Service location for bookings</li>
                <li><strong>Payment info:</strong> Processed securely by Stripe — we never store your card details</li>
                <li><strong>Identity (providers only):</strong> Aadhaar and PAN verified through DigiLocker</li>
                <li><strong>Communications:</strong> Reviews, ratings, support messages</li>
            </ul>

            <h3>1.2 Information Collected Automatically</h3>
            <ul>
                <li><strong>Location data:</strong> GPS coordinates during active bookings (24/7 for providers, with explicit consent)</li>
                <li><strong>Device info:</strong> Device model, OS version, app version, IP address</li>
                <li><strong>Usage data:</strong> Bookings made, services viewed, search queries</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <ul>
                <li>To create and manage your account</li>
                <li>To match customers with the best nearby providers</li>
                <li>To process payments and refunds</li>
                <li>To send booking confirmations, reminders, and AI voice calls</li>
                <li>To detect off-platform service bypassing (provider GPS monitoring)</li>
                <li>To provide AI-powered service recommendations</li>
                <li>To respond to support requests and resolve disputes</li>
                <li>To improve our platform through anonymized analytics</li>
                <li>To comply with legal obligations</li>
            </ul>

            <h2>3. GPS Monitoring (Providers Only)</h2>
            <p>
                Service providers must consent to 24/7 GPS tracking during their active
                registration. This data is used solely to:
            </p>
            <ul>
                <li>Show real-time location to customers during active bookings</li>
                <li>Calculate accurate ETAs</li>
                <li>Detect patterns of off-platform servicing (anti-bypass)</li>
            </ul>
            <p>
                GPS data is automatically deleted after 90 days. Providers can view their
                own location history in-app at any time.
            </p>

            <h2>4. Data Sharing</h2>
            <p>We share your information only with:</p>
            <ul>
                <li><strong>Service providers</strong> you book — limited to your name, phone, and service address</li>
                <li><strong>Payment processors</strong> like Stripe to process transactions</li>
                <li><strong>Communication providers</strong> like MSG91 (for OTP) and ElevenLabs (for AI voice calls)</li>
                <li><strong>Legal authorities</strong> when required by Indian law</li>
            </ul>
            <p>
                We <strong>never</strong> sell your personal data to advertisers or third parties.
            </p>

            <h2>5. Data Storage and Security</h2>
            <p>
                All data is stored on servers located in India (asia-south1, Mumbai) in
                compliance with data localization requirements. We use industry-standard
                encryption (TLS 1.3, AES-256) to protect data in transit and at rest.
            </p>

            <h2>6. Your Rights Under DPDP Act 2023</h2>
            <p>You have the right to:</p>
            <ul>
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correct:</strong> Update inaccurate information</li>
                <li><strong>Delete:</strong> Request account deletion (processed within 30 days)</li>
                <li><strong>Withdraw consent:</strong> Opt out of GPS tracking (closes provider account)</li>
                <li><strong>Grievance redressal:</strong> Contact our Data Protection Officer at <a href="mailto:admin@roundu.in">admin@roundu.in</a></li>
            </ul>

            <h2>7. Cookies</h2>
            <p>
                Our website uses essential cookies for authentication and analytics. You
                can disable cookies in your browser, but some features may not work.
            </p>

            <h2>8. Children's Privacy</h2>
            <p>
                RoundU is not intended for users under 18. We do not knowingly collect
                data from minors.
            </p>

            <h2>9. Changes to This Policy</h2>
            <p>
                We may update this Privacy Policy periodically. Material changes will be
                communicated via email or in-app notification.
            </p>

            <h2>10. Contact Us</h2>
            <p>
                For privacy concerns or to exercise your rights, contact:
            </p>
            <p>
                <strong>Data Protection Officer</strong><br />
                RoundU Technologies Private Limited<br />
                Vellore, Tamil Nadu, India<br />
                <a href="mailto:admin@roundu.in">admin@roundu.in</a>
            </p>
        </LegalPage>
    );
}

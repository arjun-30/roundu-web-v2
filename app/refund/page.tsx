import LegalPage from '@/components/LegalPage';

export const metadata = {
    title: 'Refund Policy · RoundU',
    description: 'Our transparent refund and cancellation policy.',
};

export default function RefundPage() {
    return (
        <LegalPage title="Refund Policy" updated="April 2026">
            <p>
                We believe in fair, transparent refunds for everyone. Our policy is
                inspired by IRCTC's time-based slabs — the earlier you cancel, the more
                you get back.
            </p>

            <h2>Customer Cancellation</h2>
            <p>If you cancel a booking, you'll receive a refund based on how much time is left before the scheduled service:</p>
            <ul>
                <li><strong>More than 48 hours before:</strong> 100% refund — full amount returned to original payment method</li>
                <li><strong>24-48 hours before:</strong> 75% refund</li>
                <li><strong>12-24 hours before:</strong> 50% refund</li>
                <li><strong>6-12 hours before:</strong> 25% refund</li>
                <li><strong>3-6 hours before:</strong> 10% refund (token amount)</li>
                <li><strong>Less than 3 hours before:</strong> No refund</li>
            </ul>
            <p>
                Refunds are processed instantly via Stripe and typically reflect in your
                account within 5-7 business days.
            </p>

            <h2>Provider Cancellation</h2>
            <p>
                If a provider cancels an accepted booking after confirming, customers
                receive an <strong>80% refund</strong> regardless of timing. The remaining
                20% is retained by RoundU as a processing fee, and the provider pays an
                equivalent penalty.
            </p>
            <p>
                Providers who cancel 3 or more bookings are automatically suspended
                pending admin review.
            </p>

            <h2>Service Quality Issues</h2>
            <p>
                If a service is incomplete, of poor quality, or significantly different
                from what was agreed:
            </p>
            <ul>
                <li>Report it within <strong>24 hours</strong> via the in-app help section</li>
                <li>Provide photos and a description of the issue</li>
                <li>Our team reviews within 48 hours</li>
                <li>Eligible refunds are processed within 5 business days</li>
            </ul>

            <h2>Wallet Cashback</h2>
            <p>
                Cashback credited to your in-app wallet from previous bookings is{' '}
                <strong>non-refundable</strong> as cash. It can only be used for future
                bookings on the platform.
            </p>

            <h2>Subscription Cancellations</h2>
            <p>
                You can pause or cancel any subscription plan at any time from the app.
            </p>
            <ul>
                <li><strong>Pause:</strong> No charge during the paused period; resume anytime</li>
                <li><strong>Cancel:</strong> No further charges; you keep access until the current billing period ends</li>
                <li><strong>No partial refunds</strong> for unused days within an active billing cycle</li>
            </ul>

            <h2>Failed Payments</h2>
            <p>
                If a payment fails (network issue, insufficient funds, declined card),
                the booking is automatically cancelled at no cost. You can retry with a
                different payment method.
            </p>

            <h2>How to Request a Refund</h2>
            <ol style={{ listStyleType: 'decimal', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                <li>Open the RoundU app</li>
                <li>Go to <strong>My Bookings</strong> → select the booking</li>
                <li>Tap <strong>Cancel</strong> or <strong>Report an issue</strong></li>
                <li>Follow the on-screen instructions</li>
            </ol>

            <h2>Contact</h2>
            <p>
                For refund disputes or questions, email{' '}
                <a href="mailto:admin@roundu.in">admin@roundu.in</a> with your booking ID.
                We respond within 24 hours.
            </p>
        </LegalPage>
    );
}

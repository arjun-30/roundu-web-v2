import LegalPage from '@/components/LegalPage';

export const metadata = {
    title: 'About RoundU',
    description: 'The story behind RoundU — building the circle of convenience for India.',
};

export default function AboutPage() {
    return (
        <LegalPage title="About RoundU" updated="April 2026">
            <p style={{ fontSize: '1.25rem', color: '#F59E0B', fontStyle: 'italic' }}>
                We're rebuilding home services from the ground up — verified, fast, and fair.
            </p>

            <h2>The Problem We're Solving</h2>
            <p>
                Finding a trustworthy electrician, plumber, or cleaner in India is broken.
                You call five different people. Two don't pick up. Two quote wildly
                different prices. The fifth shows up 4 hours late. And by the end, you've
                wasted half your day for a 30-minute fix.
            </p>
            <p>
                We've all been there. We built RoundU because we were tired of it.
            </p>

            <h2>What Makes RoundU Different</h2>
            <ul>
                <li><strong>15-minute matching:</strong> AI-powered algorithm finds you the best provider near you, fast</li>
                <li><strong>Government-verified:</strong> Every provider's identity is verified through DigiLocker</li>
                <li><strong>Live tracking:</strong> See your provider arrive in real-time</li>
                <li><strong>Fair pricing:</strong> Transparent quotes upfront — no hidden charges, no haggling</li>
                <li><strong>Upto 5% cashback:</strong> Every booking earns you wallet credit for next time</li>
                <li><strong>100+ services:</strong> Electrician, plumber, cleaner, mechanic, painter, AC repair, and more</li>
            </ul>

            <h2>Our Mission</h2>
            <p>
                Make home services as easy as ordering food. Whether you need a bulb
                changed at 9 PM or a full house deep-clean before guests arrive, RoundU
                should be the only app you reach for.
            </p>

            <h2>Where We're Launching</h2>
            <p>
                We're starting in <strong>Vellore</strong> and <strong>Chennai</strong> in
                Tamil Nadu, with expansion to Bengaluru, Coimbatore, and Hyderabad
                planned within six months.
            </p>

            <h2>The Team</h2>
            <p>
                RoundU is built by a team of engineers, designers, and operators based in
                Vellore. We're small, scrappy, and obsessed with details.
            </p>

            <h2>Want to Join Us?</h2>
            <p>
                We're always looking for talented people who care about building
                something useful for India. Email us at{' '}
                <a href="mailto:admin@roundu.in">admin@roundu.in</a> with the subject
                "Join the team" and tell us what you'd love to work on.
            </p>

            <h2>Get in Touch</h2>
            <p>
                Questions, feedback, ideas, or partnerships:{' '}
                <a href="mailto:admin@roundu.in">admin@roundu.in</a>
            </p>
        </LegalPage>
    );
}

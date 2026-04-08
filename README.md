# RoundU Landing Page v2 + Admin Portal

Production landing page for **roundu.in** with navy + amber palette, 3D effects, neon glows, Firebase waitlist, and built-in admin portal.

**Stack**: Next.js 14 · Tailwind CSS · Framer Motion · Firebase Firestore · Vercel

---

## Brand Colors

| Role | Hex | Usage |
|------|-----|-------|
| Text | `#030916` | Primary text, buttons on amber |
| Background | `#EEF2F7` | Light surfaces, body text on dark |
| Primary | `#152E4B` | Dark navy — brand |
| Secondary | `#A95D06` | Burnt amber — hover states |
| Accent | `#F59E0B` | Bright amber — CTAs, glows |

---

## Quick Start

```bash
npm install
cp .env.example .env.local
# Fill in 6 Firebase keys + ADMIN_PASSWORD
npm run dev
```

- Public site: http://localhost:3000
- Admin portal: http://localhost:3000/admin

---

## Setup Steps

### 1. Firebase Setup

1. https://console.firebase.google.com → Create project `roundu`
2. Disable Google Analytics
3. Build → Firestore Database → Create → Production mode → asia-south1 (Mumbai)
4. Rules tab → paste this and click **Publish**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /waitlist/{document} {
      allow read: if true;
      allow create: if true;
      allow update: if false;
      allow delete: if true;
    }
  }
}
```

Security note: `read` and `delete` are open because our Next.js API routes run server-side and enforce authentication via the `ADMIN_PASSWORD` cookie. The public form can only `create`.

5. Project Settings → Your apps → Web → Register → copy `firebaseConfig` into `.env.local`

### 2. Set Admin Password

In `.env.local`:

```
ADMIN_PASSWORD=your-strong-password-here
```

Make it long and random. Example: `Rx7$mK9@pL2vN8qW4zT6`

### 3. Deploy to Vercel

1. Push to GitHub (private)
2. vercel.com → Add New → Project → Import
3. Environment Variables → add all 7 (6 Firebase keys + `ADMIN_PASSWORD`)
4. Deploy
5. Live: `roundu.in` (public), `roundu.in/admin` (admin)

### 4. Custom Domain

Vercel → Settings → Domains → Add `roundu.in` → paste DNS records at registrar → wait 30 min.

---

## Admin Portal Features

Access at `/admin` — login with `ADMIN_PASSWORD`. Features:

- **Dashboard stats** — Total signups, customers, providers, last 7 days growth
- **Top cities** — Where your waitlist is concentrated
- **Full waitlist table** — Position, email, name, role, city, join date
- **Search** — Filter by email, name, or city in real-time
- **Role filter** — All / Customers / Providers
- **Sort** — Newest, oldest, by position
- **CSV export** — Download filtered entries with one click
- **Delete entries** — Remove spam or duplicates
- **Logout** — Clears session cookie

Login session lasts 7 days. Password never sent client-side — checked server-side against env var.

---

## File Structure

```
roundu-web-v2/
├── app/
│   ├── admin/
│   │   ├── layout.tsx
│   │   └── page.tsx              Login + dashboard + stats + table
│   ├── api/
│   │   ├── admin/
│   │   │   ├── login/route.ts    Password check + cookie
│   │   │   └── waitlist/route.ts GET/DELETE with auth
│   │   └── waitlist/route.ts     Public waitlist signup
│   ├── globals.css               3D utilities, neon glows
│   ├── layout.tsx
│   └── page.tsx
├── components/                   8 landing page sections
├── lib/firebase.ts
└── .env.example                  Includes ADMIN_PASSWORD
```

---

## Cost

- Vercel Hobby: Free
- Firebase Firestore: Free (50k reads/20k writes per day)
- Domain: ~₹1,000/year
- SSL: Free

**Total: ~₹85/month**

---

## Security

- Admin password stored as `httpOnly` cookie (not accessible to JS)
- All admin API routes verify cookie on every request
- Cookie is `secure` in production (HTTPS only)
- `sameSite: strict` prevents CSRF
- Never commit `.env.local` to Git (in `.gitignore`)
- Change `ADMIN_PASSWORD` if you suspect it leaked

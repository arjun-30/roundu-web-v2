# RoundU launch ads: copy

Seven creatives for Meta (Instagram + Facebook). The source is `ads.html`, and finished files are in `export/`.

| # | File | Placement | Audience |
|---|------|-----------|----------|
| 1 | `feed-leak.png` | Feed 4:5 | Homeowners and renters |
| 2 | `feed-verified.png` | Feed 4:5 | Homeowners, families, people living alone |
| 3 | `feed-price.png` | Feed 4:5 | Price-sensitive households |
| 4 | `feed-pro.png` | Feed 4:5 | Electricians, plumbers, cleaners, mechanics |
| 5 | `story-doorstep.mp4` | Reels/Stories 9:16, 11s | Homeowners and renters |
| 6 | `story-track.mp4` | Reels/Stories 9:16, 11s | Homeowners and renters |
| 7 | `story-pro.mp4` | Reels/Stories 9:16, 11s | Service professionals |

Geo for all ads: Coimbatore. The landing page for customer ads is `roundu.in/#waitlist`; for pro ads it is `roundu.in/#providers`.

---

### 1 · Leaking tap at 8 pm
- **Primary text:** The tap always gives up after the plumber's gone home. RoundU matches you with a verified plumber from your own neighbourhood, at your door in about fifteen minutes. Launching in Coimbatore. Reserve early access.
- **Headline:** A verified plumber in 15 minutes
- **Description:** Upfront prices. Pay after the job.
- **CTA button:** Sign up

### 2 · Verified before the first job
- **Primary text:** You're letting someone into your home, so you should know who they are. Every RoundU professional is ID-verified through DigiLocker, and you see their face, rating and price before you say yes.
- **Headline:** Every pro, DigiLocker-verified
- **Description:** Join the RoundU waitlist
- **CTA button:** Sign up

### 3 · The price you see is the price you pay
- **Primary text:** No "we'll see once I get there." RoundU shows the visit charge and the estimate before you book, and you pay only after the job is done.
- **Headline:** Upfront prices. Zero surprises.
- **Description:** Home services in Coimbatore
- **CTA button:** Learn more

### 4 · For professionals
- **Primary text:** Electricians, plumbers, cleaners, mechanics: get jobs from your own area without paying for leads. You keep 82% of every booking, and payouts land in your bank the same evening.
- **Headline:** Keep 82% of every job
- **Description:** Free to join. DigiLocker-verified badge.
- **CTA button:** Apply now

### 5 · Problem to doorstep (video)
- **Primary text:** 8:04 pm, the kitchen tap gives up. 8:19 pm, a verified plumber is at the door. That's RoundU. 🔧
- **Headline:** Trusted hands within 15 minutes
- **CTA button:** Sign up

### 6 · Watch them arrive (video)
- **Primary text:** No more "he'll come by sometime today." Follow your professional street by street on a live map, and share a one-time code when they arrive.
- **Headline:** Live tracking to your door
- **CTA button:** Sign up

### 7 · For professionals (video)
- **Primary text:** You do the work. We bring the jobs from your neighbourhood. 82% of every booking is yours, with daily payouts.
- **Headline:** Partner with RoundU
- **CTA button:** Apply now

---

**Testing plan:** Run #1, #2 and #3 as one ad set so Meta can rotate them, and #5 and #6 in a Reels/Stories ad set. Keep the pro ads (#4, #7) in a separate campaign with their own audience.

**Re-rendering:** Edit `ads.html`, then run `node marketing/ads/render.js marketing/ads/ads.html marketing/ads/export`. For one ad only, add its id, e.g. `story-track`. Opening `ads.html` in a browser with no `?ad=` shows all seven, and the animations play live.

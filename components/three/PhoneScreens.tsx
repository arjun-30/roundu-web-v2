import { Search, Star, BadgeCheck, Droplets, Zap, Sparkles, Car, Wrench, Paintbrush, Phone, MessageSquare } from 'lucide-react';

/* App screens rendered onto the 3D phone. Fixed 330 × 702 px canvas. */

export const SCREEN_W = 330;
export const SCREEN_H = 702;

function StatusBar({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`relative z-10 flex items-center justify-between px-7 pt-[18px] pb-2 text-[12px] font-semibold tabular ${dark ? 'text-paper' : 'text-ink'}`}>
      <span>9:41</span>
      <span className="absolute left-1/2 top-[12px] -translate-x-1/2 h-[26px] w-[96px] rounded-full bg-black" />
      <span className="flex items-center gap-1">
        <span className="inline-block h-[9px] w-[16px] rounded-[3px] border border-current p-[1px]">
          <span className="block h-full w-[70%] rounded-[1px] bg-current" />
        </span>
      </span>
    </div>
  );
}

const cats = [
  { label: 'Plumbing', icon: Droplets },
  { label: 'Electrical', icon: Zap },
  { label: 'Cleaning', icon: Sparkles },
  { label: 'Car care', icon: Car },
  { label: 'Repairs', icon: Wrench },
  { label: 'Painting', icon: Paintbrush },
];

function RequestScreen() {
  return (
    <div className="h-full bg-[#FBFAF7] text-ink flex flex-col">
      <StatusBar />
      <div className="px-6 pt-6">
        <p className="text-[11px] tracking-[0.12em] uppercase text-muted">Good evening, Anu</p>
        <h4 className="mt-1 font-serif text-[1.9rem] leading-tight text-navy-700">What needs doing?</h4>
        <div className="mt-5 flex items-center gap-2.5 rounded-[12px] bg-sand px-4 py-3.5 text-[13px] text-ink">
          <Search className="w-4 h-4 text-muted" strokeWidth={1.75} />
          Kitchen tap is leaking<span className="ml-[-6px] h-4 w-px bg-navy-700 animate-pulse" />
        </div>
        <div className="mt-7 grid grid-cols-3 gap-2.5">
          {cats.map(({ label, icon: Icon }, i) => (
            <div
              key={label}
              className={`rounded-[14px] border px-2 py-4 text-center ${i === 0 ? 'border-navy-700 bg-navy-700 text-paper' : 'border-line bg-white'}`}
            >
              <Icon className="mx-auto w-5 h-5" strokeWidth={1.5} />
              <p className="mt-2 text-[11px] font-medium">{label}</p>
            </div>
          ))}
        </div>
        <div className="mt-7 rounded-[14px] border border-line bg-white p-4">
          <p className="text-[11px] text-muted">When</p>
          <div className="mt-2 grid grid-cols-3 gap-2 text-[12px]">
            <span className="rounded-[8px] bg-navy-700 py-2 text-center text-paper">Now</span>
            <span className="rounded-[8px] bg-sand py-2 text-center">Today</span>
            <span className="rounded-[8px] bg-sand py-2 text-center">Schedule</span>
          </div>
        </div>
      </div>
      <div className="mt-auto px-6 pb-8">
        <div className="rounded-[14px] bg-navy-700 py-4 text-center text-[14px] font-medium text-paper">Find a plumber</div>
      </div>
    </div>
  );
}

function MatchScreen() {
  return (
    <div className="h-full bg-[#FBFAF7] text-ink flex flex-col">
      <StatusBar />
      <div className="px-6 pt-5">
        <p className="text-[11px] tracking-[0.12em] uppercase text-muted">Matched in 48 seconds</p>
        <h4 className="mt-1 font-serif text-[1.75rem] leading-tight text-navy-700">Meet Karthik</h4>
      </div>
      <div className="mx-6 mt-5 rounded-[18px] overflow-hidden border border-line bg-white">
        <div className="relative h-[150px] bg-[linear-gradient(135deg,#1F3C66,#152E4B)]">
          <div className="absolute inset-0 grid place-items-center">
            <div className="h-[86px] w-[86px] rounded-full bg-paper/95 grid place-items-center font-serif text-[30px] text-navy-700 ring-4 ring-white/20">
              KR
            </div>
          </div>
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[10px] text-paper backdrop-blur">
            ▶ 30s intro
          </span>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-1.5">
            <span className="text-[15px] font-semibold">Karthik Raja</span>
            <BadgeCheck className="w-4 h-4 text-navy-500" strokeWidth={2} />
          </div>
          <p className="text-[12px] text-muted">Plumber · 9 years</p>
          <div className="mt-4 grid grid-cols-3 border-t border-line pt-3 text-center tabular">
            <div>
              <p className="flex items-center justify-center gap-1 text-[14px] font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-700 text-amber-700" />4.8
              </p>
              <p className="text-[10px] text-muted">rating</p>
            </div>
            <div className="border-x border-line">
              <p className="text-[14px] font-semibold">420</p>
              <p className="text-[10px] text-muted">jobs</p>
            </div>
            <div>
              <p className="text-[14px] font-semibold">0.8 km</p>
              <p className="text-[10px] text-muted">away</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-6 mt-4 rounded-[14px] border border-line bg-white p-4 text-[12px]">
        <div className="flex justify-between"><span className="text-muted">Visit & inspection</span><span className="tabular">₹199</span></div>
        <div className="mt-2 flex justify-between"><span className="text-muted">Tap replacement (est.)</span><span className="tabular">₹250</span></div>
        <div className="mt-3 pt-3 border-t border-line flex justify-between font-semibold"><span>Pay after the job</span><span className="tabular">₹449</span></div>
      </div>
      <div className="mt-auto px-6 pb-8">
        <div className="rounded-[14px] bg-navy-700 py-4 text-center text-[14px] font-medium text-paper">Confirm booking</div>
      </div>
    </div>
  );
}

function TrackScreen() {
  return (
    <div className="h-full bg-[#ECE6DC] text-ink flex flex-col relative">
      <StatusBar />
      {/* Stylised map */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 330 702" aria-hidden>
        <defs>
          <pattern id="blocks" width="66" height="66" patternUnits="userSpaceOnUse">
            <rect x="9" y="9" width="48" height="48" rx="6" fill="#F6F3EE" />
          </pattern>
        </defs>
        <rect width="330" height="702" fill="#DCD4C7" />
        <rect width="330" height="702" fill="url(#blocks)" />
        <rect x="75" y="141" width="48" height="48" rx="6" fill="#C9D3BD" />
        <rect x="207" y="339" width="48" height="114" rx="6" fill="#C9D3BD" />
        <path d="M 0 462 L 132 462 L 132 264 L 264 264 L 264 132" fill="none" stroke="#152E4B" strokeOpacity="0.18" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 0 462 L 132 462 L 132 330" fill="none" stroke="#FC7508" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="264" cy="132" r="9" fill="#152E4B" stroke="#fff" strokeWidth="3" />
      </svg>
      {/* Moving van marker along the route */}
      <span
        className="route-van absolute left-0 top-0 h-[18px] w-[18px] rounded-full border-[3px] border-white bg-[#FC7508] shadow-[0_4px_10px_rgba(14,27,44,0.35)]"
        aria-hidden
      />
      <div className="relative mt-auto m-3 rounded-[22px] bg-white p-5 shadow-[0_-10px_40px_-12px_rgba(14,27,44,0.3)]">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-[11px] text-muted">Karthik is on the way</p>
            <p className="font-serif text-[1.6rem] leading-tight text-navy-700">Arriving 7:58 pm</p>
          </div>
          <p className="font-serif text-[2rem] leading-none tabular">6<span className="text-[13px] text-muted ml-1">min</span></p>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-1.5">
          {['Matched', 'On the way', 'Arrived'].map((s, i) => (
            <div key={s}>
              <div className={`h-[3px] rounded-full ${i < 2 ? 'bg-amber-700' : 'bg-line'}`} />
              <p className={`mt-2 text-[10px] ${i < 2 ? 'text-ink' : 'text-muted'}`}>{s}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2 text-[12px]">
          <span className="flex items-center justify-center gap-2 rounded-[10px] bg-sand py-3"><Phone className="w-3.5 h-3.5" />Call</span>
          <span className="flex items-center justify-center gap-2 rounded-[10px] bg-sand py-3"><MessageSquare className="w-3.5 h-3.5" />Message</span>
        </div>
        <p className="mt-4 text-center text-[11px] text-muted">Share OTP <span className="font-semibold text-ink tracking-[0.2em]">4 8 2 1</span> when he arrives</p>
      </div>
    </div>
  );
}

export const screens = [RequestScreen, MatchScreen, TrackScreen];

/* Real screenshots from the RoundU app (Ask → Match → Arrive), under a phone status bar. */
function appShot(src: string, alt: string) {
  function AppShot() {
    return (
      <div className="h-full w-full bg-paper">
        <div className="h-[40px] overflow-hidden">
          <StatusBar />
        </div>
        <img src={src} alt={alt} width={SCREEN_W} height={SCREEN_H - 40} className="block h-[662px] w-full object-cover object-top" />
      </div>
    );
  }
  return AppShot;
}

export const appScreens = [
  appShot('/app-screens/ask.webp', 'RoundU app home: what needs fixing today?'),
  appShot('/app-screens/match.webp', 'RoundU app finding a nearby plumber'),
  appShot('/app-screens/arrive.webp', 'RoundU app tracking the professional on a live map'),
];

/* Illustrated household repairs. Each scene is a 6s CSS loop: the professional
   works for the first ~55%, the problem resolves, then a short "done" hold.
   CSS (not JS) drives the loop so every part stays in sync and costs nothing. */

export type TradeKey = 'plumbing' | 'electrical' | 'cleaning' | 'painting' | 'ac' | 'carpentry';

const C = {
  wall: '#EFE9DF',
  floor: '#E2D9CB',
  trim: '#D3C8B7',
  white: '#FBFAF7',
  paper: '#F6F3EE',
  navy: '#152E4B',
  sleeve: '#1F3C66',
  ink: '#0E1B2C',
  trousers: '#22344B',
  skin: '#A8714A',
  skinDark: '#8E5C3B',
  amber: '#FC7508',
  amberDark: '#E8690A',
  steel: '#9C978F',
  sage: '#C9D3BD',
  sky: '#DCE6EA',
  wood: '#B48A5E',
};

const CYCLE = 6;
const WORK_END = 55;

/** Oscillating keyframes for a working limb, easing into a rest pose afterwards. */
function osc(name: string, a: number, b: number, swings: number, rest: number) {
  const frames = [`0%{transform:rotate(${rest}deg)}`];
  for (let i = 0; i <= swings; i++) {
    const pct = 6 + ((WORK_END - 6) * i) / swings;
    frames.push(`${pct.toFixed(2)}%{transform:rotate(${i % 2 ? b : a}deg)}`);
  }
  frames.push(`62%{transform:rotate(${rest}deg)}`, `100%{transform:rotate(${rest}deg)}`);
  return `@keyframes ${name}{${frames.join('')}}`;
}

export const fixitCss = `
.fx * { transform-box: view-box; }
.fx .pivot { transform-origin: 0 0; }
.fx [class*="fx-"] { animation-duration: ${CYCLE}s; animation-iteration-count: infinite; animation-timing-function: ease-in-out; }
${osc('fx-wrench', -6, 16, 7, 78)}
${osc('fx-bulbarm', 12, 30, 5, 78)}
${osc('fx-wipe', -62, -24, 6, 80)}
${osc('fx-roll', -38, 14, 6, 78)}
${osc('fx-screw', -50, -32, 9, 80)}
${osc('fx-hammer', -58, -12, 9, 80)}
.fx-wrench{animation-name:fx-wrench}.fx-bulbarm{animation-name:fx-bulbarm}.fx-wipe{animation-name:fx-wipe}
.fx-roll{animation-name:fx-roll}.fx-screw{animation-name:fx-screw}.fx-hammer{animation-name:fx-hammer}

@keyframes fx-work-only{0%,${WORK_END}%{opacity:1}${WORK_END + 4}%,100%{opacity:0}}
@keyframes fx-done-only{0%,${WORK_END + 2}%{opacity:0}${WORK_END + 7}%,94%{opacity:1}100%{opacity:0}}
.fx-work-only{animation-name:fx-work-only}.fx-done-only{animation-name:fx-done-only}

@keyframes fx-badge{0%,${WORK_END + 3}%{opacity:0;transform:translate(0,10px) scale(.6)}${WORK_END + 9}%{opacity:1;transform:translate(0,0) scale(1.08)}${WORK_END + 13}%,92%{opacity:1;transform:none}100%{opacity:0;transform:none}}
.fx-badge{animation-name:fx-badge;transform-origin:0 0}

.fx-drip{animation:fx-drip .9s ease-in infinite !important}
@keyframes fx-drip{0%{transform:translateY(0);opacity:0}15%{opacity:1}100%{transform:translateY(34px);opacity:0}}

@keyframes fx-flicker{0%,6%,14%,22%,31%,38%,47%{fill:#E9E2D6}4%,10%,18%,27%,35%,43%,52%{fill:#F2C48A}${WORK_END + 2}%,96%{fill:#F7C66B}100%{fill:#E9E2D6}}
.fx-flicker{animation-name:fx-flicker}

@keyframes fx-fade-dirt{0%,8%{opacity:.6}${WORK_END}%,96%{opacity:0}100%{opacity:.6}}
.fx-dirt{animation-name:fx-fade-dirt}
@keyframes fx-glint{0%,${WORK_END + 4}%{transform:translateX(-160px);opacity:0}${WORK_END + 6}%{opacity:.9}${WORK_END + 20}%{transform:translateX(200px);opacity:0}100%{transform:translateX(200px);opacity:0}}
.fx-glint{animation-name:fx-glint}

@keyframes fx-paint{0%,4%{transform:scaleX(0);opacity:1}${WORK_END}%{transform:scaleX(1);opacity:1}94%{transform:scaleX(1);opacity:1}100%{transform:scaleX(1);opacity:0}}
.fx-paint{animation-name:fx-paint;animation-timing-function:linear !important}
@keyframes fx-walk{0%{transform:translateX(0);opacity:0}4%{transform:translateX(0);opacity:1}${WORK_END}%{transform:translateX(250px)}94%{transform:translateX(250px);opacity:1}100%{transform:translateX(250px);opacity:0}}
.fx-walk{animation-name:fx-walk;animation-timing-function:linear !important}
@keyframes fx-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
.fx-bob{animation:fx-bob .6s ease-in-out infinite !important}

@keyframes fx-flap{0%,4%{transform:translateY(0)}10%,${WORK_END - 4}%{transform:translateY(14px)}${WORK_END + 2}%,100%{transform:translateY(0)}}
.fx-flap{animation-name:fx-flap}
@keyframes fx-led{0%,${WORK_END}%{fill:#C24A3A}${WORK_END + 2}%,96%{fill:#4E8A4A}100%{fill:#C24A3A}}
.fx-led{animation-name:fx-led}
.fx-air{stroke-dasharray:10 12;animation:fx-air .9s linear infinite !important}
@keyframes fx-air{to{stroke-dashoffset:-44}}

@keyframes fx-shelf{0%,${WORK_END - 2}%{transform:rotate(7deg)}${WORK_END + 4}%,96%{transform:rotate(0)}100%{transform:rotate(7deg)}}
.fx-shelf{animation-name:fx-shelf}

/* life: blinking, breathing, dust drifting in the daylight */
@keyframes fx-blink{0%,90%,100%{transform:scaleY(1)}93%{transform:scaleY(.1)}}
.fx-blink{animation:fx-blink 3.7s infinite !important}
@keyframes fx-breathe{0%,100%{transform:translateY(0)}50%{transform:translateY(-1.2px)}}
.fx-breathe{animation:fx-breathe 3.2s ease-in-out infinite !important}
@keyframes fx-dust{0%{transform:translate(0,0);opacity:0}20%{opacity:.8}100%{transform:translate(-26px,-60px);opacity:0}}
.fx-dust{animation:fx-dust 5s linear infinite !important}
@media (prefers-reduced-motion: reduce){.fx *{animation-play-state:paused !important}}

/* the job card under the scene follows the same cycle */
@keyframes jc-progress{0%,4%{transform:scaleX(.04)}${WORK_END}%,100%{transform:scaleX(1)}}
.jc-progress{transform-origin:left;animation:jc-progress ${CYCLE}s ease-in-out infinite}
@keyframes jc-bar{0%,${WORK_END}%{background:#FC7508}${WORK_END + 3}%,100%{background:#1E8E4E}}
.jc-bar{animation:jc-bar ${CYCLE}s linear infinite}
@keyframes jc-work{0%,${WORK_END}%{opacity:1}${WORK_END + 3}%,100%{opacity:0}}
@keyframes jc-done{0%,${WORK_END}%{opacity:0}${WORK_END + 3}%,100%{opacity:1}}
.jc-work{animation:jc-work ${CYCLE}s linear infinite}.jc-done{animation:jc-done ${CYCLE}s linear infinite}
`;

/** Floorboard seams drawn toward a vanishing point so the floor reads as depth, not a band. */
const VP = { x: 240, y: 150 };
const boardSeams = Array.from({ length: 13 }, (_, i) => {
  const x0 = -240 + i * 80;
  return `M ${x0} 318 L ${VP.x + (x0 - VP.x) * ((400 - VP.y) / (318 - VP.y))} 400`;
}).join(' ');

function Room({ children }: { children: React.ReactNode }) {
  return (
    <>
      <rect width="480" height="320" fill="url(#fx-wall)" />
      {/* floor: boards, seams and a soft fade into the wall */}
      <rect y="318" width="480" height="82" fill="url(#fx-floor)" />
      <path d={boardSeams} stroke="#BFAF97" strokeWidth="1.2" opacity="0.55" />
      <path d="M 0 336 H 480 M 0 359 H 480 M 0 388 H 480" stroke="#BFAF97" strokeWidth="1" opacity="0.35" />
      {/* skirting board with a top highlight and contact shadow */}
      <rect y="304" width="480" height="15" fill="#F5F0E7" />
      <rect y="304" width="480" height="2" fill="#FFFFFF" opacity="0.8" />
      <rect y="318" width="480" height="5" fill="url(#fx-contact)" />
      {children}
    </>
  );
}

/** A small view outside a window: sky, a cloud, rooftops and trees. */
function WindowView({ x, y, w, h, id }: { x: number; y: number; w: number; h: number; id: string }) {
  return (
    <g>
      <clipPath id={id}>
        <rect x={x} y={y} width={w} height={h} />
      </clipPath>
      <g clipPath={`url(#${id})`}>
        <rect x={x} y={y} width={w} height={h} fill="url(#fx-sky)" />
        <ellipse cx={x + w * 0.3} cy={y + h * 0.22} rx={w * 0.18} ry={h * 0.05} fill="#fff" opacity="0.7" />
        <ellipse cx={x + w * 0.42} cy={y + h * 0.19} rx={w * 0.12} ry={h * 0.05} fill="#fff" opacity="0.7" />
        <rect x={x + w * 0.08} y={y + h * 0.62} width={w * 0.26} height={h * 0.5} fill="#C9C3BA" />
        <rect x={x + w * 0.58} y={y + h * 0.55} width={w * 0.3} height={h * 0.6} fill="#BDB6AB" />
        {[0.14, 0.24, 0.64, 0.76].map((fx) => (
          <rect key={fx} x={x + w * fx} y={y + h * 0.68} width={w * 0.05} height={h * 0.05} fill="#E9E2D6" />
        ))}
        <circle cx={x + w * 0.42} cy={y + h * 0.86} r={w * 0.17} fill="#93A887" />
        <circle cx={x + w * 0.55} cy={y + h * 0.9} r={w * 0.13} fill="#839977" />
        <circle cx={x + w * 0.05} cy={y + h * 0.92} r={w * 0.14} fill="#A3B496" />
        {/* reflection on the glass */}
        <path d={`M ${x + w * 0.55} ${y} L ${x + w * 0.75} ${y} L ${x + w * 0.35} ${y + h} L ${x + w * 0.15} ${y + h} Z`} fill="#fff" opacity="0.18" />
      </g>
    </g>
  );
}

/** Daylight from a window landing on the floor. */
function SunPatch({ d }: { d: string }) {
  return <path d={d} fill="#FFF6E2" opacity="0.55" filter="url(#fx-soft)" />;
}

function Toolbox({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 330)`}>
      <ellipse cx="0" cy="2" rx="32" ry="4" fill={C.ink} opacity="0.14" />
      <rect x="-28" y="-26" width="56" height="27" rx="3" fill={C.amber} />
      <rect x="-28" y="-26" width="56" height="8" rx="3" fill={C.amberDark} />
      <rect x="-28" y="-6" width="56" height="2" fill={C.amberDark} opacity="0.6" />
      <path d="M -12 -26 V -34 H 12 V -26" stroke="#3A3F47" strokeWidth="3.5" fill="none" strokeLinejoin="round" />
      <rect x="-4" y="-21" width="8" height="5" rx="1" fill="#E6C590" />
      <path d="M 14 -26 L 24 -40" stroke={C.steel} strokeWidth="3" strokeLinecap="round" />
      <rect x="20" y="-46" width="7" height="9" rx="2" fill="#B23A2E" transform="rotate(35 23 -41)" />
    </g>
  );
}

/** A RoundU professional, feet at (0,0), facing right. `arm` receives the animated limb. */
function Pro({ x, y, armClass, tool }: { x: number; y: number; armClass: string; tool?: React.ReactNode }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="2" cy="1" rx="36" ry="5.5" fill="url(#fx-floorshadow)" />
      <g filter="url(#fx-cast)">
        {/* back arm */}
        <path d="M -6 -128 L -11 -84" stroke="#172F50" strokeWidth="11" strokeLinecap="round" />
        <circle cx="-11" cy="-79" r="5.5" fill={C.skinDark} />
        {/* legs: back leg a shade darker, knee creases */}
        <rect x="-13" y="-72" width="12" height="68" rx="5" fill="#18263A" />
        <rect x="1" y="-72" width="12" height="68" rx="5" fill={C.trousers} />
        <path d="M 7 -40 v 10 M -7 -42 v 8" stroke="#0E1B2C" strokeWidth="1" opacity="0.4" />
        {/* work boots */}
        <path d="M -16 -8 h 17 a 3 3 0 0 1 3 3 v 5 h -20 z" fill="#2A2420" />
        <path d="M -1 -8 h 15 a 7 7 0 0 1 7 6 v 3 h -22 z" fill="#2E2823" />
        <rect x="-16" y="-1" width="38" height="2.5" rx="1" fill="#5A4E44" />
        <g className="fx-breathe">
          {/* polo shirt: light from the right */}
          <rect x="-19" y="-141" width="38" height="76" rx="15" fill="url(#fx-shirt)" />
          <path d="M -6 -141 L 0 -130 L 6 -141" fill={C.paper} opacity="0.9" />
          <path d="M 0 -130 V -118" stroke="#0B1A2C" strokeWidth="1.5" />
          <circle cx="0" cy="-124" r="1.2" fill="#D8D2C8" />
          <path d="M -15 -96 q 8 4 14 0" stroke="#0B1A2C" strokeWidth="1" fill="none" opacity="0.5" />
          <circle cx="10" cy="-117" r="6" fill={C.amber} />
          <text x="10" y="-114" fontSize="8" fontWeight="700" textAnchor="middle" fill={C.paper}>U</text>
          {/* belt + tool pouch */}
          <rect x="-19" y="-74" width="38" height="6" fill="#2A2420" />
          <rect x="-2" y="-74" width="6" height="6" rx="1" fill="#B9A27A" />
          <rect x="-24" y="-72" width="12" height="16" rx="3" fill="#8A6A44" />
          <path d="M -20 -72 v -8" stroke={C.amber} strokeWidth="3" strokeLinecap="round" />
          <path d="M -16 -72 v -6" stroke={C.steel} strokeWidth="2" strokeLinecap="round" />
          {/* neck + head */}
          <rect x="-5" y="-151" width="10" height="13" rx="3" fill={C.skinDark} />
          <circle cx="1" cy="-165" r="16" fill="url(#fx-skin)" />
          <path d="M -15 -162 q -1 10 6 15 l -2 -14 z" fill="#1E1712" />
          <ellipse cx="-6" cy="-163" rx="3" ry="4.5" fill={C.skinDark} />
          <path d="M 7 -171 q 3 -1.5 6 0" stroke="#2B1D14" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <g transform="translate(10 -166)">
            <ellipse className="pivot fx-blink" rx="1.7" ry="1.9" fill={C.ink} />
          </g>
          <path d="M 13 -158 q 2.5 1.5 4.5 0" stroke="#5E3A24" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <path d="M 16 -165 q 2.5 3 0 5" stroke={C.skinDark} strokeWidth="1.4" fill="none" strokeLinecap="round" />
          {/* cap with a shaded brim */}
          <path d="M -15 -167 A 16 16 0 0 1 17 -167 Z" fill={C.amber} />
          <path d="M -15 -167 A 16 16 0 0 1 -2 -182 A 18 18 0 0 0 -8 -167 Z" fill={C.amberDark} opacity="0.5" />
          <rect x="11" y="-170" width="17" height="4.5" rx="2" fill={C.amberDark} />
          <circle cx="1" cy="-182" r="1.8" fill={C.amberDark} />
          {/* working arm, pivoting at the shoulder */}
          <g transform="translate(4 -129)">
            <g className={`pivot ${armClass}`}>
              <path d="M 0 0 L 30 0" stroke={C.sleeve} strokeWidth="12" strokeLinecap="round" />
              <path d="M 22 -6 v 12" stroke="#152E4B" strokeWidth="2" opacity="0.6" />
              <path d="M 30 0 L 55 0" stroke={C.skin} strokeWidth="9" strokeLinecap="round" />
              <path d="M 32 3 L 54 3" stroke={C.skinDark} strokeWidth="3" strokeLinecap="round" opacity="0.5" />
              <g transform="translate(60 0)">
                {tool}
                <circle r="6" fill={C.skin} />
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  );
}

function Plant({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 318)`}>
      <path d="M -16 0 L -20 -34 L 20 -34 L 16 0 Z" fill="#C9B79C" />
      <path d="M 0 -34 C -6 -60 -30 -70 -34 -96 C -14 -88 -4 -70 0 -34 M 0 -34 C 4 -66 22 -84 28 -108 C 36 -82 16 -60 0 -34 M 0 -34 C -2 -58 6 -80 2 -112" stroke="#7E9A6E" strokeWidth="9" fill="none" strokeLinecap="round" />
    </g>
  );
}

function Frame({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="70" height="88" fill={C.white} stroke={C.wood} strokeWidth="5" />
      <path d="M 10 70 L 28 44 L 40 58 L 50 46 L 62 70 Z" fill={C.sage} />
      <circle cx="48" cy="24" r="7" fill="#E9A24A" />
    </g>
  );
}

function Sofa({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 318)`}>
      <rect x="0" y="-76" width="150" height="46" rx="14" fill="#2B4A77" />
      <rect x="-8" y="-50" width="166" height="38" rx="12" fill="#1F3C66" />
      <rect x="14" y="-58" width="34" height="22" rx="6" fill="#E9A24A" />
      <path d="M 8 -12 v 12 M 142 -12 v 12" stroke={C.ink} strokeWidth="6" />
    </g>
  );
}

function Badge({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="pivot fx-badge">
        <circle r="20" fill={C.navy} />
        <path d="M -8 0 L -2 6 L 9 -6" stroke={C.white} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  );
}

function Plumbing() {
  return (
    <Room>
      {/* window for context */}
      <SunPatch d="M 40 330 L 170 330 L 210 396 L 50 396 Z" />
      <WindowView x={40} y={60} w={120} h={120} id="fx-view-plumb" />
      <rect x="40" y="60" width="120" height="120" rx="4" fill="none" stroke={C.white} strokeWidth="8" />
      <rect x="32" y="178" width="136" height="8" rx="2" fill={C.white} />
      <path d="M 100 60 V 180 M 40 120 H 160" stroke={C.white} strokeWidth="5" />
      {/* cabinet + counter */}
      <rect x="250" y="232" width="190" height="86" fill={C.white} stroke={C.trim} strokeWidth="2" />
      <path d="M 345 236 V 314" stroke={C.trim} strokeWidth="2" />
      <circle cx="334" cy="262" r="3" fill={C.steel} />
      <circle cx="356" cy="262" r="3" fill={C.steel} />
      <rect x="240" y="222" width="210" height="12" rx="3" fill="#C9B79C" />
      {/* tap */}
      <rect x="390" y="196" width="10" height="27" rx="2" fill={C.steel} />
      <path d="M 395 198 Q 395 176 370 178 L 362 180" stroke={C.steel} strokeWidth="7" fill="none" strokeLinecap="round" />
      <rect x="386" y="204" width="18" height="5" rx="2" fill={C.steel} />
      {/* drips while it's broken */}
      <g className="fx-work-only">
        {[0, 0.3, 0.6].map((d) => (
          <circle key={d} cx="362" cy="188" r="3.5" fill="#7FA7C9" className="fx-drip" style={{ animationDelay: `${d}s` }} />
        ))}
        <ellipse cx="362" cy="221" rx="16" ry="2.5" fill="#7FA7C9" opacity="0.5" />
      </g>
      <Toolbox x={214} />
      <Pro
        x={318}
        y={318}
        armClass="fx-wrench"
        tool={
          <g>
            <rect x="0" y="-3" width="26" height="6" rx="2" fill={C.steel} />
            <path d="M 26 -9 h 8 v 6 h -4 v 6 h 4 v 6 h -8 z" fill={C.steel} />
          </g>
        }
      />
      <Badge x={420} y={150} />
    </Room>
  );
}

function Electrical() {
  return (
    <Room>
      {/* pendant + light cone */}
      <path d="M 320 0 V 92" stroke={C.ink} strokeWidth="2" />
      <polygon points="306,120 334,120 410,318 230,318" fill="url(#cone)" className="fx-done-only" />
      <path d="M 300 108 L 340 108 L 332 92 L 308 92 Z" fill={C.navy} />
      <circle cx="320" cy="118" r="11" className="fx-flicker" fill="#E9E2D6" />
      <circle cx="320" cy="118" r="26" fill="#F7C66B" opacity="0.35" className="fx-done-only" />
      <Sofa x={24} />
      {/* ladder */}
      <path d="M 196 318 L 226 214 L 256 318" stroke={C.wood} strokeWidth="6" fill="none" strokeLinejoin="round" />
      {[250, 280].map((y) => (
        <path key={y} d={`M 206 ${y} H 246`} stroke={C.wood} strokeWidth="5" />
      ))}
      <rect x="200" y="212" width="52" height="8" rx="2" fill="#9A7149" />
      <Toolbox x={300} />
      <Pro
        x={232}
        y={212}
        armClass="fx-bulbarm"
        tool={<rect x="-2" y="-14" width="5" height="10" rx="2" fill={C.steel} />}
      />
      <Badge x={400} y={70} />
    </Room>
  );
}

function Cleaning() {
  return (
    <Room>
      {/* window */}
      <g>
        <WindowView x={250} y={60} w={180} h={200} id="fx-view-clean" />
        <clipPath id="pane">
          <rect x="250" y="60" width="180" height="200" />
        </clipPath>
        <g clipPath="url(#pane)">
          <g className="fx-dirt">
            <ellipse cx="300" cy="110" rx="26" ry="16" fill="#B5A994" />
            <ellipse cx="372" cy="150" rx="30" ry="18" fill="#B5A994" />
            <ellipse cx="318" cy="205" rx="22" ry="14" fill="#B5A994" />
            <ellipse cx="398" cy="96" rx="16" ry="11" fill="#B5A994" />
          </g>
          <rect x="300" y="40" width="26" height="260" fill="#fff" transform="rotate(20 313 160)" className="fx-glint" />
        </g>
        <rect x="250" y="60" width="180" height="200" fill="none" stroke={C.white} strokeWidth="10" />
        <path d="M 340 60 V 260 M 250 160 H 430" stroke={C.white} strokeWidth="6" />
        <rect x="240" y="258" width="200" height="10" rx="3" fill={C.white} />
      </g>
      <Frame x={60} y={90} />
      <Plant x={110} />
      {/* daylight through the glass, with dust drifting in it */}
      <path d="M 252 70 L 340 70 L 300 332 L 168 332 Z" fill="#FFF6E2" opacity="0.22" filter="url(#fx-soft)" />
      <SunPatch d="M 160 334 L 330 334 L 316 396 L 120 396 Z" />
      <g fill="#FFFFFF">
        {[
          [262, 210, 0], [236, 260, 1.4], [288, 180, 2.6], [214, 300, 3.5], [276, 290, 0.8], [250, 150, 4.2],
        ].map(([x, y, d]) => (
          <circle key={d} cx={x} cy={y} r="1.6" className="fx-dust" style={{ animationDelay: `-${d}s` }} />
        ))}
      </g>
      {/* bucket with soapy water */}
      <g transform="translate(196 332)">
        <ellipse cx="0" cy="2" rx="26" ry="4" fill={C.ink} opacity="0.14" />
        <path d="M -22 -36 L 22 -36 L 17 0 L -17 0 Z" fill="#5E7C9A" />
        <path d="M -22 -36 L 22 -36 L 21 -29 L -21 -29 Z" fill="#4B6782" />
        <ellipse cx="0" cy="-36" rx="22" ry="5" fill="#CFE3EE" />
        <circle cx="-8" cy="-39" r="4" fill="#fff" opacity="0.9" />
        <circle cx="2" cy="-41" r="3" fill="#fff" opacity="0.9" />
        <circle cx="10" cy="-38" r="3.5" fill="#fff" opacity="0.9" />
        <path d="M -21 -34 Q 0 -66 21 -34" stroke="#3A3F47" strokeWidth="2" fill="none" />
        <path d="M -12 -28 L -10 -6" stroke="#fff" strokeWidth="3" opacity="0.2" strokeLinecap="round" />
      </g>
      {/* spray bottle on the sill */}
      <g transform="translate(414 258)">
        <rect x="-7" y="-24" width="14" height="24" rx="4" fill="#E7EEF2" />
        <rect x="-7" y="-14" width="14" height="10" fill={C.amber} opacity="0.85" />
        <path d="M -4 -24 v -6 h 10 l 5 3 h -6 v 3" fill="#2B4A77" />
      </g>
      <Pro
        x={286}
        y={318}
        armClass="fx-wipe"
        tool={<rect x="-4" y="-12" width="22" height="16" rx="4" fill="#E9A24A" />}
      />
      {/* sparkles */}
      <g className="fx-done-only" fill={C.amber}>
        {[
          [282, 96, 1],
          [410, 130, 0.8],
          [356, 222, 0.7],
        ].map(([x, y, s]) => (
          <path key={x} transform={`translate(${x} ${y}) scale(${s})`} d="M 0 -12 L 3 -3 L 12 0 L 3 3 L 0 12 L -3 3 L -12 0 L -3 -3 Z" />
        ))}
      </g>
      <Badge x={440} y={40} />
    </Room>
  );
}

function Painting() {
  return (
    <Room>
      {/* fresh paint, revealed left to right */}
      <g transform="translate(150 30)">
        <rect className="pivot fx-paint" width="290" height="286" fill={C.sage} />
      </g>
      <rect x="148" y="30" width="294" height="288" fill="none" stroke={C.trim} strokeWidth="2" strokeDasharray="6 6" />
      <path d="M 140 322 L 446 322 L 470 352 L 120 352 Z" fill="#F4EFE6" opacity="0.6" />
      <path d="M 200 330 q 30 6 60 0 M 330 340 q 40 6 80 0" stroke="#DCD3C4" strokeWidth="2" fill="none" />
      <circle cx="268" cy="338" r="3" fill={C.sage} />
      <circle cx="350" cy="330" r="2" fill={C.sage} />
      {/* paint tray */}
      <path d="M 60 318 L 70 300 L 120 300 L 126 318 Z" fill={C.steel} />
      <rect x="74" y="302" width="42" height="6" fill={C.sage} />
      <g className="fx-walk">
        <g className="fx-bob">
          <Pro
            x={88}
            y={318}
            armClass="fx-roll"
            tool={
              <g>
                <path d="M 0 0 L 0 -24" stroke={C.ink} strokeWidth="4" strokeLinecap="round" />
                <rect x="-1" y="-48" width="14" height="40" rx="6" fill={C.sage} stroke="#A9B79A" strokeWidth="2" />
              </g>
            }
          />
        </g>
      </g>
      <Badge x={430} y={60} />
    </Room>
  );
}

function AirCon() {
  return (
    <Room>
      {/* AC unit */}
      <rect x="270" y="70" width="180" height="58" rx="12" fill={C.white} stroke={C.trim} strokeWidth="2" />
      {[84, 94, 104].map((y) => (
        <path key={y} d={`M 290 ${y} H 400`} stroke="#E4DDD1" strokeWidth="2" />
      ))}
      <circle cx="430" cy="86" r="4" className="fx-led" fill="#C24A3A" />
      <g transform="translate(286 122)">
        <rect className="pivot fx-flap" width="150" height="7" rx="3" fill="#DCD4C7" />
      </g>
      {/* cool air once fixed */}
      <g className="fx-done-only" fill="none" stroke="#8FB3D9" strokeWidth="3" strokeLinecap="round">
        <path className="fx-air" d="M 310 140 q 10 30 -6 60 q -14 30 4 60" />
        <path className="fx-air" d="M 360 140 q 10 30 -6 60 q -14 30 4 60" style={{ animationDelay: '-.3s' }} />
        <path className="fx-air" d="M 410 140 q 10 30 -6 60 q -14 30 4 60" style={{ animationDelay: '-.6s' }} />
      </g>
      <Frame x={70} y={110} />
      <Plant x={440} />
      <Toolbox x={140} />
      {/* step stool */}
      <rect x="196" y="270" width="88" height="10" rx="3" fill={C.wood} />
      <path d="M 204 280 L 198 318 M 276 280 L 282 318" stroke="#9A7149" strokeWidth="6" />
      <Pro
        x={238}
        y={270}
        armClass="fx-screw"
        tool={
          <g>
            <rect x="0" y="-4" width="14" height="8" rx="3" fill={C.amber} />
            <path d="M 14 0 H 30" stroke={C.steel} strokeWidth="3" strokeLinecap="round" />
          </g>
        }
      />
      <Badge x={240} y={58} />
    </Room>
  );
}

function Carpentry() {
  return (
    <Room>
      {/* shelf that gets levelled */}
      <g transform="translate(262 160)">
        <g className="pivot fx-shelf">
          <rect x="0" y="0" width="180" height="10" rx="2" fill={C.wood} />
          <path d="M 14 10 v 22 l 18 -22 z M 150 10 v 22 l 18 -22 z" fill="#9A7149" />
          <rect x="18" y="-46" width="12" height="46" fill={C.navy} />
          <rect x="31" y="-40" width="10" height="40" fill={C.amber} />
          <rect x="42" y="-50" width="13" height="50" fill="#5B6472" />
          <path d="M 128 0 L 124 -22 L 154 -22 L 150 0 Z" fill="#C9B79C" />
          <path d="M 139 -22 q -10 -18 -2 -30 q 6 12 2 30 M 139 -22 q 12 -14 20 -18 q -4 14 -20 18" fill="#7E9A6E" />
        </g>
      </g>
      <Plant x={70} />
      <Toolbox x={330} />
      {/* sawdust */}
      <path d="M 290 334 q 10 -4 22 0 q -10 3 -22 0 M 360 344 q 8 -3 16 0 q -8 2 -16 0" fill="#D8BE95" />
      <Pro
        x={196}
        y={318}
        armClass="fx-hammer"
        tool={
          <g>
            <path d="M 0 0 L 0 -30" stroke="#7A5634" strokeWidth="5" strokeLinecap="round" />
            <rect x="-10" y="-38" width="22" height="10" rx="2" fill={C.steel} />
          </g>
        }
      />
      <Badge x={430} y={100} />
    </Room>
  );
}

const scenes: Record<TradeKey, () => JSX.Element> = {
  plumbing: Plumbing,
  electrical: Electrical,
  cleaning: Cleaning,
  painting: Painting,
  ac: AirCon,
  carpentry: Carpentry,
};

export default function FixItScene({ trade, className = '' }: { trade: TradeKey; className?: string }) {
  const Scene = scenes[trade];
  return (
    <svg viewBox="0 0 480 400" className={`fx block h-auto w-full ${className}`} role="img" aria-label={`A RoundU professional at work: ${trade}`}>
      <defs>
        <linearGradient id="fx-wall" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F5F0E8" />
          <stop offset="1" stopColor="#E7DFD2" />
        </linearGradient>
        <linearGradient id="fx-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D9CDBA" />
          <stop offset="1" stopColor="#CDBFA9" />
        </linearGradient>
        <linearGradient id="fx-contact" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0E1B2C" stopOpacity="0.14" />
          <stop offset="1" stopColor="#0E1B2C" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="fx-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C6DAE6" />
          <stop offset="1" stopColor="#EAF0EE" />
        </linearGradient>
        <linearGradient id="fx-shirt" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#10243B" />
          <stop offset="0.6" stopColor="#173352" />
          <stop offset="1" stopColor="#24456F" />
        </linearGradient>
        <radialGradient id="fx-skin" cx="0.65" cy="0.4" r="0.7">
          <stop offset="0" stopColor="#B98058" />
          <stop offset="1" stopColor="#93603E" />
        </radialGradient>
        <radialGradient id="fx-floorshadow">
          <stop offset="0" stopColor="#0E1B2C" stopOpacity="0.28" />
          <stop offset="1" stopColor="#0E1B2C" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="fx-vignette" cx="0.55" cy="0.4" r="0.8">
          <stop offset="0.55" stopColor="#0E1B2C" stopOpacity="0" />
          <stop offset="1" stopColor="#0E1B2C" stopOpacity="0.12" />
        </radialGradient>
        <filter id="fx-cast" x="-60%" y="-20%" width="200%" height="140%">
          <feDropShadow dx="-10" dy="-2" stdDeviation="5" floodColor="#0E1B2C" floodOpacity="0.14" />
        </filter>
        <filter id="fx-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <filter id="fx-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <linearGradient id="cone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F7C66B" stopOpacity="0.55" />
          <stop offset="1" stopColor="#F7C66B" stopOpacity="0" />
        </linearGradient>
      </defs>
      <Scene />
      {/* lens: soft vignette and paper grain so the flat shapes read like a photo */}
      <rect width="480" height="400" fill="url(#fx-vignette)" pointerEvents="none" />
      <rect width="480" height="400" filter="url(#fx-grain)" opacity="0.07" style={{ mixBlendMode: 'multiply' }} pointerEvents="none" />
    </svg>
  );
}

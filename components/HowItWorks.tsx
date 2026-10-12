'use client';

import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { BadgeCheck, CheckCircle2, Clock, Droplets, KeyRound, Star } from 'lucide-react';
import { PhoneClip, SCREEN_W, SCREEN_H } from './three/PhoneScreens';

const steps = [
  { word: 'Ask', title: 'Tell us what broke.', body: 'One line and a trade. No calls.' },
  { word: 'Match', title: 'Meet your pro.', body: 'Verified, rated and priced before you confirm.' },
  { word: 'Arrive', title: 'Watch them come.', body: 'Live on the map, to your door.' },
];

// Floating details that orbit the phone, one set per step.
const chips: { icon: typeof Clock; text: string; pos: string; depth: number; tone?: 'danger' | 'success' }[][] = [
  [
    { icon: Droplets, text: 'Kitchen tap is leaking', pos: 'left-[-46%] top-[22%]', depth: 60, tone: 'danger' },
    { icon: Clock, text: 'Now', pos: 'right-[-30%] top-[58%]', depth: 120 },
  ],
  [
    { icon: BadgeCheck, text: 'DigiLocker verified', pos: 'left-[-50%] top-[30%]', depth: 90, tone: 'success' },
    { icon: Star, text: '4.8 · 420 jobs', pos: 'right-[-34%] top-[18%]', depth: 50 },
    { icon: CheckCircle2, text: 'Matched in 48s', pos: 'right-[-40%] top-[66%]', depth: 130, tone: 'success' },
  ],
  [
    { icon: Clock, text: '6 min away', pos: 'left-[-40%] top-[20%]', depth: 70 },
    { icon: KeyRound, text: 'OTP 4821', pos: 'right-[-30%] top-[46%]', depth: 120 },
    { icon: CheckCircle2, text: 'Pay after the job', pos: 'left-[-46%] top-[70%]', depth: 40, tone: 'success' },
  ],
];

function usePhoneScale() {
  const [scale, setScale] = useState(0.7);
  useEffect(() => {
    const update = () => {
      const byHeight = (window.innerHeight - (window.innerWidth < 1024 ? 330 : 180)) / (SCREEN_H + 30);
      const byWidth = (window.innerWidth - 48) / (SCREEN_W + 30);
      setScale(Math.max(0.42, Math.min(0.92, byHeight, byWidth)));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return scale;
}

function Phone({ progress, step, scale }: { progress: MotionValue<number>; step: number; scale: number }) {
  const rotateY = useTransform(progress, [0, 0.5, 1], [-22, 0, 18]);
  const rotateX = useTransform(progress, [0, 0.5, 1], [12, 4, 10]);
  const rotateZ = useTransform(progress, [0, 1], [-4, 3]);
  const lift = useTransform(progress, [0, 0.15], [80, 0]);

  const w = SCREEN_W * scale;
  const h = SCREEN_H * scale;

  return (
    <motion.div style={{ rotateY, rotateX, rotateZ, y: lift, transformStyle: 'preserve-3d' }} className="relative">
      <div
        className="relative rounded-[60px] bg-[linear-gradient(140deg,#C4BEB5,#6F6A63_45%,#A9A39A)] p-[3px] shadow-[0_60px_90px_-40px_rgba(14,27,44,0.6),0_20px_40px_-20px_rgba(14,27,44,0.3)]"
        style={{ width: w + 26, height: h + 26, borderRadius: 58 * scale + 8 }}
      >
        <div className="h-full w-full bg-[#040507] p-[10px]" style={{ borderRadius: 56 * scale + 6 }}>
          <div className="relative h-full w-full overflow-hidden bg-black" style={{ borderRadius: 48 * scale }}>
            <div className="absolute left-0 top-0" style={{ width: SCREEN_W, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
              {/* each step plays its own app recording; steps cross-fade like a cut in a video */}
              <div className="relative" style={{ width: SCREEN_W, height: SCREEN_H }}>
                <AnimatePresence initial={false}>
                  <motion.div
                    key={step}
                    className="absolute inset-0"
                    initial={{ opacity: 0, y: 36, scale: 1.04, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -24, scale: 0.97, filter: 'blur(8px)' }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <PhoneClip index={step} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.04)_28%,rgba(255,255,255,0)_45%)]" />
          </div>
        </div>
      </div>

      {/* Floating chips */}
      <AnimatePresence>
        {chips[step].map((c, i) => (
          <motion.div
            key={`${step}-${c.text}`}
            initial={{ opacity: 0, scale: 0.7, filter: 'blur(6px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', z: c.depth }}
            exit={{ opacity: 0, scale: 0.85, filter: 'blur(6px)' }}
            transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.08 * i }}
            className={`absolute ${c.pos} hidden sm:flex items-center gap-2.5 whitespace-nowrap rounded-full bg-white/95 px-4 py-2.5 text-sm text-ink shadow-[0_18px_40px_-18px_rgba(14,27,44,0.5)] ring-1 ring-line backdrop-blur`}
          >
            <c.icon
              className={`h-4 w-4 ${c.tone === 'danger' ? 'text-danger' : c.tone === 'success' ? 'text-success' : 'text-amber-700'}`}
              strokeWidth={1.75}
            />
            {c.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

export default function HowItWorks({ heading = true }: { heading?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const [step, setStep] = useState(0);
  const scale = usePhoneScale();

  useMotionValueEvent(progress, 'change', (p) => {
    const next = Math.min(steps.length - 1, Math.max(0, Math.floor(p * steps.length * 0.999)));
    if (next !== step) setStep(next);
  });

  const bgX = useTransform(progress, [0, 1], ['6%', '-24%']);
  const fills = [
    useTransform(progress, [0, 1 / 3], ['0%', '100%']),
    useTransform(progress, [1 / 3, 2 / 3], ['0%', '100%']),
    useTransform(progress, [2 / 3, 1], ['0%', '100%']),
  ];

  return (
    <section id="how" ref={ref} className="relative h-[400vh] bg-sand/60">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Oversized step word drifting behind */}
        <motion.div
          style={{ x: bgX }}
          className="pointer-events-none absolute bottom-[-4vw] left-0 whitespace-nowrap font-serif leading-none text-navy-700/[0.05] text-[34vw]"
          aria-hidden
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={step}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -60 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
            >
              {steps[step].word}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        <div className="relative mx-auto grid h-full max-w-[1280px] grid-rows-[auto_1fr] gap-4 px-6 pt-24 lg:grid-cols-12 lg:grid-rows-1 lg:px-10 lg:pt-0">
          <div className="lg:col-span-5 lg:self-center">
            {heading && <p className="eyebrow mb-6 lg:mb-10">How it works</p>}

            <div className="flex items-baseline gap-3 font-serif text-navy-700">
              <span className="relative inline-block h-[1.1em] w-[1.3em] overflow-hidden text-4xl lg:text-5xl tabular">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={step}
                    initial={{ y: '100%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-0 top-0"
                  >
                    0{step + 1}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="text-lg text-muted">/ 03</span>
            </div>

            <div className="relative mt-4 h-[6.5rem] lg:mt-6 lg:h-[9.5rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={step} className="absolute inset-0">
                  <h2 className="font-serif text-[2.3rem] leading-[1.02] text-ink lg:text-[3.6rem]">
                    {steps[step].title.split(' ').map((word, i) => (
                      <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
                        <motion.span
                          className="inline-block"
                          initial={{ y: '110%' }}
                          animate={{ y: '0%' }}
                          exit={{ y: '-110%' }}
                          transition={{ duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                        >
                          {word}&nbsp;
                        </motion.span>
                      </span>
                    ))}
                  </h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="mt-3 text-base text-muted lg:mt-5 lg:text-lg"
                  >
                    {steps[step].body}
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress */}
            <div className="mt-6 hidden max-w-sm grid-cols-3 gap-2 lg:mt-12 lg:grid">
              {steps.map((s, i) => (
                <div key={s.word}>
                  <div className="h-[2px] overflow-hidden rounded-full bg-line">
                    <motion.div style={{ width: fills[i] }} className="h-full bg-navy-700" />
                  </div>
                  <p className={`mt-3 text-sm transition-colors ${i === step ? 'text-ink' : 'text-muted/60'}`}>{s.word}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex min-h-0 items-start justify-center [perspective:1600px] lg:col-span-7 lg:items-center">
            <Phone progress={progress} step={step} scale={scale} />
          </div>
        </div>
      </div>
    </section>
  );
}

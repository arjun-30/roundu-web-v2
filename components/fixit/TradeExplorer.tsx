'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import { fixitCss, type TradeKey } from './FixItScene';

const TradeScene3D = dynamic(() => import('./TradeScene3D'), { ssr: false });

export const trades: { key: TradeKey; name: string; job: string; pro: string; time: string; issue?: string }[] = [
  { key: 'plumbing', name: 'Plumbing', job: 'Fixing a leaking tap', pro: 'Karthik', time: '12 min', issue: 'Tap leaking' },
  { key: 'electrical', name: 'Electrical', job: 'Replacing a light fitting', pro: 'Suresh', time: '9 min', issue: 'Light not working' },
  { key: 'cleaning', name: 'Cleaning', job: 'Cleaning the windows', pro: 'Priya', time: '14 min', issue: 'Windows dirty' },
  { key: 'painting', name: 'Painting', job: 'Repainting a wall', pro: 'Arun', time: '11 min', issue: 'Wall faded' },
  { key: 'ac', name: 'AC service', job: 'Servicing the AC', pro: 'Manoj', time: '13 min', issue: 'AC not cooling' },
  { key: 'carpentry', name: 'Carpentry', job: 'Mounting a wall shelf', pro: 'Ravi', time: '10 min', issue: 'Shelf loose' },
];

const CYCLE_MS = 6000;

/** The illustrated scene in a tilting card, with floating details that follow the cursor. */
export function ScenePanel({ index }: { index: number }) {
  const t = trades[index];
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-7, 7]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const chipX = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const chipY = useTransform(sy, [-0.5, 0.5], [-10, 10]);

  function onMove(e: React.PointerEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="[perspective:1200px]"
    >
      <style dangerouslySetInnerHTML={{ __html: fixitCss }} />
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative rounded-[20px] bg-[#EFE9DF] shadow-[0_40px_80px_-40px_rgba(14,27,44,0.45)] ring-1 ring-line"
      >
        <div className="overflow-hidden rounded-[20px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key="stage"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative aspect-[6/5] overflow-hidden bg-[#EDE7DD]">
                <TradeScene3D trade={t.key} />
                <span className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-ink backdrop-blur">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                  </span>
                  Verified pro · on the job
                </span>
                {t.issue && (
                  <span key={t.key} className="pointer-events-none absolute right-4 top-4 grid text-xs font-medium">
                    <span className="jc-work col-start-1 row-start-1 flex items-center gap-1.5 rounded-full bg-danger-soft px-3 py-1.5 text-danger-ink">
                      <span className="h-1.5 w-1.5 rounded-full bg-danger" /> {t.issue}
                    </span>
                    <span className="jc-done col-start-1 row-start-1 flex items-center gap-1.5 rounded-full bg-success-soft px-3 py-1.5 text-success-ink">
                      <span className="h-1.5 w-1.5 rounded-full bg-success" /> Fixed
                    </span>
                  </span>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Live job card */}
        <motion.div
          style={{ x: chipX, y: chipY, translateZ: 40 }}
          className="absolute -bottom-6 left-5 right-5 sm:left-auto sm:right-[-18px] sm:w-[280px] rounded-[14px] bg-white p-4 shadow-[0_24px_50px_-24px_rgba(14,27,44,0.45)] ring-1 ring-line"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={t.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-3"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy-700 font-serif text-paper">
                {t.pro[0]}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink">
                  {t.pro} · {t.name}
                </p>
                <p className="truncate text-xs text-muted">{t.job}</p>
              </div>
              <span className="relative grid text-xs">
                <span className="jc-work tabular col-start-1 row-start-1 flex items-center gap-1.5 rounded-full bg-sand px-2.5 py-1 text-ink">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-700" /> {t.time}
                </span>
                <span className="jc-done col-start-1 row-start-1 rounded-full bg-success-soft px-2.5 py-1 text-center text-success-ink">
                  Done ✓
                </span>
              </span>
            </motion.div>
          </AnimatePresence>
          {/* live progress, restarted with each trade so it lines up with the scene */}
          <div className="mt-3 h-[3px] overflow-hidden rounded-full bg-line">
            <div key={t.key} className="jc-progress jc-bar h-full rounded-full" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/** Trade list with a sticky illustrated panel. Hover or tap a trade to watch it being fixed. */
export default function TradeExplorer({ dark = false }: { dark?: boolean }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance one trade per animation cycle until the visitor takes over.
  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % trades.length), CYCLE_MS);
    return () => clearTimeout(id);
  }, [index, paused]);

  return (
    <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
      <ul className="lg:col-span-5" onMouseLeave={() => setPaused(false)}>
        {trades.map((t, i) => {
          const active = i === index;
          return (
            <li key={t.key}>
              <button
                type="button"
                onMouseEnter={() => {
                  setPaused(true);
                  setIndex(i);
                }}
                onFocus={() => {
                  setPaused(true);
                  setIndex(i);
                }}
                onClick={() => {
                  setPaused(true);
                  setIndex(i);
                }}
                className={`relative flex w-full items-center justify-between border-t py-5 text-left transition-colors ${
                  dark ? 'border-paper/15' : 'border-line'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="trade-active"
                    className="absolute left-0 top-[-1px] h-[2px] w-full bg-amber-700"
                    transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                  />
                )}
                <span
                  className={`font-serif text-[1.65rem] leading-none transition-colors duration-300 sm:text-3xl ${
                    active ? (dark ? 'text-paper' : 'text-navy-700') : dark ? 'text-paper/40' : 'text-ink/35'
                  }`}
                >
                  {t.name}
                </span>
                <motion.span
                  animate={{ opacity: active ? 1 : 0, x: active ? 0 : -8 }}
                  className={`text-sm ${dark ? 'text-paper/70' : 'text-muted'}`}
                >
                  {t.job}
                </motion.span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="order-first pb-8 lg:order-none lg:col-span-6 lg:col-start-7">
        <ScenePanel index={index} />
      </div>
    </div>
  );
}

/** Self-running panel for side columns (no list). */
export function CyclingScene() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % trades.length), CYCLE_MS);
    return () => clearInterval(id);
  }, []);
  return <ScenePanel index={index} />;
}

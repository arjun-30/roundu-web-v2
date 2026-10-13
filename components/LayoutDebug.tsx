'use client';

// TEMPORARY: open the site with ?debug to see why the layout looks off-centre. Remove once fixed.
import { useEffect, useState } from 'react';

export default function LayoutDebug() {
  const [lines, setLines] = useState<string[] | null>(null);

  useEffect(() => {
    if (!new URLSearchParams(window.location.search).has('debug')) return;
    const measure = () => {
      const de = document.documentElement;
      const vw = de.clientWidth;
      const rect = (el: Element | null) => {
        if (!el) return 'none';
        const b = el.getBoundingClientRect();
        return `${Math.round(b.left)}–${Math.round(b.right)} (w ${Math.round(b.width)})`;
      };
      const wide = [...document.querySelectorAll('body *')]
        .filter((el) => {
          const b = el.getBoundingClientRect();
          return b.width > vw + 2 || b.left < -2;
        })
        .slice(0, 6)
        .map((el) => `${el.tagName.toLowerCase()}.${String((el as HTMLElement).className?.toString() ?? '').slice(0, 50)} ${rect(el)}`);
      const vv = window.visualViewport;
      setLines([
        `innerWidth ${window.innerWidth} · clientWidth ${vw} · scrollWidth ${de.scrollWidth}`,
        `screen ${window.screen.width} · dpr ${window.devicePixelRatio} · zoom ${vv ? vv.scale.toFixed(2) : '?'} · vvLeft ${vv ? Math.round(vv.offsetLeft) : '?'}`,
        `scrollX ${Math.round(window.scrollX)} · body ${rect(document.body)}`,
        `header ${rect(document.querySelector('header'))}`,
        `nav ${rect(document.querySelector('nav'))}`,
        `h1 ${rect(document.querySelector('h1'))}`,
        ...(wide.length ? ['too wide:', ...wide] : ['nothing wider than the page']),
      ]);
    };
    measure();
    const id = window.setInterval(measure, 1000);
    window.addEventListener('resize', measure);
    return () => {
      window.clearInterval(id);
      window.removeEventListener('resize', measure);
    };
  }, []);

  if (!lines) return null;
  return (
    <pre className="fixed bottom-3 left-3 z-[100000] max-w-[90vw] whitespace-pre-wrap rounded-lg bg-black/85 p-3 font-mono text-[12px] leading-5 text-lime-300">
      {lines.join('\n')}
    </pre>
  );
}

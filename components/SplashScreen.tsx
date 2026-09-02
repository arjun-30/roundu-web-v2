'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function SplashScreen() {
  const [phase, setPhase] = useState<'visible' | 'fadeOut' | 'gone'>('visible');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const fadeTimer = setTimeout(() => setPhase('fadeOut'), 1600);
    const doneTimer = setTimeout(() => {
      setPhase('gone');
      document.body.style.overflow = '';
    }, 2200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = '';
    };
  }, []);

  if (phase === 'gone') return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#080C14',
        opacity: phase === 'fadeOut' ? 0 : 1,
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: phase === 'fadeOut' ? 'none' : 'all',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          animation: 'splashIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      >
        <div style={{
          padding: '24px',
          borderRadius: '24px',
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
        }}>
          <Image
            src="/logo.png"
            alt="RoundU Logo"
            width={180}
            height={72}
            priority
            style={{ objectFit: 'contain' }}
          />
        </div>

        <div style={{
          width: 140,
          height: 3,
          borderRadius: 9999,
          background: 'rgba(255,255,255,0.08)',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              borderRadius: 9999,
              background: '#F59E0B',
              animation: 'splashBar 1.6s ease-in-out forwards',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes splashIn {
          0%   { opacity: 0; transform: scale(0.95) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes splashBar {
          0%   { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}

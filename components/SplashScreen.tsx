'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function SplashScreen() {
  // phase: 'visible' → 'fadeOut' → 'gone'
  const [phase, setPhase] = useState<'visible' | 'fadeOut' | 'gone'>('visible');

  useEffect(() => {
    // Lock body scroll while splash is showing
    document.body.style.overflow = 'hidden';

    // Start fade-out after 1.8 s
    const fadeTimer = setTimeout(() => setPhase('fadeOut'), 1800);

    // Unmount & re-enable scroll after fade completes (1.8 + 0.7 = 2.5 s)
    const doneTimer = setTimeout(() => {
      setPhase('gone');
      document.body.style.overflow = '';
    }, 2500);

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
        background: '#152E4B',
        opacity: phase === 'fadeOut' ? 0 : 1,
        transition: 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: phase === 'fadeOut' ? 'none' : 'all',
      }}
    >
      {/* Ambient radial glows */}
      <div style={{
        position: 'absolute',
        width: 500,
        height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(248,176,40,0.12) 0%, transparent 70%)',
        filter: 'blur(60px)',
        animation: 'splashPulse 2s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(21,46,75,0.8) 0%, transparent 70%)',
        filter: 'blur(40px)',
        top: '20%',
        right: '20%',
      }} />

      {/* Logo container */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0,
          animation: 'splashLogoIn 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        }}
      >
        <Image
          src="/logo.png"
          alt="RoundU Logo"
          width={200}
          height={200}
          priority
          style={{ objectFit: 'contain' }}
        />
      </div>

      {/* Loader bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 48,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 120,
          height: 3,
          borderRadius: 9999,
          background: 'rgba(255,255,255,0.1)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            borderRadius: 9999,
            background: 'linear-gradient(90deg, #F8B028, #A95D06)',
            animation: 'splashLoader 1.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
          }}
        />
      </div>

      <style>{`
        @keyframes splashLogoIn {
          0%   { opacity: 0; transform: scale(0.72) translateY(24px); }
          100% { opacity: 1; transform: scale(1)    translateY(0);    }
        }
        @keyframes splashPulse {
          0%, 100% { opacity: 0.5; transform: scale(1);    }
          50%       { opacity: 0.9; transform: scale(1.08); }
        }
        @keyframes splashLoader {
          0%   { width: 0%;   }
          60%  { width: 80%;  }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function SplashScreen() {
  const [phase, setPhase] = useState<'visible' | 'fadeOut' | 'gone'>('visible');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const fadeTimer = setTimeout(() => setPhase('fadeOut'), 2200);
    const doneTimer = setTimeout(() => {
      setPhase('gone');
      document.body.style.overflow = '';
    }, 3000);

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
        background: 'linear-gradient(-45deg, #0d1b2a, #152E4B, #1b3d68, #152E4B)',
        backgroundSize: '400% 400%',
        animation: 'splashGradientBG 6s ease infinite',
        opacity: phase === 'fadeOut' ? 0 : 1,
        transition: 'opacity 0.8s cubic-bezier(0.65, 0, 0.35, 1)',
        pointerEvents: phase === 'fadeOut' ? 'none' : 'all',
      }}
    >
      {/* Decorative floating rings */}
      <div style={{
        position: 'absolute',
        width: '120vw',
        height: '120vw',
        border: '1px solid rgba(248,176,40,0.05)',
        borderRadius: '50%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        animation: 'ringScale 4s cubic-bezier(0.4, 0, 0.2, 1) infinite',
      }} />
      <div style={{
        position: 'absolute',
        width: '90vw',
        height: '90vw',
        border: '1px solid rgba(248,176,40,0.08)',
        borderRadius: '50%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        animation: 'ringScale 4s cubic-bezier(0.4, 0, 0.2, 1) infinite 0.5s',
      }} />

      {/* Ambient radial glows */}
      <div style={{
        position: 'absolute',
        width: 600,
        height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(248,176,40,0.15) 0%, transparent 60%)',
        filter: 'blur(80px)',
        animation: 'splashPulse 3s ease-in-out infinite',
      }} />

      {/* Logo container */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
          animation: 'splashLogoIn 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        }}
      >
        <div style={{
          position: 'relative',
          padding: '32px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.02)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <Image
            src="/logo.png"
            alt="RoundU Logo"
            width={240}
            height={240}
            priority
            style={{ 
              objectFit: 'contain',
              filter: 'drop-shadow(0 4px 16px rgba(248,176,40,0.25))'
            }}
          />
        </div>
      </div>

      {/* Loader */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          opacity: 0,
          animation: 'fadeInUp 0.8s ease forwards 0.8s'
        }}
      >
        <div
          style={{
            width: 180,
            height: 4,
            borderRadius: 9999,
            background: 'rgba(255,255,255,0.08)',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              borderRadius: 9999,
              background: 'linear-gradient(90deg, #F8B028, #fff, #F8B028)',
              backgroundSize: '200% 100%',
              animation: 'splashLoader 2.2s cubic-bezier(0.4, 0, 0.2, 1) forwards, shimmer 2s linear infinite',
            }}
          />
        </div>
        <span style={{ 
          color: 'rgba(255,255,255,0.7)', 
          fontSize: '0.85rem', 
          fontWeight: 600,
          letterSpacing: '3px',
          textTransform: 'uppercase'
        }}>
          Loading
        </span>
      </div>

      <style>{`
        @keyframes splashGradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes splashLogoIn {
          0%   { opacity: 0; transform: scale(0.85) translateY(30px); filter: blur(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0px); }
        }
        @keyframes splashPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%      { opacity: 1; transform: scale(1.15); }
        }
        @keyframes splashLoader {
          0%   { width: 0%; }
          40%  { width: 70%; }
          100% { width: 100%; }
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes ringScale {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1.2); opacity: 0; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

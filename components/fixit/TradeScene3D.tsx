'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import type { TradeKey } from './FixItScene';

/* ─────────────────────────────────────────────────────────────────────────────
   Realistic 3D repair scenes, one per trade. Every scene runs the same 6s loop
   as the job card: the work happens over the first 55%, then it's fixed.
   Lighting is a soft studio + window setup so chrome, glass and paint read real.
   ───────────────────────────────────────────────────────────────────────────── */

const CYCLE = 6;
const WORK = 0.55;
const ORANGE = '#FC7508';
const NAVY = '#152E4B';

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (v: number) => {
  const x = clamp01(v);
  return x * x * (3 - 2 * x);
};

/** Seconds since this scene mounted, folded into the 6s cycle (0..1). */
function useCycle() {
  const start = useRef<number | null>(null);
  return (clock: THREE.Clock) => {
    if (start.current === null) start.current = clock.elapsedTime;
    return ((clock.elapsedTime - start.current) % CYCLE) / CYCLE;
  };
}

/* ── Procedural textures ─────────────────────────────────────────────────── */

function canvasTexture(size: number, draw: (ctx: CanvasRenderingContext2D, s: number) => void, repeat = 1, color = true) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  draw(c.getContext('2d')!, size);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeat, repeat);
  t.anisotropy = 8;
  if (color) t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

function usePlaster() {
  return useMemo(
    () =>
      canvasTexture(
        256,
        (ctx, s) => {
          const r = rng(3);
          const img = ctx.createImageData(s, s);
          for (let i = 0; i < s * s; i++) {
            const v = 120 + r() * 60;
            img.data.set([v, v, v, 255], i * 4);
          }
          ctx.putImageData(img, 0, 0);
          ctx.filter = 'blur(1px)';
          ctx.drawImage(ctx.canvas, 0, 0);
        },
        6,
        false,
      ),
    [],
  );
}

function useWood(tone: [number, number, number] = [176, 132, 92], planks = 6, repeat = 2) {
  return useMemo(
    () =>
      canvasTexture(
        512,
        (ctx, s) => {
          const r = rng(11);
          const w = s / planks;
          for (let p = 0; p < planks; p++) {
            const k = 0.86 + r() * 0.22;
            ctx.fillStyle = `rgb(${tone[0] * k},${tone[1] * k},${tone[2] * k})`;
            ctx.fillRect(p * w, 0, w, s);
            // grain
            for (let g = 0; g < 26; g++) {
              const x0 = p * w + r() * w;
              ctx.strokeStyle = `rgba(60,35,15,${0.05 + r() * 0.09})`;
              ctx.lineWidth = 0.6 + r() * 1.6;
              ctx.beginPath();
              for (let y = 0; y <= s; y += 8) ctx.lineTo(x0 + Math.sin(y / (30 + r() * 20) + g) * 3, y);
              ctx.stroke();
            }
            ctx.fillStyle = 'rgba(40,25,10,0.35)';
            ctx.fillRect(p * w, 0, 1.5, s);
            // board ends
            const end = r() * s;
            ctx.fillRect(p * w, end, w, 1.5);
          }
        },
        repeat,
      ),
    [tone, planks, repeat],
  );
}

function useStone() {
  return useMemo(
    () =>
      canvasTexture(
        512,
        (ctx, s) => {
          const r = rng(5);
          ctx.fillStyle = '#E9E4DC';
          ctx.fillRect(0, 0, s, s);
          for (let i = 0; i < 9000; i++) {
            const v = r();
            ctx.fillStyle = v < 0.6 ? `rgba(120,110,100,${r() * 0.25})` : `rgba(255,255,255,${r() * 0.5})`;
            ctx.fillRect(r() * s, r() * s, 1 + r() * 2, 1 + r() * 2);
          }
          ctx.strokeStyle = 'rgba(150,140,130,0.25)';
          for (let v = 0; v < 5; v++) {
            ctx.beginPath();
            let x = r() * s;
            for (let y = 0; y < s; y += 12) ctx.lineTo((x += (r() - 0.5) * 14), y);
            ctx.stroke();
          }
        },
        1,
      ),
    [],
  );
}

/* ── Shared set pieces ───────────────────────────────────────────────────── */

function Room({ wall = true }: { wall?: boolean }) {
  const plaster = usePlaster();
  const wood = useWood([170, 128, 88], 6, 3);
  return (
    <group>
      {wall && (
        <mesh position={[0, 2, 0]} receiveShadow>
          <planeGeometry args={[12, 4]} />
          <meshStandardMaterial color="#EFEAE2" roughness={0.95} bumpMap={plaster} bumpScale={0.6} />
        </mesh>
      )}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial map={wood} roughness={0.55} />
      </mesh>
      {/* skirting */}
      <mesh position={[0, 0.06, 0.012]} receiveShadow castShadow>
        <boxGeometry args={[12, 0.12, 0.024]} />
        <meshStandardMaterial color="#F7F4EE" roughness={0.5} />
      </mesh>
    </group>
  );
}

function Plant({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const leaves = useMemo(() => {
    const r = rng(21);
    return Array.from({ length: 9 }, (_, i) => ({ a: (i / 9) * Math.PI * 2 + r(), tilt: 0.35 + r() * 0.5, len: 0.32 + r() * 0.22 }));
  }, []);
  const leafGeo = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.quadraticCurveTo(0.06, 0.25, 0, 0.5);
    s.quadraticCurveTo(-0.06, 0.25, 0, 0);
    return new THREE.ShapeGeometry(s, 8);
  }, []);
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.13, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.15, 0.11, 0.26, 40]} />
        <meshStandardMaterial color="#D9CDBB" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.255, 0]}>
        <cylinderGeometry args={[0.135, 0.135, 0.01, 40]} />
        <meshStandardMaterial color="#4A3626" roughness={1} />
      </mesh>
      {leaves.map((l, i) => (
        <mesh key={i} geometry={leafGeo} position={[0, 0.26, 0]} rotation={new THREE.Euler(l.tilt, l.a, 0, 'YXZ')} scale={[1, l.len * 2, 1]} castShadow>
          <meshStandardMaterial color={i % 2 ? '#5F8A55' : '#6E9A60'} roughness={0.6} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

const chrome = { color: '#F2F2F2', metalness: 1, roughness: 0.1 } as const;
const steel = { color: '#C9CCCF', metalness: 1, roughness: 0.32 } as const;

/* ── Plumbing: a dripping tap gets tightened ─────────────────────────────── */

function Plumbing() {
  const stone = useStone();
  const cycle = useCycle();
  const wrench = useRef<THREE.Group>(null);
  const drops = useRef<THREE.Mesh[]>([]);
  const puddle = useRef<THREE.Mesh>(null);

  const spout = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0.32, 0),
      new THREE.Vector3(0.02, 0.42, 0.06),
      new THREE.Vector3(0, 0.44, 0.17),
      new THREE.Vector3(0, 0.36, 0.26),
    ]);
    return new THREE.TubeGeometry(curve, 64, 0.022, 24, false);
  }, []);

  useFrame(({ clock }) => {
    const t = cycle(clock);
    const working = t < WORK;
    if (wrench.current) {
      const visible = t < WORK + 0.04;
      wrench.current.visible = visible;
      wrench.current.rotation.y = working ? Math.sin(t * 28) * 0.7 - 0.2 : -0.2;
      wrench.current.position.y = 0.06 + (working ? 0 : (t - WORK) * 2);
    }
    drops.current.forEach((d, i) => {
      if (!d) return;
      const phase = ((clock.elapsedTime * 1.4 + i / 3) % 1) as number;
      const show = t < WORK - 0.05 + (i * 0.02);
      d.visible = show;
      d.position.y = 0.34 - phase * phase * 0.5;
      d.scale.setScalar(show ? 0.8 + 0.3 * Math.sin(phase * 3) : 0);
    });
    if (puddle.current) {
      const m = puddle.current.material as THREE.MeshPhysicalMaterial;
      m.opacity = 0.55 * (1 - smooth((t - WORK) / 0.2));
    }
  });

  return (
    <group>
      <Room />
      {/* cabinet */}
      <RoundedBox args={[2.6, 0.86, 0.62]} radius={0.015} position={[0, 0.43, 0.31]} castShadow receiveShadow>
        <meshStandardMaterial color="#F4F1EC" roughness={0.45} />
      </RoundedBox>
      {[-0.65, 0, 0.65].map((x) => (
        <group key={x}>
          <mesh position={[x, 0.45, 0.622]}>
            <boxGeometry args={[0.005, 0.8, 0.002]} />
            <meshStandardMaterial color="#D8D2C8" />
          </mesh>
          <mesh position={[x + 0.3, 0.72, 0.64]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.008, 0.008, 0.16, 16]} />
            <meshStandardMaterial {...steel} />
          </mesh>
        </group>
      ))}
      {/* stone top around a sink opening */}
      {[
        [-0.82, 0.96, 0.33, 0.96, 0.66],
        [0.82, 0.96, 0.33, 0.96, 0.66],
        [0, 0.96, 0.05, 0.68, 0.1],
        [0, 0.96, 0.6, 0.68, 0.12],
      ].map(([x, y, z, w, d], i) => (
        <mesh key={i} position={[x, y, z]} castShadow receiveShadow>
          <boxGeometry args={[w, 0.05, d]} />
          <meshStandardMaterial map={stone} roughness={0.25} />
        </mesh>
      ))}
      {/* steel basin */}
      <group position={[0, 0.98, 0.33]}>
        {[
          [0, -0.2, 0, 0.68, 0.01, 0.44],
          [0, -0.1, -0.22, 0.68, 0.2, 0.01],
          [0, -0.1, 0.22, 0.68, 0.2, 0.01],
          [-0.34, -0.1, 0, 0.01, 0.2, 0.44],
          [0.34, -0.1, 0, 0.01, 0.2, 0.44],
        ].map(([x, y, z, w, h, d], i) => (
          <mesh key={i} position={[x, y, z]} receiveShadow>
            <boxGeometry args={[w, h, d]} />
            <meshStandardMaterial color="#DADDE0" metalness={0.75} roughness={0.28} side={THREE.DoubleSide} />
          </mesh>
        ))}
        <mesh position={[0, -0.194, 0.05]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.03, 32]} />
          <meshStandardMaterial color="#555" metalness={1} roughness={0.3} />
        </mesh>
        <mesh ref={puddle} position={[0, -0.193, 0.05]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.12, 48]} />
          <meshPhysicalMaterial color="#BFD9EA" roughness={0.02} clearcoat={1} transparent opacity={0.55} />
        </mesh>
      </group>
      {/* tap */}
      <group position={[0, 0.985, 0.08]}>
        <mesh position={[0, 0.02, 0]} castShadow>
          <cylinderGeometry args={[0.045, 0.05, 0.04, 40]} />
          <meshStandardMaterial {...chrome} />
        </mesh>
        <mesh geometry={spout} castShadow>
          <meshStandardMaterial {...chrome} />
        </mesh>
        <mesh position={[0, 0.355, 0.262]} castShadow>
          <cylinderGeometry args={[0.026, 0.024, 0.03, 32]} />
          <meshStandardMaterial {...chrome} />
        </mesh>
        <group position={[0.05, 0.2, 0]} rotation={[0, 0, -0.5]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.012, 0.012, 0.14, 20]} />
            <meshStandardMaterial {...chrome} />
          </mesh>
        </group>
        {/* drips */}
        {[0, 1, 2].map((i) => (
          <mesh key={i} ref={(m) => { if (m) drops.current[i] = m; }} position={[0, 0.3, 0.262]} castShadow>
            <sphereGeometry args={[0.011, 20, 20]} />
            <meshPhysicalMaterial color="#D8ECF8" roughness={0} clearcoat={1} transparent opacity={0.85} />
          </mesh>
        ))}
        {/* wrench turning the nut */}
        <group ref={wrench} position={[0, 0.06, 0]}>
          <mesh position={[0, 0, 0]}>
            <torusGeometry args={[0.05, 0.012, 12, 32, Math.PI * 1.4]} />
            <meshStandardMaterial {...steel} />
          </mesh>
          <RoundedBox args={[0.34, 0.03, 0.022]} radius={0.01} position={[0.22, 0, 0]} castShadow>
            <meshStandardMaterial color="#2B2F36" metalness={0.6} roughness={0.35} />
          </RoundedBox>
          <RoundedBox args={[0.14, 0.036, 0.026]} radius={0.012} position={[0.32, 0, 0]} castShadow>
            <meshStandardMaterial color={ORANGE} roughness={0.5} />
          </RoundedBox>
        </group>
      </group>
      <Plant position={[1.05, 0.985, 0.25]} scale={0.7} />
      {/* soap + towel for scale */}
      <RoundedBox args={[0.08, 0.16, 0.08]} radius={0.02} position={[-0.95, 1.065, 0.2]} castShadow>
        <meshPhysicalMaterial color="#E7D6C2" roughness={0.15} clearcoat={0.6} />
      </RoundedBox>
      <mesh position={[-0.95, 1.16, 0.2]} castShadow>
        <cylinderGeometry args={[0.012, 0.012, 0.05, 16]} />
        <meshStandardMaterial color="#222" />
      </mesh>
    </group>
  );
}

/* ── Electrical: a filament bulb is screwed in and lights the room ───────── */

function Electrical() {
  const cycle = useCycle();
  const walnut = useWood([150, 104, 66], 3, 1);
  const bulb = useRef<THREE.Group>(null);
  const filament = useRef<THREE.MeshStandardMaterial>(null);
  const light = useRef<THREE.PointLight>(null);
  const glow = useRef<THREE.Mesh>(null);
  const halo = useRef<THREE.Mesh>(null);
  const haloTex = useMemo(
    () =>
      canvasTexture(128, (c, s) => {
        const g = c.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
        g.addColorStop(0, 'rgba(255,220,160,1)');
        g.addColorStop(0.3, 'rgba(255,190,110,0.45)');
        g.addColorStop(1, 'rgba(255,180,90,0)');
        c.fillStyle = g;
        c.fillRect(0, 0, s, s);
      }),
    [],
  );

  const shadeOuter = useMemo(() => {
    const pts = [
      [0.035, 0.32],
      [0.06, 0.3],
      [0.1, 0.24],
      [0.17, 0.14],
      [0.25, 0.03],
      [0.27, 0],
    ].reverse().map(([x, y]) => new THREE.Vector2(x, y));
    return new THREE.LatheGeometry(pts, 64);
  }, []);

  useFrame(({ clock }) => {
    const t = cycle(clock);
    const screw = smooth(t / (WORK - 0.1));
    if (bulb.current) {
      bulb.current.position.y = -0.06 * (1 - screw);
      bulb.current.rotation.y = screw * Math.PI * 6;
    }
    let power = 0;
    if (t > WORK - 0.14 && t < WORK) power = Math.random() > 0.55 ? 0.25 + Math.random() * 0.6 : 0.02;
    if (t >= WORK) power = smooth((t - WORK) / 0.06);
    if (t > 0.97) power *= 1 - (t - 0.97) / 0.03;
    if (filament.current) filament.current.emissiveIntensity = 0.2 + power * 9;
    if (light.current) light.current.intensity = power * 5;
    if (glow.current) (glow.current.material as THREE.MeshBasicMaterial).opacity = power * 0.025;
    if (halo.current) (halo.current.material as THREE.MeshBasicMaterial).opacity = power * 0.7;
  });

  return (
    <group>
      <Room />
      {/* sideboard */}
      <RoundedBox args={[1.9, 0.7, 0.45]} radius={0.02} position={[0, 0.35, 0.24]} castShadow receiveShadow>
        <meshStandardMaterial map={walnut} roughness={0.5} />
      </RoundedBox>
      <Plant position={[-0.6, 0.7, 0.24]} scale={0.8} />
      {[0, 1, 2].map((i) => (
        <RoundedBox key={i} args={[0.05, 0.26 - i * 0.03, 0.2]} radius={0.006} position={[0.35 + i * 0.055, 0.83 - i * 0.015, 0.22]} castShadow>
          <meshStandardMaterial color={[NAVY, ORANGE, '#7C8B74'][i]} roughness={0.7} />
        </RoundedBox>
      ))}
      {/* pendant */}
      <group position={[0, 2.08, 0.62]}>
        <mesh position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.004, 0.004, 1.4, 8]} />
          <meshStandardMaterial color="#111" roughness={0.6} />
        </mesh>
        <mesh geometry={shadeOuter} castShadow>
          <meshStandardMaterial color={NAVY} metalness={0.4} roughness={0.35} side={THREE.FrontSide} />
        </mesh>
        <mesh geometry={shadeOuter} scale={0.985}>
          <meshStandardMaterial color="#F3EFE7" roughness={0.6} side={THREE.BackSide} />
        </mesh>
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.07, 24]} />
          <meshStandardMaterial color="#222" roughness={0.5} />
        </mesh>
        <group ref={bulb} position={[0, 0, 0]}>
          <mesh position={[0, -0.03, 0]}>
            <cylinderGeometry args={[0.018, 0.016, 0.04, 24]} />
            <meshStandardMaterial {...steel} />
          </mesh>
          <mesh position={[0, -0.1, 0]}>
            <sphereGeometry args={[0.06, 40, 40]} />
            <meshPhysicalMaterial color="#FFF8EC" roughness={0.02} transparent opacity={0.6} />
          </mesh>
          <mesh position={[0, -0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.022, 0.0025, 8, 32]} />
            <meshStandardMaterial ref={filament} color="#FFB04D" emissive="#FF9A2E" emissiveIntensity={0.2} toneMapped={false} />
          </mesh>
        </group>
        <mesh ref={halo} position={[0, -0.1, 0.05]}>
          <planeGeometry args={[0.45, 0.45]} />
          <meshBasicMaterial map={haloTex} transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
        </mesh>
        <pointLight ref={light} position={[0, -0.12, 0.02]} color="#FFC37A" intensity={0} distance={4} decay={1.6} />
        <mesh ref={glow} position={[0, -0.9, 0]}>
          <coneGeometry args={[0.85, 1.7, 48, 1, true]} />
          <meshBasicMaterial color="#FFD9A0" transparent opacity={0} depthWrite={false} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>
    </group>
  );
}

/* ── Column-sweep helper: paint roller / squeegee passes ─────────────────── */

function sweep(p: number, cols: number, down: boolean) {
  const span = p * cols;
  const col = Math.min(cols - 1, Math.floor(span));
  const f = span - col;
  if (down) {
    // pull down while touching the glass, then lift away and go back up
    const touching = f < 0.72;
    const y = touching ? 1 - f / 0.72 : (f - 0.72) / 0.28;
    return { col, x: (col + 0.5) / cols, y, touching };
  }
  const y = col % 2 === 0 ? f : 1 - f;
  return { col, x: (col + 0.5) / cols, y, touching: true };
}

/* ── Cleaning: a squeegee pulls the grime off a window ───────────────────── */

function Cleaning() {
  const cycle = useCycle();
  const squeegee = useRef<THREE.Group>(null);
  const glint = useRef<THREE.Mesh>(null);
  const W = 1.6, H = 1.5, X0 = 0, Y0 = 1.65;

  const { dirt, ctx, reset } = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 480;
    const ctx = c.getContext('2d')!;
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    const reset = () => {
      const r = rng(9);
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.fillStyle = 'rgba(150,135,110,0.28)';
      ctx.fillRect(0, 0, c.width, c.height);
      for (let i = 0; i < 40; i++) {
        const x = r() * c.width, y = r() * c.height, rad = 20 + r() * 70;
        const g = ctx.createRadialGradient(x, y, 0, x, y, rad);
        g.addColorStop(0, `rgba(120,105,85,${0.25 + r() * 0.3})`);
        g.addColorStop(1, 'rgba(120,105,85,0)');
        ctx.fillStyle = g;
        ctx.fillRect(x - rad, y - rad, rad * 2, rad * 2);
      }
      for (let i = 0; i < 260; i++) {
        ctx.fillStyle = `rgba(110,95,75,${0.2 + r() * 0.4})`;
        ctx.beginPath();
        ctx.ellipse(r() * c.width, r() * c.height, 1 + r() * 3, 2 + r() * 5, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      tex.needsUpdate = true;
    };
    reset();
    return { dirt: tex, ctx, reset };
  }, []);

  const view = useMemo(
    () =>
      canvasTexture(
        512,
        (ctx, s) => {
          const g = ctx.createLinearGradient(0, 0, 0, s);
          g.addColorStop(0, '#9FC3DD');
          g.addColorStop(0.55, '#DDE9EE');
          g.addColorStop(1, '#C9D7C0');
          ctx.fillStyle = g;
          ctx.fillRect(0, 0, s, s);
          ctx.filter = 'blur(14px)';
          const r = rng(4);
          for (let i = 0; i < 14; i++) {
            ctx.fillStyle = ['#6F9466', '#83A578', '#5C7F55'][i % 3];
            ctx.beginPath();
            ctx.arc(r() * s, s * (0.62 + r() * 0.3), 50 + r() * 70, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.fillStyle = '#C8C1B6';
          ctx.fillRect(s * 0.62, s * 0.4, s * 0.22, s * 0.4);
        },
        1,
      ),
    [],
  );

  const last = useRef<number | null>(null);
  const prevT = useRef(0);

  useFrame(({ clock }) => {
    const t = cycle(clock);
    if (t < prevT.current) {
      reset();
      last.current = null;
    }
    prevT.current = t;
    const p = clamp01(t / WORK);
    const s = sweep(p, 4, true);
    const px = X0 - W / 2 + s.x * W;
    const py = Y0 - H / 2 + 0.08 + s.y * (H - 0.16);
    if (squeegee.current) {
      squeegee.current.visible = t < WORK + 0.06;
      squeegee.current.position.set(px, py + 0.02, s.touching ? 0.035 : 0.12);
      squeegee.current.rotation.x = s.touching ? -0.35 : -0.1;
    }
    if (s.touching && t < WORK) {
      const cx = ((px - (X0 - W / 2)) / W) * 512;
      const cy = (1 - (py - (Y0 - H / 2)) / H) * 480;
      const from = last.current ?? cy;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0,0,0,1)';
      const half = 512 / 4 / 2 + 6;
      ctx.fillRect(cx - half, Math.min(from, cy) - 8, half * 2, Math.abs(from - cy) + 16);
      dirt.needsUpdate = true;
      last.current = cy;
    } else {
      last.current = null;
    }
    if (glint.current) {
      const g = clamp01((t - WORK - 0.02) / 0.2);
      glint.current.position.x = X0 - W / 2 + 0.05 + g * (W - 0.1);
      (glint.current.material as THREE.MeshBasicMaterial).opacity = g > 0 && g < 1 ? 0.35 * Math.sin(g * Math.PI) : 0;
    }
  });

  const hole = { l: X0 - W / 2, r: X0 + W / 2, b: Y0 - H / 2, t: Y0 + H / 2 };
  const plaster = usePlaster();
  const wallMat = <meshStandardMaterial color="#EFEAE2" roughness={0.95} bumpMap={plaster} bumpScale={0.6} />;

  return (
    <group>
      <Room wall={false} />
      {/* wall with an opening */}
      <mesh position={[(hole.l - 6) / 2, 2, 0]} receiveShadow>
        <planeGeometry args={[hole.l + 6, 4]} />
        {wallMat}
      </mesh>
      <mesh position={[(hole.r + 6) / 2, 2, 0]} receiveShadow>
        <planeGeometry args={[6 - hole.r, 4]} />
        {wallMat}
      </mesh>
      <mesh position={[X0, (hole.t + 4) / 2, 0]} receiveShadow>
        <planeGeometry args={[W, 4 - hole.t]} />
        {wallMat}
      </mesh>
      <mesh position={[X0, hole.b / 2, 0]} receiveShadow>
        <planeGeometry args={[W, hole.b]} />
        {wallMat}
      </mesh>
      {/* outside */}
      <mesh position={[X0, Y0, -0.9]}>
        <planeGeometry args={[W * 2.2, H * 2.2]} />
        <meshBasicMaterial map={view} toneMapped={false} />
      </mesh>
      <pointLight position={[X0, Y0, -0.4]} intensity={3} color="#FFF4E0" distance={4} />
      {/* frame */}
      {[
        [X0, hole.t + 0.04, 0.03, W + 0.16, 0.08, 0.1],
        [X0, hole.b - 0.04, 0.05, W + 0.24, 0.08, 0.16],
        [hole.l - 0.04, Y0, 0.03, 0.08, H + 0.16, 0.1],
        [hole.r + 0.04, Y0, 0.03, 0.08, H + 0.16, 0.1],
        [X0, Y0, 0.0, 0.05, H, 0.06],
        [X0, Y0, 0.0, W, 0.05, 0.06],
      ].map(([x, y, z, w, h, d], i) => (
        <RoundedBox key={i} args={[w, h, d]} radius={0.01} position={[x, y, z]} castShadow receiveShadow>
          <meshStandardMaterial color="#FAF8F4" roughness={0.35} />
        </RoundedBox>
      ))}
      {/* glass + dirt */}
      <mesh position={[X0, Y0, -0.01]}>
        <planeGeometry args={[W, H]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.02} metalness={0} transparent opacity={0.12} clearcoat={1} />
      </mesh>
      <mesh position={[X0, Y0, 0.005]}>
        <planeGeometry args={[W, H]} />
        <meshStandardMaterial map={dirt} transparent roughness={0.9} depthWrite={false} />
      </mesh>
      <mesh ref={glint} position={[X0, Y0, 0.012]}>
        <planeGeometry args={[0.1, H]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* squeegee */}
      <group ref={squeegee}>
        <RoundedBox args={[W / 4 * 1.05, 0.03, 0.03]} radius={0.01} castShadow>
          <meshStandardMaterial {...steel} />
        </RoundedBox>
        <mesh position={[0, -0.02, 0]}>
          <boxGeometry args={[W / 4 * 1.05, 0.012, 0.008]} />
          <meshStandardMaterial color="#1A1A1A" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.12, 0.06]} rotation={[0.45, 0, 0]} castShadow>
          <cylinderGeometry args={[0.018, 0.02, 0.26, 20]} />
          <meshStandardMaterial color={ORANGE} roughness={0.45} />
        </mesh>
      </group>
      {/* bucket + spray on the sill */}
      <group position={[-1.3, 0, 0.6]}>
        <mesh position={[0, 0.17, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.2, 0.16, 0.34, 48, 1, true]} />
          <meshStandardMaterial color="#4E7398" roughness={0.4} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0.29, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.19, 48]} />
          <meshPhysicalMaterial color="#E9F2F5" roughness={0.1} clearcoat={1} />
        </mesh>
        {[[-0.06, 0.04], [0.05, -0.05], [0.02, 0.07]].map(([x, z], i) => (
          <mesh key={i} position={[x, 0.3, z]} castShadow>
            <sphereGeometry args={[0.035, 20, 20]} />
            <meshPhysicalMaterial color="#ffffff" roughness={0.05} transparent opacity={0.8} />
          </mesh>
        ))}
      </group>
      <group position={[0.62, hole.b + 0.0, 0.08]}>
        <RoundedBox args={[0.08, 0.2, 0.06]} radius={0.02} position={[0, 0.1, 0]} castShadow>
          <meshPhysicalMaterial color="#DDEAF0" roughness={0.1} transparent opacity={0.9} />
        </RoundedBox>
        <RoundedBox args={[0.04, 0.06, 0.08]} radius={0.01} position={[0, 0.23, 0.01]} castShadow>
          <meshStandardMaterial color={NAVY} roughness={0.5} />
        </RoundedBox>
      </group>
      <Plant position={[1.5, 0, 0.45]} scale={1.2} />
    </group>
  );
}

/* ── Painting: a roller lays a fresh coat on the wall ────────────────────── */

function Painting() {
  const cycle = useCycle();
  const roller = useRef<THREE.Group>(null);
  const drum = useRef<THREE.Mesh>(null);
  const W = 2.4, H = 2.3, X0 = 0, Y0 = 1.35, COLS = 5;
  const COLOR = '#B9C7AE';

  const { paint, ctx, reset } = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 600;
    c.height = 575;
    const ctx = c.getContext('2d')!;
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    const reset = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      tex.needsUpdate = true;
    };
    return { paint: tex, ctx, reset };
  }, []);

  const nap = useMemo(
    () =>
      canvasTexture(
        128,
        (c, s) => {
          const r = rng(2);
          c.fillStyle = COLOR;
          c.fillRect(0, 0, s, s);
          for (let i = 0; i < 1400; i++) {
            c.fillStyle = `rgba(${r() > 0.5 ? '255,255,255' : '60,70,50'},${r() * 0.18})`;
            c.fillRect(r() * s, r() * s, 1, 3);
          }
        },
        2,
      ),
    [],
  );

  const prevT = useRef(0);
  const last = useRef<number | null>(null);

  useFrame(({ clock }) => {
    const t = cycle(clock);
    if (t < prevT.current) {
      reset();
      last.current = null;
    }
    prevT.current = t;
    const p = clamp01(t / WORK);
    const s = sweep(p, COLS, false);
    const px = X0 - W / 2 + s.x * W;
    const py = Y0 - H / 2 + 0.12 + s.y * (H - 0.24);
    if (roller.current) {
      roller.current.visible = t < WORK + 0.08;
      roller.current.position.set(px, py, 0.06);
    }
    if (drum.current) drum.current.rotation.x = py * 12;
    if (t < WORK) {
      const cx = ((px - (X0 - W / 2)) / W) * 600;
      const cy = (1 - (py - (Y0 - H / 2)) / H) * 575;
      const half = (600 / COLS) * 0.53;
      const from = last.current ?? cy;
      const y0 = Math.min(from, cy), y1 = Math.max(from, cy);
      ctx.fillStyle = COLOR;
      ctx.fillRect(cx - half, y0 - 14, half * 2, y1 - y0 + 28);
      // roller texture: fine vertical streaks
      for (let i = 0; i < 6; i++) {
        ctx.fillStyle = `rgba(${Math.random() > 0.5 ? '255,255,255' : '70,80,60'},0.05)`;
        ctx.fillRect(cx - half + Math.random() * half * 2, y0 - 14, 2, y1 - y0 + 28);
      }
      paint.needsUpdate = true;
      last.current = cy;
    }
  });

  const wire = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.23, 0, 0),
      new THREE.Vector3(-0.27, 0, 0.02),
      new THREE.Vector3(-0.27, -0.12, 0.08),
      new THREE.Vector3(0, -0.22, 0.12),
      new THREE.Vector3(0, -0.3, 0.14),
    ]);
    return new THREE.TubeGeometry(curve, 40, 0.007, 10, false);
  }, []);

  return (
    <group>
      <Room />
      {/* masking tape border */}
      {[
        [X0, Y0 + H / 2 + 0.02, W + 0.08, 0.04],
        [X0 - W / 2 - 0.02, Y0, 0.04, H + 0.08],
        [X0 + W / 2 + 0.02, Y0, 0.04, H + 0.08],
      ].map(([x, y, w, h], i) => (
        <mesh key={i} position={[x, y, 0.003]}>
          <planeGeometry args={[w, h]} />
          <meshStandardMaterial color="#3B6EA8" roughness={0.7} />
        </mesh>
      ))}
      <mesh position={[X0, Y0, 0.004]}>
        <planeGeometry args={[W, H]} />
        <meshStandardMaterial map={paint} transparent roughness={0.75} depthWrite={false} />
      </mesh>
      {/* roller */}
      <group ref={roller}>
        <mesh ref={drum} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.045, 0.045, 0.46, 40]} />
          <meshStandardMaterial map={nap} roughness={1} />
        </mesh>
        <mesh geometry={wire} castShadow>
          <meshStandardMaterial {...steel} />
        </mesh>
        <mesh position={[0, -0.45, 0.16]} castShadow>
          <cylinderGeometry args={[0.02, 0.018, 0.32, 20]} />
          <meshStandardMaterial color={ORANGE} roughness={0.45} />
        </mesh>
      </group>
      {/* tray + tin + drop sheet */}
      <mesh position={[0.3, 0.002, 0.8]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[3, 1.2]} />
        <meshStandardMaterial color="#EEE9E0" roughness={1} />
      </mesh>
      <group position={[-0.9, 0.03, 0.8]} rotation={[0, 0.4, 0]}>
        <RoundedBox args={[0.36, 0.05, 0.42]} radius={0.015} castShadow receiveShadow>
          <meshStandardMaterial {...steel} roughness={0.45} />
        </RoundedBox>
        <mesh position={[0, 0.027, 0.06]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.3, 0.24]} />
          <meshStandardMaterial color={COLOR} roughness={0.25} />
        </mesh>
      </group>
      <group position={[1.2, 0, 0.7]}>
        <mesh position={[0, 0.13, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.26, 48]} />
          <meshStandardMaterial {...steel} />
        </mesh>
        <mesh position={[0, 0.13, 0]}>
          <cylinderGeometry args={[0.1205, 0.1205, 0.14, 48]} />
          <meshStandardMaterial color={COLOR} roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
}

/* ── AC: filter cleaned, panel closed, cool air flows ────────────────────── */

function AirCon() {
  const cycle = useCycle();
  const panel = useRef<THREE.Group>(null);
  const filter = useRef<THREE.Group>(null);
  const dust = useRef<THREE.MeshStandardMaterial>(null);
  const flap = useRef<THREE.Group>(null);
  const led = useRef<THREE.MeshStandardMaterial>(null);
  const air = useRef<THREE.InstancedMesh>(null);
  const COUNT = 70;
  const seeds = useMemo(() => Array.from({ length: COUNT }, (_, i) => ({ x: (i / COUNT - 0.5) * 1.2 + (Math.random() - 0.5) * 0.05, o: Math.random(), s: 0.6 + Math.random() * 0.6 })), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const mesh = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const x = c.getContext('2d')!;
    x.fillStyle = '#E8E6E0';
    x.fillRect(0, 0, 128, 128);
    x.strokeStyle = '#B9B5AC';
    for (let i = 0; i < 128; i += 6) {
      x.beginPath(); x.moveTo(i, 0); x.lineTo(i, 128); x.stroke();
      x.beginPath(); x.moveTo(0, i); x.lineTo(128, i); x.stroke();
    }
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(6, 2);
    return t;
  }, []);

  useFrame(({ clock }) => {
    const t = cycle(clock);
    const open = smooth(t / 0.1) * (1 - smooth((t - 0.45) / 0.08));
    const slide = smooth((t - 0.1) / 0.08) * (1 - smooth((t - 0.36) / 0.08));
    if (panel.current) panel.current.rotation.x = -open * 1.1;
    if (filter.current) filter.current.position.z = 0.19 + slide * 0.32;
    if (dust.current) dust.current.opacity = 0.75 * (1 - smooth((t - 0.2) / 0.14));
    const flow = smooth((t - WORK) / 0.08) * (t > 0.96 ? 1 - (t - 0.96) / 0.04 : 1);
    if (flap.current) flap.current.rotation.x = 0.15 + flow * 0.75;
    if (led.current) {
      led.current.color.set(t >= WORK ? '#3FBF6A' : '#E5484D');
      led.current.emissive.set(t >= WORK ? '#3FBF6A' : '#E5484D');
    }
    if (air.current) {
      seeds.forEach((s, i) => {
        const k = (clock.elapsedTime * 0.45 * s.s + s.o) % 1;
        dummy.position.set(s.x * (1 + k * 0.4), 2.12 - k * 1.3, 0.38 + k * 0.9);
        dummy.rotation.set(0.9, 0, 0);
        const sc = flow * Math.sin(k * Math.PI);
        dummy.scale.set(sc, sc * (1.6 + k), sc);
        dummy.updateMatrix();
        air.current!.setMatrixAt(i, dummy.matrix);
      });
      air.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group>
      <Room />
      <group position={[0, 2.35, 0]}>
        {/* body */}
        <RoundedBox args={[1.5, 0.42, 0.3]} radius={0.06} smoothness={6} position={[0, 0, 0.15]} castShadow receiveShadow>
          <meshPhysicalMaterial color="#FBFAF7" roughness={0.3} clearcoat={0.4} />
        </RoundedBox>
        {/* front panel, hinged at the top */}
        <group ref={panel} position={[0, 0.2, 0.31]}>
          <RoundedBox args={[1.48, 0.3, 0.025]} radius={0.012} position={[0, -0.15, 0]} castShadow>
            <meshPhysicalMaterial color="#FFFFFF" roughness={0.18} clearcoat={0.8} />
          </RoundedBox>
          <mesh position={[0.55, -0.24, 0.014]}>
            <sphereGeometry args={[0.008, 16, 16]} />
            <meshStandardMaterial ref={led} color="#E5484D" emissive="#E5484D" emissiveIntensity={2} />
          </mesh>
          <mesh position={[-0.52, -0.08, 0.014]}>
            <planeGeometry args={[0.16, 0.025]} />
            <meshStandardMaterial color="#C8C3BA" />
          </mesh>
        </group>
        {/* filter */}
        <group ref={filter} position={[0, -0.02, 0.19]}>
          <mesh>
            <boxGeometry args={[1.2, 0.26, 0.01]} />
            <meshStandardMaterial map={mesh} roughness={0.8} />
          </mesh>
          <mesh position={[0, 0, 0.006]}>
            <planeGeometry args={[1.2, 0.26]} />
            <meshStandardMaterial ref={dust} color="#8D8270" transparent opacity={0.75} roughness={1} />
          </mesh>
        </group>
        {/* outlet + flap */}
        <mesh position={[0, -0.2, 0.2]}>
          <boxGeometry args={[1.3, 0.03, 0.18]} />
          <meshStandardMaterial color="#2A2D33" roughness={0.8} />
        </mesh>
        <group ref={flap} position={[0, -0.2, 0.3]}>
          <RoundedBox args={[1.3, 0.012, 0.09]} radius={0.005} position={[0, 0, -0.045]} castShadow>
            <meshStandardMaterial color="#F2EFE9" roughness={0.35} />
          </RoundedBox>
        </group>
      </group>
      <instancedMesh ref={air} args={[undefined, undefined, COUNT]}>
        <capsuleGeometry args={[0.012, 0.16, 4, 8]} />
        <meshBasicMaterial color="#9ED0F2" transparent opacity={0.5} depthWrite={false} />
      </instancedMesh>
      {/* bed corner + plant for context */}
      <RoundedBox args={[1.6, 0.42, 1.2]} radius={0.06} position={[-0.6, 0.21, 0.9]} castShadow receiveShadow>
        <meshStandardMaterial color="#E9E2D6" roughness={0.9} />
      </RoundedBox>
      <RoundedBox args={[0.5, 0.12, 0.32]} radius={0.05} position={[-1.05, 0.48, 0.5]} castShadow>
        <meshStandardMaterial color="#F8F5EF" roughness={0.95} />
      </RoundedBox>
      <RoundedBox args={[1.6, 0.04, 0.6]} radius={0.02} position={[-0.6, 0.44, 1.18]} castShadow>
        <meshStandardMaterial color="#9DB0C4" roughness={0.95} />
      </RoundedBox>
      <Plant position={[1.25, 0, 0.5]} scale={1.3} />
    </group>
  );
}

/* ── Carpentry: a drill sets the bracket and the shelf levels out ────────── */

function Carpentry() {
  const cycle = useCycle();
  const shelf = useRef<THREE.Group>(null);
  const drill = useRef<THREE.Group>(null);
  const chuck = useRef<THREE.Group>(null);
  const bubble = useRef<THREE.Mesh>(null);
  const wood = useWood([186, 140, 96], 2, 1);

  useFrame(({ clock }) => {
    const t = cycle(clock);
    const level = smooth((t - 0.38) / 0.16);
    const tilt = 0.12 * (1 - level);
    if (shelf.current) shelf.current.rotation.z = -tilt;
    if (bubble.current) bubble.current.position.x = -0.03 + level * 0.03 - tilt * 0.25;
    if (drill.current) {
      const push = t < WORK ? 0.03 * Math.abs(Math.sin(t * 40)) : 0;
      drill.current.visible = t < WORK + 0.06;
      drill.current.position.z = 0.3 - push + (t > WORK ? (t - WORK) * 3 : 0);
    }
    if (chuck.current && t < WORK) chuck.current.rotation.z += 0.9;
  });

  return (
    <group>
      <Room />
      {/* shelf pivots on its left bracket */}
      <group ref={shelf} position={[-0.75, 1.45, 0]}>
        <group position={[0.75, 0, 0]}>
          <mesh position={[0, 0, 0.16]} castShadow receiveShadow>
            <boxGeometry args={[1.8, 0.045, 0.3]} />
            <meshStandardMaterial map={wood} roughness={0.5} />
          </mesh>
          {[-0.75, 0.75].map((x) => (
            <group key={x} position={[x, -0.022, 0.0]}>
              <mesh position={[0, -0.09, 0.02]} castShadow>
                <boxGeometry args={[0.03, 0.18, 0.03]} />
                <meshStandardMaterial color="#2B2F36" metalness={0.7} roughness={0.35} />
              </mesh>
              <mesh position={[0, 0, 0.1]} castShadow>
                <boxGeometry args={[0.03, 0.03, 0.2]} />
                <meshStandardMaterial color="#2B2F36" metalness={0.7} roughness={0.35} />
              </mesh>
              <mesh position={[0, -0.09, 0.08]} rotation={[0.82, 0, 0]} castShadow>
                <boxGeometry args={[0.026, 0.2, 0.02]} />
                <meshStandardMaterial color="#2B2F36" metalness={0.7} roughness={0.35} />
              </mesh>
            </group>
          ))}
          {/* books, vase and a spirit level */}
          {[
            [0.06, 0.28, NAVY],
            [0.045, 0.24, ORANGE],
            [0.05, 0.3, '#5E6B60'],
            [0.04, 0.22, '#D9CDBB'],
          ].map(([w, h, c], i) => (
            <RoundedBox key={i} args={[w as number, h as number, 0.2]} radius={0.004} position={[-0.7 + i * 0.058, 0.022 + (h as number) / 2, 0.15]} castShadow>
              <meshStandardMaterial color={c as string} roughness={0.75} />
            </RoundedBox>
          ))}
          <mesh position={[0.6, 0.13, 0.15]} castShadow>
            <latheGeometry args={[[0, 0.05, 0.07, 0.05, 0.03, 0.035].map((r, i) => new THREE.Vector2(r || 0.001, i * 0.045)), 48]} />
            <meshPhysicalMaterial color="#E7DFD2" roughness={0.25} clearcoat={0.6} />
          </mesh>
          <group position={[0.05, 0.045, 0.2]}>
            <RoundedBox args={[0.5, 0.045, 0.035]} radius={0.008} castShadow>
              <meshStandardMaterial color="#C9CCCF" metalness={0.9} roughness={0.35} />
            </RoundedBox>
            <RoundedBox args={[0.5, 0.045, 0.006]} radius={0.002} position={[0, 0, 0.018]}>
              <meshStandardMaterial color={ORANGE} roughness={0.5} />
            </RoundedBox>
            <mesh position={[0, 0, 0.022]} rotation={[0, 0, Math.PI / 2]}>
              <capsuleGeometry args={[0.011, 0.07, 6, 16]} />
              <meshPhysicalMaterial color="#C8F06A" roughness={0.05} transparent opacity={0.85} clearcoat={1} />
            </mesh>
            <mesh ref={bubble} position={[0, 0.003, 0.03]}>
              <sphereGeometry args={[0.007, 16, 16]} />
              <meshStandardMaterial color="#ffffff" roughness={0.1} />
            </mesh>
          </group>
        </group>
      </group>
      {/* drill at the right bracket */}
      <group ref={drill} position={[0.75, 1.36, 0.3]}>
        <group rotation={[0, -0.75, 0]}>
          <RoundedBox args={[0.09, 0.09, 0.24]} radius={0.035} position={[0, 0, 0.02]} castShadow>
            <meshStandardMaterial color={ORANGE} roughness={0.45} />
          </RoundedBox>
          <RoundedBox args={[0.07, 0.2, 0.07]} radius={0.03} position={[0, -0.13, 0.08]} rotation={[0.2, 0, 0]} castShadow>
            <meshStandardMaterial color="#1E2126" roughness={0.7} />
          </RoundedBox>
          <RoundedBox args={[0.11, 0.06, 0.13]} radius={0.02} position={[0, -0.25, 0.1]} castShadow>
            <meshStandardMaterial color="#1E2126" roughness={0.6} />
          </RoundedBox>
          <group ref={chuck} position={[0, 0, -0.13]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.025, 0.03, 0.06, 6]} />
              <meshStandardMaterial {...chrome} />
            </mesh>
            <mesh position={[0, 0, -0.09]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.004, 0.004, 0.12, 8]} />
              <meshStandardMaterial {...steel} />
            </mesh>
          </group>
        </group>
      </group>
      <Plant position={[-1.6, 0, 0.5]} scale={1.3} />
      {/* toolbox */}
      <group position={[1.4, 0, 0.75]} rotation={[0, -0.4, 0]}>
        <RoundedBox args={[0.5, 0.24, 0.26]} radius={0.02} position={[0, 0.12, 0]} castShadow receiveShadow>
          <meshStandardMaterial color={ORANGE} roughness={0.5} />
        </RoundedBox>
        <RoundedBox args={[0.5, 0.06, 0.26]} radius={0.02} position={[0, 0.25, 0]} castShadow>
          <meshStandardMaterial color="#1E2126" roughness={0.6} />
        </RoundedBox>
        <mesh position={[0, 0.32, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.05, 0.012, 10, 24, Math.PI]} />
          <meshStandardMaterial color="#1E2126" />
        </mesh>
      </group>
    </group>
  );
}

/* ── Camera + stage ──────────────────────────────────────────────────────── */

const shots: Record<TradeKey, { pos: [number, number, number]; target: [number, number, number] }> = {
  plumbing: { pos: [0.55, 1.5, 1.45], target: [0, 1.15, 0.2] },
  electrical: { pos: [0.55, 1.75, 2.5], target: [0, 1.65, 0.5] },
  cleaning: { pos: [0.65, 1.55, 3.3], target: [0, 1.5, 0] },
  painting: { pos: [1.2, 1.35, 4.2], target: [0, 1.25, 0.2] },
  ac: { pos: [0.8, 1.85, 2.6], target: [0, 1.95, 0.3] },
  carpentry: { pos: [1.0, 1.6, 2.3], target: [0.25, 1.4, 0.2] },
};

function Rig({ trade }: { trade: TradeKey }) {
  const { camera, pointer } = useThree();
  const shot = shots[trade];
  const base = useMemo(() => new THREE.Vector3(...shot.pos), [shot]);
  const target = useMemo(() => new THREE.Vector3(...shot.target), [shot]);
  useEffect(() => {
    camera.position.copy(base).add(new THREE.Vector3(0.25, 0.1, 0.35));
  }, [camera, base]);
  useFrame((_, dt) => {
    const want = base.clone().add(new THREE.Vector3(pointer.x * 0.22, pointer.y * 0.12, 0));
    camera.position.lerp(want, 1 - Math.pow(0.02, dt));
    camera.lookAt(target);
  });
  return null;
}

const scenes: Record<TradeKey, () => JSX.Element> = {
  plumbing: Plumbing,
  electrical: Electrical,
  cleaning: Cleaning,
  painting: Painting,
  ac: AirCon,
  carpentry: Carpentry,
};

export default function TradeScene3D({ trade }: { trade: TradeKey }) {
  const Scene = scenes[trade];
  // only render while the panel is on screen
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (!wrap.current) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: '100px' });
    io.observe(wrap.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={wrap} className="absolute inset-0">
    <Canvas
      shadows="soft"
      dpr={[1, 1.25]}
      frameloop={visible ? 'always' : 'never'}
      camera={{ fov: 34, near: 0.05, far: 40, position: shots[trade].pos }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.0 }}
      style={{ background: '#EDE7DD' }}
    >
      <hemisphereLight args={['#FFF6EA', '#B9A891', 0.35]} />
      <directionalLight
        position={[3.5, 5, 4]}
        intensity={2.2}
        color="#FFF1DE"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
        shadow-normalBias={0.02}
      >
        <orthographicCamera attach="shadow-camera" args={[-4, 4, 4, -4, 0.5, 15]} />
      </directionalLight>
      <Environment resolution={256} frames={1} environmentIntensity={0.55}>
        <color attach="background" args={['#6E6A64']} />
        <Lightformer form="rect" intensity={2.4} position={[4, 3, 3]} scale={[4, 3, 1]} color="#FFF4E6" />
        <Lightformer form="rect" intensity={1.2} position={[-4, 2, 2]} scale={[3, 2, 1]} color="#EAF1F6" />
        <Lightformer form="rect" intensity={0.8} position={[0, 5, 0]} rotation-x={Math.PI / 2} scale={[6, 6, 1]} />
        <Lightformer form="ring" intensity={1.5} position={[0, 2, 5]} scale={2} color="#ffffff" />
      </Environment>
      <Rig trade={trade} />
      <Scene key={trade} />
    </Canvas>
    </div>
  );
}

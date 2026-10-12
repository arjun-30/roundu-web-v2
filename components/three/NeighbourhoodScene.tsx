'use client';

import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Html, Lightformer, SoftShadows } from '@react-three/drei';
import { RoundedBoxGeometry } from 'three-stdlib';
import * as THREE from 'three';

/* ─────────────────────────────────────────────────────────────────────────────
   A clay-model neighbourhood. One professional drives the streets to "your
   home"; the route draws in amber behind them and a live card follows along.
   ───────────────────────────────────────────────────────────────────────────── */

const PAPER = '#F6F3EE';
const CLAY = '#F3EFE8';
const ROAD = '#E0D8CB';
const PAD = '#ECE6DC';
const SAGE = '#C9D3BD';
const NAVY = '#152E4B';
const AMBER = '#C2700B';

const PITCH = 3.2; // block + street
const BLOCK = 2.4;
const RANGE = 6; // blocks from centre in each direction
const HOME = new THREE.Vector3(2.6, 0, -2.6);

const TRAVEL = 9; // seconds on the road
const HOLD = 3.2; // seconds parked at the door

function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Lot = { x: number; z: number; w: number; d: number; h: number };
type Tree = { x: number; z: number; r: number };

function buildCity() {
  const rand = rng(7);
  const lots: Lot[] = [];
  const trees: Tree[] = [];
  const pads: { x: number; z: number }[] = [];

  for (let i = -RANGE; i <= RANGE; i++) {
    for (let j = -RANGE; j <= RANGE; j++) {
      const cx = i * PITCH;
      const cz = j * PITCH;
      pads.push({ x: cx, z: cz });
      const dist = Math.hypot(cx, cz);

      // Parks break up the grid
      if (rand() < 0.1 && !(i === 1 && j === -1)) {
        for (let t = 0; t < 9; t++) {
          trees.push({ x: cx + (rand() - 0.5) * 1.9, z: cz + (rand() - 0.5) * 1.9, r: 0.18 + rand() * 0.14 });
        }
        continue;
      }

      for (const ox of [-0.6, 0.6]) {
        for (const oz of [-0.6, 0.6]) {
          const x = cx + ox;
          const z = cz + oz;
          if (Math.abs(x - HOME.x) < 0.1 && Math.abs(z - HOME.z) < 0.1) continue; // home is drawn separately
          const tall = dist < 9 ? 0.1 : 0.03;
          const h = rand() < tall ? 1.3 + rand() * 1.1 : 0.28 + rand() * 0.62;
          lots.push({ x, z, w: 0.86 + rand() * 0.18, d: 0.86 + rand() * 0.18, h });
          if (rand() < 0.35) trees.push({ x: x + (ox > 0 ? 0.55 : -0.55), z: z + (rand() - 0.5) * 0.6, r: 0.13 + rand() * 0.06 });
        }
      }
    }
  }
  return { lots, trees, pads };
}

/** Polyline with softened corners, so the van turns rather than snaps. */
function buildRoute() {
  const y = 0.08;
  const pts = [
    new THREE.Vector3(-8, y, 4.8),
    new THREE.Vector3(-1.6, y, 4.8),
    new THREE.Vector3(-1.6, y, -1.6),
    new THREE.Vector3(2.6, y, -1.6),
  ];
  const path = new THREE.CurvePath<THREE.Vector3>();
  const r = 0.55;
  let cursor = pts[0].clone();
  for (let k = 1; k < pts.length; k++) {
    const corner = pts[k];
    const next = pts[k + 1];
    if (!next) {
      path.add(new THREE.LineCurve3(cursor, corner));
      break;
    }
    const inDir = corner.clone().sub(cursor).normalize();
    const outDir = next.clone().sub(corner).normalize();
    const a = corner.clone().addScaledVector(inDir, -r);
    const b = corner.clone().addScaledVector(outDir, r);
    path.add(new THREE.LineCurve3(cursor, a));
    path.add(new THREE.QuadraticBezierCurve3(a, corner, b));
    cursor = b;
  }
  return path;
}

function City() {
  const { lots, trees, pads } = useMemo(buildCity, []);
  const buildings = useRef<THREE.InstancedMesh>(null);
  const treeMesh = useRef<THREE.InstancedMesh>(null);
  const padMesh = useRef<THREE.InstancedMesh>(null);

  const boxGeo = useMemo(() => {
    const g = new RoundedBoxGeometry(1, 1, 1, 3, 0.05);
    g.translate(0, 0.5, 0);
    return g;
  }, []);

  useLayoutEffect(() => {
    const m = new THREE.Object3D();
    lots.forEach((l, i) => {
      m.position.set(l.x, 0.04, l.z);
      m.scale.set(l.w, l.h, l.d);
      m.updateMatrix();
      buildings.current!.setMatrixAt(i, m.matrix);
    });
    buildings.current!.instanceMatrix.needsUpdate = true;

    trees.forEach((t, i) => {
      m.position.set(t.x, 0.04 + t.r, t.z);
      m.scale.setScalar(t.r);
      m.updateMatrix();
      treeMesh.current!.setMatrixAt(i, m.matrix);
    });
    treeMesh.current!.instanceMatrix.needsUpdate = true;

    pads.forEach((p, i) => {
      m.position.set(p.x, 0.02, p.z);
      m.scale.set(BLOCK, 0.04, BLOCK);
      m.updateMatrix();
      padMesh.current!.setMatrixAt(i, m.matrix);
    });
    padMesh.current!.instanceMatrix.needsUpdate = true;
  }, [lots, trees, pads]);

  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color={ROAD} roughness={1} />
      </mesh>
      <instancedMesh ref={padMesh} args={[undefined, undefined, pads.length]} receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color={PAD} roughness={1} />
      </instancedMesh>
      <instancedMesh ref={buildings} args={[boxGeo, undefined, lots.length]} castShadow receiveShadow>
        <meshStandardMaterial color={CLAY} roughness={0.82} />
      </instancedMesh>
      <instancedMesh ref={treeMesh} args={[undefined, undefined, trees.length]} castShadow receiveShadow>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial color={SAGE} roughness={0.95} flatShading />
      </instancedMesh>
    </group>
  );
}

function Home() {
  const pin = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (pin.current) pin.current.position.y = 2.15 + Math.sin(t * 1.6) * 0.08;
    if (ring.current) {
      const p = (t % 2.4) / 2.4;
      ring.current.scale.setScalar(0.6 + p * 1.6);
      (ring.current.material as THREE.MeshBasicMaterial).opacity = 0.45 * (1 - p);
    }
  });

  return (
    <group position={[HOME.x, 0, HOME.z]}>
      {/* The house: low block with a pitched roof */}
      <mesh position={[0, 0.34, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.95, 0.6, 0.95]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.84, 0]} rotation-y={Math.PI / 4} castShadow>
        <coneGeometry args={[0.78, 0.42, 4]} />
        <meshStandardMaterial color={NAVY} roughness={0.55} />
      </mesh>
      <mesh ref={ring} rotation-x={-Math.PI / 2} position={[0, 0.07, 0]}>
        <ringGeometry args={[0.7, 0.76, 64]} />
        <meshBasicMaterial color={NAVY} transparent depthWrite={false} />
      </mesh>
      <group ref={pin}>
        <mesh castShadow>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial color={NAVY} roughness={0.3} metalness={0.1} />
        </mesh>
        <mesh position={[0, -0.32, 0]} rotation-x={Math.PI}>
          <coneGeometry args={[0.12, 0.34, 32]} />
          <meshStandardMaterial color={NAVY} roughness={0.3} />
        </mesh>
      </group>
      <Html position={[0, 2.75, 0]} center zIndexRange={[20, 0]} style={{ pointerEvents: 'none' }}>
        <div className="whitespace-nowrap rounded-full bg-navy-700 px-3 py-1 text-[11px] font-medium text-paper shadow-lg">
          Your home
        </div>
      </Html>
    </group>
  );
}

function Journey({ reduced }: { reduced: boolean }) {
  const route = useMemo(buildRoute, []);
  const travelled = useMemo(() => new THREE.TubeGeometry(route, 320, 0.07, 10, false), [route]);
  const ahead = useMemo(() => new THREE.TubeGeometry(route, 320, 0.035, 8, false), [route]);
  const van = useRef<THREE.Group>(null);
  const halo = useRef<THREE.Mesh>(null);
  const [eta, setEta] = useState(12);
  const [arrived, setArrived] = useState(false);
  const tmp = useMemo(() => new THREE.Vector3(), []);
  const tangent = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }) => {
    const cycle = TRAVEL + HOLD;
    const t = reduced ? TRAVEL : clock.elapsedTime % cycle;
    const raw = Math.min(t / TRAVEL, 1);
    const p = raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2; // ease in-out

    const total = 320 * 10 * 6;
    travelled.setDrawRange(0, Math.floor(total * p / 6) * 6);

    route.getPointAt(p, tmp);
    route.getTangentAt(Math.min(p, 0.999), tangent);
    if (van.current) {
      van.current.position.copy(tmp);
      van.current.rotation.y = Math.atan2(tangent.x, tangent.z);
    }
    if (halo.current) {
      const s = 1 + Math.sin(clock.elapsedTime * 4) * 0.12;
      halo.current.scale.setScalar(s);
    }

    const nextEta = Math.max(0, Math.ceil(12 * (1 - p)));
    if (nextEta !== eta) setEta(nextEta);
    const isHere = raw >= 1;
    if (isHere !== arrived) setArrived(isHere);
  });


  return (
    <group>
      <mesh geometry={ahead}>
        <meshBasicMaterial color={NAVY} transparent opacity={0.18} />
      </mesh>
      <mesh geometry={travelled}>
        <meshStandardMaterial color={AMBER} emissive={AMBER} emissiveIntensity={0.25} roughness={0.4} />
      </mesh>

      <group ref={van}>
        {/* A small service van */}
        <mesh position={[0, 0.2, 0]} castShadow>
          <boxGeometry args={[0.3, 0.26, 0.56]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.45} />
        </mesh>
        <mesh position={[0, 0.25, 0.2]} castShadow>
          <boxGeometry args={[0.31, 0.17, 0.16]} />
          <meshStandardMaterial color={AMBER} roughness={0.4} />
        </mesh>
        <mesh ref={halo} rotation-x={-Math.PI / 2} position={[0, 0.03, 0]}>
          <circleGeometry args={[0.55, 48]} />
          <meshBasicMaterial color={AMBER} transparent opacity={0.16} depthWrite={false} />
        </mesh>
        <Html position={[0, 0.9, 0]} center zIndexRange={[30, 0]} style={{ pointerEvents: 'none' }}>
          <div className="flex items-center gap-3 whitespace-nowrap rounded-[10px] border border-line bg-white/95 py-2 pl-2 pr-4 shadow-[0_12px_30px_-10px_rgba(14,27,44,0.35)]">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-navy-700 font-serif text-[12px] text-paper">KR</div>
            <div className="leading-tight">
              <p className="text-[12px] font-semibold text-ink">Karthik · Plumber</p>
              <p className="text-[11px] text-muted tabular">
                {arrived ? 'Arrived at your door' : `Arriving in ${eta} min`}
              </p>
            </div>
          </div>
        </Html>
      </group>
    </group>
  );
}

function Rig() {
  const { camera, size } = useThree();
  // Portrait screens frame the last stretch of the route and the home
  const portrait = size.width < size.height * 0.9;
  const base = useMemo(
    () => (portrait ? new THREE.Vector3(7, 21, 12) : new THREE.Vector3(11, 17, 13)),
    [portrait],
  );
  const target = useMemo(
    () => (portrait ? new THREE.Vector3(0.6, 0, 0.4) : new THREE.Vector3(-0.6, 0, 0.6)),
    [portrait],
  );
  const pointer = useRef({ x: 0, y: 0 });

  useLayoutEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useFrame(({ clock }, dt) => {
    const drift = Math.sin(clock.elapsedTime * 0.12) * 0.8;
    const k = 1 - Math.exp(-dt * 2.5);
    camera.position.x += (base.x + drift + pointer.current.x * 1.4 - camera.position.x) * k;
    camera.position.y += (base.y - pointer.current.y * 0.8 - camera.position.y) * k;
    camera.position.z += (base.z - drift - camera.position.z) * k;
    camera.lookAt(target);
  });
  return null;
}

export default function NeighbourhoodScene({ onReady }: { onReady?: () => void }) {
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <Canvas
      shadows
      flat
      dpr={[1, 2]}
      camera={{ position: [11, 17, 13], fov: 30, near: 1, far: 120 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      onCreated={() => onReady?.()}
    >
      <color attach="background" args={[PAPER]} />
      <fog attach="fog" args={[PAPER, 26, 52]} />
      <SoftShadows size={18} samples={12} focus={0.6} />

      <hemisphereLight args={['#FFFFFF', '#D9CFC0', 0.75]} />
      <directionalLight
        position={[9, 16, 5]}
        intensity={1.35}
        color="#FFF6EA"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0004}
        shadow-normalBias={0.03}
        shadow-camera-left={-22}
        shadow-camera-right={22}
        shadow-camera-top={22}
        shadow-camera-bottom={-22}
        shadow-camera-near={1}
        shadow-camera-far={60}
      />
      <Environment resolution={128}>
        <Lightformer intensity={1.2} position={[0, 6, 4]} scale={[10, 4, 1]} />
        <Lightformer intensity={0.6} position={[-6, 3, -4]} scale={[6, 3, 1]} />
      </Environment>

      <City />
      <Home />
      <Journey reduced={reduced} />
      <Rig />
    </Canvas>
  );
}

'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, RoundedBox, Line, Grid } from '@react-three/drei';
import * as THREE from 'three';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

/* ── Element Definitions ── */

const HUB_POS = [0, 0.15, 0];
const HUB_SIZE = 0.16;
const THIN = 0.02;
const CR = 0.012;

const ELEMENTS = [
  // Standing screens (vertical, back area)
  { id: 's1', type: 'screen', w: 1.3, h: 0.95, pos: [0.5, 0.475, -0.7] },
  { id: 's2', type: 'screen', w: 1.1, h: 0.8, pos: [1.5, 0.4, -0.15] },
  { id: 's3', type: 'screen', w: 0.9, h: 0.65, pos: [-0.4, 0.325, -1.1] },
  // Flat panels (horizontal, front area)
  { id: 'p1', type: 'panel', w: 0.9, h: 0.65, pos: [-1.0, 0.01, 0.4] },
  { id: 'p2', type: 'panel', w: 0.75, h: 0.55, pos: [-0.3, 0.01, 1.0] },
  { id: 'p3', type: 'panel', w: 0.65, h: 0.45, pos: [1.0, 0.01, 1.1] },
];

/* ── Helpers ── */

function explodedPos(base, hub, factor) {
  return base.map((v, i) => hub[i] + (v - hub[i]) * (1 + factor * 0.6));
}

/* ── Animated Wrapper ── */

/**
 * @param {number[]} targetPos - 목표 3D 위치 [Required]
 * @param {boolean} isReduced - 모션 감소 여부 [Optional]
 * @param {ReactNode} children - 콘텐츠 [Required]
 */
function Animated({ targetPos, isReduced, children }) {
  const ref = useRef();
  const anim = useRef([...targetPos]);

  useFrame((_, dt) => {
    if (!ref.current) return;
    for (let i = 0; i < 3; i++) {
      anim.current[i] = isReduced
        ? targetPos[i]
        : THREE.MathUtils.damp(anim.current[i], targetPos[i], 5, dt);
    }
    ref.current.position.set(...anim.current);
  });

  return <group ref={ref}>{children}</group>;
}

/* ── Standing Screen ── */

/**
 * @param {number} w - 패널 폭 [Required]
 * @param {number} h - 패널 높이 [Required]
 */
function StandingScreen({ w, h }) {
  const edgesGeo = useMemo(() => {
    const box = new THREE.BoxGeometry(w, h, THIN);
    const edges = new THREE.EdgesGeometry(box);
    box.dispose();
    return edges;
  }, [w, h]);

  useEffect(() => () => edgesGeo.dispose(), [edgesGeo]);

  const fz = THIN / 2 + 0.001;

  return (
    <>
      <RoundedBox args={[w, h, THIN]} radius={CR} smoothness={4} castShadow>
        <meshStandardMaterial
          color="#08090a"
          polygonOffset
          polygonOffsetFactor={1}
          polygonOffsetUnits={1}
        />
      </RoundedBox>
      <lineSegments geometry={edgesGeo}>
        <lineBasicMaterial color="white" />
      </lineSegments>
      {/* Chrome separator */}
      <mesh position={[0, h / 2 - 0.07, fz]}>
        <planeGeometry args={[w - 0.04, 0.001]} />
        <meshBasicMaterial color="white" opacity={0.4} transparent />
      </mesh>
      {/* Browser dots */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[-w / 2 + 0.04 + i * 0.025, h / 2 - 0.035, fz]}>
          <circleGeometry args={[0.006, 8]} />
          <meshBasicMaterial color="white" opacity={0.4} transparent />
        </mesh>
      ))}
      {/* Content lines */}
      {[0.14, 0.21, 0.28, 0.35].map((y, i) => (
        <mesh key={`c${i}`} position={[0, h / 2 - y, fz]}>
          <planeGeometry args={[w * (0.7 - i * 0.06), 0.006]} />
          <meshBasicMaterial color="white" opacity={0.12} transparent />
        </mesh>
      ))}
      {/* Input field placeholder */}
      <mesh position={[0, h / 2 - 0.44, fz]}>
        <planeGeometry args={[w * 0.7, 0.035]} />
        <meshBasicMaterial color="white" opacity={0.06} transparent />
      </mesh>
    </>
  );
}

/* ── Flat Panel ── */

/**
 * @param {number} w - 패널 폭 [Required]
 * @param {number} h - 패널 깊이 [Required]
 */
function FlatPanel({ w, h }) {
  const edgesGeo = useMemo(() => {
    const box = new THREE.BoxGeometry(w, THIN, h);
    const edges = new THREE.EdgesGeometry(box);
    box.dispose();
    return edges;
  }, [w, h]);

  useEffect(() => () => edgesGeo.dispose(), [edgesGeo]);

  return (
    <>
      <RoundedBox args={[w, THIN, h]} radius={CR} smoothness={4} castShadow>
        <meshStandardMaterial
          color="#08090a"
          polygonOffset
          polygonOffsetFactor={1}
          polygonOffsetUnits={1}
        />
      </RoundedBox>
      <lineSegments geometry={edgesGeo}>
        <lineBasicMaterial color="white" />
      </lineSegments>
      {/* Top face content hints */}
      {[0.25, 0.45, 0.65].map((t, i) => (
        <mesh
          key={i}
          position={[0, THIN / 2 + 0.001, -h / 2 + h * t]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[w * (0.6 - i * 0.08), 0.006]} />
          <meshBasicMaterial color="white" opacity={0.12} transparent />
        </mesh>
      ))}
    </>
  );
}

/* ── Hub (central node) ── */

function Hub() {
  const edgesGeo = useMemo(() => {
    const box = new THREE.BoxGeometry(HUB_SIZE, HUB_SIZE, HUB_SIZE);
    const edges = new THREE.EdgesGeometry(box);
    box.dispose();
    return edges;
  }, []);

  useEffect(() => () => edgesGeo.dispose(), [edgesGeo]);

  return (
    <group position={HUB_POS} rotation={[0, Math.PI / 4, 0]}>
      <RoundedBox args={[HUB_SIZE, HUB_SIZE, HUB_SIZE]} radius={0.01} smoothness={2}>
        <meshStandardMaterial color="#08090a" />
      </RoundedBox>
      <lineSegments geometry={edgesGeo}>
        <lineBasicMaterial color="white" />
      </lineSegments>
    </group>
  );
}

/* ── Scene ── */

function Scene({ explode }) {
  const isReduced = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  const targets = ELEMENTS.map((el) => ({
    ...el,
    target: explodedPos(el.pos, HUB_POS, explode),
  }));

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={0.6}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={20}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />
      <directionalLight position={[-3, 4, -2]} intensity={0.2} />

      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={2}
        maxDistance={10}
        enablePan={false}
      />

      {/* Floor grid */}
      <Grid
        position={[0, -0.001, 0]}
        cellSize={0.3}
        sectionSize={1.5}
        cellThickness={0.3}
        sectionThickness={0.5}
        cellColor="#222"
        sectionColor="#333"
        fadeDistance={6}
        infiniteGrid
      />

      {/* Shadow receiver */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.002, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <shadowMaterial transparent opacity={0.15} />
      </mesh>

      {/* Hub */}
      <Hub />

      {/* Connection lines (hub → each element) */}
      {targets.map((el) => (
        <Line
          key={`line-${el.id}`}
          points={[HUB_POS, el.target]}
          color="white"
          lineWidth={1}
          opacity={0.15}
          transparent
        />
      ))}

      {/* Elements */}
      {targets.map((el) => (
        <Animated key={el.id} targetPos={el.target} isReduced={isReduced}>
          {el.type === 'screen' ? (
            <StandingScreen w={el.w} h={el.h} />
          ) : (
            <FlatPanel w={el.w} h={el.h} />
          )}
        </Animated>
      ))}
    </>
  );
}

/* ── Main Component ── */

/**
 * HubSpokeR3F — Hub-and-Spoke 인터랙티브 분해도
 *
 * Opero Labs 스타일 아이소메트릭: 세워진 브라우저 스크린 3개 +
 * 눕힌 패널 3개 + 중앙 허브 + 연결선 + 바닥 그리드.
 * OrbitControls 자유 회전, 슬라이더로 분해/조립.
 *
 * @param {object} sx - MUI sx 스타일 오버라이드 [Optional]
 */
function HubSpokeR3F({ sx }) {
  const [explode, setExplode] = useState(0);

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <Box
        sx={{
          width: '100%',
          height: 500,
          bgcolor: '#08090a',
          borderRadius: 1,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Canvas
          shadows
          camera={{ position: [4, 3, 4], fov: 32 }}
          gl={{ antialias: true }}
          style={{ background: '#08090a' }}
        >
          <Scene explode={explode} />
        </Canvas>
      </Box>
      <Box sx={{ px: 2, pt: 1.5, pb: 0.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography
            sx={{
              fontFamily: 'monospace',
              fontSize: 11,
              color: 'text.secondary',
              flexShrink: 0,
            }}
          >
            Explode
          </Typography>
          <Slider
            value={explode}
            onChange={(_, v) => setExplode(v)}
            min={0}
            max={1}
            step={0.01}
            size="small"
          />
        </Box>
      </Box>
    </Box>
  );
}

export { HubSpokeR3F };

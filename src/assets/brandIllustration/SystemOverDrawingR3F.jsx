'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, RoundedBox, Html } from '@react-three/drei';
import * as THREE from 'three';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

/* ── Layer Data (SystemOverDrawingV3 측정값 기반) ── */

const LAYERS = [
  { id: 'background', label: 'BACKGROUND', fw: 175, fd: 117 },
  { id: 'spatial', label: 'LAYOUT', fw: 152, fd: 101 },
  { id: 'motion', label: 'MOTION', fw: 127, fd: 85 },
  { id: 'color', label: 'COLOR TOKEN', fw: 99, fd: 66 },
  { id: 'typography', label: 'TYPOGRAPHY', fw: 79, fd: 53 },
];

const S = 0.012; // SVG → Three.js scale
const SLAB_H = 0.12; // 슬래브 두께
const CR = 0.025; // 코너 반경
const BASE_GAP = 0.18;
const EXPLODE_GAP = 0.7;

/* ── Single Slab ── */

/**
 * 디자인 토큰 레이어 슬래브
 *
 * @param {number} fw - 슬래브 폭 (SVG 단위) [Required]
 * @param {number} fd - 슬래브 깊이 (SVG 단위) [Required]
 * @param {number} targetY - 목표 Y 위치 [Required]
 * @param {string} label - 레이어 이름 [Required]
 * @param {boolean} isReducedMotion - 모션 감소 여부 [Optional]
 */
function Slab({ fw, fd, targetY, label, isReducedMotion }) {
  const groupRef = useRef();
  const animY = useRef(targetY);
  const w = fw * S;
  const d = fd * S;

  // 12-edge wireframe from sharp box
  const edgesGeo = useMemo(() => {
    const box = new THREE.BoxGeometry(w, SLAB_H, d);
    const edges = new THREE.EdgesGeometry(box);
    box.dispose();
    return edges;
  }, [w, d]);

  useEffect(() => () => edgesGeo.dispose(), [edgesGeo]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (isReducedMotion) {
      animY.current = targetY;
    } else {
      animY.current = THREE.MathUtils.damp(animY.current, targetY, 5, delta);
    }
    groupRef.current.position.y = animY.current;
  });

  return (
    <group ref={groupRef}>
      {/* Rounded fill */}
      <RoundedBox args={[w, SLAB_H, d]} radius={CR} smoothness={4}>
        <meshStandardMaterial
          color="#08090a"
          polygonOffset
          polygonOffsetFactor={1}
          polygonOffsetUnits={1}
        />
      </RoundedBox>
      {/* Structural wireframe */}
      <lineSegments geometry={edgesGeo}>
        <lineBasicMaterial color="white" />
      </lineSegments>
      {/* Label */}
      <Html position={[w / 2 + 0.12, 0, 0]} style={{ pointerEvents: 'none' }}>
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: 10,
            fontWeight: 700,
            color: 'white',
            whiteSpace: 'nowrap',
            opacity: 0.8,
            textShadow: '0 1px 4px rgba(0,0,0,0.8)',
          }}
        >
          {label}
        </span>
      </Html>
    </group>
  );
}

/* ── 3D Scene ── */

function Scene({ explode }) {
  const spacing = BASE_GAP + explode * EXPLODE_GAP;
  const totalH = (LAYERS.length - 1) * spacing;

  const isReducedMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={0.6} />
      <directionalLight position={[-3, 4, -2]} intensity={0.2} />
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={2}
        maxDistance={8}
        enablePan={false}
      />
      <group>
        {LAYERS.map((layer, i) => (
          <Slab
            key={layer.id}
            fw={layer.fw}
            fd={layer.fd}
            targetY={i * spacing - totalH / 2}
            label={layer.label}
            isReducedMotion={isReducedMotion}
          />
        ))}
      </group>
    </>
  );
}

/* ── Main Component ── */

/**
 * SystemOverDrawingR3F — R3F + drei 인터랙티브 분해도
 *
 * 5개 디자인 토큰 레이어를 3D 공간에서 회전·분해·조립.
 * OrbitControls로 자유 회전, 슬라이더로 레이어 간격 제어.
 *
 * @param {object} sx - MUI sx 스타일 오버라이드 [Optional]
 */
function SystemOverDrawingR3F({ sx }) {
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
          camera={{ position: [3.5, 2.5, 3.5], fov: 32 }}
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

export { SystemOverDrawingR3F };

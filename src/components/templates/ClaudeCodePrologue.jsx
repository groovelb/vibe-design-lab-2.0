'use client';
import { useRef, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Canvas, useFrame } from '@react-three/fiber';
import { IcebergSection } from '../container/IcebergSection';
import { FloatingBuddies } from '../data-display/FloatingBuddies';
import { ParallaxLayer } from '../scroll/ParallaxLayer';
import { BG_PARALLAX_SPEED } from '../motion/constants';
import { ConstructType } from '../motion/ConstructType';
import { PROLOGUE, CC } from '@/data/claudeCodeExperimentData';

const ASCII_LOGO = ` ██████ ██      █████  ██    ██ ██████  ███████
██      ██     ██   ██ ██    ██ ██   ██ ██
██      ██     ███████ ██    ██ ██   ██ █████
██      ██     ██   ██ ██    ██ ██   ██ ██
 ██████ ██████ ██   ██  ██████  ██████  ███████

 ██████  ██████  ██████  ███████
██      ██    ██ ██   ██ ██
██      ██    ██ ██   ██ █████
██      ██    ██ ██   ██ ██
 ██████  ██████  ██████  ███████`;

/* ─── Claw'd 복셀 (PlayerExternal 기반, rapier 의존 제거) ─── */

const CLAW_ORANGE = '#E57B55';
const CLAW_BLACK = '#1A1A1A';

function buildCharacterBlocks() {
  const blocks = [];
  const bodyW = 9;
  const bodyOffset = -4;
  const bodyD = 3;
  const zOffset = -1;

  for (const lx of [0, 2, 6, 8]) {
    for (const lz of [0, 2]) {
      for (let y = 0; y <= 2; y++) {
        blocks.push({ x: lx + bodyOffset, y, z: lz + zOffset, color: CLAW_ORANGE });
      }
    }
  }

  for (let y = 3; y <= 5; y++) {
    for (let x = 0; x < bodyW; x++) {
      for (let z = 0; z < bodyD; z++) {
        const color = (y === 4 && z === 0 && (x === 3 || x === 5)) ? CLAW_BLACK : CLAW_ORANGE;
        blocks.push({ x: x + bodyOffset, y, z: z + zOffset, color });
      }
    }
  }

  for (let ax = 1; ax <= 2; ax++) {
    for (let z = 0; z < bodyD; z++) {
      blocks.push({ x: bodyOffset - ax, y: 4, z: z + zOffset, color: CLAW_ORANGE });
      blocks.push({ x: bodyW + bodyOffset - 1 + ax, y: 4, z: z + zOffset, color: CLAW_ORANGE });
    }
  }

  return blocks;
}

/** 스크롤 값을 R3F 씬 안으로 전달하는 브릿지 */
const scrollRef = { current: 0 };

function ClawdModel() {
  const groupRef = useRef();

  const { orangeBlocks, blackBlocks } = useMemo(() => {
    const blocks = buildCharacterBlocks();
    return {
      orangeBlocks: blocks.filter((b) => b.color === CLAW_ORANGE),
      blackBlocks: blocks.filter((b) => b.color === CLAW_BLACK),
    };
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    const s = scrollRef.current;
    groupRef.current.rotation.y = s * 0.005;
    groupRef.current.position.y = -3 + s * 0.003;
  });

  return (
    <group ref={groupRef} position={[0, -3, 0]} scale={0.3}>
      {orangeBlocks.map((b, i) => (
        <mesh key={`o-${i}`} position={[b.x, b.y, b.z]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={CLAW_ORANGE} roughness={0.85} />
        </mesh>
      ))}
      {blackBlocks.map((b, i) => (
        <mesh key={`b-${i}`} position={[b.x, b.y, b.z]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={CLAW_BLACK} roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * ClaudeCodePrologue
 *
 * § 0. 유출 — 터미널 컨셉 히어로 + ASCII 아트 로고.
 */
export function ClaudeCodePrologue() {
  useEffect(() => {
    const onScroll = () => { scrollRef.current = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <IcebergSection
      depth="deep"
      density="breathe"
      isMinHeight
      sx={{
        background: 'linear-gradient(to bottom, var(--vdl-950) 75%, transparent) !important',
        position: 'relative',
      }}
    >
      {/* 배경 레이어 — Buddies + Claw'd 3D, 느린 패럴럭스 */}
      <ParallaxLayer speed={BG_PARALLAX_SPEED} sx={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}>
        <FloatingBuddies />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: { xs: '50%', sm: '55%', md: '45%' },
            opacity: { xs: 0.4, sm: 0.7, md: 1 },
          }}
        >
          <Canvas
            orthographic
            frameloop="always"
            camera={{
              zoom: 80,
              position: [10, 8, -10],
              near: -100,
              far: 100,
            }}
            style={{ width: '100%', height: '100%' }}
            gl={{ alpha: true }}
          >
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 10, -5]} intensity={0.5} />
            <ClawdModel />
          </Canvas>
        </Box>
      </ParallaxLayer>

      {/* 콘텐츠 레이어 — 전체를 하나로 감싸서 빠른 패럴럭스 */}
      <ParallaxLayer speed={1.1} sx={{ position: 'relative', minHeight: '100vh' }}>
        {/* Terminal chrome — traffic light dots */}
        <Box sx={{ display: 'flex', gap: 1, mb: { xs: 4, md: 6 } }}>
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#FF5F56' }} />
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#FFBD2E' }} />
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#27C93F' }} />
        </Box>

        {/* Welcome message — bordered box */}
        <Box
          sx={{
            display: 'inline-flex',
            gap: 1.5,
            alignItems: 'center',
            border: '1px solid',
            borderColor: CC.orange,
            px: { xs: 2, md: 3 },
            py: 1.5,
            mb: { xs: 4, md: 6 },
          }}
        >
          <Typography
            component="span"
            sx={{
              fontFamily: 'var(--font-mono, "IBM Plex Mono"), monospace',
              color: CC.orange,
              fontSize: { xs: '0.875rem', md: '1rem' },
            }}
          >
            ✻
          </Typography>
          <Typography
            component="span"
            sx={{
              fontFamily: 'var(--font-mono, "IBM Plex Mono"), monospace',
              color: 'rgba(255,255,255,0.6)',
              fontSize: { xs: '0.875rem', md: '1rem' },
            }}
          >
            Welcome to the{' '}
            <Box component="span" sx={{ color: '#FFFFFF', fontWeight: 700 }}>
              Claude Code
            </Box>
            {' '}research preview!
          </Typography>
        </Box>

        {/* ASCII art logo */}
        <Box
          component="pre"
          sx={{
            fontFamily: 'Menlo, Consolas, "Courier New", monospace',
            color: CC.orange,
            fontSize: { xs: '0.4rem', sm: '0.6rem', md: '0.9rem', lg: '1.1rem' },
            lineHeight: { xs: 1.3, md: 1.2 },
            letterSpacing: { xs: '0.05em', md: '0.08em' },
            mb: { xs: 5, md: 8 },
            m: 0,
            overflow: 'hidden',
            whiteSpace: 'pre',
          }}
        >
          {ASCII_LOGO}
        </Box>

        {/* Prompt line — headline (typing effect) */}
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 2 }}>
          <Typography
            component="span"
            sx={{
              fontFamily: 'var(--font-mono, "IBM Plex Mono"), monospace',
              color: '#FFFFFF',
              fontSize: { xs: '1rem', md: '1.25rem' },
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {'>'}
          </Typography>
          <ConstructType
            text={PROLOGUE.headline}
            variant="body1"
            typingSpeed={25}
            delay={800}
            sx={{
              '& .MuiTypography-root': {
                fontFamily: 'var(--font-mono, "IBM Plex Mono"), monospace',
                color: '#FFFFFF',
                fontSize: { xs: '1rem', md: '1.25rem' },
                fontWeight: 700,
              },
            }}
          />
        </Box>

        {/* Body */}
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'var(--font-mono, "IBM Plex Mono"), monospace',
            color: 'rgba(255,255,255,0.4)',
            maxWidth: 720,
            lineHeight: 1.8,
            mb: 4,
          }}
        >
          {PROLOGUE.body}
        </Typography>

        {/* Date stamp */}
        <Typography
          sx={{
            fontFamily: 'var(--font-mono, "IBM Plex Mono"), monospace',
            color: 'rgba(255,255,255,0.25)',
            fontSize: '0.75rem',
          }}
        >
          {PROLOGUE.date} · source leaked · 512,000 LOC
        </Typography>
      </ParallaxLayer>
    </IcebergSection>
  );
}

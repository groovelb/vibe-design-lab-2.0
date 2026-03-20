'use client';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import { useGrain } from './useGrain';

/* ── Gradient & Glow — vdl-950 / vdl-900 only ── */

const GRADIENT = 'linear-gradient(to top, var(--vdl-900), var(--vdl-950), transparent)';

const GLOW = `
  radial-gradient(ellipse at 25% 35%, color-mix(in srgb, var(--vdl-900) 40%, transparent) 0%, transparent 70%),
  radial-gradient(ellipse at 80% 25%, color-mix(in srgb, var(--vdl-900) 25%, transparent) 0%, transparent 60%)
`;

/**
 * AmbientGrainedBackground 컴포넌트
 *
 * violetGray 950/900 기반 모노톤 ambient grained gradient 배경.
 * 5-레이어 합성: Base(950) → Glow(900) → Gradient(900→950) → Section Grain → Global Grain.
 *
 * @param {boolean} hasGlow - 앰비언트 글로우 레이어 표시 여부 [Optional, 기본값: true]
 * @param {boolean} hasGrain - 섹션 그레인 레이어 표시 여부 [Optional, 기본값: true]
 * @param {number} grainSize - 섹션 그레인 타일 크기 (px). 작을수록 촘촘 [Optional, 기본값: 128]
 * @param {number} grainOpacity - 섹션 그레인 불투명도 (0–1) [Optional, 기본값: 0.8]
 * @param {boolean} hasGlobalGrain - 글로벌 그레인 레이어 표시 여부 [Optional, 기본값: true]
 * @param {number} globalGrainOpacity - 글로벌 그레인 불투명도 (0–1) [Optional, 기본값: 0.07]
 * @param {node} children - 콘텐츠 [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <AmbientGrainedBackground>
 *   <Typography variant="h2">Hero</Typography>
 * </AmbientGrainedBackground>
 */
const AmbientGrainedBackground = forwardRef(function AmbientGrainedBackground({
  hasGlow = true,
  hasGrain = true,
  grainSize = 128,
  grainOpacity = 0.8,
  hasGlobalGrain = true,
  globalGrainOpacity = 0.07,
  children,
  sx,
  ...props
}, ref) {
  const { light, dark } = useGrain();

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--vdl-950)',
        ...sx,
      }}
      {...props}
    >
      {/* L2 — Ambient Glow */}
      {hasGlow && (
        <Box
          sx={{
            position: 'absolute',
            width: '140%',
            height: '120%',
            top: '-10%',
            left: '-20%',
            background: GLOW,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* L3 — Section Gradient */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: GRADIENT,
          pointerEvents: 'none',
        }}
      />

      {/* L4 — Section Grain (dark, dense) */}
      {hasGrain && dark && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${dark})`,
            backgroundRepeat: 'repeat',
            backgroundSize: `${grainSize}px ${grainSize}px`,
            opacity: grainOpacity,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* L5 — Global Grain (light, subtle) */}
      {hasGlobalGrain && light && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${light})`,
            backgroundRepeat: 'repeat',
            opacity: globalGrainOpacity,
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />
      )}

      {/* Content */}
      {children && (
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          {children}
        </Box>
      )}
    </Box>
  );
});

export { AmbientGrainedBackground };

'use client';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import { useGrain } from './useGrain';

/* ── Gradient Presets ── */

const GRADIENTS = {
  dark: 'linear-gradient(to top, var(--vdl-500), var(--vdl-700), transparent)',
  light: 'linear-gradient(360deg, var(--vdl-50) 13%, var(--vdl-200) 55%, var(--vdl-300) 78%, var(--vdl-500) 100%)',
  cta: 'linear-gradient(90deg, var(--vdl-950), var(--vdl-800) 46%, var(--vdl-600) 75%, var(--vdl-500) 100%)',
};

const GLOW_PRESETS = {
  dark: `
    radial-gradient(ellipse at 25% 35%, color-mix(in srgb, var(--vdl-700) 35%, transparent) 0%, transparent 70%),
    radial-gradient(ellipse at 80% 25%, color-mix(in srgb, var(--vdl-500) 20%, transparent) 0%, transparent 60%)
  `,
  light: `
    radial-gradient(ellipse at 30% 40%, color-mix(in srgb, var(--vdl-300) 25%, transparent) 0%, transparent 65%),
    radial-gradient(ellipse at 75% 30%, color-mix(in srgb, var(--vdl-400) 15%, transparent) 0%, transparent 55%)
  `,
  cta: `
    radial-gradient(ellipse at 60% 50%, color-mix(in srgb, var(--vdl-500) 25%, transparent) 0%, transparent 60%)
  `,
};

/**
 * AmbientGrainedBackground 컴포넌트
 *
 * violetGray 스케일 기반 모노톤 ambient grained gradient 배경.
 * 5-레이어 합성: Base → Glow → Gradient → Section Grain → Global Grain.
 *
 * @param {'dark'|'light'|'cta'} variant - 그래디언트 프리셋 [Optional, 기본값: 'dark']
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
 * <AmbientGrainedBackground variant="dark">
 *   <Typography variant="h2">Hero</Typography>
 * </AmbientGrainedBackground>
 */
const AmbientGrainedBackground = forwardRef(function AmbientGrainedBackground({
  variant = 'dark',
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

  const baseColor = variant === 'light' ? 'var(--vdl-50)' : 'var(--vdl-950)';

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: baseColor,
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
            background: GLOW_PRESETS[variant] || GLOW_PRESETS.dark,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* L3 — Section Gradient */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: GRADIENTS[variant] || GRADIENTS.dark,
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

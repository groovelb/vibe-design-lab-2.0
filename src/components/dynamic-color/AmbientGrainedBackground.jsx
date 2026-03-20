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
 * position: fixed로 뷰포트 전체를 덮는 독립 배경 레이어.
 * 스크롤 대상이 아니며, 콘텐츠 뒤에 깔린다.
 *
 * @param {boolean} hasGlow - 앰비언트 글로우 레이어 표시 여부 [Optional, 기본값: true]
 * @param {boolean} hasGrain - 섹션 그레인 레이어 표시 여부 [Optional, 기본값: true]
 * @param {number} grainSize - 섹션 그레인 타일 크기 (px). 작을수록 촘촘 [Optional, 기본값: 128]
 * @param {number} grainOpacity - 섹션 그레인 불투명도 (0–1) [Optional, 기본값: 0.8]
 * @param {boolean} hasGlobalGrain - 글로벌 그레인 레이어 표시 여부 [Optional, 기본값: true]
 * @param {number} globalGrainOpacity - 글로벌 그레인 불투명도 (0–1) [Optional, 기본값: 0.07]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <AmbientGrainedBackground />
 * <SiteShell>{children}</SiteShell>
 */
const AmbientGrainedBackground = forwardRef(function AmbientGrainedBackground({
  hasGlow = true,
  hasGrain = true,
  grainSize = 128,
  grainOpacity = 0.8,
  hasGlobalGrain = true,
  globalGrainOpacity = 0.07,
  sx,
  ...props
}, ref) {
  const { light, dark } = useGrain();

  return (
    <Box
      ref={ref}
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        backgroundColor: 'var(--vdl-950)',
        pointerEvents: 'none',
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
          }}
        />
      )}

      {/* L3 — Section Gradient */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: GRADIENT,
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
          }}
        />
      )}
    </Box>
  );
});

export { AmbientGrainedBackground };

'use client';
import { forwardRef, useEffect, useRef, useCallback } from 'react';
import Box from '@mui/material/Box';
import { useGrain } from './useGrain';

/* ── Helpers ── */

const lerp = (a, b, t) => a + (b - a) * t;

/* ── Static gradients (reduced-motion / scroll-reactive off) ── */

const GRADIENT_STATIC = 'linear-gradient(to top, var(--vdl-800), var(--vdl-950), transparent)';

const GLOW_STATIC = `
  radial-gradient(ellipse at 25% 35%, color-mix(in srgb, var(--vdl-900) 40%, transparent) 0%, transparent 70%),
  radial-gradient(ellipse at 80% 25%, color-mix(in srgb, var(--vdl-900) 25%, transparent) 0%, transparent 60%)
`;

/* ── Scroll-reactive gradients (CSS custom properties for dynamic stops) ── */

const GRADIENT_REACTIVE =
  'linear-gradient(to top, var(--vdl-800) var(--ag-g1, 0%), var(--vdl-950) var(--ag-g2, 50%), transparent 100%)';

const GLOW_REACTIVE = `
  radial-gradient(ellipse at 25% var(--ag-glow-y1, 35%), color-mix(in srgb, var(--vdl-900) 40%, transparent) 0%, transparent 70%),
  radial-gradient(ellipse at 80% var(--ag-glow-y2, 25%), color-mix(in srgb, var(--vdl-900) 25%, transparent) 0%, transparent 60%)
`;

/**
 * AmbientGrainedBackground 컴포넌트
 *
 * violetGray 950/900 기반 모노톤 ambient grained gradient 배경.
 * position: fixed로 뷰포트 전체를 덮는 독립 배경 레이어.
 * 스크롤 대상이 아니며, 콘텐츠 뒤에 깔린다.
 * hasScrollReactive 활성화 시 스크롤 진행률에 따라 gradient stop이 변화한다.
 *
 * @param {boolean} hasGlow - 앰비언트 글로우 레이어 표시 여부 [Optional, 기본값: true]
 * @param {boolean} hasGrain - 섹션 그레인 레이어 표시 여부 [Optional, 기본값: true]
 * @param {number} grainSize - 섹션 그레인 타일 크기 (px). 작을수록 촘촘 [Optional, 기본값: 128]
 * @param {number} grainOpacity - 섹션 그레인 불투명도 (0–1) [Optional, 기본값: 0.8]
 * @param {boolean} hasGlobalGrain - 글로벌 그레인 레이어 표시 여부 [Optional, 기본값: true]
 * @param {number} globalGrainOpacity - 글로벌 그레인 불투명도 (0–1) [Optional, 기본값: 0.07]
 * @param {boolean} hasScrollReactive - 스크롤 반응형 그라데이션 효과 [Optional, 기본값: true]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <AmbientGrainedBackground />
 * <AmbientGrainedBackground hasScrollReactive={false} />
 */
const AmbientGrainedBackground = forwardRef(function AmbientGrainedBackground({
  hasGlow = true,
  hasGrain = true,
  grainSize = 128,
  grainOpacity = 0.8,
  hasGlobalGrain = true,
  globalGrainOpacity = 0.07,
  hasScrollReactive = true,
  sx,
  ...props
}, ref) {
  const { light, dark } = useGrain();
  const localRef = useRef(null);

  const setRefs = useCallback((node) => {
    localRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  }, [ref]);

  /* ── Scroll-reactive: RAF + CSS custom properties (no re-renders) ── */
  useEffect(() => {
    if (!hasScrollReactive) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    const el = localRef.current;
    if (!el) return;

    let rafId = null;

    const update = () => {
      const scrollEl = document.scrollingElement || document.documentElement;
      const maxScroll = scrollEl.scrollHeight - scrollEl.clientHeight;
      const t = maxScroll > 0 ? Math.min(scrollEl.scrollTop / maxScroll, 1) : 0;

      el.style.setProperty('--ag-g1', `${lerp(0, 30, t)}%`);
      el.style.setProperty('--ag-g2', `${lerp(50, 70, t)}%`);
      el.style.setProperty('--ag-glow-y1', `${lerp(35, 55, t)}%`);
      el.style.setProperty('--ag-glow-y2', `${lerp(25, 45, t)}%`);
      el.style.setProperty('--ag-glow-opacity', String(lerp(1, 0.6, t)));

      rafId = null;
    };

    const onScroll = () => {
      if (rafId != null) return;
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, [hasScrollReactive]);

  return (
    <Box
      ref={setRefs}
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
            background: hasScrollReactive ? GLOW_REACTIVE : GLOW_STATIC,
            opacity: hasScrollReactive ? 'var(--ag-glow-opacity, 1)' : 1,
          }}
        />
      )}

      {/* L3 — Section Gradient */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: hasScrollReactive ? GRADIENT_REACTIVE : GRADIENT_STATIC,
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

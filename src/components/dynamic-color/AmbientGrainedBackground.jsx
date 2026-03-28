'use client';
import { forwardRef, useEffect, useRef, useCallback } from 'react';
import Box from '@mui/material/Box';
import { useGrain } from './useGrain';

/* ── Helpers ── */

const lerp = (a, b, t) => a + (b - a) * t;

/* ── Static gradients (reduced-motion / scroll-reactive off) ── */

const GRADIENT_STATIC = 'linear-gradient(to bottom, var(--vdl-800), var(--vdl-950), transparent)';

const GLOW_STATIC = `
  radial-gradient(ellipse at 25% 35%, color-mix(in srgb, var(--vdl-900) 40%, transparent) 0%, transparent 70%),
  radial-gradient(ellipse at 80% 25%, color-mix(in srgb, var(--vdl-900) 25%, transparent) 0%, transparent 60%)
`;

/* ── Scroll-reactive gradients (CSS custom properties for dynamic stops) ── */

const GRADIENT_REACTIVE =
  'linear-gradient(to bottom, var(--vdl-800) var(--ag-g1, 0%), var(--vdl-950) var(--ag-g2, 50%), transparent 100%)';

const GLOW_REACTIVE = `
  radial-gradient(ellipse at 25% var(--ag-glow-y1, 35%), color-mix(in srgb, var(--vdl-900) 40%, transparent) 0%, transparent 70%),
  radial-gradient(ellipse at 80% var(--ag-glow-y2, 25%), color-mix(in srgb, var(--vdl-900) 25%, transparent) 0%, transparent 60%)
`;

/* ── Highlight mode: 대각선 방향 + 넓은 stop 범위 + glow 드러남 ── */

const GRADIENT_HIGHLIGHT = `
  linear-gradient(to top left, var(--vdl-600) 0%, var(--vdl-950) 40%, var(--vdl-950) 100%)
`;

const GLOW_HIGHLIGHT = `
  radial-gradient(ellipse at 70% 75%, color-mix(in srgb, var(--vdl-400) 45%, transparent) 0%, transparent 55%),
  radial-gradient(ellipse at 15% 25%, color-mix(in srgb, var(--vdl-700) 15%, transparent) 0%, transparent 50%)
`;

/**
 * AmbientGrainedBackground 컴포넌트
 *
 * violetGray 950/900 기반 모노톤 ambient grained gradient 배경.
 * position: fixed로 뷰포트 전체를 덮는 독립 배경 레이어.
 * 스크롤 대상이 아니며, 콘텐츠 뒤에 깔린다.
 * hasScrollReactive 활성화 시 스크롤 속도에 반응하여 gradient stop이 벌어지고,
 * 스크롤이 멈추면 감쇠하며 원래 상태로 돌아간다.
 * highlight 모드: 'ag-highlight' CustomEvent로 제어. 그라데이션 방향이 반전되고
 * 숨어있던 glow(vdl-600)가 드러난다. CSS transition으로 부드럽게 전환.
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

  /* ── Scroll-reactive: velocity → gradient stop shift + decay ── */
  useEffect(() => {
    if (!hasScrollReactive) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    const el = localRef.current;
    if (!el) return;

    const SENSITIVITY = 0.04;
    const DECAY = 0.93;
    const THRESHOLD = 0.005;

    let prevScrollTop = -1;
    let intensity = 0;
    let rafId = null;

    const apply = (t) => {
      el.style.setProperty('--ag-g1', `${lerp(0, 10, t)}%`);
      el.style.setProperty('--ag-g2', `${lerp(50, 58, t)}%`);
      el.style.setProperty('--ag-glow-y1', `${lerp(35, 42, t)}%`);
      el.style.setProperty('--ag-glow-y2', `${lerp(25, 32, t)}%`);
      el.style.setProperty('--ag-glow-opacity', String(lerp(1, 0.85, t)));
    };

    /* 감쇠 루프: 스크롤 멈추면 intensity를 0으로 서서히 되돌린다 */
    const tick = () => {
      intensity *= DECAY;
      if (intensity < THRESHOLD) {
        intensity = 0;
        apply(0);
        rafId = null;
        return;
      }
      apply(intensity);
      rafId = requestAnimationFrame(tick);
    };

    /* capture: true — Storybook iframe 내부 스크롤도 잡는다 */
    const onScroll = (e) => {
      const src = e.target === document
        ? (document.scrollingElement || document.documentElement)
        : e.target;
      if (!src || src.scrollTop == null) return;

      const scrollTop = src.scrollTop;
      if (prevScrollTop < 0) { prevScrollTop = scrollTop; return; }

      const delta = Math.abs(scrollTop - prevScrollTop);
      prevScrollTop = scrollTop;

      intensity = Math.min(intensity + delta * SENSITIVITY, 1);
      apply(intensity);

      /* 감쇠 루프가 안 돌고 있으면 시작 */
      if (rafId == null) {
        rafId = requestAnimationFrame(tick);
      }
    };

    apply(0);
    document.addEventListener('scroll', onScroll, { capture: true, passive: true });

    return () => {
      document.removeEventListener('scroll', onScroll, { capture: true });
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, [hasScrollReactive]);

  /* ── Highlight mode: ag-highlight CustomEvent로 레이어 토글 ── */
  useEffect(() => {
    const el = localRef.current;
    if (!el) return;

    const TRANSITION = '0.8s ease';

    const onHighlight = (e) => {
      const active = e.detail?.active;
      const defaultGradient = el.querySelector('[data-layer="gradient-default"]');
      const highlightGradient = el.querySelector('[data-layer="gradient-highlight"]');
      const highlightGlow = el.querySelector('[data-layer="glow-highlight"]');

      if (defaultGradient) {
        defaultGradient.style.transition = `opacity ${TRANSITION}`;
        defaultGradient.style.opacity = active ? '0' : '1';
      }
      if (highlightGradient) {
        highlightGradient.style.transition = `opacity ${TRANSITION}`;
        highlightGradient.style.opacity = active ? '1' : '0';
      }
      if (highlightGlow) {
        highlightGlow.style.transition = `opacity ${TRANSITION}`;
        highlightGlow.style.opacity = active ? '1' : '0';
      }
    };

    window.addEventListener('ag-highlight', onHighlight);
    return () => window.removeEventListener('ag-highlight', onHighlight);
  }, []);

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
      {/* L2 — Ambient Glow (default) */}
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

      {/* L2b — Highlight Glow (숨겨진 상태, ag-highlight 이벤트로 드러남) */}
      {hasGlow && (
        <Box
          data-layer="glow-highlight"
          sx={{
            position: 'absolute',
            width: '140%',
            height: '120%',
            top: '-10%',
            left: '-20%',
            background: GLOW_HIGHLIGHT,
            opacity: 0,
          }}
        />
      )}

      {/* L3 — Section Gradient (default) */}
      <Box
        data-layer="gradient-default"
        sx={{
          position: 'absolute',
          inset: 0,
          background: hasScrollReactive ? GRADIENT_REACTIVE : GRADIENT_STATIC,
        }}
      />

      {/* L3b — Highlight Gradient (방향 반전, 숨겨진 상태) */}
      <Box
        data-layer="gradient-highlight"
        sx={{
          position: 'absolute',
          inset: 0,
          background: GRADIENT_HIGHLIGHT,
          opacity: 0,
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

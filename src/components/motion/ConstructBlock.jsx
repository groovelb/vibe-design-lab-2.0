'use client';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useInView } from '../../hooks/useInView';
import { CURSOR_RATIO, EASE_OUT } from './constants';
import { playConstructClick } from './constructSounds';

const GRID_SLOTS = 16;
const ACTIVE_COUNT = 7;
const SHUFFLE_INTERVAL = 80;

/**
 * ConstructBlock 컴포넌트
 *
 * Construct 브랜드 키 비주얼의 문단 스캔 리빌 모션 컨테이너.
 * 블록 높이의 수직 라인이 좌→우로 sweep하며 clip-path 마스킹을 해제.
 * 라인을 12등분한 그리드 중 5개가 on 상태로 배치되며,
 * sweep 진행 중 on 위치가 계속 셔플되어 동적 생성 효과를 표현.
 *
 * @param {string} text - 표시할 텍스트 [Required]
 * @param {string} variant - MUI Typography variant [Optional, 기본값: 'body1']
 * @param {number} duration - 스캔 소요시간 (ms) [Optional, 기본값: 800]
 * @param {boolean} isTriggerOnView - 뷰포트 진입 시 자동 트리거 여부 [Optional, 기본값: true]
 * @param {number} delay - 시작 지연 (ms) [Optional, 기본값: 0]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <ConstructBlock
 *   text="채용 시장은 디자인 엔지니어를 찾는데. 나는 Figma 안에서만 영향력이 있다."
 *   variant="body1"
 *   duration={800}
 *   isTriggerOnView
 * />
 */
const ConstructBlock = forwardRef(function ConstructBlock(
  {
    text,
    variant = 'body1',
    duration = 800,
    isTriggerOnView = true,
    delay = 0,
    sx,
    ...props
  },
  forwardedRef,
) {
  const [inViewRef, isInView] = useInView({
    trigger: 0.1,
    delay,
    isEnabled: isTriggerOnView,
  });

  const [isActive, setIsActive] = useState(false);
  const [slotPx, setSlotPx] = useState(4);
  const [slotPositions, setSlotPositions] = useState([]);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const lineRef = useRef(null);
  const slotRefs = useRef([]);

  const mergedRef = useCallback(
    (el) => {
      containerRef.current = el;
      inViewRef(el);
      if (typeof forwardedRef === 'function') forwardedRef(el);
      else if (forwardedRef) forwardedRef.current = el;
    },
    [inViewRef, forwardedRef],
  );

  /** 뷰포트 트리거 */
  useEffect(() => {
    if (isTriggerOnView && isInView) setIsActive(true);
  }, [isTriggerOnView, isInView]);

  /** 수동 트리거 */
  useEffect(() => {
    if (isTriggerOnView) return;
    const t = setTimeout(() => setIsActive(true), delay);
    return () => clearTimeout(t);
  }, [isTriggerOnView, delay]);

  /** 블록 높이 측정 → 슬롯 크기 + 위치(px) 계산 */
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const blockHeight = el.offsetHeight;
    const size = Math.floor(blockHeight / GRID_SLOTS);
    const positions = Array.from({ length: GRID_SLOTS }, (_, i) =>
      Math.round((i / (GRID_SLOTS - 1)) * (blockHeight - size)),
    );
    setSlotPx(size);
    setSlotPositions(positions);
  }, [text, variant]);

  /** Sweep 애니메이션 — 12그리드 중 5개 on, 셔플 */
  useEffect(() => {
    if (!isActive) return;

    const textEl = textRef.current;
    const lineEl = lineRef.current;
    if (!textEl || !lineEl) return;

    const blockWidth = textEl.offsetWidth;

    /** 랜덤으로 ACTIVE_COUNT개 인덱스 선택 (Fisher-Yates 부분 셔플) */
    const pickActive = () => {
      const indices = Array.from({ length: GRID_SLOTS }, (_, i) => i);
      for (let i = indices.length - 1; i > indices.length - 1 - ACTIVE_COUNT; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      return new Set(indices.slice(-ACTIVE_COUNT));
    };

    let activeSet = pickActive();

    /** 슬롯 on/off 반영 */
    const applySlots = () => {
      slotRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.opacity = activeSet.has(i) ? '1' : '0.01';
      });
    };

    applySlots();
    lineEl.style.opacity = '1';

    let lastShuffleTime = 0;
    const startTime = performance.now();
    let rafId;

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      textEl.style.clipPath = `inset(0 ${(1 - progress) * 100}% 0 0)`;
      lineEl.style.transform = `translate3d(${progress * blockWidth}px, 0, 0)`;

      if (now - lastShuffleTime > SHUFFLE_INTERVAL) {
        lastShuffleTime = now;
        activeSet = pickActive();
        applySlots();
      }

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        lineEl.style.opacity = '0.01';
        textEl.style.clipPath = 'inset(0 0 0 0)';
        playConstructClick();
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isActive, duration, slotPx]);

  return (
    <Box ref={mergedRef} sx={{ position: 'relative', ...sx }} {...props}>
      {/* 텍스트 — clip-path로 좌→우 리빌 */}
      <Typography
        ref={textRef}
        variant={variant}
        sx={{
          clipPath: 'inset(0 100% 0 0)',
          '@media (prefers-reduced-motion: reduce)': {
            clipPath: 'none',
          },
        }}
      >
        {text}
      </Typography>

      {/* Sweep 라인 — 12그리드 중 5개 on */}
      <Box
        ref={lineRef}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          opacity: 0.01,
          transition: `opacity 150ms ${EASE_OUT}`,
          willChange: 'transform',
          pointerEvents: 'none',
          '@media (prefers-reduced-motion: reduce)': {
            display: 'none',
          },
        }}
      >
        {Array.from({ length: GRID_SLOTS }).map((_, i) => (
          <Box
            key={i}
            ref={(el) => { slotRefs.current[i] = el; }}
            sx={{
              position: 'absolute',
              left: 0,
              top: slotPositions[i] ?? 0,
              width: slotPx,
              height: slotPx,
              backgroundColor: 'primary.main',
              opacity: 0.01,
              transition: `opacity ${SHUFFLE_INTERVAL}ms ${EASE_OUT}`,
              willChange: 'opacity',
            }}
          />
        ))}
      </Box>
    </Box>
  );
});

export { ConstructBlock };

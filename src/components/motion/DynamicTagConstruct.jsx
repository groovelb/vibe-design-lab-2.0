'use client';
import { forwardRef, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { useInView } from '../../hooks/useInView';

/** 앵커 크기 (px) */
const ANCHOR_SIZE = 6;
/** 초기 시작 크기 = 앵커 1개 (px) */
const TAG_W = ANCHOR_SIZE;
const TAG_H = ANCHOR_SIZE;
/** 이징 — 극단적 로그 커브: 폭발적 시작 + 긴 감속 꼬리 */
const SPRING = 'cubic-bezier(0, 0.95, 0.05, 1)';
/** 이징 — 부드러운 페이드용 */
const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';
/** 단계별 타이밍 (ms) */
const T = { tag: 80, scatter: 250, settle: 40, reveal: 150 };

/**
 * DynamicTagConstruct 컴포넌트
 *
 * HTML 태그가 생성되는 과정을 시각화하는 모션 컨테이너.
 * 중앙에 작은 사각형(태그)이 등장 → 4개 꼭지점 앵커로 분산 →
 * 윤곽선이 그려지며 원래 컨테이너 크기로 확장 → 앵커/윤곽선 퇴장 → 콘텐츠 등장.
 *
 * 동작 흐름:
 * 1. idle: 콘텐츠 투명(0.01), 오버레이 대기
 * 2. tag: 중앙에 작은 사각형 등장 (scale 0→1)
 * 3. scatter: 사각형의 4 꼭지점이 앵커로 분리, 컨테이너 모서리로 이동하며 윤곽선 드로잉
 * 4. reveal: 앵커+윤곽선 페이드아웃, 콘텐츠 페이드인
 * 5. done: 오버레이 제거, 콘텐츠 완전 표시
 *
 * Props:
 * @param {React.ReactNode} children - 애니메이션 후 등장할 콘텐츠 [Required]
 * @param {boolean} isTriggerOnView - 뷰포트 진입 시 자동 트리거 여부 [Optional, 기본값: true]
 * @param {number} delay - 시작 지연 (ms) [Optional, 기본값: 0]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <DynamicTagConstruct>
 *   <img src="/hero.png" style={{ width: '100%' }} />
 * </DynamicTagConstruct>
 */
const DynamicTagConstruct = forwardRef(function DynamicTagConstruct(
  { children, isTriggerOnView = true, delay = 0, sx, ...props },
  forwardedRef,
) {
  const innerRef = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [phase, setPhase] = useState('idle');

  const [inViewRef, isInView] = useInView({
    trigger: 'center',
    delay,
    isEnabled: isTriggerOnView,
  });

  /** ref 병합 */
  const handleRef = (el) => {
    innerRef.current = el;
    inViewRef(el);
    if (typeof forwardedRef === 'function') forwardedRef(el);
    else if (forwardedRef) forwardedRef.current = el;
  };

  /** 컨테이너 크기 측정 */
  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const update = () => setSize({ w: el.offsetWidth, h: el.offsetHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /** 뷰포트 진입 또는 즉시 시작 */
  useEffect(() => {
    if (!isTriggerOnView) {
      const t = setTimeout(() => setPhase('tag'), delay);
      return () => clearTimeout(t);
    }
    if (isInView && phase === 'idle') setPhase('tag');
  }, [isTriggerOnView, isInView, delay, phase]);

  /** 단계 전이 */
  useEffect(() => {
    let t;
    switch (phase) {
      case 'tag':
        t = setTimeout(() => setPhase('scatter'), T.tag);
        break;
      case 'scatter':
        t = setTimeout(() => setPhase('reveal'), T.scatter + T.settle);
        break;
      case 'reveal':
        t = setTimeout(() => setPhase('done'), T.reveal + 150);
        break;
    }
    return () => clearTimeout(t);
  }, [phase]);

  const { w, h } = size;
  const isVisible = phase !== 'idle';
  const isExpanded = phase === 'scatter';
  const isExiting = phase === 'reveal' || phase === 'done';
  const showContent = phase === 'done';

  /** 앵커 반크기 (중앙 정렬용) */
  const AH = ANCHOR_SIZE / 2;
  /** 태그→컨테이너 비율 */
  const rX = w > 0 ? TAG_W / w : 0;
  const rY = h > 0 ? TAG_H / h : 0;
  const offX = w - TAG_W;
  const offY = h - TAG_H;

  /** 앵커: 태그 꼭지점 → 컨테이너 꼭지점으로 확장 */
  const anchors =
    w > 0
      ? [
        { x: -AH, y: -AH, tx: -AH, ty: -AH },
        { x: TAG_W - AH, y: -AH, tx: w - AH, ty: -AH },
        { x: -AH, y: TAG_H - AH, tx: -AH, ty: h - AH },
        { x: TAG_W - AH, y: TAG_H - AH, tx: w - AH, ty: h - AH },
      ]
      : [];

  return (
    <Box ref={handleRef} sx={{ position: 'relative', ...sx }} {...props}>
      {/* 콘텐츠 레이어 */}
      <Box
        sx={{
          opacity: showContent ? 1 : 0.01,
          transition: 'opacity 600ms cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'opacity',
          '@media (prefers-reduced-motion: reduce)': {
            opacity: 1,
            transition: 'none',
          },
        }}
      >
        {children}
      </Box>

      {/* 애니메이션 오버레이 */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          '@media (prefers-reduced-motion: reduce)': { display: 'none' },
        }}
      >
        {/* 상변 */}
        <Box
          sx={{
            position: 'absolute',
            top: '-0.25px',
            left: 0,
            right: 0,
            height: '0.5px',
            backgroundColor: 'divider',
            transformOrigin: 'left',
            transform: isExpanded
              ? 'scaleX(1)'
              : phase === 'tag'
                ? `scaleX(${rX})`
                : 'scaleX(0)',
            opacity: isVisible ? 1 : 0.01,
            transition: isExiting
              ? `transform ${T.reveal}ms ${EASE_OUT}`
              : `transform ${T.scatter}ms ${SPRING}, opacity ${T.tag}ms ${EASE_OUT}`,
            willChange: 'transform',
          }}
        />
        {/* 좌변 */}
        <Box
          sx={{
            position: 'absolute',
            left: '-0.25px',
            top: 0,
            bottom: 0,
            width: '0.5px',
            backgroundColor: 'divider',
            transformOrigin: 'top',
            transform: isExpanded
              ? 'scaleY(1)'
              : phase === 'tag'
                ? `scaleY(${rY})`
                : 'scaleY(0)',
            opacity: isVisible ? 1 : 0.01,
            transition: isExiting
              ? `transform ${T.reveal}ms ${EASE_OUT}`
              : `transform ${T.scatter}ms ${SPRING}, opacity ${T.tag}ms ${EASE_OUT}`,
            willChange: 'transform',
          }}
        />
        {/* 하변 */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '-0.25px',
            left: 0,
            right: 0,
            height: '0.5px',
            backgroundColor: 'divider',
            transformOrigin: 'left',
            transform: isExpanded
              ? 'translateY(0px) scaleX(1)'
              : phase === 'tag'
                ? `translateY(${-offY}px) scaleX(${rX})`
                : isExiting
                  ? 'translateY(0px) scaleX(0)'
                  : `translateY(${-offY}px) scaleX(0)`,
            opacity: isVisible ? 1 : 0.01,
            transition: isExiting
              ? `transform ${T.reveal}ms ${EASE_OUT}`
              : `transform ${T.scatter}ms ${SPRING}, opacity ${T.tag}ms ${EASE_OUT}`,
            willChange: 'transform',
          }}
        />
        {/* 우변 */}
        <Box
          sx={{
            position: 'absolute',
            right: '-0.25px',
            top: 0,
            bottom: 0,
            width: '0.5px',
            backgroundColor: 'divider',
            transformOrigin: 'top',
            transform: isExpanded
              ? 'translateX(0px) scaleY(1)'
              : phase === 'tag'
                ? `translateX(${-offX}px) scaleY(${rY})`
                : isExiting
                  ? 'translateX(0px) scaleY(0)'
                  : `translateX(${-offX}px) scaleY(0)`,
            opacity: isVisible ? 1 : 0.01,
            transition: isExiting
              ? `transform ${T.reveal}ms ${EASE_OUT}`
              : `transform ${T.scatter}ms ${SPRING}, opacity ${T.tag}ms ${EASE_OUT}`,
            willChange: 'transform',
          }}
        />

        {/* 앵커 — 엣지 수축 완료 후 페이드아웃 */}
        {anchors.map((a, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: ANCHOR_SIZE,
              height: ANCHOR_SIZE,
              backgroundColor: 'divider',
              transform: isExpanded || isExiting
                ? `translate3d(${a.tx}px, ${a.ty}px, 0)`
                : `translate3d(${a.x}px, ${a.y}px, 0)`,
              opacity: isExiting ? 0 : isVisible ? 1 : 0.01,
              transition: isExiting
                ? `opacity 150ms ${EASE_OUT} ${T.reveal}ms`
                : `transform ${T.scatter}ms ${SPRING}, opacity ${T.tag}ms ${EASE_OUT}`,
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </Box>
    </Box>
  );
});

export { DynamicTagConstruct };

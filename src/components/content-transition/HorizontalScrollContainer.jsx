'use client';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

/**
 * smoothstep 이징: t ∈ [0,1] → 부드러운 S-curve
 * 각 스냅 구간 내에서 가속→감속 전환 생성
 */
function smoothstep(t) {
  return t * t * (3 - 2 * t);
}

/**
 * HorizontalScrollContainer - 가로 스크롤 컨테이너
 *
 * 세로 스크롤을 가로 이동으로 변환하는 순수 컨테이너입니다.
 * 주어진 콘텐츠만큼만 스크롤하고, 마지막 아이템이 화면에 완전히 들어오는 순간
 * 즉시 세로 스크롤로 전환됩니다.
 *
 * 동작 원리:
 * 1. 트랙의 실제 렌더링 너비(px)를 측정
 * 2. 가로 이동 거리 = 트랙 scrollWidth - 뷰포트 너비
 * 3. 세로 스크롤 영역 = 뷰포트 높이 + 가로 이동 거리 (px 단위 정확 매핑)
 * 4. scrollYProgress [0→1]을 가로 이동 [0→-distance px]에 선형 매핑
 *
 * Props:
 * @param {React.ReactNode} children - HorizontalScrollContainer.Slide로 감싼 슬라이드들 [Required]
 * @param {string} gap - 슬라이드 간 간격 (CSS 단위) [Optional, 기본값: '0px']
 * @param {string} padding - 좌우 패딩 (CSS 단위) [Optional, 기본값: '0px']
 * @param {string} backgroundColor - 배경색 [Optional, 기본값: 'transparent']
 * @param {React.ReactNode} header - 슬라이드 트랙 상단 고정 콘텐츠 [Optional]
 * @param {React.ReactNode} footer - 슬라이드 트랙 하단 고정 콘텐츠 [Optional]
 * @param {string} headerSpacing - header 하단 여백 (CSS 단위) [Optional, 기본값: '0px']
 * @param {string} footerSpacing - footer 상단 여백 (CSS 단위) [Optional, 기본값: '0px']
 * @param {function} onScrollProgress - 스크롤 진행도 콜백 (0-1) [Optional]
 * @param {number} snapCount - 스냅 포인트 수 (슬라이드 개수). 지정 시 캐러셀 스냅 동작 [Optional]
 *
 * Example usage:
 * <HorizontalScrollContainer gap="24px" padding="40px" snapCount={6}>
 *   <HorizontalScrollContainer.Slide>콘텐츠1</HorizontalScrollContainer.Slide>
 *   <HorizontalScrollContainer.Slide>콘텐츠2</HorizontalScrollContainer.Slide>
 *   <HorizontalScrollContainer.Slide>콘텐츠3</HorizontalScrollContainer.Slide>
 * </HorizontalScrollContainer>
 */
function HorizontalScrollContainer({
  children,
  gap = '0px',
  padding = '0px',
  backgroundColor = 'transparent',
  header,
  footer,
  headerSpacing = '0px',
  footerSpacing = '0px',
  onScrollProgress,
  snapCount,
}) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollDistance, setScrollDistance] = useState(0);

  // 실제 렌더링된 트랙 너비를 측정하여 정확한 스크롤 거리 계산 (px)
  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const trackWidth = trackRef.current.getBoundingClientRect().width;
      const viewportWidth = window.innerWidth;
      setScrollDistance(Math.max(0, trackWidth - viewportWidth));
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [children, gap, padding]);

  // 세로 스크롤 영역 높이 = 뷰포트 높이 + 가로 이동 거리 (px)
  // → scrollYProgress 1 도달 = 마지막 아이템 완전 노출 = 즉시 세로 스크롤 전환
  const containerHeight = window.innerHeight + scrollDistance;

  // 스크롤 진행도 추적
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  /**
   * snapProgress: raw progress(0-1)를 스냅 이징된 progress로 변환
   * snapCount가 없으면 raw를 그대로 반환 (선형)
   * 각 구간 내에서 smoothstep 이징 적용 → 카드별 스냅 동작
   */
  const snapProgress = useCallback((raw) => {
    if (!snapCount || snapCount <= 1) return raw;
    const steps = snapCount - 1;
    const stepSize = 1 / steps;
    const segment = raw / stepSize;
    const idx = Math.min(Math.floor(segment), steps - 1);
    const t = Math.min(segment - idx, 1);
    return Math.min((idx + smoothstep(t)) / steps, 1);
  }, [snapCount]);

  // 스크롤 진행도 콜백 호출 (스냅 적용)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    onScrollProgress?.(snapProgress(v));
  });

  /** reduced-motion 감지 시 가로 스크롤 효과 비활성화 */
  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 가로 이동 변환: 0px → -scrollDistance px (스냅 적용)
  const x = useTransform(scrollYProgress, (latest) => {
    if (prefersReducedMotion) return 0;
    return -snapProgress(latest) * scrollDistance;
  });

  return (
    <Box
      ref={ containerRef }
      component="section"
      sx={ {
        height: containerHeight,
        position: 'relative',
        minWidth: 0,
      } }
    >
      {/* Sticky 컨테이너 - 화면에 고정 */}
      <Box
        sx={ {
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          backgroundColor,
          display: 'flex',
          flexDirection: 'column',
          pt: headerSpacing,
          pb: footerSpacing,
        } }
      >
        {/* 상단 고정 콘텐츠 */}
        { header && (
          <Box sx={ { flexShrink: 0, px: padding } }>
            { header }
          </Box>
        ) }

        {/* 가로 슬라이드 트랙 */}
        <Box sx={ { flex: 1, overflow: 'hidden' } }>
          <motion.div
            ref={ trackRef }
            style={ {
              x,
              display: 'flex',
              width: 'max-content',
              gap,
              alignItems: 'center',
              height: '100%',
              paddingLeft: padding,
              paddingRight: padding,
            } }
          >
            { children }
          </motion.div>
        </Box>

        {/* 하단 고정 콘텐츠 */}
        { footer && (
          <Box sx={ { flexShrink: 0, px: padding } }>
            { footer }
          </Box>
        ) }
      </Box>
    </Box>
  );
}

/**
 * HorizontalScrollContainer.Slide - 슬라이드 아이템
 *
 * Props:
 * @param {React.ReactNode} children - 슬라이드 내부 콘텐츠 [Required]
 */
function Slide({ children }) {
  return (
    <Box
      sx={ {
        position: 'relative',
        width: 'fit-content',
        height: 'fit-content',
        flexShrink: 0,
      } }
    >
      { children }
    </Box>
  );
}

HorizontalScrollContainer.Slide = Slide;

export { HorizontalScrollContainer };

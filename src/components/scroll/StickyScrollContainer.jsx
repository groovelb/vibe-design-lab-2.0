'use client';
import { useRef } from 'react';
import Box from '@mui/material/Box';
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

/**
 * StickyScrollContainer - 스크롤 연동 고정 컨테이너
 *
 * 세로 스크롤 구간 동안 children을 뷰포트에 고정(sticky)하고,
 * 스크롤 진행률(0→1)을 콜백으로 전달한다.
 * progress가 1에 도달하면 자연스럽게 sticky가 해제된다.
 *
 * 동작 원리:
 * 1. 외부 Box가 scrollLength × 100vh 높이로 스크롤 공간을 확보
 * 2. 내부 sticky Box가 뷰포트에 고정되어 children을 표시
 * 3. framer-motion useScroll로 진행률(0→1)을 추적하여 콜백 전달
 * 4. 스크롤이 외부 Box 끝에 도달하면 sticky 자연 해제
 *
 * @param {React.ReactNode} children - 고정될 콘텐츠 [Required]
 * @param {number} scrollLength - 스크롤 구간 길이 (뷰포트 배수) [Optional, 기본값: 3]
 * @param {function} onScrollProgress - 스크롤 진행률 콜백 (0→1) [Optional]
 * @param {object} sx - 외부 컨테이너 추가 스타일 [Optional]
 * @param {object} stickySx - sticky 내부 컨테이너 추가 스타일 [Optional]
 *
 * Example usage:
 * <StickyScrollContainer onScrollProgress={setProgress}>
 *   <Content />
 * </StickyScrollContainer>
 */
function StickyScrollContainer({
  children,
  scrollLength = 3,
  onScrollProgress,
  sx,
  stickySx,
}) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    onScrollProgress?.(v);
  });

  return (
    <Box
      ref={containerRef}
      sx={{
        height: `${scrollLength * 100}vh`,
        position: 'relative',
        ...sx,
      }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          overflow: 'hidden',
          ...stickySx,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export { StickyScrollContainer };

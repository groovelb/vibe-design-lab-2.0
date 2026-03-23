'use client';
import { useRef } from 'react';
import Box from '@mui/material/Box';
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * ParallaxLayer 컴포넌트
 *
 * 스크롤 속도 배수로 translateY를 제어하는 패럴럭스 래퍼.
 * speed > 1이면 콘텐츠가 자연 스크롤보다 빠르게 이동하고,
 * speed < 1이면 느리게 이동한다 (배경 고정 효과).
 *
 * @param {React.ReactNode} children - 내부 콘텐츠 [Required]
 * @param {number} speed - 스크롤 속도 배수. 1=기본, >1=빠르게, <1=느리게 [Optional, 기본값: 1]
 * @param {string[]} offset - Framer Motion useScroll offset 배열 [Optional, 기본값: ['start start', 'end start']]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <ParallaxLayer speed={1.3}>
 *   <Content />
 * </ParallaxLayer>
 */
function ParallaxLayer({
  children,
  speed = 1,
  offset = ['start start', 'end start'],
  sx,
}) {
  const containerRef = useRef(null);

  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset,
  });

  // speed=1 → 0px 이동, speed=1.3 → 스크롤 끝에서 -30vh 추가 이동
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ['0%', '0%'] : ['0%', `${(speed - 1) * -100}%`],
  );

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        ...sx,
      }}
    >
      <motion.div
        style={{
          y,
          width: '100%',
          height: '100%',
        }}
      >
        {children}
      </motion.div>
    </Box>
  );
}

export { ParallaxLayer };

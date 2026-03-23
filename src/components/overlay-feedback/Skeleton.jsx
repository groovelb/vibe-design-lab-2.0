'use client';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import { EASE_OUT } from '../motion/constants';

/**
 * Skeleton 컴포넌트
 *
 * 콘텐츠 로딩 전 표시하는 미세한 면(surface) 플레이스홀더.
 * divider 색상의 낮은 투명도 면이 느린 펄스로 존재감을 암시한다.
 *
 * @param {string|number} width - 폭 [Optional, 기본값: '100%']
 * @param {string|number} height - 높이 [Optional, 기본값: '1em']
 * @param {boolean} isVisible - 표시 여부 (false 시 fade-out) [Optional, 기본값: true]
 * @param {number} animationDelay - 펄스 시작 지연 (s) [Optional, 기본값: 0]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <Skeleton width="72%" height="1.2em" />
 * <Skeleton width={200} height="0.9em" isVisible={false} />
 */
const Skeleton = forwardRef(function Skeleton(
  {
    width = '100%',
    height = '1em',
    isVisible = true,
    animationDelay = 0,
    sx,
    ...props
  },
  ref,
) {
  return (
    <Box
      ref={ref}
      sx={{
        width,
        height,
        bgcolor: 'divider',
        '@keyframes skeletonPulse': {
          '0%, 100%': { opacity: 0.03 },
          '50%': { opacity: 0.1 },
        },
        '@keyframes skeletonOut': {
          to: { opacity: 0.01 },
        },
        animation: isVisible
          ? `skeletonPulse 3s ease-in-out infinite ${animationDelay}s`
          : `skeletonOut 200ms ${EASE_OUT} forwards`,
        '@media (prefers-reduced-motion: reduce)': {
          animation: 'none',
          opacity: isVisible ? 0.06 : 0.01,
          transition: `opacity 200ms ${EASE_OUT}`,
        },
        ...sx,
      }}
      {...props}
    />
  );
});

export { Skeleton };

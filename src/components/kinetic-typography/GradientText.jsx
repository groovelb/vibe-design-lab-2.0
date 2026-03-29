'use client';
import { keyframes } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const gradientLoopKf = keyframes`
  0%   { background-position: 0% center; }
  100% { background-position: 200% center; }
`;

const DEFAULT_COLORS = [
  'var(--vdl-50)',
  'var(--vdl-400)',
  'var(--vdl-100)',
  'var(--vdl-600)',
  'var(--vdl-50)',
];

/**
 * GradientText 컴포넌트
 *
 * 루핑 그라디언트가 배경으로 마스킹되는 타이포그래피.
 * CSS background-clip: text + background-position 애니메이션 기반.
 * 리렌더링 없이 GPU 가속으로 동작한다.
 *
 * @param {ReactNode} children - 텍스트 [Required]
 * @param {string[]} colors - 그라디언트 색상 배열 [Optional, 기본값: VDL scale]
 * @param {number} duration - 한 사이클 시간(초) [Optional, 기본값: 6]
 * @param {number} angle - 그라디언트 각도(deg) [Optional, 기본값: 90]
 * @param {string} variant - MUI Typography variant [Optional, 기본값: 'h1']
 * @param {string} component - HTML 요소 [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <GradientText>바이브 디자인 랩</GradientText>
 * <GradientText colors={['#ee7752', '#e73c7e', '#23a6d5']} duration={4} variant="h2">
 *   Hello World
 * </GradientText>
 */
export function GradientText({
  children,
  colors = DEFAULT_COLORS,
  duration = 6,
  angle = 90,
  variant = 'h1',
  component,
  sx,
  ...props
}) {
  const gradient = `linear-gradient(${angle}deg, ${colors.join(', ')})`;

  return (
    <Typography
      variant={variant}
      component={component}
      sx={{
        background: gradient,
        backgroundSize: '200% auto',
        backgroundRepeat: 'repeat-x',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
        display: 'inline-block',
        animation: `${gradientLoopKf} ${duration}s linear infinite`,
        '@media (prefers-reduced-motion: reduce)': {
          animation: 'none',
          backgroundSize: '100% auto',
          backgroundPosition: '0% center',
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Typography>
  );
}

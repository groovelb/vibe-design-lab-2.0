'use client';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';

/**
 * GridBackground 컴포넌트
 *
 * 순수 CSS 기반의 Grid 배경 패턴.
 * dot 또는 line 스타일의 그리드를 배경에 렌더링하고,
 * children을 그 위에 표시한다.
 *
 * Props:
 * @param {string} variant - Grid 스타일 ('dot' | 'line') [Optional, 기본값: 'dot']
 * @param {number} opacity - 투명도 [Optional, 기본값: 0.15]
 * @param {node} children - 위에 렌더링될 콘텐츠 [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <GridBackground variant="dot">
 *   <HeroContent />
 * </GridBackground>
 */
const GridBackground = forwardRef(function GridBackground({
  variant = 'dot',
  opacity = 0.15,
  children,
  sx,
  ...props
}, ref) {
  /** grid.unit × 4 = 32px 기본 셀 크기 */
  const cellSize = 32;

  const getBackgroundPattern = () => {
    if (variant === 'dot') {
      return {
        backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
        backgroundSize: `${cellSize}px ${cellSize}px`,
      };
    }

    // line: 가로 + 세로 교차
    return {
      backgroundImage: `
        linear-gradient(to right, currentColor 1px, transparent 1px),
        linear-gradient(to bottom, currentColor 1px, transparent 1px)
      `,
      backgroundSize: `${cellSize}px ${cellSize}px`,
    };
  };

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        ...sx,
      }}
      {...props}
    >
      {/* Grid 패턴 레이어 */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          color: 'divider',
          opacity,
          pointerEvents: 'none',
          ...getBackgroundPattern(),
        }}
      />

      {/* 콘텐츠 레이어 */}
      {children && (
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          {children}
        </Box>
      )}
    </Box>
  );
});

export { GridBackground };

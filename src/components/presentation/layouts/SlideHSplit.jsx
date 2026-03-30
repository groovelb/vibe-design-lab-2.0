'use client';
import Box from '@mui/material/Box';
import { presentationTokens as t } from '../../../styles/themes/presentation';

/**
 * SlideHSplit 컴포넌트
 *
 * 수평 n등분 레이아웃. 2~4 컬럼 균등 분할.
 *
 * @param {ReactNode[]} children - 컬럼 콘텐츠 배열 [Required]
 * @param {number} columns - 컬럼 수 (2|3|4) [Optional, 기본값: children 길이 기반 자동]
 * @param {number} gap - 컬럼 간 간격 (px) [Optional, 기본값: spacing.element]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <SlideHSplit>
 *   <SlideTypoStack title="좌측" body="내용" />
 *   <SlideImage src="/img.png" alt="우측" />
 * </SlideHSplit>
 */
function SlideHSplit({ children, columns, gap = t.spacing.element, sx }) {
  const items = Array.isArray(children) ? children : [children];
  const cols = columns || Math.min(items.length, 4);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: `${gap}px`,
        width: '100%',
        height: '100%',
        alignItems: 'start',
        ...sx,
      }}
    >
      {items.map((child, i) => (
        <Box key={i} sx={{ minWidth: 0 }}>
          {child}
        </Box>
      ))}
    </Box>
  );
}

export { SlideHSplit };

'use client';
import Box from '@mui/material/Box';
import { presentationTokens as t } from '../../../styles/themes/presentation';

/**
 * SlideGrid 컴포넌트
 *
 * n×n 그리드 레이아웃.
 *
 * @param {ReactNode[]} children - 셀 콘텐츠 배열 [Required]
 * @param {number} columns - 컬럼 수 [Required]
 * @param {number} rows - 행 수 [Optional, children 길이에서 자동 계산]
 * @param {number} gap - 셀 간 간격 (px) [Optional, 기본값: spacing.element]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <SlideGrid columns={3}>
 *   <SlideTypoStack headline="1" body="내용" />
 *   <SlideTypoStack headline="2" body="내용" />
 *   <SlideTypoStack headline="3" body="내용" />
 *   <SlideTypoStack headline="4" body="내용" />
 *   <SlideTypoStack headline="5" body="내용" />
 *   <SlideTypoStack headline="6" body="내용" />
 * </SlideGrid>
 */
function SlideGrid({ children, columns, rows, gap = t.spacing.layout, sx }) {
  const items = (Array.isArray(children) ? children : [children]).flat();
  const rowCount = rows || Math.ceil(items.length / columns);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rowCount}, 1fr)`,
        gap: `${gap}px`,
        width: '100%',
        height: '100%',
        ...sx,
      }}
    >
      {items.map((child, i) => (
        <Box key={i} sx={{ minWidth: 0, minHeight: 0 }}>
          {child}
        </Box>
      ))}
    </Box>
  );
}

export { SlideGrid };

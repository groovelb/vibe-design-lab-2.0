'use client';
import { forwardRef, Children } from 'react';
import Box from '@mui/material/Box';

/**
 * PeekScroll 컴포넌트
 *
 * 가로 스크롤 + 다음 아이템 peek 패턴 컨테이너.
 * 아이템을 1col 너비로 배치하되, 다음 아이템이 peek만큼 노출되어
 * 스크롤 가능하다는 어포던스를 제공한다.
 * CSS scroll-snap으로 아이템 단위 정렬.
 *
 * @param {ReactNode} children - 스크롤할 아이템들 [Required]
 * @param {number} peek - 다음 아이템 노출 크기 (px) [Optional, 기본값: 40]
 * @param {number} gap - 아이템 간 간격 (px) [Optional, 기본값: 16]
 * @param {boolean} isSnapEnabled - scroll-snap 활성화 여부 [Optional, 기본값: true]
 * @param {number|string} inset - 좌우 여백 (px 또는 CSS 값). full-bleed 시 컨텐츠 정렬용 [Optional, 기본값: 0]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <PeekScroll peek={40} gap={16}>
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 * </PeekScroll>
 */
const PeekScroll = forwardRef(function PeekScroll(
  { children, peek = 40, gap = 16, isSnapEnabled = true, inset = 0, sx, ...props },
  ref,
) {
  const items = Children.toArray(children);
  const insetPx = typeof inset === 'number' ? `${inset}px` : inset;
  const hasInset = inset !== 0;

  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        gap: `${gap}px`,
        /* 스크롤바 숨김 */
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
        /* scroll-snap */
        ...(isSnapEnabled && {
          scrollSnapType: 'x mandatory',
          scrollPaddingLeft: hasInset ? insetPx : undefined,
        }),
        /* inset 여백 — 첫/끝 아이템 정렬 */
        ...(hasInset && {
          px: undefined,
          pl: undefined,
          pr: undefined,
          '&::before': {
            content: '""',
            flex: '0 0 auto',
            width: `calc(${insetPx} - ${gap}px)`,
          },
          '&::after': {
            content: '""',
            flex: '0 0 auto',
            width: `calc(${insetPx} - ${gap}px)`,
          },
        }),
        ...sx,
      }}
      {...props}
    >
      {items.map((child, index) => (
        <Box
          key={index}
          sx={{
            flex: '0 0 auto',
            width: `calc(100% - ${peek + gap}px)`,
            ...(isSnapEnabled && { scrollSnapAlign: 'start' }),
          }}
        >
          {child}
        </Box>
      ))}
    </Box>
  );
});

export { PeekScroll };

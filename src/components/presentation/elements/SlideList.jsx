'use client';
import Box from '@mui/material/Box';
import { presentationTokens as t } from '../../../styles/themes/presentation';

/**
 * SlideList 컴포넌트
 *
 * 불렛 또는 넘버 리스트. SlideTypoStack 계층과 독립.
 *
 * @param {string[]} items - 리스트 항목 [Required]
 * @param {string} variant - 'bullet' | 'number' [Optional, 기본값: 'bullet']
 * @param {string} level - 'headline' | 'body' 텍스트 크기 [Optional, 기본값: 'body']
 * @param {number} gap - 항목 간 간격 (px) [Optional, 기본값: spacing.tight]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <SlideList items={['항목 1', '항목 2', '항목 3']} />
 * <SlideList items={['첫째', '둘째']} variant="number" level="headline" />
 */
function SlideList({ items, variant = 'bullet', level = 'body', gap = t.spacing.text, sx }) {
  const scale = level === 'headline' ? t.typo.headline : t.typo.body;

  return (
    <Box
      component={variant === 'number' ? 'ol' : 'ul'}
      sx={{
        m: 0,
        pl: variant === 'number' ? `${scale.fontSize * 1.2}px` : `${scale.fontSize}px`,
        display: 'flex',
        flexDirection: 'column',
        gap: `${gap}px`,
        listStyleType: variant === 'number' ? 'decimal' : '"▪  "',
        ...sx,
      }}
    >
      {items.map((item, i) => (
        <Box
          key={i}
          component="li"
          sx={{
            fontFamily: t.fontFamily.body,
            fontSize: scale.fontSize,
            fontWeight: scale.fontWeight,
            lineHeight: scale.lineHeight,
            letterSpacing: scale.letterSpacing,
            color: t.color.text,
            whiteSpace: 'pre-line',
            '&::marker': {
              color: t.color.textSecondary,
            },
          }}
        >
          {item}
        </Box>
      ))}
    </Box>
  );
}

export { SlideList };

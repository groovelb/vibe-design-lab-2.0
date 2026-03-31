'use client';
import Box from '@mui/material/Box';
import { presentationTokens as t } from '../../../styles/themes/presentation';

/**
 * SlideStorytelling 컴포넌트
 *
 * 두 문장을 화살표(→/↓)로 연결하여 인과관계를 시각화.
 *
 * @param {string} from - 원인/질문 문장 [Required]
 * @param {string} to - 결과/답변 문장 [Required]
 * @param {string} arrowLabel - 화살표 옆 라벨 [Optional]
 * @param {string} direction - 'vertical' | 'horizontal' [Optional, 기본값: 'vertical']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <SlideStorytelling
 *   from="도구가 바뀌면 무엇이 남는가?"
 *   to="디자인 언어 체계가 남는다"
 * />
 */
function SlideStorytelling({ from, to, arrowLabel, direction = 'vertical', sx }) {
  const isVertical = direction === 'vertical';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isVertical ? 'column' : 'row',
        alignItems: 'center',
        gap: `${t.spacing.element}px`,
        ...sx,
      }}
    >
      {/* from 문장 */}
      <Box
        sx={{
          fontFamily: t.fontFamily.heading,
          fontSize: t.typo.subtitle.fontSize,
          fontWeight: t.typo.subtitle.fontWeight,
          lineHeight: t.typo.subtitle.lineHeight,
          letterSpacing: t.typo.subtitle.letterSpacing,
          color: t.color.text,
          textAlign: 'center',
          wordBreak: 'keep-all',
        }}
      >
        {from}
      </Box>

      {/* 화살표 — 직선 + filled 삼각촉 */}
      <Box sx={{
        display: 'flex',
        flexDirection: isVertical ? 'column' : 'row',
        alignItems: 'center',
        gap: 0,
      }}>
        <Box sx={{
          [isVertical ? 'width' : 'height']: '1px',
          [isVertical ? 'height' : 'width']: '40vh',
          bgcolor: t.color.arrow,
        }} />
        <Box
          component="svg"
          viewBox={isVertical ? '0 0 12 10' : '0 0 10 12'}
          sx={{
            width: isVertical ? 12 : 10,
            height: isVertical ? 10 : 12,
            display: 'block',
          }}
        >
          {isVertical
            ? <path d="M0,0 L6,10 L12,0 Z" fill={t.color.arrow} />
            : <path d="M0,0 L10,6 L0,12 Z" fill={t.color.arrow} />
          }
        </Box>
      </Box>

      {/* arrowLabel */}
      {arrowLabel && (
        <Box
          component="span"
          sx={{
            fontFamily: t.fontFamily.body,
            fontSize: t.typo.caption.fontSize,
            fontWeight: t.typo.caption.fontWeight,
            lineHeight: t.typo.caption.lineHeight,
            color: t.color.textSecondary,
            mt: isVertical ? `${t.spacing.tight}px` : 0,
            ml: isVertical ? 0 : `${t.spacing.tight}px`,
          }}
        >
          {arrowLabel}
        </Box>
      )}

      {/* to 문장 */}
      <Box
        sx={{
          fontFamily: t.fontFamily.heading,
          fontSize: t.typo.subtitle.fontSize,
          fontWeight: t.typo.title.fontWeight,
          lineHeight: t.typo.subtitle.lineHeight,
          letterSpacing: t.typo.subtitle.letterSpacing,
          color: t.color.accent,
          textAlign: 'center',
          wordBreak: 'keep-all',
        }}
      >
        {to}
      </Box>
    </Box>
  );
}

export { SlideStorytelling };

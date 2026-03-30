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
        }}
      >
        {from}
      </Box>

      {/* 화살표 + 라벨 */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: isVertical ? 'row' : 'column',
          alignItems: 'center',
          gap: `${t.spacing.tight}px`,
          color: t.color.arrow,
        }}
      >
        <Box
          component="span"
          sx={{
            fontFamily: t.fontFamily.body,
            fontSize: 32,
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          {isVertical ? '↓' : '→'}
        </Box>
        {arrowLabel && (
          <Box
            component="span"
            sx={{
              fontFamily: t.fontFamily.body,
              fontSize: t.typo.caption.fontSize,
              fontWeight: t.typo.caption.fontWeight,
              lineHeight: t.typo.caption.lineHeight,
              color: t.color.textSecondary,
            }}
          >
            {arrowLabel}
          </Box>
        )}
      </Box>

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
        }}
      >
        {to}
      </Box>
    </Box>
  );
}

export { SlideStorytelling };

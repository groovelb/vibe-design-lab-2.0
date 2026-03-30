'use client';
import Box from '@mui/material/Box';
import { presentationTokens as t } from '../../../styles/themes/presentation';

/**
 * SlideTypoStack 컴포넌트
 *
 * 4단 위계 텍스트 블록. 전달된 prop만 렌더링.
 * title → subtitle → headline → body 순서.
 *
 * @param {string} title - 타이틀 (title 스케일) [Optional]
 * @param {string} subtitle - 서브타이틀 (subtitle 스케일) [Optional]
 * @param {string} headline - 항목 헤드라인 (headline 스케일) [Optional]
 * @param {string|ReactNode} body - 본문 (body 스케일) [Optional]
 * @param {number} gap - 요소 간 간격 (px) [Optional, 기본값: spacing.element]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <SlideTypoStack
 *   title="디자인 택소노미"
 *   subtitle="15카테고리 분류 체계"
 *   body="컴포넌트와 스타일의 체계적 분류"
 * />
 */
function SlideTypoStack({ title, subtitle, headline, body, gap = t.spacing.element, sx }) {
  const layers = [
    { content: title, scale: t.typo.title, tag: 'h2' },
    { content: subtitle, scale: t.typo.subtitle, tag: 'h3' },
    { content: headline, scale: t.typo.headline, tag: 'h4' },
    { content: body, scale: t.typo.body, tag: 'p' },
  ];

  const visibleLayers = layers.filter((l) => l.content != null);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${gap}px`, ...sx }}>
      {visibleLayers.map(({ content, scale, tag }, i) => (
        <Box
          key={i}
          component={tag}
          sx={{
            fontFamily: t.fontFamily.heading,
            fontSize: scale.fontSize,
            fontWeight: scale.fontWeight,
            lineHeight: scale.lineHeight,
            letterSpacing: scale.letterSpacing,
            color: tag === 'p' ? t.color.textSecondary : t.color.text,
            m: 0,
          }}
        >
          {content}
        </Box>
      ))}
    </Box>
  );
}

export { SlideTypoStack };

'use client';
import Box from '@mui/material/Box';
import { presentationTokens as t } from '../../../styles/themes/presentation';

/**
 * SlideDescList 컴포넌트
 *
 * 제목 + 설명 쌍의 수직 반복 리스트.
 *
 * @param {{ title: string, desc: string }[]} items - 항목 배열 [Required]
 * @param {string} level - 제목 타이포 스케일 ('headline' | 'subtitle') [Optional, 기본값: 'headline']
 * @param {number} gap - 항목 간 간격 (px) [Optional, 기본값: spacing.element]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <SlideDescList
 *   items={[
 *     { title: '팀빌딩 스타트업', desc: '사업이 돌아가게 도와줍니다.' },
 *     { title: 'MVP 시장 진출', desc: '무엇을 어떻게 만들지 고민합니다.' },
 *   ]}
 *   level="headline"
 * />
 */
function SlideDescList({ items, level = 'headline', gap = t.spacing.element, sx }) {
  const titleScale = t.typo[level] || t.typo.headline;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: `${gap}px`,
        justifyContent: 'center',
        ...sx,
      }}
    >
      {items.map((item, i) => (
        <Box
          key={i}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: `${t.spacing.none}px`,
          }}
        >
          <Box
            component="h4"
            sx={{
              fontFamily: t.fontFamily.heading,
              fontSize: titleScale.fontSize,
              fontWeight: titleScale.fontWeight,
              lineHeight: titleScale.lineHeight,
              letterSpacing: titleScale.letterSpacing,
              color: t.color.text,
              whiteSpace: 'pre-line',
              m: 0,
            }}
          >
            {item.title}
          </Box>
          <Box
            component="p"
            sx={{
              fontFamily: t.fontFamily.body,
              fontSize: t.typo.body.fontSize,
              fontWeight: t.typo.body.fontWeight,
              lineHeight: t.typo.body.lineHeight,
              color: t.color.textSecondary,
              whiteSpace: 'pre-line',
              m: 0,
            }}
          >
            {item.desc}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export { SlideDescList };

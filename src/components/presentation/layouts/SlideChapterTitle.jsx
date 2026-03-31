'use client';
import Box from '@mui/material/Box';
import { presentationTokens as t } from '../../../styles/themes/presentation';

/**
 * SlideChapterTitle 컴포넌트
 *
 * 챕터 진입 슬라이드. overline + 타이틀 + 요약 + 목차.
 *
 * @param {string} overline - 챕터 라벨 (예: "CHAPTER 02") [Optional]
 * @param {string} title - 챕터 제목 [Required]
 * @param {string} summary - 챕터 요약 [Optional]
 * @param {string[]} toc - 목차 항목 배열 (falsy 값은 자동 생략) [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <SlideChapterTitle
 *   overline="CHAPTER 02"
 *   title="바이브 디자인: 관점의 전환"
 *   summary="이 챕터에서는 바이브 디자인의 핵심 개념을 소개합니다."
 *   toc={['왜 바이브 디자인인가', '디자인 택소노미 활용법', '프레임워크가 필요한 이유']}
 * />
 */
function SlideChapterTitle({ overline, title, summary, toc, sx }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        gap: `${t.spacing.element}px`,
        ...sx,
      }}
    >
      {/* Overline */}
      {overline && (
        <Box
          sx={{
            fontFamily: t.fontFamily.brand,
            fontSize: t.typo.caption.fontSize,
            fontWeight: 600,
            lineHeight: t.typo.caption.lineHeight,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: t.color.textSecondary,
            mb: `-${t.spacing.tight}px`,
          }}
        >
          {overline}
        </Box>
      )}

      {/* Title */}
      <Box
        component="h1"
        sx={{
          fontFamily: t.fontFamily.heading,
          fontSize: t.typo.title.fontSize,
          fontWeight: t.typo.title.fontWeight,
          lineHeight: t.typo.title.lineHeight,
          letterSpacing: t.typo.title.letterSpacing,
          color: t.color.text,
          whiteSpace: 'pre-line',
          m: 0,
        }}
      >
        {title}
      </Box>

      {/* Summary */}
      {summary && (
        <Box
          sx={{
            fontFamily: t.fontFamily.body,
            fontSize: t.typo.body.fontSize,
            fontWeight: t.typo.body.fontWeight,
            lineHeight: t.typo.body.lineHeight,
            color: t.color.textSecondary,
            whiteSpace: 'pre-line',
            maxWidth: '70%',
            mt: `-${t.spacing.tight}px`,
          }}
        >
          {summary}
        </Box>
      )}

      {/* Table of Contents */}
      {toc && toc.length > 0 && (
        <Box
          component="ul"
          sx={{
            m: 0,
            mt: `${t.spacing.section}px`,
            pl: `${t.typo.headline.fontSize * 1.2}px`,
            display: 'flex',
            flexDirection: 'column',
            gap: `${t.spacing.tight}px`,
            listStyleType: '"▪  "',
          }}
        >
          {toc.filter(Boolean).map((item, i) => (
            <Box
              key={i}
              component="li"
              sx={{
                fontFamily: t.fontFamily.body,
                fontSize: t.typo.headline.fontSize,
                fontWeight: t.typo.headline.fontWeight,
                lineHeight: t.typo.headline.lineHeight,
                color: t.color.text,
                '&::marker': { color: t.color.textTertiary },
              }}
            >
              {item}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

export { SlideChapterTitle };

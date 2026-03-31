'use client';
import Box from '@mui/material/Box';
import { presentationTokens as t } from '../../../styles/themes/presentation';

/**
 * SlideTitle 컴포넌트
 *
 * 슬라이드 내 h1 역할. 모든 레이아웃에서 공통 사용.
 *
 * @param {ReactNode} children - 타이틀 텍스트 [Required]
 * @param {number} level - 1=title 스케일, 2=subtitle 스케일 [Optional, 기본값: 1]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <SlideTitle>바이브 디자인: 관점의 전환</SlideTitle>
 * <SlideTitle level={2}>디자인 택소노미 활용법</SlideTitle>
 */
function SlideTitle({ children, level = 1, sx }) {
  const scale = level === 1 ? t.typo.title : t.typo.subtitle;

  return (
    <Box
      component="h1"
      sx={{
        fontFamily: t.fontFamily.heading,
        fontSize: scale.fontSize,
        fontWeight: scale.fontWeight,
        lineHeight: scale.lineHeight,
        letterSpacing: scale.letterSpacing,
        color: t.color.text,
        whiteSpace: 'pre-line',
        m: 0,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export { SlideTitle };

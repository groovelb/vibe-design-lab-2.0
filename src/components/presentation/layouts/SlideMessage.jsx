'use client';
import Box from '@mui/material/Box';
import { presentationTokens as t } from '../../../styles/themes/presentation';

/**
 * SlideMessage 컴포넌트
 *
 * 중요한 내용 1개를 슬라이드 중앙에 크게 배치.
 *
 * @param {ReactNode} children - 메시지 콘텐츠 [Required]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <SlideMessage>"디자인은 항상 체계였다"</SlideMessage>
 */
function SlideMessage({ children, sx }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        px: `${t.spacing.loose}px`,
        ...sx,
      }}
    >
      <Box
        sx={{
          fontFamily: t.fontFamily.heading,
          fontSize: t.typo.title.fontSize,
          fontWeight: t.typo.title.fontWeight,
          lineHeight: t.typo.title.lineHeight,
          letterSpacing: t.typo.title.letterSpacing,
          color: t.color.accent,
          maxWidth: '80%',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export { SlideMessage };

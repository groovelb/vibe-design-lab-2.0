'use client';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

/**
 * CourseCTABlock 컴포넌트
 *
 * 서브페이지 하단에 공통으로 배치되는 코스 유도 블록.
 * 중앙 정렬된 헤드라인과 CTA 버튼으로 구성된다.
 *
 * Props:
 * @param {string} headline - 유도 메시지 [Required]
 * @param {string} ctaLabel - CTA 버튼 텍스트 [Required]
 * @param {string} ctaHref - CTA 버튼 링크 [Required]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <CourseCTABlock
 *   headline="지금 코호트에 합류하세요"
 *   ctaLabel="코스 보기"
 *   ctaHref="/courses"
 * />
 */
const CourseCTABlock = forwardRef(function CourseCTABlock({
  headline,
  ctaLabel,
  ctaHref,
  sx,
  ...props
}, ref) {
  return (
    <Box
      ref={ref}
      sx={{
        py: { xs: 6, md: 8 },
        px: 3,
        backgroundColor: 'background.paper',
        textAlign: 'center',
        ...sx,
      }}
      {...props}
    >
      <Typography
        variant="h4"
        sx={{ mb: 3, fontWeight: 700 }}
      >
        {headline}
      </Typography>
      <Button
        variant="contained"
        size="large"
        href={ctaHref}
      >
        {ctaLabel}
      </Button>
    </Box>
  );
});

export { CourseCTABlock };

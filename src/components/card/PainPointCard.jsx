'use client';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * PainPointCard 컴포넌트
 *
 * 제목 + 설명 구조의 카드.
 *
 * @param {string} label - 카드 제목 (예: '정확한 의도') [Required]
 * @param {string} description - 설명 [Required]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <PainPointCard
 *   label="정확한 의도"
 *   description="UX 설계를 중심으로 예측 가능한 결과물을 만듭니다"
 * />
 */
const PainPointCard = forwardRef(function PainPointCard({
  label,
  description,
  sx,
  ...props
}, ref) {
  return (
    <Box ref={ref} sx={sx} {...props}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 900, lineHeight: 2 }}
      >
        {label}
      </Typography>
      <Typography
        variant="h5"
        sx={{ color: 'text.secondary', lineHeight: 1.7 }}
      >
        {description}
      </Typography>
    </Box>
  );
});

export { PainPointCard };

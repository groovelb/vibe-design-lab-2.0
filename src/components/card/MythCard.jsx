'use client';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

/**
 * MythCard 컴포넌트
 *
 * 통념 → 반전 2단 구조의 편견 깨기 카드.
 *
 * @param {string} label - 편견 카테고리 (예: '도구의 편견') [Required]
 * @param {string} conventional - 통념 텍스트 [Required]
 * @param {string} reversal - 반전 텍스트 [Required]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <MythCard
 *   label="도구의 편견"
 *   conventional="더 좋은 모델, 더 좋은 서비스가 나오면 결과가 달라진다"
 *   reversal="도구는 이미 충분하다. 결과를 결정하는 건 도구의 성능이 아니라 의도의 정밀도다"
 * />
 */
const MythCard = forwardRef(function MythCard({
  label,
  conventional,
  reversal,
  sx,
  ...props
}, ref) {
  return (
    <Box ref={ref} sx={sx} {...props}>
      <Typography
        variant="caption"
        sx={{ color: 'text.disabled', lineHeight: 3 }}
      >
        통념
      </Typography>
      <Typography
        variant="h5"
        sx={{ color: 'text.secondary', lineHeight: 1.7 }}
      >
        {conventional}
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography
        variant="caption"
        sx={{ color: 'text.primary', lineHeight: 3 }}
      >
        실제
      </Typography>
      <Typography
        variant="h5"
        sx={{ fontWeight: 700, lineHeight: 1.7 }}
      >
        {reversal}
      </Typography>
    </Box>
  );
});

export { MythCard };

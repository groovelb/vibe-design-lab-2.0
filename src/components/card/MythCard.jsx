'use client';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * MythCard 컴포넌트
 *
 * Philosophy → 통념 → 수직선 → 실제 구조의 편견 깨기 카드.
 * 상단에 Vibe Philosophy 신념을 보여준 뒤, 통념과 실제를 대비한다.
 * 수직선이 남은 높이를 채워 시각적 거리감을 만든다.
 *
 * @param {string} label - 편견 카테고리 (예: '도구의 편견') [Required]
 * @param {string} philosophy - Vibe Philosophy 신념 (예: '구현은 언어를 따른다') [Required]
 * @param {string} conventional - 통념 텍스트 [Required]
 * @param {string} reversal - 반전 텍스트 [Required]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <MythCard
 *   label="도구의 편견"
 *   philosophy="구현은 언어를 따른다"
 *   conventional="더 좋은 AI 모델이 나오면 결과물이 좋아진다"
 *   reversal="도구는 이미 충분합니다. 결과를 바꾸는 건 모델의 성능이 아니라 내 의도를 날카롭게 깎는 훈련입니다."
 * />
 */
const MythCard = forwardRef(function MythCard({
  label,
  philosophy,
  conventional,
  reversal,
  sx,
  ...props
}, ref) {
  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        ...sx,
      }}
      {...props}
    >
      {/* Philosophy */}
      <Typography
        variant="h4"
        sx={{ color: 'text.primary', fontWeight: 700, lineHeight: 1.5, mb: 4 }}
      >
        {philosophy}
      </Typography>

      {/* 통념 */}
      <Typography
        variant="caption"
        sx={{ color: 'text.primary', lineHeight: 3 }}
      >
        통념
      </Typography>
      <Typography
        variant="h5"
        sx={{ color: 'text.primary', lineHeight: 1.7 }}
      >
        {conventional}
      </Typography>

      {/* 수직선 — 남은 높이를 채운다 */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          py: 3,
          minHeight: 48,
        }}
      >
        <Box sx={{ width: '1px', height: '100%', bgcolor: 'divider' }} />
      </Box>

      {/* 실제 */}
      <Typography
        variant="caption"
        sx={{ color: 'text.primary', lineHeight: 3 }}
      >
        실제
      </Typography>
      <Typography
        variant="h5"
        sx={{ color: 'text.primary', fontWeight: 700, lineHeight: 1.7 }}
      >
        {reversal}
      </Typography>
    </Box>
  );
});

export { MythCard };

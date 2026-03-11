'use client';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

/**
 * 활동 유형별 레이블 매핑
 */
const typeMap = {
  question: { label: '질문' },
  challenge: { label: '챌린지' },
  feedback: { label: '피드백' },
};

/**
 * CommunityActivityCard 컴포넌트
 *
 * 커뮤니티 활동(질문, 챌린지, 피드백) 미리보기 카드.
 * CardContainer variant="outlined" 스타일 기반.
 *
 * Props:
 * @param {string} type - 활동 유형 ('question' | 'challenge' | 'feedback') [Required]
 * @param {string} contentPreview - 미리보기 텍스트 [Required]
 * @param {string} memberName - 멤버 이름 [Required]
 * @param {string} timestamp - 시간 표시 [Required]
 * @param {string} cardVariant - 카드 컨테이너 스타일 ('outlined' | 'editorial') [Optional, 기본값: 'outlined']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <CommunityActivityCard
 *   type="question"
 *   contentPreview="MUI 테마 커스텀에서 colorSchemes..."
 *   memberName="김질문"
 *   timestamp="2시간 전"
 * />
 */
const CommunityActivityCard = forwardRef(function CommunityActivityCard({
  type,
  contentPreview,
  memberName,
  timestamp,
  cardVariant = 'outlined',
  sx,
  ...props
}, ref) {
  const config = typeMap[type] || typeMap.question;

  return (
    <Box
      ref={ref}
      sx={{
        ...(cardVariant === 'editorial'
          ? { backgroundColor: 'transparent', border: 'none' }
          : { border: 1, borderColor: 'divider', backgroundColor: 'background.paper' }),
        ...sx,
      }}
      {...props}
    >
      {/* 썸네일 1:1 */}
      <Box
        sx={{
          width: '100%',
          aspectRatio: '1/1',
          border: '1px dashed',
          borderColor: 'divider',
        }}
      />
      <Stack spacing={1.5} sx={{ pt: 2 }}>
        {/* 유형 레이블 */}
        <Chip
          label={config.label}
          size="small"
          variant="outlined"
          sx={{
            alignSelf: 'flex-start',
            height: 22,
            fontSize: '0.7rem',
            fontWeight: 600,
          }}
        />

        {/* 본문 미리보기 (3줄 line-clamp) */}
        <Typography
          variant="subtitle1"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontWeight: 700,
            wordBreak: 'keep-all',
          }}
        >
          {contentPreview}
        </Typography>

        {/* 멤버 · 시간 */}
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          divider={
            <Typography
              component="span"
              sx={{ color: 'text.disabled', fontSize: '0.7rem' }}
            >
              ·
            </Typography>
          }
        >
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {memberName}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            {timestamp}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
});

export { CommunityActivityCard };

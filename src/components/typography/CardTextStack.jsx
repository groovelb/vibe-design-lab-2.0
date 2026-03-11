'use client';
import { forwardRef } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

/**
 * CardTextStack 컴포넌트
 *
 * 카드 내부의 label + title + subtitle + description 텍스트 계층을 표준화한다.
 *
 * @param {string} label - 상단 캡션 라벨 [Optional]
 * @param {string} title - 제목 [Required]
 * @param {string} subtitle - 부제목 [Optional]
 * @param {string} description - 설명 [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <CardTextStack
 *   label="연결된 환경"
 *   title="리드와 참여자가 연결되있습니다"
 *   description="Discord와 학습 플랫폼에서..."
 * />
 */
const CardTextStack = forwardRef(function CardTextStack({
  label,
  title,
  subtitle,
  description,
  sx,
  ...props
}, ref) {
  return (
    <Stack ref={ref} spacing={2} sx={sx} {...props}>
      {label && (
        <Typography
          variant="caption"
          sx={{
            color: 'text.disabled',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          {label}
        </Typography>
      )}
      <Stack spacing={0}>
        <Typography variant="h4" sx={{ fontWeight: 900 }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="h4" sx={{ fontWeight: 400, mt: 1, wordBreak: 'keep-all' }}>
            {subtitle}
          </Typography>
        )}
      </Stack>
      {description && (
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', lineHeight: 1.7, wordBreak: 'keep-all' }}
        >
          {description}
        </Typography>
      )}
    </Stack>
  );
});

export { CardTextStack };

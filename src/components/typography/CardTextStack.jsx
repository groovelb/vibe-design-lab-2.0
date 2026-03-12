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
 * @param {string} size - 타이포 사이즈 ('md' | 'lg') [Optional, 기본값: 'md']
 * @param {boolean} isTitleUppercase - 영문 타이틀 대문자 여부 [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <CardTextStack
 *   label="연결된 환경"
 *   title="리드와 참여자가 연결되있습니다"
 *   description="Discord와 학습 플랫폼에서..."
 * />
 * <CardTextStack size="lg" title="큰 제목" subtitle="큰 부제" />
 */
const sizeMap = {
  md: { title: 'h4', subtitle: 'h4', description: 'body1', titleUppercase: false },
  lg: { title: 'h3', subtitle: 'h4', description: 'body1', titleUppercase: true },
};

const CardTextStack = forwardRef(function CardTextStack({
  label,
  title,
  subtitle,
  description,
  size = 'md',
  isTitleUppercase,
  sx,
  ...props
}, ref) {
  const variants = sizeMap[size] || sizeMap.md;
  const shouldUppercase = isTitleUppercase ?? variants.titleUppercase;

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
        <Typography
          variant={variants.title}
          sx={{
            fontWeight: 900,
            ...(shouldUppercase && { textTransform: 'uppercase', letterSpacing: '0.02em' }),
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography variant={variants.subtitle} sx={{ fontWeight: 400, mt: 1, wordBreak: 'keep-all' }}>
            {subtitle}
          </Typography>
        )}
      </Stack>
      {description && (
        <Typography
          variant={variants.description}
          sx={{ color: 'text.secondary', lineHeight: 1.7, wordBreak: 'keep-all' }}
        >
          {description}
        </Typography>
      )}
    </Stack>
  );
});

export { CardTextStack };

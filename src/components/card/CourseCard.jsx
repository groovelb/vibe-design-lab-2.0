'use client';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { CustomCard } from './CustomCard';
import { CohortBadge } from '../../common/ui/CohortBadge';

/**
 * CourseCard 컴포넌트
 *
 * 코스 정보를 표시하는 카드. CustomCard 기반.
 * 미디어 + 코호트 배지 + 메타 정보 + 제목 + 부제 + 대상 + CTA 구조.
 *
 * Props:
 * @param {node} mediaSlot - 미디어 영역 (Placeholder.Media 등) [Optional]
 * @param {string} mediaRatio - 미디어 비율 [Optional, 기본값: '1/1']
 * @param {string} cohortStatus - 코호트 상태 ('recruiting' | 'ongoing' | 'upcoming') [Optional]
 * @param {string} duration - 기간 텍스트 [Optional]
 * @param {number} chapters - 챕터 수 [Optional]
 * @param {string} title - 코스 제목 [Required]
 * @param {string} subtitle - 부제 [Optional]
 * @param {string} target - 대상 [Optional]
 * @param {string} ctaLabel - CTA 텍스트 [Optional]
 * @param {function} onCtaClick - CTA 클릭 핸들러 [Optional]
 * @param {string} ctaHref - CTA 링크 [Optional]
 * @param {string} cardVariant - 카드 스타일 ('outlined' | 'editorial') [Optional, 기본값: 'editorial']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <CourseCard
 *   mediaSlot={<Placeholder.Media ratio="16/9" />}
 *   cohortStatus="recruiting"
 *   duration="4주"
 *   chapters={8}
 *   title="디자인 시스템 입문"
 *   subtitle="MUI 기반 컴포넌트 설계"
 *   target="주니어 디자이너"
 *   ctaLabel="자세히 보기"
 * />
 */
const CourseCard = forwardRef(function CourseCard({
  mediaSlot,
  mediaRatio = '1/1',
  cohortStatus,
  duration,
  chapters,
  title,
  subtitle,
  target,
  ctaLabel,
  onCtaClick,
  ctaHref,
  cardVariant = 'editorial',
  sx,
  ...props
}, ref) {
  const metaParts = [duration, chapters != null && `${chapters}챕터`].filter(Boolean);

  return (
    <CustomCard
      ref={ref}
      variant={cardVariant}
      contentPadding="none"
      mediaSlot={mediaSlot}
      mediaRatio={mediaRatio}
      sx={sx}
      {...props}
    >
      <Stack spacing={2} sx={{ pt: 2 }}>
        {/* 코호트 배지 + 메타 정보 */}
        {(cohortStatus || metaParts.length > 0) && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {cohortStatus && <CohortBadge status={cohortStatus} size="sm" />}
            {metaParts.length > 0 && (
              <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                {metaParts.join(' · ')}
              </Typography>
            )}
          </Box>
        )}

        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          {title}
        </Typography>

        {subtitle && (
          <Typography variant="body2" sx={{ color: 'text.secondary', wordBreak: 'keep-all' }}>
            {subtitle}
          </Typography>
        )}

        {target && (
          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            대상: {target}
          </Typography>
        )}

        {ctaLabel && (
          <Box>
            <Button
              variant="outlined"
              size="small"
              href={ctaHref}
              onClick={onCtaClick}
            >
              {ctaLabel}
            </Button>
          </Box>
        )}
      </Stack>
    </CustomCard>
  );
});

export { CourseCard };

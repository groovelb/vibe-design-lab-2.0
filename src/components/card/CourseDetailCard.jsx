'use client';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AspectMedia from '../media/AspectMedia';
import { CohortBadge } from '../../common/ui/CohortBadge';
import { CardTextStack } from '../typography/CardTextStack';

/**
 * CourseDetailCard 컴포넌트
 *
 * 코스 상세 정보를 horizontal 레이아웃으로 표시하는 카드.
 * 좌측 비디오/썸네일 미디어 + 우측 코스 정보 구조.
 * 모바일에서는 수직 스택으로 전환된다.
 *
 * Props:
 * @param {node} mediaSlot - 커스텀 미디어 요소 (videoSrc/posterSrc보다 우선) [Optional]
 * @param {string} videoSrc - 비디오 소스 URL [Optional]
 * @param {string} posterSrc - 비디오 포스터/썸네일 이미지 URL (레이지 로딩) [Optional]
 * @param {string} mediaRatio - 미디어 영역 비율 [Optional, 기본값: '16/9']
 * @param {string} cohortStatus - 코호트 상태 ('recruiting' | 'ongoing' | 'upcoming') [Optional]
 * @param {string} duration - 기간 텍스트 [Optional]
 * @param {number} chapters - 챕터 수 [Optional]
 * @param {string} title - 코스 제목 [Required]
 * @param {string} subtitle - 한 줄 부제 [Optional]
 * @param {string} description - 코스 설명 [Optional]
 * @param {string} target - 수강 대상 [Optional]
 * @param {string} ctaLabel - CTA 버튼 텍스트 [Optional]
 * @param {function} onCtaClick - CTA 클릭 핸들러 [Optional]
 * @param {string} ctaHref - CTA 링크 URL [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <CourseDetailCard
 *   videoSrc="/course-video.mp4"
 *   posterSrc="/course-thumbnail.png"
 *   cohortStatus="recruiting"
 *   duration="8주"
 *   chapters={4}
 *   title="Vibe Design Starter Kit"
 *   subtitle="디자인 자체를 구현 수단으로 활용하는 바이브 코딩 실전 코스"
 *   target="프로덕트 디자이너 · 프론트엔드 개발자"
 *   ctaLabel="자세히 보기"
 * />
 */
const CourseDetailCard = forwardRef(function CourseDetailCard({
  mediaSlot,
  videoSrc,
  posterSrc,
  mediaRatio = 'auto',
  cohortStatus,
  duration,
  chapters,
  title,
  subtitle,
  description,
  target,
  ctaLabel,
  onCtaClick,
  ctaHref,
  sx,
  ...props
}, ref) {
  const metaParts = [duration, chapters != null && `${chapters}챕터`].filter(Boolean);

  const renderMedia = () => {
    if (mediaSlot) return mediaSlot;

    if (videoSrc) {
      return (
        <AspectMedia
          type="video"
          src={videoSrc}
          poster={posterSrc}
          aspectRatio={mediaRatio}
          isAutoPlay
          isMuted
          isLoop
          sx={{ borderRadius: 0 }}
        />
      );
    }

    if (posterSrc) {
      return (
        <AspectMedia
          src={posterSrc}
          aspectRatio={mediaRatio}
          sx={{ borderRadius: 0 }}
        />
      );
    }

    return (
      <Box
        sx={{
          width: '100%',
          aspectRatio: mediaRatio,
          border: '1px dashed',
          borderColor: 'divider',
          borderRadius: 0,
        }}
      />
    );
  };

  return (
    <Grid ref={ref} container spacing={{ xs: 4, md: 6 }} sx={sx} {...props}>
      {/* 미디어 영역 */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Box sx={{ overflow: 'hidden', bgcolor: '#09080b', '& video': { mixBlendMode: 'lighten' } }}>
          {renderMedia()}
        </Box>
      </Grid>

      {/* 콘텐츠 영역 */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Stack spacing={3} sx={{ height: '100%', justifyContent: 'space-between' }}>
          {/* 상단: 텍스트 콘텐츠 */}
          <Stack spacing={3}>
            {/* 코호트 배지 + 메타 정보 */}
            {(cohortStatus || metaParts.length > 0) && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {cohortStatus && <CohortBadge status={cohortStatus} size="md" sx={{ borderRadius: 0 }} />}
                {metaParts.length > 0 && (
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {metaParts.join(' · ')}
                  </Typography>
                )}
              </Box>
            )}

            <CardTextStack
              size="lg"
              title={title}
              subtitle={subtitle}
              description={description}
            />

            {target && (
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                대상: {target}
              </Typography>
            )}
          </Stack>

          {/* 하단: CTA 버튼 */}
          {ctaLabel && (
            <Box>
              <Button
                variant="contained"
                size="large"
                href={ctaHref}
                onClick={onCtaClick}
              >
                {ctaLabel}
              </Button>
            </Box>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
});

export { CourseDetailCard };

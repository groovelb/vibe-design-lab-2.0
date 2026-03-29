'use client';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { SectionContainer } from '../container/SectionContainer';
import { SectionDivider } from '../typography/SectionDivider';
import { SectionTitle } from '../typography/SectionTitle';
import FadeTransition from '../motion/FadeTransition';
import { PAGES } from '../../data/contents';
const { cta, hero } = PAGES.courseDetail;

/**
 * CourseDetailCTA 섹션 템플릿
 *
 * 코스 상세 페이지 최종 CTA 영역.
 * 부가 링크(웨비나, 문의) + 가격 + 수강 신청 CTA.
 * vibedesignlab.net 프로덕션 레이아웃: 카드 2행 + 하단 가격 바.
 * FloatingCTA의 hideWhenVisible ref 대상.
 *
 * Example usage:
 * <CourseDetailCTA ref={ctaRef} />
 */
const CourseDetailCTA = forwardRef(function CourseDetailCTA({ enrollUrl, ...props }, ref) {
  return (
    <SectionContainer ref={ref} id="enroll">
      {/* 헤더 */}
      <FadeTransition direction="up" isTriggerOnView threshold={0.5}>
        <SectionDivider label="Enroll" sx={{ mb: 3 }} />
        <SectionTitle
          headline={cta.headline}
          sx={{ mb: { xs: 6, md: 10 } }}
        />
      </FadeTransition>

      {/* 최종 가격 + CTA 바 */}
      <FadeTransition direction="up" delay={200} isTriggerOnView threshold={0.5}>
        <Box
          sx={{
            p: { xs: 4, md: 5 },
            bgcolor: 'action.hover',
          }}
        >
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems={{ md: 'flex-end' }}
            spacing={3}
          >
            <Stack spacing={1.5}>
              <Typography variant="body2" sx={{ color: 'error.main', fontWeight: 700 }}>
                온라인 얼리버드 모집 중 · 4/15 마감
              </Typography>
              <Stack spacing={0.5}>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  수강료
                </Typography>
                <Stack direction="row" spacing={1} alignItems="baseline">
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {hero.price}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', textDecoration: 'line-through' }}>
                    {hero.priceOriginal}
                  </Typography>
                </Stack>
              </Stack>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {hero.priceNote}
              </Typography>
            </Stack>
            <Button
              variant="contained"
              color="error"
              size="large"
              href={enrollUrl || '#enroll'}
              target={enrollUrl ? '_blank' : undefined}
              rel={enrollUrl ? 'noopener noreferrer' : undefined}
              sx={{ flexShrink: 0 }}
            >
              {cta.ctaLabel}
            </Button>
          </Stack>
        </Box>
      </FadeTransition>
    </SectionContainer>
  );
});

export { CourseDetailCTA };

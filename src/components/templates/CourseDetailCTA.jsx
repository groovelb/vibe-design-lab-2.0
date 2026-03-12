'use client';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { SectionContainer } from '../container/SectionContainer';
import { SectionDivider } from '../typography/SectionDivider';
import { SectionTitle } from '../typography/SectionTitle';
import FadeTransition from '../motion/FadeTransition';
import { PAGES } from '../../data/contents';
import { Mail, Video } from 'lucide-react';

const { cta, hero } = PAGES.courseDetail;

/**
 * CourseDetailCTA 섹션 템플릿
 *
 * 코스 상세 페이지 최종 CTA 영역.
 * 부가 링크(웨비나, 문의) + 가격 + 수강 신청 CTA.
 * FloatingCTA의 hideWhenVisible ref 대상이 된다.
 *
 * Example usage:
 * <CourseDetailCTA ref={ctaRef} />
 */
const CourseDetailCTA = forwardRef(function CourseDetailCTA(props, ref) {
  return (
    <SectionContainer ref={ref} id="enroll">
      {/* 부가 링크: 웨비나 + 문의 */}
      <FadeTransition direction="up" isTriggerOnView>
        <SectionDivider label="Enroll" sx={{ mb: 3 }} />
        <SectionTitle
          headline={cta.headline}
          sx={{ mb: { xs: 6, md: 10 } }}
        />
      </FadeTransition>

      <FadeTransition direction="up" delay={100} isTriggerOnView>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={3}
          sx={{ mb: { xs: 6, md: 10 } }}
        >
          {/* 웨비나 카드 */}
          <Box
            sx={{
              flex: 1,
              p: 4,
              border: 1,
              borderColor: 'divider',
            }}
          >
            <Stack spacing={2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Video size={16} />
                <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                  Case Study
                </Typography>
              </Stack>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {cta.webinar.label}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {cta.webinar.description}
              </Typography>
              <Box>
                <Button variant="text" size="small">
                  {cta.webinar.ctaLabel}
                </Button>
              </Box>
            </Stack>
          </Box>

          {/* 문의 카드 */}
          <Box
            sx={{
              flex: 1,
              p: 4,
              border: 1,
              borderColor: 'divider',
            }}
          >
            <Stack spacing={2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Mail size={16} />
                <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                  Q&A
                </Typography>
              </Stack>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {cta.inquiry.label}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {cta.inquiry.description}
              </Typography>
              <Box>
                <Button variant="text" size="small">
                  {cta.inquiry.ctaLabel}
                </Button>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </FadeTransition>

      {/* 최종 가격 + CTA */}
      <FadeTransition direction="up" delay={200} isTriggerOnView>
        <Box
          sx={{
            p: { xs: 4, md: 5 },
            border: 1,
            borderColor: 'divider',
          }}
        >
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems={{ md: 'center' }}
            spacing={3}
          >
            <Stack spacing={1.5}>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Chip
                  label="오프라인 3기 진행중 정원 마감"
                  size="small"
                  sx={{ bgcolor: 'action.hover', color: 'text.secondary', fontSize: '0.75rem' }}
                />
                <Chip
                  label="온라인 얼리버드 모집 중"
                  size="small"
                  sx={{ bgcolor: 'error.main', color: 'error.contrastText', fontSize: '0.75rem' }}
                />
              </Stack>
              <Stack spacing={0.5}>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  수강료
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {hero.price}
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {hero.priceNote}
              </Typography>
            </Stack>
            <Button variant="contained" size="large" sx={{ flexShrink: 0 }}>
              {cta.ctaLabel}
            </Button>
          </Stack>
        </Box>
      </FadeTransition>
    </SectionContainer>
  );
});

export { CourseDetailCTA };

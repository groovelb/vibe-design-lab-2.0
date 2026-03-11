'use client';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import AspectMedia from '../media/AspectMedia';
import { CohortBadge } from '../../common/ui/CohortBadge';
import { SectionContainer } from '../container/SectionContainer';
import FadeTransition from '../motion/FadeTransition';
import { PAGES } from '../../data/contents';
import { COURSES } from '../../data/landingMockData';
import courseThumbnail from '../../assets/course/coure_thumbnail_starterkit.png';

const { hero } = PAGES.courseDetail;
const course = COURSES[0];

/**
 * CourseDetailHero 섹션 템플릿
 *
 * 코스 상세 페이지의 Hero 영역.
 * 코스 타이틀 + 태그라인 + 썸네일 + 배지 + 가격 + CTA.
 *
 * Example usage:
 * <CourseDetailHero />
 */
export function CourseDetailHero() {
  return (
    <SectionContainer sx={{ py: { xs: 6, md: 12 } }}>
      <Stack spacing={{ xs: 6, md: 8 }} alignItems="center">
        {/* 배지 */}
        <FadeTransition direction="up" isTriggerOnView>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <CohortBadge status={course.cohortStatus} />
            <Chip
              label={hero.badge}
              size="small"
              sx={{
                bgcolor: 'action.hover',
                color: 'text.secondary',
                fontSize: '0.75rem',
              }}
            />
          </Box>
        </FadeTransition>

        {/* 타이틀 */}
        <FadeTransition direction="up" delay={100} isTriggerOnView>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontWeight: 800,
              textAlign: 'center',
              letterSpacing: '-0.02em',
            }}
          >
            {course.title}
          </Typography>
        </FadeTransition>

        {/* 썸네일 */}
        <FadeTransition direction="up" delay={200} isTriggerOnView>
          <Box sx={{ width: '100%', maxWidth: 800 }}>
            <AspectMedia
              src={courseThumbnail}
              alt={course.title}
              aspectRatio="16/9"
              sx={{ borderRadius: 0 }}
            />
          </Box>
        </FadeTransition>

        {/* 부제 + 설명 */}
        <FadeTransition direction="up" delay={300} isTriggerOnView>
          <Stack spacing={3} sx={{ maxWidth: 640, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {hero.subCopy}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: 'text.secondary', whiteSpace: 'pre-line', lineHeight: 1.75 }}
            >
              {hero.description}
            </Typography>
          </Stack>
        </FadeTransition>

        {/* 가격 + CTA */}
        <FadeTransition direction="up" delay={400} isTriggerOnView>
          <Stack spacing={2} alignItems="center">
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="overline" sx={{ color: 'text.disabled' }}>
                수강료
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {hero.price}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                {hero.priceNote}
              </Typography>
            </Stack>
            <Button variant="contained" size="large" href="#enroll">
              {hero.ctaLabel}
            </Button>
          </Stack>
        </FadeTransition>
      </Stack>
    </SectionContainer>
  );
}

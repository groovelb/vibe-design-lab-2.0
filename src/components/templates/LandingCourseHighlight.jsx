'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { SectionContainer } from '../container/SectionContainer';
import { PageContainer } from '../layout/PageContainer';
import LineGrid from '../layout/LineGrid';
import { CourseCard } from '../card/CourseCard';
import Placeholder from '../../common/ui/Placeholder';
import FadeTransition from '../motion/FadeTransition';
import { PAGES } from '../../data/contents';
import { MOCK_COURSES } from '../../data/landingMockData';

const { courseHighlight } = PAGES.landing;

/**
 * LandingCourseHighlight 섹션 템플릿
 *
 * 코스 하이라이트 섹션. overline + 대형 헤드라인 헤더.
 * 2개의 코스 카드를 그리드로 배치하고 1차 CTA를 유도한다.
 * CustomCard + Placeholder.Media로 코스 커버를 표현하고, CohortBadge로 상태를 표시한다.
 *
 * Example usage:
 * <LandingCourseHighlight />
 */
export function LandingCourseHighlight() {
  return (
    <SectionContainer sx={{ py: { xs: 8, md: 12 } }}>
      <PageContainer>
        {/* 섹션 헤드 — overline + 대형 헤드라인 */}
        <FadeTransition direction="up" isTriggerOnView>
          <Box sx={{ mb: { xs: 6, md: 10 } }}>
            <Typography
              variant="overline"
              sx={{ color: 'text.disabled', mb: 1.5, display: 'block' }}
            >
              Course
            </Typography>
            <Typography
              variant="h1"
              component="h2"
              sx={{ fontWeight: 800 }}
            >
              {courseHighlight.headline}
            </Typography>
          </Box>
        </FadeTransition>

        {/* 코스 카드 2열 */}
        <LineGrid container gap={96} borderColor="divider">
          {MOCK_COURSES.map((course, index) => (
            <Grid key={course.slug} size={{ xs: 12, md: 6 }}>
              <FadeTransition direction="up" delay={index * 150} isTriggerOnView>
                <CourseCard
                  mediaSlot={<Placeholder.Media index={index} ratio="1/1" />}
                  cohortStatus={course.cohortStatus}
                  duration={course.duration}
                  chapters={course.chapters}
                  title={course.title}
                  subtitle={course.subtitle}
                  target={course.target}
                  ctaLabel={courseHighlight.ctaPrimary}
                />
              </FadeTransition>
            </Grid>
          ))}
        </LineGrid>

        {/* 전체 보기 — 좌측 정렬 */}
        <FadeTransition direction="up" delay={400} isTriggerOnView>
          <Box sx={{ mt: { xs: 4, md: 6 } }}>
            <Button variant="text" href="/course">
              {courseHighlight.ctaSecondary}
            </Button>
          </Box>
        </FadeTransition>
      </PageContainer>
    </SectionContainer>
  );
}

'use client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { SectionContainer } from '../container/SectionContainer';
import LineGrid from '../layout/LineGrid';
import { CourseCard } from '../card/CourseCard';
import Placeholder from '../../common/ui/Placeholder';
import FadeTransition from '../motion/FadeTransition';
import { SectionDivider } from '../typography/SectionDivider';
import { SectionTitle } from '../typography/SectionTitle';
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
    <SectionContainer>
        <FadeTransition direction="up" isTriggerOnView>
          <SectionDivider label="Course" sx={{ mb: 3 }} />
          <SectionTitle
            headline={courseHighlight.headline}
            sx={{ mb: { xs: 6, md: 10 } }}
          />
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
    </SectionContainer>
  );
}

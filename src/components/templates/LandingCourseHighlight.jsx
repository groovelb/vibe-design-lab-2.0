'use client';
import Box from '@mui/material/Box';
import { SectionContainer } from '../container/SectionContainer';
import { CourseCard } from '../card/CourseCard';
import Placeholder from '../../common/ui/Placeholder';
import FadeTransition from '../motion/FadeTransition';
import { SectionDivider } from '../typography/SectionDivider';
import { SectionTitle } from '../typography/SectionTitle';
import { PAGES } from '../../data/contents';
import { COURSES } from '../../data/landingMockData';

const { courseHighlight } = PAGES.landing;

/**
 * LandingCourseHighlight 섹션 템플릿
 *
 * 코스 하이라이트 섹션. overline + 대형 헤드라인 헤더.
 * 단일 코스 카드(Vibe Design Starter Kit)를 풀 와이드로 배치하고 1차 CTA를 유도한다.
 *
 * Example usage:
 * <LandingCourseHighlight />
 */
export function LandingCourseHighlight() {
  const course = COURSES[0];

  return (
    <SectionContainer>
        <FadeTransition direction="up" isTriggerOnView>
          <SectionDivider label="Course" sx={{ mb: 3 }} />
          <SectionTitle
            headline={courseHighlight.headline}
            sx={{ mb: { xs: 6, md: 10 } }}
          />
        </FadeTransition>

        {/* 단일 코스 카드 */}
        <FadeTransition direction="up" isTriggerOnView>
          <Box sx={{ maxWidth: { md: '50%' } }}>
            <CourseCard
              mediaSlot={<Placeholder.Media index={0} ratio="1/1" />}
              cohortStatus={course.cohortStatus}
              cohortNumber={course.cohortNumber}
              duration={course.duration}
              chapters={course.chapters}
              title={course.title}
              subtitle={course.subtitle}
              target={course.target}
              ctaLabel={courseHighlight.ctaPrimary}
              ctaHref={`/course/${course.slug}`}
            />
          </Box>
        </FadeTransition>
    </SectionContainer>
  );
}

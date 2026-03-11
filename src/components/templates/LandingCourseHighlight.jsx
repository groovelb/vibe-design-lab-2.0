'use client';
import { SectionContainer } from '../container/SectionContainer';
import { CourseDetailCard } from '../card/CourseDetailCard';
import FadeTransition from '../motion/FadeTransition';
import { SectionDivider } from '../typography/SectionDivider';
import { SectionTitle } from '../typography/SectionTitle';
import { PAGES } from '../../data/contents';
import { COURSES } from '../../data/landingMockData';
import testImg from '../../assets/course/test.png';

const { courseHighlight } = PAGES.landing;

/**
 * LandingCourseHighlight 섹션 템플릿
 *
 * 코스 하이라이트 섹션. overline + 대형 헤드라인 헤더.
 * CourseDetailCard(horizontal)로 이미지 + 코스 정보를 풀 와이드로 배치하고 1차 CTA를 유도한다.
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

        <FadeTransition direction="up" isTriggerOnView>
          <CourseDetailCard
            posterSrc={testImg.src || testImg}
            cohortStatus={course.cohortStatus}
            duration={course.duration}
            chapters={course.chapters}
            title={course.title}
            subtitle={course.subtitle}
            target={course.target}
            ctaLabel={courseHighlight.ctaPrimary}
            ctaHref={`/course/${course.slug}`}
          />
        </FadeTransition>
    </SectionContainer>
  );
}

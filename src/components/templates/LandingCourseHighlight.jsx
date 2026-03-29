'use client';
import { SectionContainer } from '../container/SectionContainer';
import { CourseDetailCard } from '../card/CourseDetailCard';
import FadeTransition from '../motion/FadeTransition';
import { PAGES } from '../../data/contents';
import { COURSES } from '../../data/landingMockData';
import curriculumJson from '../../data/program/vdsk_online_curriculum.json';
import coursePoster from '../../assets/course/course_thumbnail_line.png';

const courseVideo = '/assets/course/course_thumbnail_line.mp4';

const { courseHighlight } = PAGES.landing;

const CURRICULUM_HIGHLIGHTS = curriculumJson.sections.map((s) => s.title);

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
      <FadeTransition direction="up" isTriggerOnView threshold={0.5}>
        <CourseDetailCard
          videoSrc={courseVideo}
          posterSrc={coursePoster.src || coursePoster}
          duration={`${curriculumJson.sections.length}섹션`}
          chapters={curriculumJson.sections.reduce((sum, s) => sum + s.chapters.length, 0)}
          estimate="약 6주 소요"
          title={course.title}
          subtitle={course.subtitle}
          highlights={CURRICULUM_HIGHLIGHTS}
          ctaLabel={courseHighlight.ctaPrimary}
          ctaHref={`/course/${course.slug}`}
          sx={{ border: '1px solid', borderColor: 'divider' }}
        />
      </FadeTransition>
    </SectionContainer>
  );
}

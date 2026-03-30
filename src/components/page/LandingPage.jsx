'use client';
import { LandingHero } from '../templates/LandingHero';
import { LandingProblem } from '../templates/LandingProblem';
import { LandingWhyVibeDesign } from '../templates/LandingWhyVibeDesign';
import { LandingShowcase } from '../templates/LandingShowcase';
import { LandingSolution } from '../templates/LandingSolution';
import { LandingLearningMethod } from '../templates/LandingLearningMethod';
import { CourseDetailInstructor } from '../templates/CourseDetailInstructor';
import { LandingCourseHighlight } from '../templates/LandingCourseHighlight';
import { LandingCourseReview } from '../templates/LandingCourseReview';
import { LandingFooterCTA } from '../templates/LandingFooterCTA';
import { PageContainer } from '../layout/PageContainer';

/**
 * LandingPage 컴포넌트
 *
 * VDL Landing 페이지 콘텐츠를 조립하는 페이지 컴포넌트.
 * PageContainer는 페이지당 한 번만 사용하며, 각 섹션은
 * SectionContainer를 통해 자체적으로 콘텐츠 폭을 결정한다.
 *
 * 퍼널 흐름:
 * Hook (Hero) → Pain (Problem) → Why (인식전환) →
 * Solution (Difference) → Method (Learning Method) →
 * Offer (Course Highlight) → Proof (Course Review) → Final CTA
 *
 * Example usage:
 * <LandingPage />
 */
export function LandingPage() {
  return (
    <PageContainer>
      <LandingHero />
      <LandingProblem />
      <LandingWhyVibeDesign />
      <LandingShowcase />
      <LandingSolution />
      <CourseDetailInstructor />
      <LandingLearningMethod />
      <LandingCourseHighlight />
      <LandingCourseReview />
      <LandingFooterCTA />
    </PageContainer>
  );
}

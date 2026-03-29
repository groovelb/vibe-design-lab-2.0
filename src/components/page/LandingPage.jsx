'use client';
import { LandingHero } from '../templates/LandingHero';
import { LandingProblem } from '../templates/LandingProblem';
import { LandingWhyVibeDesign } from '../templates/LandingWhyVibeDesign';
import { LandingShowcase } from '../templates/LandingShowcase';
import { LandingSolution } from '../templates/LandingSolution';
import { LandingLearningMethod } from '../templates/LandingLearningMethod';
import { LandingCourseHighlight } from '../templates/LandingCourseHighlight';
import { LandingCourseReview } from '../templates/LandingCourseReview';
import { LandingFooterCTA } from '../templates/LandingFooterCTA';
import { FooterShifting } from '../layout/FooterShifting';

/**
 * LandingPage 컴포넌트
 *
 * VDL Landing 페이지 콘텐츠를 조립하는 페이지 컴포넌트.
 * FooterShifting으로 감싸 마지막 섹션이 스크롤 시 슬라이드업되며 드러난다.
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
    <FooterShifting footer={<LandingFooterCTA />}>
      <LandingHero />
      <LandingProblem />
      <LandingWhyVibeDesign />
      <LandingShowcase />
      <LandingSolution />
      <LandingLearningMethod />
      <LandingCourseHighlight />
      <LandingCourseReview />
    </FooterShifting>
  );
}

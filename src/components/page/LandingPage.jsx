'use client';
import { LandingHero } from '../templates/LandingHero';
import { LandingProblem } from '../templates/LandingProblem';
import { LandingWhyVibeDesign } from '../templates/LandingWhyVibeDesign';
import { LandingSolution } from '../templates/LandingSolution';
import { LandingLearningMethod } from '../templates/LandingLearningMethod';
import { LandingCourseHighlight } from '../templates/LandingCourseHighlight';
import { LandingCourseReview } from '../templates/LandingCourseReview';
import { LandingDictionaryPreview } from '../templates/LandingDictionaryPreview';
import { LandingCommunitySnapshot } from '../templates/LandingCommunitySnapshot';
import { LandingFooterCTA } from '../templates/LandingFooterCTA';
import { PageContainer } from '../layout/PageContainer';

/**
 * LandingPage 컴포넌트
 *
 * VDL Landing 페이지 콘텐츠를 조립하는 페이지 컴포넌트.
 * 9개 섹션 템플릿으로 구성된 자체 완결형 전환 퍼널.
 *
 * 퍼널 흐름:
 * Hook (Hero) → Pain (Problem) → Why (인식전환) →
 * Solution (Difference) → Method (Learning Method) →
 * Offer (Course Highlight) → Proof (Course Review) →
 * Trust (Dictionary) → Belonging (Community) → Final CTA
 *
 * Example usage:
 * <LandingPage />
 */
export function LandingPage() {
  return (
    <>
      <LandingHero />
      <PageContainer>
        <LandingProblem />
        <LandingWhyVibeDesign />
        <LandingSolution />
        <LandingLearningMethod />
        <LandingCourseHighlight />
        <LandingCourseReview />
        {/* <LandingDictionaryPreview /> */}
        {/* <LandingCommunitySnapshot /> */}
        <LandingFooterCTA />
      </PageContainer>
    </>
  );
}

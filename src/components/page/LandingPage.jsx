'use client';
import { LandingHero } from '../templates/LandingHero';
import { LandingProblem } from '../templates/LandingProblem';
import { LandingDifference } from '../templates/LandingDifference';
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
 * 8개 섹션 템플릿으로 구성된 자체 완결형 전환 퍼널.
 *
 * 퍼널 흐름:
 * Hook (Hero) → Pain (Problem) → Solution (Difference) →
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
        <LandingDifference />
        <LandingCourseHighlight />
        <LandingCourseReview />
        <LandingDictionaryPreview />
        <LandingCommunitySnapshot />
        <LandingFooterCTA />
      </PageContainer>
    </>
  );
}

'use client';
import { useRef } from 'react';
import { CourseDetailHero } from '../templates/CourseDetailHero';
import { CourseDetailTargetAudience } from '../templates/CourseDetailTargetAudience';
import { CourseDetailReview } from '../templates/CourseDetailReview';
// import { CourseDetailVision } from '../templates/CourseDetailVision';
import { CourseDetailShowcase } from '../templates/CourseDetailShowcase';
import { CourseDetailRole } from '../templates/CourseDetailRole';
import { CourseDetailCurriculum } from '../templates/CourseDetailCurriculum';
import { CourseDetailBenefits } from '../templates/CourseDetailBenefits';
import { CourseDetailFAQ } from '../templates/CourseDetailFAQ';
import { CourseDetailInstructor } from '../templates/CourseDetailInstructor';

import { CourseDetailCTA } from '../templates/CourseDetailCTA';
import { FloatingCTA } from '../navigation/FloatingCTA';
import { PageContainer } from '../layout/PageContainer';
import { PAGES } from '../../data/contents';

const { floatingCta, hero, cta } = PAGES.courseDetail;
const ENROLL_URL = 'https://forms.gle/HSbH3j3McYVqsHe29';

/**
 * CourseDetailPage 컴포넌트
 *
 * 코스 상세 페이지 전체 레이아웃을 조립하는 페이지 컴포넌트.
 *
 * 퍼널 흐름:
 * Hero → Target Audience → Review → Vision →
 * Showcase → Role → Curriculum → FAQ →
 * Course Lead → Benefits → CTA + FloatingCTA
 *
 * Example usage:
 * <CourseDetailPage />
 */
export function CourseDetailPage() {
  const ctaRef = useRef(null);

  return (
    <PageContainer>
      <CourseDetailHero enrollUrl={ENROLL_URL} />
      <CourseDetailTargetAudience />
      <CourseDetailReview />
      {/* <CourseDetailVision /> */}
      <CourseDetailShowcase />
      <CourseDetailRole />
      <CourseDetailCurriculum />
      <CourseDetailBenefits />
      <CourseDetailFAQ />
      <CourseDetailInstructor />

      <CourseDetailCTA ref={ctaRef} enrollUrl={ENROLL_URL} />
      <FloatingCTA
        label={hero.ctaLabel}
        href={ENROLL_URL}
        target="_blank"
        title="Vibe Design Starter Kit"
        subText={hero.priceDiscount}
        inquiryLabel="문의하기"
        hideWhenVisible={ctaRef}
      />
    </PageContainer>
  );
}

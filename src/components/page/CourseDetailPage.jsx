'use client';
import { useRef } from 'react';
import { CourseDetailHero } from '../templates/CourseDetailHero';
import { CourseDetailTargetAudience } from '../templates/CourseDetailTargetAudience';
import { CourseDetailReview } from '../templates/CourseDetailReview';
import { CourseDetailVision } from '../templates/CourseDetailVision';
import { CourseDetailShowcase } from '../templates/CourseDetailShowcase';
import { CourseDetailRole } from '../templates/CourseDetailRole';
import { CourseDetailCurriculum } from '../templates/CourseDetailCurriculum';
import { CourseDetailFAQ } from '../templates/CourseDetailFAQ';
import { CourseDetailInstructor } from '../templates/CourseDetailInstructor';
import { CourseDetailEarlyBird } from '../templates/CourseDetailEarlyBird';
import { CourseDetailCTA } from '../templates/CourseDetailCTA';
import { FloatingCTA } from '../navigation/FloatingCTA';
import { PageContainer } from '../layout/PageContainer';
import { PAGES } from '../../data/contents';

const { floatingCta, hero } = PAGES.courseDetail;

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
      <CourseDetailHero />
      <CourseDetailTargetAudience />
      <CourseDetailReview />
      <CourseDetailVision />
      <CourseDetailShowcase />
      <CourseDetailRole />
      <CourseDetailCurriculum />
      <CourseDetailFAQ />
      <CourseDetailInstructor />
      <CourseDetailEarlyBird />
      <CourseDetailCTA ref={ctaRef} />
      <FloatingCTA
        label={floatingCta.label}
        href="#enroll"
        subText={hero.price}
        hideWhenVisible={ctaRef}
      />
    </PageContainer>
  );
}

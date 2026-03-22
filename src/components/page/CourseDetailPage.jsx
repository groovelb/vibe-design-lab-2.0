'use client';
import { useRef } from 'react';
import { CourseDetailHero } from '../templates/CourseDetailHero';
import { CourseDetailLearningGoals } from '../templates/CourseDetailLearningGoals';
import { CourseDetailTargetAudience } from '../templates/CourseDetailTargetAudience';
import { CourseDetailReview } from '../templates/CourseDetailReview';
import { CourseDetailVision } from '../templates/CourseDetailVision';
import { CourseDetailShowcase } from '../templates/CourseDetailShowcase';
import { CourseDetailRole } from '../templates/CourseDetailRole';
import { CourseDetailComposition } from '../templates/CourseDetailComposition';
import { CourseDetailCurriculum } from '../templates/CourseDetailCurriculum';
import { CourseDetailFAQ } from '../templates/CourseDetailFAQ';
import { CourseDetailInstructor } from '../templates/CourseDetailInstructor';
import { CourseDetailSchedule } from '../templates/CourseDetailSchedule';
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
 * 15개 섹션 템플릿 조합.
 *
 * 퍼널 흐름:
 * Hero → Learning Goals → Target Audience → Review → Vision →
 * Showcase → Role → Composition → Curriculum → FAQ →
 * Instructor → Schedule → Early Bird → CTA + FloatingCTA
 *
 * Example usage:
 * <CourseDetailPage />
 */
export function CourseDetailPage() {
  const ctaRef = useRef(null);

  return (
    <PageContainer>
      <CourseDetailHero />
      <CourseDetailLearningGoals />
      <CourseDetailTargetAudience />
      <CourseDetailReview />
      <CourseDetailVision />
      <CourseDetailShowcase />
      <CourseDetailRole />
      <CourseDetailComposition />
      <CourseDetailCurriculum />
      <CourseDetailFAQ />
      <CourseDetailInstructor />
      <CourseDetailSchedule />
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

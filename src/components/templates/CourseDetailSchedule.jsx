'use client';
import { SectionContainer } from '../container/SectionContainer';
import { SectionDivider } from '../typography/SectionDivider';
import { SectionTitle } from '../typography/SectionTitle';
import { TimelineBlock } from '../data-display/TimelineBlock';
import FadeTransition from '../motion/FadeTransition';
import { PAGES } from '../../data/contents';
import { SCHEDULE_TIMELINE } from '../../data/courseDetailMockData';

const { schedule } = PAGES.courseDetail;

/**
 * CourseDetailSchedule 섹션 템플릿
 *
 * 4챕터 수업 일정 타임라인.
 *
 * Example usage:
 * <CourseDetailSchedule />
 */
export function CourseDetailSchedule() {
  return (
    <SectionContainer>
      <FadeTransition direction="up" isTriggerOnView>
        <SectionDivider label={schedule.dividerLabel} sx={{ mb: 3 }} />
        <SectionTitle
          headline={schedule.headline}
          sx={{ mb: { xs: 6, md: 10 } }}
        />
      </FadeTransition>

      <FadeTransition direction="up" delay={200} isTriggerOnView>
        <TimelineBlock items={SCHEDULE_TIMELINE} />
      </FadeTransition>
    </SectionContainer>
  );
}

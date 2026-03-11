'use client';
import { SectionContainer } from '../container/SectionContainer';
import { SectionDivider } from '../typography/SectionDivider';
import { SectionTitle } from '../typography/SectionTitle';
import { AccordionSection } from '../data-display/AccordionSection';
import FadeTransition from '../motion/FadeTransition';
import Typography from '@mui/material/Typography';
import { PAGES } from '../../data/contents';
import { CURRICULUM_CHAPTERS } from '../../data/courseDetailMockData';

const { curriculum } = PAGES.courseDetail;

/**
 * CourseDetailCurriculum 섹션 템플릿
 *
 * 코스 커리큘럼 아코디언. 4챕터 구성.
 * AccordionSection(curriculum variant)을 사용한다.
 *
 * Example usage:
 * <CourseDetailCurriculum />
 */
export function CourseDetailCurriculum() {
  return (
    <SectionContainer>
      <FadeTransition direction="up" isTriggerOnView>
        <SectionDivider label={curriculum.dividerLabel} sx={{ mb: 3 }} />
        <SectionTitle
          headline={curriculum.headline}
          sx={{ mb: 2 }}
        />
        {curriculum.note && (
          <Typography
            variant="caption"
            sx={{ color: 'text.disabled', mb: { xs: 6, md: 10 }, display: 'block' }}
          >
            {curriculum.note}
          </Typography>
        )}
      </FadeTransition>

      <FadeTransition direction="up" delay={200} isTriggerOnView>
        <AccordionSection
          variant="curriculum"
          items={CURRICULUM_CHAPTERS}
          defaultExpandedId="ch1"
        />
      </FadeTransition>
    </SectionContainer>
  );
}

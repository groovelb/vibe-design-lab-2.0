'use client';
import Typography from '@mui/material/Typography';
import { SectionContainer } from '../container/SectionContainer';
import { SectionDivider } from '../typography/SectionDivider';
import { SectionTitle } from '../typography/SectionTitle';
import { AccordionSection } from '../data-display/AccordionSection';
import FadeTransition from '../motion/FadeTransition';
import { PAGES } from '../../data/contents';
import curriculumJson from '../../data/program/vdsk_online_curriculum.json';

const { curriculum } = PAGES.courseDetail;

/** JSON sections → AccordionSection items 변환 */
const CURRICULUM_ITEMS = curriculumJson.sections.map((section) => ({
  id: section.id,
  title: section.title,
  description: section.context?.description || null,
  goal: section.context?.goal || null,
  chapters: section.chapters.map((ch, chIndex) => ({
    label: `Ch${chIndex + 1}`,
    title: ch.title,
    parts: ch.parts.map((part) => ({
      title: part.title,
      items: part.items.map((item) => item.title),
    })),
  })),
}));

/**
 * CourseDetailCurriculum 섹션 템플릿
 *
 * 코스 커리큘럼 아코디언(4섹션).
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
          subtitle={curriculum.subtitle}
          sx={{ mb: 2 }}
        />
        {curriculum.note && (
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary', mb: { xs: 6, md: 10 }, display: 'block', whiteSpace: 'pre-line' }}
          >
            {curriculum.note}
          </Typography>
        )}
      </FadeTransition>

      <FadeTransition direction="up" delay={200} isTriggerOnView>
        <AccordionSection
          variant="curriculum"
          labelPrefix="Section"
          items={CURRICULUM_ITEMS}
          defaultExpandedId="S1"
        />
      </FadeTransition>
    </SectionContainer>
  );
}

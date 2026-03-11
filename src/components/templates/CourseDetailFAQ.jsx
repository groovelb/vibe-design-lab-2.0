'use client';
import { SectionContainer } from '../container/SectionContainer';
import { SectionDivider } from '../typography/SectionDivider';
import { SectionTitle } from '../typography/SectionTitle';
import { AccordionSection } from '../data-display/AccordionSection';
import FadeTransition from '../motion/FadeTransition';
import { PAGES } from '../../data/contents';
import { FAQ_ITEMS } from '../../data/courseDetailMockData';

const { faq } = PAGES.courseDetail;

/**
 * CourseDetailFAQ 섹션 템플릿
 *
 * FAQ 아코디언. AccordionSection(faq variant)을 사용한다.
 *
 * Example usage:
 * <CourseDetailFAQ />
 */
export function CourseDetailFAQ() {
  return (
    <SectionContainer>
      <FadeTransition direction="up" isTriggerOnView>
        <SectionDivider label={faq.dividerLabel} sx={{ mb: 3 }} />
        <SectionTitle
          headline={faq.headline}
          sx={{ mb: { xs: 6, md: 10 } }}
        />
      </FadeTransition>

      <FadeTransition direction="up" delay={200} isTriggerOnView>
        <AccordionSection
          variant="faq"
          items={FAQ_ITEMS}
        />
      </FadeTransition>
    </SectionContainer>
  );
}

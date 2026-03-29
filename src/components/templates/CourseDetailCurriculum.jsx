'use client';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { SectionContainer } from '../container/SectionContainer';
import { SectionDivider } from '../typography/SectionDivider';
import { SectionTitle } from '../typography/SectionTitle';
import { AccordionSection } from '../data-display/AccordionSection';
import FadeTransition from '../motion/FadeTransition';
import { TECH_BADGE_ICONS } from '../../common/ui/TechBadgeIcons';
import { PAGES } from '../../data/contents';
import curriculumJson from '../../data/program/vdsk_online_curriculum.json';

const { curriculum } = PAGES.courseDetail;

/** 섹션별 오픈 날짜 (S1: 4/7, 이후 매주 월요일) */
const SECTION_OPEN_DATES = ['4/7 오픈', '4/14 오픈', '4/21 오픈', '4/28 오픈', '5/5 오픈', '5/12 오픈'];

/** JSON sections → AccordionSection items 변환 */
const CURRICULUM_ITEMS = curriculumJson.sections.map((section, index) => ({
  id: section.id,
  title: section.title,
  description: section.context?.description || null,
  goal: section.context?.goal || null,
  openDate: SECTION_OPEN_DATES[index] || null,
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
            sx={{ color: 'text.secondary', mb: 3, display: 'block', whiteSpace: 'pre-line' }}
          >
            {curriculum.note}
          </Typography>
        )}

        {curriculum.tools && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 3,
              mb: { xs: 6, md: 10 },
            }}
          >
            {curriculum.tools.map((tool) => (
              <Box
                key={tool.label}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  p: 2.5,
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                  flex: 1,
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                  {tool.label}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: 13 }}>
                  {tool.description}
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 0.5 }}>
                  {tool.badges.map((badge) => (
                    <Chip
                      key={badge}
                      icon={TECH_BADGE_ICONS[badge]}
                      label={badge}
                      size="small"
                      sx={{
                        bgcolor: 'action.hover',
                        color: 'text.primary',
                        fontSize: '0.75rem',
                        borderRadius: '4px',
                        '& .MuiChip-icon': { ml: 0.5 },
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            ))}
          </Box>
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

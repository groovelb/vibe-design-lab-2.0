'use client';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SectionContainer } from '../container/SectionContainer';
import { SectionDivider } from '../typography/SectionDivider';
import { SectionTitle } from '../typography/SectionTitle';
import { ProfileBlock } from '../card/ProfileBlock';
import { BentoGrid, BentoItem } from '../layout/BentoGrid';
import FadeTransition from '../motion/FadeTransition';
import { PAGES } from '../../data/contents';
import { INSTRUCTOR_PROFILE } from '../../data/courseDetailMockData';

const { instructor } = PAGES.courseDetail;

/**
 * CourseDetailInstructor 섹션 템플릿
 *
 * 강사 프로필 + 참여 프로젝트 + 포트폴리오 그리드.
 * vibedesignlab.net 프로덕션 레이아웃: 프로필 블록 + BentoGrid 3-col.
 *
 * Example usage:
 * <CourseDetailInstructor />
 */
export function CourseDetailInstructor() {
  return (
    <SectionContainer>
      <FadeTransition direction="up" isTriggerOnView threshold={0.5}>
        <SectionDivider label={instructor.dividerLabel} sx={{ mb: 3 }} />
        <SectionTitle
          headline={instructor.headline}
          sx={{ mb: { xs: 6, md: 10 } }}
        />
      </FadeTransition>

      {/* 프로필 블록 */}
      <FadeTransition direction="up" delay={100} isTriggerOnView threshold={0.5}>
        <ProfileBlock
          imageSrc={INSTRUCTOR_PROFILE.imageSrc}
          name={INSTRUCTOR_PROFILE.name}
          titles={INSTRUCTOR_PROFILE.titles}
          projects={INSTRUCTOR_PROFILE.projects}
          projectsLabel={instructor.projectsLabel}
          sx={{ mb: { xs: 6, md: 10 } }}
        />
      </FadeTransition>

      {/* 포트폴리오 그리드 */}
      <FadeTransition direction="up" delay={200} isTriggerOnView threshold={0.5}>
        <BentoGrid columns={3} gap={2} isAutoRows>
          {INSTRUCTOR_PROFILE.portfolio.map((item) => (
            <BentoItem key={item.title} sx={{ borderRadius: 0 }}>
              <Stack
                spacing={2}
                sx={{
                  p: 3,
                  border: 1,
                  borderColor: 'divider',
                  height: '100%',
                }}
              >
                {/* placeholder */}
                <Box
                  sx={{
                    width: '100%',
                    aspectRatio: '16/9',
                    border: '1px dashed',
                    borderColor: 'divider',
                  }}
                />
                <Stack spacing={0.5}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {item.category}
                  </Typography>
                </Stack>
              </Stack>
            </BentoItem>
          ))}
        </BentoGrid>
      </FadeTransition>
    </SectionContainer>
  );
}

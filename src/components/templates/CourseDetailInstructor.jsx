'use client';
import { useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { SectionContainer } from '../container/SectionContainer';
import { SectionDivider } from '../typography/SectionDivider';
import { SectionTitle } from '../typography/SectionTitle';
import { AreaConstruct } from '../motion/AreaConstruct';
import { ConstructBlock } from '../motion/ConstructBlock';
import { ConstructType } from '../motion/ConstructType';
import { useInView } from '../../hooks/useInView';
import { PAGES } from '../../data/contents';
import { INSTRUCTOR_PROFILE } from '../../data/courseDetailMockData';

const { courseLead } = PAGES.courseDetail;

/**
 * CourseDetailInstructor 섹션 템플릿
 *
 * Course Lead 소개. LandingLearningMethod의 코스 리드 프로필과 동일한 구조:
 * 좌측(비디오 + SVG 이름 + 타이틀), 우측(프로젝트 이력).
 *
 * Example usage:
 * <CourseDetailInstructor />
 */
export function CourseDetailInstructor() {
  const videoRef = useRef(null);
  const [inViewRef, isInView] = useInView({ trigger: 0.3 });

  useEffect(() => {
    if (isInView && videoRef.current) {
      requestAnimationFrame(() => {
        videoRef.current?.play().catch(() => {});
      });
    }
  }, [isInView]);

  return (
    <SectionContainer>
      <SectionDivider label={courseLead.dividerLabel} sx={{ mb: 3 }} />
      <SectionTitle
        headline={courseLead.headline}
        sx={{ mb: { xs: 6, md: 10 } }}
      />

      {/* Course Lead — 좌: 소개+사진, 우: 프로젝트 이력 */}
      <Grid container spacing={{ xs: 4, md: 6 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <AreaConstruct>
                <Box
                  ref={(node) => {
                    videoRef.current = node;
                    inViewRef(node);
                  }}
                  component="video"
                  src="/assets/lead/lead-profile-v18-1.mp4"
                  poster={INSTRUCTOR_PROFILE.imageSrc}
                  muted
                  playsInline
                  sx={{ width: '100%', height: 'auto', borderRadius: '2px' }}
                />
              </AreaConstruct>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={1}>
                <AreaConstruct delay={200}>
                  <Box
                    component="svg"
                    viewBox="0 0 150 56"
                    aria-label={INSTRUCTOR_PROFILE.name}
                    role="img"
                    sx={{
                      width: 120,
                      height: 'auto',
                      color: 'text.primary',
                      mb: 1,
                    }}
                  >
                    <path d="M0 0h18a28 28 0 010 56H0Z" fill="currentColor" />
                    <path d="M0 0h18a28 28 0 010 56H0Z" transform="translate(52)" fill="currentColor" />
                    <path d="M0 0h18a28 28 0 010 56H0Z" transform="translate(104)" fill="currentColor" />
                  </Box>
                </AreaConstruct>
                {INSTRUCTOR_PROFILE.titles.map((title, index) => (
                  <ConstructBlock
                    key={title}
                    text={`• ${title}`}
                    variant="body2"
                    delay={300 + index * 80}
                    sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                  />
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={2}>
            <ConstructType
              text={courseLead.projectsLabel}
              variant="caption"
              sx={{
                '& .MuiTypography-root': {
                  color: 'text.secondary',
                  letterSpacing: '0.08em',
                },
              }}
            />
            <Stack spacing={1}>
              {INSTRUCTOR_PROFILE.projects.map((project, index) => (
                <ConstructBlock
                  key={index}
                  text={`${project.year} ${project.title}`}
                  variant="body2"
                  delay={200 + index * 40}
                  sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                />
              ))}
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </SectionContainer>
  );
}

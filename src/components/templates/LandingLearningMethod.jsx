'use client';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SectionContainer } from '../container/SectionContainer';
import LineGrid from '../layout/LineGrid';
import { SectionDivider } from '../typography/SectionDivider';
import { SectionTitle } from '../typography/SectionTitle';
import { MethodCard } from '../card/MethodCard';
import FadeTransition from '../motion/FadeTransition';
import { Network, BookOpenText, UsersRound, Layers } from 'lucide-react';
import { COL_STAGGER } from '../motion/constants';
import { PAGES } from '../../data/contents';
import { INSTRUCTOR_PROFILE } from '../../data/courseDetailMockData';

const { learningMethod } = PAGES.landing;
const { instructor } = PAGES.courseDetail;

const METHOD_ICONS = [Network, BookOpenText, UsersRound, Layers];

/**
 * LandingLearningMethod 섹션 템플릿
 *
 * 학습 방식을 설명하는 섹션.
 * 타이틀 → 코스 리드 프로필 → 메서드 카드 그리드 순서.
 *
 * Example usage:
 * <LandingLearningMethod />
 */
export function LandingLearningMethod() {
  return (
    <SectionContainer>
      <SectionDivider label="Method" sx={{ mb: 3 }} />
      <SectionTitle
        headline={learningMethod.headline}
        subtitle={learningMethod.subCopy}
        sx={{ mb: { xs: 6, md: 10 } }}
      />

      {/* Course Lead — 좌: 소개+사진, 우: 프로젝트 이력 */}
      <Grid container spacing={{ xs: 4, md: 6 }} sx={{ mb: { xs: 8, md: 16 } }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <FadeTransition direction="up" delay={0} isTriggerOnView>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box
                  component="img"
                  src={INSTRUCTOR_PROFILE.imageSrc}
                  alt={INSTRUCTOR_PROFILE.name}
                  sx={{ width: '100%', height: 'auto' }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Stack spacing={1}>
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
                  {INSTRUCTOR_PROFILE.titles.map((title) => (
                    <Typography
                      key={title}
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      • {title}
                    </Typography>
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </FadeTransition>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <FadeTransition direction="up" delay={COL_STAGGER} isTriggerOnView>
            <Stack spacing={2}>
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  letterSpacing: '0.08em',
                }}
              >
                {instructor.projectsLabel}
              </Typography>
              <Stack spacing={1}>
                {INSTRUCTOR_PROFILE.projects.map((project, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    sx={{ color: 'text.secondary' }}
                  >
                    {project.year} {project.title}
                  </Typography>
                ))}
              </Stack>
            </Stack>
          </FadeTransition>
        </Grid>
      </Grid>

      <LineGrid container gap={120} borderColor="divider">
        {learningMethod.methods.map((method, index) => (
          <Grid key={method.label} size={{ xs: 12, md: 6 }}>
            <MethodCard
              icon={METHOD_ICONS[index]}
              label={method.label}
              title={method.title}
              description={method.description}
              delay={(index % 2) * COL_STAGGER}
            />
          </Grid>
        ))}
      </LineGrid>
    </SectionContainer>
  );
}

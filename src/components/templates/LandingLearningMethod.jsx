'use client';
import { useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { SectionContainer } from '../container/SectionContainer';
import LineGrid from '../layout/LineGrid';
import { SectionDivider } from '../typography/SectionDivider';
import { SectionTitle } from '../typography/SectionTitle';
import { MethodCard } from '../card/MethodCard';
import { AreaConstruct } from '../motion/AreaConstruct';
import { ConstructBlock } from '../motion/ConstructBlock';
import { ConstructType } from '../motion/ConstructType';
import { Network, BookOpenText, UsersRound, Layers } from 'lucide-react';
import { COL_STAGGER } from '../motion/constants';
import { PAGES } from '../../data/contents';
import { INSTRUCTOR_PROFILE } from '../../data/courseDetailMockData';
import { useInView } from '../../hooks/useInView';

const { learningMethod } = PAGES.landing;
const { courseLead: instructor } = PAGES.courseDetail;

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
      <SectionDivider label="Method" sx={{ mb: 3 }} />
      <SectionTitle
        headline={learningMethod.headline}
        subtitle={learningMethod.subCopy}
        sx={{ mb: { xs: 6, md: 10 } }}
      />

      {/* Course Lead — 좌: 소개+사진, 우: 프로젝트 이력 */}
      <Grid container spacing={{ xs: 4, md: 6 }} sx={{ mb: { xs: 8, md: 16 } }}>
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
              text={instructor.projectsLabel}
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

      <LineGrid container gap={{ xs: 48, md: 120 }} borderColor="divider">
        {learningMethod.methods.map((method, index) => (
          <Grid key={method.label} size={{ xs: 12, sm: 6, md: 6 }}>
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

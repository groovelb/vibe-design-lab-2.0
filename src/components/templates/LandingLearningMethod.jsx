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

const { learningMethod, courseLead } = PAGES.landing;

const METHOD_ICONS = [Network, BookOpenText, UsersRound, Layers];

/**
 * LandingLearningMethod 섹션 템플릿
 *
 * 학습 방식을 설명하는 섹션.
 * 커뮤니티 학습, 맥락 질문 피드, 콘텐츠 주기, 현업 예제 4가지 방법을
 * 아이콘 + ConstructType/ConstructBlock의 MethodCard로 배치한다.
 * 하단에 코스 리드 프로필을 배치한다.
 *
 * Example usage:
 * <LandingLearningMethod />
 */
export function LandingLearningMethod() {
  return (
    <SectionContainer>
      <SectionDivider label="Method" sx={{ mb: 3 }} />
      {/* 타이틀 + 코스 리드: PC에서 5:5 2컬럼 */}
      <Grid
        container
        spacing={{ xs: 6, md: 4 }}
        sx={{ mb: { xs: 8, md: 16 } }}
      >
        {/* 왼쪽: 타이틀 */}
        <Grid size={{ xs: 12, md: 6 }}>
          <SectionTitle
            headline={learningMethod.headline}
            subtitle={learningMethod.subCopy}
          />
        </Grid>

        {/* 오른쪽: 코스 리드 프로필 */}
        <Grid size={{ xs: 12, md: 6 }}>
          <FadeTransition direction="up" delay={100} isTriggerOnView>
            <Stack spacing={3}>
              {/* 사각형 프로필 이미지 — 3:4 비율 유지 */}
              <Box
                component="img"
                src={INSTRUCTOR_PROFILE.imageSrc}
                alt={courseLead.name}
                sx={{
                  width: '100%',
                  aspectRatio: '3 / 4',
                  objectFit: 'cover',
                  filter: 'grayscale(0.15)',
                }}
              />

              {/* 프로필 정보 */}
              <Stack spacing={1.5}>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontFamily: 'var(--font-mono, monospace)',
                  }}
                >
                  {courseLead.label}
                </Typography>

                <Stack direction="row" spacing={2} alignItems="baseline">
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>
                    {courseLead.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary' }}
                  >
                    {courseLead.role}
                  </Typography>
                </Stack>

                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.7,
                  }}
                >
                  {courseLead.description}
                </Typography>

                <Stack
                  direction="row"
                  sx={{ flexWrap: 'wrap', gap: 1, mt: 0.5 }}
                >
                  {courseLead.credentials.map((credential) => (
                    <Typography
                      key={credential}
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        px: 1.5,
                        py: 0.5,
                        border: 1,
                        borderColor: 'divider',
                        fontFamily: 'var(--font-mono, monospace)',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {credential}
                    </Typography>
                  ))}
                </Stack>
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

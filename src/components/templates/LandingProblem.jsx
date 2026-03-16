'use client';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { SectionContainer } from '../container/SectionContainer';
import LineGrid from '../layout/LineGrid';
import FadeTransition from '../motion/FadeTransition';
import { AreaConstruct } from '../motion/AreaConstruct';
import ScrollRevealText from '../kinetic-typography/ScrollRevealText';
import { SectionDivider } from '../typography/SectionDivider';
import { CardTextStack } from '../typography/CardTextStack';
import { COL_STAGGER, VISUAL_LEAD } from '../motion/constants';
import { PAGES } from '../../data/contents';

const { problem } = PAGES.landing;

const ALL_PERSONA_MEDIA = [
  { poster: '/persona/p1.png', video: '/persona/p1.mp4' },
  { poster: '/persona/sandwitch_pm.webp', video: '/persona/sandwitch_pm.mp4' },
  { poster: '/persona/p2.png', video: '/persona/p2.mp4' },
];

// PM(index 1)은 온라인 1기에서 제외 — 데이터는 유지, UI에서만 필터링
const VISIBLE_INDICES = [0, 2];
const PERSONA_MEDIA = VISIBLE_INDICES.map((i) => ALL_PERSONA_MEDIA[i]);

/**
 * LandingProblem 섹션 템플릿
 *
 * 문제 정의 문단형(ScrollRevealText) + 페르소나별 카드 그리드.
 *
 * Example usage:
 * <LandingProblem />
 */
export function LandingProblem() {
  return (
    <SectionContainer>
      {/* 문제 정의 — ScrollRevealText + 페르소나별 3컬럼 */}
      <Stack spacing={12}>
        <Box sx={{ mb: { xs: 4, md: 6 } }}>
          <FadeTransition direction="up" isTriggerOnView threshold={0.5}>
            <SectionDivider label="Problem" sx={{ mb: 3 }} />
          </FadeTransition>
          <ScrollRevealText
            text={problem.headline}
            variant="h1"
            isSplitSentences={false}
            sx={{ letterSpacing: '-0.02em', wordSpacing: '0.15em', '& .MuiTypography-root': { lineHeight: 1.71 } }}
          />
        </Box>
        <LineGrid container gap={144} borderColor="divider">
          {problem.career.filter((_, i) => VISIBLE_INDICES.includes(i)).map((item, index) => (
            <Grid key={item.subtitle} size={{ xs: 12, md: 6 }}>
              {(() => {
                const colDelay = (index % 2) * COL_STAGGER;
                return (
                  <>
                    <AreaConstruct isTriggerOnView delay={colDelay}>
                      <Box sx={{ width: '100%', aspectRatio: '4/3', overflow: 'hidden', bgcolor: '#09080b' }}>
                        <Box
                          component="video"
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="none"
                          poster={PERSONA_MEDIA[index].poster}
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                            mixBlendMode: 'lighten',
                            ...(index >= 1 && { transform: 'translateY(24px)' }),
                          }}
                        >
                          <source src={PERSONA_MEDIA[index].video} type="video/mp4" />
                        </Box>
                      </Box>
                    </AreaConstruct>
                    <FadeTransition direction="up" delay={colDelay + VISUAL_LEAD} isTriggerOnView threshold={0.5}>
                      <CardTextStack
                        title={item.subtitle}
                        description={item.text}
                        sx={{ mt: 6, width: '100%' }}
                      />
                    </FadeTransition>
                  </>
                );
              })()}
            </Grid>
          ))}
        </LineGrid>
      </Stack>
    </SectionContainer>
  );
}

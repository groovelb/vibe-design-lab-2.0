'use client';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import { SectionContainer } from '../container/SectionContainer';
import LineGrid from '../layout/LineGrid';
import MarqueeContainer from '../motion/MarqueeContainer';
import { AreaConstruct } from '../motion/AreaConstruct';
import { ConstructType } from '../motion/ConstructType';
import { ConstructBlock } from '../motion/ConstructBlock';
import ScrollRevealText from '../kinetic-typography/ScrollRevealText';
import { SectionDivider } from '../typography/SectionDivider';
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
 * 카드 텍스트: ConstructType(타이틀) + ConstructBlock(설명).
 *
 * Example usage:
 * <LandingProblem />
 */
export function LandingProblem() {
  return (
    <SectionContainer>
      <Stack spacing={12}>
        <Box sx={{ mb: { xs: 4, md: 6 } }}>
          <SectionDivider label="Problem" sx={{ mb: 3 }} />
          <ScrollRevealText
            text={problem.headline}
            variant="h1"
            isSplitSentences={false}
            sx={{ letterSpacing: '-0.02em', wordSpacing: '0.15em', '& .MuiTypography-root': { lineHeight: 1.71 } }}
          />
          <Box sx={{ mt: 4 }}>
            <MarqueeContainer speed={25} direction="left" isPauseOnHover={false} isScrollScrub gap={1.5}>
              {problem.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  variant="outlined"
                  sx={{
                    bgcolor: 'transparent',
                    color: 'common.white',
                    borderColor: 'common.white',
                    fontWeight: 700,
                    fontSize: '1.75rem',
                    height: 76,
                    borderRadius: '38px',
                    '& .MuiChip-label': { px: 4 },
                  }}
                />
              ))}
            </MarqueeContainer>
          </Box>
        </Box>
        <LineGrid container gap={144} borderColor="divider">
          {problem.career.filter((_, i) => VISIBLE_INDICES.includes(i)).map((item, index) => {
            const colDelay = (index % 2) * COL_STAGGER;
            return (
              <Grid key={item.subtitle} size={{ xs: 12, md: 6 }}>
                <Box sx={{ mixBlendMode: 'screen' }}>
                  <AreaConstruct isTriggerOnView delay={colDelay}>
                    <Box sx={{ width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
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
                          filter: 'contrast(1.8) brightness(1.3)',
                          ...(index >= 1 && { transform: 'translateY(24px)' }),
                        }}
                      >
                        <source src={PERSONA_MEDIA[index].video} type="video/mp4" />
                      </Box>
                    </Box>
                  </AreaConstruct>
                </Box>
                <Box sx={{ mt: 6 }}>
                  <ConstructType
                    text={item.subtitle}
                    variant="h4"
                    typingSpeed={20}
                    delay={colDelay + VISUAL_LEAD}
                    sx={{ '& .MuiTypography-root': { fontWeight: 900 } }}
                  />
                  <ConstructBlock
                    text={item.text}
                    variant="body1"
                    duration={800}
                    delay={colDelay + VISUAL_LEAD + 200}
                    sx={{ mt: 2 }}
                  />
                </Box>
              </Grid>
            );
          })}
        </LineGrid>
      </Stack>
    </SectionContainer>
  );
}

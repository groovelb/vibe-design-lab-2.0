'use client';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { SectionContainer } from '../container/SectionContainer';
import { MythCard } from '../card/MythCard';
import { FitText } from '../typography/FitText';
import ScrollRevealText from '../kinetic-typography/ScrollRevealText';
import FadeTransition from '../motion/FadeTransition';
import { PAGES } from '../../data/contents';

const { whyVibeDesign } = PAGES.landing;

/**
 * LandingWhyVibeDesign 섹션 템플릿
 *
 * 편견 깨기(Myth-Busting) 프레임으로 인식을 전환하는 섹션.
 * 상단 statement(ScrollRevealText) + 3-col MythCard.
 * 각 카드 내부에서 통념→수직선→실제로 시각적 거리감을 표현.
 *
 * Example usage:
 * <LandingWhyVibeDesign />
 */
export function LandingWhyVibeDesign() {
  return (
    <>
      {/* 상단: Statement — 100svh */}
      <SectionContainer
        sx={{
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{ width: '100%', mb: { xs: 4, md: 6 } }}>
          <FitText text="Why Vibe Design" variant="headline" />
        </Box>
        <ScrollRevealText
          text={whyVibeDesign.statement}
          variant="display"
          isSplitSentences
          sx={{
            textAlign: 'center',
            letterSpacing: '-0.02em',
            wordSpacing: '0.15em',
            '& .MuiTypography-root': { lineHeight: 1.71, textAlign: 'center' },
          }}
        />
      </SectionContainer>

      {/* 하단: 3-column MythCard — 100svh */}
      <SectionContainer
        sx={{
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Grid container spacing={6} sx={{ flex: 1 }}>
          {whyVibeDesign.myths.map((myth, index) => (
            <Grid key={myth.label} size={{ xs: 12, md: 4 }}>
              <FadeTransition direction="up" delay={index * 100} isTriggerOnView sx={{ height: '100%' }}>
                <MythCard
                  label={myth.label}
                  philosophy={myth.philosophy}
                  conventional={myth.conventional}
                  reversal={myth.reversal}
                />
              </FadeTransition>
            </Grid>
          ))}
        </Grid>
      </SectionContainer>
    </>
  );
}

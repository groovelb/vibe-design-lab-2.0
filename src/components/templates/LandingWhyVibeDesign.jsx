'use client';
import Box from '@mui/material/Box';
import { SectionContainer } from '../container/SectionContainer';
import { FitText } from '../typography/FitText';
import ScrollRevealText from '../kinetic-typography/ScrollRevealText';
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
  );
}

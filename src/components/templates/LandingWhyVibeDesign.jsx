'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { HorizontalScrollContainer } from '../content-transition/HorizontalScrollContainer';
import { RatioContainer } from '../container/RatioContainer';
import ScrollRevealText from '../kinetic-typography/ScrollRevealText';
import { PAGES } from '../../data/contents';
import { EXAMPLES } from '../../data/example';

const { whyVibeDesign } = PAGES.landing;

/**
 * LandingWhyVibeDesign 섹션 템플릿
 *
 * 상단 ScrollRevealText + 가로 스크롤 카드 6장.
 * HorizontalScrollContainer로 세로→가로 스크롤 변환.
 *
 * Example usage:
 * <LandingWhyVibeDesign />
 */
export function LandingWhyVibeDesign() {
  return (
    <>
      <Box
        component="section"
        sx={{
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          px: { xs: 2, md: 6 },
        }}
      >
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
      </Box>

      <HorizontalScrollContainer gap="24px" padding="max(16px, calc(50vw - 704px))">
        {EXAMPLES.map((ex) => (
          <HorizontalScrollContainer.Slide key={ex.id}>
            <Box sx={{ width: '50vw' }}>
              <RatioContainer ratio="4:3" isContained sx={{ borderRadius: 2 }}>
                <video
                  src={ex.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </RatioContainer>
              <Typography variant="body1" sx={{ mt: 1.5, color: 'text.primary' }}>
                {ex.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {ex.description}
              </Typography>
            </Box>
          </HorizontalScrollContainer.Slide>
        ))}
      </HorizontalScrollContainer>
    </>
  );
}

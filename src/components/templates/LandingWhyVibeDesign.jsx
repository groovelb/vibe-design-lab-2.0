'use client';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { SectionContainer } from '../container/SectionContainer';
import LineGrid from '../layout/LineGrid';
import { MythCard } from '../card/MythCard';
import FadeTransition from '../motion/FadeTransition';
import { SectionDivider } from '../typography/SectionDivider';
import { PAGES } from '../../data/contents';

const { whyVibeDesign } = PAGES.landing;

/**
 * LandingWhyVibeDesign 섹션 템플릿
 *
 * 편견 깨기(Myth-Busting) 프레임으로 인식을 전환하는 섹션.
 * Problem(공감) → WhyVibeDesign(인식전환) → Difference(증명)
 *
 * Example usage:
 * <LandingWhyVibeDesign />
 */
export function LandingWhyVibeDesign() {
  return (
    <SectionContainer>
      <FadeTransition direction="up" isTriggerOnView>
        <SectionDivider label="Why" sx={{ mb: 3 }} />
        <Typography
          variant="h1"
          sx={{ fontWeight: 800, mb: { xs: 6, md: 10 } }}
        >
          {whyVibeDesign.statement}
        </Typography>
      </FadeTransition>

      <LineGrid container gap={96} borderColor="divider">
        {whyVibeDesign.myths.map((myth, index) => (
          <Grid key={myth.label} size={{ xs: 12, md: 4 }}>
            <FadeTransition direction="up" delay={index * 100} isTriggerOnView>
              <MythCard
                label={myth.label}
                conventional={myth.conventional}
                reversal={myth.reversal}
              />
            </FadeTransition>
          </Grid>
        ))}
      </LineGrid>
    </SectionContainer>
  );
}

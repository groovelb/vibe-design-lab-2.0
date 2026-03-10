'use client';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import LineGrid from '../layout/LineGrid';
import { PainPointCard } from '../card/PainPointCard';
import FadeTransition from '../motion/FadeTransition';
import { PAGES } from '../../data/contents';

const { hero } = PAGES.landing;

/**
 * LandingHeroPainPoints — 3축 그리드 (의도 / 어휘 / 설계)
 *
 * Example usage:
 * <LandingHeroPainPoints />
 */
export function LandingHeroPainPoints() {
  return (
    <Stack sx={{ height: '100%' }} justifyContent="center">
      <FadeTransition direction="up" delay={600} isTriggerOnView>
        <LineGrid container gap={96} borderColor="divider">
          {hero.painPoints.map((point) => (
            <Grid key={point.label} size={{ xs: 12, md: 4 }}>
              <PainPointCard label={point.label} description={point.text} />
            </Grid>
          ))}
        </LineGrid>
      </FadeTransition>
    </Stack>
  );
}

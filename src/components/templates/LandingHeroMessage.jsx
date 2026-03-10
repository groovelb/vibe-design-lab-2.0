'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FadeTransition from '../motion/FadeTransition';
import { PAGES } from '../../data/contents';

const { hero, footerCta } = PAGES.landing;

/**
 * LandingHeroMessage — 메인 메시지 영역 (headline + subCopy + CTA)
 *
 * Example usage:
 * <LandingHeroMessage />
 */
export function LandingHeroMessage() {
  return (
    <>
      <FadeTransition direction="up" isTriggerOnView>
        <Typography variant="display">
          {hero.headline}
        </Typography>
      </FadeTransition>

      <FadeTransition direction="up" delay={200} isTriggerOnView>
        <Typography
          variant="h3"
          sx={{ color: 'text.secondary', fontWeight: 400, lineHeight: 1.75 }}
        >
          {hero.subCopy}
        </Typography>
      </FadeTransition>

      <FadeTransition direction="up" delay={400} isTriggerOnView>
        <Button variant="contained" size="large" href="/course" sx={{ mt: 8 }}>
          {footerCta.cta}
        </Button>
      </FadeTransition>
    </>
  );
}

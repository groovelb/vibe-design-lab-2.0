'use client';
import Typography from '@mui/material/Typography';
import { PAGES } from '../../data/contents';

const { hero } = PAGES.landing;

/**
 * LandingHeroMessage — 메인 메시지 영역 (headline)
 *
 * headline은 즉시 표시 (앵커 역할).
 * CTA는 FooterCTA 섹션에서 담당.
 *
 * Example usage:
 * <LandingHeroMessage />
 */
export function LandingHeroMessage() {
  return (
    <Typography
      variant="display"
      sx={{
        textShadow: '0 0 24px hsl(260, 12%, 96%, 0.4)',
      }}
    >
      {hero.headline}
    </Typography>
  );
}

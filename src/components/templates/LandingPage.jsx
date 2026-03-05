'use client';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { AppShell } from '../layout/AppShell';
import { NavMenu } from '../navigation/NavMenu';
import { LandingHero } from './LandingHero';
import { LandingProblem } from './LandingProblem';
import { LandingDifference } from './LandingDifference';
import { LandingCourseHighlight } from './LandingCourseHighlight';
import { LandingCourseReview } from './LandingCourseReview';
import { LandingDictionaryPreview } from './LandingDictionaryPreview';
import { LandingCommunitySnapshot } from './LandingCommunitySnapshot';
import { LandingFooterCTA } from './LandingFooterCTA';
import { GNB as GNB_DATA } from '../../data/contents';

const navItems = GNB_DATA.menus.map((menu) => ({
  id: menu.href,
  label: menu.label,
}));

/**
 * LandingPage 컴포넌트
 *
 * VDL Landing 페이지 전체를 조립하는 페이지 컴포넌트.
 * AppShell(GNB) + 8개 섹션 템플릿으로 구성된 자체 완결형 전환 퍼널.
 *
 * 퍼널 흐름:
 * Hook (Hero) → Pain (Problem) → Solution (Difference) →
 * Offer (Course Highlight) → Proof (Course Review) →
 * Trust (Dictionary) → Belonging (Community) → Final CTA
 *
 * Example usage:
 * <LandingPage />
 */
export function LandingPage() {
  return (
    <AppShell
      logo={
        <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
          {GNB_DATA.logo}
        </Typography>
      }
      headerCollapsible={
        <NavMenu items={navItems} variant="underline" />
      }
      headerPersistent={
        <Button
          variant="contained"
          size="small"
          sx={{ display: { xs: 'none', sm: 'flex' } }}
        >
          {GNB_DATA.cta}
        </Button>
      }
      isHeaderTransparent
      hasHeaderBorder={false}
    >
      <LandingHero />
      <LandingProblem />
      <LandingDifference />
      <LandingCourseHighlight />
      <LandingCourseReview />
      <LandingDictionaryPreview />
      <LandingCommunitySnapshot />
      <LandingFooterCTA />
    </AppShell>
  );
}

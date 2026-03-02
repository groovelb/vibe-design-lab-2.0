import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { AppShell } from '../../components/layout/AppShell';
import { NavMenu } from '../../components/navigation/NavMenu';
import { LandingHero } from '../../components/templates/LandingHero';
import { LandingProblem } from '../../components/templates/LandingProblem';
import { LandingDifference } from '../../components/templates/LandingDifference';
import { LandingCourseHighlight } from '../../components/templates/LandingCourseHighlight';
import { LandingCourseReview } from '../../components/templates/LandingCourseReview';
import { LandingDictionaryPreview } from '../../components/templates/LandingDictionaryPreview';
import { LandingCommunitySnapshot } from '../../components/templates/LandingCommunitySnapshot';
import { LandingFooterCTA } from '../../components/templates/LandingFooterCTA';
import { GNB as GNB_DATA } from '../../data/contents';

const navItems = GNB_DATA.menus.map((menu) => ({
  id: menu.href,
  label: menu.label,
}));

export default {
  title: 'Page/Landing',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Landing Page

VDL의 자체 완결형 전환 퍼널.
방문자가 이 한 페이지만으로 서사를 완주한다.

**퍼널 흐름:**
Hook (Hero) → Pain (Problem) → Solution (Difference) → Offer (Course Highlight) → Proof (Course Review) → Trust (Dictionary) → Belonging (Community) → Final CTA
        `,
      },
    },
  },
};

/**
 * ## 전체 페이지
 *
 * 8개 섹션이 조립된 Landing 페이지 전체 플로우.
 * AppShell(GNB) 안에서 스크롤하며 전환 퍼널을 경험한다.
 */
export const FullPage = {
  render: () => (
    <AppShell
      logo={
        <Typography variant="subtitle1" sx={{ fontWeight: 700, letterSpacing: '-0.5px' }}>
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
  ),
};

import { LandingHero } from '../../components/templates/LandingHero';
import { LandingProblem } from '../../components/templates/LandingProblem';
import { LandingWhyVibeDesign } from '../../components/templates/LandingWhyVibeDesign';
import { LandingSolution } from '../../components/templates/LandingSolution';
import { LandingCourseHighlight } from '../../components/templates/LandingCourseHighlight';
import { LandingCourseReview } from '../../components/templates/LandingCourseReview';
import { LandingDictionaryPreview } from '../../components/templates/LandingDictionaryPreview';
import { LandingCommunitySnapshot } from '../../components/templates/LandingCommunitySnapshot';
import { SiteFooter } from '../../components/layout/SiteFooter';
import { LandingShowcaseOriginal } from '../../components/templates/LandingShowcaseOriginal';
import { LandingShowcaseMagnifier } from '../../components/templates/LandingShowcaseMagnifier';

export default {
  title: 'Template/Landing',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Landing 섹션 템플릿

Landing 페이지를 구성하는 9개 섹션 템플릿.
각 섹션은 전환 퍼널의 한 단계를 담당한다.
        `,
      },
    },
  },
};

/** S1. Hook — "이곳은 뭐하는 곳인가" */
export const S1_Hero = {
  name: 'S1. Hero',
  render: () => <LandingHero />,
};

/** S2. Pain — "시장은 바뀌는데 배울 곳이 없다" */
export const S2_Problem = {
  name: 'S2. Problem',
  render: () => <LandingProblem />,
};

/** S3. Why — "빠진 건 코딩이 아니라 디자인이다" */
export const S3_WhyVibeDesign = {
  name: 'S3. Why Vibe Design',
  render: () => <LandingWhyVibeDesign />,
};

/** S4. Solution — "구현은 언어를 따른다" */
export const S4_Solution = {
  name: 'S4. Solution',
  render: () => <LandingSolution />,
};

/** S5. Offer — "이 코스가 해결한다" */
export const S5_CourseHighlight = {
  name: 'S5. Course Highlight',
  render: () => <LandingCourseHighlight />,
};

/** S6. Proof — "실제 멤버가 증명한다" */
export const S6_CourseReview = {
  name: 'S6. Course Review',
  render: () => <LandingCourseReview />,
};

/** S7. Trust — "체계가 실재한다" */
export const S7_DictionaryPreview = {
  name: 'S7. Dictionary Preview',
  render: () => <LandingDictionaryPreview />,
};

/** S8. Belonging — "지금도 일어나고 있다" */
export const S8_CommunitySnapshot = {
  name: 'S8. Community Snapshot',
  render: () => <LandingCommunitySnapshot />,
};

/** Showcase — Original (hover 재생 + opacity) */
export const Showcase_Original = {
  name: 'Showcase — Original',
  render: () => <LandingShowcaseOriginal />,
};

/** Showcase — Magnifier (Fixed-Frame dual-layer) */
export const Showcase_Magnifier = {
  name: 'Showcase — Magnifier',
  render: () => <LandingShowcaseMagnifier />,
};

/** S9. Final CTA — "시작합니다" */
export const S9_FooterCTA = {
  name: 'S9. Footer CTA',
  render: () => <SiteFooter />,
};

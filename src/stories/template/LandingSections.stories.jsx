import { LandingHero } from '../../components/templates/LandingHero';
import { LandingProblem } from '../../components/templates/LandingProblem';
import { LandingDifference } from '../../components/templates/LandingDifference';
import { LandingCourseHighlight } from '../../components/templates/LandingCourseHighlight';
import { LandingCourseReview } from '../../components/templates/LandingCourseReview';
import { LandingDictionaryPreview } from '../../components/templates/LandingDictionaryPreview';
import { LandingCommunitySnapshot } from '../../components/templates/LandingCommunitySnapshot';
import { LandingFooterCTA } from '../../components/templates/LandingFooterCTA';

export default {
  title: 'Template/Landing',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Landing 섹션 템플릿

Landing 페이지를 구성하는 8개 섹션 템플릿.
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

/** S3. Solution — "VOD가 아니다" */
export const S3_Difference = {
  name: 'S3. Difference',
  render: () => <LandingDifference />,
};

/** S4. Offer — "이 코스가 해결한다" */
export const S4_CourseHighlight = {
  name: 'S4. Course Highlight',
  render: () => <LandingCourseHighlight />,
};

/** S5. Proof — "실제 멤버가 증명한다" */
export const S5_CourseReview = {
  name: 'S5. Course Review',
  render: () => <LandingCourseReview />,
};

/** S6. Trust — "체계가 실재한다" */
export const S6_DictionaryPreview = {
  name: 'S6. Dictionary Preview',
  render: () => <LandingDictionaryPreview />,
};

/** S7. Belonging — "지금도 일어나고 있다" */
export const S7_CommunitySnapshot = {
  name: 'S7. Community Snapshot',
  render: () => <LandingCommunitySnapshot />,
};

/** S8. Final CTA — "시작합니다" */
export const S8_FooterCTA = {
  name: 'S8. Footer CTA',
  render: () => <LandingFooterCTA />,
};

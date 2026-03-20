import { LandingPage } from '../../components/page/LandingPage';
import { AmbientGrainedBackground } from '../../components/dynamic-color/AmbientGrainedBackground';

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
Hook (Hero) → Pain (Problem) → Why (인식전환) → Solution (Difference) → Offer (Course Highlight) → Proof (Course Review) → Trust (Dictionary) → Belonging (Community) → Final CTA
        `,
      },
    },
  },
};

/**
 * ## 전체 페이지
 *
 * 8개 섹션이 조립된 Landing 페이지 전체 플로우.
 */
export const FullPage = {
  render: () => (
    <>
      <AmbientGrainedBackground />
      <LandingPage />
    </>
  ),
};

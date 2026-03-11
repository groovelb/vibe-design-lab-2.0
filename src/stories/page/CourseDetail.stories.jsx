import { CourseDetailPage } from '../../components/page/CourseDetailPage';

export default {
  title: 'Page/CourseDetail',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Course Detail Page

코스 상세 페이지 전체 플로우.
15개 섹션 템플릿으로 구성된 전환 퍼널.

**퍼널 흐름:**
Hero → Learning Goals → Target Audience → Review → Vision →
Showcase → Role → Composition → Curriculum → FAQ →
Instructor → Schedule → Early Bird → CTA + FloatingCTA
        `,
      },
    },
  },
};

/**
 * ## 전체 페이지
 *
 * 15개 섹션이 조립된 Course Detail 페이지 전체 플로우.
 */
export const FullPage = {
  render: () => <CourseDetailPage />,
};

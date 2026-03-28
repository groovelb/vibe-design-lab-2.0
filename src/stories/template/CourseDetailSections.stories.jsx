import { CourseDetailHero } from '../../components/templates/CourseDetailHero';
import { CourseDetailLearningGoals } from '../../components/templates/CourseDetailLearningGoals';
import { CourseDetailTargetAudience } from '../../components/templates/CourseDetailTargetAudience';
import { CourseDetailReview } from '../../components/templates/CourseDetailReview';
import { CourseDetailVision } from '../../components/templates/CourseDetailVision';
import { CourseDetailShowcase } from '../../components/templates/CourseDetailShowcase';
import { CourseDetailRole } from '../../components/templates/CourseDetailRole';
import { CourseDetailComposition } from '../../components/templates/CourseDetailComposition';
import { CourseDetailCurriculum } from '../../components/templates/CourseDetailCurriculum';
import { CourseDetailFAQ } from '../../components/templates/CourseDetailFAQ';
import { CourseDetailInstructor } from '../../components/templates/CourseDetailInstructor';

import { CourseDetailCTA } from '../../components/templates/CourseDetailCTA';

export default {
  title: 'Template/CourseDetail',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Course Detail 섹션 템플릿

Course Detail 페이지를 구성하는 13개 섹션 템플릿.
각 섹션은 독립적으로 렌더링 가능하다.
        `,
      },
    },
  },
};

/** S1. Hero — 코스 타이틀 + 썸네일 + CTA */
export const S1_Hero = {
  name: 'S1. Hero',
  render: () => <CourseDetailHero />,
};

/** S2. Learning Goals — 3칼럼 학습 목표 */
export const S2_LearningGoals = {
  name: 'S2. Learning Goals',
  render: () => <CourseDetailLearningGoals />,
};

/** S3. Target Audience — 수강 대상 캐러셀 */
export const S3_TargetAudience = {
  name: 'S3. Target Audience',
  render: () => <CourseDetailTargetAudience />,
};

/** S4. Review — 수강생 + 웨비나 후기 */
export const S4_Review = {
  name: 'S4. Review',
  render: () => <CourseDetailReview />,
};

/** S5. Vision — 바이브 디자이너 vs 메이커 개발자 */
export const S5_Vision = {
  name: 'S5. Vision',
  render: () => <CourseDetailVision />,
};

/** S6. Showcase — 스타터키트 사례 + 포트폴리오 */
export const S6_Showcase = {
  name: 'S6. Showcase',
  render: () => <CourseDetailShowcase />,
};

/** S7. Role — 현실 문제 → 해결 4카드 */
export const S7_Role = {
  name: 'S7. Role',
  render: () => <CourseDetailRole />,
};

/** S8. Composition — 스타터 키트 구성 */
export const S8_Composition = {
  name: 'S8. Composition',
  render: () => <CourseDetailComposition />,
};

/** S9. Curriculum — 4챕터 아코디언 */
export const S9_Curriculum = {
  name: 'S9. Curriculum',
  render: () => <CourseDetailCurriculum />,
};

/** S10. FAQ — Q&A 아코디언 */
export const S10_FAQ = {
  name: 'S10. FAQ',
  render: () => <CourseDetailFAQ />,
};

/** S11. Course Lead — 강사 프로필 */
export const S11_CourseLead = {
  name: 'S11. Course Lead',
  render: () => <CourseDetailInstructor />,
};


/** S13. CTA — 최종 CTA + 부가 링크 */
export const S13_CTA = {
  name: 'S13. CTA',
  render: () => <CourseDetailCTA />,
};

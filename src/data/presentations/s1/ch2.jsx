/**
 * S1-Ch2 덱 정의 — 바이브 디자인: 관점의 전환
 */
import { vibeDesignSlides } from './slides/2-a-vibe-design';
import { taxonomySlides } from './slides/2-b-taxonomy';
import { frameworkSlides } from './slides/2-c-framework';
import { ecosystemSlides } from './slides/2-d-ecosystem';
import { devSetupSlides } from './slides/2-e-dev-setup';

export const S1_Ch2 = {
  id: 'S1-Ch2',
  title: 'Ch2. 바이브 디자인: 관점의 전환',
  chapters: [
    {
      id: 'Ch2',
      title: '바이브 디자인: 관점의 전환',
      parts: [
        {
          id: '2-A',
          title: '왜 바이브 디자인인가',
          slides: vibeDesignSlides,
        },
        {
          id: '2-B',
          title: '디자인 택소노미 활용법: 컴포넌트와 스타일의 분류 체계',
          slides: taxonomySlides,
        },
        {
          id: '2-C',
          title: '왜 프레임워크가 필요한가: 피그마와 React.js의 관계',
          slides: frameworkSlides,
        },
        {
          id: '2-D',
          title: '디자인 vs 개발 생태계 비교하기',
          slides: ecosystemSlides,
        },
        {
          id: '2-E',
          title: '개발환경 세팅 & 익숙해지기',
          slides: devSetupSlides,
        },
      ],
    },
  ],
};

/**
 * S1 덱 정의
 *
 * 구조: chapters > parts > slides
 * 각 part의 slides는 별도 모듈에서 import.
 * slides/ 폴더 = 파트별 슬라이드 데이터 모듈.
 *
 * 기반: vdsk_online_curriculum.json S1
 */
import { prologueSlides } from './slides/s1-p-a-prologue';
import { vibeDesignSlides } from './slides/2-a-vibe-design';
import { taxonomySlides } from './slides/2-b-taxonomy';
import { frameworkSlides } from './slides/2-c-framework';
import { ecosystemSlides } from './slides/2-d-ecosystem';
import { devSetupSlides } from './slides/2-e-dev-setup';
import { aiCollabSlides } from './slides/3-f-ai-collab';
import { errorsSlides } from './slides/3-b-errors';
import { practiceSlides } from './slides/3-eb-practice';

export const S1 = {
  id: 'S1',
  title: '바이브 디자인: 새로운 사고에 적응하기',
  chapters: [
    // ─── Ch1: 프롤로그 ───
    {
      id: 'Ch1',
      title: '디자인의 본질은 도구일까, 의도일까?',
      parts: [
        {
          id: 'S1-P-A',
          title: '10년간의 디발자: 디자이너이자 개발자로서 깨달은 것',
          slides: prologueSlides,
        },
      ],
    },

    // ─── Ch2: 관점의 전환 ───
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

    // ─── Ch3: AI 협업 ───
    {
      id: 'Ch3',
      title: 'AI와 협업에 적합한 태도와 접근법',
      parts: [
        {
          id: '3-F',
          title: '감당할 만큼의 사고와 글쓰기',
          slides: aiCollabSlides,
        },
        {
          id: '3-B',
          title: '오류는 흔한 것이다: 올바른 대처 방법',
          slides: errorsSlides,
        },
        {
          id: '3-EB',
          title: '코드 수정 + 자유 실습',
          slides: practiceSlides,
        },
      ],
    },
  ],
};

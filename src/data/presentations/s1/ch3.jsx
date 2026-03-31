/**
 * S1-Ch3 덱 정의 — AI와 협업에 적합한 태도와 접근법
 */
import { aiCollabSlides } from './slides/3-f-ai-collab';
import { errorsSlides } from './slides/3-b-errors';
import { practiceSlides } from './slides/3-eb-practice';

export const S1_Ch3 = {
  id: 'S1-Ch3',
  title: 'Ch3. AI와 협업에 적합한 태도와 접근법',
  chapters: [
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

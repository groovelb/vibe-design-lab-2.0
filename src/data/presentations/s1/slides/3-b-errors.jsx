/**
 * Part 3-B — 오류는 흔한 것이다: 올바른 대처 방법
 */
import {
  SlideChapterTitle,
  SlideHSplit,
  SlideMessage,
  SlideList,
} from '../../../../components/presentation';
import Placeholder from '../../../../common/ui/Placeholder';

export const errorsSlides = [
  {
    id: '3-B-1',
    title: '어디를 어떻게 수정할지 정확히 아는법',
    render: () => (
      <SlideChapterTitle
        overline="PART B"
        title="오류는 흔한 것이다"
        summary="올바른 대처 방법"
        toc={[
          '어디를 어떻게 수정할지 정확히 아는법',
          '오류 유형과 대처법',
          '스토리북/디자인 시스템 예고',
        ]}
      />
    ),
  },
  {
    id: '3-B-2',
    title: '오류 유형과 대처법',
    render: () => (
      <SlideHSplit>
        <SlideList
          items={[
            '빨간 에러: 문법 오류 → AI가 바로 수정',
            '노란 경고: 개선 권고 → 무시 가능',
            '흰 화면: 런타임 오류 → 콘솔 확인',
            '의도 불일치: 맥락적 오류 → 프롬프트 수정',
          ]}
          level="headline"
        />
        <Placeholder.Box label="에러 화면 예시" />
      </SlideHSplit>
    ),
  },
  {
    id: '3-B-3',
    title: '스토리북/디자인 시스템 예고',
    render: () => (
      <SlideMessage>다음 시간: 스토리북과 디자인 시스템</SlideMessage>
    ),
  },
];

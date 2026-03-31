/**
 * Part 2-A — 왜 바이브 디자인인가
 */
import {
  SlideChapterTitle,
  SlideHSplit,
  SlideMessage,
  SlideTypoStack,
  SlideList,
  SlideStorytelling,
} from '../../../../components/presentation';

export const vibeDesignSlides = [
  {
    id: '2-A-1',
    title: '코스 로드맵 + 4섹션 구조 안내',
    render: () => (
      <SlideChapterTitle
        overline="CHAPTER 02"
        title="바이브 디자인: 관점의 전환"
        summary="이 챕터에서는 바이브 디자인의 핵심 개념을 소개하고, 디자인 택소노미가 왜 중요한지 탐구합니다."
        toc={[
          '왜 바이브 디자인인가',
          '디자인 택소노미 활용법: 컴포넌트와 스타일의 분류 체계',
          '왜 프레임워크가 필요한가: 피그마와 React.js의 관계',
          '디자인 vs 개발 생태계 비교하기',
          '개발환경 세팅 & 익숙해지기',
        ]}
      />
    ),
  },
  {
    id: '2-A-2',
    title: '바이브코딩에 대한 오해: 캐퍼시의 암묵지',
    render: () => (
      <SlideHSplit>
        <SlideTypoStack
          title="바이브코딩에 대한 오해"
          body="캐퍼시의 암묵지 — 도구 숙련도가 아니라 디자인 언어 체계의 이해가 핵심입니다."
        />
        <SlideList
          items={[
            '도구를 잘 다루는 것 ≠ 디자인을 잘 아는 것',
            '암묵지: 경험으로만 전달되던 판단 기준',
            '바이브코딩: 암묵지를 언어로 명시화하는 과정',
          ]}
          level="headline"
        />
      </SlideHSplit>
    ),
  },
  {
    id: '2-A-3',
    title: '맥락적 오류 VS 컴파일 오류',
    render: () => (
      <SlideHSplit>
        <SlideTypoStack
          title="맥락적 오류"
          body="의도와 결과의 불일치입니다. 코드는 돌아가지만 디자인 의도가 구현되지 않은 상태죠."
        />
        <SlideTypoStack
          title="컴파일 오류"
          body="문법 오류입니다. AI가 즉시 수정 가능하죠. 진짜 문제가 아닙니다."
        />
      </SlideHSplit>
    ),
  },
  {
    id: '2-A-4',
    title: '바이브 디자인이란',
    render: () => (
      <SlideMessage>"디자인 의도를 체계적 언어로 전달하는 것"</SlideMessage>
    ),
  },
  {
    id: '2-A-5',
    title: '디자인 택소노미 소개',
    render: () => (
      <SlideHSplit>
        <SlideTypoStack
          title="디자인은 항상 체계였다"
          subtitle="디자인 택소노미"
          body="포화상태 분류체계 — 새로운 UI 패턴이 등장해도 체계 안에서 설명 가능합니다."
        />
        <SlideList
          items={[
            'Typography', 'Container', 'Card', 'Media', 'Data Display',
            'In-page Navigation', 'Input & Control', 'Layout',
            'Overlay & Feedback', 'Navigation (Global)',
          ]}
          variant="number"
          level="body"
        />
      </SlideHSplit>
    ),
  },
  {
    id: '2-A-6',
    title: 'UX 디자인이 바이브 디자인이 되기까지',
    render: () => (
      <SlideStorytelling
        from="UX 디자인: 사용자 경험을 설계합니다"
        to="바이브 디자인: 의도를 체계적 언어로 전달합니다"
        arrowLabel="진화"
      />
    ),
  },
];

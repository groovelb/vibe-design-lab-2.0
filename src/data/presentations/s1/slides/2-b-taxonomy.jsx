/**
 * Part 2-B — 디자인 택소노미 활용법: 컴포넌트와 스타일의 분류 체계
 */
import {
  SlideChapterTitle,
  SlideGrid,
  SlideHSplit,
  SlideMessage,
  SlideTypoStack,
  SlideList,
} from '../../../../components/presentation';
import Placeholder from '../../../../common/ui/Placeholder';

export const taxonomySlides = [
  {
    id: '2-B-1',
    title: '15카테고리 분류 체계 소개',
    render: () => (
      <SlideChapterTitle
        overline="PART B"
        title="디자인 택소노미 활용법"
        summary="컴포넌트와 스타일의 분류 체계"
        toc={[
          '15카테고리 분류 체계',
          '디자인 프리뷰: 좋은 디자인은 이렇게 분해된다',
          '실습: HTML 카페메뉴 만들기',
        ]}
      />
    ),
  },
  {
    id: '2-B-2',
    title: '좋은 디자인은 이렇게 분해된다',
    render: () => (
      <SlideGrid columns={2}>
        <Placeholder.Box label="디자인 예시 A" />
        <Placeholder.Box label="분해 결과 A" />
        <Placeholder.Box label="디자인 예시 B" />
        <Placeholder.Box label="분해 결과 B" />
      </SlideGrid>
    ),
  },
  {
    id: '2-B-3',
    title: '실습: HTML 카페메뉴 만들기',
    render: () => (
      <SlideMessage>실습: HTML 카페메뉴 만들기</SlideMessage>
    ),
  },
  {
    id: '2-B-4',
    title: '웹 프로그래밍 기초, 어디까지 알아야 하나요?',
    render: () => (
      <SlideHSplit>
        <SlideTypoStack
          title="여기서 잠깐"
          subtitle="웹 프로그래밍 기초"
          body="어디까지 알아야 하나요?"
        />
        <SlideList
          items={[
            'HTML: 구조를 만드는 뼈대',
            'CSS: 스타일을 입히는 옷',
            'JavaScript: 동작을 만드는 근육',
          ]}
          level="headline"
        />
      </SlideHSplit>
    ),
  },
  {
    id: '2-B-5',
    title: '실습: 자유 주제 1개 만들기',
    render: () => (
      <SlideMessage>실습: 자유 주제 1개 만들기</SlideMessage>
    ),
  },
];

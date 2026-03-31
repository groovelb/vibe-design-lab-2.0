/**
 * Part 2-C — 왜 프레임워크가 필요한가: 피그마와 React.js의 관계
 */
import {
  SlideChapterTitle,
  SlideGrid,
  SlideHSplit,
  SlideMessage,
  SlideTypoStack,
  SlideList,
  SlideStorytelling,
} from '../../../../components/presentation';

export const frameworkSlides = [
  {
    id: '2-C-1',
    title: '1세대 UX디자이너가 바꿔놓은 것들',
    render: () => (
      <SlideChapterTitle
        overline="PART C"
        title="왜 프레임워크가 필요한가"
        summary="피그마와 React.js의 관계"
        toc={[
          '1세대 UX디자이너가 바꿔놓은 것들',
          '실습: 카페메뉴를 React로 변환',
          'React 개발 기초',
          '코드를 다 읽지 말고 범위를 확인하라',
        ]}
      />
    ),
  },
  {
    id: '2-C-2',
    title: '실습: 카페메뉴를 React로 변환해보기',
    render: () => (
      <SlideMessage>실습: 카페메뉴를 React로 변환해보기</SlideMessage>
    ),
  },
  {
    id: '2-C-3',
    title: 'React는 어디까지 알아야 하나요?',
    render: () => (
      <SlideHSplit>
        <SlideTypoStack
          title="여기서 잠깐"
          subtitle="React는 어디까지 알아야 하나요?"
        />
        <SlideList
          items={[
            '컴포넌트: 재사용 가능한 UI 조각',
            'Props: 컴포넌트에 전달하는 설정값',
            '상태: 컴포넌트가 기억하는 값',
          ]}
          level="headline"
        />
      </SlideHSplit>
    ),
  },
  {
    id: '2-C-4',
    title: 'React 개발 기초',
    render: () => (
      <SlideGrid columns={2}>
        <SlideTypoStack headline="JSX" body="HTML처럼 생긴 JavaScript" />
        <SlideTypoStack headline="Props" body="부모→자식 데이터 전달" />
        <SlideTypoStack headline="Component" body="재사용 가능한 UI 단위" />
        <SlideTypoStack headline="기본 문법" body="변수, 조건, 반복" />
      </SlideGrid>
    ),
  },
  {
    id: '2-C-5',
    title: '코드를 다 읽지 말고 범위를 확인하라',
    render: () => (
      <SlideStorytelling
        from="코드를 한 줄 한 줄 다 읽어야 한다?"
        to="범위를 먼저 확인하고 필요한 부분만 읽으세요"
      />
    ),
  },
];

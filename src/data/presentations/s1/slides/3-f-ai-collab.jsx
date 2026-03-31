/**
 * Part 3-F — 감당할 만큼의 사고와 글쓰기
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

export const aiCollabSlides = [
  {
    id: '3-F-1',
    title: 'AI 협업의 현실',
    render: () => (
      <SlideChapterTitle
        overline="CHAPTER 03"
        title="AI와 협업에 적합한 태도와 접근법"
        summary="감당할 만큼의 사고와 글쓰기"
        toc={[
          'AI 협업의 현실: 진짜 vs 가짜 걱정',
          '질문→결정→검수 프레임',
          '3단계 글쓰기',
          'Claude Code의 역할',
          '워밍업 실습',
        ]}
      />
    ),
  },
  {
    id: '3-F-2',
    title: '질문→결정→검수 프레임',
    render: () => (
      <SlideHSplit columns={3}>
        <SlideTypoStack headline="질문" body="무엇을 만들 것인가?" />
        <SlideTypoStack headline="결정" body="어떻게 구현할 것인가?" />
        <SlideTypoStack headline="검수" body="의도대로 되었는가?" />
      </SlideHSplit>
    ),
  },
  {
    id: '3-F-3',
    title: '내 말의 영향력 책임지기',
    render: () => (
      <SlideStorytelling
        from="코드를 직접 쓰지 않으니 책임이 없다?"
        to="내 말이 곧 코드입니다. 코드를 부품처럼 다뤄야 합니다."
      />
    ),
  },
  {
    id: '3-F-4',
    title: '3단계 글쓰기',
    render: () => (
      <SlideGrid columns={3}>
        <SlideTypoStack headline="1. 목적" body="왜 만드는가?" />
        <SlideTypoStack headline="2. 방법" body="어떻게 만드는가?" />
        <SlideTypoStack headline="3. 스타일" body="어떤 느낌으로?" />
      </SlideGrid>
    ),
  },
  {
    id: '3-F-5',
    title: 'Claude Code의 역할',
    render: () => (
      <SlideHSplit>
        <SlideTypoStack
          title="Claude Code의 역할"
          body="코딩 도구가 아니라 협업 파트너입니다. 의도를 전달하면 구현을 함께 만들어갑니다."
        />
        <SlideList
          items={[
            '질문하면 맥락을 파악합니다',
            '코드를 읽고 구조를 이해합니다',
            '수정 범위를 스스로 판단합니다',
          ]}
          level="headline"
        />
      </SlideHSplit>
    ),
  },
  {
    id: '3-F-6',
    title: '워밍업 실습 가이드',
    render: () => (
      <SlideMessage>워밍업 실습 가이드</SlideMessage>
    ),
  },
];

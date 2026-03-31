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
  SlideDescList,
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
          '수강생들의 실제 걱정',
          '상황 인식 3가지 습관',
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
    title: '진짜 걱정 vs 가짜 걱정',
    render: () => (
      <SlideHSplit>
        <SlideDescList
          items={[
            { title: '가짜 걱정', desc: '컴파일 에러(빨간 글씨), 노트북 고장\n— 실제론 복구 가능합니다.' },
            { title: '진짜 걱정', desc: '지금 무슨 일이 일어나는지 모르고 작업하는 것\n— 의도 불일치가 진짜 문제입니다.' },
          ]}
        />
        <SlideDescList
          items={[
            { title: '조선영', desc: '"코드가 꼬이면 어떡하지?"' },
            { title: '신지예', desc: '"검은화면에 밝은 글씨로 뭔가 주르르륵... 노트북 잘못될까봐"' },
            { title: '한지연', desc: '"클로드가 고쳤다는데 아닌거 같음,,"' },
          ]}
        />
      </SlideHSplit>
    ),
  },
  {
    id: '3-F-3',
    title: '상황 인식 3가지 습관',
    render: () => (
      <SlideHSplit>
        <SlideTypoStack
          headline="상황 인식 3가지 습관"
          body="지금 무슨 일이 일어나는지 아는 것이 가장 중요합니다."
        />
        <SlideList
          items={[
            'Claude 작업 결과 설명 읽기',
            'Source Control 탭 확인하기',
            '브라우저에서 직접 확인하기',
          ]}
          level="headline"
          variant="number"
        />
      </SlideHSplit>
    ),
  },
  {
    id: '3-F-4',
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
    id: '3-F-5',
    title: '내 말의 영향력 책임지기',
    render: () => (
      <SlideStorytelling
        from="코드를 직접 쓰지 않으니 책임이 없다?"
        to="내 말이 곧 코드입니다. 코드를 부품처럼 다뤄야 합니다."
      />
    ),
  },
  {
    id: '3-F-6',
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
    id: '3-F-7',
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
    id: '3-F-8',
    title: '워밍업 실습 가이드',
    render: () => (
      <SlideMessage>워밍업 실습 가이드</SlideMessage>
    ),
  },
];

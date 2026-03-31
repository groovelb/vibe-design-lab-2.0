/**
 * Part 3-EB — 코드 수정 + 자유 실습
 */
import {
  SlideChapterTitle,
  SlideHSplit,
  SlideMessage,
  SlideTypoStack,
  SlideList,
} from '../../../../components/presentation';

export const practiceSlides = [
  {
    id: '3-EB-1',
    title: '코드 수정 실습',
    render: () => (
      <SlideChapterTitle
        overline="실습"
        title="코드 수정 + 자유 실습"
        summary="3가지 수정 실습: 색상, 레이아웃, 폰트"
        toc={[
          '코드 수정 실습',
          '자유 실습: 원하는 것 만들기',
          'git → Vercel 배포하기',
        ]}
      />
    ),
  },
  {
    id: '3-EB-2',
    title: '자유 실습',
    render: () => (
      <SlideMessage>자유 실습: 원하는 것 아무거나 만들기</SlideMessage>
    ),
  },
  {
    id: '3-EB-3',
    title: 'git → Vercel 배포하기',
    render: () => (
      <SlideHSplit>
        <SlideTypoStack
          title="git → Vercel 배포"
          body="코드를 GitHub에 올리고, Vercel이 자동으로 웹사이트로 만들어줍니다."
        />
        <SlideList
          items={[
            'git add → commit → push',
            'Vercel 연결',
            '자동 배포 확인',
          ]}
          variant="number"
          level="headline"
        />
      </SlideHSplit>
    ),
  },
];

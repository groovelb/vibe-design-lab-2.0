/**
 * Part 2-D — 디자인 vs 개발 생태계 비교하기
 */
import {
  SlideChapterTitle,
  SlideHSplit,
  SlideTypoStack,
} from '../../../../components/presentation';

export const ecosystemSlides = [
  {
    id: '2-D-1',
    title: '컴포넌트 재사용: 피그마 vs React',
    render: () => (
      <SlideChapterTitle
        overline="PART D"
        title="디자인 vs 개발 생태계 비교하기"
        summary="같은 개념, 다른 도구"
        toc={[
          '컴포넌트 재사용: 피그마 vs React',
          '실행과 배포: 피그마 vs React',
        ]}
      />
    ),
  },
  {
    id: '2-D-2',
    title: '실행과 배포: 피그마 vs React',
    render: () => (
      <SlideHSplit>
        <SlideTypoStack
          headline="피그마"
          body="프로토타입 → 공유 링크 → 핸드오프"
        />
        <SlideTypoStack
          headline="React"
          body="개발 → 빌드 → 배포 → URL"
        />
      </SlideHSplit>
    ),
  },
];

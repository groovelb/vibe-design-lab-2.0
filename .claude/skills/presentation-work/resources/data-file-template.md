# Data File Template

> 새 덱 파일 생성 시 사용하는 보일러플레이트.

---

## 덱 파일 구조

```jsx
// src/data/presentations/s{n}.jsx

/**
 * S{N} 덱 정의
 *
 * 구조: chapters > parts > slides
 * 각 slide = { id, title, render }
 * render: () => JSX — 레이아웃 + 엘리먼트 직접 조합
 *
 * 기반: vdsk_online_curriculum.json S{N}
 */
import {
  SlideChapterTitle,
  SlideHSplit,
  SlideGrid,
  SlideMessage,
  SlideTypoStack,
  SlideList,
  SlideDescList,
  SlideStorytelling,
  SlideImage,
} from '../../components/presentation';

export const S{N} = {
  id: 'S{N}',
  title: '덱 제목',
  chapters: [
    {
      id: 'Ch1',
      title: '챕터 제목',
      parts: [
        {
          id: 'S{N}-P-A',
          title: '파트 제목',
          slides: [
            {
              id: 'S{N}-P-A-0',
              title: '챕터 타이틀',
              render: () => (
                <SlideChapterTitle
                  overline="CHAPTER 01"
                  title="챕터 제목"
                  summary="챕터 요약"
                  toc={['주제 1', '주제 2', '주제 3']}
                />
              ),
            },
            {
              id: 'S{N}-P-A-1',
              title: '슬라이드 제목',
              render: () => (
                <SlideHSplit>
                  <SlideTypoStack title="제목" body="설명" />
                  <SlideList items={['항목 1', '항목 2']} level="headline" />
                </SlideHSplit>
              ),
            },
          ],
        },
      ],
    },
  ],
};
```

---

## 등록 체크리스트

1. **배럴 export**: `src/data/presentations/index.js`에 추가
   ```js
   export { S{N} } from './s{n}';
   ```

2. **덱 데모 스토리**: `src/stories/page/PresentationS{N}.stories.jsx` 생성
   - 기존 `PresentationS1.stories.jsx`를 참고하여 동일 구조로 작성
   - `flattenSlides(S{N})` 사용
   - `parameters: { layout: 'fullscreen' }`

---

## import 규칙

- render에서 실제 사용하는 컴포넌트만 import
- Placeholder는 임시 마커로만 사용, 실제 콘텐츠 준비되면 제거
- 미사용 import는 작업 완료 시 정리

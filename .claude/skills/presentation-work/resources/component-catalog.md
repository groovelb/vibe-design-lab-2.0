# Presentation Component Catalog

> 현재 사용 가능한 프레젠테이션 컴포넌트 전체 목록.
> 경로: `src/components/presentation/`, 배럴: `index.js`

---

## Shell

### SlideMaster
뷰포트 전체 채우는 프레젠테이션 셸. 100vw × 100vh, overflow hidden.

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `children` | ReactNode | — | 슬라이드 콘텐츠 (Layout) [Required] |
| `breadcrumb` | `{ section, chapter, part }` | — | 브레드크럼 [Optional] |
| `slideIndex` | number | — | 현재 번호 (1-based) [Optional] |
| `totalSlides` | number | — | 전체 수 [Optional] |
| `onPrev` / `onNext` | function | — | 이동 핸들러 [Optional] |
| `drawerContent` | ReactNode | — | Drawer 내용 [Optional] |
| `sx` | object | — | 추가 스타일 [Optional] |

---

## Layout (4종)

### SlideChapterTitle
챕터/파트 진입 슬라이드. overline + title + summary + toc.

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `overline` | string | — | 챕터 라벨 (예: "CHAPTER 02") [Optional] |
| `title` | string | — | 챕터 제목 [Required] |
| `summary` | string | — | 챕터 요약 [Optional] |
| `toc` | string[] | — | 목차 항목 배열 [Optional] |
| `sx` | object | — | 추가 스타일 [Optional] |

### SlideHSplit
수평 n등분 레이아웃. CSS Grid 기반.

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `children` | ReactNode[] | — | 컬럼 콘텐츠 [Required] |
| `columns` | 2\|3\|4 | children 길이 | 컬럼 수 [Optional] |
| `gap` | number | content.gap (64) | 컬럼 간 간격 px [Optional] |
| `sx` | object | — | 추가 스타일 [Optional] |

### SlideGrid
n×n 그리드 레이아웃. CSS Grid 기반.

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `children` | ReactNode[] | — | 셀 콘텐츠 [Required] |
| `columns` | number | — | 컬럼 수 [Required] |
| `rows` | number | 자동 | 행 수 [Optional] |
| `gap` | number | content.gap (64) | 셀 간 간격 px [Optional] |
| `sx` | object | — | 추가 스타일 [Optional] |

### SlideMessage
단일 메시지 중앙 정렬.

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `children` | ReactNode | — | 메시지 콘텐츠 [Required] |

---

## Element (6종)

### SlideTypoStack
4단 위계 텍스트 블록. 전달된 prop만 렌더링. title → subtitle → headline → body 순서.

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `title` | string | — | 타이틀 (subtitle 스케일 40px) [Optional] |
| `subtitle` | string | — | 서브타이틀 (subtitle 스케일) [Optional] |
| `headline` | string | — | 헤드라인 (headline 스케일 28px) [Optional] |
| `body` | string\|ReactNode | — | 본문 (body 스케일 22px) [Optional] |
| `gap` | number | spacing.tight (12) | 요소 간 간격 px [Optional] |
| `sx` | object | — | 추가 스타일 [Optional] |

**참고**: title prop은 subtitle 스케일(40px)로 렌더링됨. `\n`으로 개행 가능 (white-space: pre-line).

### SlideList
불렛 또는 넘버 리스트. 불렛은 ▪ (small black square).

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `items` | string[] | — | 리스트 항목 [Required] |
| `variant` | 'bullet'\|'number' | 'bullet' | 불렛/넘버 [Optional] |
| `level` | 'headline'\|'body' | 'body' | 텍스트 크기 [Optional] |
| `gap` | number | spacing.tight (12) | 항목 간 간격 px [Optional] |
| `sx` | object | — | 추가 스타일 [Optional] |

### SlideDescList
제목 + 설명 쌍의 수직 반복 리스트. `\n` 개행 지원.

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `items` | `{ title, desc }[]` | — | 항목 배열 [Required] |
| `level` | 'headline'\|'subtitle' | 'headline' | 제목 타이포 스케일 [Optional] |
| `gap` | number | spacing.element (24) | 항목 간 간격 px [Optional] |
| `sx` | object | — | 추가 스타일 [Optional] |

### SlideImage
비율 지정 또는 원본 비율 이미지. 캡션 선택.

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `src` | string | — | 이미지 경로 [Required] |
| `alt` | string | — | 대체 텍스트 [Required] |
| `ratio` | 'original'\|'16/9'\|'4/3'\|'1/1' | 'original' | 비율 [Optional] |
| `caption` | string | — | 이미지 캡션 [Optional] |
| `objectFit` | 'cover'\|'contain' | 'contain' | 이미지 피팅 [Optional] |
| `sx` | object | — | 추가 스타일 [Optional] |

**이미지 경로**: `public/presentations/`에 저장 → `/presentations/{filename}`으로 참조.

### SlideStorytelling
두 문장을 화살표(↓/→)로 연결. 인과관계 시각화.

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `from` | string | — | 원인/질문 문장 [Required] |
| `to` | string | — | 결과/답변 문장 [Required] |
| `arrowLabel` | string | — | 화살표 옆 라벨 [Optional] |
| `direction` | 'vertical'\|'horizontal' | 'vertical' | 화살표 방향 [Optional] |
| `sx` | object | — | 추가 스타일 [Optional] |

### SlideTitle
단독 타이틀. h1 역할.

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `children` | ReactNode | — | 타이틀 텍스트 [Required] |
| `level` | 1\|2 | 1 | 1=title 64px, 2=subtitle 40px [Optional] |

---

## 비프레젠테이션 유틸

### Placeholder.Box
임시 콘텐츠 마커. 실제 콘텐츠 준비되면 교체 대상.

```jsx
import Placeholder from '../../common/ui/Placeholder';
<Placeholder.Box label="설명 텍스트" />
```

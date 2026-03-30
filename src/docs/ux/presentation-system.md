# Presentation System — Vibe Design Labs

> 온라인 커리큘럼 프레젠테이션 전용 컴포넌트 시스템.
> VDL 디자인 시스템과 토큰을 분리하며, HD 이상 데스크탑 해상도에서만 사용한다.
> 최종 갱신: 2026-03-31

---

## 1. 설계 원칙

| 원칙 | 내용 |
|------|------|
| **토큰 분리** | VDL 메인 테마(`default.js`)와 독립. VDL primitive 색상(`--vdl-*`)만 CSS 변수로 재사용 |
| **HD 전용** | 데스크탑 전용. 반응형 없음. 스크롤 없음 |
| **4-Layer 구조** | Token → Shell → Layout → Element 레이어 분리 |
| **Storybook 전용** | 프레젠테이션 컴포넌트는 Storybook에서만 사용. Next.js 페이지에 직접 포함하지 않음 |
| **덱 = 저작물** | 프레젠테이션 데이터 파일은 커리큘럼 JSON의 파생이 아닌 독립 저작물. 구조와 렌더를 한 파일에서 정의 |

---

## 2. 사이즈 모델

### SlideMaster (Shell)

```
┌─ SlideMaster ─────────────────── 100vw × 100vh ─┐
│  Header (48px, flexShrink: 0)                     │
│  ┌─ Content Area ── flex: 1, 센터 정렬 ─────────┐ │
│  │  ┌─ Content Box ──────────────────────────┐   │ │
│  │  │  aspectRatio: 4/3                      │   │ │
│  │  │  maxWidth: 1536px (MUI xl)             │   │ │
│  │  │  maxHeight: 100%                       │   │ │
│  │  │                                        │   │ │
│  │  │  { Layout 컴포넌트 }                    │   │ │
│  │  │                                        │   │ │
│  │  └────────────────────────────────────────┘   │ │
│  └───────────────────────────────────────────────┘ │
│  Footer (48px, flexShrink: 0)                     │
└───────────────────────────────────────────────────┘
```

| 속성 | 값 | 설명 |
|------|-----|------|
| Shell 크기 | `100vw × 100vh` | 뷰포트 전체 채움 |
| Content Box 비율 | `4 / 3` | 콘텐츠 영역 고정 비율 |
| Content Box 최대 너비 | `1536px` | MUI xl breakpoint |
| Content Box 최대 높이 | `100%` | 부모(Content Area) 초과 방지 → 스크롤 없음 |
| Content Area padding | `80px (x) / 64px (y)` | Shell과 Content Box 사이 여백 |

**스크롤 금지**: 프레젠테이션에 스크롤은 없다. Content Box의 `maxHeight: 100%`와 Shell의 `overflow: hidden`으로 보장.

---

## 3. 레이어 구조

```
Layer 0: Token     — 프레젠테이션 전용 디자인 토큰
Layer 1: Shell     — SlideMaster (뷰포트 채움 + 네비게이션 + 브레드크럼)
Layer 2: Layout    — 슬라이드 내부 콘텐츠 배치 (4가지 유형)
Layer 3: Element   — 슬라이드 내 원자 요소 (5가지)
```

### 분류 매핑

| 레이어 | 컴포넌트 | 택소노미 근거 |
|--------|---------|-------------|
| **Shell** | `SlideMaster` | Navigation(10) + Layout(8) 합성 |
| **Layout** | `SlideChapterTitle` | Layout(8) — 챕터 진입용 |
| | `SlideHSplit` | Layout(8) — 수평 n등분 |
| | `SlideGrid` | Layout(8) — n×n 그리드 |
| | `SlideMessage` | Layout(8) — 단일 중앙정렬 |
| **Element** | `SlideTitle` | Typography(1) — h1 역할 |
| | `SlideImage` | Media(4) — 비율 지정 + 캡션 |
| | `SlideStorytelling` | Typography(1) — 인과관계 화살표 연결 |
| | `SlideTypoStack` | Typography(1) — 4단 위계 텍스트 블록 |
| | `SlideList` | Typography(1) + Data Display(5) — 불렛/넘버 리스트 |

---

## 4. 디렉토리 구조

```
src/
  styles/themes/
    presentation.js              ← Layer 0: 전용 토큰
  components/presentation/
    index.js                     ← 배럴 export
    PresentationProvider.jsx     ← context: 슬라이드 상태, 토큰 주입
    SlideMaster.jsx              ← Layer 1: Shell
    SlideMaster.stories.jsx
    layouts/
      SlideChapterTitle.jsx      ← Layer 2
      SlideChapterTitle.stories.jsx
      SlideHSplit.jsx
      SlideHSplit.stories.jsx
      SlideGrid.jsx
      SlideGrid.stories.jsx
      SlideMessage.jsx
      SlideMessage.stories.jsx
    elements/
      SlideTitle.jsx             ← Layer 3
      SlideTitle.stories.jsx
      SlideImage.jsx
      SlideImage.stories.jsx
      SlideStorytelling.jsx
      SlideStorytelling.stories.jsx
      SlideTypoStack.jsx
      SlideTypoStack.stories.jsx
      SlideList.jsx
      SlideList.stories.jsx
  data/presentations/
    s1.jsx                       ← S1 덱 정의 (구조 + render)
    index.js                     ← barrel export
  stories/page/
    PresentationS1.stories.jsx   ← S1 전체 덱 스토리
```

### Storybook title

| prefix | 대상 |
|--------|------|
| `Page/Presentation/S1` | S1 전체 덱 데모 |
| `Component/Presentation/Layout/` | 레이아웃 4종 |
| `Component/Presentation/Element/` | 요소 5종 |
| `Component/Presentation/Shell/` | SlideMaster |

---

## 5. Layer 0: 프레젠테이션 토큰

`src/styles/themes/presentation.js`에 정의. MUI theme에 포함하지 않고, 직접 import하여 사용.

```js
export const presentationTokens = {
  slide: {
    width: 1920,
    height: 1080,
    aspectRatio: '16 / 9',
    padding: { x: 80, y: 64 },
  },
  nav: {
    drawerWidth: 280,
    headerHeight: 48,
  },
  content: {
    maxWidth: 1536,        // MUI xl
    aspectRatio: '4 / 3',
  },
  typo: {
    title:    { fontSize: 64, fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em' },
    subtitle: { fontSize: 40, fontWeight: 600, lineHeight: 1.3,  letterSpacing: '-0.01em' },
    headline: { fontSize: 28, fontWeight: 600, lineHeight: 1.4,  letterSpacing: '0' },
    body:     { fontSize: 22, fontWeight: 400, lineHeight: 1.65, letterSpacing: '0' },
    caption:  { fontSize: 16, fontWeight: 400, lineHeight: 1.5,  letterSpacing: '0.01em' },
    label:    { fontSize: 14, fontWeight: 500, lineHeight: 1.4,  letterSpacing: '0.02em' },
  },
  spacing: {
    section: 48,
    element: 24,
    tight: 12,
    loose: 64,
  },
  color: {
    bg: 'var(--vdl-950)',
    surface: 'var(--vdl-900)',
    text: 'var(--vdl-100)',
    textSecondary: 'var(--vdl-400)',
    textTertiary: 'var(--vdl-600)',
    border: 'var(--vdl-700)',
    accent: 'var(--vdl-50)',
    arrow: 'var(--vdl-500)',
  },
  fontFamily: {
    heading: 'var(--font-suit, "Pretendard Variable"), sans-serif',
    body: 'var(--font-suit, "Pretendard Variable"), sans-serif',
    code: 'var(--font-mono, "IBM Plex Mono"), monospace',
    brand: 'var(--font-brand, "Inter"), sans-serif',
  },
};
```

---

## 6. Layer 1: SlideMaster

뷰포트 전체를 채우는 프레젠테이션 셸. Content Area에 Layout 컴포넌트를 배치.

### 와이어프레임

```
┌─ Header: breadcrumb ─────────────────────────────────────────┐
│  S1 > Ch2. 관점의 전환 > 왜 바이브 디자인인가                    │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│              ┌─ Content Box (4:3, max 1536px) ─┐              │
│              │                                  │              │
│              │   { Layout + Elements }           │              │
│              │                                  │              │
│              └──────────────────────────────────┘              │
│                                                               │
├──── Footer ──────────────────────────────────────────────────┤
│  ◀  3 / 44  ▶                                    [☰ Drawer]  │
└───────────────────────────────────────────────────────────────┘
```

### Props

| Prop | 타입 | 설명 |
|------|------|------|
| `children` | ReactNode | 슬라이드 콘텐츠 (Layout) [Required] |
| `breadcrumb` | `{ section, chapter, part }` | 브레드크럼 라벨 [Optional] |
| `slideIndex` | number | 현재 슬라이드 번호 (1-based) [Optional] |
| `totalSlides` | number | 전체 슬라이드 수 [Optional] |
| `onPrev` / `onNext` | function | 이동 핸들러 [Optional] |
| `drawerContent` | ReactNode | Drawer 메뉴 내용 [Optional] |
| `sx` | object | 추가 스타일 [Optional] |

### 핵심 동작

- `100vw × 100vh` 뷰포트 전체 채움, `overflow: hidden`
- Content Area: `flex: 1`, 센터 정렬. 내부 Content Box가 4:3 비율 + maxWidth 1536px
- `ArrowLeft` / `ArrowRight` 키보드 바인딩
- Drawer: 우측 슬라이드 아웃 (MUI Drawer)
- 스토리: `parameters: { layout: 'fullscreen' }` 필수

---

## 7. Layer 2: 레이아웃 4종

모든 레이아웃은 `width: 100%`, `height: 100%`로 Content Box를 채운다.
스토리에서는 SlideMaster를 decorator로 사용하여 실제 맥락에서 확인.

### 7.1 SlideChapterTitle

| Prop | 타입 | 설명 |
|------|------|------|
| `overline` | string | 챕터 라벨 [Optional] |
| `title` | string | 챕터 제목 [Required] |
| `summary` | string | 챕터 요약 [Optional] |
| `toc` | string[] | 목차 항목 배열 [Optional] |

### 7.2 SlideHSplit

| Prop | 타입 | 설명 |
|------|------|------|
| `children` | ReactNode[] | 컬럼 콘텐츠 배열 [Required] |
| `columns` | 2 \| 3 \| 4 | 컬럼 수 [Optional, 기본값: children 길이] |
| `gap` | number | 컬럼 간 간격 (px) [Optional, 기본값: spacing.element] |

### 7.3 SlideGrid

| Prop | 타입 | 설명 |
|------|------|------|
| `children` | ReactNode[] | 셀 콘텐츠 배열 [Required] |
| `columns` | number | 컬럼 수 [Required] |
| `rows` | number | 행 수 [Optional, children 길이에서 자동 계산] |
| `gap` | number | 셀 간 간격 (px) [Optional, 기본값: spacing.element] |

### 7.4 SlideMessage

| Prop | 타입 | 설명 |
|------|------|------|
| `children` | ReactNode | 메시지 콘텐츠 [Required] |

---

## 8. Layer 3: 요소 5종

### 8.1 SlideTitle

| Prop | 타입 | 설명 |
|------|------|------|
| `children` | ReactNode | 타이틀 텍스트 [Required] |
| `level` | 1 \| 2 | 1=title 스케일 64px, 2=subtitle 스케일 40px [Optional, 기본값: 1] |

### 8.2 SlideImage

| Prop | 타입 | 설명 |
|------|------|------|
| `src` | string | 이미지 경로 [Required] |
| `alt` | string | 대체 텍스트 [Required] |
| `ratio` | 'original' \| '16/9' \| '4/3' \| '1/1' | 비율 [Optional, 기본값: 'original'] |
| `caption` | string | 이미지 캡션 [Optional] |
| `objectFit` | 'cover' \| 'contain' | 이미지 피팅 [Optional, 기본값: 'contain'] |

### 8.3 SlideStorytelling

| Prop | 타입 | 설명 |
|------|------|------|
| `from` | string | 원인/질문 문장 [Required] |
| `to` | string | 결과/답변 문장 [Required] |
| `arrowLabel` | string | 화살표 옆 라벨 [Optional] |
| `direction` | 'vertical' \| 'horizontal' | 화살표 방향 [Optional, 기본값: 'vertical'] |

### 8.4 SlideTypoStack

| Prop | 타입 | 설명 |
|------|------|------|
| `title` | string | 타이틀 (title 스케일) [Optional] |
| `subtitle` | string | 서브타이틀 (subtitle 스케일) [Optional] |
| `headline` | string | 항목 헤드라인 (headline 스케일) [Optional] |
| `body` | string \| ReactNode | 본문 (body 스케일) [Optional] |
| `gap` | number | 요소 간 간격 (px) [Optional, 기본값: spacing.element] |

### 8.5 SlideList

| Prop | 타입 | 설명 |
|------|------|------|
| `items` | string[] | 리스트 항목 [Required] |
| `variant` | 'bullet' \| 'number' | 불렛 / 넘버 [Optional, 기본값: 'bullet'] |
| `level` | 'headline' \| 'body' | 텍스트 크기 [Optional, 기본값: 'body'] |
| `gap` | number | 항목 간 간격 (px) [Optional, 기본값: spacing.tight] |

---

## 9. 덱 데이터 아키텍처

### 설계 결정: B 방식 (JSX render 직접 배치)

프레젠테이션은 슬라이드마다 구성이 다르다. 같은 hSplit이라도 왼쪽에 SlideTypoStack이 올 때도 있고, SlideImage가 올 때도 있다. 이를 데이터 스키마로 일반화하면 스키마가 컴포넌트만큼 복잡해진다. 따라서 **레이아웃과 엘리먼트를 JSX로 직접 조합**한다.

### 슬라이드 키 구조

```
slide {
  ── Meta ──────────── 네비게이션/인덱싱용, SlideMaster가 소비
  id        string      고유 식별자
  title     string      ToC·drawer·breadcrumb 표시용

  ── Render ────────── 시각 콘텐츠, Content Area가 소비
  render    () => JSX   레이아웃 + 엘리먼트 조합

  ── Extension ─────── Phase 2+
  note      string?     발표자 노트
  duration  number?     예상 소요 시간(초)
  hidden    boolean?    프레젠테이션에서 건너뛰기
}
```

### 계층 구조

```
Section (S1)           ← 독립 덱 단위, 페이지 라우팅
  └─ Chapter (Ch1)     ← 대주제, breadcrumb section
       └─ Part (2-A)   ← 소주제, breadcrumb part
            └─ Slide    ← 개별 화면, { id, title, render }
```

### 덱 정의 파일 형태

```jsx
// src/data/presentations/s1.jsx
import {
  SlideChapterTitle, SlideHSplit, SlideGrid, SlideMessage,
  SlideTypoStack, SlideList, SlideStorytelling,
} from '../../components/presentation';

export const S1 = {
  id: 'S1',
  title: '바이브 디자인: 새로운 사고에 적응하기',
  chapters: [
    {
      id: 'Ch1',
      title: '디자인의 본질은 도구일까, 의도일까?',
      parts: [
        {
          id: 'S1-P-A',
          title: '디자인의 언어 체계가 AI를 위한 설계도가 되는 과정',
          slides: [
            {
              id: 'S1-P-A-1',
              title: '10년간의 디발자',
              render: () => (
                <SlideChapterTitle
                  overline="PROLOGUE"
                  title="디자인의 본질은 도구일까, 의도일까?"
                  summary="10년간의 디발자: 디자이너이자 개발자로서 깨달은 것"
                  toc={['왜 의도를 쪼개야 하는가']}
                />
              ),
            },
            {
              id: 'S1-P-A-2',
              title: '왜 의도를 쪼개야 하는가',
              render: () => (
                <SlideHSplit>
                  <SlideTypoStack
                    title="왜 의도를 쪼개야 하는가"
                    body="디자인 언어가 설계도가 되는 구조"
                  />
                  <SlideStorytelling
                    from="도구가 바뀌면 무엇이 남는가?"
                    to="디자인 언어 체계가 남는다"
                  />
                </SlideHSplit>
              ),
            },
          ],
        },
      ],
    },
    // ...
  ],
};
```

### 구조-콘텐츠 통합 근거

커리큘럼 JSON(`vdsk_online_curriculum.json`)이 이미 LMS 측 source of truth로 존재한다. 덱 정의 파일은 그것을 **참고**해서 만든 독립 저작물이며, 동기화 대상이 아니다. 이유:

1. 프레젠테이션의 슬라이드 구조는 커리큘럼과 1:1이 아님 (전환 슬라이드 추가, 항목 분할/합산 가능)
2. 슬라이드 타이틀이 커리큘럼 항목명과 다를 수 있음 (더 짧고 임팩트 있게)
3. 구조와 렌더를 분리하면 ID 동기화 부담 + buildDeck() 머지 함수 필요 → 복잡도만 증가

---

## 10. 스토리 규칙

### 컴포넌트 스토리 (Shell/Layout/Element)

| 규칙 | 적용 |
|------|------|
| `tags: ['autodocs']` | 모든 컴포넌트 스토리에 적용 |
| `parameters: { layout: 'fullscreen' }` | Shell + Layout 스토리에 적용 |
| decorator | Layout 스토리는 `<SlideMaster>` decorator 사용 (이중 구조 금지) |
| 첫 스토리 이름 | `Docs` |
| Placeholder | 더미 콘텐츠는 `Placeholder` 컴포넌트 사용 |

### 덱 데모 스토리 (Page/Presentation/*)

- 데이터 파일(`s1.jsx`)에서 `S1` import
- `flattenSlides()` 유틸로 flat 배열 생성
- `useState`로 현재 슬라이드 인덱스 관리
- SlideMaster에 breadcrumb, slideIndex, totalSlides, onPrev, onNext, drawerContent 바인딩
- DrawerToC: part별 그룹핑, 클릭으로 직접 이동

---

## 11. 확장 로드맵

| Phase | 내용 | 슬라이드 키 추가 |
|-------|------|-----------------|
| **1 (현재)** | Core — 구조 + render로 정적 덱 | `id`, `title`, `render` |
| **2** | Speaker Mode — 발표자 노트, 타이머 | `note`, `duration` |
| **3** | Multi-Section — S2, S3, S4 추가 | 파일 분리: `s2.jsx`, `s3.jsx` |
| **4** | Section Theme — 섹션별 색상 오버라이드 | section에 `theme` 키 |
| **5** | Interactive Slide — 실습 임베드 | `interactive`, `exercise` |

---

## 12. 기술 제약

| 제약 | 이유 |
|------|------|
| 반응형 없음 | HD 이상 데스크탑 전용 |
| 스크롤 없음 | 프레젠테이션은 스크롤하지 않음. Content Box가 가용 공간 내에서 비율 유지 |
| 인쇄/PDF 미지원 | Phase 1 범위 외 |
| 애니메이션 미포함 | Phase 1은 정적 레이아웃. 슬라이드 전환 모션은 Phase 2 |

---

*v2.0 | 기반: presentationData.js, vdsk_online_curriculum.json, taxonomy-v0.4.md*

# Design System Optimization — Vibe Design Labs

> 변경할 토큰(delta), 신규 컴포넌트 → 템플릿 → 페이지를 정의한다.
> 작성일: 2026-02-26

---

## 1. Visual Direction

| 항목 | VDL 타겟 | 변경 규모 |
|------|---------|----------|
| **컬러 모드** | 시멘틱 토큰 쌍 (다크/라이트). 다크가 primary 경험 | 구조 전환 |
| **Primary** | 블랙 & 화이트 (무채색). 유채색 primary 제거 | 전면 전환 |
| **Gray 스케일** | Violet-tinted grayscale (hue 250-270°). 순수 neutral gray 금지 | 전면 전환 |
| **유채색** | 코드 구문 하이라이팅에서만 허용 | 제한 |
| **서체** | IBM Plex Sans (브랜드) + SUIT (프로덕트/헤딩) + IBM Plex Mono (코드) | 전면 전환 |
| **Elevation** | 명도 차이로 위계. shadow 최소화 | 전환 |
| **그래픽 모티프** | Naming Line, Grid 배경, Monoline 1px | 신규 |
| **borderRadius** | 0 | 유지 |
| **Spacing** | 8px 기본 단위 | 유지 |

**레퍼런스:** Linear.app — monoline + dark UI + 구조적 미니멀리즘

---

## 2. 토큰 Delta

### 2.1 컬러 — 시멘틱 토큰 쌍 구조

```
Primitive (violet-gray 950~50)
    ├─► Semantic (다크) ──► Component
    └─► Semantic (라이트) ──► Component
                               ↑ 모드와 무관한 동일 코드
```

**Primitive — Violet-tinted Grayscale:**

모든 단계가 동일한 violet hue(250-270°) 공유. hex는 프로토타이핑 후 확정.

| 단계 | lightness 방향 |
|------|---------------|
| 950 | ~8% (최어두) |
| 900 | ~12% |
| 800 | ~18% |
| 700 | ~28% |
| 300-500 | 중간 |
| 200 | ~82% |
| 100 | ~90% |
| 50 | ~96% (최밝) |

**시멘틱 토큰:**

| 토큰 | MUI 매핑 | 다크 | 라이트 |
|------|---------|------|--------|
| `bg-primary` | `background.default` | 950 | 50 |
| `bg-secondary` | `background.paper` | 900 | white |
| `bg-tertiary` | `action.hover` | 800 | 100 |
| `text-primary` | `text.primary` | 50 | 950 |
| `text-secondary` | `text.secondary` | 200 | 700 |
| `text-tertiary` | `text.disabled` | 700 | 200 |
| `line-subtle` | `divider` | 800 | 100 |
| `line-active` | 커스텀 | 50 | 950 |

**MUI 구현:** `cssVariables: true` + `colorSchemes` (dark/light) + `defaultColorScheme: 'dark'`

```js
createTheme({
  cssVariables: true,
  colorSchemes: {
    dark: {
      palette: {
        background: { default: 'var(--vdl-950)', paper: 'var(--vdl-900)' },
        text: { primary: 'var(--vdl-50)', secondary: 'var(--vdl-200)' },
      }
    },
    light: {
      palette: {
        background: { default: 'var(--vdl-50)', paper: '#ffffff' },
        text: { primary: 'var(--vdl-950)', secondary: 'var(--vdl-700)' },
      }
    }
  },
  defaultColorScheme: 'dark',
})
```

**규칙:**
- 하드코딩 hex 금지 — 시멘틱 토큰만 참조
- 시각 위계는 명도 차이로만 구성
- 유채색은 `syntax-*` 토큰에서만 허용

### 2.2 타이포그래피

| 역할 | 서체 | 용도 |
|------|------|------|
| **브랜드** | IBM Plex Sans | 로고, 태그라인, 브랜드 강조 텍스트 |
| **프로덕트/헤딩** | SUIT | 본문, UI, h1~h6 — 한글 최적화 |
| **코드** | IBM Plex Mono | 키워드, 토큰명, 인라인 코드, 코드 블록 |

| 변경 | 내용 |
|------|------|
| **Display 웨이트** | 900 → 800 (ExtraBold) |
| **신규 variant** | `display` (IBM Plex Sans, 800, 48-64px), `code` (IBM Plex Mono, 500, 14px), `codeBlock` (IBM Plex Mono, 400, 14px) |

### 2.3 Elevation

| 시멘틱 토큰 | 다크 구현 | 라이트 구현 |
|-----------|----------|-----------|
| `elevation-0` | bg-primary | shadow 없음 |
| `elevation-1` | bg-secondary (명도 +1) | 미세한 shadow |
| `elevation-2` | bg-tertiary (명도 +2) | shadow 강화 |

### 2.4 Breakpoints

```
sm: 600 → 768
xl: 1536 → 1440
```

### 2.5 VDL 전용 토큰

| 토큰 | 값 | 용도 |
|------|-----|------|
| `monoline.weight` | 1px | 로고, 아이콘, Grid 공통 |
| `monoline.cap/join` | round | stroke |
| `grid.unit` | 8px | Grid 배경 패턴 |
| `grid.color` | `line-subtle` + 저투명도 | Grid 배경 색상 |
| `namingLine.dotSize` | 4px | Naming Line 점 |
| `namingLine.labelGap` | 8px | Naming Line 레이블 간격 |

---

## 3. 컴포넌트 재활용

### 3.1 변형 필요

| ux-flow 패턴 | 기존 컴포넌트 | 필요한 변형 |
|-------------|-------------|-----------|
| 코스 카드 | `CustomCard` | 코호트 배지, 가격/기간 영역 추가. 텍스트 중심 변형 |
| 예제 카드 | `CustomCard` | 썸네일 + 제목 + 한 줄 설명. overlay 변형 |
| GNB + CTA | `GNB` | CTA 버튼 슬롯 추가 |
| 증언 인용 | `QuotedContainer` | 멤버 이름/역할 부가 정보 영역 |
| 아코디언 | MUI `Accordion` | VDL 토큰 적용 + 커리큘럼 스타일링 |

### 3.2 신규 제작

| 컴포넌트 | 카테고리 | 우선순위 |
|---------|---------|---------|
| `TestimonialCard` | card/ | 높음 |
| `ComparisonBlock` | container/ | 높음 |
| `FloatingCTA` | navigation/ | 높음 |
| `TaxonomyTree` | data-display/ | 높음 |
| `CourseCTABlock` | container/ | 높음 |
| `CommunityActivityCard` | card/ | 중간 |
| `CohortBadge` | common/ui/ | 중간 |
| `GridBackground` | dynamic-color/ | 중간 |
| `NamingLine` | data-display/ | Phase 2 |

---

## 4. 신규 컴포넌트 상세

### 4.1 TestimonialCard

**카테고리:** card/ | **사용처:** Landing Course Review, Course Detail

| Prop | 타입 | 설명 |
|------|------|------|
| `quote` | string | 증언 전문 |
| `quoteShort` | string | Landing용 짧은 증언 |
| `memberName` | string | 멤버 이름 |
| `memberRole` | string | 역할 (예: "UX 디자이너, 3년차") |
| `memberPersona` | string | 페르소나 |
| `resultUrl` | string | 결과물 URL [Optional] |
| `resultImage` | string | 결과물 이미지 [Optional] |
| `variant` | 'compact' \| 'full' | compact: Landing / full: Detail |

```
┌─────────────────────────────────┐
│ "증언 인용..."                    │  ← QuotedContainer 활용
│ ─── 이름 · 역할 · 페르소나        │
│ [결과물 미리보기] (선택)           │  ← AspectMedia 활용
└─────────────────────────────────┘
```

### 4.2 ComparisonBlock

**카테고리:** container/ | **사용처:** Landing Difference, Experiment Detail

| Prop | 타입 | 설명 |
|------|------|------|
| `leftLabel` | string | 왼쪽 레이블 |
| `rightLabel` | string | 오른쪽 레이블 |
| `leftItems` | array | 왼쪽 항목 리스트 |
| `rightItems` | array | 오른쪽 항목 리스트 |
| `leftTone` | 'negative' \| 'neutral' | 시각 톤 |
| `rightTone` | 'positive' \| 'neutral' | 시각 톤 |

`SplitScreen` 기반. 모바일에서 상하 스택.

### 4.3 FloatingCTA

**카테고리:** navigation/ | **사용처:** Course Detail

| Prop | 타입 | 설명 |
|------|------|------|
| `label` | string | CTA 텍스트 |
| `href` | string | CTA 링크 |
| `subText` | string | 보조 텍스트 (가격, 일정) |
| `hideWhenVisible` | ref | 이 요소가 뷰포트에 보이면 숨김 |

### 4.4 TaxonomyTree

**카테고리:** data-display/ | **사용처:** Dictionary, Landing Preview

| Prop | 타입 | 설명 |
|------|------|------|
| `data` | array | DictionaryCategory 구조 |
| `variant` | 'full' \| 'preview' | full / 축약 |
| `defaultExpanded` | array | 기본 펼침 노드 ID |
| `onNodeClick` | function | 노드 클릭 콜백 |

MUI `TreeView` 기반. Monoline 스타일 — 연결선 1px, round cap.

### 4.5 CourseCTABlock

**카테고리:** container/ | **사용처:** Dictionary, Experiment, Story 하단

| Prop | 타입 | 설명 |
|------|------|------|
| `headline` | string | 유도 메시지 |
| `ctaLabel` | string | CTA 텍스트 |
| `ctaHref` | string | CTA 링크 |

### 4.6 CommunityActivityCard

**카테고리:** card/ | **사용처:** Landing Community Snapshot

| Prop | 타입 | 설명 |
|------|------|------|
| `type` | 'question' \| 'challenge' \| 'feedback' | 활동 유형 |
| `contentPreview` | string | 미리보기 |
| `memberName` | string | 멤버 이름 |
| `timestamp` | string | 시간 |

### 4.7 CohortBadge

**카테고리:** common/ui/ | **사용처:** 코스 카드, Course Detail

| Prop | 타입 | 설명 |
|------|------|------|
| `status` | 'recruiting' \| 'ongoing' \| 'upcoming' | 코호트 상태 |

명도 차이로만 상태 구분. 유채색 금지.

### 4.8 GridBackground

**카테고리:** dynamic-color/ | **사용처:** Landing, Brand Story

| Prop | 타입 | 설명 |
|------|------|------|
| `variant` | 'dot' \| 'line' | Grid 스타일 |
| `opacity` | number | 투명도 (기본: 매우 낮음) |

---

## 5. 템플릿

`components/templates/` 배치. 섹션 단위 재사용 조합.

### Landing 전용

| 템플릿 | 핵심 조합 |
|--------|----------|
| **HeroSection** | Display 타이포 + 태그라인 + 스크롤 유도. GridBackground 선택적 |
| **ProblemSection** | 커리어 문제 + 학습 문제 두 차원 |
| **DifferenceSection** | `ComparisonBlock` (VOD vs VDL) |
| **CourseHighlightSection** | 코스 카드 1~2 + CTA. Detail 숏컷 |
| **CourseReviewSection** | `TestimonialCard` (compact) × 2~3. 페르소나 다양성 |
| **DictionaryPreviewSection** | `TaxonomyTree` (preview) + CTA |
| **CommunitySnapshotSection** | `CommunityActivityCard` × 3~5 |
| **FooterCTASection** | 유도 메시지 + CTA |

### Course / Detail

| 템플릿 | 핵심 조합 |
|--------|----------|
| **LearningMethodSection** | `ComparisonBlock` |
| **CourseCardListSection** | 코스 카드 리스트 |
| **CourseHeroSection** | Display 타이포 + 대상/기간/가격 요약 |
| **CurriculumSection** | MUI Accordion 챕터별 |
| **LearningPreviewSection** | `CommunityActivityCard` + 설명 |
| **TestimonialSection** | `TestimonialCard` (full) × N |
| **EnrollSection** | 가격/일정 + CTA |

### 공통

| 템플릿 | 핵심 조합 |
|--------|----------|
| **CourseCTASection** | `CourseCTABlock` — 서브페이지 하단 공통 |
| **PageHeroSection** | `Title` + 설명 — 서브페이지 공통 Hero |

---

## 6. 페이지 조합

### Landing (/)
```
GNB (CTA 포함)
├── HeroSection             Hook
├── ProblemSection          Pain (커리어 + 학습)
├── DifferenceSection       Solution
├── CourseHighlightSection  First CTA
├── CourseReviewSection     Proof
├── DictionaryPreviewSection Trust
├── CommunitySnapshotSection Belonging
└── FooterCTASection        Final CTA
```

### Course (/course)
```
GNB
├── PageHeroSection
├── LearningMethodSection
└── CourseCardListSection
```

### Course Detail (/course/[slug])
```
GNB
├── CourseHeroSection
├── CourseOverview (인라인)
├── CurriculumSection
├── LearningPreviewSection
├── TestimonialSection
├── EnrollSection
└── FloatingCTA (하단 고정)
```

### Dictionary (/dictionary)
```
GNB
├── PageHeroSection
├── TaxonomyTree (full)
└── CourseCTASection
```

### Experiment (/experiment)
```
GNB
├── PageHeroSection
├── ExperimentGallery (CustomCard 변형)
└── CourseCTASection
```

### Experiment Detail (/experiment/[slug])
```
GNB
├── ExperimentOverview
├── ComparisonBlock (Before/After)
└── Explanation
```

### Brand Story (/story)
```
GNB
├── MissionSection (대형 타이포)
├── PhilosophySection (세 가지 신념)
├── ValuePropSection (세 단계 가치)
└── CourseCTASection
```

---

## 7. 구현 우선순위

### Phase 1A — 토큰 + 핵심 컴포넌트

1. 시멘틱 토큰 쌍 구조 (primitive + colorSchemes + 타이포 + elevation + breakpoint)
2. 모노스페이스 서체 추가
3. ComparisonBlock
4. TestimonialCard
5. CourseCTABlock
6. CohortBadge
7. FloatingCTA

### Phase 1B — 트러스트 + 커뮤니티

8. TaxonomyTree
9. CommunityActivityCard
10. GridBackground

### Phase 2 — 브랜드 그래픽

- NamingLine — 키비쥬얼 확정 후
- Isometric 일러스트 — 프로토타이핑 후

---

## 8. 다음 단계 핸드오프

| 받는 문서 | 넘기는 것 |
|----------|----------|
| **technical** | 시멘틱 토큰 쌍 → MUI v7 `cssVariables` + `colorSchemes` 적용 사양. 모노스페이스 서체 선정. breakpoint 변경. 신규 컴포넌트 Props (§4) |
| **contents** | 미디어 사이즈/비율 기준. TestimonialCard, CommunityActivityCard 콘텐츠 규격 |

---

*v1.1 | 기반: ux-flow v1.1, VDL_visual_identity_v0.4, components.md, default.js*

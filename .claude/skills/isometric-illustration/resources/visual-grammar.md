# Visual Grammar — 아이소메트릭 일러스트 시각 규칙

> SVG 일러스트 생성 시 적용하는 컬러, 스트로크, 쉐도우, 구성 규칙.
> 모든 값은 VDL 시멘틱 토큰에 매핑된다.

---

## 1. 컬러 토큰 매핑

일러스트에서 사용하는 색상은 정확히 5단계이며, 모두 VDL 테마 토큰이다.

| 역할 | VDL 토큰 | CSS Variable | 근사 Hex | 용도 |
|------|---------|-------------|---------|------|
| **면 채움** | `violetGray[950]` | `--vdl-950` | ~#08090A | 모든 면의 fill. 다크 배경에 동화 |
| **히어로 스트로크** | `violetGray[200]` | `--vdl-200` | ~#D0D6E0 | 히어로/활성 요소 외곽선. 가장 밝음 |
| **기본 스트로크** | `violetGray[600]` | `--vdl-600` | ~#62666D | 일반 상태 외곽선 |
| **서브틀 스트로크** | `violetGray[700]` | `--vdl-700` | ~#3E3E44 | 비활성/배경 외곽선, 히어로 내부 컨텐츠 선 |
| **구조선** | `violetGray[800]` | `--vdl-800` | ~#2E2E32 | 상단면 V자 분할선. 가장 어두움 |

### 컬러 규칙

- 유채색 사용 금지 — 5단계 명도만으로 위계 표현
- fill은 항상 `--vdl-950` — 배경과 동화시켜 "떠 있는" 느낌
- 위계는 밝기 순서: `--vdl-200` > `--vdl-600` > `--vdl-700` > `--vdl-800`
- 히어로 요소 1개만 `--vdl-200`, 나머지는 1~2단계 어둡게
- 그라디언트, 글로우, 블러 배경 금지 (VDL 블랙리스트)

---

## 2. 스트로크 규격

| 파라미터 | 값 | 비고 |
|---------|---|------|
| strokeWidth | `0.5` | 일러스트 전용 (VDL 표준 1px의 절반) |
| strokeLinecap | `round` | VDL monoline 공통 |
| strokeLinejoin | `round` | VDL monoline 공통 |

### 스트로크 위계 적용 규칙

```
히어로 요소 (1개)     → --vdl-200 (외곽) + --vdl-800 (V자선)
활성 요소 (N개)       → --vdl-200 (외곽) + --vdl-800 (V자선)
기본 요소 (N개)       → --vdl-600 (외곽) + --vdl-800 (V자선)
비활성 요소 (N개)     → --vdl-700 (외곽) + --vdl-800 (V자선)
```

- 2티어 (활성/비활성): Prism 클러스터 패턴에 적합
- 3티어 (히어로/기본/비활성): Card 캐스케이드 패턴에 적합
- 히어로 내부 컨텐츠 라인: `--vdl-700`, 1~2줄

### 점선 (보조 가이드)

- strokeDasharray: `1 3`
- 용도: 구조의 측정 가능성 시각화 (수직 가이드 등)
- 사용: 선택적 — 기반/원칙 패턴에서 효과적

---

## 3. 드롭 쉐도우

모든 요소에 SVG filter로 드롭 쉐도우를 적용한다.

### 쉐도우 공식

```xml
<filter id="{prefix}_f{n}" width="W" height="H" x="X" y="Y"
        colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
  <feFlood floodOpacity="0" result="BackgroundImageFix" />
  <feColorMatrix in="SourceAlpha" result="hardAlpha"
                 values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
  <feOffset dy="{offsetY}" />
  <feGaussianBlur stdDeviation="{blur}" />
  <feComposite in2="hardAlpha" operator="out" />
  <feColorMatrix values="0 0 0 0 0.031 0 0 0 0 0.035 0 0 0 0 0.039 0 0 0 {opacity} 0" />
  <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
  <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
</filter>
```

### 밀도별 쉐도우 설정

| 인스턴스 밀도 | stdDeviation | opacity | offsetY | 용도 |
|-------------|-------------|---------|---------|------|
| 단일 (1~3개) | 6 | 0.6 | 4 | 플랫폼, 단독 요소 |
| 중간 (4~8개) | 8 | 1.0 | 0 | 카드 스택, 소규모 클러스터 |
| 고밀도 (9개+) | 16 | 1.0 | 0 | 대형 모듈 클러스터 |

- 쉐도우 색상: 항상 `--vdl-950`에 가까운 값 (배경에 녹아듦)
- 글로우 효과가 아님 — 순수한 깊이 분리용

### filter 사이즈 계산

filter의 width/height는 요소 크기 + stdDeviation * 4 (양쪽 2배)
filter의 x/y는 요소 위치 - stdDeviation * 2

---

## 4. 구성 (Composition)

### 4.1 캔버스

| 파라미터 | 값 |
|---------|---|
| 비율 | ~1:1 (±15%) |
| 크기 | 265~304px 범위 |
| 최소 패딩 | 8px (모든 변) |
| fill | `none` (투명 — 부모가 다크 배경 담당) |

### 4.2 프리뷰 컨테이너 (Storybook/UI)

일러스트를 표시할 때 부모 컨테이너에 적용:
```jsx
sx={{
  bgcolor: 'background.default',  // --vdl-950
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  p: 4,
  minHeight: 280,
}}
```

### 4.3 네거티브 스페이스

- 캔버스의 30~50%는 비어있어야 한다
- 형태가 캔버스를 채우면 "떠 있는" 느낌이 사라진다
- 다크 배경의 여백이 형태를 정의한다

### 4.4 시선 앵커

- 히어로 요소 1개가 시선의 시작점
- 히어로에서 나머지 요소로 시선이 흐르는 방향을 의도한다
- 배치 패턴별 시선 흐름:
  - 기반/원칙: 위 → 아래 (깊이)
  - 모듈/구성: 중앙 → 주변 (관계)
  - 속도/모멘텀: 우상 → 좌하 (진행)

---

## 5. SVG 구조 템플릿

```jsx
<svg xmlns="http://www.w3.org/2000/svg"
     width="{W}" height="{H}" fill="none"
     viewBox="0 0 {W} {H}">

  {/* 뒤쪽 요소부터 (z-order: back to front) */}
  <g strokeWidth="0.5" filter="url(#{prefix}_f0)">
    <path fill="var(--vdl-950)" stroke="var(--vdl-600)" d="..." />
    <path stroke="var(--vdl-800)" strokeLinecap="round" d="..." />
  </g>

  {/* ... 중간 요소들 ... */}

  {/* 히어로 요소 */}
  <g filter="url(#{prefix}_fN)">
    <path fill="var(--vdl-950)" stroke="var(--vdl-200)" strokeWidth="0.5" d="..." />
    <path stroke="var(--vdl-800)" strokeLinecap="round" strokeWidth="0.5" d="..." />
    {/* 히어로 내부 컨텐츠 라인 (선택) */}
    <path stroke="var(--vdl-700)" strokeLinecap="round" d="..." />
  </g>

  {/* ... 앞쪽 요소들 ... */}

  <defs>
    {/* 요소별 filter 정의 */}
    <filter id="{prefix}_f0" ...> ... </filter>
    <filter id="{prefix}_fN" ...> ... </filter>
  </defs>
</svg>
```

### 네이밍 규칙

- filter ID prefix: `fig{번호}` (예: `fig05`, `fig06`)
- 기존 레퍼런스: `fig02` (FIG 0.2), `fig03` (FIG 0.3), `fig04` (FIG 0.4)
- 컴포넌트명: PascalCase + `Illustration` suffix (예: `ScalabilityIllustration`)

---

## 6. 패턴별 구성 레시피

### 기반/원칙 (수평 레이어)

```
primitive: prism
count: 1 container + 5~7 shelf lines
arrangement: horizontal, 18px interval
hero: top platform (lid)
특징: 투명 외곽 컨테이너 + 불투명 상단 뚜껑 + 내부 수평선 반복
```

### 모듈/구성 (클러스터)

```
primitive: prism
count: 5~7 modules
arrangement: cluster (2~3 columns, staggered y)
hero: largest center module
hierarchy: 2-tier (active --vdl-200, subtle --vdl-700)
특징: 모듈 높이 차이 = 역할/책임의 차이. 얇은 모듈 = 대기 상태
```

### 속도/모멘텀 (대각선 캐스케이드)

```
primitive: card
count: 11~15 cards
arrangement: diagonal (offset ~8.5px left, varying y)
hero: tallest card (상위 1/3 위치)
heightCurve: asymmetric-wave (급상승 → 완만 하강 → 수렴)
hierarchy: 3-tier (hero --vdl-200, default --vdl-600)
특징: 비대칭 높이 곡선이 가속→유지를 표현
```

### 계층/위계 (피라미드)

```
primitive: prism
count: 4~7 modules
arrangement: vertical stack, bottom-up size decrease
hero: bottom (largest, foundation)
heightCurve: descending (bottom→top)
특징: 아래가 가장 크고 위로 갈수록 작아지는 구조
```

### 확장/분화 (방사)

```
primitive: prism
count: 5~9 modules
arrangement: 1 center + N radial at 60° intervals
hero: center (largest)
heightCurve: center tall → outer short
특징: 중앙에서 뻗어나가는 배치. 간격이 관계를 표현
```

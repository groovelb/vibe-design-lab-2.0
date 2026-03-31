# Common Grammar — 프레젠테이션 일러스트 공통 규칙

> 3가지 유형 모두에 적용되는 색상, 캔버스, 구조 규칙.
> 유형별 리소스보다 **먼저** 읽는다.

---

## 1. 색상 팔레트 — violetGray Only

모든 색상은 VDL violetGray 토큰만 사용한다. hue 260° 기반.

| 단계 | CSS Variable | HSL | 근사 Hex | 역할 |
|------|-------------|-----|---------|------|
| 950 | `--vdl-950` | hsl(260, 20%, 2%) | #08090A | **배경** — 슬라이드 bg와 동화 |
| 900 | `--vdl-900` | hsl(260, 16%, 4%) | #0A0B0D | 면 서피스 (칼라 유형) |
| 800 | `--vdl-800` | hsl(260, 12%, 8%) | #121318 | 구조선, 가이드 |
| 700 | `--vdl-700` | hsl(260, 8%, 14%) | #212228 | 서브틀 요소, 보조선 |
| 600 | `--vdl-600` | hsl(260, 6%, 22%) | #353638 | 기본 스트로크 (어두운 쪽) |
| 500 | `--vdl-500` | hsl(260, 6%, 48%) | #737680 | 중간 톤 (칼라 유형) |
| 400 | `--vdl-400` | hsl(260, 5%, 58%) | #8E9198 | 보조 텍스트/요소 |
| 300 | `--vdl-300` | hsl(260, 5%, 68%) | #AAACB0 | 세컨더리 (칼라 유형) |
| 200 | `--vdl-200` | hsl(260, 8%, 82%) | #CFD1D8 | 활성/강조 스트로크 |
| 100 | `--vdl-100` | hsl(260, 10%, 90%) | #E3E5EC | **전경 — 주요 선/면** |
| 50  | `--vdl-50`  | hsl(260, 12%, 96%) | #F3F4F8 | **하이라이트 — 가장 밝은 요소** |

### 색상 규칙

- **배경**: 항상 `--vdl-950` (프레젠테이션 슬라이드 bg와 동일)
- **전경**: `--vdl-50` ~ `--vdl-100` (화이트 계열)
- violetGray 이외의 hue 사용 금지
- 그라디언트, 글로우, 블러 배경 금지

---

## 2. 캔버스 규격

### 슬라이드 컨텍스트

프레젠테이션 슬라이드는 1920×1080 (16:9). 일러스트는 슬라이드의 **한 영역**을 차지한다.

| 배치 | 권장 캔버스 | viewBox |
|------|-----------|---------|
| HSplit 한쪽 (50%) | 640×640 이내 | 정사각 ~ 4:3 |
| HSplit 한쪽 (40%) | 520×520 이내 | 정사각 |
| 전체 배경 장식 | 1920×1080 | 16:9 |
| 아이콘/심볼 | 120~200px | 1:1 |

### 캔버스 규칙

- viewBox 기준으로 설계, width/height는 `100%`로 반응형
- SVG fill: `none` (투명 — 슬라이드 bg가 검정 담당)
- 최소 패딩: viewBox 가장자리에서 8px

---

## 3. 스트로크 기본

| 파라미터 | 모노 라인 | 테크 아이소 | 제한 칼라 |
|---------|----------|-----------|----------|
| strokeWidth | 1~2 | 0.5 | 1~1.5 |
| strokeLinecap | round | round | round |
| strokeLinejoin | round | round | round |

- 모노 라인: 더 굵은 선 (슬라이드에서 가시성 확보)
- 테크 아이소: 기존 아이소 스킬과 동일한 0.5px
- 제한 칼라: 중간 굵기

---

## 4. SVG 구조 템플릿

```jsx
// 컴포넌트 파일: src/data/presentations/assets/{Name}Illustration.jsx
'use client';

/**
 * @param {object} props
 * @param {object} [props.sx] - MUI sx prop for wrapper [Optional]
 */
function {Name}Illustration({ sx }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 {W} {H}"
      fill="none"
      style={{ width: '100%', height: '100%', ...sx }}
    >
      {/* SVG content */}
    </svg>
  );
}

export { {Name}Illustration };
```

### 네이밍 규칙

- 컴포넌트명: `{Subject}Illustration` (PascalCase)
- filter ID prefix: `pi_{type}_{n}` (presentation-illustration)
  - 모노 라인: `pi_ml_{n}`
  - 테크 아이소: `pi_ti_{n}`
  - 제한 칼라: `pi_cl_{n}`

---

## 5. 최종 검증 체크리스트

모든 유형에 공통으로 적용:

| # | 체크 |
|---|------|
| 1 | violetGray 토큰만 사용했는가? (hue 260° 이외 색상 없는가?) |
| 2 | 배경 fill이 `none`인가? (투명 — 슬라이드 bg 위임) |
| 3 | 전경색이 `--vdl-50` ~ `--vdl-100` 범위인가? |
| 4 | strokeLinecap/Linejoin이 `round`인가? |
| 5 | filter ID가 `pi_` prefix로 고유한가? |
| 6 | viewBox 가장자리 최소 8px 패딩 확보했는가? |
| 7 | `'use client'` 디렉티브 있는가? |
| 8 | JSDoc props 문서화 했는가? |

### 유형별 추가 검증

- **모노 라인**: fill 사용 없는가? (stroke only)
- **테크 아이소**: 아이소메트릭 각도 ~26.57° 통일인가?
- **제한 칼라**: 배경 제외 색상 3개 이하인가?

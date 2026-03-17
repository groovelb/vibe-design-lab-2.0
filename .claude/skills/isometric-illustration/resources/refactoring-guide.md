# Isometric Illustration — 리팩토링 & 구조 가이드

> 인터랙션 적용을 전제로 한 SVG 구조 기준.
> 새 일러스트 생성 시에도 이 구조를 준수한다.

---

## 0. 절대 원칙

**외관 변형 0 (Zero Visual Regression)**
- 리팩토링 전후 렌더링이 픽셀 단위로 동일해야 한다
- 검증: Storybook 스크린샷 비교 (리팩 전 캡처 → 리팩 후 비교)
- 좌표값, 컬러, opacity, strokeWidth, filter 파라미터 변경 금지

---

## 1. 그룹핑 기준: 논리 단위 = `<g>`

### 1.1 레이어/슬롯 단위 그룹핑

인터랙션의 최소 타겟 단위가 하나의 `<g>`여야 한다.

```jsx
{layers.map((l, i) => (
  <g key={`layer-${i}`} data-layer={i}>
    <g data-part="prism">        {/* 프리즘 외곽 + V자선 */}</g>
    <g data-part="content">      {/* 상면 콘텐츠 */}</g>
    <g data-part="naming-line">  {/* 네이밍 라인 (dot + line + label) */}</g>
    <g data-part="label">        {/* 넘버링, 인덱스 등 */}</g>
    <g data-part="connector">    {/* 연결 노드 (해당 레이어 위의 노드) */}</g>
  </g>
))}
```

- `data-layer={i}`: 레이어 단위 전체 선택
- `data-part`: 하위 요소 개별 타겟

### 1.2 z-order 보존

그룹핑 시 기존 페인팅 순서를 절대 깨지 않는다.

네이밍 라인이 모든 프리즘 위에 와야 하는 경우:

```jsx
<g data-role="geometry">
  {layers.map((l, i) => (
    <g key={`geo-${i}`} data-layer={i}>
      <g data-part="prism">...</g>
      <g data-part="content">...</g>
    </g>
  ))}
</g>
<g data-role="annotations">
  {layers.map((l, i) => (
    <g key={`ann-${i}`} data-layer={i}>
      <g data-part="naming-line">...</g>
      <g data-part="label">...</g>
      <g data-part="connector">...</g>
    </g>
  ))}
</g>
```

분리하더라도 `data-layer` 인덱스가 일치해서 JS로 쌍을 잡을 수 있어야 한다.

### 1.3 글로벌 요소

레이어에 속하지 않는 요소:

```jsx
<g data-role="global">
  <g data-part="axis">...</g>          {/* 조립축 */}
  <g data-part="title">...</g>         {/* 타이틀 */}
  <g data-part="legend">...</g>        {/* 범례 */}
  <g data-part="decorative">...</g>    {/* 장식 요소 */}
</g>
```

---

## 2. 데이터 선언 기준

### 2.1 레이어/슬롯 데이터 통합

렌더에 필요한 모든 정보를 데이터 배열에 선언한다.

```jsx
const LAYERS = [
  {
    iz: 0, h: 1.2, w: 7,
    label: 'Container Layer',       // 네이밍 라인 텍스트
    stroke: 'var(--vdl-200)',       // 외곽선 컬러
    content: 'container',           // 상면 콘텐츠 타입
    cssProp: 'width: 320px',        // VP3 전용: CSS 속성
    legend: ['Base Grid', ...],     // VP3 전용: 좌측 범례
  },
];
```

- 하드코딩 텍스트를 데이터에 통합
- 한 곳만 수정하면 프리즘, 네이밍 라인, 범례가 모두 업데이트

### 2.2 파생값은 렌더 시 계산

데이터 배열에는 원본 파라미터만. 좌표, 패스는 렌더 함수 내에서 `prism()` 등으로 계산.

---

## 3. 코드 위생

### 3.1 IIFE 제거

```jsx
// BAD
{(() => { const p = pt(0.5, 0.4); return <circle cx={p.x} ... />; })()}

// GOOD — 루프 상단에서 계산
const iconPos = pt(0.5, 0.4);
<circle cx={iconPos.x} ... />
```

### 3.2 로컬 중복 함수 제거

`isometricGrid.js`에 이미 존재하는 기능의 로컬 재구현을 제거.
`prism()`이 반환하는 `rightMid`, `leftMid`, `top`, `bottom` 등을 직접 사용.

### 3.3 미사용 import 제거

### 3.4 불필요 요소 점검

| 점검 항목 | 조치 |
|----------|------|
| 보이지 않는 path (opacity 0, 캔버스 밖) | 제거 |
| 중복 path (같은 좌표, 같은 스타일) | 병합 |
| 장식 전용 요소 | 유지하되 `data-part="decorative"` 태깅 |

---

## 4. filter 전략

- 일러스트당 1개 공유 filter 유지 (`vp{n}s`)
- `filterUnits="userSpaceOnUse"`로 넉넉한 영역 커버
- filter를 요소별로 쪼개지 않음

---

## 5. 점검 체크리스트

리팩토링 전후 모두 통과해야 한다:

| # | 항목 |
|---|------|
| 1 | 모든 레이어/슬롯이 `data-layer` 인덱스를 가진 `<g>`로 묶여있는가? |
| 2 | 네이밍 라인, 넘버링, 커넥터가 대응 레이어와 `data-layer`로 연결되는가? |
| 3 | z-order가 리팩 전과 동일한가? |
| 4 | IIFE 0개인가? |
| 5 | 로컬 중복 함수 0개인가? |
| 6 | 데이터 배열에 모든 텍스트가 통합되었는가? |
| 7 | 미사용 import가 없는가? |
| 8 | 외관이 리팩 전과 동일한가? (스크린샷 비교) |

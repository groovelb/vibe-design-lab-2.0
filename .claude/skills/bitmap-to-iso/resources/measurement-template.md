# 측정 결과 기록 템플릿

## 레퍼런스 정보

- 파일: `{path}`
- 원본 크기: {W} × {H} px
- SVG viewBox: {vbW} × {vbH}
- 환산 비율: {scale} (viewBox / 원본)

---

## 전체 구성

- 요소 개수: {N}개
- 구성 bbox: x={}, y={}, w={}, h={} (원본 px)
- viewBox 내 여백: 상={}, 하={}, 좌={}, 우={} px

---

## 슬래브 측정

### 슬래브 #{0}: {id}

**스크린 좌표 (원본 px)**
- top vertex: ({}, {})
- right vertex: ({}, {})
- front-bottom vertex: ({}, {})
- left vertex: ({}, {})
- 다이아몬드 폭: {} px (left→right 수평)
- 다이아몬드 높이: {} px (top→front 수직)
- 바디 높이: {} px

**콘텐츠 (원본 px)**
- 콘텐츠 bbox: x={}, y={}, w={}, h={}
- 콘텐츠/다이아몬드 면적비: {}%
- 주요 요소:
  - {요소명}: 위치=({}, {}), 크기={}×{}, strokeWidth={}px

**역투영 (flat 좌표)**
- fw: {} px
- fd: {} px
- bh: {} px
- 콘텐츠 flat 좌표:
  - {요소명}: translate({}, {}), 크기={}×{}, strokeWidth={}px

---

### 슬래브 #{1}: {id}
(위와 동일 형식)

---

## 레이어 간격

| from → to | 스크린 거리 (px) | iz 차이 (units) |
|-----------|----------------|----------------|
| #0 → #1 | {} | {} |
| #1 → #2 | {} | {} |
| #2 → #3 | {} | {} |
| #3 → #4 | {} | {} |

- iz 간격 균등성: 편차 {}% (기준: < 5%)

---

## 레이아웃 파라미터 (코드 입력값)

```js
const VB_W = {};
const VB_H = {};
const O = { x: {}, y: {} };
const FW = {};    // flat width
const FD = {};    // flat depth
const BH = {};    // body height
const CR = {};    // corner radius
// iz values: [{}]
// iz step: {} iso units
```

---

## 검증 체크리스트

| # | 항목 | 값 | 기준 | 결과 |
|---|------|---|------|------|
| 1 | fw > 0 | {} | 양수 | |
| 2 | fd > 0 | {} | 양수 | |
| 3 | fw:fd 비율 | {} | 1.2~3.0 | |
| 4 | 모든 콘텐츠 ∈ [0,fw]×[0,fd] | | 포함 | |
| 5 | iz 간격 편차 | {}% | < 5% | |
| 6 | viewBox 내 여백 ≥ 0 | 상={} 하={} | ≥ 0 | |
| 7 | 콘텐츠 비율 편차 | {}% | < 10% | |

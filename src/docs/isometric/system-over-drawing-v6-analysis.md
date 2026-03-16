# System Over Drawing V6 — 구조 분석

> 참조 이미지: `src/assets/isometric/system-over-drawing_v6.png`
> 기존 구현: `src/assets/brandIllustration/SystemOverDrawingV3.jsx`

---

## 1. 전체 구도 분석

### 1.1 컨셉

"기준을 먼저 설계하는 과정" — 5개 디자인 토큰 레이어가 합쳐지기 직전의 **분해도(Exploded View)**. 디자인 시스템의 수직적 레이어 구조를 아이소메트릭 분해도로 시각화한다.

### 1.2 ViewBox & 좌표계

| 항목 | 값 |
|------|-----|
| ViewBox | `0 0 600 450` |
| 수직 기준점 (O_Y) | 288 |
| 우측 정렬 기준 (RIGHT_X) | 372 |
| 단위 (UNIT) | 8px |

### 1.3 투영 방식

- **2:1 Dimetric Projection** (비정방 아이소메트릭)
- 투영 각도: `arctan(1/2) ≈ 26.57°` (수평 기준)
- 우측 모서리 기울기: `slope = +1/2` (x → +fw, y → +fw/2)
- 좌측 모서리 기울기: `slope = -1/2` (x → -fd, y → +fd/2)
- Z축: 수직 상승, 1iz = 8px 상승

### 1.4 정렬 방식

- **우측 정렬 (Right-Aligned)**: 모든 슬래브의 우측 꼭짓점(v[1]) x좌표 = 372
- **하단→상단 순서**: background(iz=0) → typography(iz=20)
- 위로 갈수록 슬래브가 작아짐 → 시각적 원근감 + 계층 표현

### 1.5 레이어 크기 진행 규칙

| 속성 | 하단→상단 변화 | 비율 |
|------|---------------|------|
| fw (flat width) | 159 → 150 → 141 → 132 → 123 | 매 레이어 −9 |
| fd (flat depth) | 106 → 100 → 94 → 88 → 82 | 매 레이어 −6 |
| fw:fd 비율 | 모든 레이어 **3:2** (9:6 = 3:2) | 일정 |
| iz 간격 | 0 → 5 → 10 → 15 → 20 | 매 레이어 +5 |

### 1.6 전체 프레임 바운딩 박스

| 영역 | X 범위 | Y 범위 | 크기 |
|------|--------|--------|------|
| 슬래브 전체 | 107 ~ 372 | 65.75 ~ 354.25 | 265 × 288.5 |
| 라벨 포함 | 20 ~ ~530 | 30 ~ 354.25 | ~510 × ~325 |

---

## 2. 공통 슬래브 파라미터

### 2.1 슬래브 구조 (Rectangular Isometric Slab)

각 슬래브는 **비정방 직사각형 아이소메트릭 슬래브**로, 정육면체가 아닌 fw ≠ fd 비율의 직사각형 평면이 아이소메트릭으로 투영된 형태.

```
        v[0] (top)
       /          \
    v[5]           v[1] (right)
      |    top      |
    v[4]  face    v[2] (right bottom)
       \          /
        v[3] (front bottom)
```

6개 꼭짓점:
- **v[0]** (top): 상면 꼭대기
- **v[1]** (right): 우측 꼭짓점 (상면)
- **v[2]** (right bottom): 우측 꼭짓점 (하면)
- **v[3]** (front bottom): 전면 꼭짓점 (하면)
- **v[4]** (left bottom): 좌측 꼭짓점 (하면)
- **v[5]** (left): 좌측 꼭짓점 (상면)
- **frontTop**: 상면 전면 꼭짓점 (v[5]→frontTop→v[1] V-line)

### 2.2 기하학 공식

```
cx = RIGHT_X - fw
baseY = O_Y - iz × UNIT
topY = baseY - (fw + fd) / 4 - BH

v[0] = (cx, topY)
v[1] = (cx + fw, topY + fw/2)
v[2] = (cx + fw, topY + fw/2 + BH)
v[3] = (cx + fw - fd, topY + (fw+fd)/2 + BH)
v[4] = (cx - fd, topY + fd/2 + BH)
v[5] = (cx - fd, topY + fd/2)
frontTop = (cx + fw - fd, topY + (fw+fd)/2)
```

### 2.3 코너 라운딩

| 파라미터 | 값 | 설명 |
|---------|-----|------|
| CR | 8 | 기본 모서리 반경 |
| BH | 11 | 슬래브 몸체 높이 |
| SW | 0.5 | 헤어라인 스트로크 |

**비대칭 코너 처리:**
- v[0], v[3] (face↔face 코너): **Quadratic Bézier** (Q-curve), 내각 ~127°
- v[1], v[2], v[4], v[5] (face→vertical 코너): **Cubic Bézier** (C-curve), 비대칭 타원형
  - 면 방향: R_FACE = 18 (시각적 곡률 ~3.4px)
  - 수직 방향: crv = min(CR, BH/3) ≈ 3.67px

### 2.4 상면 좌표 변환 매트릭스

flat 좌표 (FW=97 × FD=65) → 슬래브별 상면 매핑:

```
matrix(sx, sx/2, -sy, sy/2, cx, topY)
```

| 레이어 | sx (fw/FW) | sy (fd/FD) |
|--------|-----------|-----------|
| background | 1.639 | 1.631 |
| spatial | 1.546 | 1.538 |
| motion | 1.454 | 1.446 |
| color | 1.361 | 1.354 |
| typography | 1.268 | 1.262 |

---

## 3. 레이어별 상세 분석

---

### 3.1 Layer 1: BACKGROUND & DETAIL (최하단)

**기본 파라미터:**

| 항목 | 값 |
|------|-----|
| id | `background` |
| iz | 0 |
| fw | 159 |
| fd | 106 |
| cx | 213 |
| topY | 210.75 |

**꼭짓점 좌표 (screen px):**

| 꼭짓점 | x | y |
|--------|-------|--------|
| v[0] top | 213 | 210.75 |
| v[1] right | 372 | 290.25 |
| v[2] rightBottom | 372 | 301.25 |
| v[3] frontBottom | 266 | 354.25 |
| v[4] leftBottom | 107 | 274.75 |
| v[5] left | 107 | 263.75 |
| frontTop | 266 | 343.25 |
| rightMid | 372 | 295.75 |
| leftMid | 107 | 269.25 |

**치수:**

| 항목 | 값 |
|------|-----|
| 스크린 폭 (v[5]→v[1]) | 265 px |
| 상면 대각 높이 | 132.5 px |
| 몸체 높이 | 11 px |
| 바운딩 박스 | 265 × 143.5 px |
| 상면 면적 (screen) | 16,854 px² |

**상면 콘텐츠 — 중첩 사각형:**
- 외부 사각형: 패딩 6px, 85×53 (flat), rx=3
- 내부 사각형: 오프셋 (10, 8), 65×37 (flat), rx=1.5, opacity=0.5
- 의미: 배경 프레임 + 디테일 영역 표현

---

### 3.2 Layer 2: SPATIAL COMPOSITION

**기본 파라미터:**

| 항목 | 값 |
|------|-----|
| id | `spatial` |
| iz | 5 |
| fw | 150 |
| fd | 100 |
| cx | 222 |
| topY | 174.5 |

**꼭짓점 좌표 (screen px):**

| 꼭짓점 | x | y |
|--------|-------|--------|
| v[0] top | 222 | 174.5 |
| v[1] right | 372 | 249.5 |
| v[2] rightBottom | 372 | 260.5 |
| v[3] frontBottom | 272 | 310.5 |
| v[4] leftBottom | 122 | 235.5 |
| v[5] left | 122 | 224.5 |
| frontTop | 272 | 299.5 |
| rightMid | 372 | 255 |
| leftMid | 122 | 230 |

**치수:**

| 항목 | 값 |
|------|-----|
| 스크린 폭 | 250 px |
| 상면 대각 높이 | 125 px |
| 몸체 높이 | 11 px |
| 바운딩 박스 | 250 × 136 px |
| 상면 면적 (screen) | 15,000 px² |

**상면 콘텐츠 — 그리드 레이아웃:**
- 외부 프레임: 패딩 6px, rx=3
- 수직선 4개: u = 0.2, 0.4, 0.6, 0.8 × FW
- 수평선 3개: v = 0.25, 0.5, 0.75 × FD
- 의미: 공간 구성/레이아웃 그리드 표현

---

### 3.3 Layer 3: MOTION

**기본 파라미터:**

| 항목 | 값 |
|------|-----|
| id | `motion` |
| iz | 10 |
| fw | 141 |
| fd | 94 |
| cx | 231 |
| topY | 138.25 |

**꼭짓점 좌표 (screen px):**

| 꼭짓점 | x | y |
|--------|-------|--------|
| v[0] top | 231 | 138.25 |
| v[1] right | 372 | 208.75 |
| v[2] rightBottom | 372 | 219.75 |
| v[3] frontBottom | 278 | 266.75 |
| v[4] leftBottom | 137 | 196.25 |
| v[5] left | 137 | 185.25 |
| frontTop | 278 | 255.75 |
| rightMid | 372 | 214.25 |
| leftMid | 137 | 190.75 |

**치수:**

| 항목 | 값 |
|------|-----|
| 스크린 폭 | 235 px |
| 상면 대각 높이 | 117.5 px |
| 몸체 높이 | 11 px |
| 바운딩 박스 | 235 × 128.5 px |
| 상면 면적 (screen) | 13,254 px² |

**상면 콘텐츠 — 모션 커브:**
- Quadratic Bézier 커브: 좌하→우상 방향
- 제어점 원: (FW×0.48, FD×0.28), r=3.5
- 화살촉: 커브 끝점에 V자 형태
- 의미: 애니메이션 이징/모션 경로 표현

---

### 3.4 Layer 4: COLOR & THEME

**기본 파라미터:**

| 항목 | 값 |
|------|-----|
| id | `color` |
| iz | 15 |
| fw | 132 |
| fd | 88 |
| cx | 240 |
| topY | 102 |

**꼭짓점 좌표 (screen px):**

| 꼭짓점 | x | y |
|--------|-------|--------|
| v[0] top | 240 | 102 |
| v[1] right | 372 | 168 |
| v[2] rightBottom | 372 | 179 |
| v[3] frontBottom | 284 | 223 |
| v[4] leftBottom | 152 | 157 |
| v[5] left | 152 | 146 |
| frontTop | 284 | 212 |
| rightMid | 372 | 173.5 |
| leftMid | 152 | 151.5 |

**치수:**

| 항목 | 값 |
|------|-----|
| 스크린 폭 | 220 px |
| 상면 대각 높이 | 110 px |
| 몸체 높이 | 11 px |
| 바운딩 박스 | 220 × 121 px |
| 상면 면적 (screen) | 11,616 px² |

**상면 콘텐츠 — 컬러 팔레트:**
- 원 7개: 수평 등간격 배치
- 반지름: r=5 (flat 좌표)
- 수직 중심: FD × 0.5
- 수평 범위: pad+6 ~ FW-pad-6, 간격 = (iw-12)/6
- 의미: 테마 컬러 스와치 표현

---

### 3.5 Layer 5: TYPOGRAPHY (최상단)

**기본 파라미터:**

| 항목 | 값 |
|------|-----|
| id | `typography` |
| iz | 20 |
| fw | 123 |
| fd | 82 |
| cx | 249 |
| topY | 65.75 |

**꼭짓점 좌표 (screen px):**

| 꼭짓점 | x | y |
|--------|-------|--------|
| v[0] top | 249 | 65.75 |
| v[1] right | 372 | 127.25 |
| v[2] rightBottom | 372 | 138.25 |
| v[3] frontBottom | 290 | 179.25 |
| v[4] leftBottom | 167 | 117.75 |
| v[5] left | 167 | 106.75 |
| frontTop | 290 | 168.25 |
| rightMid | 372 | 132.75 |
| leftMid | 167 | 112.25 |

**치수:**

| 항목 | 값 |
|------|-----|
| 스크린 폭 | 205 px |
| 상면 대각 높이 | 102.5 px |
| 몸체 높이 | 11 px |
| 바운딩 박스 | 205 × 113.5 px |
| 상면 면적 (screen) | 10,086 px² |

**상면 콘텐츠 — 타이포그래피 "Ag":**
- **"A"**: Garamond Bold 스타일, 세리프 포함
  - Cap height = ih (53px flat), width = 0.78 × height
  - Thick stroke = 5.5px (fill path), Thin stroke = 2.5px
  - 세리프: Q-bezier 리본, length=4.5, height=2
  - 좌측 다리(thin) + 우측 다리(thick) + 크로스바(thin)
- **"g"**: Double-story 소문자
  - Bowl: ring path, r=8, stroke=4
  - Ear: 우상단 돌출선, w=2
  - Stem: 수직선, stroke=4
  - Loop: 타원 ring, rx=9, ry=7, stroke=3.2

---

## 4. 보조 요소 분석

### 4.1 타이틀

| 항목 | 값 |
|------|-----|
| 위치 | x=20, y=30 |
| 텍스트 | "DESIGN" + "SYSTEM" (2줄) |
| 줄간격 | 16px |
| 폰트 | monospace, bold, 14px |
| 자간 | 2.5px |
| 색상 | white |

### 4.2 네이밍 라인 (Naming Lines)

각 슬래브의 rightMid에서 우측으로 80px 수평 연장.

| 레이어 | 시작점 (rightMid + 5px) | 끝점 | 라벨 |
|--------|------------------------|------|------|
| background | (377, 295.75) | (457, 295.75) | BACKGROUND\n& DETAIL |
| spatial | (377, 255) | (457, 255) | SPATIAL\nCOMPOSITION |
| motion | (377, 214.25) | (457, 214.25) | MOTION |
| color | (377, 173.5) | (457, 173.5) | COLOR & THEME |
| typography | (377, 132.75) | (457, 132.75) | TYPOGRAPHY |

- 도트: r=1.8, fill=white
- 라인: stroke=white, sw=0.5
- 라벨: monospace, bold, 7.5px, x=끝점+4

### 4.3 치수선 (Dimension Lines)

**좌측 수직 치수선 (4개):**

| 구간 | y1 (left.y) | y2 (next leftBottom.y) | 간격 | 표기 |
|------|-------------|----------------------|------|------|
| bg→spatial | 263.75 | 235.5 | 28.25 px | 0.36" |
| spatial→motion | 224.5 | 196.25 | 28.25 px | 0.56" |
| motion→color | 185.25 | 157 | 28.25 px | 0.56" |
| color→typo | 146 | 117.75 | 28.25 px | 0.56" |

x위치: 각 layer의 left.x − 15

**상단 폭 치수선:**
- typography 레이어: left.x(167) ~ right.x(372)
- y = top.y − 8 = 57.75
- 표기: 5.86"

### 4.4 각도 마커

| 항목 | 위치 | 값 |
|------|------|-----|
| 아이소메트릭 각도 | background frontBottom 근처 | 18° |
| 수평 참조 | 아래쪽 | 180° |

---

## 5. 스타일 스펙

### 5.1 색상

| 요소 | 값 |
|------|-----|
| 배경 | 없음 (투명) |
| 슬래브 fill | `var(--vdl-950)` |
| 모든 stroke | white |
| 모든 text fill | white |

### 5.2 선 스타일

| 요소 | stroke-width | linecap | linejoin |
|------|-------------|---------|----------|
| 슬래브 아웃라인 | 0.5 | - | round |
| V-line / frontEdge | 0.5 | round | - |
| 치수선 | 0.5 | - | - |
| 네이밍 라인 | 0.5 | - | - |

### 5.3 그림자 (Drop Shadow Filter)

```
id="sod3s"
filterUnits="userSpaceOnUse"
bounds: (-40, -40) ~ (680, 530)
```

| 단계 | 값 |
|------|-----|
| feOffset | dy=4 |
| feGaussianBlur | stdDeviation=8 |
| 그림자 색상 | rgba(8, 9, 10, 0.6) |
| 합성 | feComposite operator="out" → feBlend |

### 5.4 클리핑

각 슬래브에 clipPath 적용 → vLine과 frontEdge가 라운드 코너 밖으로 삐져나오지 않도록 처리.

---

## 6. 레이어 간 관계 요약

```
                    ┌─── typography (iz=20) ───── fw=123, fd=82
                   ↑ 5 units (40px)
                    ├─── color (iz=15) ────────── fw=132, fd=88
                   ↑ 5 units (40px)
                    ├─── motion (iz=10) ───────── fw=141, fd=94
                   ↑ 5 units (40px)
                    ├─── spatial (iz=5) ────────── fw=150, fd=100
                   ↑ 5 units (40px)
                    └─── background (iz=0) ─────── fw=159, fd=106

            우측 정렬: 모든 v[1].x = 372
            크기 진행: fw Δ=−9, fd Δ=−6 (3:2 비율 유지)
            상면 면적: 16,854 → 15,000 → 13,254 → 11,616 → 10,086 px²
```

# Codegen.com 비주얼 디자인 분석 보고서

> **분석 일자**: 2026-03-20
> **대상**: https://codegen.com/
> **분석 범위**: 비주얼 디렉션, 스타일 시스템, 조형 요소, Ambient Grained Gradient 구현 방식

---

## 목차

1. [전체 비주얼 디렉션](#1-전체-비주얼-디렉션)
2. [컬러 시스템](#2-컬러-시스템)
3. [Ambient Grained Gradient: 레이어 구조](#3-ambient-grained-gradient-레이어-구조)
4. [Grain 텍스처 상세 분석](#4-grain-텍스처-상세-분석)
5. [그래디언트 패턴 카탈로그](#5-그래디언트-패턴-카탈로그)
6. [기술적 구현 디테일](#6-기술적-구현-디테일)
7. [타이포그래피](#7-타이포그래피)
8. [에셋 인벤토리](#8-에셋-인벤토리)
9. [요약 및 재현 가이드](#9-요약-및-재현-가이드)

---

## 1. 전체 비주얼 디렉션

**다크 모드 퍼스트 + 퍼플 모노크로매틱** 디자인 시스템.

거의 검정에 가까운 `#141417` 베이스 위에 퍼플 스펙트럼 단일 색상 축만으로 색채를 구성하며, 아날로그 필름 그레인 텍스처를 전면에 깔아 디지털 평면성을 깨뜨리는 **하이엔드 에디토리얼** 느낌의 디자인이다.

### 핵심 디자인 키워드

- **볼류메트릭 라이팅(Volumetric Lighting)**: 사전 렌더링된 글로우 이미지로 공간감 있는 빛 표현
- **아날로그 물질감(Analog Materiality)**: 이미지 기반 필름 그레인 오버레이
- **레이어드 컴포지팅(Layered Compositing)**: 6개 이상의 시각 레이어를 합성
- **모노크로매틱 럭셔리(Monochromatic Luxury)**: 단일 색상 축(퍼플)으로 프리미엄 톤 구현

---

## 2. 컬러 시스템

### 2.1 브랜드 퍼플 그래디언트 스케일

어두움에서 밝음 순서로 정렬한 핵심 브랜드 컬러:

| 이름 | HEX | 용도 |
|------|-----|------|
| Deep Purple | `#2E106B` | 그래디언트 시작점, 가장 어두운 보라 |
| Electric Purple | `#5213D9` | 핵심 브랜드 컬러, 그래디언트 중간 톤 |
| Lavender | `#9D7DE2` | 그래디언트 끝점, 밝은 보라 |
| Soft Purple | `#B295F1` | 라이트 섹션 그래디언트 중간 톤 |
| Pale Lavender | `#DAC8FF` | 라이트 섹션 그래디언트 |
| Near-White | `#FDFDFC` | 라이트 섹션 베이스 (순백이 아닌 미세한 웜톤) |

### 2.2 뉴트럴 다크 팔레트

| CSS 토큰 | HEX | 용도 |
|-----------|-----|------|
| `--color-neutral-900` | `#141417` | 페이지 메인 배경 (미묘한 보랏빛 near-black) |
| `--color-neutral-800` | `#1d1d24` | 카드/섹션 배경 |
| `--color-neutral-700` | `#343445` | 보더, 구분선 |
| `--color-neutral-600` | `oklch(43.9% 0 0)` | 보조 텍스트 |
| `--color-neutral-500` | `#b3b8be` | 비활성 텍스트 |
| `--color-neutral-100` | `#fff` | 주요 텍스트 (다크 모드에서) |

### 2.3 컬러 설계 특징

- `#141417`은 순수한 검정(`#000`)이 아닌, **약간의 보랏빛을 머금은 near-black**으로, 퍼플 그래디언트와의 조화를 위해 의도적으로 설계됨
- `--color-neutral-800`(`#1d1d24`) 역시 blue-purple 언더톤이 있어, 뉴트럴이면서도 브랜드 컬러와 자연스럽게 연결됨
- 라이트 섹션의 끝점 `#FDFDFC`는 순백 `#FFFFFF`가 아닌 미세한 웜톤으로, 차가운 보라색과의 온도 대비를 만듦

---

## 3. Ambient Grained Gradient: 레이어 구조

이 웹사이트의 시각적 핵심은 **6개 레이어의 합성(compositing)**이다. 아래(뒤)에서 위(앞) 순서로:

```
┌─────────────────────────────────────────────┐
│  Layer 6: Global Grain (z-150, 8% opacity)  │  ← 전체 페이지 위
├─────────────────────────────────────────────┤
│  Layer 5: Grid SVG (soft-light blend)       │  ← 그래디언트 섹션 위
├─────────────────────────────────────────────┤
│  Layer 4: Section Grain (100% opacity)      │  ← 그래디언트 위
├─────────────────────────────────────────────┤
│  Layer 3: CSS Gradients (per-section)       │  ← 컨테이너별 그래디언트
├─────────────────────────────────────────────┤
│  Layer 2: Purple Glow Images                │  ← 앰비언트 광원
├─────────────────────────────────────────────┤
│  Layer 1: Base Background (#141417)         │  ← 최하단 베이스
└─────────────────────────────────────────────┘
```

### Layer 1 — 베이스 배경

```css
body {
  background-color: #141417; /* --color-neutral-900 */
}
```

페이지 전체의 기본 배경. 보랏빛이 미묘하게 감도는 near-black.

### Layer 2 — Purple Glow (사전 렌더링된 이미지)

```html
<!-- 왼쪽 글로우 -->
<div class="pointer-events-none absolute z-0
            bg-no-repeat bg-contain
            top-[-140px] md:top-[-165px]
            left-[-900px] md:left-[-560px]
            w-[1400px] h-[1050px]"
     style="background-image:url(/assets/purple-glow-DvDMfLz2.avif)">
</div>

<!-- 오른쪽 글로우 -->
<div class="hidden md:block pointer-events-none absolute z-0
            bg-no-repeat bg-contain
            top-[-325px] right-[-450px]
            w-[1400px] h-[1050px]"
     style="background-image:url(/assets/purple-glow-DvDMfLz2.avif)">
</div>
```

**특징:**
- 원본 이미지: **2391 x 2042px**, AVIF 포맷, RGBA (알파 채널 포함)
- CSS blur/shadow가 아닌 **사전 렌더링된 소프트 라디얼 글로우** 이미지
- 뷰포트 바깥까지 크게 넘쳐서(`left: -560px`, `right: -450px`) 자연스러운 빛번짐 구현
- `pointer-events-none` + `z-0`으로 콘텐츠 인터랙션 불간섭
- 히어로 섹션에서 좌/우 대칭으로 2개 배치

### Layer 3 — 섹션별 CSS 그래디언트

각 섹션의 컨텍스트에 맞는 CSS 그래디언트가 적용됨. (자세한 패턴은 [5장](#5-그래디언트-패턴-카탈로그) 참조)

### Layer 4 — Section Grain (그래디언트 위 그레인)

```html
<div class="absolute inset-0 opacity-100 pointer-events-none z-0"
     style="background-image:url(/assets/grain-black-7FuVSlAl.avif);
            background-repeat:repeat;
            background-size:128px 128px">
</div>
```

**특징:**
- 원본: 1024x1024px AVIF, 그러나 `background-size: 128px`으로 **축소 표시**
- 축소로 인해 **그레인 밀도가 8배** 높아져 더 촘촘하고 미세한 입자감
- `opacity: 100%` — 그래디언트와 완전히 합성
- 어두운 톤의 노이즈로, 보라색 그래디언트 섹션에만 선택적 적용
- 그래디언트에 **아날로그 깊이감과 입자감**을 부여

### Layer 5 — Grid SVG 오버레이

```html
<div class="absolute inset-0 p-8 pointer-events-none hidden md:block"
     style="background-image:url(/assets/grid-CJ97pa2y.svg);
            background-repeat:no-repeat;
            background-size:1440px 566px;
            background-position:center;
            mix-blend-mode:soft-light">
</div>
```

**특징:**
- 1440x566px SVG 그리드 패턴
- SVG 내부 그룹에 `opacity: 0.7` 적용
- `mix-blend-mode: soft-light`로 하단 그래디언트와 유기적 합성
- 미세한 구조적 라인이 그래디언트 위에 살짝 드러남
- 모바일용 별도 SVG(`grid-mobile-BGugoc22.svg`)도 존재

### Layer 6 — Global Grain (최상위 전체 오버레이)

```html
<div class="pointer-events-none absolute inset-0 z-150 opacity-[0.08]"
     style="background-image:url(/assets/grain-BCQLvfp_.avif);
            background-repeat:repeat">
</div>
```

**특징:**
- 원본: **1024x1024px AVIF**, RGBA
- `opacity: 0.08` (8%) — 매우 미묘한 질감
- `z-index: 150` — **모든 콘텐츠 위**에 배치
- `background-repeat: repeat` — 자연 크기(1024px)로 타일링
- 밝은/중성 톤의 노이즈 텍스처
- 페이지 전체에 아날로그 필름의 미세한 입자감 부여

---

## 4. Grain 텍스처 상세 분석

### 4.1 두 가지 그레인 텍스처 비교

| 속성 | Global Grain (Light) | Section Grain (Dark) |
|------|---------------------|---------------------|
| 파일 | `grain-BCQLvfp_.avif` | `grain-black-7FuVSlAl.avif` |
| 원본 크기 | 1024 x 1024px | 1024 x 1024px |
| 파일 용량 | ~1.59MB | ~673KB |
| 포맷 | AVIF (RGBA, 8bit) | AVIF (RGBA, 8bit) |
| 표시 크기 | 1024px (원본 그대로) | **128px** (8배 축소) |
| 불투명도 | **8%** | **100%** |
| 적용 범위 | 전체 페이지 | 보라색 그래디언트 섹션만 |
| z-index | 150 (최상위) | 0 (섹션 내부) |
| 톤 | 밝은/중성 노이즈 | 어두운 노이즈 |
| 역할 | 전체적인 아날로그 질감 | 그래디언트에 깊이감 부여 |

### 4.2 왜 CSS 노이즈가 아닌 이미지 타일인가?

codegen.com은 SVG 필터(`feTurbulence`/`feColorMatrix`)나 Canvas 기반 노이즈 생성을 사용하지 않고, **사전 렌더링된 AVIF 이미지 타일**을 선택했다:

| 기준 | 이미지 타일 (채택) | SVG feTurbulence | Canvas |
|------|-------------------|-----------------|--------|
| 성능 | 런타임 연산 없음 | GPU 의존적, 리페인트 비용 | JS 실행 비용 |
| 일관성 | 브라우저/GPU 무관 동일 | 브라우저별 렌더링 차이 | 구현에 따라 상이 |
| 제어 | 밝은/어두운 별도 제작 가능 | 파라미터 조합 복잡 | 자유도 높으나 복잡 |
| 해상도 조절 | `background-size`로 간단 | 불가 | 가능하나 재연산 필요 |
| 파일 크기 | AVIF 압축으로 경량 | 인라인 SVG로 0KB | JS 코드 크기 |
| HiDPI 대응 | 1024px 원본으로 충분 | 해상도 독립적 | 해상도 독립적 |

### 4.3 그레인 밀도 조절 기법

같은 1024px 이미지를 `background-size`로 축소하여 그레인의 시각적 밀도를 조절하는 테크닉:

```
원본 (1024px) → 입자가 크고 성김 → 전체 오버레이용 (미묘한 질감)
128px 표시   → 입자가 8배 촘촘  → 섹션 오버레이용 (뚜렷한 질감)
```

이는 하나의 텍스처 에셋으로 **두 가지 다른 시각적 효과**를 만들어내는 효율적인 접근이다.

---

## 5. 그래디언트 패턴 카탈로그

### 5.1 다크 섹션 그래디언트 (보라 → 투명)

```css
/* Tailwind */
bg-gradient-to-t from-[#9D7DE2] via-[#5213D9] to-transparent

/* 컴파일된 CSS */
background-image: linear-gradient(to top, #9D7DE2, #5213D9, transparent);
```

사용처: How It Works 섹션, CTA 영역 등 다크 배경 위의 보라색 그래디언트

### 5.2 라이트 섹션 그래디언트 (흰색 → 보라)

```css
background: linear-gradient(360deg,
  #FDFDFC 12.82%,   /* 거의 흰색 - 하단 */
  #DAC8FF 66.56%,   /* 연보라 */
  #B295F1 83.79%,   /* 중간 보라 */
  #9D7DE2 100.06%   /* 라벤더 - 상단 */
);
```

사용처: Features 섹션, Getting Started 섹션 등 밝은 배경의 컨테이너

### 5.3 CTA 섹션 수평 그래디언트 (블렌드 모드 활용)

```css
background: linear-gradient(90deg,
  #141417 -10.23%,  /* near-black - 좌측 */
  #2E106B 46.27%,   /* 딥 퍼플 */
  #5213D9 74.52%,   /* 일렉트릭 퍼플 */
  #9D7DE2 99.99%    /* 라벤더 - 우측 */
);
background-blend-mode: multiply, normal;
```

사용처: 하단 CTA(Call-To-Action) 배너 섹션

### 5.4 스텝 넘버/아이콘 그래디언트 (수직)

```css
/* Tailwind */
bg-gradient-to-b from-[#2E106B] via-[#5213D9] to-[#9D7DE2]

/* 컴파일된 CSS */
background-image: linear-gradient(to bottom, #2E106B, #5213D9, #9D7DE2);
```

사용처: 56x56px 스텝 넘버 원, 타임라인 세로선

### 5.5 아이콘 배경 그래디언트 (대각선)

```css
background: linear-gradient(1.65deg,
  #2E106B -54.52%,  /* 하단 바깥 */
  #5213D9 15.2%,    /* 중심 */
  #9D7DE2 87.04%    /* 상단 */
);
box-shadow: 0 18.776px 88.071px 0 rgba(0, 0, 0, 0.95);
```

사용처: 64x64px 피처 아이콘 배경. 매우 깊은 그림자(`88px blur, 95% 검정`)로 떠있는 느낌.

### 5.6 버튼 그래디언트 (수평 + 호버 전환)

```css
/* 기본 상태 */
bg-gradient-to-r from-[#2E106B] to-[#5213D9]

/* 호버 상태 (::before 의사 요소) */
before:bg-gradient-to-r before:from-[#2E106B] before:via-[#5213D9] before:to-[#9D7DE2]
before:opacity-0 hover:before:opacity-100
before:transition-opacity before:duration-300
```

기본 2색 그래디언트 위에 3색 그래디언트를 `::before`로 겹쳐 놓고, hover 시 opacity 전환으로 부드러운 색상 이동 구현.

### 5.7 페이드 아웃 엣지 (로고 캐러셀)

```css
/* 좌측 페이드 */
bg-gradient-to-r from-[var(--color-neutral-900)]
                 via-[color-mix(in_srgb, var(--color-neutral-900) 50%, transparent)]
                 to-transparent

/* 우측 페이드 */
bg-gradient-to-l from-[var(--color-neutral-900)]
                 via-[color-mix(in_srgb, var(--color-neutral-900) 50%, transparent)]
                 to-transparent
```

`color-mix()` CSS 함수를 사용한 현대적인 접근. 배경색의 50% 투명도를 중간값으로 사용하여 부드러운 페이드.

---

## 6. 기술적 구현 디테일

### 6.1 그래디언트 보더 기법

```css
border: 1px solid transparent;
background-image:
  linear-gradient(var(--color-neutral-900), var(--color-neutral-900)),  /* 패딩 영역: 단색 */
  linear-gradient(180deg, #9D7DE2, #5213D9, #2E106B);                  /* 보더 영역: 그래디언트 */
background-origin: border-box;
background-clip: padding-box, border-box;
```

**원리:**
- 첫 번째 `background-image`는 `padding-box`에만 클리핑 → 콘텐츠 영역을 단색으로 채움
- 두 번째 `background-image`는 `border-box`에 클리핑 → 보더 영역까지 확장
- 결과적으로 1px 보더 영역에만 그래디언트가 노출됨
- `border: transparent`로 보더 공간을 확보하되 보더 자체 색은 숨김

### 6.2 글로우 구현 (이미지 기반)

CSS `box-shadow`나 `filter: blur()` 대신 **사전 렌더링된 AVIF 이미지**를 사용:

```html
<!-- 히어로 글로우: 뷰포트 바깥으로 넘치는 대형 이미지 -->
<div style="background-image:url(/assets/purple-glow-DvDMfLz2.avif)"
     class="absolute w-[1400px] h-[1050px] top-[-165px] left-[-560px]">
</div>

<!-- 섹션 글로우: 컨테이너 20% 바깥까지 확장 -->
<div style="background-image:url(/assets/glow-c1C8row6.avif);
            background-size:1000px 750px"
     class="absolute inset-[-20%]">
</div>
```

**이미지 기반 글로우의 장점:**
- 복잡한 광원 형태를 자유롭게 디자인 가능
- `filter: blur()`의 높은 GPU 비용 회피
- 알파 채널로 정밀한 페이드아웃 제어
- AVIF 압축으로 파일 사이즈 최적화

### 6.3 반투명 카드 배경

```css
background-color: #FDFDFC66; /* near-white + 40% 불투명도 */
```

라이트 그래디언트 섹션 위의 카드에서, 배경이 살짝 비치는 글래시즘 효과를 8자리 HEX 코드로 간결하게 구현.

### 6.4 카드 배경 이미지 (확대 기법)

```html
<div class="relative overflow-hidden bg-[var(--color-neutral-800)]"
     style="background-image:url(/assets/bg-card-1-y8Ue9pnN.avif);
            background-size:300%;
            background-position:center 100%">
</div>
```

카드 배경 이미지를 `300%`로 확대하여, 이미지의 일부분만 보여주는 크롭 효과. `overflow: hidden`으로 넘치는 부분 숨김.

### 6.5 로고 캐러셀 무한 스크롤

```css
@keyframes logo-scroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(calc(-25%)); }
}

.logo-scroll-animation {
  animation: logo-scroll 120s linear infinite;
  width: max-content;
}
```

- 120초의 매우 느린 속도로 부드러운 연속 스크롤
- `-25%` 이동 후 리셋 (4배 복제된 아이템 세트 기준)
- 역방향 애니메이션(`logo-scroll-reverse`)으로 2행 엇갈림 효과

---

## 7. 타이포그래피

### 7.1 폰트 패밀리

| 용도 | 폰트 | 로딩 | 웨이트 |
|------|-------|------|--------|
| 메인 헤드라인/본문 | **TT Hoves Pro** | `@font-face` preload (woff2) | Light(300), Regular(400), Medium(500) |
| 시스템 Sans 폴백 | SF Pro → -apple-system → BlinkMacSystemFont → Segoe UI → Roboto | 시스템 | — |
| 모노스페이스 | **DM Mono** | — | Regular |

### 7.2 폰트 프리로드

```html
<link rel="preload" as="font" href="/fonts/TT_Hoves_Pro_Medium.woff2" crossorigin>
<link rel="preload" as="font" href="/fonts/TT_Hoves_Pro_Regular.woff2" crossorigin>
<link rel="preload" as="font" href="/fonts/TT_Hoves_Pro_Light.woff2" crossorigin>
```

3가지 웨이트 모두 `preload`로 선언하여 FOUT(Flash of Unstyled Text) 최소화.

### 7.3 CSS 커스텀 폰트 변수

```css
--font-family-tt-hoves: "TT Hoves Pro", sans-serif;
--font-family-sans: "SF Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
--font-family-mono: "DM Mono", Monaco, "Courier New", monospace;
```

---

## 8. 에셋 인벤토리

### 8.1 텍스처/이펙트 에셋

| 파일명 | 크기 | 해상도 | 용도 |
|--------|------|--------|------|
| `grain-BCQLvfp_.avif` | 1.59MB | 1024x1024 | 글로벌 그레인 오버레이 (밝은 톤) |
| `grain-black-7FuVSlAl.avif` | 673KB | 1024x1024 | 섹션 그레인 오버레이 (어두운 톤) |
| `purple-glow-DvDMfLz2.avif` | — | 2391x2042 | 히어로 앰비언트 퍼플 글로우 |
| `glow-c1C8row6.avif` | — | 2855x1708 | 섹션 앰비언트 글로우 |
| `grid-CJ97pa2y.svg` | — | 1440x566 | 그리드 오버레이 (데스크톱) |
| `grid-mobile-BGugoc22.svg` | — | — | 그리드 오버레이 (모바일) |
| `cta-l2hyoxz7.avif` | — | — | CTA 섹션 배경 이미지 |

### 8.2 카드 배경 에셋

| 파일명 | 용도 |
|--------|------|
| `bg-card-1-y8Ue9pnN.avif` | 피처 카드 1 배경 |
| `bg-card-2-WmWkaZrD.avif` | 피처 카드 2 배경 |
| `bg-card-3-B9RhtDVH.avif` | 피처 카드 3 배경 |
| `bg-card-4-CXwYCato.avif` | 피처 카드 4 배경 / 모바일 메뉴 배경 |
| `card-5-Dr5q2eUm.avif` | 카드 5 전경 이미지 |

### 8.3 기술 스택

| 항목 | 기술 |
|------|------|
| CSS 프레임워크 | **Tailwind CSS v4** (oklch 컬러, `color-mix()` 활용) |
| 빌드 | Vite (에셋 해시 패턴: `name-hash.ext`) |
| 이미지 포맷 | **AVIF** (모든 텍스처/배경에 일관 사용) |
| 렌더링 | CSR (React, `data-discover` 속성으로 라우팅) |
| CSS 파일 | `/assets/app-DQOZBsaZ.css` (약 304KB, 단일 번들) |

---

## 9. 요약 및 재현 가이드

### 9.1 "Ambient Grained Gradient"의 공식

```
어두운 베이스(#141417)
  + 사전 렌더링된 소프트 글로우 이미지 (AVIF, 알파 포함)
  + 섹션별 CSS linear-gradient (퍼플 스펙트럼)
  + 어두운 그레인 텍스처 (128px 타일, 100%)
  + 그리드 SVG (soft-light blend)
  + 밝은 그레인 텍스처 (1024px 타일, 8%, z-최상위)
```

### 9.2 재현을 위한 최소 구현

```html
<!-- 컨테이너 -->
<div style="position: relative; background: #141417; overflow: hidden;">

  <!-- Layer 2: Ambient Glow -->
  <div style="position: absolute;
              top: -200px; left: -400px;
              width: 1400px; height: 1050px;
              background: url(purple-glow.avif) no-repeat contain;
              pointer-events: none; z-index: 0;">
  </div>

  <!-- Layer 3: Section Gradient -->
  <div style="position: relative;
              background: linear-gradient(to top, #9D7DE2, #5213D9, transparent);">

    <!-- Layer 4: Section Grain (dark, dense) -->
    <div style="position: absolute; inset: 0;
                background: url(grain-black.avif) repeat;
                background-size: 128px 128px;
                pointer-events: none; z-index: 0;">
    </div>

    <!-- 콘텐츠 -->
    <div style="position: relative; z-index: 1;">
      <!-- ... -->
    </div>
  </div>

  <!-- Layer 6: Global Grain (light, subtle) -->
  <div style="position: absolute; inset: 0;
              background: url(grain-light.avif) repeat;
              opacity: 0.08;
              pointer-events: none; z-index: 150;">
  </div>
</div>
```

### 9.3 그레인 텍스처 직접 생성하기

자체 그레인 텍스처를 만들려면:

1. **Photoshop/Figma**: 1024x1024 캔버스 → `Filter > Noise > Add Noise` (Gaussian, Monochromatic, 15-25%)
2. **프로그래매틱**: Canvas API로 랜덤 노이즈 생성 후 PNG/AVIF로 export
3. **밝은 버전**: 회색(#808080) 베이스에 노이즈 → 불투명도 8%로 사용
4. **어두운 버전**: 검정(#000000) 베이스에 노이즈 → 128px로 축소 표시하여 사용

### 9.4 이 디자인이 만들어내는 시각적 효과

| 효과 | 구현 요소 | 결과 |
|------|----------|------|
| 볼류메트릭 라이팅 | 글로우 AVIF 이미지 | 공간감 있는 빛 시뮬레이션 |
| 아날로그 물질감 | 그레인 텍스처 오버레이 | 디지털 매끈함을 깨뜨려 촉각적 느낌 |
| 깊이(Depth) | 다크 그레인(100%) + 라이트 그레인(8%) 이중 레이어 | 전경/배경의 시각적 분리 |
| 구조적 리듬 | 그리드 SVG + soft-light blend | 미세한 기하학적 질서 |
| 프리미엄 톤 | 퍼플 모노크로매틱 + 필름 질감 | 럭셔리 테크 브랜드 느낌 |

---

*End of Report*

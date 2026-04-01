# SEO 종합 점검 보고서

> 최초 작성일: 2026-03-30
> 최종 업데이트: 2026-04-02
> 대상: Vibe Design Lab Next.js 프로덕트 전체 페이지

---

## 프로젝트 성격 요약

| 항목 | 내용 |
|------|------|
| **서비스** | 디자이너를 위한 바이브 코딩 교육 플랫폼 (커뮤니티·챌린지 중심) |
| **타겟** | 3~8년차 UX/UI 디자이너(70%), 프론트엔드 개발자(20%), PM(10%) |
| **핵심 전환 경로** | Landing → Course → Course Detail → 수강 신청 CTA |
| **언어** | 한국어 우선 (Phase 1), 브랜드 고유명사만 영문 |
| **활성 페이지** | `/` (Landing), `/course/starter-kit` (Course Detail), `/experiment/claude-code`, `/dictionary`, `/story`, `/experiment` |

---

## 1. 완료된 작업 (2026-04-02)

### 1-1. Root Layout metadata 정비

| 항목 | 이전 | 이후 |
|------|------|------|
| title default | `Vibe Design Lab` | `Vibe Design Lab — 디자이너를 위한 바이브 코딩 교육` |
| title template | `%s \| Vibe Design Lab` | 동일 (유지) |
| description | 한국어 ✓ | 키워드 최적화 한국어 |
| openGraph | siteName만 | siteName + type + locale |
| twitter | 없음 | `summary_large_image` |
| robots | 없음 | `index: true, follow: true` |
| canonical | 없음 | `https://vibedesignlab.net` |
| icons | favicon.svg | favicon.svg + apple-touch-icon.png |
| JSON-LD | 없음 | `Organization` + `WebSite` (@graph) |

### 1-2. 전 페이지 metadata 키워드 최적화

| URL | title | og:title | og:description |
|-----|-------|----------|---------------|
| `/` | Vibe Design Lab — 디자이너를 위한 바이브 코딩 교육 | 동일 | 되는 대로가 아니라 의도대로. 디자인 언어 체계를 배우면 AI 결과물이 달라집니다. |
| `/course/starter-kit` | Vibe Design Starter Kit — 디자인으로 배우는 바이브 코딩 | 동일 | 되는 대로가 아니라 의도대로. 디자인 언어 체계로 바이브 코딩의 결과를 통제하는 4주 코호트. |
| `/dictionary` | Vibe Dictionary — AI가 이해하는 디자인 언어 체계 | layout 상속 | layout 상속 |
| `/story` | 바이브 디자인이란 — Vibe Design Lab의 철학 | layout 상속 | layout 상속 |
| `/experiment` | Brand Experiment — 같은 의도, 다른 언어 | layout 상속 | layout 상속 |
| `/experiment/claude-code` | 클로드 코드 유출 — 512K 줄 속에 숨겨진 협상 프로토콜 | layout 상속 | layout 상속 |

### 1-3. Course Detail — generateMetadata 전환

- 정적 `export const metadata` → `generateMetadata({ params })` 동적 전환
- `generateStaticParams()`로 SSG 유지
- slug별 COURSE_META 매핑 (`starter-kit`)
- Course JSON-LD 구조화 데이터 삽입 (provider, audience, duration, price, courseMode)

### 1-4. robots.js

- 기본 전체 허용 (`*`)
- AI 크롤러 명시 허용: `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`
- sitemap 선언: `https://vibedesignlab.net/sitemap.xml`

### 1-5. sitemap.js

정적 5페이지 + 동적 코스 페이지. COURSES 데이터에서 slug 자동 생성.

| URL | changeFrequency | priority |
|-----|-----------------|----------|
| `/` | weekly | 1.0 |
| `/course/starter-kit` | weekly | 0.9 |
| `/dictionary` | monthly | 0.8 |
| `/story` | monthly | 0.7 |
| `/experiment` | monthly | 0.6 |
| `/experiment/claude-code` | monthly | 0.5 |

### 1-6. Canonical URL

전 페이지에 canonical 설정 완료. trailing slash 없이 통일.

### 1-7. apple-touch-icon

favicon.svg 기반 180×180 PNG 생성 → `public/apple-touch-icon.png`. layout.jsx에 등록.

### 1-8. OG 이미지 현황

| URL | OG 이미지 | 상태 |
|-----|----------|------|
| `/` | `app/opengraph-image.png` | 있음 |
| `/course/starter-kit` | `app/course/[slug]/opengraph-image.png` | 있음 |
| `/experiment/claude-code` | `app/experiment/claude-code/opengraph-image.png` | 있음 |
| `/dictionary` | root fallback | — |
| `/story` | root fallback | — |
| `/experiment` | root fallback | — |

### 1-9. 데이터 정합성 수정

- `landingMockData.js` COURSES slug: `vibe-design-starter-kit` → `starter-kit` (실제 URL과 일치)
- `CourseDetailCard.stories.jsx` ctaHref 동일하게 수정

---

## 2. 남은 작업

### Phase 3 (미래 — 콘텐츠/인프라 확장 시)

| 항목 | 설명 | 선행 조건 |
|------|------|----------|
| 블로그/리소스 페이지 | 키워드 클러스터별 콘텐츠 제작 | 콘텐츠 전략 확정 |
| llms.txt | AI 모델 사이트 이해용 | 콘텐츠 충분 시 |
| Search Console 연동 | 소유권 확인 + sitemap 제출 + 색인 모니터링 | 배포 후 |
| `/story` 앵커 페이지 | "바이브 디자인" 키워드 소유 | 콘텐츠 제작 시 |

---

*전략 명세: `src/docs/seo-specification.md` 참조*

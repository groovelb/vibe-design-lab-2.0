# VDL SEO Specification

> 상위 문서: VDL 브랜딩 전략 v2.1, VDL 버벌 브랜드 아이덴티티 v1.0
> 관련 문서: `src/docs/seo-audit.md` (현재 상태 진단)
> 작성일: 2026-04-01
> 기반 데이터: 키워드 트렌드 리서치 (2026.03), 설문 104명 분석, 경쟁사 SEO 분석

---

## 0. 이 문서의 역할

`seo-audit.md`는 **현재 무엇이 빠져 있는가**(진단)를 다룬다.
이 문서는 **무엇을 어떤 기준으로 채울 것인가**(전략 명세)를 다룬다.

모든 SEO 작업은 이 문서의 명세를 따른다. 명세에 없는 판단이 필요하면 구현 전에 먼저 질문한다.

---

## 1. 키워드 전략

### 1.1 시장 맥락 (2026.04 기준)

- "바이브 코딩" — 2025.02 Karpathy 명명 → Collins 올해의 단어 → 글로벌 $4.7B 시장
- "바이브 디자인" — 2026.03 Google Stitch 발표로 급부상. 한국 테크 미디어(ZDNet, CIO, AI타임스)가 "바이브 디자인 시대" 보도
- 교육 시장: 패스트캠퍼스(3000명+), 인프런(46개 강의), 위니브 부트캠프 등. **전부 "개발자/비개발자 → 앱 만들기" 포지셔닝. 디자이너 특화 = 전무**
- VDL 브랜드명 자체가 "Vibe Design"을 포함 → 키워드 자산

### 1.2 키워드 클러스터

4개 클러스터로 구분한다. A·B가 VDL 고유 영역, C·D가 볼륨 확보 영역.

#### Cluster A: 바이브 디자인 (블루오션 — 최우선 선점)

| 키워드 | 경쟁 | 의도 | 타겟 페이지 |
|--------|------|------|------------|
| 바이브 디자인 | 극소 (뉴스 기사만 존재) | 정보형 | `/story` 또는 신규 `/vibe-design` |
| 바이브 디자인 교육 | 0 | 탐색형 | Landing `/` |
| 바이브 디자인 강의 | 0 | 탐색형 | `/course/[slug]` |
| 바이브 디자인 도구 | 소 | 정보형 | 블로그(미래) |
| AI 디자인 언어 | 극소 | 정보형 | `/dictionary` |

**선점 전략:** "바이브 디자인"의 정의를 VDL이 소유한다. Google Stitch가 "도구"로서 바이브 디자인을 말하고 있으므로, VDL은 "방법론/언어 체계"로서 바이브 디자인을 정의해 차별화한다. 이것은 브랜딩 전략 1.1("바이브 디자인은 바이브 코딩 위에서 디자인 의도를 구사하는 방법론")과 일치한다.

#### Cluster B: 디자이너 × 코딩 (VDL 고유 angle)

| 키워드 | 경쟁 | 의도 | 타겟 페이지 |
|--------|------|------|------------|
| 디자이너 바이브 코딩 | 극소 | 정보형 | Landing `/` |
| 디자이너 코딩 교육 | 소 | 탐색형 | `/course/[slug]` |
| 디자인 엔지니어 | 소 (한국 채용시장 emerging) | 정보형 | `/story` 또는 블로그 |
| 디자인 엔지니어 되는 법 | 극소 | 정보형 | 블로그(미래) |
| Figma to Code | 중 | 정보형 | 블로그(미래) |
| 프로덕트 엔지니어 디자이너 | 극소 | 정보형 | 블로그(미래) |

**선점 전략:** 경쟁사가 "비개발자도 코딩" 각도로 접근하는 동안, VDL은 "디자이너의 디자인이 더 정확해진다" 각도를 소유. 버벌 아이덴티티의 포지셔닝 대비 문구("코드를 몰라도 만들 수 있다" ≠ VDL, "코드를 배우면 디자인을 더 정확하게 말할 수 있다" = VDL)와 일치.

#### Cluster C: 디자인 시스템 × AI (수요 확인됨)

| 키워드 | 경쟁 | 의도 | 타겟 페이지 |
|--------|------|------|------------|
| 바이브 코딩 디자인 시스템 | 0 | 정보형 | `/dictionary` |
| AI 디자인 토큰 | 극소 | 정보형 | 블로그(미래) |
| 코드 기반 디자인 시스템 | 소 | 정보형 | 블로그(미래) |
| 디자인 시스템 교육 | 중 | 탐색형 | `/course/[slug]` |

**근거:** 설문 1+2순위 합산 67%가 "디자인 시스템 관리 및 코드 기반 디자인 옵스 능력" 선택. VDL Dictionary가 이 수요의 답이지만, 현재 버벌 브랜딩에서 "디자인 시스템"이라는 유저 언어가 직접 노출되지 않는 갭 존재(verbal_feedback_by_survey.md 2.5절).

#### Cluster D: 볼륨 키워드 (경쟁적 진입)

| 키워드 | 경쟁 | 의도 | 타겟 페이지 |
|--------|------|------|------------|
| 바이브 코딩 교육 | 높음 | 탐색형 | Landing `/` |
| 바이브 코딩 강의 | 높음 | 탐색형 | `/course/[slug]` |
| 바이브 코딩 입문 | 중 | 정보형 | 블로그(미래) |
| 바이브 코딩 부트캠프 | 중 | 탐색형 | Landing `/` |

**진입 전략:** 이 키워드에서 패캠·인프런과 정면 경쟁하지 않는다. 대신 Cluster A·B의 롱테일 키워드로 유입시키고, 내부 링크를 통해 이 키워드 페이지의 권위를 간접적으로 올린다.

### 1.3 키워드 적용 원칙

1. **한 페이지 = 하나의 주력 키워드 + 2~3개 보조 키워드.** 키워드 카니발라이제이션 금지.
2. **유저 언어 우선.** 숏비전 레이어(verbal_feedback_by_survey.md)의 언어를 메타데이터에 사용. VDL 고유 용어("System Over Drawing" 등)는 본문에서만.
3. **브랜딩 톤 준수.** 블랙리스트 표현(혁신적, 게임체인저, 누구나 할 수 있다 등)은 메타데이터에서도 금지.
4. **"Labs" 표기 통일.** 모든 메타데이터에서 "Vibe Design Lab" (s 포함). "Lab" 단수 금지.

---

## 2. 페이지별 메타데이터 명세

### 2.1 전체 공통 (Root Layout)

```js
// app/layout.jsx
export const metadata = {
  metadataBase: new URL('https://vibedesignlab.net'),
  title: {
    template: '%s | Vibe Design Lab',
    default: 'Vibe Design Lab — 디자이너를 위한 바이브 코딩 교육',
  },
  description: '바이브 코딩, 내맘대로 되고 있나요? 디자인 사고로 제품을 설계하는 바이브 코딩 교육. 디자인 언어 체계와 커뮤니티 학습으로 시작하세요.',
  openGraph: {
    type: 'website',
    siteName: 'Vibe Design Lab',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://vibedesignlab.net',
  },
}
```

### 2.2 Landing (`/`)

| 항목 | 값 |
|------|-----|
| 주력 키워드 | 바이브 코딩 교육 |
| 보조 키워드 | 디자이너 바이브 코딩, 바이브 디자인 교육 |
| title | `Vibe Design Lab — 디자이너를 위한 바이브 코딩 교육` |
| description | `바이브 코딩, 내맘대로 되고 있나요? 디자인 사고로 제품을 설계하는 바이브 코딩 교육. 디자인 언어 체계와 커뮤니티 학습으로 시작하세요.` |
| OG title | title과 동일 |
| OG description | `되는 대로가 아니라 의도대로. 디자인 언어 체계를 배우면 AI 결과물이 달라집니다.` |
| OG image | `/opengraph-image.png` (1200×630, 브랜드 키비주얼) |
| JSON-LD | `Organization` + `WebSite` (SearchAction 포함) |
| canonical | `https://vibedesignlab.net` |

### 2.3 Course Detail (`/course/[slug]`)

동적 메타데이터 필수. `generateMetadata()` 사용.

| 항목 | 값 |
|------|-----|
| 주력 키워드 | 바이브 코딩 강의 |
| 보조 키워드 | 디자인 시스템 교육, 바이브 디자인 강의 |
| title | `{코스명} — 바이브 코딩 강의 | Vibe Design Lab` |
| description | 코스 데이터의 subtitle + target + duration 조합. 동적 생성. |
| OG image | 코스별 커버 이미지 (동적) |
| JSON-LD | `Course` 스키마 (provider, duration, price, audience) |
| canonical | `https://vibedesignlab.net/course/{slug}` |

### 2.4 Dictionary (`/dictionary`)

| 항목 | 값 |
|------|-----|
| 주력 키워드 | 바이브 코딩 디자인 시스템 |
| 보조 키워드 | AI 디자인 언어, 디자인 패턴 분류 |
| title | `Vibe Dictionary — AI가 이해하는 디자인 언어 체계` |
| description | `200+ 디자인 키워드. 디자인 시스템의 기준을 AI가 이해하는 언어로 번역한 체계. 도구가 바뀌어도 이 키워드는 남습니다.` |
| JSON-LD | `DefinedTermSet` 또는 `WebPage` |
| canonical | `https://vibedesignlab.net/dictionary` |

**참고:** description에 "디자인 시스템"을 유저 언어 그대로 노출 (verbal_feedback_by_survey.md 7.1절 제안 반영).

### 2.5 Story (`/story`)

| 항목 | 값 |
|------|-----|
| 주력 키워드 | 바이브 디자인 |
| 보조 키워드 | 디자인 엔지니어, 디자인 언어 체계 |
| title | `바이브 디자인이란 — Vibe Design Lab의 철학` |
| description | `구현은 언어를 따릅니다. 바이브 코딩 환경에서 디자인 의도를 정확히 전달하는 언어 체계, 바이브 디자인을 연구합니다.` |
| JSON-LD | `Organization` (mission, description) |
| canonical | `https://vibedesignlab.net/story` |

**전략적 의도:** 이 페이지가 "바이브 디자인" 키워드의 앵커 페이지. Google Stitch가 도구로서 정의하는 "바이브 디자인"과 다른 각도(방법론/언어 체계)로 VDL이 정의를 소유.

### 2.6 Experiment (`/experiment`)

| 항목 | 값 |
|------|-----|
| 주력 키워드 | 디자이너 바이브 코딩 |
| 보조 키워드 | AI 디자인 프롬프트, Before After |
| title | `Brand Experiment — 같은 의도, 다른 언어` |
| description | `같은 AI, 같은 도구. 다른 건 프롬프트에 담긴 디자인 기준뿐입니다. Before/After로 차이를 확인하세요.` |
| canonical | `https://vibedesignlab.net/experiment` |

---

## 3. 기술 SEO 명세

### 3.1 sitemap.js

```js
// app/sitemap.js
// 정적 페이지 + 동적 코스 페이지를 모두 포함
// changeFrequency, priority는 실제 업데이트 빈도에 맞춰 설정
```

**포함할 URL:**

| URL | changeFrequency | priority |
|-----|-----------------|----------|
| `/` | weekly | 1.0 |
| `/course/{slug}` (동적) | weekly | 0.9 |
| `/dictionary` | monthly | 0.8 |
| `/story` | monthly | 0.7 |
| `/experiment` | monthly | 0.6 |
| `/experiment/{slug}` (동적) | monthly | 0.5 |

### 3.2 robots.js

```js
// app/robots.js
// 기본 허용 + AI 크롤러 명시 허용
```

**규칙:**

| User-Agent | 허용 | 차단 | 근거 |
|------------|------|------|------|
| `*` | `/` | — | 전체 허용 |
| `GPTBot` | `/` | — | ChatGPT 검색 노출 |
| `ClaudeBot` | `/` | — | Claude 검색 노출 |
| `PerplexityBot` | `/` | — | Perplexity 노출 |
| `Google-Extended` | `/` | — | Google AI Overview 노출 |

**Sitemap 선언:** `Sitemap: https://vibedesignlab.net/sitemap.xml`

### 3.3 JSON-LD 구조화 데이터

**Organization (Root Layout 또는 Landing):**

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Vibe Design Lab",
  "url": "https://vibedesignlab.net",
  "description": "AI가 이해하는 디자인 언어를 연구하는 브랜드",
  "foundingDate": "2025",
  "slogan": "Design at the Speed of Thought"
}
```

**Course (Course Detail):**

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "{코스명}",
  "description": "{코스 설명}",
  "provider": {
    "@type": "Organization",
    "name": "Vibe Design Lab",
    "url": "https://vibedesignlab.net"
  },
  "educationalLevel": "Intermediate",
  "audience": {
    "@type": "EducationalAudience",
    "educationalRole": "Professional",
    "audienceType": "디자이너, 프론트엔드 개발자, PM"
  },
  "inLanguage": "ko",
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "Online",
    "duration": "P4W"
  },
  "offers": {
    "@type": "Offer",
    "price": "{가격}",
    "priceCurrency": "KRW",
    "availability": "https://schema.org/InStock"
  }
}
```

**WebSite (Root Layout):**

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Vibe Design Lab",
  "url": "https://vibedesignlab.net",
  "inLanguage": "ko"
}
```

### 3.4 OG 이미지 규격

| 용도 | 크기 | 포맷 | 비고 |
|------|------|------|------|
| 브랜드 공통 (fallback) | 1200×630 | PNG | Root에 배치 |
| 코스별 | 1200×630 | PNG | 코스 데이터 기반 동적 또는 정적 |
| Experiment | 1200×630 | PNG | Before/After 시각 포함 |

### 3.5 Canonical URL

모든 페이지에 canonical을 명시한다. trailing slash 없이 통일.

```
✓ https://vibedesignlab.net/course/starter-kit
✗ https://vibedesignlab.net/course/starter-kit/
```

### 3.6 내부 링크 전략

```
Landing (/) ─── 주요 유입 ───→ Course Detail (/course/[slug])
    │                              ↑
    ├── Dictionary (/dictionary) ──┘ (CTA: "이 체계를 실전에서 쓰는 법")
    ├── Story (/story) ────────────┘ (CTA: "실천합니다")
    └── Experiment (/experiment) ──┘ (CTA: "이 차이를 만드는 언어를 배운다")
```

모든 보조 페이지의 하단 CTA는 Course Detail로 연결. 전환 퍼널을 단일화.

---

## 4. 콘텐츠 SEO 명세

### 4.1 현재 활성 페이지 최적화 (Phase 0-1)

기존 6개 페이지의 메타데이터와 구조화 데이터를 이 문서의 명세대로 정비.

### 4.2 미래 콘텐츠 페이지 로드맵

블로그/리소스 페이지가 생길 경우의 키워드 타겟. 현재는 구현하지 않는다.

| 콘텐츠 주제 | 타겟 키워드 | 클러스터 | 우선순위 |
|------------|-----------|----------|---------|
| "바이브 디자인이란: 도구가 아니라 방법론" | 바이브 디자인, 바이브 디자인 뜻 | A | 높음 |
| "디자이너가 바이브 코딩을 배우면 달라지는 것" | 디자이너 바이브 코딩 | B | 높음 |
| "AI 결과물에서 '디자이너가 만든 티'를 내는 법" | AI 디자인, AI 티 | B | 중간 |
| "디자인 시스템을 AI가 이해하는 언어로 만드는 법" | 바이브 코딩 디자인 시스템 | C | 중간 |
| "디자인 엔지니어라는 직무의 등장" | 디자인 엔지니어 | B | 낮음 |
| "바이브 코딩 교육, 어떻게 고를까" | 바이브 코딩 교육 비교 | D | 낮음 |

### 4.3 콘텐츠 톤 규칙 (SEO 맥락)

메타데이터와 SEO 콘텐츠에서도 버벌 아이덴티티 톤 컨벤션을 따른다.

**준수:**
- 단정적 보이스 ("달라집니다", "필요합니다")
- 구체적 키워드/수치 ("200+ 디자인 키워드", "4주 코호트")
- 숏비전 레이어 언어 (Attract 단계에서는 유저 언어 사용)

**금지:**
- 과장/클리셰 (혁신적, 게임체인저)
- 공포 마케팅 (뒤처지면 도태됩니다)
- 허위 약속 (누구나 할 수 있다)
- "Ship" 등 블랙리스트 용어

---

## 5. AI 검색 최적화 (GEO)

### 5.1 AI 크롤러 접근 허용

robots.js에서 GPTBot, ClaudeBot, PerplexityBot, Google-Extended를 명시 허용 (3.2절).

### 5.2 llms.txt (향후 고려)

AI 모델이 사이트를 이해하기 위한 `/llms.txt` 파일. 현재는 구현하지 않되, 콘텐츠가 충분해지면 추가.

### 5.3 인용 가능한 구조

AI 검색(Google AI Overview, ChatGPT, Perplexity)에서 인용되려면:
- 한 문단 = 하나의 명확한 답변 구조
- 정의형 문장 우선 ("바이브 디자인은 ~이다")
- 리스트/테이블 형식 활용

---

## 6. 경쟁사 모니터링 대상

| 경쟁사 | 키워드 영역 | 모니터링 포인트 |
|--------|-----------|---------------|
| 패스트캠퍼스 | 바이브 코딩 교육/강의 | 코스 수, 가격, 포지셔닝 변화 |
| 인프런 | 바이브 코딩 (마켓플레이스) | 강의 수, 리뷰 수, 가격대 |
| 위니브 | 바이브 코딩 부트캠프 | 커뮤니티 규모, 커리큘럼 |
| PEC | 프로덕트 엔지니어 | 코호트 모집 현황, 포지셔닝 |
| Google Stitch | 바이브 디자인 도구 | "바이브 디자인" 키워드 점유 변화 |

VDL이 직접 경쟁하는 건 같은 업종이 아니라 **"독학으로 어떻게든 해보겠다는 결심"과 "기존 방식대로 일하겠다는 관성"**이다 (브랜딩 전략 5.1절). 위 경쟁사 모니터링은 키워드 포지션 추적 목적이며, 콘텐츠 전략은 VDL 고유 angle(Cluster A·B)에 집중.

---

## 7. 측정 기준

### 7.1 핵심 지표

| 지표 | 측정 방법 | 목표 |
|------|----------|------|
| 오가닉 유입 | Firebase Analytics / Search Console | 월간 추이 |
| 키워드 순위 | Search Console (Cluster A·B 키워드) | "바이브 디자인" top 5 |
| CTR | Search Console | 검색 결과 클릭률 5%+ |
| 전환 | Firebase Analytics (CTA 클릭 이벤트) | 코스 상세 → 수강 신청 |

### 7.2 Search Console 연동

Google Search Console 등록 + 소유권 확인 필요. sitemap 제출 후 색인 상태 모니터링.

---

## 8. 실행 우선순위

### Phase 0: 기술 인프라 (즉시)

seo-audit.md P0~P2 항목 + 이 문서의 기술 명세 반영.

1. Root layout metadata를 2.1절 명세대로 교체
4. Landing metadata를 2.2절 명세대로 적용
5. `app/robots.js`를 3.2절 명세대로 교체 (AI 크롤러 허용)
6. `app/sitemap.js` 생성 (3.1절)
7. Course Detail에 `generateMetadata()` 적용 (2.3절)

### Phase 1: 구조화 데이터 + OG (1주)

8. Organization + WebSite JSON-LD (3.3절)
9. Course JSON-LD (3.3절)
10. 브랜드 공통 OG 이미지 확인/교체
11. 각 페이지 canonical URL 설정

### Phase 2: 키워드 선점 콘텐츠 (2~4주)

12. `/story` 페이지를 "바이브 디자인" 앵커 페이지로 최적화
13. `/dictionary` 메타데이터에 "디자인 시스템" 유저 언어 반영
14. 내부 링크 구조 정비 (3.6절)

### Phase 3: 확장 (콘텐츠 로드맵 시작 시)

15. 블로그/리소스 페이지 구조 설계
16. 4.2절 콘텐츠 로드맵 순서대로 제작
17. llms.txt 추가
18. Search Console 연동 + 키워드 모니터링

---

*문서 버전: v1.0*
*작성일: 2026-04-01*
*기반: 키워드 트렌드 리서치 2026.03, 설문 104명 분석, seo-audit.md*

# SEO 종합 점검 보고서

> 작성일: 2026-03-30
> 대상: Vibe Design Lab Next.js 프로덕트 전체 페이지

---

## 프로젝트 성격 요약

| 항목 | 내용 |
|------|------|
| **서비스** | 디자이너를 위한 바이브 코딩 교육 플랫폼 (커뮤니티·챌린지 중심) |
| **타겟** | 3~8년차 UX/UI 디자이너(70%), 프론트엔드 개발자(20%), PM(10%) |
| **핵심 전환 경로** | Landing → Course → Course Detail → 수강 신청 CTA |
| **언어** | 한국어 우선 (Phase 1), 브랜드 고유명사만 영문 |
| **활성 페이지** | `/` (Landing), `/course/[slug]` (Course Detail) — 이 두 페이지가 전환 퍼널의 핵심 |

---

## 1. CRITICAL — 즉시 수정 필요

### 1-1. description 언어 불일치

Root layout과 홈페이지의 description이 영문(`"Design language system for vibe coding education"`).
타겟 사용자는 한국어 화자이고 한국 검색엔진(네이버/구글 코리아)에서의 노출이 중요.

---

## 2. 페이지별 분석

### Landing (`/`) — 전환 퍼널의 입구

| 항목 | 현재 | 문제 |
|------|------|------|
| **title** | `Vibe Design Lab` | Root layout과 중복. 검색 결과에서 다른 페이지와 구분 불가 |
| **description** | 영문 | 한국어 타겟인데 영문. 네이버/구글KR 검색 스니펫에 의미 전달 안 됨 |
| **OG image** | 없음 | SNS 공유 시 이미지 없이 텍스트만 표시. 카카오톡/슬랙/트위터 미리보기 빈 박스 |
| **OG title/description** | 없음 | SNS에서 title/description도 별도 지정 불가 |
| **Structured Data** | 없음 | `Organization`, `WebSite`, `Course` 스키마 없음. 구글 리치 결과 불가 |
| **Canonical URL** | 없음 | |

**권장 metadata:**

```
title: "Vibe Design Lab — 디자이너를 위한 바이브 코딩 교육"
description: contents.md의 hero headline + subCopy 기반 한국어
OG image: 1200×630 브랜드 키비주얼
```

### Course Detail (`/course/[slug]`) — 전환 결정 페이지

| 항목 | 현재 | 문제 |
|------|------|------|
| **title** | 정적 하드코딩 | 동적 라우트(`[slug]`)인데 모든 코스가 동일한 제목 |
| **description** | 정적 하드코딩 | 코스별 차별화 없음 |
| **generateMetadata** | 미사용 | slug 기반 동적 메타데이터 생성 안 함 |
| **OG image** | 없음 | 코스별 커버 이미지가 `/public/assets/course/`에 있는데 미활용 |
| **Course 스키마** | 없음 | `Course` JSON-LD 없음. 구글 교육 관련 리치 결과 불가 |
**특히 치명적**: 이 페이지가 수강 신청 전환이 일어나는 곳인데, SNS에서 공유될 때 아무런 미리보기 이미지가 없음. 카카오톡으로 링크를 보내면 빈 박스.

### Story / Dictionary / Experiment — 보조 페이지

| 페이지 | title | description | OG | 비고 |
|--------|-------|-------------|-----|------|
| `/story` | Story \| VDL | 한국어 ✓ | 없음 | Coming Soon 상태 |
| `/dictionary` | Dictionary \| VDL | 한국어 ✓ | 없음 | Coming Soon 상태 |
| `/experiment` | Experiment \| VDL | 한국어 ✓ | 없음 | Coming Soon 상태 |

보조 페이지들은 아직 Coming Soon이므로 우선순위는 낮지만, 최소한 브랜드 공통 OG 이미지는 필요.

---

## 3. 누락 항목 전체 목록

| 항목 | 상태 | 영향도 |
|------|------|--------|
| **OG image (전체)** | 없음 | 카카오톡/슬랙/SNS 공유 시 미리보기 없음 |
| **Twitter card** | 없음 | X/트위터 공유 미리보기 없음 |
| **apple-touch-icon** | 없음 | iOS 홈화면 추가 시 아이콘 없음 |
| **robots.txt** | 없음 | 크롤러 가이드 없음 |
| **sitemap.xml** | 없음 | 검색엔진 색인 지연 가능 |
| **Structured Data (JSON-LD)** | 없음 | 리치 결과 불가 |
| **Canonical URL** | 없음 | 중복 URL 문제 가능 |
| **generateMetadata()** | 미사용 | 동적 라우트 코스별 SEO 불가 |
| **한국어 description (홈)** | 영문 | 한국 검색엔진 스니펫 부실 |

---

## 4. 우선순위 제안

현재 활성 페이지(Landing, Course Detail)와 전환 퍼널 기준:

### P0 (즉시)

1. Landing/Course Detail description을 한국어로 변경

### P1 (SNS 공유 품질)

4. 브랜드 공통 OG 이미지 제작 (1200×630)
5. Root layout에 openGraph/twitter metadata 추가
6. Course Detail에 `generateMetadata()` 적용 + 코스별 OG 이미지

### P2 (검색엔진 최적화)

7. robots.txt + sitemap.xml 생성
8. Organization/Course JSON-LD 구조화 데이터
9. apple-touch-icon 추가

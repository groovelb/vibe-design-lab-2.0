# OG Optimized Skill

> OG 이미지 생성·배치 시 SEO, 파일 포맷, 메타데이터를 사전 점검하여 **배포 후 재작업을 방지**하는 체크리스트 기반 워크플로우.

## 활성화 조건

| 의도 | 트리거 예시 |
|------|-----------|
| OG 이미지 생성 | "OG 이미지 만들어", "opengraph 이미지" |
| OG 이미지 배치 | "OG 이미지 설정해", "이 이미지를 OG로" |
| OG 메타 점검 | "OG 제대로 됐어?", "메타 태그 확인" |
| 소셜 공유 준비 | "공유용 이미지", "SNS 미리보기" |

---

## 워크플로우

```
용도 파악 → 이미지 생성(nano-banana) → 포맷 검증 → 배치 → 메타 검증 → 완료 리포트
```

### 1단계: 용도 파악

| # | 확인 | 왜 필요한가 |
|---|------|-----------|
| 1 | **대상 경로** — 어떤 라우트의 OG인가? | 파일 배치 위치 결정 |
| 2 | **플랫폼** — 어디에 공유할 것인가? (Twitter, Facebook, LinkedIn, Slack) | 플랫폼별 크기·비율 요구사항 |
| 3 | **기존 OG 유무** — 이미 설정된 OG가 있는가? | 덮어쓰기 여부, 캐시 무효화 안내 |

### 2단계: 이미지 생성

`nano-banana` 스킬을 호출하여 이미지를 생성한다.
OG 이미지 기본 요구사항을 nano-banana에 전달:

- 권장 크기: 1200×630px (1.91:1)
- 최소 크기: 600×315px
- 최대 파일 크기: 5MB 이하 (권장 1MB 이하)
- 텍스트 안전 영역: 좌우 상하 10% 마진

### 3단계: 포맷 검증 (CRITICAL)

이미지 생성 후 **반드시** 아래 체크리스트를 실행한다.

| # | 체크 항목 | 통과 조건 | 실패 시 조치 |
|---|----------|----------|------------|
| 1 | **파일 포맷** | `.png`, `.jpg`, `.jpeg`, `.gif` 중 하나 | webp → `sips -s format png` 변환 |
| 2 | **파일 크기** | 5MB 이하 (권장 1MB 이하) | png → jpg 변환 또는 품질 조정 |
| 3 | **이미지 크기** | 최소 600×315px, 권장 1200×630px | 재생성 |
| 4 | **비율** | 1.91:1 (±0.05 허용) | 크롭 또는 재생성 |

**변환 명령어:**
```bash
# webp → png
sips -s format png input.webp --out output.png

# 크기 확인
sips -g pixelWidth -g pixelHeight image.png

# 파일 크기 확인
ls -lh image.png
```

### 4단계: 배치

Next.js `opengraph-image` 컨벤션으로 배치한다.

| 항목 | 규칙 |
|------|------|
| **파일명** | `opengraph-image.png` 또는 `opengraph-image.jpg` (정확히 이 이름) |
| **위치** | 대상 라우트의 `app/` 디렉토리 내부 (예: `app/experiment/claude-code/opengraph-image.png`) |
| **Twitter 전용** | 필요 시 `twitter-image.png`도 별도 배치 |

**Next.js 지원 포맷 (CRITICAL):**
- `opengraph-image`: `.jpg`, `.jpeg`, `.png`, `.gif` **만 지원**
- `.webp`, `.svg`, `.avif` → **지원 안 됨. 반드시 변환 필수.**

### 5단계: 메타 검증

배치 후 `page.jsx`의 metadata를 점검한다.

| # | 체크 항목 | 통과 조건 |
|---|----------|----------|
| 1 | `title` 존재 | 빈 문자열 아님 |
| 2 | `title` 길이 | 60자 이내 권장 (검색 결과 잘림 방지) |
| 3 | `description` 존재 | 빈 문자열 아님 |
| 4 | `description` 길이 | 155자 이내 권장 |
| 5 | `description` 키워드 | 핵심 키워드가 앞쪽에 위치 |
| 6 | `opengraph-image` 파일 존재 | 해당 라우트에 파일 확인 |
| 7 | 파일 포맷 | png/jpg/jpeg/gif 중 하나 |

### 6단계: 완료 리포트

모든 검증 통과 후 아래 형식으로 리포트를 출력한다.

```
[OG 배치 완료]

라우트:     /experiment/claude-code
이미지:     app/experiment/claude-code/opengraph-image.png
크기:       1200×630px / 946KB
포맷:       PNG ✅
title:      클로드 코드 유출 — ... (28자) ✅
description: 클로드 코드 유출 512,000줄을... (95자) ✅

캐시 무효화:
- Facebook: https://developers.facebook.com/tools/debug/
- Twitter: https://cards-dev.twitter.com/validator
- LinkedIn: https://www.linkedin.com/post-inspector/
```

---

## 플랫폼별 OG 요구사항

| 플랫폼 | 권장 크기 | 비율 | 비고 |
|--------|----------|------|------|
| Facebook | 1200×630 | 1.91:1 | 600×315 미만이면 작은 썸네일로 표시 |
| Twitter | 1200×628 | 1.91:1 | `twitter:card` = `summary_large_image` |
| LinkedIn | 1200×627 | 1.91:1 | 최소 200×200 |
| Slack | 1200×630 | 1.91:1 | URL unfurl 시 자동 적용 |
| KakaoTalk | 800×400 | 2:1 | `og:image` 그대로 사용 |
| Discord | 1200×630 | 1.91:1 | embed 자동 생성 |

---

## 핵심 원칙

- **포맷 변환은 배치 전에 반드시 실행** — webp를 그대로 넣으면 OG가 작동하지 않는다
- **생성과 배치를 분리하지 않는다** — 이미지 생성 후 즉시 포맷 검증 → 변환 → 배치까지 한 번에 완료
- **완료 리포트 필수** — 리포트 없이 "완료"라고 하지 않는다
- **캐시 무효화 안내 필수** — 이전 OG가 있었다면 디버거 URL을 반드시 안내

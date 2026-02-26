# Contents — Vibe Design Labs

> 페이지별 스토리텔링에 따른 메시지 계층, UI 텍스트 상수, 미디어 규격을 정의한다.
> 이 문서의 텍스트 구조가 섹션 분리, 템플릿 구성, 컴포넌트 레이아웃에 직접 영향을 준다.
> 작성일: 2026-02-26

---

## 1. 메시지 톤

project-summary 브랜드 톤 5축 준수. 전 페이지 공통.

| 원칙 | 적용 |
|------|------|
| **단정** | "~할 수 있습니다" 금지. "~입니다", "~한다" |
| **구체** | 추상 형용사 대신 키워드·수치. "혁신적인 교육" → "8주, 챕터별 챌린지, 동료 피드백" |
| **절제** | 느낌표 최소. 감탄사 금지. 문장 하나가 하나만 말한다 |
| **독립** | "XX 추천", "YY 선정" 등 외부 권위 인용 금지. 자체 증거(멤버 증언, 결과물)로 말한다 |
| **본질** | "최신 AI 도구" 대신 "도구가 바뀌어도 남는 것" |

**한글/영문 혼용 규칙:**
- 브랜드 고유명사는 영문 유지: Vibe Design Labs, Vibe Dictionary, Design As Build
- UI 레이블은 한글 우선: "코스 보기", "수강 신청", "자세히 보기"
- 기술 키워드는 영문 유지: token, component, system

---

## 2. 페이지별 메시지 계층

각 섹션의 텍스트 상수. `headline` → `subCopy` → `body` → `cta` 계층.

### 2.1 Landing (/)

**① Hero — Hook**

| 계층 | 텍스트 |
|------|--------|
| headline | 사고와 구현의 주체를 일치시킨다 |
| subCopy | 디자이너를 위한 바이브 코딩. 커뮤니티와 챌린지로 배우는 디자인 언어 체계. |
| cta | ↓ (스크롤 유도, 명시적 CTA 없음) |

**② Problem — Pain**

| 계층 | 텍스트 |
|------|--------|
| headline | 시장은 바뀌는데, 배울 곳이 없다 |
| body (커리어) | |

| 페르소나 | 1문장 |
|---------|-------|
| 캔버스 디자이너 | 채용 시장은 디자인 엔지니어를 찾는데, 나는 Figma 안에서만 영향력이 있다 |
| 샌드위치 PM | AI가 실행을 가져가는데, 보여줄 게 없는 기획자의 자리는 어디인가 |
| 파이프라인 개발자 | 구현은 되는데 왜 어색한지 설명을 못 한다 |

| 계층 | 텍스트 |
|------|--------|
| body (학습) | |

| 문제 | 1문장 |
|------|-------|
| VOD 한계 | 혼자 듣는 VOD는 혼자 막히고 혼자 포기한다 |
| 도구 종속 | 도구 사용법을 배워도 도구가 바뀌면 처음부터다 |
| 학습 단절 | 코스가 끝나면 끝이다. 쌓이는 게 없다 |

**③ How We're Different — Solution**

| 계층 | 텍스트 |
|------|--------|
| headline | VOD가 아니다 |
| subCopy | 코스 하나가 하나의 커뮤니티다 |

| 비교 항목 | 기존 VOD | VDL |
|----------|---------|-----|
| 학습 방식 | 혼자 재생, 혼자 정지 | 챕터마다 동료의 질문과 결과물이 보인다 |
| 질문 | 게시판에 묻힌다 | 챕터 맥락에 바로 연결된다 |
| 완주 | 완주해도 아무도 모른다 | 챌린지 결과가 공유되고 반응이 온다 |
| 이후 | 끝나면 끝 | 졸업 후에도 커뮤니티에 남는다 |
| 교육 대상 | 도구 사용법 | 도구가 바뀌어도 남는 디자인 언어 체계 |

**④ Course Highlight — First CTA**

| 계층 | 텍스트 |
|------|--------|
| headline | 코스 |
| subCopy | (없음 — 코스 카드가 직접 말한다) |
| cta (primary) | 자세히 보기 |
| cta (secondary) | 코스 전체 보기 → |

**⑤ Course Review — Proof**

| 계층 | 텍스트 |
|------|--------|
| headline | 멤버가 말하는 경험 |
| body | (TestimonialCard compact × 2~3, 데이터 연동) |

**⑥ Dictionary Preview — Trust**

| 계층 | 텍스트 |
|------|--------|
| headline | 도구가 바뀌어도 남는 체계 |
| subCopy | Vibe Dictionary — 디자인 패턴의 분류 체계 |
| cta | 사전 탐색하기 → |

**⑦ Community Snapshot — Belonging**

| 계층 | 텍스트 |
|------|--------|
| headline | 지금 커뮤니티에서 일어나는 일 |
| body | (CommunityActivityCard × 3~5, 데이터 연동) |

**⑧ Footer CTA — Final CTA**

| 계층 | 텍스트 |
|------|--------|
| headline | 시작합니다 |
| cta | 코스 보기 |

---

### 2.2 Course (/course)

**① Hero**

| 계층 | 텍스트 |
|------|--------|
| headline | 코스 |
| subCopy | 혼자 듣는 강의가 아니라 함께 만드는 학습 |

**② 학습 방식 소개**

| 계층 | 텍스트 |
|------|--------|
| headline | 어떻게 배우는가 |

(ComparisonBlock — Landing ③과 동일한 비교 데이터 재사용)

**③ 코스 카드 리스트**

(코스 카드 데이터 연동. 카드 내 텍스트는 §4 데이터 연동 콘텐츠 참조)

---

### 2.3 Course Detail (/course/[slug])

**① 코스 Hero**

| 계층 | 텍스트 |
|------|--------|
| headline | {course.title} |
| subCopy | {course.subtitle} |
| body | 대상: {target_audience} · 기간: {duration} · 가격: {price} |

**② 코스 개요**

| 레이블 | 값 |
|--------|-----|
| 대상 | {course.target_audience} |
| 기대 결과 | {course.description} |
| 기간 | {course.duration} |
| 가격 | {course.price} |
| 코호트 | {cohort_number}기 · {cohort_status} |

**③ 커리큘럼**

| 계층 | 텍스트 |
|------|--------|
| headline | 커리큘럼 |
| body | (아코디언 — Chapter 데이터 연동. 각 챕터: title + description + challenge_description) |

**④ 학습 환경 미리보기**

| 계층 | 텍스트 |
|------|--------|
| headline | 이런 환경에서 배운다 |
| subCopy | 이전 코호트의 실제 학습 장면 |
| body | (CommunityActivityCard, 해당 코스 필터) |

**⑤ 멤버 증언**

| 계층 | 텍스트 |
|------|--------|
| headline | 멤버 이야기 |
| body | (TestimonialCard full × N, 해당 코스 필터) |

**⑥ 수강 신청**

| 계층 | 텍스트 |
|------|--------|
| headline | 수강 신청 |
| body | {cohort_number}기 · {cohort_status} · {price} |
| cta | 수강 신청하기 |

**Floating CTA**

| 계층 | 텍스트 |
|------|--------|
| label | 수강 신청하기 |
| subText | {price} · {cohort_status} |

---

### 2.4 Dictionary (/dictionary)

**① 소개**

| 계층 | 텍스트 |
|------|--------|
| headline | Vibe Dictionary |
| subCopy | 디자인 패턴의 분류 체계. 도구가 바뀌어도 이 키워드는 남는다. |

**② Taxonomy Tree**

(데이터 연동. 인터랙티브 트리)

**③ 하단 Course 유도**

| 계층 | 텍스트 |
|------|--------|
| headline | 이 체계를 실전에서 쓰는 법 |
| cta | 코스 보기 |

---

### 2.5 Experiment (/experiment)

**① 소개**

| 계층 | 텍스트 |
|------|--------|
| headline | Brand Experiment |
| subCopy | 같은 의도, 다른 언어. 결과의 차이를 본다. |

**② 예제 갤러리**

(데이터 연동. 카드 리스트)

**③ 하단 Course 유도**

| 계층 | 텍스트 |
|------|--------|
| headline | 이 차이를 만드는 언어를 배운다 |
| cta | 코스 보기 |

**Experiment Detail (/experiment/[slug])**

| 섹션 | headline | body |
|------|---------|------|
| 실험 개요 | {experiment.title} | {experiment.description} |
| Before | Before | 프롬프트: {before_prompt} |
| After | After | 프롬프트: {after_prompt} |
| 해설 | 무엇이 달랐는가 | {experiment.explanation} |

---

### 2.6 Brand Story (/story)

**① Mission**

| 계층 | 텍스트 |
|------|--------|
| headline | 사고와 구현의 주체를 일치시킨다 |

**② Philosophy**

| 계층 | 텍스트 |
|------|--------|
| headline | 세 가지 신념 |

| 신념 | 해설 |
|------|------|
| 구현은 언어를 따른다 | 정밀한 언어가 정밀한 결과를 만든다. 감으로 만드는 것과 체계로 만드는 것은 다르다. |
| 언어는 경험을 함축한다 | 키워드 하나에 수백 번의 시행착오가 압축되어 있다. 체계는 경험의 결정체다. |
| 감각도 쪼개면 로직이다 | 디자인 감각은 타고나는 것이 아니라, 분해하고 학습할 수 있는 구조다. |

**③ Value Proposition**

| 단계 | 이름 | 해설 |
|------|------|------|
| 1 | System Over Drawing | 그리는 것이 아니라 설계한다 |
| 2 | The Vibe Standard | 감각을 언어로 번역한 체계 |
| 3 | Design As Build | 설계한 것을 직접 구현한다 |

**④ 하단 Course 유도**

| 계층 | 텍스트 |
|------|--------|
| headline | 실천합니다 |
| cta | 코스 보기 |

---

### 2.7 Chapter Learning (/course/[slug]/[chapterSlug])

수강생 전용. 메시지 톤은 동일하되, 학습 맥락에서 더 간결하게.

| 영역 | 텍스트 |
|------|--------|
| 챕터 제목 | {chapter.title} |
| 챌린지 제목 | {chapter.challenge_title} |
| 챌린지 설명 | {chapter.challenge_description} |
| 제출 버튼 | 결과물 제출하기 |
| 댓글 입력 placeholder | 댓글을 입력하세요 |
| 시점 첨부 토글 | 현재 시점 첨부 |
| 피드백 입력 placeholder | 피드백을 남겨주세요 |
| 진도 완료 | 이 챕터를 완료했습니다 |

---

## 3. 공통 UI 텍스트 상수

### 3.1 GNB

| 요소 | 텍스트 |
|------|--------|
| 로고 | Vibe Design Labs (또는 VDL 로고마크) |
| 메뉴 1 | Course |
| 메뉴 2 | Dictionary |
| 메뉴 3 | Experiment |
| 메뉴 4 | Story |
| CTA 버튼 | 코스 보기 |
| 모바일 메뉴 열기 | (아이콘만, 텍스트 없음) |

### 3.2 Footer

| 요소 | 텍스트 |
|------|--------|
| 로고 + 태그라인 | Vibe Design Labs · 사고와 구현의 주체를 일치시킨다 |
| 메뉴 | Course · Dictionary · Experiment · Story |
| 커뮤니티 링크 | Discord |
| 저작권 | © 2026 Vibe Design Labs |

### 3.3 CTA 패턴

| 맥락 | 텍스트 |
|------|--------|
| GNB 공통 | 코스 보기 |
| Landing Course Highlight → Detail 숏컷 | 자세히 보기 |
| Landing Course Highlight → Course 목록 | 코스 전체 보기 → |
| Landing Dictionary Preview | 사전 탐색하기 → |
| Course Detail 수강 신청 | 수강 신청하기 |
| Course Detail Floating CTA | 수강 신청하기 |
| 서브페이지 하단 Course 유도 | 코스 보기 |
| Landing Footer CTA | 코스 보기 |

### 3.4 코호트 배지

| 상태 | 텍스트 |
|------|--------|
| recruiting | 모집중 |
| ongoing | {n}기 진행중 |
| upcoming | {n}기 예정 |

### 3.5 코스 카드 레이블

| 레이블 | 형식 |
|--------|------|
| 대상 | 대상: {target_audience} |
| 기간 | {duration} |
| 가격 | {price} |
| 링크 | 자세히 보기 → |

---

## 4. 상태 메시지 정책

톤: 단정적이되 공격적이지 않게. 원인보다 다음 행동을 안내.

### 4.1 에러

| 상황 | 메시지 |
|------|--------|
| 페이지 없음 (404) | 페이지를 찾지 못했습니다 |
| 서버 오류 (500) | 문제가 발생했습니다. 잠시 후 다시 시도해주세요 |
| 네트워크 오류 | 연결이 불안정합니다. 네트워크를 확인해주세요 |
| 댓글 전송 실패 | 댓글을 전송하지 못했습니다. 다시 시도해주세요 |
| 챌린지 제출 실패 | 제출에 실패했습니다. 다시 시도해주세요 |
| 로그인 실패 | 이메일 또는 비밀번호를 확인해주세요 |
| 수강 권한 없음 | 이 챕터는 수강 신청 후 이용할 수 있습니다 |

### 4.2 빈 상태

| 상황 | 메시지 |
|------|--------|
| 댓글 없음 | 아직 댓글이 없습니다. 첫 댓글을 남겨보세요 |
| 챌린지 제출물 없음 | 아직 제출된 결과물이 없습니다 |
| 피드백 없음 | 아직 피드백이 없습니다 |
| 코스 없음 | 준비중인 코스가 있습니다. 곧 만나요 |

### 4.3 성공

| 상황 | 메시지 |
|------|--------|
| 댓글 전송 | (즉시 반영, 별도 메시지 없음) |
| 챌린지 제출 | 결과물이 제출되었습니다 |
| 피드백 전송 | 피드백이 전송되었습니다 |
| 챕터 완료 | (체크 아이콘으로 표시, 텍스트 최소) |

### 4.4 로딩

| 상황 | 처리 |
|------|------|
| 페이지 데이터 로딩 | Skeleton UI. 텍스트 메시지 없음 |
| 댓글 로딩 | Skeleton UI |
| 영상 버퍼링 | Mux Player 기본 로딩 UI |

---

## 5. 미디어 규격

### 5.1 이미지

| 용도 | 비율 | 최소 해상도 | 포맷 |
|------|------|-----------|------|
| 코스 카드 썸네일 | (텍스트 중심 카드 — 이미지 없음) | — | — |
| 실험 예제 카드 썸네일 | 16:9 | 800×450 | WebP, PNG |
| 멤버 결과물 | 16:9 또는 1:1 | 800×450 또는 800×800 | WebP, PNG |
| 멤버 아바타 | 1:1 | 128×128 | WebP, PNG |
| Before/After 결과물 | 16:9 | 1200×675 | WebP, PNG |

### 5.2 영상

| 항목 | 규격 |
|------|------|
| 호스팅 | Mux (HLS 적응형) |
| 챕터 영상 권장 길이 | 10~20분 |
| 해상도 | 1080p 업로드. Mux가 적응형 변환 |
| 자막 | Phase 2 검토 |

### 5.3 대체 텍스트 정책

| 이미지 유형 | alt 텍스트 |
|------------|-----------|
| 멤버 결과물 | "{member_name}의 {course_title} 결과물" |
| 실험 Before | "{experiment_title} Before 결과" |
| 실험 After | "{experiment_title} After 결과" |
| 멤버 아바타 | "{member_name}" |
| 장식 이미지 (Grid 배경 등) | alt="" (빈 문자열) |

---

## 6. 데이터 연동 콘텐츠 규격

Supabase에서 오는 동적 데이터의 텍스트 규격.

### 6.1 Course

| 필드 | 규격 |
|------|------|
| title | 한글 20자 이내 |
| subtitle | 한글 40자 이내. 한 문장 |
| description | 한글 200자 이내 |
| target_audience | "캔버스 디자이너" / "전체" 등 짧은 태그 |
| duration | "8주" 형식 |
| price | "150~250만원" 형식 (범위 또는 단일) |

### 6.2 Testimonial

| 필드 | 규격 |
|------|------|
| quote | 한글 200자 이내. 경험 중심, 감탄사 금지 |
| quote_short | 한글 60자 이내. Landing compact용 핵심 한 문장 |
| member_name | 실명 또는 닉네임 |
| member_role | "UX 디자이너, 3년차" 형식 |
| member_persona | "캔버스 디자이너" / "파이프라인 개발자" / "샌드위치 PM" |

### 6.3 CommunityActivity

| 필드 | 규격 |
|------|------|
| type | 'question' / 'challenge' / 'feedback' |
| content_preview | 한글 80자 이내. 원문에서 발췌 |
| member_name | 실명 또는 닉네임 |
| timestamp | "2시간 전", "3일 전" 상대 시간 표시 |

### 6.4 Chapter

| 필드 | 규격 |
|------|------|
| title | 한글 30자 이내 |
| description | 한글 100자 이내 |
| challenge_title | 한글 30자 이내 |
| challenge_description | 한글 200자 이내 |

### 6.5 Experiment

| 필드 | 규격 |
|------|------|
| title | 한글 30자 이내 |
| description | 한글 100자 이내 |
| before_prompt / after_prompt | 원문 그대로 표시. 모노스페이스 (IBM Plex Mono) |
| explanation | 한글 300자 이내 |

### 6.6 타임라인 댓글

| 필드 | 규격 |
|------|------|
| content | 한글 500자 이내 |
| video_timestamp 표시 | "2:30" 형식 (분:초). 1시간 이상이면 "1:02:30" |
| timestamp 표시 | 상대 시간 ("방금", "5분 전", "2시간 전", "3일 전") |

---

## 7. 다국어

Phase 1은 한국어 전용. 영문은 아래 고정 문구만:

- 브랜드명: Vibe Design Labs, VDL
- 제품명: Vibe Dictionary, Brand Experiment
- 철학 키워드: System Over Drawing, The Vibe Standard, Design As Build
- GNB 메뉴: Course, Dictionary, Experiment, Story
- 서체 이름, 기술 키워드 (token, component 등)

---

*v1.0 | 기반: ux-flow v1.1, project-summary v2.0, design-system-optimization v1.1, technical v1.0*

# UX Flow — Vibe Design Labs 웹사이트

> project-summary의 "무엇을"을 "어떻게 경험시킬 것인가"로 변환한다.
> 사용자가 서비스 안에서 움직이는 경로와 구조를 설계한다.
> 작성일: 2026-02-26

---

## 1. 정보 구조 (IA)

### 사이트 맵

```
VDL Platform
│
├── Landing (/)
│   ├── Hero — 한 문장 정의 + 태그라인 (Hook)
│   ├── Problem — 커리어 문제 + 학습 환경 문제 (Pain)
│   ├── How We're Different — VOD vs 커뮤니티 학습 (Solution)
│   ├── Course Highlight — 코스 미리보기 + Course Detail CTA (First CTA)
│   ├── Course Review — 수강생 증언·결과물 (Proof)
│   ├── Dictionary Preview — 체계의 물적 증거 (Trust)
│   ├── Community Snapshot — 커뮤니티 활동 스냅샷 (Belonging)
│   └── Footer CTA — Course Detail 또는 Course로 최종 유도 (Final CTA)
│
├── Course (/course)
│   ├── 학습 방식 소개 — "VOD가 아닌 커뮤니티 학습"
│   ├── 코스 카드 리스트 — 현재 2개 코스
│   └── 각 카드 → Course Detail 진입
│
├── Course Detail (/course/[slug])
│   ├── 코스 개요 — 대상, 기대 결과, 기간, 가격
│   ├── 커리큘럼 — 챕터 목록 + 각 챕터 설명
│   ├── 학습 환경 미리보기 — 질문 피드·챌린지·결과물 스냅샷
│   ├── 멤버 증언 — 이전 코호트 결과물 + 증언
│   └── 수강 신청 CTA — 외부 결제 링크
│
├── Vibe Dictionary (/dictionary)
│   ├── Taxonomy Tree — 디자인 패턴 분류 체계 (인터랙티브)
│   └── Wiki Entry (/dictionary/[term]) — 개별 키워드 상세 (Phase 2)
│
├── Brand Experiment (/experiment)
│   ├── 예제 갤러리 — 결과물 카드 리스트
│   └── Experiment Detail (/experiment/[slug]) — Before/After 시연
│
└── Brand Story (/story)
    ├── Mission — 한 문장
    ├── Philosophy — 세 가지 신념
    └── Value Proposition — 세 단계 가치 제안
```

### 콘텐츠 분류 원칙

| 분류 | 기준 | 해당 페이지 |
|------|------|------------|
| **전환 콘텐츠** | 코스 구매 결심에 직접 기여 | **Landing (핵심)**, Course, Course Detail |
| **신뢰 콘텐츠** | "이 체계가 진짜다"를 증명 | Landing (Dictionary Preview), Dictionary, Brand Experiment |
| **정체성 콘텐츠** | VDL이 어떤 곳인지 전달 | Landing (Hero, Problem, How We're Different), Brand Story |
| **소셜 프루프** | 멤버의 결과물·증언으로 신뢰 강화 | Landing (Course Review, Community Snapshot), Course Detail |

> **Landing의 이중 역할:** Landing은 정체성 콘텐츠(브랜드 스토리텔링)이자 전환 콘텐츠(코스 CTA)다.
> 대부분의 방문자가 Landing에서 시작하고, 상당수가 Landing만 보고 떠나거나 전환한다.
> 따라서 Landing 단독으로도 "문제 인식 → 차별점 → 코스 → 증거"의 전환 내러티브가 완결되어야 한다.

### GNB 구조

```
[VDL 로고]  Course  Dictionary  Experiment  Story  [CTA 버튼]
```

- **로고**: / (Landing)으로 이동
- **CTA 버튼**: Course 페이지로 이동 (텍스트: "코스 보기" 또는 context에 따라 변동)
- 현재 페이지는 GNB에서 시각적으로 구분 (active state)
- 모바일: 햄버거 메뉴 → 풀스크린 오버레이

### Footer 구조

```
[VDL 로고 + 태그라인]
Course | Dictionary | Experiment | Story
[Discord 링크] [SNS 링크]
[Copyright]
```

---

## 2. 유저 플로우

### 플로우 A: 핵심 전환 — "코스 발견 → 수강 결심" (Primary)

이 플로우가 사이트의 존재 이유다. Landing에서 시작해 Course Detail의 수강 신청 CTA까지 도달하는 경로.

```
[외부 유입]
  SNS / 검색 / 멤버 공유 / 졸업생 증언
       │
       ▼
  [Landing — 전환 내러티브]
  ① Hero: "이 곳이 뭐 하는 곳인지" 즉시 파악 (Hook)
  ② Problem: "시장은 바뀌는데 나만 그대로" + "배우려 해도 혼자 듣고 혼자 포기" (Pain)
  ③ How We're Different: VOD vs 커뮤니티 학습 차별점 (Solution)
  ④ Course Highlight: 코스 카드 + CTA → 관심 발생 (First CTA)
  ⑤ Course Review: 수강생 증언·결과물 → "실제로 되는구나" (Proof)
  ⑥ Dictionary Preview: 체계의 힌트 → 전문성 인식 (Trust)
  ⑦ Community Snapshot: 커뮤니티 활동 → "나도 저기 끼고 싶다" (Belonging)
  ⑧ Footer CTA: 최종 전환 유도 (Final CTA)
       │
       ├──→ 빠른 전환 (④에서 바로 Course Detail 진입)
       │         │
       │         ▼
       │    [Course Detail] (숏컷 — Course 페이지 건너뜀)
       │
       └──→ 일반 전환 (⑧ 또는 GNB → Course 경유)
                 │
                 ▼
            [Course]
            ① 학습 방식 소개: 차별점 재확인
            ② 코스 카드 탐색: 대상·가격·기간 비교
                 │
                 ▼ (코스 카드 클릭)
            [Course Detail]
            ① 코스 개요: 나에게 맞는 코스인지 확인
            ② 커리큘럼: 무엇을 배우는지 확인
            ③ 학습 환경 미리보기: "이런 환경이면 나도 끝까지 할 수 있겠다"
            ④ 멤버 증언: 이전 멤버의 실제 경험 → 결심 강화
                 │
                 ▼ (수강 신청 CTA 클릭)
            [외부 결제 페이지]
```

**Landing 전환 내러티브 설계 원칙:**

Landing은 그 자체로 완결된 전환 퍼널이다. 방문자가 다른 페이지로 이동하지 않고 Landing만 끝까지 스크롤해도 "문제 인식 → 솔루션 이해 → 코스 확인 → 증거 확인 → 소속감 → 전환"까지 도달할 수 있어야 한다.

```
Landing 내부 전환 내러티브:

Hook (Hero)                    "여기가 뭐 하는 곳인지"
  ↓
Pain (Problem)                 커리어: "시장은 바뀌는데 나만 그대로다"
                               학습: "배우려 해도 혼자 듣고 혼자 포기했다"
  ↓
Solution (How We're Different) "다른 방식이 있구나"
  ↓
Offer (Course Highlight)       "이 코스로 해결하는구나" ← First CTA
  ↓
Proof (Course Review)          "실제로 해본 사람이 이렇게 말하네"
  ↓
Trust (Dictionary Preview)     "체계가 진짜 있네"
  ↓
Belonging (Community Snapshot) "이 사람들이랑 같이 하고 싶다"
  ↓
Final CTA (Footer CTA)        "시작하자" ← Final CTA
```

**전환 촉진 장치:**
- Landing Course Highlight에서 Course Detail로 직접 진입 가능 (Course 페이지를 건너뛰는 숏컷)
- Course Review가 Course Highlight CTA 직후에 위치 — CTA를 본 직후 증거를 만남
- Footer CTA는 Landing을 끝까지 본 사람이 받는 최종 전환 기회
- Course Detail 페이지 내 Floating CTA — 스크롤 위치와 무관하게 항상 접근 가능

### 플로우 B: 신뢰 구축 — "체계가 진짜인가?" (Secondary)

코스 구매를 결심하기 전, VDL의 디자인 언어 체계가 실제로 존재하고 작동하는지 확인하는 경로.

```
  [Landing 또는 GNB]
       │
       ├──→ [Vibe Dictionary]
       │    ① Taxonomy Tree: 분류 체계 탐색
       │    ② "이런 체계가 있었어?" → 전문성 인식
       │    ③ GNB CTA 또는 하단 Course 유도
       │         │
       │         ▼
       │    [Course] → [Course Detail] → 수강 결심 강화
       │
       └──→ [Brand Experiment]
            ① 예제 갤러리: 결과물 탐색
            ② Before/After: "정밀하게 말하면 정밀하게 나온다" 체감
            ③ GNB CTA 또는 하단 Course 유도
                 │
                 ▼
            [Course] → [Course Detail] → 수강 결심 강화
```

**설계 의도:** Dictionary와 Experiment는 독립적으로 가치가 있지만, 모든 경로가 결국 Course로 수렴하도록 유도한다. 강제적 CTA가 아니라, 체계를 확인한 후 "이걸 배우고 싶다"는 자연스러운 욕구를 Course로 연결.

### 플로우 C: 정체성 탐색 — "이 곳은 어떤 곳인가?" (Secondary)

VDL의 철학과 정체성을 깊이 이해하려는 방문자의 경로.

```
  [Landing 또는 GNB]
       │
       ▼
  [Brand Story]
  ① Mission: "사고와 구현의 주체를 일치시킨다"
  ② Philosophy: 세 가지 신념
  ③ Value Proposition: 세 단계 가치 제안
       │
       ▼ (철학에 공감한 경우)
  [Course] → [Course Detail] → 수강 결심
```

### 플로우 D: 순환 — "멤버 → 마케팅 → 신규 유입" (Circular)

서비스 운영 레벨의 순환 플로우. 직접적인 UI 경로라기보다 생태계 구조.

```
[멤버 학습 완료]
     │
     ▼
[결과물 + 증언 축적]
     │
     ├──→ Landing Course Review 섹션에 반영 (전환 직접 기여)
     ├──→ Landing Community Snapshot에 반영 (소속감 유발)
     ├──→ Course Detail 멤버 증언에 반영 (결심 강화)
     └──→ 멤버 자발적 SNS 공유
              │
              ▼
         [신규 방문자 유입] → 플로우 A 진입
```

---

## 3. 화면 목록

### 3-1. Landing (/)

| 항목 | 내용 |
|------|------|
| **목적** | 브랜드 스토리텔링 + **코스 전환 퍼널** (Landing 단독으로 전환 내러티브 완결) |
| **핵심 가치 연결** | 4가지 핵심 가치 모두를 Landing 스크롤 흐름에서 순차적으로 경험 |
| **진입** | 외부 유입 (SNS, 검색, 멤버 공유, 직접 URL) |
| **이탈** | Course Detail (숏컷), Course, Dictionary, Experiment, Story, 외부 |

**설계 원칙:** 대부분의 방문자가 Landing에서 시작하고, 상당수가 Landing만 보고 판단한다. 따라서 Landing은 "섹션 허브"가 아니라 **그 자체로 완결된 전환 페이지**여야 한다. 섹션 순서는 전환 내러티브(Hook → Pain → Solution → CTA → Proof → Trust → Belonging → Final CTA)를 따른다.

**섹션 구성 (스크롤 순서):**

| 순서 | 섹션 | 전환 역할 | 역할 | 핵심 요소 |
|------|------|----------|------|----------|
| 1 | **Hero** | Hook | 한 문장 정의 + 태그라인으로 정체성 즉시 전달. "이 곳이 뭐 하는 곳인지"를 3초 안에 파악 | 타이포그래피 중심, 최소 시각 요소. 스크롤 유도 |
| 2 | **Problem** | Pain | 두 차원의 문제를 순서대로 제시. **커리어 문제**(왜 배워야 하는가) → **학습 환경 문제**(왜 기존 교육으론 안 되는가). 방문자가 "맞아, 나도 그래"라고 두 번 고개 끄덕이는 구간 | **커리어**: "시장은 바뀌는데 나만 그대로다" — 디자인 엔지니어 JD, AI 대체 불안, 구현 없는 기획의 한계 등 페르소나별 핵심 긴장 1문장씩. **학습**: "배우려 해도 기존 교육이 안 된다" — 혼자 듣는 VOD, 도구만 배우는 교육, 끝나면 끝인 강의. 각 1문장. 총 분량은 짧게 유지 |
| 3 | **How We're Different** | Solution | "VOD가 아닌 커뮤니티 학습"이라는 핵심 차별점. Problem의 답 | 기존 VOD vs VDL 비교 구조. 시각적 대비 |
| 4 | **Course Highlight** | First CTA | 코스 카드 미리보기 + Course Detail 직접 진입 CTA | 코스 카드 1~2개. CTA는 Course Detail로 직접 연결 (숏컷). "코스 전체 보기" 링크로 Course 페이지도 제공 |
| 5 | **Course Review** | Proof | CTA 직후 배치. 수강생의 실제 학습 경험 증언 + 결과물. "실제로 되는구나" | 증언 인용 2~3개 + 결과물 이미지/URL. 페르소나 다양성 반영 (디자이너, 개발자 등) |
| 6 | **Dictionary Preview** | Trust | Taxonomy 일부 노출 → "이런 체계가 진짜 있다". 전문성 증거 | 트리 구조 일부 + Dictionary CTA. 깊이 있게 보고 싶은 사람을 Dictionary로 유도 |
| 7 | **Community Snapshot** | Belonging | 커뮤니티 활동의 실제 모습 → "나도 저기 끼고 싶다". 소속 욕구 자극 | Discord/커뮤니티 활동 스냅샷 — 질문·답변, 챌린지 결과물 공유, 멤버 간 반응의 실제 캡처 또는 요약 |
| 8 | **Footer CTA** | Final CTA | Landing을 끝까지 본 사람이 받는 최종 전환 기회 | 단일 CTA. Course Detail(대표 코스) 또는 Course 페이지로. 메시지: 행동 유도형 |

**Problem 섹션 상세 — 두 차원의 문제:**

커리어 문제가 학습 동기를 만들고, 학습 환경 문제가 그 동기를 좌절시킨다. VDL은 둘 다 해결한다는 것을 Landing에서 즉시 보여줘야 한다.

| 차원 | 메시지 방향 | 구체 예시 (1문장씩, 최종 카피는 contents에서 확정) |
|------|-----------|----------------------------------------------|
| **커리어 — 왜 배워야 하는가** | 시장이 요구하는 것과 내가 할 수 있는 것의 갭 | "채용 시장은 디자인 엔지니어를 찾는데, 나는 Figma만 할 줄 안다" / "AI가 실행을 가져가는데, 기획만 하는 PM의 자리는?" / "구현은 되는데 왜 어색한지 설명을 못 한다" |
| **학습 — 왜 기존 교육이 안 되는가** | 배우려 시도했지만 구조적으로 실패 | "혼자 듣는 VOD는 혼자 막히고 혼자 포기한다" / "도구 사용법을 배워도 도구가 바뀌면 처음부터" / "코스가 끝나면 끝. 쌓이는 게 없다" |

> **설계 의도:** 커리어 문제를 먼저 제시해서 "나도 해당된다"를 느끼게 한 뒤, 학습 환경 문제로 "그래서 시도했는데 안 됐다"까지 이어지면, 바로 다음 섹션(How We're Different)이 솔루션으로 정확히 착지한다. 두 문제가 동시에 해결된다는 것이 VDL의 핵심 소구이므로, Problem에서 두 차원을 함께 짚는 것이 전환에 결정적이다.

**Course Review vs Course Detail 멤버 증언 — 역할 구분:**

| | Landing Course Review | Course Detail 멤버 증언 |
|--|----------------------|----------------------|
| **목적** | 전환 결심 촉발 — "이 교육이 진짜 되는구나" | 결심 강화 — "이 코스가 나에게 맞겠다" |
| **분량** | 짧은 핵심 증언 2~3개 | 상세 증언 + 결과물 + Before/After |
| **초점** | 학습 경험 전체 ("함께 해서 끝까지 갔다", "코딩 처음인데 배포까지 했다") | 특정 코스의 구체적 성과 ("모듈 2에서 토큰 매핑을 배우고...") |
| **페르소나** | 여러 페르소나 섞어서 공감 폭 넓히기 | 해당 코스 타겟 페르소나 중심 |

### 3-2. Course (/course)

| 항목 | 내용 |
|------|------|
| **목적** | 코스 목록 탐색 + Course Detail 진입 |
| **핵심 가치 연결** | "혼자 듣는 강의가 아니라 함께 만드는 학습" — 학습 방식 차별점을 이 페이지에서 전달 |
| **진입** | Landing CTA, GNB |
| **이탈** | Course Detail, Landing (뒤로가기), 다른 GNB 메뉴 |

**섹션 구성:**

| 순서 | 섹션 | 역할 | 핵심 요소 |
|------|------|------|----------|
| 1 | **학습 방식 소개** | "VOD가 아닌 커뮤니티 학습"이라는 차별점 명시 | 기존 VOD vs VDL 비교 구조. 짧고 단정적 |
| 2 | **코스 카드 리스트** | 각 코스의 핵심 정보를 한눈에 | 코스명, 대상, 기간, 가격, 코호트 상태 (모집중/진행중/예정) |

**코스 카드 정보 구조:**

```
┌─────────────────────────────────────┐
│ [코스명]                             │
│ [한 줄 설명]                         │
│                                     │
│ 대상: [캔버스 디자이너 / 전체 등]      │
│ 기간: [8주]   가격: [150~250만원]     │
│ 코호트 상태: [모집중 / 2기 진행중]     │
│                                     │
│ [자세히 보기 →]                       │
└─────────────────────────────────────┘
```

### 3-3. Course Detail (/course/[slug])

| 항목 | 내용 |
|------|------|
| **목적** | 개별 코스 상세 + 커뮤니티 학습 경험 미리보기 + 수강 결심 |
| **핵심 가치 연결** | 4가지 핵심 가치 모두가 이 화면에서 집약 — 전환의 결정적 화면 |
| **진입** | Course 코스 카드, Landing Course Highlight |
| **이탈** | 외부 결제 링크 (수강 신청), Course (뒤로가기), 다른 GNB 메뉴 |

**섹션 구성:**

| 순서 | 섹션 | 역할 | 핵심 요소 |
|------|------|------|----------|
| 1 | **코스 Hero** | 코스명 + 핵심 메시지 + 대상 | "8주 후, 당신의 포트폴리오에 배포된 URL이 추가됩니다" |
| 2 | **코스 개요** | 대상, 기대 결과, 기간, 가격, 구성 요약 | 정보 밀도 높게. 스캔 가능한 구조 |
| 3 | **커리큘럼** | 챕터 목록 + 각 챕터별 학습 내용·챌린지 설명 | 아코디언 또는 리스트. 챕터별 펼침 |
| 4 | **학습 환경 미리보기** | 질문 피드·챌린지 결과물·피어 피드백의 실제 스냅샷 | 이전 코호트의 실제 데이터 기반. "이런 환경에서 배운다" |
| 5 | **멤버 증언** | 이전 코호트 멤버의 결과물 + 증언 | 결과물 이미지/URL + 증언 인용. 페르소나별 1건 이상 |
| 6 | **수강 신청** | CTA + 가격 + 다음 코호트 일정 | Floating CTA와 별도로, 페이지 하단에 최종 CTA 영역 |

**Floating CTA:**
- 스크롤 시 화면 하단에 고정
- 코스명 + 가격 + "수강 신청" 버튼
- 코스 Hero 영역이 뷰포트에 있을 때는 숨김 (중복 방지)

### 3-4. Vibe Dictionary (/dictionary)

| 항목 | 내용 |
|------|------|
| **목적** | VDL 연구 자산의 체험 — "이 체계가 진짜다"의 물적 증거 |
| **핵심 가치 연결** | "도구가 바뀌어도 남는 것을 배운다" — Dictionary가 그 체계의 산출물 |
| **진입** | Landing Dictionary Preview, GNB |
| **이탈** | Course (하단 CTA), 다른 GNB 메뉴 |

**섹션 구성:**

| 순서 | 섹션 | 역할 | 핵심 요소 |
|------|------|------|----------|
| 1 | **소개** | Dictionary의 목적과 사용법 간략 설명 | 1~2문장. "디자인 패턴의 분류 체계" |
| 2 | **Taxonomy Tree** | 디자인 패턴 분류 체계를 인터랙티브 트리로 탐색 | 카테고리 → 하위 패턴 → 키워드 구조. 클릭으로 펼침/접기 |
| 3 | **하단 Course 유도** | 체계를 확인한 후 자연스러운 학습 유도 | "이 체계를 실전에서 쓰는 법" → Course CTA |

**Phase 2 — Wiki Entry (/dictionary/[term]):**
- 개별 키워드 상세 페이지 (추가 예정)
- 키워드 정의, 시각 예시, 관련 패턴, 프롬프트 예시

### 3-5. Brand Experiment (/experiment)

| 항목 | 내용 |
|------|------|
| **목적** | VDL 연구 결과물 시연 — "정밀하게 말하면 정밀하게 나온다"의 실물 증거 |
| **핵심 가치 연결** | "감이 아니라 설계를 직접 체감" — Before/After가 체계의 효과를 보여줌 |
| **진입** | Landing, GNB |
| **이탈** | Experiment Detail, Course (하단 CTA), 다른 GNB 메뉴 |

**섹션 구성:**

| 순서 | 섹션 | 역할 | 핵심 요소 |
|------|------|------|----------|
| 1 | **소개** | Brand Experiment의 목적 | "같은 의도, 다른 언어. 결과의 차이를 봅니다" |
| 2 | **예제 갤러리** | 예제 카드 리스트 | 썸네일 + 제목 + 한 줄 설명 |
| 3 | **하단 Course 유도** | 체계를 확인한 후 학습 유도 | "이 차이를 만드는 언어를 배웁니다" → Course CTA |

**Experiment Detail (/experiment/[slug]):**

| 순서 | 섹션 | 역할 |
|------|------|------|
| 1 | 실험 개요 | 무엇을 만들었고 왜 이 비교인지 |
| 2 | Before | 일반적 프롬프트 → 결과물 |
| 3 | After | VDL 디자인 언어 프롬프트 → 결과물 |
| 4 | 해설 | 어떤 키워드가 어떤 차이를 만들었는지 |

### 3-6. Brand Story (/story)

| 항목 | 내용 |
|------|------|
| **목적** | VDL의 정체성과 철학을 깊이 있게 전달 |
| **핵심 가치 연결** | 브랜드 전체 — 왜 이 서비스가 존재하는지의 근원 |
| **진입** | Landing, GNB |
| **이탈** | Course (하단 CTA), 다른 GNB 메뉴 |

**섹션 구성:**

| 순서 | 섹션 | 역할 | 핵심 요소 |
|------|------|------|----------|
| 1 | **Mission** | 한 문장 — "사고와 구현의 주체를 일치시킨다" | 대형 타이포그래피. 단독 섹션 |
| 2 | **Philosophy** | 세 가지 신념 | 각 신념을 독립 블록으로. 짧은 해설 |
| 3 | **Value Proposition** | System Over Drawing → The Vibe Standard → Design As Build | 세 단계의 진행을 시각적으로 표현 |
| 4 | **하단 Course 유도** | 철학에 공감한 후 학습으로 연결 | "실천합니다" → Course CTA |

---

## 4. 인터랙션 원칙

이 서비스에서 일관되게 적용할 UX 규칙. VDL 브랜드 퍼스널리티(주도/정밀/절제/독립/본질)에서 파생.

### 4-1. 내비게이션

| 원칙 | 규칙 |
|------|------|
| **명확한 위치 인식** | GNB에서 현재 페이지 active state 항상 표시. 사용자가 "나 지금 어디 있지?"를 묻지 않게 |
| **숏컷 허용** | Landing → Course Detail 직접 이동 가능 (Course 페이지를 건너뛰는 숏컷). 강제 순서 없음 |
| **뒤로 가기 자연스러움** | 브라우저 뒤로 가기가 항상 예상대로 작동. SPA 라우팅에서도 히스토리 스택 정상 유지 |
| **GNB CTA 일관성** | GNB의 CTA 버튼은 어느 페이지에서든 Course 페이지로 이동 |

### 4-2. 스크롤 & 레이아웃

| 원칙 | 규칙 |
|------|------|
| **수직 스크롤 기본** | 모든 페이지는 수직 스크롤 기반. 수평 스크롤, 페이지네이션은 사용하지 않음 |
| **섹션 리듬** | 각 섹션 사이에 충분한 여백. 콘텐츠 밀도보다 호흡이 우선 |
| **스캔 가능한 구조** | 긴 텍스트 블록 지양. 제목 → 핵심 메시지 → 상세의 계층 구조를 유지 |
| **Responsive** | 데스크탑 우선 설계, 모바일 최적화. 브레이크포인트: 360 / 768 / 1200 / 1440 |

### 4-3. 트랜지션 & 모션

| 원칙 | 규칙 |
|------|------|
| **절제** | 모션은 의미가 있을 때만. 장식적 애니메이션 금지. "움직이니까 예쁘다"는 이유 불충분 |
| **스크롤 기반 진입** | 섹션이 뷰포트에 진입할 때 subtle fade-in + translate. 과하지 않게 |
| **페이지 전환** | 부드러운 fade 전환. 슬라이드, 모핑 등 복잡한 전환 지양 |
| **Hover 피드백** | 클릭 가능한 요소에만 hover 상태. cursor: pointer + subtle 변화 (opacity, underline 등) |
| **prefers-reduced-motion** | 접근성 필수 대응. 모션 비활성화 시 즉시 표시 |

### 4-4. 피드백 & 상태

| 원칙 | 규칙 |
|------|------|
| **로딩** | 콘텐츠 영역에 skeleton UI. 전역 스피너 사용 금지 |
| **빈 상태** | 데이터가 없는 경우 명확한 빈 상태 메시지. "아직 ___이 없습니다" |
| **에러** | 인라인 에러 메시지. 모달 에러 다이얼로그 사용 금지 |
| **외부 링크** | 외부로 나가는 링크는 새 탭 (target="_blank"). 플랫폼 내 이동은 같은 탭 |

### 4-5. 접근성

| 원칙 | 규칙 |
|------|------|
| **키보드 내비게이션** | 모든 인터랙티브 요소에 focus 상태. Tab 순서가 시각적 순서와 일치 |
| **색상 대비** | WCAG AA 기준 충족 (일반 텍스트 4.5:1, 대형 텍스트 3:1) |
| **이미지 대체 텍스트** | 장식 이미지 외 모든 이미지에 alt 텍스트 |
| **시맨틱 마크업** | heading 계층 (h1 → h2 → h3) 순서 유지. landmark role 사용 |

---

## 5. 반복되는 컴포넌트 패턴

design-system-optimization에게 넘기는 정보. ux-flow 전체에서 반복 등장하는 패턴.

### 5-1. 반복 패턴

| 패턴 | 등장 화면 | 설명 |
|------|----------|------|
| **섹션 + 제목 + 설명** | 모든 페이지 | 섹션 단위 레이아웃의 기본 블록 |
| **카드** | Landing, Course, Experiment | 코스 카드, 예제 카드 |
| **CTA 버튼** | 모든 페이지 | Primary CTA (Course Detail 직접 유도), Secondary CTA (상세 보기, Course 전체 보기) |
| **Before/After 비교** | Landing (How We're Different), Experiment Detail | 좌우 또는 상하 비교 레이아웃. VOD vs VDL, 프롬프트 Before/After |
| **아코디언/펼침** | Course Detail (커리큘럼), Dictionary (Taxonomy) | 클릭으로 내용 펼침/접기 |
| **Floating CTA** | Course Detail | 스크롤 시 하단 고정 CTA 바 |
| **증언 블록** | Landing (Course Review), Course Detail (멤버 증언) | 증언 인용 + 결과물 이미지/URL. Landing은 짧은 핵심 증언, Course Detail은 상세 |
| **커뮤니티 스냅샷** | Landing (Community Snapshot) | 커뮤니티 활동의 실제 모습 — 질문, 챌린지, 멤버 반응 등의 캡처/요약 |
| **문제-솔루션 블록** | Landing (Problem → How We're Different) | 문제 제시 후 솔루션으로 이어지는 대비 구조 |
| **하단 Course 유도** | Dictionary, Experiment, Story | 각 페이지 하단의 Course 전환 블록 |
| **인터랙티브 트리** | Landing (Dictionary Preview), Dictionary | 카테고리 → 하위 패턴 → 키워드 구조. Landing은 축약 버전 |

### 5-2. 인터랙션 패턴

| 패턴 | 등장 화면 | 설명 |
|------|----------|------|
| **스크롤 진입 애니메이션** | 모든 페이지 | 섹션 진입 시 fade-in + translate |
| **아코디언 토글** | Course Detail, Dictionary | 클릭으로 콘텐츠 영역 확장/축소 |
| **Hover 카드** | Course, Experiment | 카드에 마우스 올리면 subtle elevation 변화 |
| **Floating 요소 show/hide** | Course Detail | 스크롤 위치에 따른 Floating CTA 표시/숨김 |

---

## 6. 데이터 모델 윤곽

technical에게 넘기는 정보. 각 화면에서 필요한 데이터의 구조적 윤곽.

### 6-1. 엔티티

| 엔티티 | 핵심 필드 | 사용 화면 |
|--------|----------|----------|
| **Course** | id, slug, title, subtitle, description, target_audience, duration, price, cohort_status, cohort_number | Course, Course Detail, Landing |
| **Chapter** | id, course_id, order, title, description, challenge_description | Course Detail |
| **Testimonial** | id, course_id, member_name, member_role, member_persona, quote, quote_short, result_url, result_image | Landing (Course Review), Course Detail |
| **CommunityActivity** | id, type (question/challenge/feedback), content_preview, member_name, timestamp | Landing (Community Snapshot) |
| **DictionaryCategory** | id, name, order, parent_id | Dictionary |
| **DictionaryEntry** | id, category_id, term, description, related_terms | Dictionary (Phase 2: Wiki) |
| **Experiment** | id, slug, title, description, thumbnail | Experiment |
| **ExperimentDetail** | id, experiment_id, before_prompt, before_result, after_prompt, after_result, explanation | Experiment Detail |
| **BrandStory** | mission, philosophies[], value_propositions[] | Brand Story |

### 6-2. 엔티티 관계

```
Course (1) ──→ (N) Chapter
Course (1) ──→ (N) Testimonial
Course (1) ──→ (N) CommunityActivity
DictionaryCategory (1) ──→ (N) DictionaryCategory (self-referencing, 트리 구조)
DictionaryCategory (1) ──→ (N) DictionaryEntry
Experiment (1) ──→ (1) ExperimentDetail
```

### 6-3. 데이터 성격

| 데이터 | 성격 | 관리 방식 |
|--------|------|----------|
| Course, Chapter | 준정적 (연 2회 업데이트) | CMS 또는 마크다운 파일 |
| Testimonial | 축적형 (코호트 종료 시 추가) | CMS 또는 데이터 파일 |
| CommunityActivity | 큐레이션형 (커뮤니티 활동 중 선별) | 데이터 파일. 운영팀이 수동 선별 |
| Dictionary | 연구 산출물 (점진적 확장) | 구조화된 데이터 파일 또는 CMS |
| Experiment | 축적형 (연구 결과 추가 시) | CMS 또는 마크다운 파일 |
| Brand Story | 거의 정적 (브랜드 전략 변경 시만) | 마크다운 파일 |

**Phase 1 전략:** 데이터 변경 빈도가 낮으므로 별도 DB/CMS 없이 정적 데이터 파일(JSON/마크다운)로 시작. 데이터 양이 증가하면 headless CMS 도입 검토.

---

## 7. 외부 연동 윤곽

technical에게 넘기는 정보. 이 서비스가 외부와 연결되는 지점.

| 연동 | 역할 | Phase | 방식 |
|------|------|-------|------|
| **Discord** | 코스 커뮤니티의 실시간 소통 채널 | Phase 1 | Discord 초대 링크로 연결. Phase 2에서 API 연동 검토 |
| **Mux** | 코스 영상 스트리밍 | Phase 1 | HLS 적응형 스트리밍 + signed URL 콘텐츠 보호 |
| **외부 결제** | 코스 수강 신청 | Phase 1 | 외부 결제 페이지 링크. 자체 결제 없음 |
| **Analytics** | 전환 퍼널 추적 | Phase 1 | GA4 또는 동등 도구. 핵심 이벤트: Landing 섹션별 스크롤 도달률, Landing→Course Detail(숏컷), Landing→Course, Course→Detail, Detail→CTA클릭 |
| **SNS 메타 태그** | 공유 시 미리보기 카드 | Phase 1 | Open Graph + Twitter Card 메타 태그 |

### Discord 연동 상세 (Phase 구분)

**Phase 1 — 링크 연동:**
- 플랫폼에서 Discord 초대 링크 제공
- Course Detail에 "Discord 커뮤니티 참여" 링크
- 플랫폼과 Discord는 별도 운영 (데이터 동기화 없음)

**Phase 2 — API 연동 (검토 사항):**
- Discord 채널의 최근 활동을 플랫폼에 스냅샷으로 표시
- 챕터별 질문이 Discord 채널과 양방향 연동
- 멤버 활동 상태(Discord ↔ 플랫폼) 동기화

---

## 8. 화면별 상태 관리 요약

technical에게 넘기는 정보. 각 화면에서 관리해야 하는 주요 상태.

| 화면 | 관리 상태 | 성격 |
|------|----------|------|
| **Landing** | 없음 (정적 렌더링) | 서버 컴포넌트. 상태 불필요 |
| **Course** | 코스 리스트 데이터 | 서버 컴포넌트. 정적 데이터 |
| **Course Detail** | 현재 코스 데이터, 커리큘럼 아코디언 열림/닫힘, Floating CTA 표시 여부 | 서버 데이터 + 클라이언트 UI 상태 |
| **Dictionary** | Taxonomy 트리 펼침/접기 상태, 현재 선택된 카테고리 | 클라이언트 UI 상태 |
| **Experiment** | 예제 리스트 데이터 | 서버 컴포넌트. 정적 데이터 |
| **Experiment Detail** | 현재 실험 데이터 | 서버 컴포넌트. 정적 데이터 |
| **Brand Story** | 없음 (정적 렌더링) | 서버 컴포넌트. 상태 불필요 |

**클라이언트 상태가 필요한 곳:**
- Course Detail: 아코디언 UI, Floating CTA visibility (scroll position 기반)
- Dictionary: 트리 노드 펼침/접기

**서버 상태가 필요한 곳:**
- Phase 1에서는 없음 (정적 데이터 파일 기반)
- Phase 2에서 CMS 도입 시 서버 데이터 페칭 필요

---

## 문서 흐름 확인

### project-summary의 핵심 가치가 화면에서 경험되는 지점

| 핵심 가치 | Landing 경험 지점 | 다른 화면 경험 지점 |
|----------|------------------|-------------------|
| 혼자 듣는 강의가 아니라 함께 만드는 학습 | How We're Different, Community Snapshot | Course (학습 방식 소개), Course Detail (학습 환경 미리보기) |
| 도구가 바뀌어도 남는 것을 배운다 | Dictionary Preview | Dictionary (Taxonomy), Course Detail (커리큘럼) |
| "감이 아니라 설계"를 직접 체감 | 사이트 자체의 정밀함, Problem → Solution 구조 | Brand Experiment (Before/After) |
| 멤버의 성장이 플랫폼의 성장 | Course Review, Community Snapshot | Course Detail (멤버 증언) |

### 다음 단계에 넘겨주는 것

| 받는 문서 | 이 문서에서 넘기는 것 |
|----------|---------------------|
| **design-system-optimization** | 반복 컴포넌트 패턴 (섹션 5), 인터랙션 패턴 (섹션 5), 인터랙션 원칙 (섹션 4) |
| **technical** | 데이터 모델 (섹션 6), 외부 연동 (섹션 7), 상태 관리 (섹션 8) |
| **contents** | 화면 목록 (섹션 3)의 각 섹션별 핵심 요소 → 어떤 텍스트·미디어가 필요한지 |

---

*문서 버전: v1.1*
*작성일: 2026-02-26*
*v1.0 대비 변경: Landing을 "섹션 허브"에서 "독립 전환 퍼널"로 재설계. 전환 내러티브(Hook→Pain→Solution→CTA→Proof→Trust→Belonging→Final CTA) 적용. Problem, How We're Different, Course Review, Community Snapshot 섹션 추가. Course Detail 숏컷 경로 추가. Testimonial에 quote_short/member_persona 필드 추가. CommunityActivity 엔티티 추가.*
*기반: project-summary v2.0, ux-documentation-spec (5개 문서 충족 요건)*
*완성 체크:*
- *유저 플로우를 따라가면 시작(외부 유입)부터 핵심 태스크 완료(수강 신청)까지 막히는 지점 없음 ✓*
- *Landing 단독으로도 전환 내러티브가 완결됨 ✓*
- *화면 목록을 보면 project-summary의 핵심 가치가 Landing에서부터 경험됨 ✓*
- *"이 화면은 왜 있어요?" 질문에 모든 화면이 답할 수 있음 ✓*

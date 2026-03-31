# Presentation Illustration Skill

> 프레젠테이션 슬라이드에 사용할 일러스트레이션을 생성하는 워크플로우.
> 검정 배경 위에 violetGray 토큰만으로 구성되며, 3가지 유형으로 분기한다.

## 활성화 조건

| 의도 | 트리거 예시 |
|------|-----------|
| 프레젠테이션 일러스트 | "슬라이드용 일러스트", "프레젠테이션 비주얼", "PPT 일러스트" |
| 모노라인 일러스트 | "라인 일러스트", "미니멀 라인", "모노 라인 그려줘" |
| 아이소메트릭 일러스트 (프레젠테이션용) | "테크 아이소메트릭", "프레젠테이션 아이소" |
| 제한 칼라 일러스트 | "칼라 일러스트", "색상 넣어서", "포인트 컬러로" |

> **기존 `isometric-illustration` 스킬과의 관계:**
> 랜딩페이지/스토리북용 아이소메트릭 → `isometric-illustration` 스킬 사용.
> 프레젠테이션 슬라이드용 일러스트 (모든 유형) → 이 스킬 사용.

---

## 금지 규칙 (CRITICAL)

1. **violetGray 이외의 색상 사용 금지** — hue 260° 계열만 허용
2. **칼라 유형이라도 3색 초과 금지** — 배경 제외 최대 3색
3. **컨셉 승인 없이 이미지 생성 금지** — 2단계에서 반드시 사용자 확인
4. **프레젠테이션 토큰 무시 금지** — 캔버스 크기, 배치는 `presentationTokens` 기준
5. **API 키 하드코딩 절대 금지** — `process.env.GEMINI_API_KEY`만 사용, fallback 실키 금지
6. **SVG 수작업 금지** — 모든 일러스트는 Nano Banana 2 (Gemini API)로 생성. 코드로 SVG 직접 작성하지 않는다

---

## 유형 분기

```
사용자 요청 분석
├── 유형 1: 모노 라인 → resources/type-mono-line.md
├── 유형 2: 테크 아이소메트릭 → resources/type-tech-iso.md
└── 유형 3: 제한 칼라 → resources/type-color.md

모든 유형 공통 → resources/common-grammar.md (항상 먼저 Read)
```

### 유형 판별 기준

| 유형 | 키워드 | 특징 |
|------|--------|------|
| **모노 라인** | 미니멀, 라인, 선, 단순, 심플 | 2D 단선. 면 없음. 가장 절제된 표현 |
| **테크 아이소메트릭** | 아이소, 3D, 테크, 모듈, 구조 | 3D 프리미티브. 기존 아이소 문법 기반 |
| **제한 칼라** | 칼라, 색상, 포인트, 강조, 컬러풀 | 면 채움 허용. 최대 3색. 가장 표현적 |

유형이 불명확하면 사용자에게 물어본다. 추측하지 않는다.

---

## 생성 워크플로우: Nano Banana 2

> 모델: `gemini-3.1-flash-image-preview` (Nano Banana 2)
> API: `@google/genai` SDK, `process.env.GEMINI_API_KEY` 사용

### 1단계: 주제 → 유형 + 프롬프트 설계

1. 사용자 요청에서 **주제**와 **유형** 추출
2. `resources/common-grammar.md` Read — 공통 규칙 확인
3. `resources/nano-banana-generation.md` Read — SHARED 프롬프트 + 프리셋 확인
4. 해당 유형의 SHARED 프롬프트 선택
5. CONTENT 프롬프트 작성 (5요소: Subject/Composition/Key elements/Emphasis)

### 2단계: 설정 카드 → 승인

```
[Nano Banana 설정 카드]

유형: {모노 라인 | 테크 아이소메트릭 | 제한 칼라}
주제: {사용자 주제}

프롬프트 (SHARED + CONTENT):
  "{SHARED 요약}... + {CONTENT 전문}"

모델: gemini-3.1-flash-image-preview

generationConfig:
  temperature: {유형별 기본값}
  topP: {유형별 기본값}
  maxOutputTokens: 8192
  responseModalities: ["IMAGE"]
  imageConfig:
    aspectRatio: {4:3 기본}
    imageSize: {4K / 2K}
    numberOfImages: {2 기본}

레퍼런스 이미지: {경로 또는 "없음"}
출력 위치: public/presentations/generated/
```

**승인 없이 생성 금지.**

### 3단계: 스크립트 생성 + 실행

1. `scripts/generate-presentation-illustration.mjs` 기반 스크립트 작성 또는 업데이트
2. `nano-banana-generation.md`의 스크립트 템플릿 구조를 따른다
3. `.env.local`에서 API 키 로드 — 키 미설정 시 에러 출력 후 종료
4. 실행: `node scripts/generate-presentation-illustration.mjs {subject-name}`

### 4단계: 결과 확인 + 슬라이드 배치

1. 생성된 이미지를 `public/presentations/generated/`에서 확인
2. 선택한 이미지를 `public/presentations/`로 이동 (또는 그대로 사용)
3. 슬라이드에서 `<SlideImage src="/presentations/generated/{filename}" />` 로 참조

### 이터레이션 (결과 불만족 시)

```
① 어디가 문제인지 파악
   ├── 구도 → Composition 수정
   ├── 분위기/톤 → SHARED 스타일 조정
   ├── 대상 묘사 → CONTENT Subject 구체화
   └── 전체적 방향 → 유형 변경 검토

② 한 번에 하나만 변경 → 변수 1개씩 조정
```

---

## 배치 — 슬라이드 내 사용

생성된 이미지는 `<SlideImage>` 컴포넌트로 참조한다:

```jsx
render: () => (
  <SlideHSplit>
    <SlideTypoStack headline="..." body="..." />
    <SlideImage src="/presentations/generated/{filename}.png" alt="..." />
  </SlideHSplit>
)
```

- 출력 위치: `public/presentations/generated/`
- 필요시 `public/presentations/`로 이동하여 사용

---

## Resources

| 파일 | 용도 | 언제 Read |
|------|------|----------|
| `common-grammar.md` | 공통 토큰, 캔버스, 검증 규칙 | **모든 작업 시 (필수, 가장 먼저)** |
| `type-mono-line.md` | 유형 1 시각 규칙 + 메타포 사전 | 모노 라인 유형 시 |
| `type-tech-iso.md` | 유형 2 시각 규칙 + 메타포 사전 | 테크 아이소메트릭 유형 시 |
| `type-color.md` | 유형 3 시각 규칙 + 메타포 사전 | 제한 칼라 유형 시 |
| `nano-banana-generation.md` | NB2 API 설정, SHARED 프롬프트, 스크립트 템플릿 | **파이프라인 B (이미지 생성) 시** |

### 참조하는 외부 리소스 (복제하지 않음)

| 파일 | 위치 | 언제 Read |
|------|------|----------|
| `presentation.js` | `src/styles/themes/` | 프레젠테이션 토큰 확인 시 |
| `default.js` | `src/styles/themes/` | violetGray hex값 확인 시 |
| `isometric-illustration/resources/visual-grammar.md` | `.claude/skills/` | 유형 2에서 아이소 문법 상세 참조 시 |
| `generate-isometric-illustration.mjs` | `scripts/` | NB2 API 호출 패턴 참조 시 |
| `nano-banana/resources/preset-templates.md` | `.claude/skills/` | NB2 파라미터 상세 가이드 |
| `nano-banana/resources/prompt-guide.md` | `.claude/skills/` | NB2 프롬프트 설계 시드 어휘 |

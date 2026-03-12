# Nano Banana Skill

> Gemini 2.5 Flash Image API로 이미지를 생성하기 전, **프롬프트 설계 + 파라미터 설정**을 사전 점검하고 최적화하는 워크플로우.
> 이미지를 직접 생성하는 스킬이 아니라, **API 호출 전 전체 설정을 설계하는 스킬**이다.

## 활성화 조건

| 의도 | 트리거 예시 |
|------|-----------|
| 이미지 생성 | "나노 바나나로 이미지 만들려고", "Gemini 이미지 생성" |
| 프롬프트 도움 | "이미지 프롬프트 도와줘", "이 장면 어떻게 표현하지" |
| 파라미터 점검 | "이미지 API 파라미터 확인", "이 설정 괜찮아?" |
| 프리셋 추천 | "SNS용 이미지 설정", "배너 만들 건데 옵션 추천" |
| 비용 최적화 | "비용 아끼면서 이미지 만들고 싶어" |

---

## 워크플로우

```
용도 파악 → 프롬프트 설계 → 파라미터 설정 → 사전 점검 → 설정 카드 → 승인 → 코드
```

### 1단계: 용도 파악

사용자에게 아래 3가지를 질문한다 (이미 명시된 항목은 스킵):

| # | 질문 | 왜 필요한가 |
|---|------|-----------|
| 1 | **용도** — 어디에 쓸 이미지인가? | 프리셋 + 프롬프트 방향 결정 |
| 2 | **수량** — 후보 여러 장? 확정 1장? | numberOfImages, imageSize 결정 |
| 3 | **우선순위** — 속도 / 품질 / 비용 중 뭐가 중요? | temperature, imageSize 결정 |

### 2단계: 프롬프트 설계

`resources/prompt-guide.md` Read → 프롬프트를 설계한다.

#### 2.1 프롬프트 구조 적용

5요소 공식으로 프롬프트를 구성한다:

```
[Style] + [Subject] + [Setting] + [Action] + [Composition]
```

#### 2.2 표현 어휘 탐색

`prompt-guide.md`의 시드 어휘에서 적합한 용어를 찾는다.
**시드 어휘에 맞는 것이 없으면 → 리서치 프로토콜 실행.**

#### 리서치 프로토콜 (시드 어휘에 없을 때)

```
① 사용자 의도를 키워드로 추출
   예: "빗방울이 렌즈에 맺힌 느낌" → rain lens droplet photography

② WebSearch로 해당 분야의 전문 용어/기법을 조사
   검색 패턴: "{키워드} photography technique term"
                "{키워드} cinematography terminology"
                "{키워드} art style name"
                "{키워드} Gemini image prompt example"

③ 조사 결과에서 Nano Banana에 효과적일 용어를 추출
   → 전문 용어 + 자연어 서술 병행 프롬프트 제안

④ 사용자에게 제안
   "이런 표현이 있습니다: [용어]. 이렇게 프롬프트에 반영할까요?"
```

**리서치 트리거 조건:**
- 시드 어휘에서 사용자 의도와 매칭되는 항목이 없을 때
- 사용자가 특정 분야의 전문적 표현을 원할 때 (의료, 건축, 패션 등)
- 기존 프롬프트 결과가 의도와 다를 때 (이터레이션 중)
- 사용자가 레퍼런스 이미지/스타일을 언급했으나 용어를 모를 때

#### 2.3 특수 처리

| 상황 | 처리 |
|------|------|
| 텍스트 포함 | 원하는 텍스트를 따옴표로 감싸기 + 폰트 스타일 명시 |
| 네거티브 의도 | "~없이" → 원하는 상태를 긍정형으로 서술 |
| 멀티이미지 합성 | 각 이미지의 역할을 명시 ("이미지1에서 X, 이미지2에서 Y") |
| 편집 | "Change only [요소]. Keep everything else unchanged" 패턴 |

### 3단계: 파라미터 설정

`resources/preset-templates.md` Read → 프리셋 추천 + 커스텀 조정.

#### 3.1 프리셋 추천

용도에 가장 가까운 프리셋 1~2개를 제안한다.

#### 3.2 커스텀 조정

| 사용자 요구 | 조정 항목 |
|------------|----------|
| "좀 더 다양하게" | temperature ↑, numberOfImages ↑ |
| "일관되게" | temperature ↓ (0.0~0.3), topK: 1 |
| "빠르게" | imageSize ↓, numberOfImages: 1 |
| "최고 품질로" | imageSize: "4K", numberOfImages: 1 |
| "비용 아끼면서" | imageSize: "1K", maxOutputTokens ↓ |
| "텍스트 설명도 같이" | responseModalities: ["TEXT", "IMAGE"] |
| "세로로" | aspectRatio → 9:16, 4:5, 2:3 중 선택 |
| "안전필터 끄고" | safetySettings: BLOCK_NONE (paid tier 확인) |

### 4단계: 사전 점검

설정 카드 제출 전 자동 검증:

| # | 체크 항목 | 실패 시 조치 |
|---|----------|-------------|
| 1 | `imageSize`가 대문자 K인가? (`"2K"` O, `"2k"` X) | 자동 수정 |
| 2 | `numberOfImages`가 1~4 범위인가? | 범위 내로 조정 |
| 3 | `aspectRatio`가 10가지 지원값 중 하나인가? | 가장 가까운 값 제안 |
| 4 | `responseModalities`에 `"IMAGE"`가 포함되어 있는가? | 추가 |
| 5 | `temperature`가 0.0~2.0 범위인가? | 범위 내로 클램프 |
| 6 | 4K + numberOfImages 4는 비용 폭탄 — 경고했는가? | 경고 표시 |
| 7 | Free 티어에서 RPM 한도 초과 가능성? | 티어 확인 안내 |
| 8 | 프롬프트에 네거티브 표현("no ~", "without ~")이 있는가? | 긍정형으로 변환 제안 |

### 5단계: 설정 카드 제출

프롬프트 + 파라미터를 통합하여 사용자에게 보여주고 승인을 받는다:

```
[Nano Banana 설정 카드]

프롬프트:
  "A photorealistic close-up portrait of a young woman,
   gazing through a rain-covered window. Soft diffused daylight
   with water droplets refracting light across the glass.
   Shot on Fujifilm X-T5 with 56mm f/1.2 lens, shallow depth of field."

모델: gemini-2.5-flash-image

generationConfig:
  temperature: 0.7
  topP: 0.9
  maxOutputTokens: 8192
  responseModalities: ["IMAGE"]
  imageConfig:
    aspectRatio: 3:2
    imageSize: 2K
    numberOfImages: 2

safetySettings: 기본값 (BLOCK_NONE)

예상 비용: 2K × 2장 — 저비용
리서치 출처: (리서치 수행 시 검색 키워드 + 참고 URL 기록)
```

**승인 없이 API 호출 코드 작성 금지.**

### 6단계: 코드 생성 (승인 후)

승인된 설정 카드를 기반으로 실행 가능한 API 호출 코드를 생성한다.

---

## 이터레이션 (결과 불만족 시)

설정 카드 승인 → 생성 → 결과가 의도와 다를 경우:

```
① 어디가 문제인지 파악
   ├── 구도/프레이밍 → Composition 수정
   ├── 분위기/톤 → Style + 조명 수정
   ├── 대상 묘사 → Subject 구체화
   └── 전체적 방향 → 리서치 프로토콜 재실행

② 한 번에 하나만 변경
   → 변수 1개씩 바꿔서 원인 특정

③ 일관성 드리프트 시
   → 대화 재시작 + 캐릭터/장면 상세 재기술
```

---

## Resources

| 파일 | 용도 | 언제 Read |
|------|------|----------|
| `prompt-guide.md` | 프롬프트 구조, 시드 어휘, 특수 패턴 | 2단계 (항상) |
| `preset-templates.md` | 용도별 프리셋 + 파라미터 조합 가이드 | 3단계 (항상) |
| `prompt-template-isometric-lineart.md` | 아이소메트릭 라인아트 공유 스타일 + 이미지별 콘텐츠 템플릿 | 동일 스타일 시리즈 생성 시 |

### 참조하는 외부 리소스 (복제하지 않음)

| 파일 | 위치 | 언제 Read |
|------|------|----------|
| `gemini-api-guide.md` | `src/docs/nano-banana/` | 파라미터 상세 확인 시 |

---

## 핵심 원칙

- **프롬프트가 먼저, 설정은 다음, 코드는 마지막** — 순서를 지킨다
- **설정 카드 승인 없이 코드 생성 금지** — 5단계에서 반드시 사용자 확인
- **시드 어휘는 출발점이지 경계가 아니다** — 없으면 리서치로 확장한다
- **리서치는 제한이 아닌 확장** — 사용자 의도에 맞는 표현을 능동적으로 탐색
- **프리셋은 출발점** — 사용자 요구에 따라 항상 커스텀 가능
- **비용 경고는 의무** — 4K + 다수 이미지 조합 시 반드시 비용 안내
- **대문자 K** — imageSize는 반드시 `"512px"`, `"1K"`, `"2K"`, `"4K"` 형식
- **한 번에 하나만 변경** — 이터레이션 시 변수 1개씩 조정

# Nano Banana Skill

> Gemini 2.5 Flash Image API로 이미지를 생성하기 전, 용도에 맞는 파라미터를 사전 점검하고 최적 설정을 가이드하는 워크플로우.
> 이미지를 직접 생성하는 스킬이 아니라, **API 호출 전 설정을 설계하는 스킬**이다.

## 활성화 조건

| 의도 | 트리거 예시 |
|------|-----------|
| 이미지 생성 설정 | "나노 바나나로 이미지 만들려고", "Gemini 이미지 설정해줘" |
| 파라미터 점검 | "이미지 API 파라미터 확인", "이 설정 괜찮아?" |
| 프리셋 추천 | "SNS용 이미지 설정", "배너 만들 건데 옵션 추천" |
| 비용 최적화 | "비용 아끼면서 이미지 만들고 싶어", "가성비 설정" |

---

## 워크플로우

```
용도 파악 → 프리셋 추천 → 커스텀 조정 → 설정 카드 제출 → 승인
```

### 1단계: 용도 파악

사용자에게 아래 3가지를 질문한다 (이미 명시된 항목은 스킵):

| # | 질문 | 왜 필요한가 |
|---|------|-----------|
| 1 | **용도** — 어디에 쓸 이미지인가? | 프리셋 선택 기준 |
| 2 | **수량** — 후보 여러 장? 확정 1장? | numberOfImages, imageSize 결정 |
| 3 | **우선순위** — 속도 / 품질 / 비용 중 뭐가 중요? | temperature, imageSize 결정 |

### 2단계: 프리셋 추천

`resources/preset-templates.md` Read → 용도에 가장 가까운 프리셋 1~2개를 제안한다.

```
추천 프리셋: 웹 히어로 배너
- aspectRatio: 16:9
- imageSize: 4K
- temperature: 0.7
- numberOfImages: 1
```

### 3단계: 커스텀 조정

사용자의 추가 요구사항에 따라 프리셋을 조정한다:

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

### 4단계: 설정 카드 제출

최종 설정을 아래 형식으로 사용자에게 보여주고 승인을 받는다:

```
[Nano Banana 설정 카드]

용도: 웹 히어로 배너
모델: gemini-2.5-flash-image

generationConfig:
  temperature: 0.7
  topP: 0.9
  maxOutputTokens: 8192
  responseModalities: ["IMAGE"]
  imageConfig:
    aspectRatio: 16:9
    imageSize: 4K
    numberOfImages: 1

safetySettings: 기본값 (BLOCK_NONE)

예상 비용: 4K 단일 이미지 — 토큰 소비량에 따라 변동
주의사항: 4K는 생성 시간이 길어질 수 있음
```

**승인 없이 API 호출 코드 작성 금지.**

### 5단계: 코드 생성 (승인 후)

승인된 설정 카드를 기반으로 실행 가능한 API 호출 코드를 생성한다.

---

## 사전 점검 체크리스트

설정 카드 제출 전 자동으로 검증한다:

| # | 체크 항목 | 실패 시 조치 |
|---|----------|-------------|
| 1 | `imageSize`가 대문자 K인가? (`"2K"` O, `"2k"` X) | 자동 수정 |
| 2 | `numberOfImages`가 1~4 범위인가? | 범위 내로 조정 |
| 3 | `aspectRatio`가 10가지 지원값 중 하나인가? | 가장 가까운 값 제안 |
| 4 | `responseModalities`에 `"IMAGE"`가 포함되어 있는가? | 추가 |
| 5 | `temperature`가 0.0~2.0 범위인가? | 범위 내로 클램프 |
| 6 | 4K + numberOfImages 4는 비용 폭탄 — 경고했는가? | 경고 표시 |
| 7 | Free 티어에서 RPM 한도 초과 가능성? | 티어 확인 안내 |

---

## Resources

| 파일 | 용도 | 언제 Read |
|------|------|----------|
| `preset-templates.md` | 용도별 프리셋 + 파라미터 조합 가이드 | 2단계 (항상) |

### 참조하는 외부 리소스 (복제하지 않음)

| 파일 | 위치 | 언제 Read |
|------|------|----------|
| `gemini-api-guide.md` | `src/docs/nano-banana/` | 파라미터 상세 확인 시 |

---

## 핵심 원칙

- **설정이 먼저, 코드는 나중** — 파라미터를 결정한 뒤에만 코드를 작성한다
- **설정 카드 승인 없이 코드 생성 금지** — 4단계에서 반드시 사용자 확인
- **프리셋은 출발점** — 사용자 요구에 따라 항상 커스텀 가능
- **비용 경고는 의무** — 4K + 다수 이미지 조합 시 반드시 비용 안내
- **대문자 K** — imageSize는 반드시 `"512px"`, `"1K"`, `"2K"`, `"4K"` 형식

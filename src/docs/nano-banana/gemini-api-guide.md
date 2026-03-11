# Gemini API Guide — Nano Banana (Gemini 2.5 Flash Image)

> Google Gemini 이미지 생성 API의 파라미터, 옵션, 퍼포먼스 튜닝 가이드.

---

## 1. 접근 방식 비교

| 항목 | AI Studio (웹) | Paid API (CLI) |
|------|----------------|----------------|
| **접근** | 브라우저 프롬프트 | `GEMINI_API_KEY` 환경변수 + SDK/CLI |
| **이미지 생성** | UI 프리뷰 | JSON base64/URL 반환 |
| **모델 접근** | 일부 preview 제한 | 전체 production 카탈로그 |
| **자동화** | 불가 | 스크립트, 배치 처리 가능 |
| **대량 컨텍스트** | 50K+ 토큰에서 UI 렉 | 토큰 한도까지 안정 |

---

## 2. 비용 티어

| 티어 | 조건 | RPM | TPM | RPD |
|------|------|-----|-----|-----|
| **Free** | 무료 (카드 불필요) | 5~15 | 250K | 100~1,000 |
| **Tier 1** | 과금 활성화 | 150~300 | 1M | 1,500 |
| **Tier 2** | $250 누적 + 30일 | 500~1,500 | 2M | 10,000 |
| **Tier 3** | $1,000 누적 | 1,000~4,000+ | custom | custom |

**토큰 가격 (Gemini 2.0 Flash 기준):**
- Input: $0.075 / 1M tokens
- Output: $0.30 / 1M tokens

> AI Studio에서 paid API key 연결 시 해당 키의 AI Studio 사용도 과금 대상.

---

## 3. CLI 연동

```bash
# 환경변수 설정
export GEMINI_API_KEY="your-api-key-here"

# Python SDK 설치
pip install --upgrade google-genai

# Aider에서 사용
aider --model gemini/gemini-2.5-flash-image
```

---

## 4. 파라미터 레퍼런스

### 4.1 generationConfig — 생성 제어

#### 샘플링 파라미터

| 파라미터 | 범위 | 설명 |
|----------|------|------|
| `temperature` | `0.0` ~ `2.0` | 낮을수록 결정적, 높을수록 창의적 |
| `topP` | `0.0` ~ `1.0` | Nucleus sampling. 확률 합이 topP인 최소 토큰 집합 |
| `topK` | 정수 | 확률 상위 K개 토큰만 고려 |
| `maxOutputTokens` | 정수 | 응답 최대 토큰 수 (텍스트+이미지 혼합 시 주의) |

#### 출력 형식

| 파라미터 | 값 | 설명 |
|----------|-----|------|
| `responseModalities` | `["TEXT", "IMAGE"]` | 텍스트+이미지 동시 반환 |
| | `["IMAGE"]` | 이미지만 반환 |
| | `["TEXT"]` | 텍스트만 반환 (기본) |
| `responseMimeType` | `"application/json"` 등 | 구조화 출력 포맷 |
| `responseSchema` | JSON Schema | 출력 구조 강제 |

### 4.2 imageConfig — 이미지 전용

| 파라미터 | 값 | 설명 |
|----------|-----|------|
| `aspectRatio` | `"1:1"`, `"16:9"`, `"9:16"`, `"4:3"`, `"3:4"`, `"3:2"`, `"2:3"`, `"5:4"`, `"4:5"`, `"21:9"` | 10가지 비율 |
| `imageSize` | `"512px"`, `"1K"`, `"2K"`, `"4K"` | 해상도. **대문자 K 필수**. 기본 1K |
| `numberOfImages` | `1` ~ `4` | 한 번에 생성할 이미지 수 |

### 4.3 safetySettings — 안전 필터

**카테고리:**

| 카테고리 | 설명 |
|----------|------|
| `HARM_CATEGORY_HARASSMENT` | 괴롭힘 |
| `HARM_CATEGORY_HATE_SPEECH` | 혐오 발언 |
| `HARM_CATEGORY_SEXUALLY_EXPLICIT` | 성적 콘텐츠 |
| `HARM_CATEGORY_DANGEROUS_CONTENT` | 위험 콘텐츠 |
| `HARM_CATEGORY_CIVIC_INTEGRITY` | 선거/시민 무결성 |

**임계값 (느슨 → 엄격):**

| 임계값 | 차단 수준 |
|--------|-----------|
| `BLOCK_NONE` / `OFF` | 차단 안 함 (Gemini 2.5+ 기본값) |
| `BLOCK_FEW` | HIGH만 차단 |
| `BLOCK_SOME` | MEDIUM 이상 차단 |
| `BLOCK_MOST` | LOW 이상 차단 |
| `BLOCK_ALL` | 전부 차단 |

---

## 5. 퍼포먼스 튜닝

| 목적 | 조정 |
|------|------|
| **속도 우선** | `imageSize: "1K"`, `numberOfImages: 1`, `maxOutputTokens` 낮게 |
| **품질 우선** | `imageSize: "4K"`, `temperature: 0.4~0.7` |
| **일관성** | `temperature: 0.0~0.2`, `topK: 1` |
| **창의성** | `temperature: 1.0~2.0`, `topP: 0.95` |
| **비용 절감** | 입력 프롬프트 간결화 + `maxOutputTokens` 제한 |

---

## 6. 전체 요청 예시

```javascript
const response = await ai.models.generateContent({
  model: "gemini-2.5-flash-image",
  contents: [{
    role: "user",
    parts: [{ text: "A futuristic city at sunset, cyberpunk style" }]
  }],
  generationConfig: {
    temperature: 0.7,
    topP: 0.9,
    maxOutputTokens: 8192,
    responseModalities: ["TEXT", "IMAGE"],
    imageConfig: {
      aspectRatio: "16:9",
      imageSize: "2K",
      numberOfImages: 1
    }
  },
  safetySettings: [
    { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
    { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_SOME" },
    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
  ]
});
```

---

## 참고 소스

- [Gemini Image Generation (Nano Banana) 공식 문서](https://ai.google.dev/gemini-api/docs/image-generation)
- [Gemini API Content Generation Parameters](https://ai.google.dev/api/generate-content)
- [Safety Settings 공식 문서](https://ai.google.dev/gemini-api/docs/safety-settings)
- [Gemini API Rate Limits](https://ai.google.dev/gemini-api/docs/rate-limits)
- [Gemini API Billing](https://ai.google.dev/gemini-api/docs/billing)

# Nano Banana — Prompt Guide

> 프롬프트 구조, 시드 어휘, 특수 패턴을 제공한다.
> 시드 어휘는 **검증된 출발점**이지 전체 목록이 아니다. 여기 없는 표현이 필요하면 리서치 프로토콜을 실행한다.

---

## 1. 프롬프트 5요소 공식

모든 프롬프트는 아래 5요소로 구성한다. 순서는 자유지만 빠진 요소가 있으면 모델이 임의로 채운다.

| 요소 | 질문 | 예시 |
|------|------|------|
| **Style** | 어떤 매체/화풍인가? | "photorealistic", "watercolor", "3D render" |
| **Subject** | 무엇을 그리는가? (외형, 포즈) | "orange tabby cat wearing a tiny bow tie" |
| **Setting** | 어디에서? (장소, 환경) | "weathered wooden pier at golden hour" |
| **Action** | 무슨 일이 일어나는가? | "sitting calmly, gazing at the ocean" |
| **Composition** | 어떤 프레이밍/카메라? | "close-up, 85mm lens, shallow depth of field" |

### 기본 서술 원칙

- **키워드 나열 X → 장면 서술 O**: "cat, sunset, beach" 보다 "A orange tabby cat sitting on a weathered wooden pier at sunset, with warm golden light reflecting off gentle ocean waves"
- **구체적일수록 좋다**: "fantasy armor" → "ornate elven plate armor, etched with silver leaf patterns, high collar, falcon-wing pauldrons"
- **의도/컨텍스트 제공**: "로고 만들어줘" → "고급 미니멀 스킨케어 브랜드 로고"

---

## 2. 시드 어휘

> 자주 쓰이고 효과가 검증된 용어 모음. **전체 목록이 아님.**
> 여기 없는 표현이 필요하면 `SKILL.md`의 리서치 프로토콜을 따른다.

### 2.1 카메라/렌즈

| 용어 | 효과 |
|------|------|
| `wide-angle shot` | 넓은 공간감 |
| `macro shot` | 극접사 디테일 |
| `85mm portrait lens` | 인물 보케 |
| `low-angle perspective` | 위압감/웅장함 |
| `Dutch angle` | 불안/역동성 |
| `top-down drone perspective` | 조감도 |
| `extreme close-up` | 극단적 클로즈업 |

### 2.2 조명/분위기

| 용어 | 효과 |
|------|------|
| `three-point softbox setup` | 균일한 제품 조명 |
| `golden hour backlighting` | 따뜻한 역광 |
| `chiaroscuro, high contrast` | 극적 명암 |
| `dramatic rim lighting` | 윤곽 강조 |
| `diffused overcast light` | 부드러운 흐린 날 |

### 2.3 스타일

| 용어 | 효과 |
|------|------|
| `photorealistic` | 사진 수준 리얼리즘 |
| `minimalist composition` | 미니멀/여백 강조 |
| `kawaii-style sticker` | 귀여운 스티커풍 |
| `cel-shading, bold outlines` | 애니메이션/만화풍 |
| `mid-century travel poster` | 레트로 포스터풍 |

### 2.4 카메라 하드웨어 (색감 제어)

| 용어 | 효과 |
|------|------|
| `Shot on Fujifilm` | 필름 색감 |
| `Shot on GoPro` | 액션/광각 왜곡 |
| `disposable camera flash` | 노스탤직/raw 미감 |

---

## 3. 특수 패턴

### 3.1 텍스트 렌더링

```
이미지에 텍스트를 넣으려면:
- 원하는 텍스트를 따옴표로 감싸기: with the text "HELLO WORLD"
- 폰트 스타일 명시: "bold sans-serif font", "neon cursive signage"
- 복잡한 텍스트는 재시도 필요할 수 있음
```

### 3.2 네거티브 의도 → 긍정형 변환

Nano Banana는 `negative_prompt` 파라미터가 없다. "~없이"는 원하는 상태를 긍정형으로 서술한다.

| 의도 | ❌ 네거티브 | ✅ 긍정형 |
|------|-----------|----------|
| 차 없는 거리 | "no cars" | "an empty, deserted street with no signs of traffic" |
| 손가락 오류 방지 | "no extra fingers" | "anatomically correct hands with five fingers each" |
| 워터마크 없이 | "no watermark" | "clean image, professional quality" |

### 3.3 멀티이미지 합성

- 최대 14장 레퍼런스 이미지 입력 가능
- 각 이미지의 역할을 명시:
  - "Take the dress from image 1 and place it on the model from image 2"
- 캐릭터 일관성: 레퍼런스에 이름 부여 → 여러 장면에서 동일 캐릭터

### 3.4 편집 프롬프트

| 작업 | 패턴 |
|------|------|
| **인페인팅** | "Change only the [요소] to [새 요소]. Keep everything else unchanged" |
| **스타일 전환** | "Transform into the style of [화풍]. Preserve original composition" |
| **요소 추가** | "Add [요소] to the scene, matching the existing lighting and style" |
| **요소 제거** | "Remove [요소] from the image, fill naturally" |
| **분위기 변경** | "Make the lighting warmer" / "Change the mood to more dramatic" |

### 3.5 변형 생성

- "Create three distinct variations of this scene"
- "Same composition but with four different color palettes"

---

## 4. 리서치 프로토콜 요약

시드 어휘에 없는 표현이 필요할 때:

```
SKILL.md 2단계 참조:
① 사용자 의도 → 키워드 추출
② WebSearch로 전문 용어/기법 조사
③ Nano Banana에 효과적일 표현 추출
④ 사용자에게 제안
```

리서치 검색 패턴:
- `"{키워드} photography technique term"`
- `"{키워드} cinematography terminology"`
- `"{키워드} art style name"`
- `"{키워드} Gemini image prompt example"`

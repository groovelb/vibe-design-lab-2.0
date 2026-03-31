# Nano Banana 2 Generation — 프레젠테이션 일러스트 생성

> Gemini Nano Banana 2 API를 통해 프레젠테이션용 일러스트 비트맵을 생성하는 워크플로우.
> SVG 수작업 대신 AI 이미지 생성이 필요할 때 사용한다.

---

## 언제 사용하는가

| 상황 | 접근 |
|------|------|
| 단순 도형/다이어그램 | SVG 수작업 (SKILL.md 기본 파이프라인) |
| 복잡한 장면/인물/사실적 표현 | **Nano Banana 2 생성** (이 문서) |
| 레퍼런스 이미지 기반 스타일 통일 | **Nano Banana 2 + 레퍼런스 입력** |

---

## 모델 + API 설정

```
모델: gemini-3.1-flash-image-preview (Nano Banana 2, 2026-02 출시)
API키: process.env.GEMINI_API_KEY (.env.local에서 로드)
SDK: @google/genai
```

**API 키 규칙 (CRITICAL)**:
- 코드에 키 하드코딩 절대 금지
- `.env.local`의 `GEMINI_API_KEY` 환경변수만 사용
- fallback 값으로 실제 키 넣기 금지 (`|| 'AIza...'` 패턴 금지)
- 키 미설정 시 명확한 에러 메시지 출력 후 종료

---

## 유형별 프리셋

### 공통 설정

```js
const COMMON_CONFIG = {
  maxOutputTokens: 8192,
  responseModalities: ['IMAGE'],
  imageConfig: {
    aspectRatio: '4:3',  // 프레젠테이션 슬라이드 (16:9 내 배치 시 4:3이 안전)
    imageSize: '4K',
    numberOfImages: 2,   // 후보 2장
  },
};
```

### 유형 1: 모노 라인

```js
const MONO_LINE_CONFIG = {
  ...COMMON_CONFIG,
  temperature: 0.5,
  topP: 0.85,
};
```

### 유형 2: 테크 아이소메트릭

```js
const TECH_ISO_CONFIG = {
  ...COMMON_CONFIG,
  temperature: 0.5,
  topP: 0.85,
};
```

### 유형 3: 제한 칼라

```js
const COLOR_CONFIG = {
  ...COMMON_CONFIG,
  temperature: 0.7,   // 면 표현에 약간 더 창의성
  topP: 0.9,
};
```

---

## 유형별 공유 프롬프트 (SHARED)

### 유형 1: 모노 라인 SHARED

```
Minimal mono-line illustration on a solid very dark near-black
violet-gray background (approximately hsl 260, 20%, 4%).

Stroke rules:
- All forms defined exclusively by thin consistent white outline
  strokes (near-white, approximately RGB 230, 233, 236)
- All shapes are transparent — the dark background is visible through them
- Single consistent stroke weight throughout the entire image
- Round line caps and round line joins
- No solid fills, no gradients, no shadows, no glow effects

Style:
- Clean vector-quality linework resembling a technical blueprint
  or linocut print carved from darkness
- Generous negative space — at least 40% of the canvas is empty
- Minimal detail — convey meaning with the fewest possible lines

Do NOT include: text, labels, annotations, arrows, dimension lines,
or any written content. Pure visual forms only.
```

### 유형 2: 테크 아이소메트릭 SHARED

```
Technical isometric wireframe illustration on a solid very dark
near-black violet-gray background (approximately hsl 260, 20%, 4%).

Stroke rules:
- Primary strokes in bright near-white (approximately RGB 230, 233, 236)
- Secondary strokes in medium gray (approximately RGB 142, 145, 152)
- Structural internal lines in subtle dark gray (approximately RGB 62, 66, 72)
- Stroke weight: thin and consistent throughout
- Round line caps and round line joins

Isometric rules:
- Strict isometric projection at approximately 30 degrees
- All parallel edges remain parallel — no vanishing points
- Vertical lines stay perfectly vertical
- All objects share the same isometric angle and grid

Style:
- Every object has clear 3D depth with visible top, front, and side faces
- Smooth generously rounded corners on all objects
- Rich internal wireframe detail — subdivisions, nested panels, inner frames
- All faces are transparent (no fills) — dark background shows through
- Small circular node markers at connection junctions
- No solid fills, no gradients, no drop shadows

Composition:
- Objects float in empty space — no ground plane, no background grid
- The central/hero object is noticeably larger (2-3x) than surrounding objects
- Generous negative space between objects
- Spread-out map composition

Do NOT include: text, labels, dimension lines, arrows, title lettering,
or any written content. Only wireframe objects and connection lines with
node dots.
```

### 유형 3: 제한 칼라 SHARED

```
Flat color illustration using ONLY three shades of violet-gray on a
solid very dark near-black violet-gray background (approximately
hsl 260, 20%, 4%).

Color palette (STRICT — no other colors allowed):
- Bright: near-white (approximately RGB 243, 244, 248) — hero/highlight areas
- Medium: mid-gray (approximately RGB 142, 145, 152) — secondary areas
- Subtle: dark gray (approximately RGB 33, 34, 40) — depth/shadow areas

Style rules:
- Flat filled shapes with sharp 90-degree corners (no rounded corners)
- No gradients, no textures, no patterns within shapes
- Clean geometric forms — rectangles, circles, simple polygons
- Minimal thin outlines only where needed for separation (1-2 shades
  brighter than the fill)
- No drop shadows, no glow effects, no blur

Composition:
- Clean, editorial layout with generous negative space
- At least 30% of the canvas is empty background
- Clear visual hierarchy — one hero element draws the eye first

Do NOT include: text, labels, annotations, or any written content.
Pure visual forms only.
```

---

## [CONTENT] 작성 가이드

SHARED 프롬프트 뒤에 주제별 CONTENT를 붙인다.

### CONTENT 구성 공식

```
[이 블록 앞에 해당 유형의 SHARED 블록을 선행]

Subject: {무엇을 그릴지 — 구체적인 장면/오브젝트 서술}

Composition: {배치 — 중앙 정렬, 좌우 분할, 대각선 흐름 등}

Key elements:
- {요소 1 — 형태 + 위치 + 크기}
- {요소 2}
- {요소 3}

Emphasis: {히어로/강조 포인트 — 가장 밝거나 큰 요소}
```

### CONTENT 예시 — 모노 라인

```
Subject: A design system architecture — interconnected modules
forming a unified structure.

Composition: Centered, slightly above optical center, with
modules radiating outward from a central hub.

Key elements:
- Central hub: a clean hexagonal outline, largest element
- 6 satellite modules: smaller circles connected by single lines
- Connection lines: straight with small dots at junction points

Emphasis: The central hub has slightly thicker strokes than satellites.
```

### CONTENT 예시 — 테크 아이소메트릭

```
Subject: An AI agent workflow — multiple processing modules
connected in a pipeline.

Composition: Diagonal flow from upper-right to lower-left,
hero module at center.

Key elements:
- 5 isometric module boxes of varying heights
- Hero module (center): tallest, with internal wireframe detail showing
  nested panels and data rows
- Connection lines between modules with circular node markers
- 2 smaller standby modules (thinner, subtle strokes)

Emphasis: Hero module at center with brightest strokes and most
internal detail.
```

### CONTENT 예시 — 제한 칼라

```
Subject: Component hierarchy — a design system's building blocks
arranged by complexity.

Composition: Bottom-up stack, base at bottom, complex components at top.

Key elements:
- Bottom layer: 3 wide flat rectangles in subtle dark gray (primitives)
- Middle layer: 2 medium rectangles in medium gray (composed components)
- Top layer: 1 bright near-white rectangle (page template)
- Small gap between each layer

Emphasis: Top layer rectangle is the brightest and draws the eye.
```

---

## 레퍼런스 이미지 사용

스타일 일관성을 위해 레퍼런스 이미지를 함께 전송할 수 있다.

### 레퍼런스 저장 위치

```
src/reference/presentation-illustration/
├── mono-line/          ← 모노 라인 스타일 레퍼런스
├── tech-iso/           ← 테크 아이소 스타일 레퍼런스
└── color/              ← 제한 칼라 스타일 레퍼런스
```

### 레퍼런스 활용 패턴

```js
// 레퍼런스가 있을 때 — parts 배열에 이미지를 먼저 넣는다
const parts = [];

// 1. 레퍼런스 이미지 (있으면)
if (subject.referenceImage) {
  const refBase64 = await imageToBase64(subject.referenceImage);
  parts.push({ inlineData: { mimeType: 'image/png', data: refBase64 } });
}

// 2. 프롬프트 (SHARED + CONTENT)
parts.push({ text: subject.prompt });
```

CONTENT에 "Using the provided reference image, ..." 패턴을 추가한다:

```
Using the provided reference image as a style reference,
create a new illustration in the same visual style with
these modifications:

{변경 사항 서술}
```

---

## 스크립트 템플릿

새 프레젠테이션 일러스트 생성 스크립트를 만들 때 아래 구조를 따른다.

### 파일 위치

```
scripts/generate-presentation-illustration.mjs
```

### 구조

```js
/**
 * Nano Banana 2 — VDL Presentation Illustration Generator
 *
 * 사용법:
 *   node scripts/generate-presentation-illustration.mjs                  # 전체
 *   node scripts/generate-presentation-illustration.mjs {subject-name}   # 특정 주제만
 */

import { GoogleGenAI } from '@google/genai';
import { writeFile, mkdir, readFile, readdirSync } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, '..');
const OUTPUT_DIR = join(ROOT_DIR, 'public', 'presentations', 'generated');

// ── .env.local 로드 ──
async function loadEnv() {
  try {
    const envContent = await readFile(join(ROOT_DIR, '.env.local'), 'utf-8');
    for (const line of envContent.split('\n')) {
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (match && !process.env[match[1].trim()]) {
        process.env[match[1].trim()] = match[2].trim();
      }
    }
  } catch { /* .env.local 없으면 환경변수 사용 */ }
}
await loadEnv();

// ── API 설정 ──
if (!process.env.GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY 환경변수를 설정하세요. (.env.local 또는 시스템 환경변수)');
  process.exit(1);
}
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL = 'gemini-3.1-flash-image-preview';

// ── SHARED 프롬프트 (유형별) ──
const SHARED_PROMPTS = {
  'mono-line': `{모노 라인 SHARED 프롬프트}`,
  'tech-iso': `{테크 아이소메트릭 SHARED 프롬프트}`,
  'color': `{제한 칼라 SHARED 프롬프트}`,
};

// ── 유형별 generationConfig ──
const GENERATION_CONFIGS = {
  'mono-line': {
    temperature: 0.5, topP: 0.85, maxOutputTokens: 8192,
    responseModalities: ['IMAGE'],
    imageConfig: { aspectRatio: '4:3', imageSize: '4K', numberOfImages: 2 },
  },
  'tech-iso': {
    temperature: 0.5, topP: 0.85, maxOutputTokens: 8192,
    responseModalities: ['IMAGE'],
    imageConfig: { aspectRatio: '4:3', imageSize: '4K', numberOfImages: 2 },
  },
  'color': {
    temperature: 0.7, topP: 0.9, maxOutputTokens: 8192,
    responseModalities: ['IMAGE'],
    imageConfig: { aspectRatio: '4:3', imageSize: '4K', numberOfImages: 2 },
  },
};

// ── Subject 정의 ──
const SUBJECTS = [
  {
    name: 'example-subject',
    type: 'mono-line',           // 'mono-line' | 'tech-iso' | 'color'
    referenceImage: null,         // 레퍼런스 이미지 경로 (ROOT_DIR 기준) 또는 null
    content: `{CONTENT 프롬프트}`,
  },
];

// ── 이미지 → Base64 ──
async function imageToBase64(filepath) {
  const buffer = await readFile(filepath);
  return buffer.toString('base64');
}

// ── 생성 ──
async function generateImage(subject) {
  console.log(`\n⏳ Generating: ${subject.name} (${subject.type})...`);

  const parts = [];

  // 레퍼런스 이미지
  if (subject.referenceImage) {
    const refPath = join(ROOT_DIR, subject.referenceImage);
    const refBase64 = await imageToBase64(refPath);
    const refMime = refPath.endsWith('.png') ? 'image/png' : 'image/jpeg';
    parts.push({ inlineData: { mimeType: refMime, data: refBase64 } });
  }

  // 프롬프트: SHARED + CONTENT
  const prompt = SHARED_PROMPTS[subject.type] + '\n\n' + subject.content;
  parts.push({ text: prompt });

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [{ role: 'user', parts }],
    generationConfig: GENERATION_CONFIGS[subject.type],
  });

  // 결과 저장 (버전 넘버링)
  const candidates = response.candidates || [];
  let savedCount = 0;
  const { readdirSync } = await import('fs');

  for (const candidate of candidates) {
    const resParts = candidate.content?.parts || [];
    for (const part of resParts) {
      if (part.inlineData) {
        const ext = part.inlineData.mimeType === 'image/png' ? 'png' : 'webp';
        const existing = readdirSync(OUTPUT_DIR)
          .filter(f => f.startsWith(subject.name) && f.includes('_v'));
        const maxVersion = existing.reduce((max, f) => {
          const m = f.match(/_v(\d+)\./);
          return m ? Math.max(max, parseInt(m[1])) : max;
        }, 0);
        const version = maxVersion + 1 + savedCount;
        const filename = `${subject.name}_v${version}.${ext}`;
        const filepath = join(OUTPUT_DIR, filename);

        await writeFile(filepath, Buffer.from(part.inlineData.data, 'base64'));
        console.log(`  ✅ Saved: ${filepath}`);
        savedCount++;
      }
    }
  }

  if (savedCount === 0) {
    console.log(`  ⚠️  No images returned for ${subject.name}`);
    const text = response.candidates?.[0]?.content?.parts?.find(p => p.text)?.text;
    if (text) console.log(`  Response text: ${text.slice(0, 300)}`);
  }

  return savedCount;
}

// ── main ──
async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  console.log('🍌 Nano Banana 2 — Presentation Illustration Generator');
  console.log(`   Model: ${MODEL}`);
  console.log(`   Output: ${OUTPUT_DIR}`);

  const target = process.argv[2];
  const filtered = target
    ? SUBJECTS.filter(s => s.name.includes(target))
    : SUBJECTS;

  if (filtered.length === 0) {
    console.error(`❌ No matching subject for "${target}"`);
    console.log('Available:', SUBJECTS.map(s => s.name).join(', '));
    process.exit(1);
  }

  console.log(`\n📋 Subjects: ${filtered.map(s => s.name).join(', ')}`);

  let totalImages = 0;
  for (const subject of filtered) {
    totalImages += await generateImage(subject);
  }

  console.log(`\n🎉 Done! ${totalImages} images generated in ${OUTPUT_DIR}`);
}

main().catch((err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
```

### 출력 경로

```
public/presentations/generated/
├── {subject-name}_v1.webp
├── {subject-name}_v2.webp
└── ...
```

기존 `generate-isometric-illustration.mjs`는 `src/assets/isometric/`에 저장하지만,
프레젠테이션 일러스트는 `public/presentations/generated/`에 저장한다.
슬라이드에서 `<SlideImage src="/presentations/generated/{filename}" />` 로 참조.

---

## 비용 가이드

| 설정 | 이미지당 비용 | 2장 기준 |
|------|-------------|---------|
| 4K × 2장 | ~$0.15 | ~$0.30 |
| 2K × 2장 | ~$0.09 | ~$0.18 |
| 1K × 4장 | ~$0.05 | ~$0.20 |

프로토타이핑 시 `imageSize: "1K"` + `numberOfImages: 4`로 후보 탐색,
확정 후 `imageSize: "4K"` + `numberOfImages: 1`로 최종본 생성.

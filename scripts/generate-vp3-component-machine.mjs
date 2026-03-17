/**
 * Nano Banana 2 — VP3 "Component Machine" Generator
 *
 * Design As Build 브랜드 일러스트 레퍼런스 이미지 생성.
 * 3층 컴포넌트 기계: INPUT → LOGIC → RENDER
 *
 * 사용법:
 *   node scripts/generate-vp3-component-machine.mjs
 */

import { GoogleGenAI } from '@google/genai';
import { writeFile, mkdir, readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, '..');
const OUTPUT_DIR = join(ROOT_DIR, 'src', 'assets', 'isometric');

// ── .env.local 로드 ──────────────────────────────────────
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

// ── API 설정 ──────────────────────────────────────────────
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL = 'gemini-3.1-flash-image-preview';

const GENERATION_CONFIG = {
  temperature: 0.5,
  topP: 0.85,
  maxOutputTokens: 8192,
  responseModalities: ['IMAGE'],
  imageConfig: {
    aspectRatio: '4:3',
    imageSize: '4K',
    numberOfImages: 2,
  },
};

// ── 스타일 레퍼런스 ──────────────────────────────────────
const STYLE_REFERENCE = join(
  ROOT_DIR,
  'src', 'reference', 'isometric',
  'Generated Image March 06, 2026 - 5_52PM (1).png',
);

// ── Base Prompt ──────────────────────────────────────────
const BASE_PROMPT = `\
Follow the visual style of the reference image exactly — same dark background, same isometric projection, same line quality and sophistication level. But change the COLOR of all strokes from gold/amber to cool off-white RGB(244, 244, 246), and change the background to solid RGB(10, 8, 12).

Keep these style qualities from the reference:
- Smooth, generously rounded corners on all objects (streamlined, modern radius — not sharp 90-degree edges)
- Small circular node markers where connection lines meet objects (like the reference's golden dots at junctions)
- Rich internal wireframe detail inside each object — subdivisions, nested panels, inner frames
- Every object has clear isometric 3D depth/thickness with visible top, front, and side faces
- Varied silhouettes — each object is a dramatically different shape
- Spread-out map composition with generous negative space between objects
- The central object is noticeably larger (2-3x) than surrounding objects
- Objects float in empty space, no ground plane, no background grid
- Clean vector-quality linework, two stroke weights (heavier silhouettes, finer internal detail)
- No solid fills, no gradients, no drop shadows — transparent faces showing dark background through

Do NOT include: text, labels, dimension lines, arrows, title lettering, or any written content. Only wireframe objects and connection lines with node dots.`;

// ── VP3 Subject Prompt ──────────────────────────────────
const SUBJECT = {
  name: 'design-as-build',
  prompt: `\
${BASE_PROMPT}

CRITICAL STYLE OVERRIDE: Absolutely NO solid fills anywhere. Every single shape — rectangles, circles, buttons, screens, brackets — must be OUTLINE STROKES ONLY. The dark background must show through every object. This is a pure wireframe/monoline illustration. If a shape looks "filled" or "solid white", it is WRONG. Only thin white outline strokes on dark background.

Subject: Three layers of depth receding into isometric space — a screen showing UI in front, the design anatomy floating behind it, and code floating behind that. Three distinct planes at different z-depths, not stacked vertically, but receding BACKWARD in isometric perspective.

FRONT (closest to viewer) — Screen with UI:
A large isometric screen or monitor outline (just the bezel frame, no fill). On the screen surface: a wireframe card UI component drawn in thin outlines — a small circle (status badge), two horizontal lines of different lengths (title and subtitle), a rounded rectangle outline (button), and a tiny cursor arrow shape near the button. Everything is transparent outlines only — the dark background shows through the screen and through every UI element.

MIDDLE (floating behind the screen) — Design Anatomy:
Behind and slightly above the screen, a floating transparent panel or frame. On it: a state machine diagram — four small circle outlines arranged in a diamond or loose pattern, connected by thin orthogonal path lines turning at right angles. One circle has a double ring (active state). The others are single-ring outlines. Thin directional connection lines link the nodes. This anatomy panel is visually "behind" the screen, partially overlapping, showing the invisible design decisions that govern the UI behavior.

BACK (furthest from viewer) — Code:
Behind everything, floating furthest back in isometric depth: a transparent rectangular frame containing code. Three to four thin horizontal lines of varying lengths at consistent vertical spacing (lines of code). A curly brace outline on the left edge. Indented shorter lines suggesting nested structure. Pure wireframe — every line is just a stroke, no fill.

From the CODE panel only: three thin horizontal annotation lines extend to the right, each ending with a small dot. These represent output values flowing from the code forward through the anatomy into the UI.

Thin connection lines with small junction dots link the three planes: code → anatomy → UI, showing the flow from back to front.

The three planes are arranged along the isometric z-axis — front, middle, back — creating a sense of depth. They partially overlap, letting the viewer see through all three transparent layers simultaneously.

Centered in the 4:3 frame. Generous negative space. Nothing else.`,
};

// ── 유틸 ─────────────────────────────────────────────────
async function imageToBase64(filepath) {
  const buffer = await readFile(filepath);
  return buffer.toString('base64');
}

// ── 생성 ─────────────────────────────────────────────────
async function generate() {
  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY 환경변수를 설정하세요.');
    process.exit(1);
  }

  await mkdir(OUTPUT_DIR, { recursive: true });

  console.log('🍌 Nano Banana 2 — VP3 Component Machine');
  console.log(`   Model: ${MODEL}`);
  console.log(`   Output: ${OUTPUT_DIR}`);
  console.log(`   Config: ${GENERATION_CONFIG.imageConfig.imageSize} × ${GENERATION_CONFIG.imageConfig.numberOfImages} images, temp ${GENERATION_CONFIG.temperature}`);
  console.log(`\n⏳ Generating: ${SUBJECT.name}...`);

  // 레퍼런스 이미지 + 프롬프트
  const refBase64 = await imageToBase64(STYLE_REFERENCE);
  const refMime = 'image/png';

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [{
      role: 'user',
      parts: [
        { inlineData: { mimeType: refMime, data: refBase64 } },
        { text: SUBJECT.prompt },
      ],
    }],
    generationConfig: GENERATION_CONFIG,
  });

  // 결과 저장
  const candidates = response.candidates || [];
  let savedCount = 0;

  for (const candidate of candidates) {
    const parts = candidate.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData) {
        const ext = part.inlineData.mimeType === 'image/png' ? 'png' : 'webp';

        // 버전 넘버링
        const { readdirSync } = await import('fs');
        const existing = readdirSync(OUTPUT_DIR).filter(
          (f) => f.startsWith(SUBJECT.name) && f.includes('_v'),
        );
        const maxVersion = existing.reduce((max, f) => {
          const m = f.match(/_v(\d+)\./);
          return m ? Math.max(max, parseInt(m[1])) : max;
        }, 0);
        const version = maxVersion + 1 + savedCount;
        const filename = `${SUBJECT.name}_v${version}.${ext}`;
        const filepath = join(OUTPUT_DIR, filename);

        await writeFile(filepath, Buffer.from(part.inlineData.data, 'base64'));
        console.log(`  ✅ Saved: ${filepath}`);
        savedCount++;
      }
    }
  }

  if (savedCount === 0) {
    console.log('  ⚠️  No images returned');
    const text = response.candidates?.[0]?.content?.parts?.find((p) => p.text)?.text;
    if (text) console.log(`  Response text: ${text.slice(0, 500)}`);
  }

  console.log(`\n🎉 Done! ${savedCount} images generated.`);
}

generate().catch((err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});

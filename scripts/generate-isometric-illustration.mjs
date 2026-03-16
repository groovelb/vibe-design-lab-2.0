/**
 * Nano Banana 2 — VDL Isometric Illustration Generator
 *
 * 사용법:
 *   node scripts/generate-isometric-illustration.mjs                    # 전체
 *   node scripts/generate-isometric-illustration.mjs card-anatomy       # 특정 주제만
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
const MODEL = 'gemini-3.1-flash-image-preview'; // Nano Banana 2

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

// ── Base Prompt (모든 생성에 공통) ────────────────────────
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

// ── Subject Prompts (VALUE_PROPOSITIONS용) ───────────────
const SUBJECTS = [
  {
    // VP1: System Over Drawing — "결과물보다 기준을 먼저 설계합니다"
    name: 'system-over-drawing',
    prompt: `\
Recreate this reference image as a LANDSCAPE 4:3 illustration, centered in the frame and filling the full canvas, with these modifications:

1. COLOR: All strokes in cool off-white RGB(244, 244, 246) instead of gold/amber. Background solid RGB(10, 8, 12).

2. TEXT: Replace "CLAUDE CODE" with nothing (remove it). Replace "AESTHETICS GUIDELINES" with "DESIGN SYSTEM". Keep all 5 right-side layer labels as they are.

3. SIMPLIFY each layer's surface content:
   - Typography: just "Ag" letterforms floating above the slab
   - Color & Theme: a neat row of 5 small outline circles on the surface — a color palette
   - Motion: 1-2 simple curved lines
   - Spatial Composition: a clean simple grid
   - Background & Detail: plain minimal slab

4. Remove background blueprint grid. Keep dimension lines on the left side. Keep node dots.

5. No color fills anywhere — pure outline strokes only. Keep the same isometric angle, slab thickness, rounded corners, and line quality as the reference.`,
  },
  {
    // VP2: The Vibe Standard — "AI가 알아듣는 표준 디자인 언어 체계"
    name: 'vibe-standard',
    // remix mode: sends v2 + v3 as dual reference
    remix: true,
    remix: true,
    remixRefs: [
      'src/assets/isometric/vibe-standard_v6.png',  // REF A: node quality + tree structure
    ],
    prompt: `\
Reference image A shows a taxonomy tree with premium-quality isometric node objects. Each node is a polished 3D slab with generous rounded corners and unique symbolic inner detail.

Create a NEW version that preserves A's node quality but rearranges the tree layout into ISOMETRIC DEPTH PERSPECTIVE:

- Same nodes, same shapes, same refined quality as reference A
- But arrange them on an isometric ground plane viewed from above-left at 30°
- Root at upper-back, level 2 spreading forward-left and forward-right along 30° diagonals, level 3 even further forward and wider
- Connection lines follow isometric diagonal axes with filled junction dots
- The composition fills the full 4:3 canvas with generous spacing

The key difference from reference A: instead of a FRONTAL symmetric diamond, the tree RECEDES INTO DEPTH — the root is small and far away at the back, the leaf nodes are close and large at the front. Like looking down a hallway of nodes.

Off-white strokes on dark background. No text. No fills. Two stroke weights.`,
  },
  {
    // VP3: Design As Build — "구현의 설계도가 되는 디자인 접근방식"
    name: 'design-as-build',
    prompt: `\
${BASE_PROMPT}

Subject: A design specification passing through a build pipeline and emerging as identical built UI — "design IS implementation."

The composition reads top-to-bottom (input → output):

TOP (Input) — a flat wireframe page layout slab: a recognizable page wireframe with a hero section (large rectangle), a 2-column card row (two small rectangles side by side), and a button bar (narrow strip). This represents the design specification. It has clean, precise outlines.

MIDDLE — 3 small processing modules stacked vertically with air gaps, each a distinct simple shape:
1. A flat hexagonal prism (Token Resolution — maps design decisions to system values)
2. A rectangular box with small horizontal slots on its front face (Component Binding — matches UI pieces to code components)
3. A flat rectangular frame with a grid subdivision inside (Layout Engine — arranges everything spatially)

Vertical connection lines link top input → module 1 → module 2 → module 3 → bottom output. Glow dot at every junction. Small downward arrow indicators on each line segment showing flow direction.

BOTTOM (Output) — the exact same page layout shape as the top input, but positioned below the pipeline. Same hero, same 2-column cards, same button bar — identical silhouette to the input above. The visual point: what goes in as design comes out as build, unchanged.

The top and bottom shapes must be clearly recognizable as the same layout — this is the core message. The pipeline transforms nothing visually; it only makes the design real.

Nothing else. No side objects. The vertical input-pipeline-output is the entire composition.`,
  },
];

// ── 스타일 레퍼런스 이미지 ────────────────────────────────
// 원본 레퍼런스 (중앙 정렬 구도)
const STYLE_REFERENCE = join(ROOT_DIR, 'src', 'reference', 'isometric', 'Generated Image March 06, 2026 - 5_52PM (1).png');

async function imageToBase64(filepath) {
  const buffer = await readFile(filepath);
  return buffer.toString('base64');
}

// ── 생성 ─────────────────────────────────────────────────
async function generateImage(subject) {
  console.log(`\n⏳ Generating: ${subject.name}...`);

  const parts = [];

  if (subject.remix && subject.remixRefs) {
    // remix mode: 여러 레퍼런스 이미지를 전송 (ROOT_DIR 기준 경로)
    for (const ref of subject.remixRefs) {
      const resolved = join(ROOT_DIR, ref);
      const refBase64 = await imageToBase64(resolved);
      const refMime = ref.endsWith('.png') ? 'image/png' : 'image/jpeg';
      parts.push({ inlineData: { mimeType: refMime, data: refBase64 } });
    }
  } else {
    // 기본 모드: 단일 스타일 레퍼런스
    const refBase64 = await imageToBase64(STYLE_REFERENCE);
    const refMime = STYLE_REFERENCE.endsWith('.png') ? 'image/png' : 'image/jpeg';
    parts.push({ inlineData: { mimeType: refMime, data: refBase64 } });
  }

  parts.push({ text: subject.prompt });

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [{
      role: 'user',
      parts,
    }],
    generationConfig: GENERATION_CONFIG,
  });

  const candidates = response.candidates || [];
  let savedCount = 0;

  for (const candidate of candidates) {
    const parts = candidate.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData) {
        const ext = part.inlineData.mimeType === 'image/png' ? 'png' : 'webp';
        // 버전 넘버링: 기존 파일 확인 후 다음 번호 부여
        const { readdirSync } = await import('fs');
        const existing = readdirSync(OUTPUT_DIR).filter(f => f.startsWith(subject.name) && f.includes('_v'));
        const maxVersion = existing.reduce((max, f) => {
          const match = f.match(/_v(\d+)\./);
          return match ? Math.max(max, parseInt(match[1])) : max;
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

// ── main ─────────────────────────────────────────────────
async function main() {
  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY 환경변수를 설정하세요.');
    process.exit(1);
  }

  await mkdir(OUTPUT_DIR, { recursive: true });
  console.log('🍌 Nano Banana 2 — VDL Isometric Illustration Generator');
  console.log(`   Model: ${MODEL}`);
  console.log(`   Output: ${OUTPUT_DIR}`);
  console.log(`   Config: ${GENERATION_CONFIG.imageConfig.imageSize} × ${GENERATION_CONFIG.imageConfig.numberOfImages} images, temp ${GENERATION_CONFIG.temperature}`);

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

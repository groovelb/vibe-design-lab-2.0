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
    aspectRatio: '1:1',
    imageSize: '2K',
    numberOfImages: 2,
  },
};

// ── Base Prompt (모든 생성에 공통) ────────────────────────
const BASE_PROMPT = `\
A technical isometric illustration rendered as a dark-mode architectural blueprint.
30-degree axonometric parallel projection viewed from lower-left looking toward upper-right.
Deep dark background in solid RGB(10, 8, 12). All forms defined exclusively by thin outline strokes in cool off-white RGB(244, 244, 246). Faces are transparent, filled with the same color as the background, so objects appear as hollow wireframe volumes.
Two stroke weights only: heavier outlines for outer silhouettes, finer lines for internal structure details.
Slightly rounded corners on all edges. No drop shadows, no gradients, no surface textures, no fills.
Objects float suspended in empty space with no ground plane, no horizon line, no background grid.
Generous negative space between elements. Clean, vector-quality crisp linework.

STRUCTURAL RULES (critical):
- Every object must be clearly separated from every other object — no overlapping outlines. Each element must be independently identifiable as if it will be extracted as a separate SVG group.
- Connection lines must have clear start and end points. Every line connects exactly two specific objects. No decorative or ambient lines.
- Hierarchy reads in a single clear direction: either bottom-to-top (foundation → result) or top-to-bottom (input → output). The reading order must be unambiguous.
- Small glow dots appear ONLY at structural connection points where a line meets an object — never as decoration.
- Keep total element count low (under 15 distinct objects). Fewer clear elements is better than many cluttered ones.
- Each object should have a distinct, simple silhouette so it can be identified even without labels.`;

// ── Subject Prompts (VALUE_PROPOSITIONS용) ───────────────
const SUBJECTS = [
  {
    // VP1: System Over Drawing — "결과물보다 기준을 먼저 설계합니다"
    name: 'system-over-drawing',
    prompt: `\
${BASE_PROMPT}

Subject: Design system token layers building up to a finished component — "system before drawing."

The composition reads strictly bottom-to-top:

BOTTOM HALF — 5 thin flat rectangular slabs stacked vertically with generous air gaps between them. Each slab has a unique internal pattern so it is recognizable:
1. (lowest) A plain flat rectangle — the background canvas
2. A rectangle with a smaller rounded-rectangle drawn inside it — border tokens
3. A rectangle with a grid of small evenly-spaced dots inside — spacing scale
4. A rectangle with 3 small circles in a horizontal row — color palette
5. (highest of the 5) A rectangle with 3 horizontal lines of different thickness — typography scale

TOP — floating well above the 5th slab, one single larger Card wireframe. The card contains: a top media rectangle, two horizontal text lines of different weight, and a small rounded-rectangle button at the bottom. It is clearly a finished UI component.

CONNECTION — 5 separate straight diagonal lines, each originating from one token slab and reaching up to a different part of the card. The lines do NOT merge or bundle — each travels independently from its source slab to its target area on the card. Each line has a glow dot at both ends (where it leaves the slab and where it arrives at the card).

CRITICAL: No hexagonal frames, no enclosing shapes around the slabs. Each slab is a simple flat rectangle. The only shapes in the scene are the 5 slabs, the 1 card, and the 5 connection lines. Total: 11 elements.`,
  },
  {
    // VP2: The Vibe Standard — "AI가 알아듣는 표준 디자인 언어 체계"
    name: 'vibe-standard',
    prompt: `\
${BASE_PROMPT}

Subject: A taxonomy shelf where named standard components are organized — "naming creates consistency."

The composition is a 3-row isometric shelving unit (like an open bookshelf or display rack seen from the front-left), each shelf is a thin horizontal platform:

TOP SHELF — holds 3 small wireframe objects clearly spaced apart:
- A small rounded-rectangle (Button shape)
- A small rectangle with an inner circle (Avatar/Badge shape)
- A small horizontal bar with a triangle on one end (Input field with dropdown indicator)

MIDDLE SHELF — holds 3 different wireframe objects:
- A taller rectangle divided into top media + bottom text area (Card shape)
- A horizontal strip with 3 evenly spaced dots (Tab bar / Navigation shape)
- A small square with an X in the corner (Modal/Dialog shape)

BOTTOM SHELF — holds 2 wider wireframe objects:
- A wide rectangle divided into 2 columns (Grid layout shape)
- A tall narrow rectangle with stacked horizontal sections (Page scaffold shape)

Each shelf has a small rectangular tag hanging from its front edge — representing the taxonomy label/name for that row's category.

In front of the shelf unit, one component (a Card wireframe) is mid-flight, being placed onto an empty spot on the middle shelf. A dashed line traces its path from a floating position to its target slot. Glow dot at the target landing position.

The shelf structure itself has clear vertical supports on both sides connecting all 3 shelves — the scaffolding of the taxonomy system.

Nothing else. No extra mechanisms. The structure IS the message: named shelves organize components into a consistent standard.`,
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

// ── 생성 ─────────────────────────────────────────────────
async function generateImage(subject) {
  console.log(`\n⏳ Generating: ${subject.name}...`);

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [{
      role: 'user',
      parts: [{ text: subject.prompt }],
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
        const suffix = savedCount === 0 ? '' : `_v${savedCount + 1}`;
        const filename = `${subject.name}${suffix}.${ext}`;
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

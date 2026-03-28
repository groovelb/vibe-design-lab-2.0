/**
 * Nano Banana 2 — Audience Persona Image Generator
 *
 * course_cover_ver7b-1.png 톤에 맞춘 수강 대상 페르소나 이미지 3장 생성.
 *
 * 사용법:
 *   node scripts/generate-audience-images.mjs            # 전체
 *   node scripts/generate-audience-images.mjs designer   # designer만
 *   node scripts/generate-audience-images.mjs developer  # developer만
 *   node scripts/generate-audience-images.mjs lead       # lead만
 */

import { GoogleGenAI } from '@google/genai';
import { writeFile, mkdir, readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, '..');
const OUTPUT_DIR = join(ROOT_DIR, 'src/assets/audiance');

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
  temperature: 0.4,
  topP: 0.85,
  maxOutputTokens: 8192,
  responseModalities: ['IMAGE'],
  imageConfig: {
    aspectRatio: '4:3',
    imageSize: '4K',
    numberOfImages: 2,
  },
};

// ── 레퍼런스 이미지 (톤 기준) ─────────────────────────────
const REFERENCE_IMAGE = join(ROOT_DIR, 'public/assets/course/course_cover_ver7b-1.png');

// ── 공유 스타일 프롬프트 ──────────────────────────────────
const SHARED_STYLE = `\
Photorealistic cinematic portrait in a very dark studio.

COLOR GRADING (CRITICAL — use these exact tones):
- Background: hsl(260, 20%, 2%) — near-black with a violet undertone
- Dark surfaces: hsl(260, 12%, 8%) — barely visible edges
- UI panel glass: hsl(260, 8%, 14%) with 60% opacity — translucent dark violet-gray
- UI text and icons: hsl(260, 10%, 90%) — pale violet-white only
- Rim light on skin: hsl(260, 8%, 82%) — cool desaturated highlight
- NO pure white, NO saturated colors anywhere. Everything is tinted violet-gray.

SUBJECT: young East Asian person in their mid-to-late 20s, all-black attire. \
Serious, quietly intense expression — focused downward gaze, no smile, contemplative. \
Skin tone rendered with cool desaturated undertone.

FLOATING UI: semi-transparent glassmorphic panels floating in 3D space. \
Each panel has a very faint soft glow halo (hsl 260, 6%, 22% at 30% opacity) around its edges — \
this glow is the primary light source illuminating the person's face and hands. \
UI content is monochrome violet-gray only: thin outlined icons, small text, data visualizations. \
Panels at different depths create parallax layering.

LIGHTING: extremely low-key, underexposed. \
The UI panel glow is the dominant light source — it casts soft diffused light on the person's face. \
Very subtle cool rim light (hsl 260, 5%, 58%) on the edge of jaw and shoulders. \
80% of the frame is deep shadow. Chiaroscuro contrast.

Shot on Sony A7IV with 35mm f/1.8 lens, underexposed by 2 stops. \
Color graded with heavy lift in shadows toward violet.`;

// ── 페르소나별 프롬프트 ───────────────────────────────────
const PROMPTS = [
  {
    name: 'a1_designer',
    content: `\
${SHARED_STYLE}

A young East Asian woman product designer seated at a dark desk, \
both hands typing on a keyboard with fluid precision. She wears a \
black turtleneck and oversized black blazer, hair tied in a low bun. \
Her eyes are fixed on a large floating design canvas ahead.

Floating holographic UI around her:
- A large Figma-style design canvas tilted at an angle on the left side
- Color palette swatches in a vertical strip
- Typography scale showing font size hierarchy
- Component cards with button and input previews
- A layers panel with stacked rectangles
- Grid overlay lines faintly visible on the canvas

Composition: figure center-right, design UI elements spread to the left.
She gazes at the canvas with quiet intensity while typing.`,
  },
  {
    name: 'a2_developer',
    content: `\
${SHARED_STYLE}

A young East Asian man frontend developer sitting at a minimal \
dark desk, typing on a laptop keyboard. He wears a black baseball \
cap, black hoodie, and looks at the screen with concentration.

Floating holographic UI around him:
- A code editor window showing React JSX syntax with colored \
syntax highlighting, the largest panel on the center-right
- A terminal window with green-on-dark command output below it
- A browser preview showing a rendered web interface on the right side
- Small npm package cards and git branch indicators floating nearby
- A component tree diagram with connected nodes
- Code snippet text: import Component from react

Composition: figure center-left, code and browser UI extending \
to the right. The laptop screen glows softly, illuminating his face.`,
  },
  {
    name: 'a3_lead',
    content: `\
${SHARED_STYLE}

A young East Asian woman in her late 20s, team lead role. \
Standing upright with quiet confidence, wearing a black minimalist \
blazer over a black turtleneck. One hand slightly raised, \
lightly touching a floating UI panel. Calm, focused expression — \
no smile, eyes looking at the panel with intent.

Floating holographic UI around her — all monochrome, white-on-dark-glass only:
- A project timeline with horizontal bars stretching across the top
- A kanban board with white text columns on the left
- Small circular avatar placeholders with thin white outlines on the right
- A simple bar chart dashboard panel with white lines
- A workflow diagram with white-outlined connected nodes
- Thin white notification dot indicators

Composition: figure centered, management UI spread symmetrically \
on both sides. Everything is extremely dark and desaturated — \
the UI panels are barely visible, like ghosts in the darkness.`,
  },
];

// ── 유틸 ─────────────────────────────────────────────────
async function imageToBase64(filepath) {
  const buffer = await readFile(filepath);
  return buffer.toString('base64');
}

function getMimeType(filepath) {
  if (filepath.endsWith('.webp')) return 'image/webp';
  if (filepath.endsWith('.png')) return 'image/png';
  if (filepath.endsWith('.jpg') || filepath.endsWith('.jpeg')) return 'image/jpeg';
  return 'image/png';
}

// ── 생성 ─────────────────────────────────────────────────
async function generateImage(promptData) {
  console.log(`\n⏳ Generating: ${promptData.name}...`);

  const refBase64 = await imageToBase64(REFERENCE_IMAGE);
  const refMimeType = getMimeType(REFERENCE_IMAGE);

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [{
      role: 'user',
      parts: [
        { inlineData: { mimeType: refMimeType, data: refBase64 } },
        {
          text: `CRITICAL TONE REFERENCE: The attached image defines the EXACT color grading, \
darkness level, and lighting you must replicate. Study it carefully:
- The background is nearly pure black with a violet tint
- The person's face is lit ONLY by the soft glow emanating from floating UI panels
- All UI elements have a subtle luminous glow halo around their edges
- The color palette is strictly monochrome violet-gray — no saturated colors
- The overall exposure is very dark, like underexposed film
- The UI glow creates the cinematic atmosphere — it's the key visual element

Match this EXACTLY. Do NOT make the image brighter. Do NOT add any color. \
The result must look like the next frame in the same film.\n\n${promptData.content}`,
        },
      ],
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
        const filename = `${promptData.name}${suffix}.${ext}`;
        const filepath = join(OUTPUT_DIR, filename);

        await writeFile(filepath, Buffer.from(part.inlineData.data, 'base64'));
        console.log(`  ✅ Saved: ${filepath}`);
        savedCount++;
      }
    }
  }

  if (savedCount === 0) {
    console.log(`  ⚠️  No images returned for ${promptData.name}`);
    console.log('  Response:', JSON.stringify(response, null, 2).slice(0, 500));
  }

  return savedCount;
}

// ── main ─────────────────────────────────────────────────
async function main() {
  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY 환경변수를 설정하세요.');
    console.error('   .env.local 파일에 GEMINI_API_KEY=your-key 추가 또는');
    console.error('   export GEMINI_API_KEY=your-key 실행');
    process.exit(1);
  }

  await mkdir(OUTPUT_DIR, { recursive: true });
  console.log('🍌 Nano Banana 2 — Audience Persona Image Generator');
  console.log(`   Model: ${MODEL}`);
  console.log(`   Reference: ${REFERENCE_IMAGE}`);
  console.log(`   Output: ${OUTPUT_DIR}`);
  console.log(`   Settings: 4K, 4:3, temp 0.4, 2 variants each`);

  const target = process.argv[2];
  const filtered = target
    ? PROMPTS.filter(p => p.name.includes(target))
    : PROMPTS;

  if (filtered.length === 0) {
    console.error(`❌ "${target}" 에 매칭되는 프롬프트가 없습니다.`);
    console.error(`   사용 가능: designer, developer, lead`);
    process.exit(1);
  }

  console.log(`   Targets: ${filtered.map(p => p.name).join(', ')}`);

  let totalImages = 0;
  for (const promptData of filtered) {
    totalImages += await generateImage(promptData);
  }

  console.log(`\n🎉 Done! ${totalImages} images generated in ${OUTPUT_DIR}`);
}

main().catch((err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});

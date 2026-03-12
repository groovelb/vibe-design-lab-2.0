/**
 * Nano Banana — Persona Illustration Generator (v5)
 *
 * canvas_designer: 레퍼런스 없이 순수 텍스트 (fill 방지)
 * pipeline_developer: 레퍼런스 + 텍스트
 *
 * 사용법:
 *   node scripts/generate-persona-illustrations.mjs
 *
 * 결과:
 *   public/persona/canvas_designer_line.png
 *   public/persona/pipeline_developer_line.png
 */

import { GoogleGenAI } from '@google/genai';
import { writeFile, mkdir, readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, '..');
const OUTPUT_DIR = join(ROOT_DIR, 'public', 'persona');

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
const MODEL = 'gemini-2.5-flash-image';

// 이미지 생성용 config
const IMAGE_CONFIG = {
  temperature: 0.4,
  topP: 0.85,
  maxOutputTokens: 8192,
  responseModalities: ['IMAGE'],
  imageConfig: {
    aspectRatio: '4:3',
    imageSize: '2K',
    numberOfImages: 1,
  },
};

// 텍스트 묘사용 config
const TEXT_CONFIG = {
  temperature: 0.2,
  maxOutputTokens: 4096,
  responseModalities: ['TEXT'],
};

// ── SHARED 라인아트 스타일 ────────────────────────────────
const LINE_ART_STYLE = `\
Pure line drawing illustration using exactly two colors:
Background: solid RGB(10, 8, 12) — very dark near-black.
Lines: RGB(244, 244, 246) — thin outline strokes only.

Every shape is a hollow outline — the dark background is visible \
through every form. Zero fill, zero shading, zero gradients. \
Single consistent thin stroke weight. Round line caps. \
Isometric projection at approximately 30 degrees.`;

// ── CONTENT 템플릿 ────────────────────────────────────────
const PROMPTS = [
  {
    name: 'canvas_designer_line',
    referenceImage: join(ROOT_DIR, 'src/assets/persona/canvas_designer.webp'),
    twoStep: true,
    content: `\
Important: maintain the exact isometric angle from the description. \
The Figma logo must be clearly recognizable — three overlapping \
rounded rectangle outlines arranged vertically.`,
  },
  {
    name: 'pipeline_developer_line',
    referenceImage: join(ROOT_DIR, 'public/persona/pipeline_developer.webp'),
    content: `\
The provided image is ONLY a composition reference for the \
character's pose and proportions. Do NOT reproduce its rendering \
style. Instead, redraw the entire scene from scratch as a pure \
two-color line drawing following the strict rules above.

Draw these elements:
- A young man wearing a cap, sitting with a keyboard on his lap — \
his body, hoodie, cap, and shoes are all hollow outlines, the \
dark background visible through his entire figure
- A single isometric monitor outline floating in front of him, \
containing thin horizontal lines suggesting code and a terminal \
prompt — the screen is a transparent rectangle, not filled

Behind the developer, draw a virtual node-based development pipeline:
- Four to five rounded-rectangle node outlines floating in \
isometric space, labeled CODE, BUILD, TEST, DEPLOY
- Thin connecting lines with small arrow indicators showing \
data flow direction from left to right
- Small dots along the connection lines suggesting data packets
- The developer sits at the center node as a station in the flow
- The graph feels like a clean digital flowchart — abstract nodes \
and lines, not physical machinery

Every single element — the developer, the monitor, every node, \
every connection line — must be drawn as transparent outline \
contours only. If you can imagine drawing this on a black sheet \
with a single thin white pen, that is the look. Absolutely zero \
white-filled or gray-filled areas anywhere in the image.`,
  },
];

// ── 이미지 → base64 변환 ─────────────────────────────────
async function imageToBase64(filepath) {
  const buffer = await readFile(filepath);
  return buffer.toString('base64');
}

function getMimeType(filepath) {
  if (filepath.endsWith('.webp')) return 'image/webp';
  if (filepath.endsWith('.png')) return 'image/png';
  if (filepath.endsWith('.jpg') || filepath.endsWith('.jpeg')) return 'image/jpeg';
  return 'image/webp';
}

// ── Step 1: 이미지 → 텍스트 묘사 ─────────────────────────
async function describeImage(imagePath) {
  console.log(`   📝 Step 1: Describing composition...`);
  const imageBase64 = await imageToBase64(imagePath);
  const mimeType = getMimeType(imagePath);

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [{
      role: 'user',
      parts: [
        { inlineData: { mimeType, data: imageBase64 } },
        { text: `Describe this illustration in extreme detail for an artist to recreate it exactly. Include:
- Exact position of every element (use percentages from left/top)
- The woman's exact pose, hair style, clothing, body angle
- The floating UI interface: exact angle, size relative to the woman, panel layout
- The Figma logo position and shape
- The sidebar content and layout
- Spacing and negative space
- Isometric angle and perspective
Do NOT describe colors or shading — only shapes, positions, and proportions.` },
      ],
    }],
    generationConfig: TEXT_CONFIG,
  });

  const text = response.candidates?.[0]?.content?.parts
    ?.filter(p => p.text)
    ?.map(p => p.text)
    ?.join('') || '';
  console.log(`   📝 Description: ${text.slice(0, 200)}...`);
  return text;
}

// ── Step 2: 텍스트 묘사 → 라인아트 생성 ──────────────────
async function generateImage(promptData) {
  console.log(`\n⏳ Generating: ${promptData.name}...`);

  let fullPrompt;

  if (promptData.twoStep) {
    // 2단계: 먼저 원본 묘사 → 묘사 기반 생성 (이미지 레퍼런스 없음)
    const description = await describeImage(promptData.referenceImage);
    fullPrompt = `${LINE_ART_STYLE}\n\nDraw the following scene as a pure line drawing:\n\n${description}\n\n${promptData.content}`;
    console.log(`   🎨 Step 2: Generating line art from description (no image ref)...`);

    const response = await ai.models.generateContent({
      model: MODEL,
      contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
      generationConfig: IMAGE_CONFIG,
    });
    return saveImages(response, promptData.name);
  }

  // 기존 방식: 이미지 레퍼런스 + 프롬프트
  fullPrompt = `${LINE_ART_STYLE}\n\n${promptData.content}`;
  const parts = [];
  if (promptData.referenceImage) {
    const imageBase64 = await imageToBase64(promptData.referenceImage);
    const mimeType = getMimeType(promptData.referenceImage);
    parts.push({ inlineData: { mimeType, data: imageBase64 } });
    console.log(`   Reference: ${promptData.referenceImage}`);
  }
  parts.push({ text: fullPrompt });

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [{ role: 'user', parts }],
    generationConfig: IMAGE_CONFIG,
  });
  return saveImages(response, promptData.name);
}

async function saveImages(response, name) {

  const candidates = response.candidates || [];
  let savedCount = 0;

  for (const candidate of candidates) {
    const parts = candidate.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData) {
        const ext = part.inlineData.mimeType === 'image/png' ? 'png' : 'webp';
        const suffix = savedCount === 0 ? '' : `_${savedCount + 1}`;
        const filename = `${name}${suffix}.${ext}`;
        const filepath = join(OUTPUT_DIR, filename);

        await writeFile(filepath, Buffer.from(part.inlineData.data, 'base64'));
        console.log(`  ✅ Saved: ${filepath}`);
        savedCount++;
      }
    }
  }

  if (savedCount === 0) {
    console.log(`  ⚠️  No images returned for ${name}`);
    console.log('  Response:', JSON.stringify(response, null, 2).slice(0, 500));
  }

  return savedCount;
}

async function main() {
  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY 환경변수를 설정하세요.');
    process.exit(1);
  }

  await mkdir(OUTPUT_DIR, { recursive: true });
  console.log('🍌 Nano Banana — Persona Illustration Generator (v2)');
  console.log(`   Model: ${MODEL}`);
  console.log(`   Mode: Reference image + SHARED/CONTENT template`);
  console.log(`   Output: ${OUTPUT_DIR}`);

  // canvas_designer만 재생성 (pipeline은 v5 결과 유지)
  const target = process.argv[2]; // 'canvas' | 'pipeline' | undefined(전체)
  const filtered = target
    ? PROMPTS.filter(p => p.name.includes(target))
    : PROMPTS;

  let totalImages = 0;
  for (const promptData of filtered) {
    totalImages += await generateImage(promptData);
  }

  console.log(`\n🎉 Done! ${totalImages} images generated.`);
}

main().catch((err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});

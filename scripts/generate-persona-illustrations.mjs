/**
 * Nano Banana 2 — Persona Illustration Generator
 *
 * 사용법:
 *   node scripts/generate-persona-illustrations.mjs          # 전체
 *   node scripts/generate-persona-illustrations.mjs canvas    # canvas만
 *   node scripts/generate-persona-illustrations.mjs pipeline  # pipeline만
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
const MODEL = 'gemini-3.1-flash-image-preview'; // Nano Banana 2

const GENERATION_CONFIG = {
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

// ── 스타일 프롬프트 ──────────────────────────────────────
const STYLE_PROMPT = `\
Convert this image to a pure line drawing. Keep every element, \
position, proportion, and composition exactly the same. \
Only change the rendering style:
- Background: solid RGB(10, 8, 12)
- All visible elements: thin outline strokes in RGB(244, 244, 246) only
- Remove all fill — every white/gray surface becomes transparent \
(dark background visible through it)
- Every shape is a hollow outline contour only
- Single consistent thin stroke weight`;

// ── 이미지 목록 ──────────────────────────────────────────
const PROMPTS = [
  {
    name: 'canvas_designer_line',
    referenceImage: join(ROOT_DIR, 'src/assets/persona/canvas_designer.webp'),
    content: '',
  },
  {
    name: 'pipeline_developer_line',
    referenceImage: join(ROOT_DIR, 'public/persona/pipeline_developer.webp'),
    content: `\
Behind the developer, add a virtual node-based development pipeline: \
four to five rounded-rectangle node outlines labeled CODE, BUILD, TEST, \
DEPLOY, connected by thin lines with arrow indicators. The developer \
sits at the center node. Keep only one monitor.`,
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
  return 'image/webp';
}

// ── 생성 ─────────────────────────────────────────────────
async function generateImage(promptData) {
  console.log(`\n⏳ Generating: ${promptData.name}...`);
  console.log(`   Reference: ${promptData.referenceImage}`);

  const imageBase64 = await imageToBase64(promptData.referenceImage);
  const mimeType = getMimeType(promptData.referenceImage);
  const fullPrompt = promptData.content
    ? `${STYLE_PROMPT}\n\n${promptData.content}`
    : STYLE_PROMPT;

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [{
      role: 'user',
      parts: [
        { inlineData: { mimeType, data: imageBase64 } },
        { text: fullPrompt },
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
        const suffix = savedCount === 0 ? '' : `_${savedCount + 1}`;
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
    process.exit(1);
  }

  await mkdir(OUTPUT_DIR, { recursive: true });
  console.log('🍌 Nano Banana 2 — Persona Illustration Generator');
  console.log(`   Model: ${MODEL}`);
  console.log(`   Output: ${OUTPUT_DIR}`);

  const target = process.argv[2];
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

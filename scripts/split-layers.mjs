/**
 * Split system-over-drawing into 5 individual layer images using Gemini
 * 병렬로 5개 동시 생성
 */

import { GoogleGenAI } from '@google/genai';
import { writeFile, mkdir, readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, '..');
const OUTPUT_DIR = join(ROOT_DIR, 'src', 'assets', 'isometric', 'layers');

// .env.local 로드
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

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL = 'gemini-3.1-flash-image-preview';

const GENERATION_CONFIG = {
  temperature: 0.2,
  topP: 0.8,
  maxOutputTokens: 8192,
  responseModalities: ['IMAGE'],
  imageConfig: {
    aspectRatio: '4:3',
    imageSize: '4K',
    numberOfImages: 1,
  },
};

const REF_IMAGE = join(ROOT_DIR, 'src', 'assets', 'isometric', 'system-over-drawing_v7.png');

const LAYERS = [
  {
    name: '1_typography',
    prompt: `This image shows 5 stacked isometric slab layers. Keep ONLY the top slab — the largest one with 'Ag' letterforms on its surface, plus the 'DESIGN SYSTEM' title text in the top-left and the 'TYPOGRAPHY' label with its connecting line on the right, and the dimension lines (5.86", 0.56") on the left. Remove all other 4 slabs completely, replacing them with the same solid dark background. Keep canvas size and background color exactly unchanged.`,
  },
  {
    name: '2_color_theme',
    prompt: `This image shows 5 stacked isometric slab layers. Keep ONLY the second slab from the top — the one with oval/pill shapes on its top surface and circular dots on its right face, plus the 'COLOR & THEME' label with its connecting line on the right, and the 0.56" dimension line on the left. Remove all other 4 slabs completely, replacing them with the same solid dark background. Keep canvas size and background color exactly unchanged.`,
  },
  {
    name: '3_motion',
    prompt: `This image shows 5 stacked isometric slab layers. Keep ONLY the middle slab — the one with curved bezier lines on its top surface and a small circle, plus the 'MOTION' label with its connecting line on the right, and the 0.56" dimension line on the left. Remove all other 4 slabs completely, replacing them with the same solid dark background. Keep canvas size and background color exactly unchanged.`,
  },
  {
    name: '4_spatial_composition',
    prompt: `This image shows 5 stacked isometric slab layers. Keep ONLY the fourth slab from top — the one with a diamond grid pattern on its surface, plus the 'SPATIAL COMPOSITION' label with its connecting line on the right, the 0.56" dimension line and '18"' dimension line on the left. Remove all other 4 slabs completely, replacing them with the same solid dark background. Keep canvas size and background color exactly unchanged.`,
  },
  {
    name: '5_background_detail',
    prompt: `This image shows 5 stacked isometric slab layers. Keep ONLY the bottom slab — the plainest one at the very bottom with minimal surface detail, plus the 'BACKGROUND & DETAIL' label with its connecting line on the right, the 0.36" dimension line and '180°' dimension line on the left. Remove all other 4 slabs completely, replacing them with the same solid dark background. Keep canvas size and background color exactly unchanged.`,
  },
];

async function generateLayer(layer) {
  console.log(`⏳ ${layer.name} — generating...`);

  const refBuffer = await readFile(REF_IMAGE);
  const refBase64 = refBuffer.toString('base64');

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [{
      role: 'user',
      parts: [
        { inlineData: { mimeType: 'image/png', data: refBase64 } },
        { text: layer.prompt },
      ],
    }],
    generationConfig: GENERATION_CONFIG,
  });

  const candidates = response.candidates || [];
  for (const candidate of candidates) {
    const parts = candidate.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData) {
        const ext = part.inlineData.mimeType === 'image/png' ? 'png' : 'webp';
        const filepath = join(OUTPUT_DIR, `${layer.name}.${ext}`);
        await writeFile(filepath, Buffer.from(part.inlineData.data, 'base64'));
        console.log(`✅ ${layer.name} — saved: ${filepath}`);
        return true;
      }
    }
  }

  console.log(`⚠️ ${layer.name} — no image returned`);
  const text = response.candidates?.[0]?.content?.parts?.find(p => p.text)?.text;
  if (text) console.log(`   Text: ${text.slice(0, 200)}`);
  return false;
}

async function main() {
  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY required');
    process.exit(1);
  }

  await mkdir(OUTPUT_DIR, { recursive: true });
  console.log('🍌 Layer Splitter — 5 parallel generations');
  console.log(`   Model: ${MODEL}`);
  console.log(`   Reference: ${REF_IMAGE}`);
  console.log(`   Output: ${OUTPUT_DIR}\n`);

  // 병렬 실행
  const results = await Promise.all(LAYERS.map(layer => generateLayer(layer)));
  const success = results.filter(Boolean).length;
  console.log(`\n🎉 Done! ${success}/${LAYERS.length} layers generated`);
}

main().catch((err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});

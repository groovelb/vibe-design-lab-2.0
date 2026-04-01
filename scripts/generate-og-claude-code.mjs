/**
 * Nano Banana 2 — Claude Code Experiment OG Image Generator
 *
 * 사용법:
 *   node scripts/generate-og-claude-code.mjs
 */

import { GoogleGenAI } from '@google/genai';
import { writeFile, readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, '..');
const OUTPUT_DIR = join(ROOT_DIR, 'public');

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
    aspectRatio: '16:9',
    imageSize: '1K',
    numberOfImages: 2,
  },
};

const PROMPT = `\
I'm providing two reference images.

Image 1: The background — a terminal screen with orange monospace source code on black.
Image 2: "Claw'd" — a pixel-art mascot character (orange blocky creature with black eyes).

Create a new OG image (16:9) combining them:

BACKGROUND:
- Use Image 1 as the full background, but apply a heavy dark filter overlay.
  The code text should be barely visible — about 20-30% opacity — so it reads as a dark,
  moody texture rather than readable code. Pure black with faint orange code ghosting through.

MASCOT:
- Place the Claw'd character from Image 2 in the upper-center area of the image,
  above the title text. Render it in the same pixel-art / voxel style as the reference,
  keeping the orange (#E57B55) body and black eyes faithful to the original.
  Size it to be prominent but not overwhelming — roughly 20-25% of the image height.

TITLE TEXT:
- Below the mascot, centered, large bold monospace text: "512,000 LINES LEAKED"
  in bright orange (#FF6B2C) with a subtle digital glow/bloom effect.
- The text should be the visual focal point after the mascot.

OVERALL:
- Cinematic 16:9 composition, dark and dramatic.
- Cybersecurity forensics aesthetic — clean, minimal, high contrast.
- The mascot adds personality to the otherwise cold terminal look.
`;

// ── 레퍼런스 이미지 로드 ─────────────────────────────────
const REF_BG = join(OUTPUT_DIR, 'og-claude-code-v1.webp');
const REF_MASCOT = join(ROOT_DIR, 'src/assets/images.png');

// ── 생성 ─────────────────────────────────────────────────
async function main() {
  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY 환경변수를 설정하세요.');
    process.exit(1);
  }

  console.log('🍌 Nano Banana 2 — Claude Code OG Generator (v2 with refs)');
  console.log(`   Model: ${MODEL}`);
  console.log(`   Output: ${OUTPUT_DIR}`);

  // 레퍼런스 이미지를 base64로 로드
  const bgData = await readFile(REF_BG);
  const mascotData = await readFile(REF_MASCOT);

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [{
      role: 'user',
      parts: [
        { inlineData: { mimeType: 'image/webp', data: bgData.toString('base64') } },
        { inlineData: { mimeType: 'image/png', data: mascotData.toString('base64') } },
        { text: PROMPT },
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
        savedCount++;
        const filename = `og-claude-code-v${savedCount}.${ext}`;
        const filepath = join(OUTPUT_DIR, filename);
        await writeFile(filepath, Buffer.from(part.inlineData.data, 'base64'));
        console.log(`  ✅ Saved: ${filepath}`);
      }
    }
  }

  if (savedCount === 0) {
    console.log('  ⚠️  No images returned');
    const text = response.candidates?.[0]?.content?.parts?.find(p => p.text)?.text;
    if (text) console.log(`  Response text: ${text.slice(0, 500)}`);
  } else {
    console.log(`\n🎉 Done! ${savedCount} images generated`);
    console.log('   마음에 드는 것을 app/experiment/claude-code/opengraph-image.png로 복사하세요.');
  }
}

main().catch((err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});

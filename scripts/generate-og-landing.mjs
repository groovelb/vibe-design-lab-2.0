/**
 * Nano Banana 2 — VDL Landing OG Image Generator
 *
 * 사용법:
 *   node scripts/generate-og-landing.mjs
 */

import { GoogleGenAI } from '@google/genai';
import { writeFile, mkdir, readFile } from 'fs/promises';
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
  temperature: 0.4,
  topP: 0.85,
  maxOutputTokens: 8192,
  responseModalities: ['IMAGE'],
  imageConfig: {
    aspectRatio: '16:9',
    imageSize: '4K',
    numberOfImages: 2,
  },
};

// ── VDL violetGray 색상 참조 ─────────────────────────────
// 950: hsl(260, 20%, 2%)  ≈ #050408  (배경 default)
// 900: hsl(260, 16%, 4%)  ≈ #0a0810  (배경 paper)
// 800: hsl(260, 12%, 8%)  ≈ #141220  (그라데이션 상단)
// 700: hsl(260, 8%, 14%)  ≈ #222030
// 100: hsl(260, 10%, 90%) ≈ #E3E1E8  (텍스트 primary)

const PROMPT = `\
Create a minimal, premium Open Graph image for a brand called "VIBE DESIGN LAB".

EXACT SPECIFICATIONS:
- Landscape 16:9 composition
- Background: extremely dark violet-gray gradient. Base color is near-black with a subtle purple/violet undertone (like RGB(5, 4, 8) to RGB(20, 18, 32)). The gradient goes from slightly lighter at the top to pure dark at the bottom. Very subtle, almost imperceptible transition.
- Center of the image: the text "VIBE DESIGN LAB" in bold sans-serif uppercase (like Inter Black or Helvetica Black weight)
- Text color: cool off-white with slight violet tint (like RGB(227, 225, 232))
- Text has a soft white GLOW effect — a gentle luminous bloom radiating outward from the letters. The glow should feel like light emanating from the text itself, not a harsh outline. Think of a neon sign photographed with slight lens bloom.
- The glow intensity should be subtle and elegant — enough to create atmosphere but not overpowering
- Letter spacing: slightly wider than default (tracked out ~3%)
- Word spacing: generous, about 30% wider than default
- Font size: large and commanding, filling about 60% of the horizontal width

STRICT CONSTRAINTS:
- NO other elements — no icons, no taglines, no decorations, no patterns, no borders
- NO grid, no lines, no shapes — ONLY the text on the dark background
- The dark background should feel rich and deep, not flat black
- Overall mood: sophisticated, minimal, authoritative — like a high-end design studio
- Clean and sharp rendering, no noise or grain
`;

// ── 생성 ─────────────────────────────────────────────────
async function main() {
  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY 환경변수를 설정하세요.');
    process.exit(1);
  }

  console.log('🍌 Nano Banana 2 — VDL Landing OG Generator');
  console.log(`   Model: ${MODEL}`);
  console.log(`   Output: ${OUTPUT_DIR}`);

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [{ role: 'user', parts: [{ text: PROMPT }] }],
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
        const filename = `og-landing-v${savedCount}.${ext}`;
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
    console.log('   마음에 드는 것을 app/opengraph-image.png로 복사하세요.');
  }
}

main().catch((err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});

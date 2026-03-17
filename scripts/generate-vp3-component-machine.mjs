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

CRITICAL: Pure monoline — NO solid fills. Every shape is transparent outline only.
Dark background shows through all surfaces.

TEXT EXCEPTION: The back panel shows legible code in monospace font.
State labels (idle, hover, active, disabled) are allowed on the middle panel.
This overrides the "no text" rule for those panels only.

ORIENTATION OVERRIDE: These are NOT flat-lying platforms.
All three objects are STANDING UPRIGHT — LANDSCAPE (wider than tall)
rectangular screens, like widescreen monitors or cinema displays.
Aspect ratio roughly 16:10 landscape. They are much wider than they
are tall, and much taller than they are deep (thin).
Think of three widescreen monitors standing on a desk, viewed from a
3/4 isometric angle.

Subject: Three upright LANDSCAPE screen panels arranged in DEPTH, receding from
front-left (closest, largest) to back-right (furthest, smallest).
Their bottom edges rest on the isometric ground diagonal running
top-right to bottom-left. Each panel shows:
- A large FRONT FACE (wide landscape parallelogram — the content surface)
- A thin LEFT-SIDE EDGE strip (showing shallow thickness)
- A thin TOP EDGE strip (connecting front to back)
- Generously rounded corners on the front face

BACK PANEL (upper-right, smallest) — CODE:
A small standing screen. On its front face, real JSX code in
small monospace font:
  function Card() {
    const [state, setState]
      = useState('idle')
    return (
      <div onHover={setState}>
        <Badge status />
        <Button onClick />
      </div>
    )
  }
Legible curly braces, JSX angle brackets, function keywords.

MIDDLE PANEL (center, medium) — DESIGN ANATOMY:
A medium standing screen. On its front face, a state machine:
- Four circle nodes: "idle" at top, "hover" at left, "active"
  at right, "disabled" at bottom
- Connected by thin orthogonal right-angle path lines
- The "active" node is visually distinct (double-ring or larger)
- Below the diagram: two short annotation lines
  (onHover → setState, onClick → handler)

FRONT PANEL (lower-left, largest) — UI SCREEN:
The largest widescreen landscape display, showing a trendy modern SaaS dashboard UI:
- Top navigation bar: small logo mark, three nav pill links, avatar circle on far right
- Main content area split into two columns:
  LEFT COLUMN (wider): A large hero card with generous rounded corners —
    status badge pill (small rounded rectangle) upper-left,
    bold title line, lighter subtitle line,
    two body text lines,
    prominent call-to-action button with rounded corners at bottom
  RIGHT COLUMN (narrower): A vertical stack of 3 small metric cards,
    each with a number line and a tiny sparkline graph
- A cursor arrow hovering over the CTA button
- Overall feel: clean SaaS product like Linear, Vercel, or Stripe dashboard
All UI elements are crisp wireframe outlines — trendy, modern, spacious layout
with generous whitespace between elements.

DASHED CONNECTION LINES between matching elements across panels:
- Code "<Badge status />" to Anatomy "idle" node to UI status badge pill
- Code "<Button onClick />" to Anatomy "active" node to UI CTA button
CRITICAL: Every dashed line must be a PERFECTLY STRAIGHT LINE — no curves,
no bends, no zigzags. Each line is a single straight segment from point A
to point B, passing through the intermediate panel. Like a laser beam.
Small filled junction dots at every endpoint (6 dots total: 2 lines × 3 panels).
These straight dotted traces are the KEY STORYTELLING DEVICE — they prove
each UI element maps through design anatomy to exact code.

SPACING: The three panels decrease in size from front (2x) to back (1x).
Even depth spacing between them. The front UI panel dominates the
composition. Generous negative space on all sides.

Centered in 4:3 frame. Nothing else.`,
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

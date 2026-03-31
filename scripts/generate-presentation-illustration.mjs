/**
 * Nano Banana 2 — VDL Presentation Illustration Generator
 *
 * 사용법:
 *   node scripts/generate-presentation-illustration.mjs                       # 전체
 *   node scripts/generate-presentation-illustration.mjs car-design-process    # 특정 주제만
 */

import { GoogleGenAI } from '@google/genai';
import { writeFile, mkdir, readFile } from 'fs/promises';
import { readdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, '..');
const OUTPUT_DIR = join(ROOT_DIR, 'public', 'presentations', 'generated');

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
if (!process.env.GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY 환경변수를 설정하세요. (.env.local 또는 시스템 환경변수)');
  process.exit(1);
}
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL = 'gemini-3.1-flash-image-preview';

// ═══════════════════════════════════════════════════════════
// SHARED 프롬프트 — 유형별 스타일 정의 (수정 금지)
// ═══════════════════════════════════════════════════════════

const SHARED = {
  'mono-line': `\
Minimal mono-line illustration on a solid very dark near-black \
violet-gray background (approximately hsl 260, 20%, 4%).

Stroke rules:
- All forms defined exclusively by thin consistent white outline \
strokes (near-white, approximately RGB 230, 233, 236)
- All shapes are transparent — the dark background is visible through them
- Single consistent stroke weight throughout the entire image
- Round line caps and round line joins
- No solid fills, no gradients, no shadows, no glow effects

Style:
- Clean vector-quality linework resembling a technical blueprint \
or linocut print carved from darkness
- Generous negative space — at least 40% of the canvas is empty
- Minimal detail — convey meaning with the fewest possible lines

Do NOT include: text, labels, annotations, arrows, dimension lines, \
or any written content. Pure visual forms only.`,

  'tech-iso': `\
Technical isometric wireframe illustration on a solid very dark \
near-black violet-gray background (approximately hsl 260, 20%, 4%).

Stroke rules:
- Primary strokes in bright near-white (approximately RGB 230, 233, 236)
- Secondary strokes in medium gray (approximately RGB 142, 145, 152)
- Structural internal lines in subtle dark gray (approximately RGB 62, 66, 72)
- Stroke weight: thin and consistent throughout
- Round line caps and round line joins

Isometric rules:
- Strict isometric projection at approximately 30 degrees
- All parallel edges remain parallel — no vanishing points
- Vertical lines stay perfectly vertical
- All objects share the same isometric angle and grid

Style:
- Every object has clear 3D depth with visible top, front, and side faces
- Smooth generously rounded corners on all objects
- Rich internal wireframe detail — subdivisions, nested panels, inner frames
- All faces are transparent (no fills) — dark background shows through
- Small circular node markers at connection junctions
- No solid fills, no gradients, no drop shadows

Composition:
- Objects float in empty space — no ground plane, no background grid
- The central/hero object is noticeably larger (2-3x) than surrounding objects
- Generous negative space between objects
- Spread-out map composition

Do NOT include: text, labels, dimension lines, arrows, title lettering, \
or any written content. Only wireframe objects and connection lines with \
node dots.`,

  'color': `\
Flat color illustration using ONLY three shades of violet-gray on a \
solid very dark near-black violet-gray background (approximately \
hsl 260, 20%, 4%).

Color palette (STRICT — no other colors allowed):
- Bright: near-white (approximately RGB 243, 244, 248) — hero/highlight areas
- Medium: mid-gray (approximately RGB 142, 145, 152) — secondary areas
- Subtle: dark gray (approximately RGB 33, 34, 40) — depth/shadow areas

Style rules:
- Flat filled shapes with sharp 90-degree corners (no rounded corners)
- No gradients, no textures, no patterns within shapes
- Clean geometric forms — rectangles, circles, simple polygons
- Minimal thin outlines only where needed for separation (1-2 shades \
brighter than the fill)
- No drop shadows, no glow effects, no blur

Composition:
- Clean, editorial layout with generous negative space
- At least 30% of the canvas is empty background
- Clear visual hierarchy — one hero element draws the eye first

Do NOT include: text, labels, annotations, or any written content. \
Pure visual forms only.`,

  'photo': `\
High-end photorealistic image in 4:3 aspect ratio (four-by-three, \
portrait-leaning rectangle — width is 1.33x the height). \
The background is solid pure black (#000000) with no gradients, \
no vignettes, no ambient light spill — pure black everywhere \
except the subject.

CRITICAL — Aspect ratio: The output image MUST be 4:3 \
(e.g. 1408×1056 or 1024×768). NOT 16:9. NOT widescreen.

Quality:
- Ultra high resolution, 8K detail level
- Professional studio lighting — dramatic, cinematic
- Shallow depth of field where appropriate
- Rich material textures — metal, glass, paper, clay rendered realistically
- Subtle rim lighting to separate subject from black background

Style:
- Product photography / automotive catalog quality
- Clean, minimal composition — subject is the hero
- No busy backgrounds, no environmental clutter
- Color palette tends toward silver, white, gray metallic tones

Do NOT include: text, watermarks, logos, UI overlays, or any written content.`,
};

// ═══════════════════════════════════════════════════════════
// generationConfig — 유형별 기본값
// ═══════════════════════════════════════════════════════════

const CONFIGS = {
  'mono-line': {
    temperature: 0.5, topP: 0.85, maxOutputTokens: 8192,
    responseModalities: ['IMAGE'],
    imageConfig: { aspectRatio: '4:3', imageSize: '4K', numberOfImages: 2 },
  },
  'tech-iso': {
    temperature: 0.5, topP: 0.85, maxOutputTokens: 8192,
    responseModalities: ['IMAGE'],
    imageConfig: { aspectRatio: '4:3', imageSize: '4K', numberOfImages: 2 },
  },
  'color': {
    temperature: 0.7, topP: 0.9, maxOutputTokens: 8192,
    responseModalities: ['IMAGE'],
    imageConfig: { aspectRatio: '4:3', imageSize: '4K', numberOfImages: 2 },
  },
  'photo': {
    temperature: 0.5, topP: 0.85, maxOutputTokens: 8192,
    responseModalities: ['IMAGE'],
    imageConfig: { aspectRatio: '4:3', imageSize: '1K' },
  },
};

// ═══════════════════════════════════════════════════════════
// SUBJECTS — 생성할 일러스트 정의
// ═══════════════════════════════════════════════════════════

// ── S1-P-A-5: 스포츠카 디자인 공정 5단계 (개별 실사 이미지) ──

const SUBJECTS = [
  {
    name: 'car-01-sketch',
    type: 'photo',
    referenceImage: null,
    content: `\
A designer's hand holding a black marker pen, sketching a sports car \
on white tracing paper. The sketch shows loose, confident gestural \
strokes defining a low-slung supercar silhouette in side profile — \
sweeping roofline, aggressive wheel arches, wedge-shaped nose. \
Multiple overlapping lines show the designer exploring proportions. \
The paper sits on a dark matte black desk surface. Dramatic side \
lighting illuminates the sketch and the hand. Shot from above at \
a slight angle. Photorealistic, cinematic lighting, shallow depth \
of field. Solid pure black background (#000000) surrounding the \
desk area.`,
  },
  {
    name: 'car-02-birdseye',
    type: 'photo',
    referenceImage: null,
    content: `\
A 1:18 scale clay model of a sports car photographed directly from \
above (bird's-eye view) on a solid pure black background (#000000). \
The clay model is matte gray, showing the aerodynamic teardrop/wedge \
plan-form of a supercar — tapered nose, wide rear haunches, four \
wheel arch cutouts. Subtle surface lines where the clay has been \
shaped by hand tools. A few thin reference guide lines scored into \
the clay surface along the center axis. Studio lighting from above \
creates soft shadows revealing the 3D form. Photorealistic, product \
photography style, clean and minimal.`,
  },
  {
    name: 'car-03-blueprint',
    type: 'photo',
    referenceImage: null,
    content: `\
A photorealistic technical blueprint of a sports car displayed on a \
large backlit drafting table. The blueprint shows a precise side \
profile engineering drawing of a supercar — every panel line, wheel \
spoke, air intake, and dimension line is meticulously drawn in thin \
white lines on dark navy-black paper. Dimension arrows and measurement \
tick marks extend from key reference points (roof height, wheelbase, \
overhang). A steel T-square ruler and a mechanical pencil rest on the \
edge of the drawing. The drafting table glows faintly from below. \
Solid pure black background (#000000). Cinematic, moody lighting.`,
  },
  {
    name: 'car-04-parts',
    type: 'photo',
    referenceImage: null,
    content: `\
A photorealistic technical parts diagram of a sports car, styled like \
a premium automotive service manual page on a solid pure black \
background (#000000). The diagram shows a 3D isometric cutaway \
rendering of a silver supercar with individual components called out — \
engine block, transmission, suspension arms, brake calipers, exhaust \
manifold, steering rack. Each part is rendered in detailed 3D with \
metallic silver finish and connected to its position by thin white \
leader lines. The parts are slightly separated from the car body to \
show internal structure. Technical annotation style with clean line \
work. The overall composition resembles a high-end engineering \
parts catalog or technical illustration manual. Studio lighting, \
product photography quality.`,
  },
  {
    name: 'car-05-final',
    type: 'photo',
    referenceImage: null,
    content: `\
A photorealistic studio shot of a silver-white Lamborghini Countach \
style supercar in perfect side profile view against a solid pure \
black background (#000000). The car is dramatically lit with a single \
large softbox from the upper right — the light sculpts the wedge \
body, revealing every panel crease, air intake, and the iconic \
angular silhouette. The wheels show detailed multi-spoke alloy rims. \
A subtle ground reflection beneath the car. The image feels like a \
luxury automotive press photo — hero shot, iconic, definitive. \
Ultra high quality, 8K detail, automotive photography.`,
  },

  // ── S1-P-A-6: 모바일 앱 디자인 공정 5단계 (개별 실사 이미지) ──

  {
    name: 'app-01-sketch',
    type: 'photo',
    referenceImage: null,
    content: `\
A designer's hand holding a fine-tip black pen, sketching a mobile app \
wireframe on a white dotted-grid notebook. The sketch shows rough UI \
boxes — a top navigation bar, a card list layout, tab bar at the bottom, \
and a floating action button circle. Multiple overlapping strokes show \
the designer iterating on layout proportions. The notebook sits on a \
dark matte black desk surface. A second pen and an eraser rest nearby. \
Dramatic side lighting illuminates the sketch. Shot from above at a \
slight angle. Photorealistic, cinematic lighting, shallow depth of field. \
Solid pure black background (#000000) surrounding the desk area.`,
  },
  {
    name: 'app-02-mockup',
    type: 'photo',
    referenceImage: null,
    content: `\
A photorealistic iPhone 15 Pro (titanium silver) held at a slight angle \
against a solid pure black background (#000000). The screen displays a \
clean, minimal mobile app UI mockup — a music streaming app with a large \
album art hero image, song title, playback controls, and a subtle gradient \
background on screen. The phone casts a soft reflection below. Studio \
lighting from the upper left with a gentle rim light on the titanium edge. \
Product photography, Apple-style hero shot. Ultra clean, no clutter.`,
  },
  {
    name: 'app-03-ux',
    type: 'photo',
    referenceImage: null,
    content: `\
A photorealistic bird's-eye view of a UX design workspace on a solid \
pure black background (#000000). Printed mobile app wireframe screens \
(6-8 sheets of white paper) are laid out in a connected flow on the \
black surface. Thin red thread or string physically connects the screens \
showing user flow paths. Small sticky notes in muted gray tones annotate \
decision points. A mechanical pencil and a small ruler sit at the edge. \
The arrangement resembles a user journey map. Studio lighting from above, \
even and clean. Photorealistic, editorial overhead photography.`,
  },
  {
    name: 'app-04-system',
    type: 'photo',
    referenceImage: null,
    content: `\
A photorealistic flat-lay of a design system kit printed on thick matte \
white cards, arranged in a grid on a solid pure black background (#000000). \
The cards show UI component specimens — buttons in different states, \
typography scale samples, color swatches in grayscale, icon sets, spacing \
rulers, and form input fields. Each card is cleanly printed, like a \
physical style guide. The cards are arranged with precise equal spacing \
in a 4-column grid. Studio lighting from above, soft and even. Product \
photography style, clean and systematic. No digital screens — all \
physical printed cards.`,
  },
  {
    name: 'app-05-final',
    type: 'photo',
    referenceImage: null,
    content: `\
A photorealistic studio shot of three iPhone 15 Pro devices (titanium \
silver) standing upright in a slight arc formation against a solid pure \
black background (#000000). Each phone displays a different polished \
screen of a completed mobile app — home feed, detail page, and profile \
page. The screens show a modern, dark-themed UI with clean typography \
and card-based layouts. Subtle ground reflections beneath each phone. \
Dramatic studio lighting with a large softbox from the upper right \
creating rim highlights on the titanium edges. The composition feels \
like an official product launch photo. Ultra high quality, 8K detail, \
Apple keynote presentation style.`,
  },

  // ── S1-P-A-7: 버튼의 3가지 의미 (모노 라인, 1:1) ──

  {
    name: 'btn-physical',
    type: 'mono-line',
    referenceImage: null,
    configOverride: { imageConfig: { aspectRatio: '1:1', imageSize: '4K', numberOfImages: 2 } },
    content: `\
Subject: A single mechanical push button viewed from a slight \
three-quarter angle, showing its cylindrical cap and mounting base.

Composition: Centered on canvas, vertically oriented, generous \
negative space surrounding the button.

Key elements:
- Cylindrical button cap outline (top ellipse + side walls)
- Mounting base (wider bottom ellipse)
- Spring coil hint beneath the cap (2-3 curved detail lines)

Emphasis: The button cap is the largest and brightest element.`,
  },
  {
    name: 'btn-ui',
    type: 'mono-line',
    referenceImage: null,
    configOverride: { imageConfig: { aspectRatio: '1:1', imageSize: '4K', numberOfImages: 2 } },
    content: `\
Subject: A digital user-interface button — a rounded rectangle \
with a cursor pointer approaching it, implying a click action.

Composition: Centered on canvas, button slightly above optical \
center, cursor approaching from lower-right.

Key elements:
- Rounded rectangle button outline (generous corner radius)
- Short horizontal line inside the button (text label hint)
- Mouse cursor pointer outline near the button edge
- Single concentric ripple ring around click point (detail stroke)

Emphasis: The rounded rectangle button is the dominant element.`,
  },
  {
    name: 'btn-sewing',
    type: 'mono-line',
    referenceImage: null,
    configOverride: { imageConfig: { aspectRatio: '1:1', imageSize: '4K', numberOfImages: 2 } },
    content: `\
Subject: A classic four-hole sewing button viewed straight-on, \
with thread stitched through the holes in an X pattern.

Composition: Centered on canvas, single button filling about \
40% of the frame, generous surrounding negative space.

Key elements:
- Large outer circle (button rim)
- Inner concentric circle (recessed well)
- Four small circles arranged in a 2x2 grid (thread holes)
- X-shaped thread lines crossing through the holes (detail stroke)

Emphasis: The outer circle rim is the dominant contour.`,
  },

  // ── 2-A-4: 프로그래밍 언어의 추상화 과정 4단계 (테크 아이소, 1:1) ──

  {
    name: 'abstraction-punch-card',
    type: 'tech-iso',
    referenceImage: null,
    configOverride: { imageConfig: { aspectRatio: '1:1', imageSize: '1K', numberOfImages: 2 } },
    content: `\
Subject: A punch card machine — a large isometric mechanical device \
with a rectangular card slot and rows of tiny cylindrical pins \
arranged in a grid pattern on its surface.

Composition: Single hero object centered on canvas, viewed from \
isometric three-quarter angle.

Key elements:
- One large isometric box (the machine body) with visible top, \
front, and side faces
- Top face: a grid of small cylindrical pin holes in neat rows
- Front face: a narrow rectangular card insertion slot
- A small isometric punch card floating beside the slot
- Internal wireframe detail showing mechanical gears inside

Emphasis: The machine body is the hero — largest and brightest \
strokes. The floating card uses secondary stroke brightness.`,
  },
  {
    name: 'abstraction-compiler',
    type: 'tech-iso',
    referenceImage: null,
    configOverride: { imageConfig: { aspectRatio: '1:1', imageSize: '1K', numberOfImages: 2 } },
    content: `\
Subject: A compiler as a translation machine — an isometric funnel \
or hourglass-shaped module. Varied geometric blocks enter from the \
top and uniform small cubes exit from the bottom.

Composition: Vertical flow, centered. Hero funnel module at center, \
input blocks above, output cubes below.

Key elements:
- Top: 3-4 small isometric blocks of different shapes and sizes \
(representing diverse high-level code constructs)
- Center: a large isometric hourglass/funnel module with internal \
wireframe detail showing the transformation process
- Bottom: uniform tiny isometric cubes in a neat row (machine code)
- Thin connection lines from input blocks to funnel top

Emphasis: The central funnel module is the hero with brightest \
strokes and most internal wireframe detail.`,
  },
  {
    name: 'abstraction-modern-prog',
    type: 'tech-iso',
    referenceImage: null,
    configOverride: { imageConfig: { aspectRatio: '1:1', imageSize: '1K', numberOfImages: 2 } },
    content: `\
Subject: A layered isometric tower of stacked platform modules — \
representing modern programming abstraction layers from OS at \
the bottom to application at the top.

Composition: Vertical stack, centered, bottom-up pyramid-like \
arrangement.

Key elements:
- Bottom: wide flat isometric platform (OS/runtime layer)
- Middle: two medium isometric boxes side by side on the platform \
(frameworks/libraries)
- Top: one tall isometric box with rich internal wireframe panels \
and nested subdivisions (application/IDE layer)
- Small circular node markers at connection points between layers

Emphasis: The top application box is the hero — tallest, most \
internal detail, brightest strokes.`,
  },
  {
    name: 'abstraction-vibe-coding',
    type: 'tech-iso',
    referenceImage: null,
    configOverride: { imageConfig: { aspectRatio: '1:1', imageSize: '1K', numberOfImages: 2 } },
    content: `\
Subject: An isometric speech bubble module on the left connected \
by flowing lines to an isometric code editor module on the right — \
representing natural language transforming into code via AI.

Composition: Diagonal flow from upper-left to lower-right, two \
hero-sized modules connected by curved lines with node dots.

Key elements:
- Left: a rounded isometric speech bubble box with soft edges \
and simple internal lines (natural language input)
- Right: a rectangular isometric screen/editor module with inner \
wireframe grid showing code-like rows (generated output)
- Center: 3-4 curved connection lines flowing between them with \
small circular node markers at junction points
- A small isometric AI chip or brain module floating between them

Emphasis: Both the speech bubble and code editor share hero status \
with brightest strokes. The AI module in between uses secondary.`,
  },
];

// ═══════════════════════════════════════════════════════════
// 이미지 유틸
// ═══════════════════════════════════════════════════════════

async function imageToBase64(filepath) {
  const buffer = await readFile(filepath);
  return buffer.toString('base64');
}

// ═══════════════════════════════════════════════════════════
// 생성
// ═══════════════════════════════════════════════════════════

async function generateImage(subject) {
  console.log(`\n⏳ Generating: ${subject.name} (${subject.type})...`);

  const parts = [];

  // 레퍼런스 이미지
  if (subject.referenceImage) {
    const refPath = join(ROOT_DIR, subject.referenceImage);
    const refBase64 = await imageToBase64(refPath);
    const refMime = refPath.endsWith('.png') ? 'image/png' : 'image/jpeg';
    parts.push({ inlineData: { mimeType: refMime, data: refBase64 } });
  }

  // 프롬프트: SHARED + CONTENT
  const prompt = SHARED[subject.type] + '\n\n' + subject.content;
  parts.push({ text: prompt });

  // configOverride가 있으면 base config에 병합
  const baseConfig = CONFIGS[subject.type];
  const generationConfig = subject.configOverride
    ? { ...baseConfig, ...subject.configOverride, imageConfig: { ...baseConfig.imageConfig, ...subject.configOverride.imageConfig } }
    : baseConfig;

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [{ role: 'user', parts }],
    generationConfig,
  });

  // 결과 저장 (버전 넘버링)
  const candidates = response.candidates || [];
  let savedCount = 0;

  for (const candidate of candidates) {
    const resParts = candidate.content?.parts || [];
    for (const part of resParts) {
      if (part.inlineData) {
        const ext = part.inlineData.mimeType === 'image/png' ? 'png' : 'webp';
        const existing = readdirSync(OUTPUT_DIR)
          .filter(f => f.startsWith(subject.name) && f.includes('_v'));
        const maxVersion = existing.reduce((max, f) => {
          const m = f.match(/_v(\d+)\./);
          return m ? Math.max(max, parseInt(m[1])) : max;
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

// ═══════════════════════════════════════════════════════════
// main
// ═══════════════════════════════════════════════════════════

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  console.log('🍌 Nano Banana 2 — Presentation Illustration Generator');
  console.log(`   Model: ${MODEL}`);
  console.log(`   Output: ${OUTPUT_DIR}`);

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

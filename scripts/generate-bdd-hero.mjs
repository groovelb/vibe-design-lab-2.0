/**
 * Machine Vision BDD Hero Image Generator v3
 *
 * 레퍼런스 형태 어휘를 프롬프트에 서술, 이미지 미전달
 * 실행: node scripts/generate-bdd-hero.mjs
 */

import { readFileSync, writeFileSync } from 'fs';

// .env.local 파싱
const envContent = readFileSync('.env.local', 'utf-8');
for (const line of envContent.split('\n')) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) process.env[match[1].trim()] = match[2].trim();
}

import { resolve } from 'path';
import { GoogleGenAI } from '@google/genai';

// v2 이미지를 레퍼런스로 전달
const refImage = readFileSync(resolve('src/assets/brandIllustration/bdd-hero-v2-0.jpg'));

const PROMPT = `Using the provided reference image as a starting point,
create a simplified and cleaner version of this machine vision
interface visualization.

CRITICAL CHANGES from reference:
- REMOVE all logos, brand names, and text labels from the top bar
  (no "COGNEX", no "OPERATOR", no "Login", no "GPUs")
- REMOVE all readable text, hash codes, and numeric data columns
  from the right side
- REMOVE the bottom status bar ("TIME", "READING...", "PROCESS")
- Keep ONLY the abstract neural network graph and flowing
  connection lines

Style:
- Pure white thin outline strokes on dark near-black background
  (approximately hsl 260, 20%, 4%)
- Single consistent stroke weight, round line caps
- Clean, minimal, no clutter

What to KEEP and simplify from the reference:
- The neural network node graph (left-center area) — columns of
  small rectangular blocks connected by tangled flowing curves
- Reduce the number of nodes to about 60% of the original
- Keep the flowing organic curve connections between node columns
- The small rectangular data blocks scattered in the composition

What to ADD:
- Corner-bracket bounding boxes around 4 to 5 node clusters
- Each bracket has a small confidence label ("0.97", "0.94")
  in a filled dark pill background with white text, attached
  to the top-left corner
- 2 to 3 soft white glow bloom points at major curve convergences
- Two thin horizontal scan lines across the frame at subtle opacity

Composition:
- 16:9 wide frame
- The node graph spreads across the full frame, not crammed to one side
- Generous negative space — the image should breathe
- No text, no logos, no UI chrome — pure abstract visualization`;

async function main() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  console.log('Generating BDD hero images v5 (simplified v2)...');

  const response = await ai.models.generateContent({
    model: 'gemini-3.1-flash-image-preview',
    contents: [{ role: 'user', parts: [
      { inlineData: { mimeType: 'image/jpeg', data: refImage.toString('base64') } },
      { text: PROMPT },
    ] }],
    generationConfig: {
      temperature: 0.7,
      topP: 0.85,
      maxOutputTokens: 8192,
      responseModalities: ['IMAGE'],
      imageConfig: {
        aspectRatio: '16:9',
        imageSize: '2K',
        numberOfImages: 2,
      },
    },
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
    ],
  });

  let imageIndex = 0;
  for (const candidate of response.candidates) {
    for (const part of candidate.content.parts) {
      if (part.inlineData) {
        const ext = part.inlineData.mimeType.includes('png') ? 'png' : 'jpg';
        const filename = `src/assets/brandIllustration/bdd-hero-v5-${imageIndex}.${ext}`;
        const buffer = Buffer.from(part.inlineData.data, 'base64');
        writeFileSync(filename, buffer);
        console.log(`Saved: ${filename} (${(buffer.length / 1024).toFixed(0)} KB)`);
        imageIndex++;
      }
    }
  }

  if (imageIndex === 0) {
    console.log('No images returned. Response:', JSON.stringify(response, null, 2));
  } else {
    console.log(`Done! ${imageIndex} image(s) generated.`);
  }
}

main().catch(console.error);

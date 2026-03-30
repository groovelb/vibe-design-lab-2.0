import { GoogleGenAI } from '@google/genai';
import fs from 'node:fs';
import path from 'node:path';

if (!process.env.GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY 환경변수를 설정하세요.');
  process.exit(1);
}
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const originalBase64 = fs.readFileSync(
  path.resolve('public/assets/course/course_cover_ver5-1.png'),
).toString('base64');

const prompt = `Image 1 is the reference. Recreate this exact scene in 4:3 landscape format,
expanding the composition horizontally to fill the wider frame with more floating UI components on the sides.

Add a soft glow effect to every floating UI element:

GLOW EFFECT:
- Each floating UI component emits a soft, diffused glow around its edges.
  The glow color is cool white with a very subtle violet tint.
- Glow intensity varies by depth: closer/larger components have stronger glow,
  distant/smaller ones have fainter glow.
- The glow feels like light bleeding from self-illuminated displays
  into the surrounding dark atmosphere — soft, cinematic, not harsh or neon.

COMPOSITION — 4:3 LANDSCAPE:
- The person remains centered as in the reference.
- Use the extra horizontal space to add more floating UI components
  on the left and right sides, maintaining the same spread density.
- Components fill all edges and corners of the wider frame.

PRESERVE from reference:
- Same person, same pose, same outfit, same dramatic rim lighting.
- Same UI component types and visual language: buttons, metric cards,
  code snippets, node diagrams, toggles, progress bars, dropdowns —
  all in 1px white monoline on near-black translucent panels.
- Same violet-tinted grayscale color grading, same cinematic mood.
  Clean image, professional quality.`;

const response = await ai.models.generateContent({
  model: 'gemini-3.1-flash-image-preview',
  contents: [
    {
      role: 'user',
      parts: [
        {
          inlineData: {
            mimeType: 'image/png',
            data: originalBase64,
          },
        },
        { text: prompt },
      ],
    },
  ],
  generationConfig: {
    temperature: 0.3,
    topP: 0.9,
    maxOutputTokens: 8192,
    responseModalities: ['IMAGE'],
    imageConfig: {
      aspectRatio: '4:3',
      imageSize: '4K',
      numberOfImages: 1,
    },
  },
  safetySettings: [
    { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
    { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
    { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
    { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
  ],
});

const outputDir = path.resolve('public/assets/course');
let count = 0;

if (response.candidates) {
  for (const candidate of response.candidates) {
    if (candidate.content?.parts) {
      for (const part of candidate.content.parts) {
        if (part.inlineData) {
          count++;
          const ext = part.inlineData.mimeType?.includes('png') ? 'png' : 'jpg';
          const filename = `course_cover_ver7b-${count}.${ext}`;
          const outPath = path.join(outputDir, filename);
          fs.writeFileSync(outPath, Buffer.from(part.inlineData.data, 'base64'));
          console.log(`Saved: ${outPath}`);
        }
      }
    }
  }
}

if (count === 0) {
  console.log('No images generated. Response:', JSON.stringify(response, null, 2));
}

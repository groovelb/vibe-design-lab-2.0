import { GoogleGenAI } from '@google/genai';
import fs from 'node:fs';
import path from 'node:path';

if (!process.env.GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY 환경변수를 설정하세요.');
  process.exit(1);
}
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const v17Base64 = fs.readFileSync(path.resolve('public/assets/lead/lead-profile-v17-1.png')).toString('base64');
const cosBase64 = fs.readFileSync(path.resolve('public/assets/lead/cos.png')).toString('base64');

const prompt = `Image 1 is the portrait to edit. Image 2 is a style reference — use it ONLY for the film/color grading look.

Apply the exact same film photography color grade and tone from Image 2 to Image 1:
- Slightly desaturated, muted color palette
- Subtle film grain across the entire image
- Lifted blacks — shadows are not pure black, they have a slight haze/milky quality
- Cool-neutral overall color temperature with natural warmth preserved in skin tones only
- That editorial fashion photography look — understated, refined, analog feel

Keep EVERYTHING else 100% identical: same person, same face, same expression, same pose, same composition, same framing, same shirt, same white background (the background should also take on the film tone — becoming a slightly muted off-white/cool gray rather than pure white). No watermarks.`;

const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash-image',
  contents: [
    {
      role: 'user',
      parts: [
        {
          inlineData: {
            mimeType: 'image/png',
            data: v17Base64,
          },
        },
        {
          inlineData: {
            mimeType: 'image/png',
            data: cosBase64,
          },
        },
        { text: prompt },
      ],
    },
  ],
  generationConfig: {
    temperature: 0.1,
    topP: 0.8,
    maxOutputTokens: 8192,
    responseModalities: ['IMAGE'],
    imageConfig: {
      aspectRatio: '3:4',
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

const outputDir = path.resolve('public/assets/lead');
let count = 0;

if (response.candidates) {
  for (const candidate of response.candidates) {
    if (candidate.content?.parts) {
      for (const part of candidate.content.parts) {
        if (part.inlineData) {
          count++;
          const ext = part.inlineData.mimeType?.includes('png') ? 'png' : 'jpg';
          const filename = `lead-profile-v18-${count}.${ext}`;
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

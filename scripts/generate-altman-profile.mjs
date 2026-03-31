import { GoogleGenAI } from '@google/genai';
import fs from 'node:fs';
import path from 'node:path';

if (!process.env.GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY 환경변수를 설정하세요.');
  process.exit(1);
}
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const cosBase64 = fs.readFileSync(path.resolve('public/assets/lead/cos.png')).toString('base64');

const prompt = `Image 1 is a style reference — match its film color grading, muted palette, and editorial tone exactly.

Generate a photorealistic upper-body portrait of Sam Altman, CEO of OpenAI.
Short curly brown hair, clean-shaven, natural relaxed expression with a slight smile.
Wearing a plain black crew-neck t-shirt.
Clean off-white to cool gray studio background.
Soft diffused three-point lighting, subtle film grain, slightly desaturated muted color palette,
lifted blacks with a milky haze quality, cool-neutral color temperature with warmth only in skin tones.
Shot on Fujifilm X-T5 with 85mm portrait lens, shallow depth of field.
Editorial fashion photography aesthetic — understated, refined, analog feel.
Generous headroom — leave ample empty space above the head, approximately 20-25% of the frame height.
The subject should be positioned in the lower two-thirds of the frame.
Professional quality, clean image.`;

const response = await ai.models.generateContent({
  model: 'gemini-3.1-flash-image-preview',
  contents: [
    {
      role: 'user',
      parts: [
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
    temperature: 0.3,
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
          const filename = `altman-profile-v2-${count}.${ext}`;
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

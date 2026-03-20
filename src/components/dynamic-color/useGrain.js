'use client';
import { useState, useEffect } from 'react';

/**
 * 캔버스 기반 그레인 노이즈 텍스처를 생성하는 내부 함수.
 *
 * @param {number} size - 텍스처 한 변의 크기 (px)
 * @param {'dark'|'light'} type - 텍스처 톤
 * @returns {string} data URI (image/png)
 */
function generateGrain(size, type) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const imageData = ctx.createImageData(size, size);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    if (type === 'dark') {
      // 어두운 노이즈 — 섹션 그레인용
      const base = Math.floor(Math.random() * 60);
      data[i] = base;
      data[i + 1] = Math.max(0, base - 2);
      data[i + 2] = Math.min(255, base + 3);
      data[i + 3] = Math.floor(Math.random() * 100 + 30);
    } else {
      // 밝은 노이즈 — 글로벌 그레인용
      const base = Math.floor(Math.random() * 255);
      data[i] = base;
      data[i + 1] = Math.max(0, base - 1);
      data[i + 2] = Math.min(255, base + 2);
      data[i + 3] = Math.floor(Math.random() * 35 + 10);
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL('image/png');
}

/** 모듈 레벨 캐시 — 한 번 생성 후 재사용 */
let cache = null;

/**
 * 그레인 노이즈 텍스처를 생성하여 data URI로 반환하는 훅.
 *
 * @param {number} [size=256] - 텍스처 크기 (px) [Optional]
 * @returns {{ light: string|null, dark: string|null }}
 *
 * Example usage:
 * const { light, dark } = useGrain();
 */
export function useGrain(size = 256) {
  const [textures, setTextures] = useState(cache);

  useEffect(() => {
    if (!cache) {
      cache = {
        light: generateGrain(size, 'light'),
        dark: generateGrain(size, 'dark'),
      };
      setTextures(cache);
    }
  }, [size]);

  return textures || { light: null, dark: null };
}

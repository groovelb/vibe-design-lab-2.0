import { useState, useEffect } from 'react';

function generate(size, type) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(size, size);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    if (type === 'dark') {
      d[i] = d[i + 1] = d[i + 2] = Math.floor(Math.random() * 60);
      d[i + 3] = Math.floor(Math.random() * 100 + 30);
    } else {
      d[i] = d[i + 1] = d[i + 2] = Math.floor(Math.random() * 255);
      d[i + 3] = Math.floor(Math.random() * 35 + 10);
    }
  }
  ctx.putImageData(img, 0, 0);
  return c.toDataURL('image/png');
}

let cache = null;

export function useGrain() {
  const [textures, setTextures] = useState(cache);

  useEffect(() => {
    if (!cache) {
      cache = { light: generate(256, 'light'), dark: generate(256, 'dark') };
      setTextures(cache);
    }
  }, []);

  return textures || { light: null, dark: null };
}

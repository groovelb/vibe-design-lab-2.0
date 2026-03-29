import { Inter, IBM_Plex_Mono } from 'next/font/google';

// 브랜드 서체 (로고, 태그라인, display variant)
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-brand',
});

// 프로덕트/헤딩 서체 — Pretendard Variable (웹폰트, globals.css에서 import)
// CSS variable만 선언하여 theme과 연결
export const suit = {
  variable: '--font-suit',
  style: { fontFamily: '"Pretendard Variable", Pretendard' },
};

// 코드 서체 (키워드, 토큰명, 인라인 코드, 코드 블록)
export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-mono',
});

import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import localFont from 'next/font/local';

// 브랜드 서체 (로고, 태그라인, display variant)
export const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-brand',
});

// 프로덕트/헤딩 서체 (본문, UI, h1~h6 — 한글 최적화)
export const suit = localFont({
  src: '../public/fonts/SUIT-Variable.woff2',
  display: 'swap',
  variable: '--font-suit',
});

// 코드 서체 (키워드, 토큰명, 인라인 코드, 코드 블록)
export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-mono',
});

/**
 * Presentation Design Tokens
 *
 * VDL 메인 테마(default.js)와 완전 분리된 프레젠테이션 전용 토큰.
 * VDL primitive 색상(--vdl-*)만 CSS 변수로 참조한다.
 * HD 이상 데스크탑(16:9) 전용.
 */

// ─── Slide Dimensions ───
const slide = {
  width: 1920,
  height: 1080,
  aspectRatio: '16 / 9',
  padding: { x: 80, y: 64 },
};

// ─── Navigation Chrome ───
const nav = {
  drawerWidth: 280,
  headerHeight: 48,
};

// ─── Content Area ───
const content = {
  maxWidth: 1536, // MUI xl
  aspectRatio: '4 / 3',
};

// ─── Typography Scale (프레젠테이션 전용) ───
const typo = {
  title: { fontSize: 64, fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em' },
  subtitle: { fontSize: 40, fontWeight: 600, lineHeight: 1.3, letterSpacing: '-0.01em' },
  headline: { fontSize: 28, fontWeight: 600, lineHeight: 1.4, letterSpacing: '0' },
  body: { fontSize: 22, fontWeight: 400, lineHeight: 1.65, letterSpacing: '0' },
  caption: { fontSize: 16, fontWeight: 400, lineHeight: 1.5, letterSpacing: '0.01em' },
  label: { fontSize: 14, fontWeight: 500, lineHeight: 1.4, letterSpacing: '0.02em' },
};

// ─── Spacing (3-tier) ───
const spacing = {
  layout: 96, // 레이아웃 간격: Grid/HSplit 셀 간, 대구분
  group: 48,  // 그룹 간격: 섹션 내 요소 간
  text: 12,   // 텍스트 간격: 텍스트 블록 내부
};

// ─── Color (VDL CSS 변수 참조) ───
const color = {
  bg: 'var(--vdl-950)',
  surface: 'var(--vdl-900)',
  text: 'var(--vdl-100)',
  textSecondary: 'var(--vdl-400)',
  textTertiary: 'var(--vdl-600)',
  border: 'var(--vdl-700)',
  accent: 'var(--vdl-50)',
  arrow: 'var(--vdl-300)',
};

// ─── Font Family (VDL CSS 변수 참조) ───
const fontFamily = {
  heading: 'var(--font-suit, "Pretendard Variable"), sans-serif',
  body: 'var(--font-suit, "Pretendard Variable"), sans-serif',
  code: 'var(--font-mono, "IBM Plex Mono"), monospace',
  brand: 'var(--font-brand, "Inter"), sans-serif',
};

export const presentationTokens = {
  slide,
  nav,
  content,
  typo,
  spacing,
  color,
  fontFamily,
};

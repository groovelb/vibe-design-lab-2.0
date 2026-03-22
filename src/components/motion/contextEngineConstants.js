/**
 * ContextEngine 상수, 수학 유틸리티, 커브 생성기
 */

// SVG viewBox
export const VIEW = { w: 1600, h: 500 };

// 입력 스트림 (좌측 패널) — 코드/텍스트 조각
// w: monospace fontSize 10 기준 추정 픽셀 폭 (ASCII ≈ 6px, 한글 ≈ 12px)
export const INPUT_STREAMS = [
  { label: "sx={{ color: 'primary' }}", y: 90, w: 170 },
  { label: 'variant="display"', y: 155, w: 110 },
  { label: 'spacing={8}', y: 220, w: 72 },
  { label: '<PhiSplit ratio={φ}>', y: 285, w: 128 },
  { label: "'설득이 아니라 증명으로'", y: 350, w: 140 },
  { label: 'animate={{ opacity: 1 }}', y: 415, w: 152 },
];

// 출력 채널 (우측 패널) — 동작하는 디자인 산출물
export const OUTPUT_CHANNELS = [
  { label: '컴포넌트', y: 120 },
  { label: '레이아웃', y: 210 },
  { label: '인터랙션', y: 300 },
  { label: '제품', y: 390 },
];

// 입력 → 출력 매핑 (각 입력 인덱스 → 출력 인덱스)
// 2개 입력이 하나의 출력으로 수렴
export const INPUT_OUTPUT_MAP = [0, 0, 1, 1, 2, 3];

// 레이아웃 좌표
export const LAYOUT = {
  inputDotsX: 20,
  inputPathStartX: 80,
  outputEndX: 1580,
};

// ============================================================
// Curve generators
// ============================================================

/**
 * 직선 구간 + 타이트 bezier 전환 커브
 *
 *   A ─────────────╮
 *                   │
 *                   ╰─────────────── B
 */
export function cleanBezier(x1, y1, x2, y2, { straightRatio = 0.7 } = {}) {
  const dx = x2 - x1;
  const dy = y2 - y1;

  if (Math.abs(dy) < 2) {
    return `M ${x1} ${y1} L ${x2} ${y2}`;
  }

  const straightLen = dx * straightRatio * 0.5;
  const bendX1 = x1 + straightLen;
  const bendX2 = x2 - straightLen;
  const bendW = bendX2 - bendX1;

  return [
    `M ${x1} ${y1}`,
    `L ${bendX1} ${y1}`,
    `C ${bendX1 + bendW * 0.5} ${y1},`,
    `  ${bendX2 - bendW * 0.5} ${y2},`,
    `  ${bendX2} ${y2}`,
    `L ${x2} ${y2}`,
  ].join(' ');
}

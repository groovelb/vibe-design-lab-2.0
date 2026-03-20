/**
 * ContextEngine 상수, 수학 유틸리티, 커브 생성기
 */

// SVG viewBox
export const VIEW = { w: 1600, h: 500 };

// Sphere center and radius
export const SPHERE = { cx: 800, cy: 260, r: 160 };

// 입력 스트림 (좌측 패널) — 코드/텍스트 조각
export const INPUT_STREAMS = [
  { label: "sx={{ color: 'primary' }}", y: 90 },
  { label: 'variant="display"', y: 155 },
  { label: 'spacing={8}', y: 220 },
  { label: '<PhiSplit ratio={φ}>', y: 285 },
  { label: "'설득이 아니라 증명으로'", y: 350 },
  { label: 'animate={{ opacity: 1 }}', y: 415 },
];

// 출력 채널 (우측 패널) — 동작하는 디자인 산출물
export const OUTPUT_CHANNELS = [
  { label: '컴포넌트', y: 120 },
  { label: '레이아웃', y: 210 },
  { label: '인터랙션', y: 300 },
  { label: '제품', y: 390 },
];

// 레이아웃 좌표
export const LAYOUT = {
  inputLabelX: 40,
  inputDotsX: 200,
  inputPathStartX: 270,
  outputEndX: 1380,
  outputLabelX: 1400,
};

// ============================================================
// Math utilities
// ============================================================

const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;

/**
 * Golden spiral 기반 구체 표면 균등 분포 포인트 생성
 */
export function generateSpherePoints(count = 120, relevantRatio = 0.25) {
  const points = [];
  for (let i = 0; i < count; i++) {
    const phi = (2 * Math.PI * i) / GOLDEN_RATIO;
    const theta = Math.acos(1 - (2 * (i + 0.5)) / count);
    points.push({
      x: Math.sin(theta) * Math.cos(phi),
      y: Math.sin(theta) * Math.sin(phi),
      z: Math.cos(theta),
      isRelevant: Math.random() < relevantRatio,
      id: i,
    });
  }
  return points;
}

/**
 * 3D → 2D 원근 투영 (Y축 회전)
 */
export function projectPoint(point, angle, cx, cy, radius, perspectiveStrength = 0.3) {
  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);
  const rx = point.x * cosA - point.z * sinA;
  const rz = point.x * sinA + point.z * cosA;
  const depth = 1 / (1 - perspectiveStrength * rz);

  return {
    sx: cx + radius * rx * depth,
    sy: cy + radius * point.y * depth,
    rz,
    depth,
    size: 2 + 3 * depth,
    opacity: 0.1 + 0.7 * depth,
  };
}

/**
 * Z-depth 기반 정렬 (뒤→앞)
 */
export function zSort(projectedPoints) {
  return [...projectedPoints].sort((a, b) => a.rz - b.rz);
}

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

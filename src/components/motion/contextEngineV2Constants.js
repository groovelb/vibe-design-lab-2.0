/**
 * ContextEngineV2 상수, 데이터 모델, 경로 생성 함수
 *
 * 흐름: 프롬프트 입력(1) → 타이핑 → 파티클 → 바 노드(9) → 파티클 → 출력(5)
 */

// SVG viewBox (상단 60px 패딩 포함)
export const VIEW = { w: 1600, h: 560 };

// ============================================================
// 레이아웃 좌표
// ============================================================

export const LAYOUT_V2 = {
  // Stage 1: Prompt input container
  containerX: 20,
  containerY: 170,
  containerW: 260,
  containerH: 220,
  containerCenterY: 280,
  // Stage 2: Bar nodes
  barX: 560,
  // Stage 3: Output endpoints
  outputX: 1560,
};

// ============================================================
// Stage 1 — 프롬프트 입력 컨테이너 (1개)
// 4줄의 프롬프트가 순차 타이핑
// ============================================================

export const TYPING_PROMPTS = [
  { text: '> design a landing page with golden ratio layout, scroll reveal motion, and product card grid', textWidth: 230 },
];

// 컨테이너 내 라인 y 좌표 (단일 프롬프트 — 컨테이너 중앙)
export const getLineY = () => 280;

// ============================================================
// Stage 2 — 바 노드 (9개, 최다)
// ============================================================

export const PROCESS_BARS = [
  // Design tokens
  { label: 'color.primary',    y: 130, w: 140 },
  { label: 'typography.h1',    y: 200, w: 120 },
  { label: 'spacing.unit',     y: 270, w: 110 },
  // Logic / structure
  { label: 'Grid.columns',     y: 340, w: 130 },
  { label: 'transition.ease',  y: 410, w: 135 },
  { label: 'breakpoint.md',    y: 480, w: 120 },
];

// ============================================================
// Stage 3 — 출력 채널 (5개) + 아이콘
// ============================================================

export const OUTPUT_CHANNELS_V2 = [
  { label: 'Component',   y: 132, score: '0.97', icon: 'component' },
  { label: 'Layout',      y: 222, score: '0.94', icon: 'layoutGrid' },
  { label: 'Interaction', y: 312, score: '0.91', icon: 'mouse' },
  { label: 'Product',     y: 402, score: '0.88', icon: 'package' },
  { label: 'System',      y: 492, score: '0.92', icon: 'settings' },
];

// ============================================================
// 연결 매핑 — Middle→Output
// (Stage 1은 단일 컨테이너→전체 9바 노드, 매핑 불필요)
// ============================================================

export const MIDDLE_TO_OUTPUT_MAP = [
  [0, 3],   // color.primary   → Component, Product
  [0, 1],   // typography.h1   → Component, Layout
  [1, 2],   // spacing.unit    → Layout, Interaction
  [1, 3],   // Grid.columns    → Layout, Product
  [2, 4],   // transition.ease → Interaction, System
  [0, 4],   // breakpoint.md   → Component, System
];

// ============================================================
// 아이콘 SVG 패스 데이터 (lucide-react 24×24 viewBox)
// ============================================================

export const ICON_PATHS = {
  component: [
    { tag: 'path', d: 'M15.536 11.293a1 1 0 0 0 0 1.414l2.376 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z' },
    { tag: 'path', d: 'M2.297 11.293a1 1 0 0 0 0 1.414l2.377 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414L6.088 8.916a1 1 0 0 0-1.414 0z' },
    { tag: 'path', d: 'M8.916 17.912a1 1 0 0 0 0 1.415l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.415l-2.377-2.376a1 1 0 0 0-1.414 0z' },
    { tag: 'path', d: 'M8.916 4.674a1 1 0 0 0 0 1.414l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z' },
  ],
  layoutGrid: [
    { tag: 'rect', attrs: { width: 7, height: 7, x: 3, y: 3, rx: 1 } },
    { tag: 'rect', attrs: { width: 7, height: 7, x: 14, y: 3, rx: 1 } },
    { tag: 'rect', attrs: { width: 7, height: 7, x: 14, y: 14, rx: 1 } },
    { tag: 'rect', attrs: { width: 7, height: 7, x: 3, y: 14, rx: 1 } },
  ],
  mouse: [
    { tag: 'rect', attrs: { x: 5, y: 2, width: 14, height: 20, rx: 7 } },
    { tag: 'path', d: 'M12 6v4' },
  ],
  package: [
    { tag: 'path', d: 'M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z' },
    { tag: 'path', d: 'M12 22V12' },
    { tag: 'path', d: 'M3.29 7 12 12 20.71 7' },
    { tag: 'path', d: 'm7.5 4.27 9 5.15' },
  ],
  settings: [
    { tag: 'path', d: 'M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915' },
    { tag: 'circle', attrs: { cx: 12, cy: 12, r: 3 } },
  ],
};

// ============================================================
// 타이밍 상수
// ============================================================

// 총 사이클 (모든 애니메이션이 이 주기로 동기화)
export const CYCLE = 5; // seconds

// 타이핑 타이밍 (사이클 내 비율)
export const TYPING_TIMING = {
  lineTypeDur: 1.2,    // 타이핑 소요 시간(s)
  lineStagger: 0,      // 단일 프롬프트이므로 0
  fontSize: 10,
  lineHeight: 14,
  cursorBlinkDur: 0.6,
};

// 타이핑 완료 시점
export const TYPING_END = TYPING_TIMING.lineTypeDur; // 1.2s

// 파티클 타이밍 (사이클 내 절대 시간)
export const PARTICLE_TIMING = {
  stage1Start: 1.3,     // 타이핑 완료 직후
  stage1Dur: 1.5,       // Stage 1 파티클 이동 시간
  stage1Stagger: 0.04,  // 경로 간 시작 오프셋
  stage2Start: 2.2,     // Stage 1 중간쯤 시작
  stage2Dur: 1.3,       // Stage 2 파티클 이동 시간
  stage2Stagger: 0.03,  // 경로 간 시작 오프셋
};

// 바 노드 슬라이더 (독립 루프)
export const TIMING = {
  sliderDur: 3,
  sliderStagger: 0.35,
  outputGlowDur: 3,
  outputGlowStagger: 0.3,
  outputPulseDur: 2,
  outputPulseStagger: 0.25,
};

// ============================================================
// 장식 데이터 리드아웃
// ============================================================

export const READOUTS = [
  { x: 360, y: 120, lines: ['/3.652e+3', '0.883'], opacity: 0.08 },
  { x: 340, y: 500, lines: ['TSK/N', 'Q3REF0'], opacity: 0.06 },
  { x: 980, y: 110, lines: ['582205'], opacity: 0.07 },
  { x: 1000, y: 510, lines: ['READING...'], opacity: 0.06 },
  { x: 1180, y: 200, lines: ['T', 'U', 'Z', 'C'], opacity: 0.05 },
];

// ============================================================
// 수평 스캔라인
// ============================================================

export const SCAN_LINES = [160, 310, 460];

// ============================================================
// Curve generators
// ============================================================

/**
 * Sankey 번들 커브 — 소스에서 타깃으로 수렴하는 S-커브
 */
export function sankeyBundle(x1, y1, x2, y2) {
  const dx = x2 - x1;

  if (Math.abs(y2 - y1) < 2) {
    return `M ${x1} ${y1} L ${x2} ${y2}`;
  }

  const cp1x = x1 + dx * 0.35;
  const cp1y = y1;
  const cp2x = x1 + dx * 0.5;
  const cp2y = y1 + (y2 - y1) * 0.7;
  const endCurveX = x1 + dx * 0.65;

  return [
    `M ${x1} ${y1}`,
    `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endCurveX} ${y2}`,
    `L ${x2} ${y2}`,
  ].join(' ');
}

/**
 * 팬아웃 커브 — 소스에서 각 타깃으로 확산하는 대칭 S-커브
 */
export function fanCurve(x1, y1, x2, y2) {
  const dx = x2 - x1;

  if (Math.abs(y2 - y1) < 2) {
    return `M ${x1} ${y1} L ${x2} ${y2}`;
  }

  const cp1x = x1 + dx * 0.4;
  const cp1y = y1;
  const cp2x = x2 - dx * 0.4;
  const cp2y = y2;

  return `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`;
}

// ============================================================
// 경로 생성
// ============================================================

/**
 * Stage 1: 프롬프트 컨테이너 → 9개 바 노드
 * 컨테이너 우측 중앙에서 모든 바 노드로 팬아웃
 */
export function buildStage1Paths() {
  const { containerX, containerW, containerCenterY, barX } = LAYOUT_V2;
  const startX = containerX + containerW;
  const paths = [];

  PROCESS_BARS.forEach((bar, midIdx) => {
    paths.push({
      path: sankeyBundle(startX, containerCenterY, barX, bar.y),
      midIdx,
    });
  });

  return paths;
}

/**
 * Stage 2: 바 노드 → 출력 엔드포인트
 */
export function buildStage2Paths() {
  const { barX, outputX } = LAYOUT_V2;
  const paths = [];

  MIDDLE_TO_OUTPUT_MAP.forEach((outputIndices, midIdx) => {
    const bar = PROCESS_BARS[midIdx];
    outputIndices.forEach((outIdx) => {
      const out = OUTPUT_CHANNELS_V2[outIdx];
      paths.push({
        path: fanCurve(barX + bar.w, bar.y, outputX, out.y),
        midIdx,
        outIdx,
      });
    });
  });

  return paths;
}

// ============================================================
// 타이핑 keyTimes 헬퍼
// ============================================================

/**
 * 단일 프롬프트 SMIL keyTimes/values 생성
 * 총 사이클 CYCLE 안에서 타이핑 구간 배치
 */
export function buildTypingAnimation() {
  const tc = CYCLE;
  const t1 = (TYPING_TIMING.lineTypeDur / tc).toFixed(4);
  const tw = TYPING_PROMPTS[0].textWidth;

  return {
    keyTimes: `0;${t1};0.95;1`,
    values: `0;${tw};${tw};0`,
  };
}

// ============================================================
// 파티클 keyTimes 헬퍼
// ============================================================

/**
 * 파티클별 SMIL keyTimes/keyPoints 생성
 * 사이클 내 특정 구간에서만 이동하고, 나머지는 정지
 */
export function buildParticleMotion(pathIndex, stage) {
  const tc = CYCLE;
  const pt = PARTICLE_TIMING;
  const start = stage === 1
    ? pt.stage1Start + pathIndex * pt.stage1Stagger
    : pt.stage2Start + pathIndex * pt.stage2Stagger;
  const dur = stage === 1 ? pt.stage1Dur : pt.stage2Dur;
  const end = Math.min(start + dur, tc - 0.1);

  const t0 = (start / tc).toFixed(4);
  const t1 = (end / tc).toFixed(4);

  // opacity: 시작 전 invisible → 이동 중 visible → 도착 후 fade out
  const fadeIn = (Math.min(start + 0.15, end) / tc).toFixed(4);
  const fadeStart = (Math.max(end - 0.3, start) / tc).toFixed(4);

  return {
    motion: {
      keyPoints: `0;0;1;1`,
      keyTimes: `0;${t0};${t1};1`,
    },
    opacity: {
      values: `0;0;0.7;0.5;0;0`,
      keyTimes: `0;${t0};${fadeIn};${fadeStart};${t1};1`,
    },
  };
}

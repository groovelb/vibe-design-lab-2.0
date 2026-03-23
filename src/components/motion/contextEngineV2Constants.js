/**
 * ContextEngineV2 상수, 데이터 모델, 경로 생성 함수
 *
 * 흐름: 프롬프트 입력(1) → 타이핑 → 파티클 → 바 노드(9) → 파티클 → 출력(5)
 */

// SVG viewBox
export const VIEW = { w: 1600, h: 560 };

// ============================================================
// 레이아웃 좌표
// ============================================================

export const LAYOUT_V2 = {
  // Stage 1: Prompt input container (상단 정렬, 첫 바 노드와 top 동일)
  containerX: 0,
  containerY: 40,
  containerW: 360,
  containerH: 80,
  containerCenterY: 80,
  // Stage 2: Bar nodes
  barX: 560,
  // Stage 3: Output endpoints
  outputX: 1560,
};

// ============================================================
// Stage 1 — 프롬프트 입력 컨테이너 (1개)
// ============================================================

export const TYPING_PROMPTS = [
  { text: '> design a hero with golden ratio and scroll motion', textWidth: 320 },
];

// 컨테이너 내 라인 y 좌표 (단일 프롬프트 — 컨테이너 중앙)
export const getLineY = () => 80;

// ============================================================
// Stage 2 — 바 노드 (9개)
// ============================================================

export const PROCESS_BARS = [
  // Design tokens
  { label: 'color.primary',    y: 50,  w: 130 },
  { label: 'typography.h1',    y: 106, w: 130 },
  { label: 'spacing.unit',     y: 162, w: 130 },
  { label: 'elevation.level',  y: 218, w: 130 },
  { label: 'radius.none',      y: 274, w: 130 },
  // Logic / structure
  { label: 'Grid.columns',     y: 330, w: 130 },
  { label: 'PhiSplit.ratio',   y: 386, w: 130 },
  { label: 'transition.ease',  y: 442, w: 130 },
  { label: 'breakpoint.md',    y: 498, w: 130 },
];

// ============================================================
// Stage 3 — 출력 채널 (5개) + 아이콘
// ============================================================

export const OUTPUT_CHANNELS_V2 = [
  { label: 'Component',   y: 70,  score: '0.97', icon: 'component' },
  { label: 'Layout',      y: 182, score: '0.94', icon: 'layoutGrid' },
  { label: 'Interaction', y: 294, score: '0.91', icon: 'mouse' },
  { label: 'Product',     y: 406, score: '0.88', icon: 'package' },
  { label: 'System',      y: 518, score: '0.92', icon: 'settings' },
];

// ============================================================
// 연결 매핑 — Middle→Output
// ============================================================

export const MIDDLE_TO_OUTPUT_MAP = [
  [0, 3],   // color.primary   → Component, Product
  [0, 1],   // typography.h1   → Component, Layout
  [1],      // spacing.unit    → Layout
  [0, 2],   // elevation.level → Component, Interaction
  [1, 4],   // radius.none     → Layout, System
  [1, 3],   // Grid.columns    → Layout, Product
  [3, 4],   // PhiSplit.ratio  → Product, System
  [2],      // transition.ease → Interaction
  [2, 4],   // breakpoint.md   → Interaction, System
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
  fontSize: 14,
  lineHeight: 18,
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

// 인트로 등장 타이밍 (1회성, fill="freeze")
// 노드 등장과 라인 드로잉이 겹치며 캐스케이드
export const INTRO = {
  promptDelay: 0,
  promptDur: 0.35,
  barStart: 0.2,         // 프롬프트 후
  barStagger: 0.06,      // bar 9개: 0.2~0.68s
  barDur: 0.3,
  outputStart: 0.5,      // bar 중반부터 output 시작
  outputStagger: 0.08,   // output 5개: 0.5~0.82s
  outputDur: 0.3,
  lineStart: 0.4,        // 노드 등장 중 S1 라인 시작
  line1Stagger: 0.03,
  line2Start: 0.65,      // output 등장 중 S2 라인 시작
  line2Stagger: 0.02,
  lineDur: 0.6,
  total: 1.8,            // 사이클 시작
};

// ============================================================
// 장식 데이터 리드아웃
// ============================================================

export const READOUTS = [
  { x: 360, y: 60,  lines: ['/3.652e+3', '0.883'], opacity: 0.08 },
  { x: 340, y: 480, lines: ['TSK/N', 'Q3REF0'], opacity: 0.06 },
  { x: 980, y: 50,  lines: ['582205'], opacity: 0.07 },
  { x: 1000, y: 500, lines: ['READING...'], opacity: 0.06 },
  { x: 1180, y: 140, lines: ['T', 'U', 'Z', 'C'], opacity: 0.05 },
];

// ============================================================
// 수평 스캔라인
// ============================================================

export const SCAN_LINES = [100, 280, 460];

// ============================================================
// Curve generators — 직선 최대화 + 고곡률 전환
// 수평 직선 → 라운드 90° 전환 → 수직 직선 → 라운드 90° 전환 → 수평 직선
// ============================================================

const CORNER_R = 16; // 전환부 곡률 반경 (px)

/**
 * 라운드 엘보 커넥터 — 수평→수직→수평 경로
 * turnX: 방향 전환이 일어나는 x 좌표
 * r: 코너 반경 (|dy|/2 이하로 클램프)
 */
function elbowPath(x1, y1, x2, y2, turnX, r) {
  const dy = y2 - y1;

  if (Math.abs(dy) < 2) {
    return `M ${x1} ${y1} L ${x2} ${y2}`;
  }

  const cr = Math.min(r, Math.abs(dy) / 2, Math.abs(turnX - x1), Math.abs(x2 - turnX));
  const s = dy > 0 ? 1 : -1;

  return [
    `M ${x1} ${y1}`,
    `L ${turnX - cr} ${y1}`,
    `Q ${turnX} ${y1}, ${turnX} ${y1 + s * cr}`,
    `L ${turnX} ${y2 - s * cr}`,
    `Q ${turnX} ${y2}, ${turnX + cr} ${y2}`,
    `L ${x2} ${y2}`,
  ].join(' ');
}

/**
 * Stage 1 커브 — 프롬프트→바 노드
 * 전환 열: 고정 x=460 (컨테이너 우측과 barX 중간)
 */
export function sankeyBundle(x1, y1, x2, y2) {
  return elbowPath(x1, y1, x2, y2, 460, CORNER_R);
}

/**
 * Stage 2 커브 — 바 노드→출력
 * 전환 열: 고정 x=1400 (출력 근처, 모든 경로 동일 열에서 분기)
 */
export function fanCurve(x1, y1, x2, y2) {
  return elbowPath(x1, y1, x2, y2, 1400, CORNER_R);
}

// ============================================================
// 경로 생성
// ============================================================

/**
 * Stage 1: 프롬프트 컨테이너 → 바 노드
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

'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import { isoToScreen, r } from './isometricGrid';

/**
 * VP2 — Vibe Standard Tree
 *
 * 디자인 언어 체계의 택소노미 트리를 아이소메트릭 노드로 시각화.
 * 파라메트릭 레이아웃: Root(뒤) → L1 → L2 → L3(앞) 깊이 전개.
 *
 * 좌표 공식:
 *   L1[i] = (ix: SPREAD[i], iy: IY_STEP, iz: -IZ_STEP)
 *   L2[j] = (ix: parent.ix ± δ₂, iy: 2·IY_STEP, iz: -2·IZ_STEP)
 *   screen_x = ORIGIN.x + (ix - iy) × 8
 *   screen_y = ORIGIN.y + (ix + iy) × 4 - iz × 8
 *
 * @param {object} props - SVG props passthrough [Optional]
 */

const VB_X = 30;
const VB_Y = 50;
const VB_W = 400;
const VB_H = 330;
const SW = 0.5;

const ORIGIN = { x: 260, y: 153 };

const CONN_STROKE = 'var(--vdl-700)';
const CONN_DOT = 'var(--vdl-700)';

// ── Animation timing (ms) ───────────────────────────────
const DRAW_DUR = 400;
const LINE_DUR = 300;
const T = {
  ROOT_DRAW: 0,      ROOT_CONTENT: 300,
  CONN_01: 550,
  L1_DRAW: 750,      L1_CONTENT: 1050,
  CONN_12: 1250,
  L2_DRAW: 1450,     L2_CONTENT: 1750,
};

// ── Slab builder (V3 buildRectSlab 구조 동일) ──────────────
// Q-curve rounding: B/D split (upper+vert+lower), A/C face↔face

function buildVstSlab(ix, iy, iz, w, h, cornerR, origin) {
  const UNIT = 8;
  const hd = w * UNIT;
  const bh = h * UNIT;
  const cr = cornerR * UNIT;

  const base = isoToScreen(ix, iy, iz, origin);
  const cx = base.x;
  const topY = base.y - hd / 2 - bh;

  // Top face 4 vertices (symmetric: fw = fd = hd)
  const A = { x: cx, y: topY };
  const B = { x: cx + hd, y: topY + hd / 2 };
  const C = { x: cx, y: topY + hd };
  const D = { x: cx - hd, y: topY + hd / 2 };

  const s5 = Math.sqrt(5);
  const cuf = cr * 2 / s5;
  const cvf = cr / s5;

  // A (top) — face↔face
  const pA1 = { x: A.x - cuf, y: A.y + cvf };
  const pA2 = { x: A.x + cuf, y: A.y + cvf };

  // B (right) — split: upper + vert + lower
  const pB1 = { x: B.x - cuf, y: B.y - cvf };
  const pB2 = { x: B.x - cuf, y: B.y + cvf };
  const pB_R = { x: B.x - 0.5 * cuf, y: B.y };
  const qB1 = { x: B.x - 0.5 * cuf, y: B.y - 0.5 * cvf };
  const qB2 = { x: B.x - 0.5 * cuf, y: B.y + 0.5 * cvf };

  // C (front) — face↔face
  const pC1 = { x: C.x + cuf, y: C.y - cvf };
  const pC2 = { x: C.x - cuf, y: C.y - cvf };

  // D (left) — split: lower + vert + upper
  const pD1 = { x: D.x + cuf, y: D.y + cvf };
  const pD2 = { x: D.x + cuf, y: D.y - cvf };
  const pD_L = { x: D.x + 0.5 * cuf, y: D.y };
  const qD1 = { x: D.x + 0.5 * cuf, y: D.y + 0.5 * cvf };
  const qD2 = { x: D.x + 0.5 * cuf, y: D.y - 0.5 * cvf };

  const Sy = (y) => y + bh;

  const outline = [
    `M${r(pA1.x)} ${r(pA1.y)}`,
    `Q${r(A.x)} ${r(A.y)} ${r(pA2.x)} ${r(pA2.y)}`,
    `L${r(pB1.x)} ${r(pB1.y)}`,
    `Q${r(qB1.x)} ${r(qB1.y)} ${r(pB_R.x)} ${r(pB_R.y)}`,
    `L${r(pB_R.x)} ${r(Sy(pB_R.y))}`,
    `Q${r(qB2.x)} ${r(Sy(qB2.y))} ${r(pB2.x)} ${r(Sy(pB2.y))}`,
    `L${r(pC1.x)} ${r(Sy(pC1.y))}`,
    `Q${r(C.x)} ${r(Sy(C.y))} ${r(pC2.x)} ${r(Sy(pC2.y))}`,
    `L${r(pD1.x)} ${r(Sy(pD1.y))}`,
    `Q${r(qD1.x)} ${r(Sy(qD1.y))} ${r(pD_L.x)} ${r(Sy(pD_L.y))}`,
    `L${r(pD_L.x)} ${r(pD_L.y)}`,
    `Q${r(qD2.x)} ${r(qD2.y)} ${r(pD2.x)} ${r(pD2.y)}`,
    'Z',
  ].join('');

  const vLine = [
    `M${r(pD_L.x)} ${r(pD_L.y)}`,
    `Q${r(qD1.x)} ${r(qD1.y)} ${r(pD1.x)} ${r(pD1.y)}`,
    `L${r(pC2.x)} ${r(pC2.y)}`,
    `Q${r(C.x)} ${r(C.y)} ${r(pC1.x)} ${r(pC1.y)}`,
    `L${r(pB2.x)} ${r(pB2.y)}`,
    `Q${r(qB2.x)} ${r(qB2.y)} ${r(pB_R.x)} ${r(pB_R.y)}`,
  ].join('');

  const pC_M = { x: C.x, y: C.y - 0.5 * cvf };
  const frontEdge = `M${r(pC_M.x)} ${r(pC_M.y)}L${r(pC_M.x)} ${r(Sy(pC_M.y))}`;

  const topTransform = `matrix(1, 0.5, -1, 0.5, ${r(cx)}, ${r(topY)})`;
  const pathLen = Math.ceil(4.5 * hd + 2 * bh);

  return {
    outline, vLine, frontEdge, topTransform, pathLen,
    hd, bh, cx, topY,
    top: A,
    right: B,
    rightBottom: { x: B.x, y: Sy(B.y) },
    frontTop: C,
    frontBottom: { x: C.x, y: Sy(C.y) },
    leftBottom: { x: D.x, y: Sy(D.y) },
    left: D,
    topCenter: { x: cx, y: topY + hd / 2 },
    bottomCenter: { x: cx, y: topY + hd / 2 + bh },
    rightMid: { x: pB_R.x, y: pB_R.y + bh / 2 },
    leftMid: { x: pD_L.x, y: pD_L.y + bh / 2 },
  };
}

// ── 파라메트릭 레이아웃 ─────────────────────────────────
// IY_STEP=5, IZ_STEP=8, δ₁=5(L1), δ₂=1.5(L2)
// 각 레벨은 iy 방향(앞)으로 전진, iz 방향(아래)으로 하강
// → 아이소메트릭 깊이감 있는 트리 구도

const TREE_NODES = [
  // L0 Root — (0, 0, 0)  ×1.1
  { id: 'root', level: 0, ix: 0, iy: 0, iz: 0, w: 5.61, h: 1.63, cr: 0.94, type: 'dashboard', parent: null },

  // L1 — iy=5, iz=-8, ix=[-9, -3, 3, 9]  ×1.1
  { id: 'l1a', level: 1, ix: -9, iy: 5, iz: -8, w: 4.02, h: 1.38, cr: 0.72, type: 'browser',    parent: 'root' },
  { id: 'l1b', level: 1, ix: -3, iy: 5, iz: -8, w: 4.02, h: 1.38, cr: 0.72, type: 'sCurve',     parent: 'root' },
  { id: 'l1c', level: 1, ix: 3,  iy: 5, iz: -8, w: 4.02, h: 1.38, cr: 0.72, type: 'artboard',   parent: 'root' },
  { id: 'l1d', level: 1, ix: 9,  iy: 5, iz: -8, w: 4.02, h: 1.38, cr: 0.72, type: 'splitPanel', parent: 'root' },

  // L2 — iy=10, iz=-16, 균등 간격 step=3  ×1.1
  { id: 'l2a1', level: 2, ix: -11.55, iy: 10, iz: -16, w: 1.98, h: 1.38, cr: 0.39, type: 'pill',     parent: 'l1a' },
  { id: 'l2a2', level: 2, ix: -8.25,  iy: 10, iz: -16, w: 1.98, h: 1.38, cr: 0.39, type: 'diagonal', parent: 'l1a' },
  { id: 'l2b1', level: 2, ix: -4.95,  iy: 10, iz: -16, w: 1.98, h: 1.38, cr: 0.39, type: 'zigzag',  parent: 'l1b' },
  { id: 'l2b2', level: 2, ix: -1.65,  iy: 10, iz: -16, w: 1.98, h: 1.38, cr: 0.39, type: 'list',    parent: 'l1b' },
  { id: 'l2c1', level: 2, ix: 1.65,   iy: 10, iz: -16, w: 1.98, h: 1.38, cr: 0.39, type: 'grid',    parent: 'l1c' },
  { id: 'l2c2', level: 2, ix: 4.95,   iy: 10, iz: -16, w: 1.98, h: 1.38, cr: 0.39, type: 'letterA', parent: 'l1c' },
  { id: 'l2d1', level: 2, ix: 8.25,   iy: 10, iz: -16, w: 1.98, h: 1.38, cr: 0.39, type: 'circles', parent: 'l1d' },
  { id: 'l2d2', level: 2, ix: 11.55,  iy: 10, iz: -16, w: 1.98, h: 1.38, cr: 0.39, type: 'chevron', parent: 'l1d' },
];

// L3 Leaf dots — iy=13, iz=-20, parent.ix 직하
const LEAF_DOTS = [
  { id: 'l3a', ix: -10.5, iy: 13, iz: -20, parent: 'l2a1' },
  { id: 'l3b', ix: -1.5,  iy: 13, iz: -20, parent: 'l2b2' },
  { id: 'l3c', ix: 1.5,   iy: 13, iz: -20, parent: 'l2c1' },
  { id: 'l3d', ix: 10.5,  iy: 13, iz: -20, parent: 'l2d2' },
];

// ── Top Face Content (flat hd×hd 좌표계) ────────────────
// topTransform이 flat → isometric으로 변환

function TopFaceContent({ type, hd }) {
  const p = hd * 0.15;
  const s = hd - 2 * p;
  const csw = Math.max(SW, 10 / hd);   // 노드 크기에 반비례, 최소 SW
  const W = 'white';
  const S = 'var(--vdl-700)';

  switch (type) {
    case 'dashboard': {
      const divX = p + s * 0.35;
      const gridX = divX + 1.5;
      const gridW = p + s - gridX;
      const gCol = gridW / 3;
      const gRow = s / 3;
      return (
        <g fill="none" strokeWidth={csw}>
          <line x1={p + 1} y1={p + s * 0.12} x2={p + s * 0.18} y2={p + s * 0.12} stroke={W} opacity={0.5} />
          <circle cx={p + s * 0.06} cy={p + s * 0.82} r={1.2} fill={S} />
          <circle cx={p + s * 0.14} cy={p + s * 0.82} r={1.2} fill={S} />
          <circle cx={p + s * 0.22} cy={p + s * 0.82} r={1.2} fill={S} />
          <circle cx={p + s * 0.30} cy={p + s * 0.82} r={1.2} fill={S} />
          <line x1={divX} y1={p} x2={divX} y2={p + s} stroke={S} opacity={0.5} />
          <rect x={gridX} y={p} width={gridW} height={s} rx={1} stroke={W} opacity={0.5} />
          <line x1={gridX + gCol} y1={p} x2={gridX + gCol} y2={p + s} stroke={S} opacity={0.4} />
          <line x1={gridX + 2 * gCol} y1={p} x2={gridX + 2 * gCol} y2={p + s} stroke={S} opacity={0.4} />
          <line x1={gridX} y1={p + gRow} x2={gridX + gridW} y2={p + gRow} stroke={S} opacity={0.4} />
          <line x1={gridX} y1={p + 2 * gRow} x2={gridX + gridW} y2={p + 2 * gRow} stroke={S} opacity={0.4} />
        </g>
      );
    }
    case 'browser':
      return (
        <g fill="none" strokeWidth={csw}>
          <rect x={p} y={p} width={s} height={s} rx={1.5} stroke={W} />
          <line x1={p} y1={p + s * 0.2} x2={p + s} y2={p + s * 0.2} stroke={W} />
          <circle cx={p + s * 0.12} cy={p + s * 0.1} r={1} fill={S} />
          <circle cx={p + s * 0.24} cy={p + s * 0.1} r={1} fill={S} />
          <circle cx={p + s * 0.36} cy={p + s * 0.1} r={1} fill={S} />
          <line x1={p + 2} y1={p + s * 0.45} x2={p + s - 2} y2={p + s * 0.45} stroke={S} opacity={0.5} />
          <line x1={p + 2} y1={p + s * 0.65} x2={p + s * 0.55} y2={p + s * 0.65} stroke={S} opacity={0.5} />
        </g>
      );
    case 'sCurve':
      return (
        <g fill="none" strokeWidth={csw}>
          <rect x={p} y={p} width={s} height={s} rx={1.5} stroke={S} opacity={0.4} />
          <path
            d={`M${p + s * 0.1} ${p + s * 0.78}C${p + s * 0.35} ${p + s * 0.05} ${p + s * 0.65} ${p + s * 0.95} ${p + s * 0.9} ${p + s * 0.22}`}
            stroke={W} strokeWidth={csw * 1.5} strokeLinecap="round"
          />
        </g>
      );
    case 'artboard':
      return (
        <g fill="none" strokeWidth={csw}>
          <rect x={p} y={p} width={s} height={s} rx={1.5} stroke={W} opacity={0.35} />
        </g>
      );
    case 'splitPanel':
      return (
        <g fill="none" strokeWidth={csw}>
          <rect x={p} y={p} width={s} height={s} rx={1} stroke={W} />
          <line x1={p + s * 0.5} y1={p + 2} x2={p + s * 0.5} y2={p + s - 2} stroke={S} opacity={0.7} />
        </g>
      );
    case 'pill':
      return (
        <rect x={p + 1} y={p + s * 0.3} width={s - 2} height={s * 0.4} rx={s * 0.2}
          stroke={W} strokeWidth={csw} fill="none" />
      );
    case 'diagonal':
      return (
        <g fill="none" strokeWidth={csw}>
          <rect x={p} y={p} width={s} height={s} rx={0.8} stroke={S} opacity={0.4} />
          <line x1={p + 1} y1={p + s - 1} x2={p + s - 1} y2={p + 1} stroke={W} />
        </g>
      );
    case 'zigzag':
      return (
        <path
          d={`M${p + 1} ${p + s * 0.7}L${p + s * 0.35} ${p + s * 0.2}L${p + s * 0.65} ${p + s * 0.8}L${p + s - 1} ${p + s * 0.3}`}
          fill="none" stroke={W} strokeWidth={csw} strokeLinecap="round" strokeLinejoin="round"
        />
      );
    case 'list':
      return (
        <g fill="none" strokeWidth={csw}>
          <line x1={p + 1} y1={p + s * 0.22} x2={p + s - 1} y2={p + s * 0.22} stroke={W} />
          <line x1={p + 1} y1={p + s * 0.42} x2={p + s - 1} y2={p + s * 0.42} stroke={W} />
          <line x1={p + 1} y1={p + s * 0.62} x2={p + s - 1} y2={p + s * 0.62} stroke={W} />
          <line x1={p + 1} y1={p + s * 0.82} x2={p + s * 0.65} y2={p + s * 0.82} stroke={S} opacity={0.6} />
        </g>
      );
    case 'grid': {
      const gs = (s - 1.5) / 2;
      return (
        <g fill="none" strokeWidth={csw}>
          <rect x={p} y={p} width={gs} height={gs} rx={0.5} stroke={W} />
          <rect x={p + gs + 1.5} y={p} width={gs} height={gs} rx={0.5} stroke={W} />
          <rect x={p} y={p + gs + 1.5} width={gs} height={gs} rx={0.5} stroke={W} />
          <rect x={p + gs + 1.5} y={p + gs + 1.5} width={gs} height={gs} rx={0.5} stroke={W} />
        </g>
      );
    }
    case 'letterA':
      return (
        <g fill="none" strokeWidth={csw}>
          <line x1={p + s * 0.5} y1={p + 1} x2={p + 1.5} y2={p + s - 1} stroke={W} />
          <line x1={p + s * 0.5} y1={p + 1} x2={p + s - 1.5} y2={p + s - 1} stroke={W} />
          <line x1={p + s * 0.27} y1={p + s * 0.58} x2={p + s * 0.73} y2={p + s * 0.58} stroke={S} />
        </g>
      );
    case 'circles':
      return (
        <g fill="none" strokeWidth={csw}>
          <circle cx={p + s * 0.22} cy={p + s * 0.5} r={s * 0.14} stroke={W} />
          <circle cx={p + s * 0.5} cy={p + s * 0.5} r={s * 0.14} stroke={W} />
          <circle cx={p + s * 0.78} cy={p + s * 0.5} r={s * 0.14} stroke={W} />
        </g>
      );
    case 'chevron':
      return (
        <path
          d={`M${p + 1.5} ${p + s * 0.3}L${p + s * 0.5} ${p + s * 0.7}L${p + s - 1.5} ${p + s * 0.3}`}
          fill="none" stroke={W} strokeWidth={csw} strokeLinecap="round" strokeLinejoin="round"
        />
      );
    default:
      return null;
  }
}

// ── Slab renderer ────────────────────────────────────────

function SlabNode({ node, inView, drawDelay, contentDelay }) {
  const s = node.slab;
  const clip = `url(#vst-clip-${node.id})`;

  return (
    <g filter="url(#vsts)">
      {/* Phase 1: outline draws itself */}
      <path
        d={s.outline} fill="var(--vdl-950)" stroke="white"
        strokeWidth={SW} strokeLinejoin="round"
        className={inView ? 'vst-draw' : 'vst-outline-hidden'}
        style={{ '--len': s.pathLen, '--delay': `${drawDelay}ms` }}
      />
      {/* Phase 2: inner content fades in */}
      <g
        className={inView ? 'vst-fade' : 'vst-hidden'}
        style={{ '--delay': `${contentDelay}ms` }}
      >
        <path d={s.vLine} fill="none" stroke="var(--vdl-800)" strokeWidth={SW} strokeLinecap="round" clipPath={clip} />
        <path d={s.frontEdge} fill="none" stroke="var(--vdl-800)" strokeWidth={SW} strokeLinecap="round" clipPath={clip} />
        <g transform={s.topTransform}>
          <TopFaceContent type={node.type} hd={s.hd} />
        </g>
      </g>
    </g>
  );
}

// ── Direction-aware face connection ──────────────────────
// 슬랩 다이아몬드 4면: AB(우상), BC(우하), CD(좌하), DA(좌상)
// 각 면의 법선과 방향벡터 내적으로 가장 가까운 면을 결정한 뒤,
// 해당 면의 하단 변 중점(출발) 또는 상단 변 중점(도착)을 반환.

function faceMid(slab, face, isBottom) {
  const { cx, hd, topY, bh } = slab;
  const y0 = isBottom ? bh : 0;
  const pts = {
    AB: { x: cx + hd / 2, y: topY + hd / 4 + y0 },
    BC: { x: cx + hd / 2, y: topY + hd * 3 / 4 + y0 },
    CD: { x: cx - hd / 2, y: topY + hd * 3 / 4 + y0 },
    DA: { x: cx - hd / 2, y: topY + hd / 4 + y0 },
  };
  return pts[face];
}

function nearestFace(dx, dy) {
  const d = [
    { f: 'AB', v: dx - 2 * dy },
    { f: 'BC', v: dx + 2 * dy },
    { f: 'CD', v: -dx + 2 * dy },
    { f: 'DA', v: -dx - 2 * dy },
  ];
  return d.reduce((a, b) => (a.v > b.v ? a : b)).f;
}

// 트리 깊이 방향(Δiy=5, Δiz=-8)의 화면 벡터로 면 결정.
// ix 편차를 무시해야 모든 연결이 동일 면(CD 출발, AB 도착)을 사용.
const TREE_DIR = (() => {
  const diy = 5, diz = -8;
  return { dx: -diy * 8, dy: diy * 4 - diz * 8 };
})();

function connPoints(parentSlab, childSlab) {
  return {
    from: faceMid(parentSlab, nearestFace(TREE_DIR.dx, TREE_DIR.dy), true),
    to: faceMid(childSlab, nearestFace(-TREE_DIR.dx, -TREE_DIR.dy), false),
  };
}

// ── Connection Line + Junction Dots ─────────────────────

function ConnLine({ from, to, inView, lineDelay }) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.ceil(Math.sqrt(dx * dx + dy * dy));

  return (
    <g>
      <line
        x1={r(from.x)} y1={r(from.y)}
        x2={r(to.x)} y2={r(to.y)}
        stroke={CONN_STROKE} strokeWidth={0.5}
        className={inView ? 'vst-line' : 'vst-line-hidden'}
        style={{ '--len': len, '--delay': `${lineDelay}ms` }}
      />
      <circle
        cx={r(from.x)} cy={r(from.y)} r={1.5} fill="white"
        className={inView ? 'vst-fade' : 'vst-hidden'}
        style={{ '--delay': `${lineDelay}ms` }}
      />
      <circle
        cx={r(to.x)} cy={r(to.y)} r={1.5} fill="white"
        className={inView ? 'vst-fade' : 'vst-hidden'}
        style={{ '--delay': `${lineDelay + LINE_DUR - 50}ms` }}
      />
    </g>
  );
}

// ── Main Component ──────────────────────────────────────

const VibeStandardTree = forwardRef(({ delay: baseDelay = 0, ...props }, ref) => {
  const innerRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); io.disconnect(); } },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const nodes = TREE_NODES.map((n) => ({
    ...n,
    slab: buildVstSlab(n.ix, n.iy, n.iz, n.w, n.h, n.cr, ORIGIN),
  }));

  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  // Painter's model: back-to-front (ix ascending within level)
  const root = nodes.find((n) => n.level === 0);
  const sortedL1 = nodes.filter((n) => n.level === 1).sort((a, b) => a.ix - b.ix);
  const sortedL2 = nodes.filter((n) => n.level === 2).sort((a, b) => a.ix - b.ix);

  // Offset all timings by baseDelay (syncs with AreaConstruct reveal)
  const d = Object.fromEntries(Object.entries(T).map(([k, v]) => [k, v + baseDelay]));

  return (
    <svg
      ref={(node) => {
        innerRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`${VB_X} ${VB_Y} ${VB_W} ${VB_H}`}
      fill="none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <style>{`
        @keyframes vst-draw {
          to { stroke-dashoffset: 0; fill-opacity: 1; }
        }
        @keyframes vst-fade {
          to { opacity: 1; }
        }
        @keyframes vst-line-draw {
          to { stroke-dashoffset: 0; }
        }
        .vst-outline-hidden {
          stroke-dasharray: var(--len);
          stroke-dashoffset: var(--len);
          fill-opacity: 0;
        }
        .vst-draw {
          stroke-dasharray: var(--len);
          stroke-dashoffset: var(--len);
          fill-opacity: 0;
          animation: vst-draw ${DRAW_DUR}ms ease-out var(--delay) forwards;
        }
        .vst-hidden { opacity: 0.01; }
        .vst-fade {
          opacity: 0.01;
          animation: vst-fade 300ms ease-out var(--delay) forwards;
        }
        .vst-line-hidden {
          stroke-dasharray: var(--len);
          stroke-dashoffset: var(--len);
        }
        .vst-line {
          stroke-dasharray: var(--len);
          stroke-dashoffset: var(--len);
          animation: vst-line-draw ${LINE_DUR}ms ease-out var(--delay) forwards;
        }
        .vst-glow-halo {
          opacity: 0.01;
          transition: opacity 400ms ease-out 0ms;
        }
        .vst-glow-fill {
          opacity: 0.01;
          transition: opacity 300ms ease-out 0ms;
        }
        .vst-hovered .vst-glow-halo {
          opacity: 0.4;
          transition-delay: var(--glow-delay);
        }
        .vst-hovered .vst-glow-fill {
          opacity: 0.15;
          transition-delay: var(--glow-delay);
        }
        @media (prefers-reduced-motion: reduce) {
          .vst-draw { fill-opacity: 1; stroke-dashoffset: 0; animation: none; }
          .vst-fade { opacity: 1; animation: none; }
          .vst-line { stroke-dashoffset: 0; animation: none; }
          .vst-glow-halo, .vst-glow-fill { transition: none; }
          .vst-hovered .vst-glow-halo { opacity: 0.4; }
          .vst-hovered .vst-glow-fill { opacity: 0.15; }
        }
      `}</style>
      <defs>
        <filter
          id="vsts"
          x={VB_X - 40}
          y={VB_Y - 40}
          width={VB_W + 80}
          height={VB_H + 80}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="bg" />
          <feColorMatrix
            in="SourceAlpha" result="a"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="8" />
          <feComposite in2="a" operator="out" />
          <feColorMatrix values="0 0 0 0 0.031 0 0 0 0 0.035 0 0 0 0 0.039 0 0 0 0.6 0" />
          <feBlend in2="bg" result="shadow" />
          <feBlend in="SourceGraphic" in2="shadow" result="shape" />
        </filter>
        <filter id="vst-glow-f" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        {nodes.map((n) => (
          <clipPath key={n.id} id={`vst-clip-${n.id}`}>
            <path d={n.slab.outline} />
          </clipPath>
        ))}
      </defs>

      {/* ── Slabs: back(Root) → front(L2) ── */}

      {/* ── Root slab ── */}
      {root && (
        <SlabNode node={root} inView={inView} drawDelay={d.ROOT_DRAW} contentDelay={d.ROOT_CONTENT} />
      )}

      {/* ── L1 slabs ── */}
      {sortedL1.map((n) => (
        <SlabNode key={n.id} node={n} inView={inView} drawDelay={d.L1_DRAW} contentDelay={d.L1_CONTENT} />
      ))}

      {/* ── L2 slabs ── */}
      {sortedL2.map((n) => (
        <SlabNode key={n.id} node={n} inView={inView} drawDelay={d.L2_DRAW} contentDelay={d.L2_CONTENT} />
      ))}

      {/* ── Connections on top of slabs ── */}

      {/* ── Root → L1 connections ── */}
      {sortedL1.map((n) => {
        const p = nodeMap[n.parent];
        if (!p) return null;
        const { from, to } = connPoints(p.slab, n.slab);
        return <ConnLine key={`c-${n.id}`} from={from} to={to} inView={inView} lineDelay={d.CONN_01} />;
      })}

      {/* ── L1 → L2 connections ── */}
      {sortedL2.map((n) => {
        const p = nodeMap[n.parent];
        if (!p) return null;
        const { from, to } = connPoints(p.slab, n.slab);
        return <ConnLine key={`c-${n.id}`} from={from} to={to} inView={inView} lineDelay={d.CONN_12} />;
      })}

      {/* ── L2 slab glow (hover) ── */}
      <g className={isHovered ? 'vst-hovered' : undefined}>
        {sortedL2.map((n, i) => (
          <g key={`glow-${n.id}`} style={{ '--glow-delay': `${i * 80}ms` }}>
            <path
              d={n.slab.outline}
              fill="var(--vdl-200)" filter="url(#vst-glow-f)"
              className="vst-glow-halo"
            />
            <path
              d={n.slab.outline}
              fill="var(--vdl-200)"
              className="vst-glow-fill"
            />
          </g>
        ))}
      </g>

    </svg>
  );
});

VibeStandardTree.displayName = 'VibeStandardTree';

export { VibeStandardTree };

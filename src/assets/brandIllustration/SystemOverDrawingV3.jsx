'use client';

import { forwardRef } from 'react';
import { namingLine, r } from './isometricGrid';

/**
 * VP1 — System Over Drawing V3
 *
 * "기준을 먼저 설계하는 과정"
 * 5개 디자인 토큰 레이어가 합쳐지기 직전의 분해도.
 * 직사각형 아이소메트릭 슬래브 (fw ≠ fd).
 *
 * @param {object} props - SVG props passthrough [Optional]
 */

const VB_W = 600;
const VB_H = 450;
const O_Y = 288;       // 수직 기준점 (unchanged)
const RIGHT_X = 372;  // 우측정렬 기준점 — 모든 슬래브 right vertex x

const FW = 97;     // TopFaceContent flat 좌표 기준 폭 (변경 금지)
const FD = 65;     // TopFaceContent flat 좌표 기준 깊이 (변경 금지)
const BH = 11;
const CR = 8;
const SW = 0.5; // 통일 헤어라인 스트로크

// 측정: 아래 레이어일수록 큰 슬래브, 우측정렬, 간격 좁게
const LAYERS = [
  { iz: 0,  id: 'background', label: 'BACKGROUND',   stroke: 'white', sw: SW, fw: 159, fd: 106 },
  { iz: 5,  id: 'spatial',    label: 'LAYOUT',       stroke: 'white', sw: SW, fw: 142, fd: 95  },
  { iz: 10, id: 'motion',     label: 'MOTION',       stroke: 'white', sw: SW, fw: 125, fd: 84  },
  { iz: 15, id: 'color',      label: 'COLOR TOKEN',  stroke: 'white', sw: SW, fw: 108, fd: 73  },
  { iz: 20, id: 'typography', label: 'TYPOGRAPHY',   stroke: 'white', sw: SW, fw: 105, fd: 70  },
];

// ── Rectangular Isometric Slab (Gemini 방식) ──
// 윗면 4꼭짓점(A,B,C,D) 패럴러그램 라운딩
// B(우), D(좌): 반분 Q-curve 2개 + 수직 직선으로 연결
// A(상), C(하): face↔face Q-curve

function buildRectSlab(iz, fw, fd) {
  const UNIT = 8;
  const baseY = O_Y - iz * UNIT;
  const cx = RIGHT_X - fw;
  const topY = baseY - (fw + fd) / 4 - BH;

  // 윗면 4꼭짓점
  const A = { x: cx, y: topY };
  const B = { x: cx + fw, y: topY + fw / 2 };
  const C = { x: cx + fw - fd, y: topY + (fw + fd) / 2 };
  const D = { x: cx - fd, y: topY + fd / 2 };

  const s5 = Math.sqrt(5);
  const cuf = CR * 2 / s5;
  const cvf = CR / s5;

  // A (상) — face↔face
  const pA1 = { x: A.x - cuf, y: A.y + cvf };
  const pA2 = { x: A.x + cuf, y: A.y + cvf };

  // B (우) — 반분 Q-curve: 상반 + 수직 + 하반
  const pB1 = { x: B.x - cuf, y: B.y - cvf };
  const pB2 = { x: B.x - cuf, y: B.y + cvf };
  const pB_R = { x: B.x - 0.5 * cuf, y: B.y };
  const qB1 = { x: B.x - 0.5 * cuf, y: B.y - 0.5 * cvf };
  const qB2 = { x: B.x - 0.5 * cuf, y: B.y + 0.5 * cvf };

  // C (전면/하) — face↔face
  const pC1 = { x: C.x + cuf, y: C.y - cvf };
  const pC2 = { x: C.x - cuf, y: C.y - cvf };

  // D (좌) — 반분 Q-curve: 하반 + 수직 + 상반
  const pD1 = { x: D.x + cuf, y: D.y + cvf };
  const pD2 = { x: D.x + cuf, y: D.y - cvf };
  const pD_L = { x: D.x + 0.5 * cuf, y: D.y };
  const qD1 = { x: D.x + 0.5 * cuf, y: D.y + 0.5 * cvf };
  const qD2 = { x: D.x + 0.5 * cuf, y: D.y - 0.5 * cvf };

  const Sy = (y) => y + BH;

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

  // vLine: D하반 → C(frontTop) Q-curve → B하반
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

  // topTransform: BASE (FW×FD) flat 좌표 → 실제 fw×fd 슬래브 상면 매핑
  const sx = fw / FW;
  const sy = fd / FD;
  const topTransform = `matrix(${r(sx)}, ${r(sx / 2)}, ${r(-sy)}, ${r(sy / 2)}, ${r(cx)}, ${r(topY)})`;

  return {
    outline, vLine, frontEdge, topTransform,
    fw, fd, bh: BH, cx, topY,
    frontTop: C,
    top: A,
    right: B,
    rightBottom: { x: B.x, y: Sy(B.y) },
    frontBottom: { x: C.x, y: Sy(C.y) },
    leftBottom: { x: D.x, y: Sy(D.y) },
    left: D,
    rightMid: { x: pB_R.x, y: pB_R.y + BH / 2 },
    leftMid: { x: pD_L.x, y: pD_L.y + BH / 2 },
  };
}

// ── Stroke → Fill Helpers (thick stroke → closed filled path) ──

function lineToFill(x1, y1, x2, y2, w) {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const hw = w / 2;
  const nx = (-dy / len) * hw, ny = (dx / len) * hw;
  return `M${r(x1+nx)} ${r(y1+ny)}L${r(x2+nx)} ${r(y2+ny)}L${r(x2-nx)} ${r(y2-ny)}L${r(x1-nx)} ${r(y1-ny)}Z`;
}

function ringPath(cx, cy, R, sw) {
  const ro = R + sw / 2, ri = Math.max(0, R - sw / 2);
  return `M${r(cx-ro)} ${r(cy)}A${r(ro)} ${r(ro)} 0 1 1 ${r(cx+ro)} ${r(cy)}A${r(ro)} ${r(ro)} 0 1 1 ${r(cx-ro)} ${r(cy)}Z`
    + `M${r(cx-ri)} ${r(cy)}A${r(ri)} ${r(ri)} 0 1 0 ${r(cx+ri)} ${r(cy)}A${r(ri)} ${r(ri)} 0 1 0 ${r(cx-ri)} ${r(cy)}Z`;
}

function ellipseRingPath(cx, cy, rx, ry, sw) {
  const rox = rx + sw / 2, roy = ry + sw / 2;
  const rix = Math.max(0, rx - sw / 2), riy = Math.max(0, ry - sw / 2);
  return `M${r(cx-rox)} ${r(cy)}A${r(rox)} ${r(roy)} 0 1 1 ${r(cx+rox)} ${r(cy)}A${r(rox)} ${r(roy)} 0 1 1 ${r(cx-rox)} ${r(cy)}Z`
    + `M${r(cx-rix)} ${r(cy)}A${r(rix)} ${r(riy)} 0 1 0 ${r(cx+rix)} ${r(cy)}A${r(rix)} ${r(riy)} 0 1 0 ${r(cx-rix)} ${r(cy)}Z`;
}

// ── Top Face Content (FW × FD flat coordinate space) ──

function TopFaceContent({ id }) {
  const pad = 6;
  const iw = FW - 2 * pad; // 85
  const ih = FD - 2 * pad; // 53

  switch (id) {
    case 'background': {
      // Diagonal hatching — depth gradient (back→front: subtle→visible)
      const step = 5;
      const hatchLines = [];
      for (let d = step; d < iw + ih; d += step) {
        const l = {
          x1: pad + Math.max(0, d - ih),
          y1: pad + Math.min(d, ih),
          x2: pad + Math.min(d, iw),
          y2: pad + Math.max(0, d - iw),
        };
        const avgPos = (l.x1 + l.x2 + l.y1 + l.y2) / 4;
        const t = Math.min(1, (avgPos - pad) / (iw * 0.7));
        l.opacity = 0.12 + t * 0.38;
        hatchLines.push(l);
      }
      return (
        <g fill="none" strokeWidth={SW}>
          <rect x={pad} y={pad} width={iw} height={ih} rx="3"
            stroke="white" />
          {hatchLines.map((l, i) => (
            <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
              stroke="var(--vdl-700)" opacity={l.opacity} />
          ))}
        </g>
      );
    }

    case 'spatial': {
      // Grid — non-uniform spacing for rhythm
      const vCols = [0.18, 0.38, 0.62, 0.82];
      const hRows = [0.22, 0.48, 0.78];
      return (
        <g fill="none" strokeWidth={SW}>
          <rect x={pad} y={pad} width={iw} height={ih} rx="3"
            stroke="white" />
          {vCols.map((u) => (
            <line key={`v${u}`} x1={FW * u} y1={pad} x2={FW * u} y2={FD - pad}
              stroke="var(--vdl-700)" opacity={u > 0.5 ? 0.7 : 0.4} />
          ))}
          {hRows.map((v) => (
            <line key={`h${v}`} x1={pad} y1={FD * v} x2={FW - pad} y2={FD * v}
              stroke="var(--vdl-700)" opacity={v > 0.5 ? 0.7 : 0.4} />
          ))}
        </g>
      );
    }

    case 'motion': {
      // Cubic Bezier curve visualization with control handles
      const p0 = { x: pad + 3, y: FD * 0.85 };
      const p1 = { x: FW * 0.35, y: FD * 0.38 };
      const p2 = { x: FW * 0.65, y: FD * 0.85 };
      const p3 = { x: FW - pad - 3, y: FD * 0.45 };

      return (
        <g fill="none">
          {/* Control handle lines (internal → subtle) */}
          <line x1={p0.x} y1={p0.y} x2={p1.x} y2={p1.y}
            stroke="var(--vdl-700)" strokeWidth={SW} strokeDasharray="2 2" />
          <line x1={p3.x} y1={p3.y} x2={p2.x} y2={p2.y}
            stroke="var(--vdl-700)" strokeWidth={SW} strokeDasharray="2 2" />
          {/* Bezier curve (silhouette → white) */}
          <path
            d={`M${p0.x} ${p0.y}C${p1.x} ${p1.y} ${p2.x} ${p2.y} ${p3.x} ${p3.y}`}
            stroke="white" strokeWidth={SW} strokeLinecap="round"
          />
          {/* Anchor points (silhouette → white) */}
          <circle cx={p0.x} cy={p0.y} r={2} fill="white" />
          <circle cx={p3.x} cy={p3.y} r={2.5} fill="white" />
          {/* Control points (internal → subtle) */}
          <circle cx={p1.x} cy={p1.y} r={1.5} stroke="var(--vdl-700)" strokeWidth={SW} />
          <circle cx={p2.x} cy={p2.y} r={1.8} stroke="var(--vdl-700)" strokeWidth={SW} />
        </g>
      );
    }

    case 'color': {
      // Actual violet-gray scale swatches
      const swatches = [
        'var(--vdl-50)',  'var(--vdl-100)', 'var(--vdl-200)',
        'var(--vdl-400)', 'var(--vdl-600)', 'var(--vdl-800)', 'var(--vdl-950)',
      ];
      return (
        <g strokeWidth={SW}>
          {swatches.map((c, i) => (
            <circle
              key={i}
              cx={pad + 6 + i * ((iw - 12) / 6)}
              cy={FD - pad * 2.5}
              r={5}
              fill={c}
              stroke="white"
            />
          ))}
        </g>
      );
    }

    case 'typography': {
      const fontSize = ih * 0.64;
      return (
        <text
          x={pad}
          y={FD * 0.5 + fontSize * 0.35}
          fill="white"
          fontSize={fontSize}
          fontFamily="'DM Serif Display', serif"
          fontWeight="400"
        >
          VIBE
        </text>
      );
    }

    default:
      return null;
  }
}

// ── Main Component ──

const SystemOverDrawingV3 = forwardRef((props, ref) => {
  const layers = LAYERS.map((l) => ({
    ...l,
    p: buildRectSlab(l.iz, l.fw, l.fd),
  }));

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      fill="none"
      {...props}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap');
        @keyframes sod3-enter {
          from { opacity: 0.01; transform: translateY(16px); }
          to   { opacity: 1;    transform: translateY(0); }
        }
        .sod3-layer {
          opacity: 0.01;
          animation: sod3-enter 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .sod3-l0 { animation-delay: 0s; }
        .sod3-l1 { animation-delay: 0.12s; }
        .sod3-l2 { animation-delay: 0.24s; }
        .sod3-l3 { animation-delay: 0.36s; }
        .sod3-l4 { animation-delay: 0.48s; }
        @media (prefers-reduced-motion: reduce) {
          .sod3-layer { animation: none; opacity: 1; }
        }
      `}</style>
      <defs>
        <filter
          id="sod3s"
          x="-40"
          y="-40"
          width={VB_W + 80}
          height={VB_H + 80}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="bg" />
          <feColorMatrix
            in="SourceAlpha"
            result="a"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="8" />
          <feComposite in2="a" operator="out" />
          <feColorMatrix values="0 0 0 0 0.031 0 0 0 0 0.035 0 0 0 0 0.039 0 0 0 0.6 0" />
          <feBlend in2="bg" result="shadow" />
          <feBlend in="SourceGraphic" in2="shadow" result="shape" />
        </filter>
        {/* 슬래브별 clipPath — vLine/frontEdge가 rounded corner 밖으로 삐져나오지 않도록 */}
        {layers.map((l) => (
          <clipPath key={l.id} id={`sod3-clip-${l.id}`}>
            <path d={l.p.outline} />
          </clipPath>
        ))}
      </defs>

      {/* ── Layers + Naming Lines (staggered entrance) ── */}
      {layers.map((l, i) => {
        const anchor = l.p.rightMid;
        const nl = namingLine(anchor.x + 5, anchor.y, 40);

        return (
          <g key={l.id} className={`sod3-layer sod3-l${i}`}>
            {/* Container */}
            <g filter="url(#sod3s)">
              <path
                d={l.p.outline}
                fill="var(--vdl-950)"
                stroke={l.stroke}
                strokeWidth={l.sw}
                strokeLinejoin="round"
              />
              <path
                d={l.p.vLine}
                fill="none"
                stroke="var(--vdl-800)"
                strokeWidth={SW}
                strokeLinecap="round"
                clipPath={`url(#sod3-clip-${l.id})`}
              />
              <path
                d={l.p.frontEdge}
                fill="none"
                stroke="var(--vdl-800)"
                strokeWidth={SW}
                strokeLinecap="round"
                clipPath={`url(#sod3-clip-${l.id})`}
              />
              <g transform={l.p.topTransform}>
                <TopFaceContent id={l.id} />
              </g>
            </g>
            {/* Naming Line & Label */}
            <circle cx={nl.dot.cx} cy={nl.dot.cy} r="1.8" fill="white" />
            <path d={nl.line} stroke="white" strokeWidth={SW} />
            <text
              x={nl.labelAnchor.x}
              y={nl.labelAnchor.y}
              fill="white"
              fontSize="7.5"
              fontFamily="monospace"
              fontWeight="bold"
              dominantBaseline="middle"
            >
              {l.label}
            </text>
          </g>
        );
      })}

    </svg>
  );
});

SystemOverDrawingV3.displayName = 'SystemOverDrawingV3';

export { SystemOverDrawingV3 };

'use client';

import { forwardRef } from 'react';
import { r } from './isometricGrid';

/**
 * VP1 — System Over Drawing Gemini (Containers Only)
 *
 * 5개 디자인 토큰 레이어의 컨테이너(슬래브 외형)만 구현.
 * 상면 콘텐츠, 네이밍 라인, 치수선 등 보조 요소 미포함.
 *
 * @param {object} props - SVG props passthrough [Optional]
 */

const VB_W = 600;
const VB_H = 450;
const O_Y = 288;
const RIGHT_X = 372;

const BH = 11;
const CR = 8;
const SW = 0.5;

const LAYERS = [
  { iz: 0,  id: 'background', fw: 159, fd: 106 },
  { iz: 5,  id: 'spatial',    fw: 150, fd: 100 },
  { iz: 10, id: 'motion',     fw: 141, fd: 94  },
  { iz: 15, id: 'color',      fw: 132, fd: 88  },
  { iz: 20, id: 'typography', fw: 123, fd: 82  },
];

// ── Rectangular Isometric Slab ──

function buildRectSlab(iz, fw, fd) {
  const UNIT = 8;
  const baseY = O_Y - iz * UNIT;
  const cx = RIGHT_X - fw;
  const topY = baseY - (fw + fd) / 4 - BH;

  // 4 logical corners of the sharp top rectangle
  const A = { x: cx, y: topY };
  const B = { x: cx + fw, y: topY + fw / 2 };
  const C = { x: cx + fw - fd, y: topY + (fw + fd) / 2 };
  const D = { x: cx - fd, y: topY + fd / 2 };

  // Corner rounding parameters
  const s5 = Math.sqrt(5);
  const cuf = CR * 2 / s5;
  const cvf = CR / s5;

  // A (Top) key points
  const pA1 = { x: A.x - cuf, y: A.y + cvf };
  const pA2 = { x: A.x + cuf, y: A.y + cvf };
  
  // B (Right) key points
  const pB1 = { x: B.x - cuf, y: B.y - cvf };
  const pB2 = { x: B.x - cuf, y: B.y + cvf };
  const pB_R = { x: B.x - 0.5 * cuf, y: B.y }; // Right-most tangent
  const qB1 = { x: B.x - 0.5 * cuf, y: B.y - 0.5 * cvf }; // CP for top half
  const qB2 = { x: B.x - 0.5 * cuf, y: B.y + 0.5 * cvf }; // CP for bottom half

  // C (Bottom) key points
  const pC1 = { x: C.x + cuf, y: C.y - cvf };
  const pC2 = { x: C.x - cuf, y: C.y - cvf };

  // D (Left) key points
  const pD1 = { x: D.x + cuf, y: D.y + cvf };
  const pD2 = { x: D.x + cuf, y: D.y - cvf };
  const pD_L = { x: D.x + 0.5 * cuf, y: D.y }; // Left-most tangent
  const qD1 = { x: D.x + 0.5 * cuf, y: D.y + 0.5 * cvf }; // CP for bottom half
  const qD2 = { x: D.x + 0.5 * cuf, y: D.y - 0.5 * cvf }; // CP for top half

  // Shifted by BH constants for vertical depth
  const Sy = (y) => y + BH;

  const outline = [
    `M${r(pA1.x)} ${r(pA1.y)}`,
    `Q${r(A.x)} ${r(A.y)} ${r(pA2.x)} ${r(pA2.y)}`, // Top corner
    `L${r(pB1.x)} ${r(pB1.y)}`, // Edge to right
    `Q${r(qB1.x)} ${r(qB1.y)} ${r(pB_R.x)} ${r(pB_R.y)}`, // Right corner top half
    `L${r(pB_R.x)} ${r(Sy(pB_R.y))}`, // Right vertical edge
    `Q${r(qB2.x)} ${r(Sy(qB2.y))} ${r(pB2.x)} ${r(Sy(pB2.y))}`, // Right corner bottom half
    `L${r(pC1.x)} ${r(Sy(pC1.y))}`, // Edge to bottom
    `Q${r(C.x)} ${r(Sy(C.y))} ${r(pC2.x)} ${r(Sy(pC2.y))}`, // Bottom corner
    `L${r(pD1.x)} ${r(Sy(pD1.y))}`, // Edge to left
    `Q${r(qD1.x)} ${r(Sy(qD1.y))} ${r(pD_L.x)} ${r(Sy(pD_L.y))}`, // Left corner bottom half
    `L${r(pD_L.x)} ${r(pD_L.y)}`, // Left vertical edge
    `Q${r(qD2.x)} ${r(qD2.y)} ${r(pD2.x)} ${r(pD2.y)}`, // Left corner top half
    'Z',
  ].join('');

  const vLine = [
    `M${r(pD_L.x)} ${r(pD_L.y)}`,
    `Q${r(qD1.x)} ${r(qD1.y)} ${r(pD1.x)} ${r(pD1.y)}`, // Left corner bottom half
    `L${r(pC2.x)} ${r(pC2.y)}`,
    `Q${r(C.x)} ${r(C.y)} ${r(pC1.x)} ${r(pC1.y)}`, // Bottom corner
    `L${r(pB2.x)} ${r(pB2.y)}`,
    `Q${r(qB2.x)} ${r(qB2.y)} ${r(pB_R.x)} ${r(pB_R.y)}`, // Right corner bottom half
  ].join('');

  const pC_M = { x: C.x, y: C.y - 0.5 * cvf };
  const frontEdge = `M${r(pC_M.x)} ${r(pC_M.y)}L${r(pC_M.x)} ${r(Sy(pC_M.y))}`;

  return { outline, vLine, frontEdge };
}

// ── Main Component ──

const SystemOverDrawingGemini = forwardRef((props, ref) => {
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
      <defs>
        <filter
          id="sod-gemini-s"
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
        {layers.map((l) => (
          <clipPath key={l.id} id={`sod-gemini-clip-${l.id}`}>
            <path d={l.p.outline} />
          </clipPath>
        ))}
      </defs>

      {/* ── 5 Layer Containers (back→front: background → typography) ── */}
      {layers.map((l) => (
        <g key={l.id} filter="url(#sod-gemini-s)">
          <path
            d={l.p.outline}
            fill="var(--vdl-950)"
            stroke="white"
            strokeWidth={SW}
            strokeLinejoin="round"
          />
          <path
            d={l.p.vLine}
            fill="none"
            stroke="white"
            strokeWidth={SW}
            strokeLinecap="round"
            clipPath={`url(#sod-gemini-clip-${l.id})`}
          />
          <path
            d={l.p.frontEdge}
            fill="none"
            stroke="white"
            strokeWidth={SW}
            strokeLinecap="round"
            clipPath={`url(#sod-gemini-clip-${l.id})`}
          />
        </g>
      ))}
    </svg>
  );
});

SystemOverDrawingGemini.displayName = 'SystemOverDrawingGemini';

export { SystemOverDrawingGemini };

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

const FW = 97;     // Reference Flat Width
const FD = 65;     // Reference Flat Depth

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

  return { outline, vLine, frontEdge, cx, topY };
}

// ── Helpers for Vector Typography ──
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

function TopFaceContent({ id, fw, fd, cx, topY }) {
  const sx = fw / FW;
  const sy = fd / FD;
  const topTransform = `matrix(${r(sx)}, ${r(sx / 2)}, ${r(-sy)}, ${r(sy / 2)}, ${r(cx)}, ${r(topY)})`;

  const pad = 6;
  const ih = FD - 2 * pad; // 53
  const iw = FW - 2 * pad; // 85

  switch (id) {
    case 'background':
      return (
        <g transform={topTransform} fill="none" stroke="white" strokeWidth={SW}>
          <rect
            x={pad} y={pad} width={iw} height={ih}
            rx="3"
          />
          <rect
            x={pad + 10} y={pad + 8}
            width={iw - 20} height={ih - 16}
            rx="1.5" opacity="0.5"
          />
        </g>
      );

    case 'spatial':
      return (
        <g transform={topTransform} fill="none" stroke="white" strokeWidth={SW}>
          <rect
            x={pad} y={pad} width={iw} height={ih}
            rx="3"
          />
          {[0.2, 0.4, 0.6, 0.8].map((u) => (
            <line key={`v${u}`} x1={FW * u} y1={pad} x2={FW * u} y2={FD - pad} />
          ))}
          {[0.25, 0.5, 0.75].map((v) => (
            <line key={`h${v}`} x1={pad} y1={FD * v} x2={FW - pad} y2={FD * v} />
          ))}
        </g>
      );

    case 'motion':
      return (
        <g transform={topTransform} fill="none">
          <path
            d={`M${pad + 3} ${FD * 0.72}Q${FW * 0.35} ${FD * 0.05} ${FW - pad - 3} ${FD * 0.45}`}
            stroke="white" strokeWidth={SW} strokeLinecap="round"
          />
          <circle cx={FW * 0.48} cy={FD * 0.28} r="3.5"
            stroke="white" strokeWidth={SW}
          />
          <path
            d={`M${FW - pad - 12} ${FD * 0.37}L${FW - pad - 3} ${FD * 0.45}L${FW - pad - 10} ${FD * 0.55}`}
            stroke="white" strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round"
          />
        </g>
      );

    case 'color': {
      const cy = FD - pad * 2.5; // Bottom aligned (larger value in flat space)
      const r_circ = 6.5;          // Re-adjusted radius to prevent overlaps
      const spacing = 1.0;         // Small visual gap between circles
      
      return (
        <g transform={topTransform} fill="white" stroke="white" strokeWidth="0.5">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <circle
              key={i}
              cx={pad + 8 + i * (r_circ * 2 + spacing)}
              cy={cy}
              r={r_circ}
            />
          ))}
        </g>
      );
    }

    case 'typography': {
      const aH = ih;           
      const aW = aH * 0.78;   // 41
      const swThick = 5.5;    
      const swThin = 2.5;     
      const sf = 4.5;         
      const sfH = 2;          
      const aX = pad + 3;
      
      const gBowlR = 8;
      const gLoopRx = 9;
      const gLoopRy = 7;
      const gSw = 4;
      const gX = aX + aW + 5;
      const gY = pad + aH * 0.08;

      const aLeftLeg = lineToFill(sf, aH, aW / 2, 0, swThin);
      const aRightLeg = lineToFill(aW / 2, 0, aW - sf, aH, swThick);
      const aCrossbar = lineToFill(aW * 0.2, aH * 0.58, aW * 0.8, aH * 0.58, swThin);
      
      const hw = sfH / 2;
      const aLeftSerif = `M${r(-sf * 0.3)} ${r(aH - hw)}Q${r(sf * 0.5)} ${r(aH - 1.5 - hw)} ${r(sf * 2)} ${r(aH - hw)}`
        + `L${r(sf * 2)} ${r(aH + hw)}Q${r(sf * 0.5)} ${r(aH - 1.5 + hw)} ${r(-sf * 0.3)} ${r(aH + hw)}Z`;
      const aRightSerif = `M${r(aW - sf * 2)} ${r(aH - hw)}Q${r(aW - sf * 0.5)} ${r(aH - 1.5 - hw)} ${r(aW + sf * 0.3)} ${r(aH - hw)}`
        + `L${r(aW + sf * 0.3)} ${r(aH + hw)}Q${r(aW - sf * 0.5)} ${r(aH - 1.5 + hw)} ${r(aW - sf * 2)} ${r(aH + hw)}Z`;

      const gBowl = ringPath(gBowlR, gBowlR, gBowlR, gSw);
      const gEar = lineToFill(gBowlR * 1.65, gBowlR * 0.2, gBowlR * 2.15, -gBowlR * 0.15, 2);
      const gStem = lineToFill(gBowlR * 2, gBowlR * 0.5, gBowlR * 2, gBowlR * 2 + gLoopRy, gSw);
      const gLoop = ellipseRingPath(gBowlR, gBowlR * 2 + gLoopRy, gLoopRx, gLoopRy, gSw * 0.8);

      return (
        <g transform={topTransform} fill="white" stroke="white" strokeWidth="0.5">
          <g transform={`translate(${aX}, ${pad})`}>
            <path d={aLeftLeg} />
            <path d={aRightLeg} />
            <path d={aCrossbar} />
            <path d={aLeftSerif} />
            <path d={aRightSerif} />
          </g>
          <g transform={`translate(${r(gX)}, ${r(gY)})`}>
            <path d={gBowl} fillRule="evenodd" />
            <path d={gEar} />
            <path d={gStem} />
            <path d={gLoop} fillRule="evenodd" />
          </g>
        </g>
      );
    }
    
    default:
      return null;
  }
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
          
          {/* Top Face Content dynamically matching Layer ID */}
          <TopFaceContent id={l.id} fw={l.fw} fd={l.fd} cx={l.p.cx} topY={l.p.topY} />
        </g>
      ))}
    </svg>
  );
});

SystemOverDrawingGemini.displayName = 'SystemOverDrawingGemini';

export { SystemOverDrawingGemini };

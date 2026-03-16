'use client';

import { forwardRef } from 'react';
import { r } from './isometricGrid';

/**
 * VP1 — System Over Drawing V6 (Containers Only)
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
const SW = 0.5;
const CR = 8; // 윗면/아랫면 face↔face 코너 반경

const LAYERS = [
  { iz: 0,  id: 'background', fw: 159, fd: 106 },
  { iz: 5,  id: 'spatial',    fw: 150, fd: 100 },
  { iz: 10, id: 'motion',     fw: 141, fd: 94  },
  { iz: 15, id: 'color',      fw: 132, fd: 88  },
  { iz: 20, id: 'typography', fw: 123, fd: 82  },
];

// ── Rectangular Isometric Slab ──
// 윗면 4꼭짓점(T0,T1,T2,T3) 모두 face↔face Q-curve 라운딩 후
// 직선 수직으로 body를 내려 아랫면에 연결

function buildRectSlab(iz, fw, fd) {
  const UNIT = 8;
  const s5 = Math.sqrt(5);
  const ux = 2 / s5;  // ≈ 0.894
  const uy = 1 / s5;  // ≈ 0.447

  const baseY = O_Y - iz * UNIT;
  const cx = RIGHT_X - fw;
  const topY = baseY - (fw + fd) / 4 - BH;

  // 6개 헥사곤 꼭짓점 (참조용)
  const v0 = { x: cx,           y: topY };                       // top
  const v1 = { x: cx + fw,      y: topY + fw / 2 };              // right
  const v2 = { x: cx + fw,      y: topY + fw / 2 + BH };         // right bottom
  const v3 = { x: cx + fw - fd, y: topY + (fw + fd) / 2 + BH };  // front bottom
  const v4 = { x: cx - fd,      y: topY + fd / 2 + BH };          // left bottom
  const v5 = { x: cx - fd,      y: topY + fd / 2 };                // left
  const frontTop = { x: cx + fw - fd, y: topY + (fw + fd) / 2 };

  // ── 윗면 4코너 Q-curve cut points ──
  // T0 = v0: incoming T3→T0 (ux,-uy), outgoing T0→T1 (ux,uy)
  const T0_in  = { x: v0.x - CR * ux, y: v0.y + CR * uy };
  const T0_out = { x: v0.x + CR * ux, y: v0.y + CR * uy };

  // T1 = v1: incoming T0→T1 (ux,uy), outgoing T1→T2 (-ux,uy)
  const T1_in  = { x: v1.x - CR * ux, y: v1.y - CR * uy };
  const T1_out = { x: v1.x - CR * ux, y: v1.y + CR * uy };

  // T3 = v5: incoming T2→T3 (-ux,-uy), outgoing T3→T0 (ux,-uy)
  const T3_in  = { x: v5.x + CR * ux, y: v5.y + CR * uy };
  const T3_out = { x: v5.x + CR * ux, y: v5.y - CR * uy };

  // ── 아랫면 B2 = v3: incoming B1→B2 (-ux,uy), outgoing B2→B3 (-ux,-uy) ──
  const B2_in  = { x: v3.x + CR * ux, y: v3.y - CR * uy };
  const B2_out = { x: v3.x - CR * ux, y: v3.y - CR * uy };

  // ── 수직 직선 연결점 ──
  const T1_drop = { x: T1_out.x, y: T1_out.y + BH }; // 우측 수직 하강 끝
  const T3_rise = { x: T3_in.x,  y: T3_in.y + BH };  // 좌측 수직 상승 시작

  // 윗면 라운드 → 직선 수직 → 아랫면 라운드
  const outline = [
    `M${r(T3_out.x)} ${r(T3_out.y)}`,
    `L${r(T0_in.x)} ${r(T0_in.y)}`,
    `Q${r(v0.x)} ${r(v0.y)} ${r(T0_out.x)} ${r(T0_out.y)}`,
    `L${r(T1_in.x)} ${r(T1_in.y)}`,
    `Q${r(v1.x)} ${r(v1.y)} ${r(T1_out.x)} ${r(T1_out.y)}`,
    `L${r(T1_drop.x)} ${r(T1_drop.y)}`,
    `L${r(B2_in.x)} ${r(B2_in.y)}`,
    `Q${r(v3.x)} ${r(v3.y)} ${r(B2_out.x)} ${r(B2_out.y)}`,
    `L${r(T3_rise.x)} ${r(T3_rise.y)}`,
    `L${r(T3_in.x)} ${r(T3_in.y)}`,
    `Q${r(v5.x)} ${r(v5.y)} ${r(T3_out.x)} ${r(T3_out.y)}`,
    'Z',
  ].join('');

  // vLine: v5 → frontTop → v1 (frontTop에서 Q-curve)
  const cuf = CR * ux;
  const cvf = CR * uy;
  const vLine = [
    `M${r(v5.x)} ${r(v5.y)}`,
    `L${r(frontTop.x - cuf)} ${r(frontTop.y - cvf)}`,
    `Q${r(frontTop.x)} ${r(frontTop.y)} ${r(frontTop.x + cuf)} ${r(frontTop.y - cvf)}`,
    `L${r(v1.x)} ${r(v1.y)}`,
  ].join('');

  const frontEdge = `M${r(frontTop.x)} ${r(frontTop.y)}L${r(v3.x)} ${r(v3.y)}`;

  return { outline, vLine, frontEdge };
}

// ── Main Component ──

const SystemOverDrawingV6 = forwardRef((props, ref) => {
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
          id="sod6s"
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
          <clipPath key={l.id} id={`sod6-clip-${l.id}`}>
            <path d={l.p.outline} />
          </clipPath>
        ))}
      </defs>

      {/* ── 5 Layer Containers (back→front: background → typography) ── */}
      {layers.map((l) => (
        <g key={l.id} filter="url(#sod6s)">
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
            clipPath={`url(#sod6-clip-${l.id})`}
          />
          <path
            d={l.p.frontEdge}
            fill="none"
            stroke="white"
            strokeWidth={SW}
            strokeLinecap="round"
            clipPath={`url(#sod6-clip-${l.id})`}
          />
        </g>
      ))}
    </svg>
  );
});

SystemOverDrawingV6.displayName = 'SystemOverDrawingV6';

export { SystemOverDrawingV6 };

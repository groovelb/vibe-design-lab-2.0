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
const CR = 4;

// 측정: 아래 레이어일수록 큰 슬래브, 우측정렬, 간격 좁게
const LAYERS = [
  { iz: 0,  id: 'background', label: 'BACKGROUND\n& DETAIL',  stroke: 'var(--vdl-600)', sw: 1.0, fw: 159, fd: 106 },
  { iz: 5,  id: 'spatial',    label: 'SPATIAL\nCOMPOSITION',  stroke: 'var(--vdl-600)', sw: 1.0, fw: 150, fd: 100 },
  { iz: 10, id: 'motion',     label: 'MOTION',                stroke: 'var(--vdl-600)', sw: 1.0, fw: 141, fd: 94  },
  { iz: 15, id: 'color',      label: 'COLOR & THEME',         stroke: 'var(--vdl-200)', sw: 0.8, fw: 132, fd: 88  },
  { iz: 20, id: 'typography', label: 'TYPOGRAPHY',            stroke: 'var(--vdl-200)', sw: 0.8, fw: 123, fd: 82  },
];

// ── Rounded Hexagonal Path ──

function roundedHex(verts, cr) {
  const n = verts.length;
  const u = [];
  for (let i = 0; i < n; i++) {
    const next = verts[(i + 1) % n];
    const dx = next.x - verts[i].x;
    const dy = next.y - verts[i].y;
    const len = Math.sqrt(dx * dx + dy * dy);
    u.push({ ux: dx / len, uy: dy / len });
  }
  let d = '';
  for (let i = 0; i < n; i++) {
    const prev = (i + n - 1) % n;
    const vt = verts[i];
    const bx = r(vt.x - cr * u[prev].ux);
    const by = r(vt.y - cr * u[prev].uy);
    const ax = r(vt.x + cr * u[i].ux);
    const ay = r(vt.y + cr * u[i].uy);
    d += i === 0 ? `M${bx} ${by}` : `L${bx} ${by}`;
    d += `Q${r(vt.x)} ${r(vt.y)} ${ax} ${ay}`;
  }
  return d + 'Z';
}

// ── Rectangular Isometric Slab ──

function buildRectSlab(iz, fw, fd) {
  const UNIT = 8;
  const baseY = O_Y - iz * UNIT;
  const cx = RIGHT_X - fw; // 우측정렬: right vertex = RIGHT_X
  const topY = baseY - (fw + fd) / 4 - BH;

  const v = [
    { x: cx,           y: topY },
    { x: cx + fw,      y: topY + fw / 2 },
    { x: cx + fw,      y: topY + fw / 2 + BH },
    { x: cx + fw - fd, y: topY + (fw + fd) / 2 + BH },
    { x: cx - fd,      y: topY + fd / 2 + BH },
    { x: cx - fd,      y: topY + fd / 2 },
  ];

  const outline = roundedHex(v, CR);
  const frontTop = { x: cx + fw - fd, y: topY + (fw + fd) / 2 };
  const vLine = `M${r(v[5].x)} ${r(v[5].y)}L${r(frontTop.x)} ${r(frontTop.y)}L${r(v[1].x)} ${r(v[1].y)}`;
  const frontEdge = `M${r(frontTop.x)} ${r(frontTop.y)}L${r(v[3].x)} ${r(v[3].y)}`;

  // 스케일된 topTransform: BASE (FW×FD) flat 좌표 → 실제 fw×fd 슬래브 상면 매핑
  const sx = fw / FW;
  const sy = fd / FD;
  const topTransform = `matrix(${r(sx)}, ${r(sx / 2)}, ${r(-sy)}, ${r(sy / 2)}, ${r(cx)}, ${r(topY)})`;

  return {
    outline, vLine, frontEdge, topTransform,
    fw, fd, bh: BH, cx, topY,
    verts: v, frontTop,
    top: v[0],
    right: v[1],
    rightBottom: v[2],
    frontBottom: v[3],
    leftBottom: v[4],
    left: v[5],
    rightMid: { x: cx + fw, y: topY + fw / 2 + BH / 2 },
    leftMid: { x: cx - fd, y: topY + fd / 2 + BH / 2 },
  };
}

// ── Top Face Content (FW × FD flat coordinate space) ──

function TopFaceContent({ id }) {
  const pad = 6;
  const iw = FW - 2 * pad; // 85
  const ih = FD - 2 * pad; // 53

  switch (id) {
    case 'background':
      return (
        <g fill="none" stroke="var(--vdl-800)">
          <rect
            x={pad} y={pad} width={iw} height={ih}
            rx="3" strokeWidth="0.6"
          />
          <rect
            x={pad + 10} y={pad + 8}
            width={iw - 20} height={ih - 16}
            rx="1.5" strokeWidth="0.4" opacity="0.5"
          />
        </g>
      );

    case 'spatial':
      return (
        <g>
          <rect
            x={pad} y={pad} width={iw} height={ih}
            rx="3"
            stroke="var(--vdl-600)" fill="none" strokeWidth="0.6"
          />
          <g stroke="var(--vdl-600)" strokeWidth="0.5">
            {[0.2, 0.4, 0.6, 0.8].map((u) => (
              <line key={`v${u}`} x1={FW * u} y1={pad} x2={FW * u} y2={FD - pad} />
            ))}
            {[0.25, 0.5, 0.75].map((v) => (
              <line key={`h${v}`} x1={pad} y1={FD * v} x2={FW - pad} y2={FD * v} />
            ))}
          </g>
        </g>
      );

    case 'motion':
      return (
        <g fill="none">
          <path
            d={`M${pad + 3} ${FD * 0.72}Q${FW * 0.35} ${FD * 0.05} ${FW - pad - 3} ${FD * 0.45}`}
            stroke="var(--vdl-600)" strokeWidth="1.2" strokeLinecap="round"
          />
          <circle cx={FW * 0.48} cy={FD * 0.28} r="3.5"
            stroke="var(--vdl-600)" strokeWidth="0.8"
          />
          <path
            d={`M${FW - pad - 12} ${FD * 0.37}L${FW - pad - 3} ${FD * 0.45}L${FW - pad - 10} ${FD * 0.55}`}
            stroke="var(--vdl-600)" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"
          />
        </g>
      );

    case 'color':
      return (
        <g fill="none" stroke="var(--vdl-200)" strokeWidth="0.9">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <circle
              key={i}
              cx={pad + 6 + i * ((iw - 12) / 6)}
              cy={FD * 0.5}
              r={5}
            />
          ))}
        </g>
      );

    case 'typography': {
      // Garamond Bold — bracketed serifs, double-story g, moderate thick/thin
      const aH = ih;           // 53px — cap height
      const aW = aH * 0.78;   // 41px — Garamond A: 약간 좁은 비율
      const swThick = 5.5;    // thick stroke (Garamond: 부드러운 대비)
      const swThin = 2.5;     // thin stroke
      const sf = 4.5;         // serif 돌출 길이
      const sfH = 2;          // serif 두께
      const aX = pad + 3;
      // g 파라미터
      const gBowlR = 8;       // upper bowl 반지름
      const gLoopRx = 9;      // lower loop 가로 반지름
      const gLoopRy = 7;      // lower loop 세로 반지름
      const gSw = 4;          // g 획 두께
      const gX = aX + aW + 5;
      const gY = pad + aH * 0.08;
      return (
        <g fill="none" stroke="var(--vdl-200)">
          {/* "A" — Garamond: bracketed serifs, cupped apex */}
          <g transform={`translate(${aX}, ${pad})`} strokeLinecap="butt">
            {/* left leg (thin) */}
            <path d={`M${r(sf)} ${aH}L${r(aW / 2)} 0`} strokeWidth={swThin} />
            {/* right leg (thick) */}
            <path d={`M${r(aW / 2)} 0L${r(aW - sf)} ${aH}`} strokeWidth={swThick} />
            {/* crossbar (thin) */}
            <path d={`M${r(aW * 0.2)} ${r(aH * 0.58)}L${r(aW * 0.8)} ${r(aH * 0.58)}`} strokeWidth={swThin} />
            {/* left foot serif — bracketed */}
            <path d={`M${r(-sf * 0.3)} ${aH}Q${r(sf * 0.5)} ${r(aH - 1.5)} ${r(sf * 2)} ${aH}`} strokeWidth={sfH} />
            {/* right foot serif — bracketed */}
            <path d={`M${r(aW - sf * 2)} ${aH}Q${r(aW - sf * 0.5)} ${r(aH - 1.5)} ${r(aW + sf * 0.3)} ${aH}`} strokeWidth={sfH} />
          </g>
          {/* "g" — Garamond double-story: upper bowl + ear + link + lower loop */}
          <g transform={`translate(${r(gX)}, ${r(gY)})`} strokeLinecap="round" strokeLinejoin="round">
            {/* upper bowl */}
            <circle cx={gBowlR} cy={gBowlR} r={gBowlR} strokeWidth={gSw} />
            {/* ear */}
            <path d={`M${r(gBowlR * 1.65)} ${r(gBowlR * 0.2)}L${r(gBowlR * 2.15)} ${r(-gBowlR * 0.15)}`} strokeWidth={2} />
            {/* right stem (link) */}
            <path d={`M${gBowlR * 2} ${r(gBowlR * 0.5)}L${gBowlR * 2} ${r(gBowlR * 2 + gLoopRy)}`} strokeWidth={gSw} />
            {/* lower loop — closed oval */}
            <ellipse
              cx={gBowlR}
              cy={r(gBowlR * 2 + gLoopRy)}
              rx={gLoopRx}
              ry={gLoopRy}
              strokeWidth={r(gSw * 0.8)}
            />
          </g>
        </g>
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
      </defs>

      {/* ── Title ── */}
      <text
        x="20"
        y="30"
        fill="var(--vdl-200)"
        fontSize="14"
        fontFamily="monospace"
        fontWeight="bold"
        letterSpacing="2.5"
      >
        <tspan x="20" dy="0">DESIGN</tspan>
        <tspan x="20" dy="16">SYSTEM</tspan>
      </text>

      {/* ── Layers (back→front: background → typography) ── */}
      {layers.map((l) => (
        <g key={l.id} filter="url(#sod3s)">
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
            strokeWidth="0.5"
            strokeLinecap="round"
          />
          <path
            d={l.p.frontEdge}
            fill="none"
            stroke="var(--vdl-800)"
            strokeWidth="0.5"
            strokeLinecap="round"
          />
          <g transform={l.p.topTransform}>
            <TopFaceContent id={l.id} />
          </g>
        </g>
      ))}

      {/* ── Naming Lines & Labels ── */}
      {layers.map((l) => {
        const anchor = l.p.rightMid;
        const nl = namingLine(anchor.x + 5, anchor.y, 80);
        const isHero = l.stroke === 'var(--vdl-200)';
        const dotFill = isHero ? 'var(--vdl-200)' : 'var(--vdl-700)';
        const lineStroke = isHero ? 'var(--vdl-200)' : 'var(--vdl-700)';
        const textFill = isHero ? 'var(--vdl-200)' : 'var(--vdl-600)';
        const labelLines = l.label.split('\n');

        return (
          <g key={`nl-${l.id}`}>
            <circle cx={nl.dot.cx} cy={nl.dot.cy} r="1.8" fill={dotFill} />
            <path d={nl.line} stroke={lineStroke} strokeWidth="0.5" />
            {labelLines.map((line, j) => (
              <text
                key={j}
                x={nl.labelAnchor.x}
                y={nl.labelAnchor.y + j * 10 - ((labelLines.length - 1) * 10) / 2}
                fill={textFill}
                fontSize="7.5"
                fontFamily="monospace"
                fontWeight="bold"
                dominantBaseline="middle"
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}

      {/* ── Dimension Lines (left side) ── */}
      {layers.slice(0, -1).map((l, i) => {
        const nextL = layers[i + 1];
        const x = l.p.left.x - 15;
        const y1 = l.p.left.y;
        const y2 = nextL.p.leftBottom.y;
        const tw = 3;
        const dimValues = ['0.36"', '0.56"', '0.56"', '0.56"'];

        return (
          <g key={`dim-${i}`} stroke="var(--vdl-800)" strokeWidth="0.3">
            <line x1={x} y1={y1} x2={x} y2={y2} />
            <line x1={x - tw} y1={y1} x2={x + tw} y2={y1} />
            <line x1={x - tw} y1={y2} x2={x + tw} y2={y2} />
            <text
              x={x - 3}
              y={(y1 + y2) / 2}
              fill="var(--vdl-800)"
              fontSize="5"
              fontFamily="monospace"
              dominantBaseline="middle"
              textAnchor="end"
            >
              {dimValues[i]}
            </text>
          </g>
        );
      })}

      {/* ── Top Width Dimension ── */}
      {(() => {
        const topLayer = layers[layers.length - 1];
        const y = topLayer.p.top.y - 8;
        const x1 = topLayer.p.left.x;
        const x2 = topLayer.p.right.x;
        const th = 3;
        return (
          <g stroke="var(--vdl-800)" strokeWidth="0.3">
            <line x1={x1} y1={y} x2={x2} y2={y} />
            <line x1={x1} y1={y - th} x2={x1} y2={y + th} />
            <line x1={x2} y1={y - th} x2={x2} y2={y + th} />
            <text
              x={(x1 + x2) / 2}
              y={y - 5}
              fill="var(--vdl-800)"
              fontSize="5"
              fontFamily="monospace"
              dominantBaseline="middle"
              textAnchor="middle"
            >
              5.86&quot;
            </text>
          </g>
        );
      })()}

      {/* ── Bottom markers ── */}
      {(() => {
        const btm = layers[0];
        const x = btm.p.left.x - 15;
        return (
          <>
            <text
              x={x - 3}
              y={btm.p.frontBottom.y - 6}
              fill="var(--vdl-800)"
              fontSize="5"
              fontFamily="monospace"
              dominantBaseline="middle"
              textAnchor="end"
            >
              18°
            </text>
            <text
              x={x - 3}
              y={btm.p.frontBottom.y + 4}
              fill="var(--vdl-800)"
              fontSize="5"
              fontFamily="monospace"
              dominantBaseline="middle"
              textAnchor="end"
            >
              180°
            </text>
          </>
        );
      })()}
    </svg>
  );
});

SystemOverDrawingV3.displayName = 'SystemOverDrawingV3';

export { SystemOverDrawingV3 };

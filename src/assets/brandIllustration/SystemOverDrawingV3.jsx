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
const O = { x: 260, y: 370 };

const FW = 150;    // flat width (iso-X, rightward) in px
const FD = 100;    // flat depth (iso-Y, leftward) in px
const BH = 16;     // body height in px
const CR = 8;      // corner radius in px

const LAYERS = [
  { iz: 0,  id: 'background', label: 'BACKGROUND\n& DETAIL',  stroke: 'var(--vdl-600)', sw: 1.2 },
  { iz: 7,  id: 'spatial',    label: 'SPATIAL\nCOMPOSITION',  stroke: 'var(--vdl-600)', sw: 1.2 },
  { iz: 14, id: 'motion',     label: 'MOTION',                stroke: 'var(--vdl-600)', sw: 1.2 },
  { iz: 21, id: 'color',      label: 'COLOR & THEME',         stroke: 'var(--vdl-200)', sw: 0.8 },
  { iz: 28, id: 'typography', label: 'TYPOGRAPHY',            stroke: 'var(--vdl-200)', sw: 0.8 },
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

function buildRectSlab(iz) {
  const UNIT = 8;
  const baseY = O.y - iz * UNIT;
  const cx = O.x;
  const topY = baseY - (FW + FD) / 4 - BH;

  const v = [
    { x: cx,           y: topY },
    { x: cx + FW,      y: topY + FW / 2 },
    { x: cx + FW,      y: topY + FW / 2 + BH },
    { x: cx + FW - FD, y: topY + (FW + FD) / 2 + BH },
    { x: cx - FD,      y: topY + FD / 2 + BH },
    { x: cx - FD,      y: topY + FD / 2 },
  ];

  const outline = roundedHex(v, CR);
  const frontTop = { x: cx + FW - FD, y: topY + (FW + FD) / 2 };
  const vLine = `M${r(v[5].x)} ${r(v[5].y)}L${r(frontTop.x)} ${r(frontTop.y)}L${r(v[1].x)} ${r(v[1].y)}`;
  const frontEdge = `M${r(frontTop.x)} ${r(frontTop.y)}L${r(v[3].x)} ${r(v[3].y)}`;
  const topTransform = `matrix(1, 0.5, -1, 0.5, ${r(cx)}, ${r(topY)})`;

  return {
    outline, vLine, frontEdge, topTransform,
    fw: FW, fd: FD, bh: BH, cx, topY,
    verts: v, frontTop,
    top: v[0],
    right: v[1],
    rightBottom: v[2],
    frontBottom: v[3],
    leftBottom: v[4],
    left: v[5],
    rightMid: { x: cx + FW, y: topY + FW / 2 + BH / 2 },
    leftMid: { x: cx - FD, y: topY + FD / 2 + BH / 2 },
  };
}

// ── Top Face Content (FW × FD flat coordinate space) ──

function TopFaceContent({ id }) {
  const pad = 10;
  const iw = FW - 2 * pad; // inner width = 130
  const ih = FD - 2 * pad; // inner height = 80

  switch (id) {
    case 'background':
      return (
        <g fill="none" stroke="var(--vdl-800)">
          <rect
            x={pad} y={pad} width={iw} height={ih}
            rx="4" strokeWidth="0.8"
          />
          <rect
            x={pad + 15} y={pad + 12}
            width={iw - 30} height={ih - 24}
            rx="2" strokeWidth="0.5" opacity="0.5"
          />
        </g>
      );

    case 'spatial':
      return (
        <g>
          <rect
            x={pad} y={pad} width={iw} height={ih}
            rx="4"
            stroke="var(--vdl-600)" fill="none" strokeWidth="0.8"
          />
          <g stroke="var(--vdl-600)" strokeWidth="0.7">
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
            d={`M${pad + 5} ${FD * 0.72}Q${FW * 0.35} ${FD * 0.05} ${FW - pad - 5} ${FD * 0.45}`}
            stroke="var(--vdl-600)" strokeWidth="1.8" strokeLinecap="round"
          />
          <circle cx={FW * 0.48} cy={FD * 0.28} r="5"
            stroke="var(--vdl-600)" strokeWidth="1.0"
          />
          <path
            d={`M${FW - pad - 18} ${FD * 0.37}L${FW - pad - 5} ${FD * 0.45}L${FW - pad - 15} ${FD * 0.55}`}
            stroke="var(--vdl-600)" strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round"
          />
        </g>
      );

    case 'color':
      return (
        <g fill="none" stroke="var(--vdl-200)" strokeWidth="1.2">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <circle
              key={i}
              cx={pad + 10 + i * ((iw - 20) / 6)}
              cy={FD * 0.5}
              r={8}
            />
          ))}
        </g>
      );

    case 'typography': {
      // Bold "Ag" filling the slab face — heavy/black weight
      const aH = ih;           // 80px
      const aW = aH * 0.7;    // 56px
      const sw = 7;            // heavy stroke
      const gR = 16;
      const gSw = 6;
      const gX = pad + 8 + aW + 8;
      const gY = pad + aH * 0.25;
      return (
        <g fill="none" stroke="var(--vdl-200)" strokeLinecap="round" strokeLinejoin="round">
          {/* "A" */}
          <g transform={`translate(${pad + 8}, ${pad})`}>
            <path d={`M0 ${aH}L${r(aW / 2)} 0L${r(aW)} ${aH}`} strokeWidth={sw} />
            <path d={`M${r(aW * 0.16)} ${r(aH * 0.65)}L${r(aW * 0.84)} ${r(aH * 0.65)}`} strokeWidth={sw} />
          </g>
          {/* "g" */}
          <g transform={`translate(${r(gX)}, ${r(gY)})`}>
            <circle cx={gR} cy={gR} r={gR} strokeWidth={gSw} />
            <path d={`M${gR * 2} 3L${gR * 2} ${r(gR * 2.8)}Q${gR * 2} ${r(gR * 3.7)} ${gR} ${r(gR * 3.7)}`} strokeWidth={gSw} />
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
    p: buildRectSlab(l.iz),
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

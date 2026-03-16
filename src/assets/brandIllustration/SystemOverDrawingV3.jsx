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
const SW = 0.5; // 통일 헤어라인 스트로크

// 측정: 아래 레이어일수록 큰 슬래브, 우측정렬, 간격 좁게
const LAYERS = [
  { iz: 0,  id: 'background', label: 'BACKGROUND\n& DETAIL',  stroke: 'white', sw: SW, fw: 159, fd: 106 },
  { iz: 5,  id: 'spatial',    label: 'SPATIAL\nCOMPOSITION',  stroke: 'white', sw: SW, fw: 150, fd: 100 },
  { iz: 10, id: 'motion',     label: 'MOTION',                stroke: 'white', sw: SW, fw: 141, fd: 94  },
  { iz: 15, id: 'color',      label: 'COLOR & THEME',         stroke: 'white', sw: SW, fw: 132, fd: 88  },
  { iz: 20, id: 'typography', label: 'TYPOGRAPHY',            stroke: 'white', sw: SW, fw: 123, fd: 82  },
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
    case 'background':
      return (
        <g fill="none" stroke="white" strokeWidth={SW}>
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
        <g fill="none" stroke="white" strokeWidth={SW}>
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
        <g fill="none">
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

    case 'color':
      return (
        <g fill="none" stroke="white" strokeWidth={SW}>
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
      // Garamond Bold — thick strokes converted to filled closed paths
      const aH = ih;           // 53px — cap height
      const aW = aH * 0.78;   // 41px
      const swThick = 5.5;    // fill width (was thick stroke)
      const swThin = 2.5;     // fill width (was thin stroke)
      const sf = 4.5;         // serif length
      const sfH = 2;          // serif fill height
      const aX = pad + 3;
      const gBowlR = 8;
      const gLoopRx = 9;
      const gLoopRy = 7;
      const gSw = 4;
      const gX = aX + aW + 5;
      const gY = pad + aH * 0.08;

      // "A" — filled closed paths
      const aLeftLeg = lineToFill(sf, aH, aW / 2, 0, swThin);
      const aRightLeg = lineToFill(aW / 2, 0, aW - sf, aH, swThick);
      const aCrossbar = lineToFill(aW * 0.2, aH * 0.58, aW * 0.8, aH * 0.58, swThin);
      // Serifs: Q bezier → filled ribbon (offset ±sfH/2 in Y)
      const hw = sfH / 2;
      const aLeftSerif = `M${r(-sf * 0.3)} ${r(aH - hw)}Q${r(sf * 0.5)} ${r(aH - 1.5 - hw)} ${r(sf * 2)} ${r(aH - hw)}`
        + `L${r(sf * 2)} ${r(aH + hw)}Q${r(sf * 0.5)} ${r(aH - 1.5 + hw)} ${r(-sf * 0.3)} ${r(aH + hw)}Z`;
      const aRightSerif = `M${r(aW - sf * 2)} ${r(aH - hw)}Q${r(aW - sf * 0.5)} ${r(aH - 1.5 - hw)} ${r(aW + sf * 0.3)} ${r(aH - hw)}`
        + `L${r(aW + sf * 0.3)} ${r(aH + hw)}Q${r(aW - sf * 0.5)} ${r(aH - 1.5 + hw)} ${r(aW - sf * 2)} ${r(aH + hw)}Z`;

      // "g" — filled closed paths
      const gBowl = ringPath(gBowlR, gBowlR, gBowlR, gSw);
      const gEar = lineToFill(gBowlR * 1.65, gBowlR * 0.2, gBowlR * 2.15, -gBowlR * 0.15, 2);
      const gStem = lineToFill(gBowlR * 2, gBowlR * 0.5, gBowlR * 2, gBowlR * 2 + gLoopRy, gSw);
      const gLoop = ellipseRingPath(gBowlR, gBowlR * 2 + gLoopRy, gLoopRx, gLoopRy, gSw * 0.8);

      return (
        <g fill="white" stroke="white" strokeWidth={SW}>
          {/* "A" — filled closed paths preserving Garamond form */}
          <g transform={`translate(${aX}, ${pad})`}>
            <path d={aLeftLeg} />
            <path d={aRightLeg} />
            <path d={aCrossbar} />
            <path d={aLeftSerif} />
            <path d={aRightSerif} />
          </g>
          {/* "g" — filled closed paths preserving double-story form */}
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
        {/* 슬래브별 clipPath — vLine/frontEdge가 rounded corner 밖으로 삐져나오지 않도록 */}
        {layers.map((l) => (
          <clipPath key={l.id} id={`sod3-clip-${l.id}`}>
            <path d={l.p.outline} />
          </clipPath>
        ))}
      </defs>

      {/* ── Title ── */}
      <text
        x="20"
        y="30"
        fill="white"
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
            stroke="white"
            strokeWidth={SW}
            strokeLinecap="round"
            clipPath={`url(#sod3-clip-${l.id})`}
          />
          <path
            d={l.p.frontEdge}
            fill="none"
            stroke="white"
            strokeWidth={SW}
            strokeLinecap="round"
            clipPath={`url(#sod3-clip-${l.id})`}
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
        const isHero = l.stroke === 'white';
        const dotFill = isHero ? 'white' : 'white';
        const lineStroke = isHero ? 'white' : 'white';
        const textFill = isHero ? 'white' : 'white';
        const labelLines = l.label.split('\n');

        return (
          <g key={`nl-${l.id}`}>
            <circle cx={nl.dot.cx} cy={nl.dot.cy} r="1.8" fill={dotFill} />
            <path d={nl.line} stroke={lineStroke} strokeWidth={SW} />
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
          <g key={`dim-${i}`} stroke="white" strokeWidth={SW}>
            <line x1={x} y1={y1} x2={x} y2={y2} />
            <line x1={x - tw} y1={y1} x2={x + tw} y2={y1} />
            <line x1={x - tw} y1={y2} x2={x + tw} y2={y2} />
            <text
              x={x - 3}
              y={(y1 + y2) / 2}
              fill="white"
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
          <g stroke="white" strokeWidth={SW}>
            <line x1={x1} y1={y} x2={x2} y2={y} />
            <line x1={x1} y1={y - th} x2={x1} y2={y + th} />
            <line x1={x2} y1={y - th} x2={x2} y2={y + th} />
            <text
              x={(x1 + x2) / 2}
              y={y - 5}
              fill="white"
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
              fill="white"
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
              fill="white"
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

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
  { iz: 0,  id: 'background', label: 'BACKGROUND\n& DETAIL',  stroke: 'white', sw: SW, fw: 159, fd: 106 },
  { iz: 5,  id: 'spatial',    label: 'SPATIAL\nCOMPOSITION',  stroke: 'white', sw: SW, fw: 150, fd: 100 },
  { iz: 10, id: 'motion',     label: 'MOTION',                stroke: 'white', sw: SW, fw: 141, fd: 94  },
  { iz: 15, id: 'color',      label: 'COLOR & THEME',         stroke: 'white', sw: SW, fw: 132, fd: 88  },
  { iz: 20, id: 'typography', label: 'TYPOGRAPHY',            stroke: 'white', sw: SW, fw: 123, fd: 82  },
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
      // Diagonal hatching — background texture representation
      const step = 5;
      const hatchLines = [];
      for (let d = step; d < iw + ih; d += step) {
        hatchLines.push({
          x1: pad + Math.max(0, d - ih),
          y1: pad + Math.min(d, ih),
          x2: pad + Math.min(d, iw),
          y2: pad + Math.max(0, d - iw),
        });
      }
      return (
        <g fill="none" stroke="white" strokeWidth={SW}>
          <rect x={pad} y={pad} width={iw} height={ih} rx="3" />
          {hatchLines.map((l, i) => (
            <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} opacity="0.3" />
          ))}
        </g>
      );
    }

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

    case 'motion': {
      // Cubic Bezier curve visualization with control handles
      const p0 = { x: pad + 3, y: FD * 0.85 };
      const p1 = { x: FW * 0.35, y: FD * 0.38 };
      const p2 = { x: FW * 0.65, y: FD * 0.85 };
      const p3 = { x: FW - pad - 3, y: FD * 0.45 };

      return (
        <g fill="none">
          {/* Control handle lines */}
          <line x1={p0.x} y1={p0.y} x2={p1.x} y2={p1.y}
            stroke="white" strokeWidth={SW} opacity="0.4" strokeDasharray="2 2" />
          <line x1={p3.x} y1={p3.y} x2={p2.x} y2={p2.y}
            stroke="white" strokeWidth={SW} opacity="0.4" strokeDasharray="2 2" />
          {/* Bezier curve */}
          <path
            d={`M${p0.x} ${p0.y}C${p1.x} ${p1.y} ${p2.x} ${p2.y} ${p3.x} ${p3.y}`}
            stroke="white" strokeWidth={SW} strokeLinecap="round"
          />
          {/* Anchor points (filled) */}
          <circle cx={p0.x} cy={p0.y} r={2} fill="white" />
          <circle cx={p3.x} cy={p3.y} r={2} fill="white" />
          {/* Control points (hollow) */}
          <circle cx={p1.x} cy={p1.y} r={1.5} stroke="white" strokeWidth={SW} />
          <circle cx={p2.x} cy={p2.y} r={1.5} stroke="white" strokeWidth={SW} />
        </g>
      );
    }

    case 'color':
      return (
        <g fill="none" stroke="white" strokeWidth={SW}>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <circle
              key={i}
              cx={pad + 6 + i * ((iw - 12) / 6)}
              cy={FD - pad * 2.5}
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

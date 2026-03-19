'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import { isoToScreen, r } from './isometricGrid';

/**
 * VP3 — Design As Build
 *
 * "설계가 곧 구현이다"
 * 3개 세워진 랜드스케이프 스크린이 깊이 배열:
 * Code(뒤/우상) → Anatomy(중간) → UI(앞/좌하)
 * 대응 요소를 잇는 직선 dashed 연결선 + junction dot.
 *
 * @param {object} props - SVG props passthrough [Optional]
 */

const VB_X = 150;
const VB_Y = -30;
const VB_W = 325;
const VB_H = 269;
const SW = 0.5;
const CR = 6;

// ── Animation timing (ms) ───────────────────────────────
const DRAW_DUR = 400;
const PANEL_STAGGER = 500;

const ORIGIN = { x: 345, y: 95 };

// flat 좌표 기준 (전면 콘텐츠용)
const FF_W = 100;
const FF_H = 62.5;

// ── 3 패널 정의 ─────────────────────────────────────────
const PANELS = [
  { id: 'code',    iy: 0,  fw: 100, fd: 7, bh: 64, type: 'code' },
  { id: 'anatomy', iy: 11, fw: 140, fd: 8, bh: 89.5, type: 'anatomy' },
  { id: 'ui',      iy: 22, fw: 180, fd: 9, bh: 115, type: 'ui' },
];

// ── Standing Screen Builder ─────────────────────────────
// buildRectSlab 동일 구조, fw >> fd, bh >> fd
// 전면(C→D edge)이 메인 콘텐츠 면

function buildDabScreen(iy, fw, fd, bh, origin) {
  const UNIT = 8;
  const base = isoToScreen(0, iy, 0, origin);
  const cx = base.x;
  const topY = base.y - (fw + fd) / 4 - bh;

  const A = { x: cx, y: topY };
  const B = { x: cx + fw, y: topY + fw / 2 };
  const C = { x: cx + fw - fd, y: topY + (fw + fd) / 2 };
  const D = { x: cx - fd, y: topY + fd / 2 };

  // CR 클램핑: 짧은 변(fd) 대비 코너가 겹치지 않도록
  // 안전 조건: 2*cuf < fd*√5/2 → CR < fd*5/8
  const cr = Math.min(CR, fd * 0.55);
  const s5 = Math.sqrt(5);
  const cuf = cr * 2 / s5;
  const cvf = cr / s5;

  const pA1 = { x: A.x - cuf, y: A.y + cvf };
  const pA2 = { x: A.x + cuf, y: A.y + cvf };

  const pB1 = { x: B.x - cuf, y: B.y - cvf };
  const pB2 = { x: B.x - cuf, y: B.y + cvf };
  const pB_R = { x: B.x - 0.5 * cuf, y: B.y };
  const qB1 = { x: B.x - 0.5 * cuf, y: B.y - 0.5 * cvf };
  const qB2 = { x: B.x - 0.5 * cuf, y: B.y + 0.5 * cvf };

  const pC1 = { x: C.x + cuf, y: C.y - cvf };
  const pC2 = { x: C.x - cuf, y: C.y - cvf };

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

  // frontTransform: flat (FF_W × FF_H) → 전면 평행사변형 (D→C top edge, bh drop)
  const frontTransform = `matrix(${r(fw / FF_W)}, ${r(fw / (2 * FF_W))}, 0, ${r(bh / FF_H)}, ${r(D.x)}, ${r(D.y)})`;

  const pathLen = Math.ceil((fw + fd) * 2.3 + 2 * bh + 50);

  return {
    outline, vLine, frontEdge, frontTransform, pathLen,
    fw, fd, bh, cx, topY,
    top: A, right: B, frontTop: C, left: D,
    rightBottom: { x: B.x, y: Sy(B.y) },
    frontBottom: { x: C.x, y: Sy(C.y) },
    leftBottom: { x: D.x, y: Sy(D.y) },
    leftMid: { x: pD_L.x, y: pD_L.y + bh / 2 },
    rightMid: { x: pB_R.x, y: pB_R.y + bh / 2 },
    // 전면 좌표 헬퍼: (u, v) 비율 → screen 좌표
    frontPoint: (u, v) => ({
      x: r(D.x + u * fw),
      y: r(D.y + u * fw / 2 + v * bh),
    }),
  };
}

// ── Front Face Content ──────────────────────────────────
// flat (FF_W × FF_H) 좌표계에서 콘텐츠를 그린다.
// frontTransform이 아이소메트릭 전면으로 변환.

function FrontContent({ type }) {
  const p = 5;
  const w = FF_W - 2 * p;
  const h = FF_H - 2 * p;
  const W = 'white';
  const S = 'var(--vdl-700)';

  switch (type) {
    case 'code': {
      const lines = [
        { t: 'function Card() {',           hi: false },
        { t: '  const [state, setState]',    hi: false },
        { t: '    = useState(\'idle\')',     hi: false },
        { t: '  return (',                   hi: false },
        { t: '    <div onHover={setState}>', hi: false },
        { t: '      <Badge status />',       hi: true  },
        { t: '      <Button onClick />',     hi: true  },
        { t: '    </div>',                   hi: false },
        { t: '  )',                           hi: false },
        { t: '}',                             hi: false },
      ];
      const lh = h / (lines.length + 0.5);
      return (
        <g>
          {lines.map((l, i) => (
            <text
              key={i}
              x={p + 2}
              y={p + lh * (i + 0.8)}
              fill={W}
              fontSize={3.6}
              fontFamily="monospace"
              opacity={l.hi ? 1 : 0.55}
            >
              {l.t}
            </text>
          ))}
        </g>
      );
    }

    case 'anatomy': {
      const midX = FF_W / 2;
      const midY = FF_H * 0.42;
      const sp = 14;
      const nodes = [
        { label: 'idle',     x: midX,      y: midY - sp,  r: 4,   active: false },
        { label: 'hover',    x: midX - sp, y: midY,       r: 4,   active: false },
        { label: 'active',   x: midX + sp, y: midY,       r: 5.5, active: true  },
        { label: 'disabled', x: midX,      y: midY + sp,  r: 4,   active: false },
      ];
      return (
        <g>
          {/* orthogonal connection lines */}
          <path
            d={`M${midX} ${midY - sp + 4}L${midX} ${midY - 3}L${midX - sp} ${midY - 3}L${midX - sp} ${midY - 4}`}
            fill="none" stroke={S} strokeWidth={SW}
          />
          <path
            d={`M${midX} ${midY - sp + 4}L${midX} ${midY - 3}L${midX + sp} ${midY - 3}L${midX + sp} ${midY - 5.5}`}
            fill="none" stroke={S} strokeWidth={SW}
          />
          <path
            d={`M${midX - sp} ${midY + 4}L${midX - sp} ${midY + 3}L${midX} ${midY + 3}L${midX} ${midY + sp - 4}`}
            fill="none" stroke={S} strokeWidth={SW}
          />
          <path
            d={`M${midX + sp} ${midY + 5.5}L${midX + sp} ${midY + 3}L${midX} ${midY + 3}L${midX} ${midY + sp - 4}`}
            fill="none" stroke={S} strokeWidth={SW}
          />
          {/* nodes */}
          {nodes.map((n) => (
            <g key={n.label}>
              <circle cx={n.x} cy={n.y} r={n.r} fill="none" stroke={W}
                strokeWidth={n.active ? SW * 2 : SW} />
              {n.active && (
                <circle cx={n.x} cy={n.y} r={n.r - 1.8} fill="none" stroke={W} strokeWidth={SW} />
              )}
              <text
                x={n.x} y={n.y + n.r + 5}
                fill={W} fontSize={3.2} fontFamily="monospace"
                textAnchor="middle" opacity={0.7}
              >
                {n.label}
              </text>
            </g>
          ))}
          {/* annotations */}
          <text x={midX} y={FF_H - p - 4} fill={S} fontSize={2.8} fontFamily="monospace"
            textAnchor="middle" opacity={0.6}>
            (onHover → setState,
          </text>
          <text x={midX} y={FF_H - p - 0.5} fill={S} fontSize={2.8} fontFamily="monospace"
            textAnchor="middle" opacity={0.6}>
            onClick → handler)
          </text>
        </g>
      );
    }

    case 'ui': {
      const navH = 7;
      const cardX = p;
      const cardY = p + navH + 2.5;
      const cardW = w * 0.62;
      const cardH = h - navH - 6;
      const metX = p + cardW + 3;
      const metW = w - cardW - 3;
      const metH = (cardH - 4) / 3;
      const nums = ['16', '264', '32'];

      return (
        <g fill="none" strokeWidth={SW}>
          {/* nav bar */}
          <circle cx={p + 4} cy={p + navH / 2} r={2.5} stroke={W} />
          <text x={p + 12} y={p + navH / 2 + 1} fill={S} fontSize={2.6}
            fontFamily="monospace">nav pill</text>
          <text x={p + 30} y={p + navH / 2 + 1} fill={S} fontSize={2.6}
            fontFamily="monospace">nav links</text>
          <circle cx={FF_W - p - 4} cy={p + navH / 2} r={2.2} stroke={S} />
          <line x1={p} y1={p + navH} x2={FF_W - p} y2={p + navH} stroke={S} opacity={0.4} />

          {/* hero card */}
          <rect x={cardX} y={cardY} width={cardW} height={cardH} rx={3} stroke={W} />
          {/* title */}
          <text x={cardX + 3} y={cardY + 8} fill={W} fontSize={4.2}
            fontFamily="sans-serif" fontWeight="bold">Vibe Design Labs</text>
          {/* subtitle — BRAND.slogan */}
          <text x={cardX + 3} y={cardY + 14} fill={S} fontSize={2.8}
            fontFamily="monospace">Design at the Speed of Thought</text>
          {/* body — VALUE_PROPOSITIONS */}
          <text x={cardX + 3} y={cardY + 20} fill={S} fontSize={2.2}
            fontFamily="monospace" opacity={0.5}>System Over Drawing · The Vibe Standard</text>
          <text x={cardX + 3} y={cardY + 24} fill={S} fontSize={2.2}
            fontFamily="monospace" opacity={0.5}>Design As Build</text>
          {/* CTA button — white fill */}
          <rect x={cardX + 3} y={cardY + cardH - 10} width={cardW * 0.45} height={7} rx={3}
            fill={W} stroke="none" />
          <text x={cardX + 3 + cardW * 0.225} y={cardY + cardH - 5.5} fill="var(--vdl-950)"
            fontSize={2.8} fontFamily="monospace" textAnchor="middle" fontWeight="bold">Start</text>

          {/* metric cards */}
          {[0, 1, 2].map((i) => {
            const my = cardY + i * (metH + 2);
            return (
              <g key={i}>
                <rect x={metX} y={my} width={metW} height={metH} rx={2} stroke={S} />
                <text x={metX + 2} y={my + metH * 0.38} fill={W} fontSize={4}
                  fontFamily="monospace" fontWeight="bold">{nums[i]}</text>
                {/* sparkline */}
                <path
                  d={`M${metX + 2} ${my + metH * 0.72}l${metW * 0.15} ${-metH * 0.15}l${metW * 0.12} ${metH * 0.1}l${metW * 0.18} ${-metH * 0.25}l${metW * 0.12} ${metH * 0.08}`}
                  stroke={S} fill="none" strokeLinecap="round"
                />
              </g>
            );
          })}
        </g>
      );
    }

    default:
      return null;
  }
}

// ── Screen renderer ─────────────────────────────────────

function ScreenNode({ panel, inView, drawDelay, contentDelay }) {
  const s = panel.screen;
  const clip = `url(#dab-clip-${panel.id})`;

  return (
    <g filter="url(#dabs)">
      {/* Phase 1: outline draws */}
      <path
        d={s.outline} fill="var(--vdl-950)" stroke="white"
        strokeWidth={SW} strokeLinejoin="round"
        className={inView ? 'dab-draw' : 'dab-outline-hidden'}
        style={{ '--len': s.pathLen, '--delay': `${drawDelay}ms` }}
      />
      {/* Phase 2: content fades in */}
      <g
        className={inView ? 'dab-fade' : 'dab-hidden'}
        style={{ '--delay': `${contentDelay}ms` }}
      >
        <path d={s.vLine} fill="none" stroke="var(--vdl-800)"
          strokeWidth={SW} strokeLinecap="round" clipPath={clip} />
        <path d={s.frontEdge} fill="none" stroke="var(--vdl-800)"
          strokeWidth={SW} strokeLinecap="round" clipPath={clip} />
        <g transform={s.frontTransform}>
          <FrontContent type={panel.type} />
        </g>
      </g>
    </g>
  );
}

// ── Main Component ──────────────────────────────────────

const DesignAsBuild = forwardRef(({ delay: baseDelay = 0, ...props }, ref) => {
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

  const panels = PANELS.map((p) => ({
    ...p,
    screen: buildDabScreen(p.iy, p.fw, p.fd, p.bh, ORIGIN),
  }));

  // 점선 연결: 각 패널의 대응 꼭짓점 4개를 잇는 직선
  const s = panels.map((p) => p.screen);
  const connLines = [
    { id: 'top',    pts: [s[0].top,         s[1].top,         s[2].top]         },
    { id: 'right',  pts: [s[0].rightBottom, s[1].rightBottom, s[2].rightBottom] },
    { id: 'front',  pts: [s[0].frontBottom, s[1].frontBottom, s[2].frontBottom] },
    { id: 'left',   pts: [s[0].leftBottom,  s[1].leftBottom,  s[2].leftBottom]  },
  ];

  // 패널별 타이밍
  const panelTimings = panels.map((_, i) => ({
    draw: baseDelay + i * PANEL_STAGGER,
    content: baseDelay + i * PANEL_STAGGER + DRAW_DUR - 100,
    conn: baseDelay + i * PANEL_STAGGER + DRAW_DUR - 50,
  }));

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
        @keyframes dab-draw {
          to { stroke-dashoffset: 0; fill-opacity: 0.85; }
        }
        @keyframes dab-fade {
          to { opacity: 1; }
        }
        .dab-outline-hidden {
          stroke-dasharray: var(--len);
          stroke-dashoffset: var(--len);
          fill-opacity: 0;
        }
        .dab-draw {
          stroke-dasharray: var(--len);
          stroke-dashoffset: var(--len);
          fill-opacity: 0;
          animation: dab-draw ${DRAW_DUR}ms ease-out var(--delay) forwards;
        }
        .dab-hidden { opacity: 0.01; }
        .dab-fade {
          opacity: 0.01;
          animation: dab-fade 300ms ease-out var(--delay) forwards;
        }
        @keyframes dab-halo-pulse {
          0%, 100% { opacity: 0.01; }
          35%, 65% { opacity: 0.4; }
        }
        @keyframes dab-fill-pulse {
          0%, 100% { opacity: 0.01; }
          35%, 65% { opacity: 0.15; }
        }
        .dab-pulse-halo, .dab-pulse-fill,
        .dab-stay-halo, .dab-stay-fill {
          opacity: 0.01;
        }
        .dab-hovered .dab-pulse-halo {
          animation: dab-halo-pulse 600ms ease-out var(--glow-delay) both;
        }
        .dab-hovered .dab-pulse-fill {
          animation: dab-fill-pulse 600ms ease-out var(--glow-delay) both;
        }
        .dab-stay-halo, .dab-stay-fill {
          transition: opacity 300ms ease-out 0ms;
        }
        .dab-hovered .dab-stay-halo {
          opacity: 0.4;
          transition-delay: var(--glow-delay);
        }
        .dab-hovered .dab-stay-fill {
          opacity: 0.15;
          transition-delay: var(--glow-delay);
        }
        @media (prefers-reduced-motion: reduce) {
          .dab-draw { fill-opacity: 0.85; stroke-dashoffset: 0; animation: none; }
          .dab-fade { opacity: 1; animation: none; }
          .dab-hovered .dab-pulse-halo,
          .dab-hovered .dab-pulse-fill { animation: none; }
          .dab-stay-halo, .dab-stay-fill { transition: none; }
          .dab-hovered .dab-stay-halo { opacity: 0.4; }
          .dab-hovered .dab-stay-fill { opacity: 0.15; }
        }
      `}</style>
      <defs>
        <filter id="dab-glow-f" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter
          id="dabs"
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
        {panels.map((p) => (
          <clipPath key={p.id} id={`dab-clip-${p.id}`}>
            <path d={p.screen.outline} />
          </clipPath>
        ))}
      </defs>

      {/* ── Painter's model: back → front ── */}

      {/* Back: Code panel */}
      <ScreenNode panel={panels[0]} inView={inView}
        drawDelay={panelTimings[0].draw} contentDelay={panelTimings[0].content} />

      {/* Connection lines: code → anatomy */}
      <g
        className={inView ? 'dab-fade' : 'dab-hidden'}
        style={{ '--delay': `${panelTimings[0].conn}ms` }}
      >
        {connLines.map((conn) => (
          <line key={`c1-${conn.id}`}
            x1={conn.pts[0].x} y1={conn.pts[0].y}
            x2={conn.pts[1].x} y2={conn.pts[1].y}
            stroke="white" strokeWidth={SW}
            strokeDasharray="3 2" opacity={0.4}
          />
        ))}
      </g>

      {/* Middle: Anatomy panel */}
      <ScreenNode panel={panels[1]} inView={inView}
        drawDelay={panelTimings[1].draw} contentDelay={panelTimings[1].content} />

      {/* Connection lines: anatomy → ui */}
      <g
        className={inView ? 'dab-fade' : 'dab-hidden'}
        style={{ '--delay': `${panelTimings[1].conn}ms` }}
      >
        {connLines.map((conn) => (
          <line key={`c2-${conn.id}`}
            x1={conn.pts[1].x} y1={conn.pts[1].y}
            x2={conn.pts[2].x} y2={conn.pts[2].y}
            stroke="white" strokeWidth={SW}
            strokeDasharray="3 2" opacity={0.4}
          />
        ))}
      </g>

      {/* Front: UI panel */}
      <ScreenNode panel={panels[2]} inView={inView}
        drawDelay={panelTimings[2].draw} contentDelay={panelTimings[2].content} />

      {/* ── Panel glow (hover) — back→front wave, last stays ── */}
      <g className={isHovered ? 'dab-hovered' : undefined}>
        {panels.map((p, i) => {
          const isLast = i === panels.length - 1;
          const haloCls = isLast ? 'dab-stay-halo' : 'dab-pulse-halo';
          const fillCls = isLast ? 'dab-stay-fill' : 'dab-pulse-fill';
          return (
            <g key={`glow-${p.id}`} style={{ '--glow-delay': `${i * 200}ms` }}>
              <path
                d={p.screen.outline}
                fill="var(--vdl-200)" filter="url(#dab-glow-f)"
                className={haloCls}
              />
              <path
                d={p.screen.outline}
                fill="var(--vdl-200)"
                className={fillCls}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
});

DesignAsBuild.displayName = 'DesignAsBuild';

export { DesignAsBuild };

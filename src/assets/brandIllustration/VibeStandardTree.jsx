'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import { isoToScreen, roundedSlab, r } from './isometricGrid';

/**
 * VP2 — Vibe Standard Tree
 *
 * 디자인 언어 체계의 택소노미 트리를 아이소메트릭 노드로 시각화.
 * roundedSlab + isoToScreen으로 구도를 수학적으로 보장.
 *
 * @param {object} props - SVG props passthrough [Optional]
 */

const VB_X = 65;
const VB_Y = 15;
const VB_W = 270;
const VB_H = 215;
const SW = 0.5;

const ORIGIN = { x: 200, y: 130 };

// ── 밝기 계층 ────────────────────────────────────────────
const LEVEL_STYLE = {
  0: { outline: 'white',          internal: 'var(--vdl-300)' },
  1: { outline: 'var(--vdl-200)', internal: 'var(--vdl-400)' },
  2: { outline: 'var(--vdl-400)', internal: 'var(--vdl-500)' },
};

// ── 트리 노드 데이터 ──────────────────────────────────────
const TREE_NODES = [
  // L0 Root
  { id: 'root', level: 0, ix: 0, iy: 0, iz: 8, w: 5.5, h: 0.8, cr: 0.8, type: 'dashboard', parent: null },

  // L1 Categories (iz=3)
  { id: 'l1a', level: 1, ix: -2, iy: 6,  iz: 3, w: 3.5, h: 0.6, cr: 0.6, type: 'browser',    parent: 'root' },
  { id: 'l1b', level: 1, ix: 1,  iy: 5,  iz: 3, w: 3.5, h: 0.6, cr: 0.6, type: 'tablet',     parent: 'root' },
  { id: 'l1c', level: 1, ix: 5,  iy: 1,  iz: 3, w: 3.5, h: 0.6, cr: 0.6, type: 'artboard',   parent: 'root' },
  { id: 'l1d', level: 1, ix: 6,  iy: -2, iz: 3, w: 3.5, h: 0.6, cr: 0.6, type: 'splitPanel', parent: 'root' },

  // L2 Sub-categories (iz=-1)
  { id: 'l2a1', level: 2, ix: -2, iy: 10, iz: -1, w: 2.5, h: 0.4, cr: 0.5, type: 'pill',    parent: 'l1a' },
  { id: 'l2a2', level: 2, ix: 0,  iy: 10, iz: -1, w: 2.5, h: 0.4, cr: 0.5, type: 'card',    parent: 'l1a' },
  { id: 'l2b1', level: 2, ix: 2,  iy: 8,  iz: -1, w: 2.5, h: 0.4, cr: 0.5, type: 'list',    parent: 'l1b' },
  { id: 'l2b2', level: 2, ix: 5,  iy: 7,  iz: -1, w: 2.5, h: 0.4, cr: 0.5, type: 'wave',    parent: 'l1b' },
  { id: 'l2c1', level: 2, ix: 7,  iy: 5,  iz: -1, w: 2.5, h: 0.4, cr: 0.5, type: 'grid',    parent: 'l1c' },
  { id: 'l2c2', level: 2, ix: 8,  iy: 2,  iz: -1, w: 2.5, h: 0.4, cr: 0.5, type: 'letterA', parent: 'l1c' },
  { id: 'l2d1', level: 2, ix: 10, iy: 0,  iz: -1, w: 2.5, h: 0.4, cr: 0.5, type: 'circles', parent: 'l1d' },
  { id: 'l2d2', level: 2, ix: 10, iy: -2, iz: -1, w: 2.5, h: 0.4, cr: 0.5, type: 'chevron', parent: 'l1d' },
];

// L3 Leaf dots (slab 없음)
const LEAF_DOTS = [
  { id: 'l3a', ix: -1, iy: 13, iz: -4, parent: 'l2a1' },
  { id: 'l3b', ix: 5,  iy: 9,  iz: -4, parent: 'l2b2' },
  { id: 'l3c', ix: 9,  iy: 5,  iz: -4, parent: 'l2c1' },
  { id: 'l3d', ix: 13, iy: -1, iz: -4, parent: 'l2d2' },
];

// ── Top Face Content (flat hd×hd 좌표계) ────────────────
// topTransform이 flat → isometric으로 변환

function TopFaceContent({ type, hd, stroke }) {
  const p = hd * 0.18;
  const s = hd - 2 * p;

  switch (type) {
    case 'dashboard': {
      const g = s / 3;
      return (
        <g fill="none" strokeWidth={SW}>
          <rect x={p} y={p} width={s} height={s} rx={2} stroke={stroke} />
          <line x1={p + g} y1={p} x2={p + g} y2={p + s} stroke={stroke} opacity={0.5} />
          <line x1={p + 2 * g} y1={p} x2={p + 2 * g} y2={p + s} stroke={stroke} opacity={0.5} />
          <line x1={p} y1={p + g} x2={p + s} y2={p + g} stroke={stroke} opacity={0.5} />
          <line x1={p} y1={p + 2 * g} x2={p + s} y2={p + 2 * g} stroke={stroke} opacity={0.5} />
          <circle cx={p + s * 0.25} cy={p + s * 0.83} r={1.2} fill={stroke} />
          <circle cx={p + s * 0.5} cy={p + s * 0.83} r={1.2} fill={stroke} />
        </g>
      );
    }
    case 'browser':
      return (
        <g fill="none" strokeWidth={SW}>
          <rect x={p} y={p} width={s} height={s} rx={1.5} stroke={stroke} />
          <line x1={p} y1={p + s * 0.22} x2={p + s} y2={p + s * 0.22} stroke={stroke} />
          <circle cx={p + 2.5} cy={p + s * 0.11} r={0.8} fill={stroke} />
          <circle cx={p + 5} cy={p + s * 0.11} r={0.8} fill={stroke} />
          <circle cx={p + 7.5} cy={p + s * 0.11} r={0.8} fill={stroke} />
        </g>
      );
    case 'tablet':
      return (
        <g fill="none" strokeWidth={SW}>
          <rect x={p} y={p} width={s} height={s} rx={2} stroke={stroke} />
          <path
            d={`M${p + s * 0.2} ${p + s * 0.7}Q${p + s * 0.5} ${p + s * 0.2} ${p + s * 0.8} ${p + s * 0.5}`}
            stroke={stroke} opacity={0.7}
          />
        </g>
      );
    case 'artboard': {
      const m = 2.5;
      return (
        <g fill="none" strokeWidth={SW}>
          <rect x={p} y={p} width={s} height={s} rx={1} stroke={stroke} />
          <path d={`M${p + m} ${p}v${m} M${p} ${p + m}h${m}`} stroke={stroke} opacity={0.6} />
          <path d={`M${p + s - m} ${p}v${m} M${p + s} ${p + m}h${-m}`} stroke={stroke} opacity={0.6} />
          <path d={`M${p + m} ${p + s}v${-m} M${p} ${p + s - m}h${m}`} stroke={stroke} opacity={0.6} />
          <path d={`M${p + s - m} ${p + s}v${-m} M${p + s} ${p + s - m}h${-m}`} stroke={stroke} opacity={0.6} />
        </g>
      );
    }
    case 'splitPanel':
      return (
        <g fill="none" strokeWidth={SW}>
          <rect x={p} y={p} width={s} height={s} rx={1} stroke={stroke} />
          <line x1={p + s / 2} y1={p + 2} x2={p + s / 2} y2={p + s - 2} stroke={stroke} opacity={0.7} />
        </g>
      );
    case 'pill':
      return (
        <rect x={p} y={p + s * 0.25} width={s} height={s * 0.5} rx={s * 0.25}
          stroke={stroke} strokeWidth={SW} fill="none" />
      );
    case 'card':
      return (
        <g fill="none" strokeWidth={SW}>
          <rect x={p} y={p} width={s} height={s} rx={1} stroke={stroke} />
          <line x1={p + 1.5} y1={p + s * 0.3} x2={p + s - 1.5} y2={p + s * 0.3} stroke={stroke} opacity={0.6} />
        </g>
      );
    case 'list':
      return (
        <g fill="none" strokeWidth={SW}>
          <line x1={p + 1} y1={p + s * 0.25} x2={p + s - 1} y2={p + s * 0.25} stroke={stroke} />
          <line x1={p + 1} y1={p + s * 0.5} x2={p + s - 1} y2={p + s * 0.5} stroke={stroke} />
          <line x1={p + 1} y1={p + s * 0.75} x2={p + s - 1} y2={p + s * 0.75} stroke={stroke} />
        </g>
      );
    case 'wave':
      return (
        <path
          d={`M${p} ${p + s * 0.6}Q${p + s * 0.25} ${p + s * 0.2} ${p + s * 0.5} ${p + s * 0.5}Q${p + s * 0.75} ${p + s * 0.8} ${p + s} ${p + s * 0.4}`}
          fill="none" stroke={stroke} strokeWidth={SW} strokeLinecap="round"
        />
      );
    case 'grid': {
      const gs = (s - 2) / 2;
      const g = 1;
      return (
        <g fill="none" strokeWidth={SW}>
          <rect x={p} y={p} width={gs} height={gs} rx={0.5} stroke={stroke} />
          <rect x={p + gs + g} y={p} width={gs} height={gs} rx={0.5} stroke={stroke} />
          <rect x={p} y={p + gs + g} width={gs} height={gs} rx={0.5} stroke={stroke} />
          <rect x={p + gs + g} y={p + gs + g} width={gs} height={gs} rx={0.5} stroke={stroke} />
        </g>
      );
    }
    case 'letterA':
      return (
        <g fill="none" strokeWidth={SW}>
          <line x1={p + s * 0.5} y1={p + 1} x2={p + 1} y2={p + s - 1} stroke={stroke} />
          <line x1={p + s * 0.5} y1={p + 1} x2={p + s - 1} y2={p + s - 1} stroke={stroke} />
          <line x1={p + s * 0.25} y1={p + s * 0.6} x2={p + s * 0.75} y2={p + s * 0.6} stroke={stroke} />
        </g>
      );
    case 'circles':
      return (
        <g fill="none" strokeWidth={SW}>
          <circle cx={p + s * 0.22} cy={p + s * 0.5} r={s * 0.15} stroke={stroke} />
          <circle cx={p + s * 0.5} cy={p + s * 0.5} r={s * 0.15} stroke={stroke} />
          <circle cx={p + s * 0.78} cy={p + s * 0.5} r={s * 0.15} stroke={stroke} />
        </g>
      );
    case 'chevron':
      return (
        <path
          d={`M${p + 2} ${p + s * 0.3}L${p + s * 0.5} ${p + s * 0.7}L${p + s - 2} ${p + s * 0.3}`}
          fill="none" stroke={stroke} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round"
        />
      );
    default:
      return null;
  }
}

// ── Slab renderer ────────────────────────────────────────

function SlabNode({ node }) {
  const style = LEVEL_STYLE[node.level];
  return (
    <g filter="url(#vsts)">
      <path
        d={node.slab.outline}
        fill="var(--vdl-950)"
        stroke={style.outline}
        strokeWidth={SW}
        strokeLinejoin="round"
      />
      <path
        d={node.slab.vLine}
        fill="none"
        stroke={style.internal}
        strokeWidth={SW}
        strokeLinecap="round"
        clipPath={`url(#vst-clip-${node.id})`}
      />
      <path
        d={node.slab.frontEdge}
        fill="none"
        stroke={style.internal}
        strokeWidth={SW}
        strokeLinecap="round"
        clipPath={`url(#vst-clip-${node.id})`}
      />
      <g transform={node.slab.topTransform} clipPath={`url(#vst-clip-${node.id})`}>
        <TopFaceContent type={node.type} hd={node.slab.hd} stroke={style.internal} />
      </g>
    </g>
  );
}

// ── Main Component ──────────────────────────────────────

const VibeStandardTree = forwardRef((props, ref) => {
  const innerRef = useRef(null);
  const [inView, setInView] = useState(false);

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
    slab: roundedSlab(n.ix, n.iy, n.iz, n.w, n.h, n.cr, ORIGIN),
  }));

  const dots = LEAF_DOTS.map((d) => ({
    ...d,
    screen: isoToScreen(d.ix, d.iy, d.iz, ORIGIN),
  }));

  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  // Sort by depth within each level (ix+iy ascending = back first)
  const sortedL2 = nodes.filter((n) => n.level === 2).sort((a, b) => (a.ix + a.iy) - (b.ix + b.iy));
  const sortedL1 = nodes.filter((n) => n.level === 1).sort((a, b) => (a.ix + a.iy) - (b.ix + b.iy));
  const root = nodes.find((n) => n.level === 0);

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
      {...props}
    >
      <style>{`
        @keyframes vst-enter {
          from { opacity: 0.01; transform: translateY(12px); }
          to   { opacity: 1;    transform: translateY(0); }
        }
        .vst-hidden { opacity: 0.01; }
        .vst-anim {
          opacity: 0.01;
          animation: vst-enter 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .vst-d0  { animation-delay: 0ms; }
        .vst-d1  { animation-delay: 300ms; }
        .vst-d2  { animation-delay: 400ms; }
        .vst-d3  { animation-delay: 800ms; }
        .vst-d4  { animation-delay: 900ms; }
        .vst-d5  { animation-delay: 1400ms; }
        @media (prefers-reduced-motion: reduce) {
          .vst-anim { animation: none; opacity: 1; }
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
        {nodes.map((n) => (
          <clipPath key={n.id} id={`vst-clip-${n.id}`}>
            <path d={n.slab.outline} />
          </clipPath>
        ))}
      </defs>

      {/* ── L0→L1 connection lines (delay: d1) ── */}
      <g className={inView ? 'vst-anim vst-d1' : 'vst-hidden'}>
        {nodes.filter((n) => n.level === 1).map((n) => {
          const p = nodeMap[n.parent];
          if (!p) return null;
          return (
            <g key={`conn-${n.id}`}>
              <line
                x1={r(p.slab.frontBottom.x)} y1={r(p.slab.frontBottom.y)}
                x2={r(n.slab.top.x)} y2={r(n.slab.top.y)}
                stroke="var(--vdl-700)" strokeWidth={0.5}
              />
              <circle cx={r(p.slab.frontBottom.x)} cy={r(p.slab.frontBottom.y)} r={1.2} fill="var(--vdl-700)" />
              <circle cx={r(n.slab.top.x)} cy={r(n.slab.top.y)} r={1.2} fill="var(--vdl-700)" />
            </g>
          );
        })}
      </g>

      {/* ── L1→L2 connection lines (delay: d3) ── */}
      <g className={inView ? 'vst-anim vst-d3' : 'vst-hidden'}>
        {nodes.filter((n) => n.level === 2).map((n) => {
          const p = nodeMap[n.parent];
          if (!p) return null;
          return (
            <g key={`conn-${n.id}`}>
              <line
                x1={r(p.slab.frontBottom.x)} y1={r(p.slab.frontBottom.y)}
                x2={r(n.slab.top.x)} y2={r(n.slab.top.y)}
                stroke="var(--vdl-700)" strokeWidth={0.5}
              />
              <circle cx={r(p.slab.frontBottom.x)} cy={r(p.slab.frontBottom.y)} r={1.2} fill="var(--vdl-700)" />
              <circle cx={r(n.slab.top.x)} cy={r(n.slab.top.y)} r={1.2} fill="var(--vdl-700)" />
            </g>
          );
        })}
      </g>

      {/* ── L2→L3 connection lines (delay: d5) ── */}
      <g className={inView ? 'vst-anim vst-d5' : 'vst-hidden'}>
        {dots.map((d) => {
          const p = nodeMap[d.parent];
          if (!p) return null;
          return (
            <line
              key={`conn-${d.id}`}
              x1={r(p.slab.frontBottom.x)} y1={r(p.slab.frontBottom.y)}
              x2={r(d.screen.x)} y2={r(d.screen.y)}
              stroke="var(--vdl-700)" strokeWidth={0.3}
            />
          );
        })}
      </g>

      {/* ── L2 slabs (delay: d4) ── */}
      {sortedL2.map((n) => (
        <g key={n.id} className={inView ? 'vst-anim vst-d4' : 'vst-hidden'}>
          <SlabNode node={n} />
        </g>
      ))}

      {/* ── L1 slabs (delay: d2) ── */}
      {sortedL1.map((n) => (
        <g key={n.id} className={inView ? 'vst-anim vst-d2' : 'vst-hidden'}>
          <SlabNode node={n} />
        </g>
      ))}

      {/* ── L0 root slab (delay: d0) ── */}
      {root && (
        <g className={inView ? 'vst-anim vst-d0' : 'vst-hidden'}>
          <SlabNode node={root} />
        </g>
      )}

      {/* ── L3 leaf dots (delay: d5) ── */}
      <g className={inView ? 'vst-anim vst-d5' : 'vst-hidden'}>
        {dots.map((d) => (
          <circle
            key={d.id}
            cx={r(d.screen.x)}
            cy={r(d.screen.y)}
            r={1.5}
            fill="var(--vdl-700)"
          />
        ))}
      </g>
    </svg>
  );
});

VibeStandardTree.displayName = 'VibeStandardTree';

export { VibeStandardTree };

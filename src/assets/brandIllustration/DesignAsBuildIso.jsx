'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import {
  prism, namingLine, r,
} from './isometricGrid';

/**
 * VP3 — Design As Build (Isometric)
 *
 * "설계가 곧 구현이 되는 장면"
 * Card 컴포넌트를 4개 레이어로 분해한 익스플로디드 뷰.
 * 각 레이어 상면에 실제 UI 요소를 matrix 프로젝션으로 배치하고,
 * 좌측 구조 인덱스 + 우측 CSS 속성 어노테이션으로 설계=구현을 시각화.
 *
 * @param {object} props - SVG props passthrough [Optional]
 */

const W = 400;
const H = 400;
const O = { x: 168, y: 336 };

// ── Animation timing (ms) ───────────────────────────────
const DRAW_DUR = 400;
const LAYER_STAGGER = 500;

const LAYERS = [
  { iz: 0,  h: 1.2, w: 7, label: 'Container Layer', cssProp: 'width: 320px',  stroke: 'var(--vdl-200)', content: 'container', legend: ['Base Grid', 'border: dark-bg', 'border-radius: 8px'] },
  { iz: 10, h: 1.2, w: 7, label: 'Header Section',  cssProp: 'display: flex',  stroke: 'var(--vdl-200)', content: 'header',    legend: ['Title', 'Icon: avatar', 'divider-line'] },
  { iz: 20, h: 1.2, w: 7, label: 'Content Area',     cssProp: 'padding: 16px',  stroke: 'var(--vdl-600)', content: 'content',   legend: ['List of Items', 'Header items', 'Media area'] },
  { iz: 30, h: 1.2, w: 7, label: 'Action Layer',     cssProp: 'gap: 8px',       stroke: 'var(--vdl-600)', content: 'actions',   legend: ['Buttons', 'Filters or Settings'] },
];

const LEGEND_Y_START = 56;
const LEGEND_Y_GAP = 36;
const LEGEND_ITEM_OFFSET = 8;
const LEGEND_ITEM_GAP = 7;

const DesignAsBuildIso = forwardRef(({ delay: baseDelay = 0, ...props }, ref) => {
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

  const layers = LAYERS.map((l, i) => {
    const p = prism(0, 0, l.iz, l.w, l.h, O);
    const edge = { x: p.cx + p.hd, y: p.topY + p.hd / 2 + p.bh / 2 };
    const nl = namingLine(edge.x + 4, edge.y, 32);
    const nlColor = l.stroke === 'var(--vdl-200)' ? 'var(--vdl-200)' : 'var(--vdl-700)';
    const legendTitleY = LEGEND_Y_START + i * LEGEND_Y_GAP;
    const pathLen = Math.ceil(4.5 * p.hd + 2 * p.bh);
    return { ...l, p, nl, nlColor, legendTitleY, pathLen };
  });

  const hd = layers[0].p.hd;

  // Assembly axis
  const axisTop = layers[layers.length - 1].p.top;
  const axisBot = layers[0].p.baseCenter;

  /** Matrix transform: maps flat (hd x hd) square onto isometric top face */
  const tf = (p) => `matrix(1, 0.5, -1, 0.5, ${r(p.cx)}, ${r(p.topY)})`;

  // Bottom annotations (pre-computed)
  const bot = layers[0].p;
  const botY = bot.bottom.y + 6;

  // Last layer completes at: (LAYERS.length - 1) * STAGGER + DRAW_DUR
  const globalEndDelay = baseDelay + (LAYERS.length - 1) * LAYER_STAGGER + DRAW_DUR + 100;

  return (
    <svg
      ref={(node) => {
        innerRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      xmlns="http://www.w3.org/2000/svg" width={W} height={H} fill="none" viewBox={`0 0 ${W} ${H}`}
      {...props}
    >
      <style>{`
        @keyframes vp3-draw {
          to { stroke-dashoffset: 0; fill-opacity: 1; }
        }
        @keyframes vp3-fade {
          to { opacity: 1; }
        }
        .vp3-outline-hidden {
          stroke-dasharray: var(--len);
          stroke-dashoffset: var(--len);
          fill-opacity: 0;
        }
        .vp3-draw {
          stroke-dasharray: var(--len);
          stroke-dashoffset: var(--len);
          fill-opacity: 0;
          animation: vp3-draw ${DRAW_DUR}ms ease-out var(--delay) forwards;
        }
        .vp3-hidden { opacity: 0.01; }
        .vp3-fade {
          opacity: 0.01;
          animation: vp3-fade 300ms ease-out var(--delay) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .vp3-draw { fill-opacity: 1; stroke-dashoffset: 0; animation: none; }
          .vp3-fade { opacity: 1; animation: none; }
        }
      `}</style>
      <defs>
        <filter id="vp3s" x="-32" y="-32" width={W + 64} height={H + 64} colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="6" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0.031 0 0 0 0 0.035 0 0 0 0 0.039 0 0 0 0.6 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>

      {/* ── Global ── */}
      <g data-role="global">
        {/* Title */}
        <g
          data-part="title"
          className={inView ? 'vp3-fade' : 'vp3-hidden'}
          style={{ '--delay': `${baseDelay}ms` }}
        >
          <text x="10" y="16" fill="var(--vdl-600)" fontSize="7.5" fontFamily="monospace" fontWeight="bold" letterSpacing="0.8">
            CARD COMPONENT
          </text>
          <text x="10" y="26" fill="var(--vdl-600)" fontSize="7.5" fontFamily="monospace" fontWeight="bold" letterSpacing="0.8">
            ANATOMY
          </text>
        </g>

        {/* Left Legend — each block fades with its layer */}
        <g data-part="legend" fontSize="4.5" fontFamily="monospace">
          <text
            x="10" y="42" fill="var(--vdl-600)" fontSize="5"
            className={inView ? 'vp3-fade' : 'vp3-hidden'}
            style={{ '--delay': `${baseDelay}ms` }}
          >
            UI Card Widget
          </text>
          {layers.map((l, i) => (
            <g
              key={`leg-${i}`} data-layer={i}
              className={inView ? 'vp3-fade' : 'vp3-hidden'}
              style={{ '--delay': `${baseDelay + i * LAYER_STAGGER + 300}ms` }}
            >
              <text x="10" y={l.legendTitleY} fill={l.nlColor} fontSize="4.5">
                {`${i + 1}. ${l.label.toUpperCase()}`}
              </text>
              {l.legend.map((item, j) => (
                <text key={`li-${j}`} x="17" y={l.legendTitleY + LEGEND_ITEM_OFFSET + j * LEGEND_ITEM_GAP} fill="var(--vdl-700)">
                  {`· ${item}`}
                </text>
              ))}
            </g>
          ))}
        </g>

        {/* Assembly Axis */}
        <path
          data-part="axis"
          d={`M${r(axisTop.x)} ${r(axisTop.y - 14)} L${r(axisBot.x)} ${r(axisBot.y + 8)}`}
          stroke="var(--vdl-800)" strokeWidth="0.5" strokeDasharray="3 4" strokeLinecap="round"
          className={inView ? 'vp3-fade' : 'vp3-hidden'}
          style={{ '--delay': `${baseDelay}ms` }}
        />
      </g>

      {/* ── Geometry ── */}
      <g data-role="geometry">
        {layers.map((l, i) => {
          const drawDelay = baseDelay + i * LAYER_STAGGER + 200;
          const contentDelay = drawDelay + 300;

          return (
            <g key={`geo-${i}`} data-layer={i}>
              {/* Prism shell (with shadow) */}
              <g data-part="prism" filter="url(#vp3s)">
                <path
                  d={l.p.outline} fill="var(--vdl-950)" stroke={l.stroke}
                  strokeWidth="0.5" strokeLinejoin="round"
                  className={inView ? 'vp3-draw' : 'vp3-outline-hidden'}
                  style={{ '--len': l.pathLen, '--delay': `${drawDelay}ms` }}
                />
              </g>

              {/* Phase 2: vLine + top-face content fade in */}
              <g
                className={inView ? 'vp3-fade' : 'vp3-hidden'}
                style={{ '--delay': `${contentDelay}ms` }}
              >
                <path d={l.p.vLine} stroke="var(--vdl-800)" strokeWidth="0.5" strokeLinecap="round" />
                <g data-part="content" transform={tf(l.p)}>

                  {/* ═══ Container Layer ═══ */}
                  {l.content === 'container' && (
                    <g>
                      <rect x="3" y="3" width={hd - 6} height={hd - 6} rx="3" stroke="var(--vdl-700)" fill="none" strokeWidth="0.5" strokeDasharray="2 2" />
                      <path d="M6 3 Q3 3 3 6" stroke="var(--vdl-200)" fill="none" strokeWidth="0.6" />
                      <path d={`M${hd - 6} ${hd - 3} Q${hd - 3} ${hd - 3} ${hd - 3} ${hd - 6}`} stroke="var(--vdl-200)" fill="none" strokeWidth="0.6" />
                      {[14, 28, 42].flatMap((gx) =>
                        [14, 28, 42].map((gy) => (
                          <circle key={`g${gx}${gy}`} cx={gx} cy={gy} r="1" fill="var(--vdl-700)" />
                        ))
                      )}
                      <line x1="28" y1="6" x2="28" y2={hd - 6} stroke="var(--vdl-800)" strokeWidth="0.3" strokeDasharray="1.5 2" />
                      <line x1="6" y1="28" x2={hd - 6} y2="28" stroke="var(--vdl-800)" strokeWidth="0.3" strokeDasharray="1.5 2" />
                      <text x="8" y={hd - 8} fontSize="4" fill="var(--vdl-800)" fontFamily="monospace">BASE GRID</text>
                    </g>
                  )}

                  {/* ═══ Header Section ═══ */}
                  {l.content === 'header' && (
                    <g>
                      <rect x="3" y="3" width={hd - 6} height={hd - 6} rx="2" stroke="var(--vdl-800)" fill="none" strokeWidth="0.3" />
                      <circle cx="12" cy="16" r="5.5" stroke="var(--vdl-200)" fill="none" strokeWidth="0.5" />
                      <circle cx="12" cy="16" r="2" fill="var(--vdl-200)" />
                      <text x="20" y="14" fontSize="7" fill="var(--vdl-200)" fontFamily="monospace" fontWeight="bold">CARD</text>
                      <text x="20" y="22" fontSize="7" fill="var(--vdl-200)" fontFamily="monospace" fontWeight="bold">TITLE</text>
                      <text x="20" y="30" fontSize="4" fill="var(--vdl-700)" fontFamily="monospace">subtitle text</text>
                      <rect x="6" y="34" width="16" height="5.5" rx="2.5" stroke="var(--vdl-200)" fill="none" strokeWidth="0.4" />
                      <text x="8" y="38.5" fontSize="3.2" fill="var(--vdl-200)" fontFamily="monospace">Active</text>
                      <text x="26" y="38.5" fontSize="3.2" fill="var(--vdl-700)" fontFamily="monospace">03/08</text>
                      <line x1="3" y1="44" x2={hd - 3} y2="44" stroke="var(--vdl-800)" strokeWidth="0.4" />
                    </g>
                  )}

                  {/* ═══ Content Area ═══ */}
                  {l.content === 'content' && (
                    <g>
                      <circle cx="7" cy="9" r="1.2" fill="var(--vdl-600)" />
                      <text x="11" y="11" fontSize="5" fill="var(--vdl-600)" fontFamily="monospace">#1 Redux</text>
                      <rect x="38" y="6" width="14" height="4.5" rx="2" stroke="var(--vdl-600)" fill="none" strokeWidth="0.4" />
                      <text x="40" y="9.5" fontSize="2.8" fill="var(--vdl-600)" fontFamily="monospace">In Prog</text>
                      <circle cx="7" cy="19" r="1.2" fill="var(--vdl-700)" />
                      <text x="11" y="21" fontSize="5" fill="var(--vdl-700)" fontFamily="monospace">#2 Auth</text>
                      <circle cx="42" cy="19" r="2.2" stroke="var(--vdl-700)" fill="none" strokeWidth="0.4" />
                      <circle cx="42" cy="19" r="0.8" fill="var(--vdl-700)" />
                      <circle cx="7" cy="29" r="1.2" fill="var(--vdl-700)" />
                      <text x="11" y="31" fontSize="5" fill="var(--vdl-700)" fontFamily="monospace">#3 Theme</text>
                      <rect x="4" y="36" width={hd - 8} height="16" rx="1.5" stroke="var(--vdl-700)" fill="none" strokeWidth="0.5" />
                      <line x1="4" y1="36" x2={hd - 4} y2="52" stroke="var(--vdl-800)" strokeWidth="0.3" />
                      <line x1={hd - 4} y1="36" x2="4" y2="52" stroke="var(--vdl-800)" strokeWidth="0.3" />
                      <text x="16" y="46" fontSize="3.5" fill="var(--vdl-800)" fontFamily="monospace">MEDIA</text>
                    </g>
                  )}

                  {/* ═══ Action Layer ═══ */}
                  {l.content === 'actions' && (
                    <g>
                      <rect x="4" y="16" width="22" height="10" rx="2" stroke="var(--vdl-600)" fill="none" strokeWidth="0.5" />
                      <text x="7" y="23" fontSize="4.5" fill="var(--vdl-600)" fontFamily="monospace">Submit</text>
                      <rect x="30" y="16" width="22" height="10" rx="2" stroke="var(--vdl-700)" fill="none" strokeWidth="0.5" strokeDasharray="2 1" />
                      <text x="34" y="23" fontSize="4.5" fill="var(--vdl-700)" fontFamily="monospace">Cancel</text>
                      <rect x="4" y="34" width="6" height="6" rx="1" stroke="var(--vdl-800)" fill="none" strokeWidth="0.4" />
                      <line x1="5.5" y1="36" x2="8.5" y2="36" stroke="var(--vdl-800)" strokeWidth="0.3" />
                      <line x1="5.5" y1="38" x2="7.5" y2="38" stroke="var(--vdl-800)" strokeWidth="0.3" />
                      <text x="13" y="39" fontSize="3.5" fill="var(--vdl-800)" fontFamily="monospace">filters</text>
                    </g>
                  )}
                </g>
              </g>
            </g>
          );
        })}
      </g>

      {/* ── Annotations ── */}
      <g data-role="annotations">
        {layers.map((l, i) => {
          const annotDelay = baseDelay + i * LAYER_STAGGER + 200 + DRAW_DUR;

          return (
            <g
              key={`ann-${i}`} data-layer={i}
              className={inView ? 'vp3-fade' : 'vp3-hidden'}
              style={{ '--delay': `${annotDelay}ms` }}
            >
              {i < layers.length - 1 && (
                <circle data-part="connector" cx={r(l.p.top.x)} cy={r(l.p.top.y - 5)} r="1.5" fill="var(--vdl-700)" />
              )}

              <g data-part="naming-line">
                <circle cx={l.nl.dot.cx} cy={l.nl.dot.cy} r="1.5" fill={l.nlColor} />
                <path d={l.nl.line} stroke={l.nlColor} strokeWidth="0.5" />
                <text x={l.nl.labelAnchor.x} y={l.nl.labelAnchor.y - 4} fill={l.nlColor} fontSize="5.5" fontFamily="monospace" dominantBaseline="middle">
                  {l.label}
                </text>
                <text x={l.nl.labelAnchor.x} y={l.nl.labelAnchor.y + 4} fill="var(--vdl-800)" fontSize="4" fontFamily="monospace" dominantBaseline="middle">
                  {l.cssProp}
                </text>
              </g>

              <text
                data-part="label"
                x={r(l.p.cx - l.p.hd - 6)}
                y={r(l.p.topCenter.y)}
                fill="var(--vdl-800)"
                fontSize="5"
                fontFamily="monospace"
                dominantBaseline="middle"
                textAnchor="end"
              >
                {`L${i + 1}`}
              </text>
            </g>
          );
        })}

        {/* Bottom Annotations */}
        <g
          data-part="bottom-annotations"
          className={inView ? 'vp3-fade' : 'vp3-hidden'}
          style={{ '--delay': `${globalEndDelay}ms` }}
        >
          <line x1={r(bot.cx - 18)} y1={r(bot.bottom.y)} x2={r(bot.cx - 18)} y2={r(botY + 8)} stroke="var(--vdl-800)" strokeWidth="0.3" strokeDasharray="2 2" />
          <line x1={r(bot.cx + 18)} y1={r(bot.bottom.y)} x2={r(bot.cx + 18)} y2={r(botY + 18)} stroke="var(--vdl-800)" strokeWidth="0.3" strokeDasharray="2 2" />

          <text x={r(bot.cx - 14)} y={r(botY + 5)} fill="var(--vdl-700)" fontSize="4.5" fontFamily="monospace">Background</text>
          <text x={r(bot.cx - 14)} y={r(botY + 12)} fill="var(--vdl-800)" fontSize="3.5" fontFamily="monospace">· fill: var(--950)</text>

          <text x={r(bot.cx + 22)} y={r(botY + 15)} fill="var(--vdl-700)" fontSize="4.5" fontFamily="monospace">Typography</text>
          <text x={r(bot.cx + 22)} y={r(botY + 22)} fill="var(--vdl-800)" fontSize="3.5" fontFamily="monospace">· font: Inter, 16px</text>
        </g>

        {/* Mini Toolbar (bottom-left decorative) */}
        <g
          data-part="decorative" transform="translate(10, 374)"
          className={inView ? 'vp3-fade' : 'vp3-hidden'}
          style={{ '--delay': `${globalEndDelay}ms` }}
        >
          <rect x="0" y="0" width="28" height="12" rx="2" stroke="var(--vdl-800)" fill="none" strokeWidth="0.4" />
          <text x="4" y="8.5" fontSize="5" fill="var(--vdl-800)" fontFamily="monospace">&lt;/&gt;</text>
          <line x1="18" y1="2" x2="18" y2="10" stroke="var(--vdl-800)" strokeWidth="0.3" />
          <circle cx="23" cy="6" r="1.5" stroke="var(--vdl-800)" fill="none" strokeWidth="0.3" />
        </g>
      </g>
    </svg>
  );
});

DesignAsBuildIso.displayName = 'DesignAsBuildIso';

export { DesignAsBuildIso };

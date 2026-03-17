'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import {
  prism, tfp, tfLine, tfRect, namingLine, r,
} from './isometricGrid';

/**
 * VP1 — System Over Drawing (Isometric)
 *
 * "기준을 먼저 설계하는 과정"
 * 익스플로디드 레이어 스택: 5개 디자인 레이어가 분해되어 쌓이는 과정.
 * 하단(Grid, Token) = hero, 상단(Result) = subtle.
 * 레퍼런스: "Aesthetics Guidelines" 이미지 스타일.
 *
 * @param {object} props - SVG props passthrough [Optional]
 */

const W = 400;
const H = 400;
const O = { x: 172, y: 348 };

// ── Animation timing (ms) ───────────────────────────────
const DRAW_DUR = 400;
const LAYER_STAGGER = 500;

const LAYERS = [
  { iz: 0,  h: 1.2, w: 7, label: '8px Grid',       stroke: 'var(--vdl-200)', content: 'grid',       nlLength: 48 },
  { iz: 7,  h: 1.2, w: 7, label: 'Design Tokens',   stroke: 'var(--vdl-200)', content: 'tokens',     nlLength: 48 },
  { iz: 14, h: 1.2, w: 7, label: 'Rules',            stroke: 'var(--vdl-600)', content: 'rules',      nlLength: 48 },
  { iz: 21, h: 1.2, w: 7, label: 'Components',       stroke: 'var(--vdl-600)', content: 'components', nlLength: 48 },
  { iz: 28, h: 1,   w: 6, label: 'Result',           stroke: 'var(--vdl-700)', content: 'result',     nlLength: 36 },
];

const SystemOverDrawingIso = forwardRef(({ delay: baseDelay = 0, ...props }, ref) => {
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

  const layers = LAYERS.map((l) => {
    const p = prism(0, 0, l.iz, l.w, l.h, O);
    const nl = namingLine(p.rightMid.x + 4, p.rightMid.y, l.nlLength);
    const nlColor = l.stroke === 'var(--vdl-200)' ? 'var(--vdl-200)' : 'var(--vdl-700)';
    const pathLen = Math.ceil(4.5 * p.hd + 2 * p.bh);
    return { ...l, p, nl, nlColor, pathLen };
  });

  const axisTop = layers[layers.length - 1].p.top;
  const axisBot = layers[0].p.baseCenter;

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
        @keyframes vp1-draw {
          to { stroke-dashoffset: 0; fill-opacity: 1; }
        }
        @keyframes vp1-fade {
          to { opacity: 1; }
        }
        .vp1-outline-hidden {
          stroke-dasharray: var(--len);
          stroke-dashoffset: var(--len);
          fill-opacity: 0;
        }
        .vp1-draw {
          stroke-dasharray: var(--len);
          stroke-dashoffset: var(--len);
          fill-opacity: 0;
          animation: vp1-draw ${DRAW_DUR}ms ease-out var(--delay) forwards;
        }
        .vp1-hidden { opacity: 0.01; }
        .vp1-fade {
          opacity: 0.01;
          animation: vp1-fade 300ms ease-out var(--delay) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .vp1-draw { fill-opacity: 1; stroke-dashoffset: 0; animation: none; }
          .vp1-fade { opacity: 1; animation: none; }
        }
      `}</style>
      <defs>
        <filter id="vp1s" x="-32" y="-32" width={W + 64} height={H + 64} colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset />
          <feGaussianBlur stdDeviation="8" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0.031 0 0 0 0 0.035 0 0 0 0 0.039 0 0 0 1 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>

      {/* ── Global ── */}
      <g data-role="global">
        <path
          data-part="axis"
          d={`M${r(axisTop.x)} ${r(axisTop.y - 12)} L${r(axisBot.x)} ${r(axisBot.y + 8)}`}
          stroke="var(--vdl-800)" strokeWidth="0.5" strokeDasharray="3 4" strokeLinecap="round"
          className={inView ? 'vp1-fade' : 'vp1-hidden'}
          style={{ '--delay': `${baseDelay}ms` }}
        />
      </g>

      {/* ── Geometry (back to front) ── */}
      <g data-role="geometry">
        {layers.map((l, i) => {
          const drawDelay = baseDelay + i * LAYER_STAGGER;
          const contentDelay = drawDelay + 300;
          const tokenHl = l.content === 'tokens' ? tfp(l.p, 0.5, 0.4) : null;
          const ruleArrowA = l.content === 'rules' ? tfp(l.p, 0.9, 0.3) : null;
          const ruleArrowB = l.content === 'rules' ? tfp(l.p, 0.85, 0.25) : null;

          return (
            <g key={`geo-${i}`} data-layer={i} filter="url(#vp1s)">
              {/* Phase 1: outline draws */}
              <path
                d={l.p.outline} fill="var(--vdl-950)" stroke={l.stroke}
                strokeWidth="0.5" strokeLinejoin="round"
                className={inView ? 'vp1-draw' : 'vp1-outline-hidden'}
                style={{ '--len': l.pathLen, '--delay': `${drawDelay}ms` }}
              />
              {/* Phase 2: vLine + content fade in */}
              <g
                className={inView ? 'vp1-fade' : 'vp1-hidden'}
                style={{ '--delay': `${contentDelay}ms` }}
              >
                <path d={l.p.vLine} stroke="var(--vdl-800)" strokeWidth="0.5" strokeLinecap="round" />

                {l.content === 'grid' && (
                  <g data-part="content" stroke="var(--vdl-700)" strokeWidth="0.3" opacity="0.7">
                    {[0.2, 0.4, 0.6, 0.8].map((u) => (
                      <path key={`gu${u}`} d={tfLine(l.p, u, 0.1, u, 0.9)} />
                    ))}
                    {[0.2, 0.4, 0.6, 0.8].map((v) => (
                      <path key={`gv${v}`} d={tfLine(l.p, 0.1, v, 0.9, v)} />
                    ))}
                  </g>
                )}

                {l.content === 'tokens' && (
                  <g data-part="content">
                    {[
                      [0.25, 0.25], [0.45, 0.20], [0.65, 0.30], [0.35, 0.55],
                      [0.55, 0.50], [0.75, 0.45], [0.25, 0.70], [0.60, 0.72],
                    ].map(([u, v], j) => {
                      const pt = tfp(l.p, u, v);
                      return <circle key={`tk${j}`} cx={pt.x} cy={pt.y} r="2" fill="none" stroke="var(--vdl-700)" strokeWidth="0.5" />;
                    })}
                    <circle cx={tokenHl.x} cy={tokenHl.y} r="2.5" fill="var(--vdl-200)" opacity="0.5" />
                  </g>
                )}

                {l.content === 'rules' && (
                  <g data-part="content" stroke="var(--vdl-600)" strokeWidth="0.5" strokeLinecap="round">
                    <path d={tfLine(l.p, 0.1, 0.3, 0.9, 0.3)} />
                    <path d={tfLine(l.p, 0.1, 0.6, 0.9, 0.6)} />
                    <path d={`M${ruleArrowA.x} ${ruleArrowA.y} L${ruleArrowB.x} ${ruleArrowB.y}`} />
                  </g>
                )}

                {l.content === 'components' && (
                  <g data-part="content" stroke="var(--vdl-600)" strokeWidth="0.5" fill="none">
                    <path d={tfRect(l.p, 0.12, 0.12, 0.55, 0.50)} />
                    <path d={tfRect(l.p, 0.15, 0.55, 0.48, 0.88)} />
                    <path d={tfLine(l.p, 0.18, 0.18, 0.50, 0.18)} stroke="var(--vdl-700)" strokeWidth="0.3" />
                    <path d={tfLine(l.p, 0.25, 0.18, 0.45, 0.18)} stroke="var(--vdl-800)" strokeWidth="0.3" />
                    <path d={tfLine(l.p, 0.20, 0.62, 0.44, 0.62)} stroke="var(--vdl-700)" strokeWidth="0.3" />
                  </g>
                )}

                {l.content === 'result' && (
                  <g data-part="content" stroke="var(--vdl-800)" strokeWidth="0.3" fill="none" opacity="0.5">
                    <path d={tfRect(l.p, 0.1, 0.1, 0.9, 0.9)} />
                    <path d={tfLine(l.p, 0.1, 0.35, 0.9, 0.35)} />
                    <path d={tfLine(l.p, 0.15, 0.15, 0.55, 0.15)} />
                    <path d={tfLine(l.p, 0.15, 0.45, 0.70, 0.45)} />
                    <path d={tfLine(l.p, 0.15, 0.55, 0.50, 0.55)} />
                    <path d={tfRect(l.p, 0.15, 0.70, 0.40, 0.85)} />
                  </g>
                )}
              </g>
            </g>
          );
        })}
      </g>

      {/* ── Annotations (back to front) ── */}
      <g data-role="annotations">
        {layers.map((l, i) => {
          const annotDelay = baseDelay + i * LAYER_STAGGER + 400;

          return (
            <g
              key={`ann-${i}`} data-layer={i}
              className={inView ? 'vp1-fade' : 'vp1-hidden'}
              style={{ '--delay': `${annotDelay}ms` }}
            >
              {i < layers.length - 1 && (
                <circle data-part="connector" cx={r(l.p.top.x)} cy={r(l.p.top.y - 4)} r="1.5" fill="var(--vdl-700)" />
              )}

              <g data-part="naming-line">
                <circle cx={l.nl.dot.cx} cy={l.nl.dot.cy} r="1.5" fill={l.nlColor} />
                <path d={l.nl.line} stroke={l.nlColor} strokeWidth="0.5" />
                <text
                  x={l.nl.labelAnchor.x}
                  y={l.nl.labelAnchor.y}
                  fill={l.nlColor}
                  fontSize="6.5"
                  fontFamily="monospace"
                  dominantBaseline="middle"
                >
                  {l.label}
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
      </g>
    </svg>
  );
});

SystemOverDrawingIso.displayName = 'SystemOverDrawingIso';

export { SystemOverDrawingIso };

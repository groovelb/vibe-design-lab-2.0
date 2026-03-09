'use client';

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

const LAYERS = [
  { iz: 0,  h: 1.2, w: 7, label: 'Container Layer', cssProp: 'width: 320px',  stroke: 'var(--vdl-200)', content: 'container' },
  { iz: 10, h: 1.2, w: 7, label: 'Header Section',  cssProp: 'display: flex',  stroke: 'var(--vdl-200)', content: 'header' },
  { iz: 20, h: 1.2, w: 7, label: 'Content Area',     cssProp: 'padding: 16px',  stroke: 'var(--vdl-600)', content: 'content' },
  { iz: 30, h: 1.2, w: 7, label: 'Action Layer',     cssProp: 'gap: 8px',       stroke: 'var(--vdl-600)', content: 'actions' },
];

export const DesignAsBuildIso = (props) => {
  const layers = LAYERS.map((l) => ({
    ...l,
    p: prism(0, 0, l.iz, l.w, l.h, O),
  }));

  const hd = layers[0].p.hd; // 56

  // Assembly axis
  const axisTop = layers[layers.length - 1].p.top;
  const axisBot = layers[0].p.baseCenter;

  // Right-side naming lines
  const nls = layers.map((l) => {
    const edge = { x: l.p.cx + l.p.hd, y: l.p.topY + l.p.hd / 2 + l.p.bh / 2 };
    return { ...l, nl: namingLine(edge.x + 4, edge.y, 32) };
  });

  /** Matrix transform: maps flat (hd x hd) square onto isometric top face */
  const tf = (p) => `matrix(1, 0.5, -1, 0.5, ${r(p.cx)}, ${r(p.topY)})`;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={W} height={H} fill="none" viewBox={`0 0 ${W} ${H}`} {...props}>
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

      {/* ── Title ── */}
      <text x="10" y="16" fill="var(--vdl-600)" fontSize="7.5" fontFamily="monospace" fontWeight="bold" letterSpacing="0.8">
        CARD COMPONENT
      </text>
      <text x="10" y="26" fill="var(--vdl-600)" fontSize="7.5" fontFamily="monospace" fontWeight="bold" letterSpacing="0.8">
        ANATOMY
      </text>

      {/* ── Left Legend ── */}
      <g fontSize="4.5" fontFamily="monospace">
        <text x="10" y="42" fill="var(--vdl-600)" fontSize="5">UI Card Widget</text>

        <text x="10" y="56" fill="var(--vdl-200)" fontSize="4.5">1. CONTAINER LAYER</text>
        <text x="17" y="64" fill="var(--vdl-700)">· Base Grid</text>
        <text x="17" y="71" fill="var(--vdl-700)">· border: dark-bg</text>
        <text x="17" y="78" fill="var(--vdl-700)">· border-radius: 8px</text>

        <text x="10" y="92" fill="var(--vdl-200)" fontSize="4.5">2. HEADER SECTION</text>
        <text x="17" y="100" fill="var(--vdl-700)">· Title</text>
        <text x="17" y="107" fill="var(--vdl-700)">· Icon: avatar</text>
        <text x="17" y="114" fill="var(--vdl-700)">· divider-line</text>

        <text x="10" y="128" fill="var(--vdl-700)" fontSize="4.5">3. CONTENT AREA</text>
        <text x="17" y="136" fill="var(--vdl-700)">· List of Items</text>
        <text x="17" y="143" fill="var(--vdl-700)">· Header items</text>
        <text x="17" y="150" fill="var(--vdl-700)">· Media area</text>

        <text x="10" y="164" fill="var(--vdl-700)" fontSize="4.5">4. ACTION LAYER</text>
        <text x="17" y="172" fill="var(--vdl-700)">· Buttons</text>
        <text x="17" y="179" fill="var(--vdl-700)">· Filters or Settings</text>
      </g>

      {/* ── Assembly Axis ── */}
      <path
        d={`M${r(axisTop.x)} ${r(axisTop.y - 14)} L${r(axisBot.x)} ${r(axisBot.y + 8)}`}
        stroke="var(--vdl-800)" strokeWidth="0.5" strokeDasharray="3 4" strokeLinecap="round"
      />

      {/* ── Layers ── */}
      {layers.map((l, i) => (
        <g key={`layer${i}`}>
          {/* Prism shell (with shadow) */}
          <g filter="url(#vp3s)">
            <path d={l.p.outline} fill="var(--vdl-950)" stroke={l.stroke} strokeWidth="0.5" strokeLinejoin="round" />
            <path d={l.p.vLine} stroke="var(--vdl-800)" strokeWidth="0.5" strokeLinecap="round" />
          </g>

          {/* Top-face content (matrix-projected flat layout → isometric) */}
          <g transform={tf(l.p)}>

            {/* ═══ Container Layer ═══ */}
            {l.content === 'container' && (
              <g>
                {/* Outer border with rounded corners */}
                <rect x="3" y="3" width={hd - 6} height={hd - 6} rx="3" stroke="var(--vdl-700)" fill="none" strokeWidth="0.5" strokeDasharray="2 2" />
                {/* Corner radius arcs (hero highlight) */}
                <path d="M6 3 Q3 3 3 6" stroke="var(--vdl-200)" fill="none" strokeWidth="0.6" />
                <path d={`M${hd - 6} ${hd - 3} Q${hd - 3} ${hd - 3} ${hd - 3} ${hd - 6}`} stroke="var(--vdl-200)" fill="none" strokeWidth="0.6" />
                {/* 3x3 grid dots */}
                {[14, 28, 42].flatMap((gx) =>
                  [14, 28, 42].map((gy) => (
                    <circle key={`g${gx}${gy}`} cx={gx} cy={gy} r="1" fill="var(--vdl-700)" />
                  ))
                )}
                {/* Grid cross lines (faint) */}
                <line x1="28" y1="6" x2="28" y2={hd - 6} stroke="var(--vdl-800)" strokeWidth="0.3" strokeDasharray="1.5 2" />
                <line x1="6" y1="28" x2={hd - 6} y2="28" stroke="var(--vdl-800)" strokeWidth="0.3" strokeDasharray="1.5 2" />
                {/* Label */}
                <text x="8" y={hd - 8} fontSize="4" fill="var(--vdl-800)" fontFamily="monospace">BASE GRID</text>
              </g>
            )}

            {/* ═══ Header Section ═══ */}
            {l.content === 'header' && (
              <g>
                {/* Background panel */}
                <rect x="3" y="3" width={hd - 6} height={hd - 6} rx="2" stroke="var(--vdl-800)" fill="none" strokeWidth="0.3" />
                {/* Avatar circle */}
                <circle cx="12" cy="16" r="5.5" stroke="var(--vdl-200)" fill="none" strokeWidth="0.5" />
                <circle cx="12" cy="16" r="2" fill="var(--vdl-200)" />
                {/* Title (large, hero) */}
                <text x="20" y="14" fontSize="7" fill="var(--vdl-200)" fontFamily="monospace" fontWeight="bold">CARD</text>
                <text x="20" y="22" fontSize="7" fill="var(--vdl-200)" fontFamily="monospace" fontWeight="bold">TITLE</text>
                {/* Subtitle */}
                <text x="20" y="30" fontSize="4" fill="var(--vdl-700)" fontFamily="monospace">subtitle text</text>
                {/* Status badge */}
                <rect x="6" y="34" width="16" height="5.5" rx="2.5" stroke="var(--vdl-200)" fill="none" strokeWidth="0.4" />
                <text x="8" y="38.5" fontSize="3.2" fill="var(--vdl-200)" fontFamily="monospace">Active</text>
                {/* Date */}
                <text x="26" y="38.5" fontSize="3.2" fill="var(--vdl-700)" fontFamily="monospace">03/08</text>
                {/* Divider */}
                <line x1="3" y1="44" x2={hd - 3} y2="44" stroke="var(--vdl-800)" strokeWidth="0.4" />
              </g>
            )}

            {/* ═══ Content Area ═══ */}
            {l.content === 'content' && (
              <g>
                {/* Item 1 */}
                <circle cx="7" cy="9" r="1.2" fill="var(--vdl-600)" />
                <text x="11" y="11" fontSize="5" fill="var(--vdl-600)" fontFamily="monospace">#1 Redux</text>
                <rect x="38" y="6" width="14" height="4.5" rx="2" stroke="var(--vdl-600)" fill="none" strokeWidth="0.4" />
                <text x="40" y="9.5" fontSize="2.8" fill="var(--vdl-600)" fontFamily="monospace">In Prog</text>

                {/* Item 2 */}
                <circle cx="7" cy="19" r="1.2" fill="var(--vdl-700)" />
                <text x="11" y="21" fontSize="5" fill="var(--vdl-700)" fontFamily="monospace">#2 Auth</text>
                <circle cx="42" cy="19" r="2.2" stroke="var(--vdl-700)" fill="none" strokeWidth="0.4" />
                <circle cx="42" cy="19" r="0.8" fill="var(--vdl-700)" />

                {/* Item 3 */}
                <circle cx="7" cy="29" r="1.2" fill="var(--vdl-700)" />
                <text x="11" y="31" fontSize="5" fill="var(--vdl-700)" fontFamily="monospace">#3 Theme</text>

                {/* Media placeholder */}
                <rect x="4" y="36" width={hd - 8} height="16" rx="1.5" stroke="var(--vdl-700)" fill="none" strokeWidth="0.5" />
                <line x1="4" y1="36" x2={hd - 4} y2="52" stroke="var(--vdl-800)" strokeWidth="0.3" />
                <line x1={hd - 4} y1="36" x2="4" y2="52" stroke="var(--vdl-800)" strokeWidth="0.3" />
                <text x="16" y="46" fontSize="3.5" fill="var(--vdl-800)" fontFamily="monospace">MEDIA</text>
              </g>
            )}

            {/* ═══ Action Layer ═══ */}
            {l.content === 'actions' && (
              <g>
                {/* Primary button */}
                <rect x="4" y="16" width="22" height="10" rx="2" stroke="var(--vdl-600)" fill="none" strokeWidth="0.5" />
                <text x="7" y="23" fontSize="4.5" fill="var(--vdl-600)" fontFamily="monospace">Submit</text>
                {/* Ghost button */}
                <rect x="30" y="16" width="22" height="10" rx="2" stroke="var(--vdl-700)" fill="none" strokeWidth="0.5" strokeDasharray="2 1" />
                <text x="34" y="23" fontSize="4.5" fill="var(--vdl-700)" fontFamily="monospace">Cancel</text>
                {/* Filter icon hint */}
                <rect x="4" y="34" width="6" height="6" rx="1" stroke="var(--vdl-800)" fill="none" strokeWidth="0.4" />
                <line x1="5.5" y1="36" x2="8.5" y2="36" stroke="var(--vdl-800)" strokeWidth="0.3" />
                <line x1="5.5" y1="38" x2="7.5" y2="38" stroke="var(--vdl-800)" strokeWidth="0.3" />
                <text x="13" y="39" fontSize="3.5" fill="var(--vdl-800)" fontFamily="monospace">filters</text>
              </g>
            )}
          </g>
        </g>
      ))}

      {/* ── Connection nodes ── */}
      {layers.slice(0, -1).map((l, i) => {
        const pt = l.p.top;
        return <circle key={`cn${i}`} cx={r(pt.x)} cy={r(pt.y - 5)} r="1.5" fill="var(--vdl-700)" />;
      })}

      {/* ── Naming Lines (right side) ── */}
      {nls.map((item, i) => {
        const isHero = item.stroke === 'var(--vdl-200)';
        const c = isHero ? 'var(--vdl-200)' : 'var(--vdl-700)';
        return (
          <g key={`nl${i}`}>
            <circle cx={item.nl.dot.cx} cy={item.nl.dot.cy} r="1.5" fill={c} />
            <path d={item.nl.line} stroke={c} strokeWidth="0.5" />
            <text x={item.nl.labelAnchor.x} y={item.nl.labelAnchor.y - 4} fill={c} fontSize="5.5" fontFamily="monospace" dominantBaseline="middle">
              {item.label}
            </text>
            <text x={item.nl.labelAnchor.x} y={item.nl.labelAnchor.y + 4} fill="var(--vdl-800)" fontSize="4" fontFamily="monospace" dominantBaseline="middle">
              {item.cssProp}
            </text>
          </g>
        );
      })}

      {/* ── Layer numbers ── */}
      {layers.map((l, i) => {
        const lp = { x: l.p.cx - l.p.hd - 6, y: l.p.topCenter.y };
        return (
          <text key={`num${i}`} x={r(lp.x)} y={r(lp.y)} fill="var(--vdl-800)" fontSize="5" fontFamily="monospace" dominantBaseline="middle" textAnchor="end">
            {`L${i + 1}`}
          </text>
        );
      })}

      {/* ── Bottom Annotations ── */}
      {(() => {
        const bot = layers[0].p;
        const by = bot.bottom.y + 6;
        return (
          <g>
            <line x1={r(bot.cx - 18)} y1={r(bot.bottom.y)} x2={r(bot.cx - 18)} y2={r(by + 8)} stroke="var(--vdl-800)" strokeWidth="0.3" strokeDasharray="2 2" />
            <line x1={r(bot.cx + 18)} y1={r(bot.bottom.y)} x2={r(bot.cx + 18)} y2={r(by + 18)} stroke="var(--vdl-800)" strokeWidth="0.3" strokeDasharray="2 2" />

            <text x={r(bot.cx - 14)} y={r(by + 5)} fill="var(--vdl-700)" fontSize="4.5" fontFamily="monospace">Background</text>
            <text x={r(bot.cx - 14)} y={r(by + 12)} fill="var(--vdl-800)" fontSize="3.5" fontFamily="monospace">· fill: var(--950)</text>

            <text x={r(bot.cx + 22)} y={r(by + 15)} fill="var(--vdl-700)" fontSize="4.5" fontFamily="monospace">Typography</text>
            <text x={r(bot.cx + 22)} y={r(by + 22)} fill="var(--vdl-800)" fontSize="3.5" fontFamily="monospace">· font: Inter, 16px</text>
          </g>
        );
      })()}

      {/* ── Mini Toolbar (bottom-left decorative) ── */}
      <g transform="translate(10, 374)">
        <rect x="0" y="0" width="28" height="12" rx="2" stroke="var(--vdl-800)" fill="none" strokeWidth="0.4" />
        <text x="4" y="8.5" fontSize="5" fill="var(--vdl-800)" fontFamily="monospace">&lt;/&gt;</text>
        <line x1="18" y1="2" x2="18" y2="10" stroke="var(--vdl-800)" strokeWidth="0.3" />
        <circle cx="23" cy="6" r="1.5" stroke="var(--vdl-800)" fill="none" strokeWidth="0.3" />
      </g>
    </svg>
  );
};

'use client';

import {
  prism, rfp, rfLine, rfRect, namingLine, r,
} from './isometricGrid';

/**
 * VP2 — The Vibe Standard (Isometric)
 *
 * "감각을 언어로 번역한 체계"
 * 토큰 레지스트리 모듈: 5개 슬롯이 동일 포맷으로 정렬된 표준 체계.
 * 레퍼런스: "Design Thinking" 모듈 스타일 — 내부 슬롯 + 인덱스.
 *
 * @param {object} props - SVG props passthrough [Optional]
 */

const W = 400;
const H = 400;
const O = { x: 118, y: 362 };

const SLOTS = [
  { label: 'Typography', icon: 'Aa', isHero: false },
  { label: 'Color',      icon: '◆',  isHero: false },
  { label: 'Spacing',    icon: '⊞',  isHero: true },
  { label: 'Motion',     icon: '→',  isHero: false },
  { label: 'Layout',     icon: '▦',  isHero: false },
];

const SLOT_T_START = 0.06;
const SLOT_T_HEIGHT = 0.14;
const SLOT_GAP = 0.04;
const PAD = 0.06;
const PAD_R = 0.94;

export const VibeStandardIso = (props) => {
  const c = prism(0, 0, 0, 7, 24, O);
  const pt = (t, s) => rfp(c, t, s);
  const hl = (t, s1, s2) => rfLine(c, t, s1, s2);
  const rect = (t1, s1, t2, s2) => rfRect(c, t1, s1, t2, s2);

  const slots = SLOTS.map((s, i) => {
    const tStart = SLOT_T_START + i * (SLOT_T_HEIGHT + SLOT_GAP);
    const tEnd = tStart + SLOT_T_HEIGHT;
    const tMid = (tStart + tEnd) / 2;
    const index = i + 1;
    const stroke = s.isHero ? 'var(--vdl-200)' : 'var(--vdl-800)';
    const contentStroke = s.isHero ? 'var(--vdl-700)' : 'var(--vdl-800)';
    const nlColor = s.isHero ? 'var(--vdl-200)' : 'var(--vdl-700)';

    // Pre-compute coordinates (IIFE 제거)
    const numPos = pt(tStart + 0.01, PAD + 0.02);
    const iconPos = pt(tMid, 0.17);
    const statusPos = pt(tMid, 0.88);
    const connOut = pt(tEnd, PAD_R);
    const connIn = pt(tStart, 0.5);

    // Naming line
    const edge = pt(tMid, 1);
    const nl = namingLine(edge.x + 4, edge.y, s.isHero ? 48 : 36);

    return {
      ...s, tStart, tEnd, tMid, index,
      stroke, contentStroke, nlColor,
      numPos, iconPos, statusPos, connOut, connIn, nl,
    };
  });

  // Container naming line
  const containerNLEdge = pt(0.01, 1);
  const containerNL = namingLine(containerNLEdge.x + 4, containerNLEdge.y, 56);

  // Bottom annotation
  const annotationPos = pt(0.97, 0.5);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={W} height={H} fill="none" viewBox={`0 0 ${W} ${H}`} {...props}>
      <defs>
        <filter id="vp2s" x="-32" y="-32" width={W + 64} height={H + 64} colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
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
        {/* 메인 컨테이너 Prism */}
        <g data-part="container" filter="url(#vp2s)">
          <path d={c.outline} fill="var(--vdl-950)" stroke="var(--vdl-700)" strokeWidth="0.5" strokeLinejoin="round" />
          <path d={c.vLine} stroke="var(--vdl-800)" strokeWidth="0.5" strokeLinecap="round" />
        </g>

      </g>

      {/* ── Geometry: Slots ── */}
      <g data-role="geometry">
        {slots.map((s) => (
          <g key={`geo-${s.index}`} data-layer={s.index - 1}>
            {/* 슬롯 콘텐츠 */}
            <g data-part="slot">
              {/* 슬롯 외곽 사각형 */}
              <path d={rect(s.tStart, PAD, s.tEnd, PAD_R)} stroke={s.stroke} strokeWidth="0.5" fill="none" />

              {/* 슬롯 번호 */}
              <text x={s.numPos.x} y={s.numPos.y} fill={s.contentStroke} fontSize="4" fontFamily="monospace" dominantBaseline="hanging">
                {`#${s.index}`}
              </text>

              {/* 아이콘 영역 */}
              <path d={rect(s.tStart + 0.02, PAD + 0.02, s.tEnd - 0.02, 0.28)} stroke={s.contentStroke} strokeWidth="0.3" fill="none" />
              <text x={s.iconPos.x} y={s.iconPos.y} fill={s.isHero ? 'var(--vdl-200)' : 'var(--vdl-700)'} fontSize="7" fontFamily="monospace" dominantBaseline="middle" textAnchor="middle">
                {s.icon}
              </text>

              {/* 토큰명 라인 */}
              <path d={hl(s.tMid - 0.02, 0.34, 0.75)} stroke={s.contentStroke} strokeWidth="0.5" strokeLinecap="round" />

              {/* 값 프리뷰 라인 */}
              <path d={hl(s.tMid + 0.03, 0.34, 0.58)} stroke={s.contentStroke} strokeWidth="0.3" strokeLinecap="round" />

              {/* 상태 인디케이터 */}
              <circle cx={s.statusPos.x} cy={s.statusPos.y} r={s.isHero ? 2 : 1.2} fill={s.isHero ? 'var(--vdl-200)' : 'var(--vdl-800)'} />
            </g>

            {/* 슬롯 간 구분선 */}
            {s.index < SLOTS.length && (
              <path
                data-part="divider"
                d={hl(s.tEnd + SLOT_GAP / 2, PAD + 0.04, PAD_R - 0.04)}
                stroke="var(--vdl-800)" strokeWidth="0.2" strokeDasharray="1 2"
              />
            )}
          </g>
        ))}
      </g>

      {/* ── Annotations ── */}
      <g data-role="annotations">
        {/* Slot Connectors (밑면 중앙 → 윗면 중앙) */}
        {slots.slice(0, -1).map((s, i) => {
          const next = slots[i + 1];
          return (
            <g key={`conn-${i}`} data-part="connector">
              <circle cx={r(s.connOut.x)} cy={r(s.connOut.y)} r="1.2" fill="var(--vdl-800)" />
              <path
                d={`M${r(s.connOut.x)} ${r(s.connOut.y)} L${r(next.connIn.x)} ${r(next.connIn.y)}`}
                stroke="var(--vdl-800)" strokeWidth="0.5" strokeLinecap="round"
              />
              <circle cx={r(next.connIn.x)} cy={r(next.connIn.y)} r="1.2" fill="var(--vdl-800)" />
            </g>
          );
        })}

        {/* Container Naming Line */}
        <g data-part="container-nl">
          <circle cx={containerNL.dot.cx} cy={containerNL.dot.cy} r="1.5" fill="var(--vdl-700)" />
          <path d={containerNL.line} stroke="var(--vdl-700)" strokeWidth="0.5" />
          <text x={containerNL.labelAnchor.x} y={containerNL.labelAnchor.y} fill="var(--vdl-700)" fontSize="6.5" fontFamily="monospace" dominantBaseline="middle">
            TokenRegistry
          </text>
        </g>

        {/* Slot Naming Lines */}
        {slots.map((s) => (
          <g key={`ann-${s.index}`} data-layer={s.index - 1} data-part="naming-line">
            <circle cx={s.nl.dot.cx} cy={s.nl.dot.cy} r="1.5" fill={s.nlColor} />
            <path d={s.nl.line} stroke={s.nlColor} strokeWidth="0.5" />
            <text
              x={s.nl.labelAnchor.x}
              y={s.nl.labelAnchor.y}
              fill={s.nlColor}
              fontSize={s.isHero ? 6.5 : 5.5}
              fontFamily="monospace"
              dominantBaseline="middle"
            >
              {s.label}
            </text>
          </g>
        ))}

        {/* "Standard" 주석 (하단) */}
        <text
          data-part="annotation"
          x={annotationPos.x}
          y={r(annotationPos.y + 12)}
          fill="var(--vdl-800)"
          fontSize="5"
          fontFamily="monospace"
          dominantBaseline="middle"
          textAnchor="middle"
        >
          identical format = standard
        </text>
      </g>
    </svg>
  );
};

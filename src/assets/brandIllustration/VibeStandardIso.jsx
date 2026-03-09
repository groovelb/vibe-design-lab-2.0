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

export const VibeStandardIso = (props) => {
  const c = prism(0, 0, 0, 7, 24, O);
  const pt = (t, s) => rfp(c, t, s);
  const hl = (t, s1, s2) => rfLine(c, t, s1, s2);
  const rect = (t1, s1, t2, s2) => rfRect(c, t1, s1, t2, s2);

  const slots = SLOTS.map((s, i) => {
    const tStart = SLOT_T_START + i * (SLOT_T_HEIGHT + SLOT_GAP);
    const tEnd = tStart + SLOT_T_HEIGHT;
    return { ...s, tStart, tEnd, index: i + 1 };
  });

  // 인덱스 바 (좌측 세로선)
  const idxTop = pt(SLOT_T_START, 0);
  const lastSlot = slots[slots.length - 1];
  const idxBot = pt(lastSlot.tEnd, 0);

  // Naming lines
  const nls = slots.map((s) => {
    const tMid = (s.tStart + s.tEnd) / 2;
    const edge = pt(tMid, 1);
    return {
      ...s,
      nl: namingLine(edge.x + 4, edge.y, s.isHero ? 48 : 36),
    };
  });

  // Container naming line
  const containerNL = namingLine(pt(0.01, 1).x + 4, pt(0.01, 1).y, 56);

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

      {/* ── 메인 컨테이너 Prism ── */}
      <g filter="url(#vp2s)">
        <path d={c.outline} fill="var(--vdl-950)" stroke="var(--vdl-700)" strokeWidth="0.5" strokeLinejoin="round" />
        <path d={c.vLine} stroke="var(--vdl-800)" strokeWidth="0.5" strokeLinecap="round" />
      </g>

      {/* ── 인덱스 바 (좌측 세로선) ── */}
      <path
        d={`M${r(idxTop.x - 3)} ${r(idxTop.y)} L${r(idxBot.x - 3)} ${r(idxBot.y)}`}
        stroke="var(--vdl-800)" strokeWidth="0.5" strokeLinecap="round"
      />
      {/* 인덱스 마커 */}
      {slots.map((s) => {
        const mid = pt((s.tStart + s.tEnd) / 2, 0);
        return <circle key={`im${s.index}`} cx={r(mid.x - 3)} cy={mid.y} r="1.2" fill={s.isHero ? 'var(--vdl-200)' : 'var(--vdl-800)'} />;
      })}

      {/* ── 슬롯 ── */}
      {slots.map((s) => {
        const stroke = s.isHero ? 'var(--vdl-200)' : 'var(--vdl-800)';
        const contentStroke = s.isHero ? 'var(--vdl-700)' : 'var(--vdl-800)';
        const tMid = (s.tStart + s.tEnd) / 2;
        const pad = 0.06;
        const padR = 0.94;

        return (
          <g key={`slot${s.index}`}>
            {/* 슬롯 외곽 사각형 */}
            <path d={rect(s.tStart, pad, s.tEnd, padR)} stroke={stroke} strokeWidth="0.5" fill="none" />

            {/* 슬롯 번호 */}
            {(() => {
              const np = pt(s.tStart + 0.01, pad + 0.02);
              return <text x={np.x} y={np.y} fill={contentStroke} fontSize="4" fontFamily="monospace" dominantBaseline="hanging">{`#${s.index}`}</text>;
            })()}

            {/* 아이콘 영역 (좌측 작은 사각형) */}
            <path d={rect(s.tStart + 0.02, pad + 0.02, s.tEnd - 0.02, 0.28)} stroke={contentStroke} strokeWidth="0.3" fill="none" />
            {/* 아이콘 텍스트 */}
            {(() => {
              const ip = pt(tMid, 0.17);
              return <text x={ip.x} y={ip.y} fill={s.isHero ? 'var(--vdl-200)' : 'var(--vdl-700)'} fontSize="7" fontFamily="monospace" dominantBaseline="middle" textAnchor="middle">{s.icon}</text>;
            })()}

            {/* 토큰명 라인 (중앙) */}
            <path d={hl(tMid - 0.02, 0.34, 0.75)} stroke={contentStroke} strokeWidth="0.5" strokeLinecap="round" />

            {/* 값 프리뷰 라인 (하단) */}
            <path d={hl(tMid + 0.03, 0.34, 0.58)} stroke={contentStroke} strokeWidth="0.3" strokeLinecap="round" />

            {/* 상태 인디케이터 */}
            {(() => {
              const dp = pt(tMid, 0.88);
              return <circle cx={dp.x} cy={dp.y} r={s.isHero ? 2 : 1.2} fill={s.isHero ? 'var(--vdl-200)' : 'var(--vdl-800)'} />;
            })()}

            {/* 슬롯 간 구분선 (마지막 제외) */}
            {s.index < SLOTS.length && (
              <path
                d={hl(s.tEnd + SLOT_GAP / 2, pad + 0.04, padR - 0.04)}
                stroke="var(--vdl-800)" strokeWidth="0.2" strokeDasharray="1 2"
              />
            )}
          </g>
        );
      })}

      {/* ── Container Naming Line ── */}
      <g>
        <circle cx={containerNL.dot.cx} cy={containerNL.dot.cy} r="1.5" fill="var(--vdl-700)" />
        <path d={containerNL.line} stroke="var(--vdl-700)" strokeWidth="0.5" />
        <text x={containerNL.labelAnchor.x} y={containerNL.labelAnchor.y} fill="var(--vdl-700)" fontSize="6.5" fontFamily="monospace" dominantBaseline="middle">
          TokenRegistry
        </text>
      </g>

      {/* ── Slot Naming Lines ── */}
      {nls.map((item) => (
        <g key={`nl${item.index}`}>
          <circle
            cx={item.nl.dot.cx} cy={item.nl.dot.cy} r="1.5"
            fill={item.isHero ? 'var(--vdl-200)' : 'var(--vdl-700)'}
          />
          <path d={item.nl.line} stroke={item.isHero ? 'var(--vdl-200)' : 'var(--vdl-700)'} strokeWidth="0.5" />
          <text
            x={item.nl.labelAnchor.x}
            y={item.nl.labelAnchor.y}
            fill={item.isHero ? 'var(--vdl-200)' : 'var(--vdl-700)'}
            fontSize={item.isHero ? 6.5 : 5.5}
            fontFamily="monospace"
            dominantBaseline="middle"
          >
            {item.label}
          </text>
        </g>
      ))}

      {/* ── "Standard" 주석 (하단) ── */}
      {(() => {
        const fp = pt(0.97, 0.5);
        return <text x={fp.x} y={r(fp.y + 12)} fill="var(--vdl-800)" fontSize="5" fontFamily="monospace" dominantBaseline="middle" textAnchor="middle">identical format = standard</text>;
      })()}
    </svg>
  );
};

'use client';

import {
  prism, tfp, tfLine, tfRect, rfLine, namingLine, r,
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

const LAYERS = [
  { iz: 0,  h: 1.2, w: 7, label: '8px Grid',       stroke: 'var(--vdl-200)', content: 'grid' },
  { iz: 7,  h: 1.2, w: 7, label: 'Design Tokens',   stroke: 'var(--vdl-200)', content: 'tokens' },
  { iz: 14, h: 1.2, w: 7, label: 'Rules',            stroke: 'var(--vdl-600)', content: 'rules' },
  { iz: 21, h: 1.2, w: 7, label: 'Components',       stroke: 'var(--vdl-600)', content: 'components' },
  { iz: 28, h: 1,   w: 6, label: 'Result',            stroke: 'var(--vdl-700)', content: 'result' },
];

export const SystemOverDrawingIso = (props) => {
  const layers = LAYERS.map((l) => ({
    ...l,
    p: prism(0, 0, l.iz, l.w, l.h, O),
  }));

  // 연결 축 (수직 대시선)
  const axisTop = layers[layers.length - 1].p.top;
  const axisBot = layers[0].p.baseCenter;

  // Naming lines
  const nls = layers.map((l) => {
    const edge = rfp_simple(l.p);
    return {
      ...l,
      nl: namingLine(edge.x + 4, edge.y, l.label === 'Result' ? 36 : 48),
    };
  });

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={W} height={H} fill="none" viewBox={`0 0 ${W} ${H}`} {...props}>
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

      {/* ── 조립 축 (대시선) ── */}
      <path
        d={`M${r(axisTop.x)} ${r(axisTop.y - 12)} L${r(axisBot.x)} ${r(axisBot.y + 8)}`}
        stroke="var(--vdl-800)" strokeWidth="0.5" strokeDasharray="3 4" strokeLinecap="round"
      />

      {/* ── 레이어 (back to front) ── */}
      {layers.map((l, i) => (
        <g key={`layer${i}`} filter="url(#vp1s)">
          {/* 프리즘 외곽 */}
          <path d={l.p.outline} fill="var(--vdl-950)" stroke={l.stroke} strokeWidth="0.5" strokeLinejoin="round" />
          <path d={l.p.vLine} stroke="var(--vdl-800)" strokeWidth="0.5" strokeLinecap="round" />

          {/* ── 상면 콘텐츠 ── */}
          {l.content === 'grid' && (
            <g stroke="var(--vdl-700)" strokeWidth="0.3" opacity="0.7">
              {/* 5×5 그리드 */}
              {[0.2, 0.4, 0.6, 0.8].map((u) => (
                <path key={`gu${u}`} d={tfLine(l.p, u, 0.1, u, 0.9)} />
              ))}
              {[0.2, 0.4, 0.6, 0.8].map((v) => (
                <path key={`gv${v}`} d={tfLine(l.p, 0.1, v, 0.9, v)} />
              ))}
            </g>
          )}

          {l.content === 'tokens' && (
            <g>
              {/* 색상 토큰 — 작은 원들 */}
              {[
                [0.25, 0.25], [0.45, 0.20], [0.65, 0.30], [0.35, 0.55],
                [0.55, 0.50], [0.75, 0.45], [0.25, 0.70], [0.60, 0.72],
              ].map(([u, v], j) => {
                const p = tfp(l.p, u, v);
                return <circle key={`tk${j}`} cx={p.x} cy={p.y} r="2" fill="none" stroke="var(--vdl-700)" strokeWidth="0.5" />;
              })}
              {/* 하이라이트 토큰 */}
              {(() => { const p = tfp(l.p, 0.5, 0.4); return <circle cx={p.x} cy={p.y} r="2.5" fill="var(--vdl-200)" opacity="0.5" />; })()}
            </g>
          )}

          {l.content === 'rules' && (
            <g stroke="var(--vdl-600)" strokeWidth="0.5" strokeLinecap="round">
              {/* 수평 규칙선 */}
              <path d={tfLine(l.p, 0.1, 0.3, 0.9, 0.3)} />
              <path d={tfLine(l.p, 0.1, 0.6, 0.9, 0.6)} />
              {/* 화살표 */}
              {(() => {
                const a = tfp(l.p, 0.9, 0.3); const b = tfp(l.p, 0.85, 0.25);
                return <path d={`M${a.x} ${a.y} L${b.x} ${b.y}`} />;
              })()}
            </g>
          )}

          {l.content === 'components' && (
            <g stroke="var(--vdl-600)" strokeWidth="0.5" fill="none">
              {/* 2개의 UI 컴포넌트 사각형 */}
              <path d={tfRect(l.p, 0.12, 0.12, 0.55, 0.50)} />
              <path d={tfRect(l.p, 0.15, 0.55, 0.48, 0.88)} />
              {/* 내부 텍스트 힌트 */}
              <path d={tfLine(l.p, 0.18, 0.18, 0.50, 0.18)} stroke="var(--vdl-700)" strokeWidth="0.3" />
              <path d={tfLine(l.p, 0.25, 0.18, 0.45, 0.18)} stroke="var(--vdl-800)" strokeWidth="0.3" />
              <path d={tfLine(l.p, 0.20, 0.62, 0.44, 0.62)} stroke="var(--vdl-700)" strokeWidth="0.3" />
            </g>
          )}

          {l.content === 'result' && (
            <g stroke="var(--vdl-800)" strokeWidth="0.3" fill="none" opacity="0.5">
              {/* 완성된 UI 아웃라인 (희미) */}
              <path d={tfRect(l.p, 0.1, 0.1, 0.9, 0.9)} />
              <path d={tfLine(l.p, 0.1, 0.35, 0.9, 0.35)} />
              <path d={tfLine(l.p, 0.15, 0.15, 0.55, 0.15)} />
              <path d={tfLine(l.p, 0.15, 0.45, 0.70, 0.45)} />
              <path d={tfLine(l.p, 0.15, 0.55, 0.50, 0.55)} />
              <path d={tfRect(l.p, 0.15, 0.70, 0.40, 0.85)} />
            </g>
          )}
        </g>
      ))}

      {/* ── 연결 노드 (레이어 간) ── */}
      {layers.slice(0, -1).map((l, i) => {
        const p = l.p.top;
        return <circle key={`cn${i}`} cx={r(p.x)} cy={r(p.y - 4)} r="1.5" fill="var(--vdl-700)" />;
      })}

      {/* ── Naming Lines ── */}
      {nls.map((item, i) => (
        <g key={`nl${i}`}>
          <circle cx={item.nl.dot.cx} cy={item.nl.dot.cy} r="1.5" fill={item.stroke === 'var(--vdl-200)' ? 'var(--vdl-200)' : 'var(--vdl-700)'} />
          <path d={item.nl.line} stroke={item.stroke === 'var(--vdl-200)' ? 'var(--vdl-200)' : 'var(--vdl-700)'} strokeWidth="0.5" />
          <text
            x={item.nl.labelAnchor.x}
            y={item.nl.labelAnchor.y}
            fill={item.stroke === 'var(--vdl-200)' ? 'var(--vdl-200)' : 'var(--vdl-700)'}
            fontSize="6.5"
            fontFamily="monospace"
            dominantBaseline="middle"
          >
            {item.label}
          </text>
        </g>
      ))}

      {/* ── 레이어 넘버링 (좌측) ── */}
      {layers.map((l, i) => {
        const lp = { x: l.p.cx - l.p.hd - 6, y: l.p.topCenter.y };
        return (
          <text key={`num${i}`} x={r(lp.x)} y={r(lp.y)} fill="var(--vdl-800)" fontSize="5" fontFamily="monospace" dominantBaseline="middle" textAnchor="end">
            {`L${i + 1}`}
          </text>
        );
      })}
    </svg>
  );
};

/** 우측면 중간점 (단순 계산) */
function rfp_simple(p) {
  return { x: p.cx + p.hd, y: p.topY + p.hd / 2 + p.bh / 2 };
}

'use client';

import { useState } from 'react';

/**
 * SystemOverDrawingV2 — 브랜드 일러스트레이션 v2
 *
 * "결과물보다 기준을 먼저 설계합니다" (System Over Drawing)
 * 기준점(anchor)이 먼저 찍히고, 그 사이를 선이 채워 구조적 형태가 완성된다.
 * 형태를 "그리지" 않는다 — 기준을 "놓으면" 형태가 저절로 완성된다.
 *
 * 드로잉 시퀀스: 허브 앵커 → 나머지 앵커 → 허브 스포크 → 외곽 연결 → 면 채움
 * hover 시 전체 시퀀스 리플레이.
 *
 * Example usage:
 * <SystemOverDrawingV2 />
 */
export function SystemOverDrawingV2(props) {
  const [animKey, setAnimKey] = useState(0);

  const size = 400;

  // 9개 앵커 포인트 — P4가 허브(center)
  const anchors = [
    { x: 120, y: 56 },  // 0 top-left
    { x: 252, y: 42 },  // 1 top-right
    { x: 340, y: 104 }, // 2 right-top
    { x: 52, y: 186 },  // 3 left
    { x: 196, y: 178 }, // 4 center (hub)
    { x: 348, y: 216 }, // 5 right
    { x: 80, y: 320 },  // 6 bottom-left
    { x: 228, y: 350 }, // 7 bottom-center
    { x: 324, y: 298 }, // 8 bottom-right
  ];

  const hub = 4;

  // 허브 → 각 앵커 스포크 (8개)
  const spokes = [0, 1, 2, 3, 5, 6, 7, 8];

  // 외곽 경계선 (시계 방향)
  const boundary = [
    [0, 1], [1, 2], [2, 5], [5, 8], [8, 7], [7, 6], [6, 3], [3, 0],
  ];

  // 면 채움 삼각형 (subtle)
  const fills = [
    [0, 1, 4],
    [4, 7, 8],
  ];

  const triPath = (idxs) =>
    `M ${anchors[idxs[0]].x} ${anchors[idxs[0]].y} L ${anchors[idxs[1]].x} ${anchors[idxs[1]].y} L ${anchors[idxs[2]].x} ${anchors[idxs[2]].y} Z`;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="System Over Drawing v2"
      style={{ width: '100%', height: '100%', display: 'block' }}
      onMouseEnter={() => setAnimKey((k) => k + 1)}
      {...props}
    >
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .sod2-draw {
            stroke-dasharray: var(--l);
            stroke-dashoffset: var(--l);
            animation: sod2-d var(--d) ease-out var(--t) forwards;
          }
          .sod2-fade {
            opacity: 0.01;
            animation: sod2-f var(--d) ease-out var(--t) forwards;
          }
          @keyframes sod2-d { to { stroke-dashoffset: 0; } }
          @keyframes sod2-f { to { opacity: 1; } }
        }
      `}</style>

      <rect width={size} height={size} fill="var(--vdl-950)" />

      <g key={animKey}>
        {/* Phase 4: 면 채움 — subtle fill */}
        {fills.map((tri, i) => (
          <path
            key={`fill-${i}`}
            className="sod2-fade"
            d={triPath(tri)}
            fill="var(--vdl-900)"
            stroke="none"
            style={{ '--d': '600ms', '--t': `${1100 + i * 200}ms` }}
          />
        ))}

        {/* Phase 3: 외곽 경계선 — 순차 draw */}
        {boundary.map(([a, b], i) => (
          <line
            key={`bnd-${i}`}
            className="sod2-draw"
            x1={anchors[a].x}
            y1={anchors[a].y}
            x2={anchors[b].x}
            y2={anchors[b].y}
            stroke="var(--vdl-700)"
            strokeWidth={0.5}
            strokeLinecap="round"
            style={{ '--l': 250, '--d': '400ms', '--t': `${650 + i * 70}ms` }}
          />
        ))}

        {/* Phase 2: 허브 스포크 — draw from center */}
        {spokes.map((target, i) => (
          <line
            key={`spoke-${i}`}
            className="sod2-draw"
            x1={anchors[hub].x}
            y1={anchors[hub].y}
            x2={anchors[target].x}
            y2={anchors[target].y}
            stroke="var(--vdl-800)"
            strokeWidth={0.5}
            strokeLinecap="round"
            style={{ '--l': 250, '--d': '450ms', '--t': `${350 + i * 50}ms` }}
          />
        ))}

        {/* Phase 1: 앵커 포인트 — 허브 먼저, 나머지 순차 */}
        {anchors.map((p, i) => {
          const isHub = i === hub;
          return (
            <circle
              key={`pt-${i}`}
              className="sod2-fade"
              cx={p.x}
              cy={p.y}
              r={isHub ? 3.5 : 2.5}
              fill={isHub ? 'var(--vdl-200)' : 'var(--vdl-200)'}
              style={{
                '--d': '300ms',
                '--t': isHub ? '0ms' : `${80 + i * 40}ms`,
              }}
            />
          );
        })}
      </g>
    </svg>
  );
}

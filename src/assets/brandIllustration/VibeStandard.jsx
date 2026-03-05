'use client';

import { useState } from 'react';

/**
 * VibeStandard — 브랜드 일러스트레이션
 *
 * "AI가 알아듣는 표준 디자인 언어 체계" (The Vibe Standard)
 * 하나의 수직 축(표준)을 공유하는 타원들이 폭만 파라메트릭하게 변주되며
 * 상·하단 수렴점에서 정확히 만나는 제너러티브 SVG.
 *
 * 드로잉 시퀀스: 수렴점 → 축 → 수평축 → 타원(좁→넓 순차)
 * hover 시 전체 시퀀스가 처음부터 다시 재생된다.
 *
 * Example usage:
 * <VibeStandard />
 */
export function VibeStandard(props) {
  const [animKey, setAnimKey] = useState(0);

  const size = 400;
  const cx = size / 2;
  const cy = size / 2;
  const count = 14;
  const ry = 156;
  const rxMin = 5;
  const rxMax = 170;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="The Vibe Standard"
      style={{ width: '100%', height: '100%', display: 'block' }}
      onMouseEnter={() => setAnimKey((k) => k + 1)}
      {...props}
    >
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .vs-draw {
            stroke-dasharray: var(--l);
            stroke-dashoffset: var(--l);
            animation: vs-d var(--d) ease-out var(--t) forwards;
          }
          .vs-fade {
            opacity: 0.01;
            animation: vs-f var(--d) ease-out var(--t) forwards;
          }
          @keyframes vs-d { to { stroke-dashoffset: 0; } }
          @keyframes vs-f { to { opacity: 1; } }
        }
      `}</style>

      <rect width={size} height={size} fill="var(--vdl-950)" />

      <g key={animKey}>
        {/* 2. 수평 축 + 화살표 — fade in */}
        <g className="vs-fade" style={{ '--d': '500ms', '--t': '250ms' }}>
          <line
            x1={16}
            y1={cy}
            x2={size - 16}
            y2={cy}
            stroke="var(--vdl-800)"
            strokeWidth={0.5}
          />
          <polyline
            points={`${22},${cy - 3} ${16},${cy} ${22},${cy + 3}`}
            fill="none"
            stroke="var(--vdl-800)"
            strokeWidth={0.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points={`${size - 22},${cy - 3} ${size - 16},${cy} ${size - 22},${cy + 3}`}
            fill="none"
            stroke="var(--vdl-800)"
            strokeWidth={0.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* 3. 파라메트릭 타원 필드 — 좁은 것부터 순차 draw in */}
        {Array.from({ length: count }, (_, i) => {
          const t = i / (count - 1);
          const rx = rxMin + (rxMax - rxMin) * t;

          return (
            <ellipse
              key={i}
              className="vs-draw"
              cx={cx}
              cy={cy}
              rx={rx}
              ry={ry}
              fill="none"
              stroke="var(--vdl-600)"
              strokeWidth={0.5}
              style={{
                '--l': 1100,
                '--d': '600ms',
                '--t': `${450 + i * 65}ms`,
              }}
            />
          );
        })}

        {/* 1. 수직 축 — fade in (dashed) */}
        <line
          className="vs-fade"
          x1={cx}
          y1={cy - ry - 16}
          x2={cx}
          y2={cy + ry + 16}
          stroke="var(--vdl-200)"
          strokeWidth={0.5}
          strokeDasharray="4 4"
          style={{ '--d': '600ms', '--t': '100ms' }}
        />

        {/* 0. 수렴점 — 가장 먼저 fade in */}
        <circle
          className="vs-fade"
          cx={cx}
          cy={cy - ry}
          r={2.5}
          fill="var(--vdl-200)"
          style={{ '--d': '300ms', '--t': '0ms' }}
        />
        <circle
          className="vs-fade"
          cx={cx}
          cy={cy + ry}
          r={2.5}
          fill="var(--vdl-200)"
          style={{ '--d': '300ms', '--t': '80ms' }}
        />
      </g>
    </svg>
  );
}

'use client';

import { useState } from 'react';

/**
 * SystemOverDrawing — 브랜드 일러스트레이션
 *
 * "결과물보다 기준을 먼저 설계합니다" (System Over Drawing)
 * 하나의 타원(규칙)이 회전·복제되어 로제트 패턴(결과물)을 만드는 제너러티브 SVG.
 *
 * 드로잉 시퀀스: 중심점 → 가이드 원 → 구조 축 → 기준 타원 → 나머지 타원 순차
 * hover 시 전체 시퀀스가 처음부터 다시 재생된다.
 *
 * Example usage:
 * <SystemOverDrawing />
 */
export function SystemOverDrawing(props) {
  const [animKey, setAnimKey] = useState(0);

  const size = 400;
  const cx = size / 2;
  const cy = size / 2;
  const count = 18;
  const rx = 155;
  const ry = 48;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="System Over Drawing"
      style={{ width: '100%', height: '100%', display: 'block' }}
      onMouseEnter={() => setAnimKey((k) => k + 1)}
      {...props}
    >
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .sod-draw {
            stroke-dasharray: var(--l);
            stroke-dashoffset: var(--l);
            animation: sod-d var(--d) ease-out var(--t) forwards;
          }
          .sod-fade {
            opacity: 0.01;
            animation: sod-f var(--d) ease-out var(--t) forwards;
          }
          @keyframes sod-d { to { stroke-dashoffset: 0; } }
          @keyframes sod-f { to { opacity: 1; } }
        }
      `}</style>

      <rect width={size} height={size} fill="var(--vdl-950)" />

      <g key={animKey}>
        {/* 1. 구조 축 — fade in */}
        <line
          className="sod-fade"
          x1={cx - rx - 16}
          y1={cy}
          x2={cx + rx + 16}
          y2={cy}
          stroke="var(--vdl-800)"
          strokeWidth={0.5}
          style={{ '--d': '500ms', '--t': '200ms' }}
        />

        {/* 2~3. 로제트 — 기준 타원(hero) 먼저, 나머지 순차 draw in */}
        {Array.from({ length: count }, (_, i) => {
          const angle = (i * 180) / count;
          const isHero = i === 0;

          return (
            <ellipse
              key={i}
              className="sod-draw"
              cx={cx}
              cy={cy}
              rx={rx}
              ry={ry}
              transform={`rotate(${angle} ${cx} ${cy})`}
              fill="none"
              stroke={isHero ? 'var(--vdl-200)' : 'var(--vdl-700)'}
              strokeWidth={0.5}
              style={{
                '--l': 700,
                '--d': isHero ? '700ms' : '500ms',
                '--t': isHero ? '400ms' : `${600 + (i - 1) * 55}ms`,
              }}
            />
          );
        })}

        {/* 4. 가이드 원 — fade in (dashed) */}
        <circle
          className="sod-fade"
          cx={cx}
          cy={cy}
          r={ry}
          fill="none"
          stroke="var(--vdl-200)"
          strokeWidth={0.5}
          strokeDasharray="4 4"
          style={{ '--d': '600ms', '--t': '100ms' }}
        />

        {/* 0. 중심점 — 가장 먼저 fade in */}
        <circle
          className="sod-fade"
          cx={cx}
          cy={cy}
          r={2.5}
          fill="var(--vdl-200)"
          style={{ '--d': '300ms', '--t': '0ms' }}
        />
      </g>
    </svg>
  );
}

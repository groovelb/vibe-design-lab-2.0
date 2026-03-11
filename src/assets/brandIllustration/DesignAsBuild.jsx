'use client';

import { useState, useMemo } from 'react';

/**
 * DesignAsBuild — 브랜드 일러스트레이션
 *
 * "설계가 곧 구현이다" (Design As Build)
 * 그리드 위에 타원이 그려지고, 타원 경계가 지나는 셀이 활성화되며
 * 곡선(디자인)이 그리드 좌표(구현)로 분해되는 장면을 시각화한다.
 *
 * 드로잉 시퀀스: 중심점 → 그리드 → 타원 draw → 셀 활성화 → 어노테이션
 * hover 시 전체 시퀀스가 처음부터 다시 재생된다.
 *
 * Example usage:
 * <DesignAsBuild />
 */
export function DesignAsBuild(props) {
  const [animKey, setAnimKey] = useState(0);

  const size = 400;
  const cx = size / 2;
  const cy = size / 2;
  const grid = 16;
  const cols = size / grid;
  const rows = size / grid;

  /* ── 타원 파라미터 ── */
  const rx = 152;
  const ry = 88;

  /* ── 타원 경계를 지나는 셀 계산 ── */
  const activeCells = useMemo(() => {
    const cells = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cellCx = col * grid + grid / 2;
        const cellCy = row * grid + grid / 2;

        const corners = [
          [col * grid, row * grid],
          [col * grid + grid, row * grid],
          [col * grid, row * grid + grid],
          [col * grid + grid, row * grid + grid],
        ];

        const ellipseVal = (x, y) =>
          ((x - cx) * (x - cx)) / (rx * rx) + ((y - cy) * (y - cy)) / (ry * ry);

        const values = corners.map(([x, y]) => ellipseVal(x, y));
        const hasInside = values.some((v) => v <= 1);
        const hasOutside = values.some((v) => v > 1);

        if (hasInside && hasOutside) {
          const dist = Math.sqrt(
            ((cellCx - cx) / rx) ** 2 + ((cellCy - cy) / ry) ** 2,
          );
          const angle = Math.atan2(cellCy - cy, cellCx - cx);
          cells.push({ col, row, dist, angle });
        }
      }
    }
    return cells;
  }, []);

  /* ── 어노테이션 — 특정 셀에서 바깥으로 확장 ── */
  const annotations = useMemo(() => {
    if (activeCells.length === 0) return [];

    const targets = [
      { angleTarget: -Math.PI * 0.75, side: -1 },
      { angleTarget: -Math.PI * 0.35, side: 1 },
      { angleTarget: -Math.PI * 0.1, side: 1 },
      { angleTarget: Math.PI * 0.15, side: 1 },
      { angleTarget: Math.PI * 0.4, side: -1 },
      { angleTarget: Math.PI * 0.8, side: -1 },
    ];

    return targets.map(({ angleTarget, side }) => {
      const cell = activeCells.reduce((best, c) =>
        Math.abs(c.angle - angleTarget) < Math.abs(best.angle - angleTarget)
          ? c
          : best,
      );
      const cellX = side === 1 ? (cell.col + 1) * grid : cell.col * grid;
      const cellY = cell.row * grid + grid / 2;
      const len = 14 + Math.floor(Math.random() * 8);
      return { x: cellX, y: cellY, side, len };
    });
  }, [activeCells]);

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Design As Build"
      style={{ width: '100%', height: '100%', display: 'block' }}
      onMouseEnter={() => setAnimKey((k) => k + 1)}
      {...props}
    >
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .dab-draw {
            stroke-dasharray: var(--l);
            stroke-dashoffset: var(--l);
            animation: dab-d var(--d) ease-out var(--t) forwards;
          }
          .dab-fade {
            opacity: 0.01;
            animation: dab-f var(--d) ease-out var(--t) forwards;
          }
          @keyframes dab-d { to { stroke-dashoffset: 0; } }
          @keyframes dab-f { to { opacity: 1; } }
        }
      `}</style>

      <rect width={size} height={size} fill="var(--vdl-950)" />

      <g key={animKey}>
        {/* 1. 그리드 — subtle 배경 */}
        <g className="dab-fade" style={{ '--d': '800ms', '--t': '100ms' }}>
          {Array.from({ length: cols - 1 }, (_, i) => (
            <line
              key={`gv-${i}`}
              x1={(i + 1) * grid}
              y1={0}
              x2={(i + 1) * grid}
              y2={size}
              stroke="var(--vdl-800)"
              strokeWidth={0.25}
            />
          ))}
          {Array.from({ length: rows - 1 }, (_, i) => (
            <line
              key={`gh-${i}`}
              x1={0}
              y1={(i + 1) * grid}
              x2={size}
              y2={(i + 1) * grid}
              stroke="var(--vdl-800)"
              strokeWidth={0.25}
            />
          ))}
        </g>

        {/* 2. 타원 — 디자인 표면 (draw in) */}
        <ellipse
          className="dab-draw"
          cx={cx}
          cy={cy}
          rx={rx}
          ry={ry}
          fill="none"
          stroke="var(--vdl-200)"
          strokeWidth={0.5}
          style={{
            '--l': Math.ceil(2 * Math.PI * Math.sqrt((rx * rx + ry * ry) / 2)),
            '--d': '800ms',
            '--t': '400ms',
          }}
        />

        {/* 3. 활성 셀 — 타원 경계가 지나는 그리드 셀 */}
        {activeCells.map((cell, i) => {
          const delay = 900 + i * 8;
          return (
            <rect
              key={`c-${i}`}
              className="dab-fade"
              x={cell.col * grid}
              y={cell.row * grid}
              width={grid}
              height={grid}
              fill="var(--vdl-700)"
              style={{ '--d': '300ms', '--t': `${delay}ms` }}
            />
          );
        })}

        {/* 4. 타원 재드로우 — 활성 셀 위에 타원선이 다시 보이도록 */}
        <ellipse
          className="dab-draw"
          cx={cx}
          cy={cy}
          rx={rx}
          ry={ry}
          fill="none"
          stroke="var(--vdl-200)"
          strokeWidth={0.5}
          style={{
            '--l': Math.ceil(2 * Math.PI * Math.sqrt((rx * rx + ry * ry) / 2)),
            '--d': '800ms',
            '--t': '400ms',
          }}
        />

        {/* 5. 어노테이션 — 활성 셀에서 바깥으로 뻗는 Naming Line */}
        {annotations.map((a, i) => {
          const endX = a.x + a.side * a.len;
          return (
            <g key={`a-${i}`}>
              <line
                className="dab-draw"
                x1={a.x}
                y1={a.y}
                x2={endX}
                y2={a.y}
                stroke="var(--vdl-200)"
                strokeWidth={0.5}
                strokeLinecap="round"
                style={{ '--l': a.len, '--d': '300ms', '--t': `${1400 + i * 70}ms` }}
              />
              <circle
                className="dab-fade"
                cx={endX}
                cy={a.y}
                r={1.5}
                fill="var(--vdl-200)"
                style={{ '--d': '200ms', '--t': `${1500 + i * 70}ms` }}
              />
            </g>
          );
        })}

        {/* 0. 중심점 */}
        <circle
          className="dab-fade"
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

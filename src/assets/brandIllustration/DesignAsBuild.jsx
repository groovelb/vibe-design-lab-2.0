'use client';

import { useState } from 'react';

/**
 * DesignAsBuild — 브랜드 일러스트레이션
 *
 * "구현의 설계도가 되는 디자인 접근방식" (Design As Build)
 * 중심 노드(⊕)에서 좌우로 분기하는 대칭 구조.
 *
 * 드로잉 시퀀스: 중심 ⊕ → 가까운 분기부터 바깥으로 좌우 동시 확장 → 화살표
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
  const r = 12;
  const busOffset = 54;
  const edgePad = 8;
  const arrowLen = 4;

  const branches = [
    { offset: -128, style: 'solid', stagger: 4 },
    { offset: -100, style: 'solid', stagger: 3 },
    { offset: -74, style: 'dotted', stagger: 2 },
    { offset: -50, style: 'solid', stagger: 1 },
    { offset: -30, style: 'dashed', stagger: 0 },
    { offset: 30, style: 'dashed', stagger: 0 },
    { offset: 50, style: 'solid', stagger: 1 },
    { offset: 74, style: 'dotted', stagger: 2 },
    { offset: 100, style: 'solid', stagger: 3 },
    { offset: 128, style: 'solid', stagger: 4 },
  ];

  const getDash = (style) => {
    if (style === 'dashed') return '6 4';
    if (style === 'dotted') return '2 3';
    return undefined;
  };

  const getStroke = (style) =>
    style === 'solid' ? 'var(--vdl-700)' : 'var(--vdl-800)';

  const leftPath = (offset) => {
    const targetY = cy + offset;
    const turnX = cx - busOffset;
    const dir = offset > 0 ? 1 : -1;

    return [
      `M ${cx} ${cy}`,
      `H ${turnX + r}`,
      `Q ${turnX} ${cy} ${turnX} ${cy + dir * r}`,
      `V ${targetY - dir * r}`,
      `Q ${turnX} ${targetY} ${turnX - r} ${targetY}`,
      `H ${edgePad}`,
    ].join(' ');
  };

  const rightPath = (offset) => {
    const targetY = cy + offset;
    const turnX = cx + busOffset;
    const dir = offset > 0 ? 1 : -1;

    return [
      `M ${cx} ${cy}`,
      `H ${turnX - r}`,
      `Q ${turnX} ${cy} ${turnX} ${cy + dir * r}`,
      `V ${targetY - dir * r}`,
      `Q ${turnX} ${targetY} ${turnX + r} ${targetY}`,
      `H ${size - edgePad}`,
    ].join(' ');
  };

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
        {/* 1. 좌측 분기 — 가까운 것부터 */}
        {branches.map((b, i) => {
          const y = cy + b.offset;
          const stroke = getStroke(b.style);
          const delay = 300 + b.stagger * 75;
          const isSolid = b.style === 'solid';

          return (
            <g key={`l-${i}`}>
              <path
                className={isSolid ? 'dab-draw' : 'dab-fade'}
                d={leftPath(b.offset)}
                fill="none"
                stroke={stroke}
                strokeWidth={0.5}
                strokeDasharray={isSolid ? undefined : getDash(b.style)}
                strokeLinecap="round"
                style={
                  isSolid
                    ? { '--l': 400, '--d': '600ms', '--t': `${delay}ms` }
                    : { '--d': '500ms', '--t': `${delay}ms` }
                }
              />
              <polyline
                className="dab-fade"
                points={`${edgePad + arrowLen},${y - 2.5} ${edgePad},${y} ${edgePad + arrowLen},${y + 2.5}`}
                fill="none"
                stroke={stroke}
                strokeWidth={0.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ '--d': '200ms', '--t': `${delay + 400}ms` }}
              />
            </g>
          );
        })}

        {/* 2. 우측 분기 — 좌측과 동시에 (설계 = 구현) */}
        {branches.map((b, i) => {
          const y = cy + b.offset;
          const stroke = getStroke(b.style);
          const delay = 300 + b.stagger * 75;
          const isSolid = b.style === 'solid';

          return (
            <g key={`r-${i}`}>
              <path
                className={isSolid ? 'dab-draw' : 'dab-fade'}
                d={rightPath(b.offset)}
                fill="none"
                stroke={stroke}
                strokeWidth={0.5}
                strokeDasharray={isSolid ? undefined : getDash(b.style)}
                strokeLinecap="round"
                style={
                  isSolid
                    ? { '--l': 400, '--d': '600ms', '--t': `${delay}ms` }
                    : { '--d': '500ms', '--t': `${delay}ms` }
                }
              />
              <polyline
                className="dab-fade"
                points={`${size - edgePad - arrowLen},${y - 2.5} ${size - edgePad},${y} ${size - edgePad - arrowLen},${y + 2.5}`}
                fill="none"
                stroke={stroke}
                strokeWidth={0.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ '--d': '200ms', '--t': `${delay + 400}ms` }}
              />
            </g>
          );
        })}

        {/* 0. 중심 노드 — ⊕ 가장 먼저 */}
        <circle
          className="dab-fade"
          cx={cx}
          cy={cy}
          r={8}
          fill="var(--vdl-950)"
          stroke="var(--vdl-200)"
          strokeWidth={0.5}
          style={{ '--d': '400ms', '--t': '0ms' }}
        />
        <line
          className="dab-fade"
          x1={cx - 4}
          y1={cy}
          x2={cx + 4}
          y2={cy}
          stroke="var(--vdl-200)"
          strokeWidth={0.5}
          style={{ '--d': '300ms', '--t': '100ms' }}
        />
        <line
          className="dab-fade"
          x1={cx}
          y1={cy - 4}
          x2={cx}
          y2={cy + 4}
          stroke="var(--vdl-200)"
          strokeWidth={0.5}
          style={{ '--d': '300ms', '--t': '100ms' }}
        />
        <circle
          className="dab-fade"
          cx={cx}
          cy={cy}
          r={2.5}
          fill="var(--vdl-50)"
          style={{ '--d': '300ms', '--t': '0ms' }}
        />
      </g>
    </svg>
  );
}

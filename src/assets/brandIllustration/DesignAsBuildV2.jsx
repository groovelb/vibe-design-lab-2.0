'use client';

import { useState } from 'react';

/**
 * DesignAsBuildV2 — 브랜드 일러스트레이션 v2
 *
 * "구현의 설계도가 되는 디자인 접근방식" (Design As Build)
 * UI Card의 anatomy가 레이어별로 그려지면서 완성된 컴포넌트가 된다.
 * 해부도(설계)를 그리는 행위가 곧 컴포넌트(구현)를 완성하는 행위.
 *
 * 드로잉 시퀀스: 외곽 → 패딩 → 구조선 → 콘텐츠 → Naming Line
 * hover 시 전체 시퀀스 리플레이.
 *
 * Example usage:
 * <DesignAsBuildV2 />
 */
export function DesignAsBuildV2(props) {
  const [animKey, setAnimKey] = useState(0);

  const size = 400;

  // Card geometry
  const card = { x: 108, y: 40, w: 184, h: 320 };
  const pad = 20;
  const inner = {
    x: card.x + pad,
    y: card.y + pad,
    w: card.w - pad * 2,
    h: card.h - pad * 2,
  };

  // Content positions
  const headY = inner.y + 8;
  const div1Y = inner.y + 52;
  const bodyY = div1Y + 14;
  const mediaY = bodyY + 48;
  const div2Y = mediaY + 84;
  const ctaY = div2Y + 14;
  const ctaW = 78;
  const ctaH = 28;

  // Naming Lines: { dotX, dotY, endX, endY, label, labelX, labelY }
  const namingLines = [
    {
      dx: card.x, dy: headY + 4,
      ex: 16, ey: headY + 4,
      label: 'typography.h4',
      lx: 16, ly: headY - 3,
    },
    {
      dx: card.x + card.w, dy: inner.y + inner.h / 2,
      ex: 384, ey: inner.y + inner.h / 2,
      label: 'padding: 20',
      lx: 340, ly: inner.y + inner.h / 2 - 7,
    },
    {
      dx: card.x + card.w / 2, dy: card.y + card.h,
      ex: card.x + card.w / 2, ey: 388,
      label: 'radius: 0',
      lx: card.x + card.w / 2 + 6, ly: 386,
    },
    {
      dx: card.x + card.w, dy: ctaY + ctaH / 2,
      ex: 384, ey: ctaY + ctaH / 2,
      label: 'action',
      lx: 348, ly: ctaY + ctaH / 2 - 7,
    },
  ];

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Design As Build v2"
      style={{ width: '100%', height: '100%', display: 'block' }}
      onMouseEnter={() => setAnimKey((k) => k + 1)}
      {...props}
    >
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .dab2-draw {
            stroke-dasharray: var(--l);
            stroke-dashoffset: var(--l);
            animation: dab2-d var(--d) ease-out var(--t) forwards;
          }
          .dab2-fade {
            opacity: 0.01;
            animation: dab2-f var(--d) ease-out var(--t) forwards;
          }
          @keyframes dab2-d { to { stroke-dashoffset: 0; } }
          @keyframes dab2-f { to { opacity: 1; } }
        }
      `}</style>

      <rect width={size} height={size} fill="var(--vdl-950)" />

      <g key={animKey}>
        {/* Phase 1: 외곽 컨테이너 — draw */}
        <rect
          className="dab2-draw"
          x={card.x}
          y={card.y}
          width={card.w}
          height={card.h}
          fill="none"
          stroke="var(--vdl-700)"
          strokeWidth={0.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ '--l': 1020, '--d': '800ms', '--t': '0ms' }}
        />

        {/* Phase 2: 패딩 가이드 — dashed fade */}
        <rect
          className="dab2-fade"
          x={inner.x}
          y={inner.y}
          width={inner.w}
          height={inner.h}
          fill="none"
          stroke="var(--vdl-800)"
          strokeWidth={0.5}
          strokeDasharray="4 4"
          style={{ '--d': '500ms', '--t': '350ms' }}
        />

        {/* Phase 3: 구조선 — dividers draw */}
        <line
          className="dab2-draw"
          x1={inner.x}
          y1={div1Y}
          x2={inner.x + inner.w}
          y2={div1Y}
          stroke="var(--vdl-800)"
          strokeWidth={0.5}
          strokeLinecap="round"
          style={{ '--l': 160, '--d': '350ms', '--t': '550ms' }}
        />
        <line
          className="dab2-draw"
          x1={inner.x}
          y1={div2Y}
          x2={inner.x + inner.w}
          y2={div2Y}
          stroke="var(--vdl-800)"
          strokeWidth={0.5}
          strokeLinecap="round"
          style={{ '--l': 160, '--d': '350ms', '--t': '650ms' }}
        />

        {/* Phase 4a: 헤딩 플레이스홀더 — fade */}
        <rect
          className="dab2-fade"
          x={inner.x}
          y={headY}
          width={120}
          height={8}
          fill="var(--vdl-700)"
          style={{ '--d': '300ms', '--t': '700ms' }}
        />
        <rect
          className="dab2-fade"
          x={inner.x}
          y={headY + 16}
          width={88}
          height={5}
          fill="var(--vdl-800)"
          style={{ '--d': '300ms', '--t': '780ms' }}
        />

        {/* Phase 4b: 본문 플레이스홀더 — fade */}
        {[
          { w: 128, delay: 820 },
          { w: 112, delay: 870 },
          { w: 86, delay: 920 },
        ].map((line, i) => (
          <rect
            key={`body-${i}`}
            className="dab2-fade"
            x={inner.x}
            y={bodyY + i * 12}
            width={line.w}
            height={4}
            fill="var(--vdl-800)"
            style={{ '--d': '250ms', '--t': `${line.delay}ms` }}
          />
        ))}

        {/* Phase 4c: 미디어 영역 — dashed outline draw */}
        <rect
          className="dab2-draw"
          x={inner.x}
          y={mediaY}
          width={inner.w}
          height={80}
          fill="none"
          stroke="var(--vdl-800)"
          strokeWidth={0.5}
          strokeDasharray="6 4"
          style={{ '--l': 480, '--d': '500ms', '--t': '900ms' }}
        />
        {/* 미디어 아이콘 (산+해) */}
        <g className="dab2-fade" style={{ '--d': '300ms', '--t': '1100ms' }}>
          <polyline
            points={`${inner.x + 50},${mediaY + 56} ${inner.x + 62},${mediaY + 38} ${inner.x + 74},${mediaY + 48} ${inner.x + 90},${mediaY + 28} ${inner.x + 104},${mediaY + 56}`}
            fill="none"
            stroke="var(--vdl-800)"
            strokeWidth={0.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx={inner.x + 46} cy={mediaY + 28} r={6} fill="none" stroke="var(--vdl-800)" strokeWidth={0.5} />
        </g>

        {/* Phase 4d: CTA 버튼 — draw + label fade */}
        <rect
          className="dab2-draw"
          x={inner.x + inner.w - ctaW}
          y={ctaY}
          width={ctaW}
          height={ctaH}
          fill="none"
          stroke="var(--vdl-700)"
          strokeWidth={0.5}
          style={{ '--l': 230, '--d': '400ms', '--t': '1000ms' }}
        />
        <rect
          className="dab2-fade"
          x={inner.x + inner.w - ctaW + 14}
          y={ctaY + 11}
          width={50}
          height={5}
          fill="var(--vdl-700)"
          style={{ '--d': '250ms', '--t': '1200ms' }}
        />

        {/* Phase 5: Naming Lines — 해부 레이블 */}
        {namingLines.map((nl, i) => (
          <g key={`nl-${i}`}>
            {/* dot */}
            <circle
              className="dab2-fade"
              cx={nl.dx}
              cy={nl.dy}
              r={2}
              fill="var(--vdl-200)"
              style={{ '--d': '250ms', '--t': `${1200 + i * 100}ms` }}
            />
            {/* line */}
            <line
              className="dab2-draw"
              x1={nl.dx}
              y1={nl.dy}
              x2={nl.ex}
              y2={nl.ey}
              stroke="var(--vdl-200)"
              strokeWidth={0.5}
              strokeLinecap="round"
              style={{ '--l': 120, '--d': '350ms', '--t': `${1280 + i * 100}ms` }}
            />
            {/* label */}
            <text
              className="dab2-fade"
              x={nl.lx}
              y={nl.ly}
              fill="var(--vdl-200)"
              style={{
                fontFamily: 'monospace',
                fontSize: 9,
                '--d': '300ms',
                '--t': `${1400 + i * 100}ms`,
              }}
            >
              {nl.label}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

'use client';
import { forwardRef, useSyncExternalStore } from 'react';
import Box from '@mui/material/Box';
import {
  VIEW, INPUT_STREAMS, OUTPUT_CHANNELS, INPUT_OUTPUT_MAP, LAYOUT,
} from './contextEngineConstants';

const ACCENT = 'var(--vdl-200)';

// prefers-reduced-motion 구독 (useSyncExternalStore 용)
const subscribeReducedMotion = (callback) => {
  const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
};
const getReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const getReducedMotionServer = () => false;

// ============================================================
// InputStreams — 좌측 6개 입력 노드 + 직교 패스 + 파티클
// ============================================================

function InputStreams({ accentColor, isReducedMotion }) {
  const { inputDotsX, inputPathStartX, outputEndX } = LAYOUT;

  return (
    <g>
      {INPUT_STREAMS.map((stream, i) => {
        const { y } = stream;
        const outputY = OUTPUT_CHANNELS[INPUT_OUTPUT_MAP[i]].y;
        const midX = inputPathStartX + (outputEndX - inputPathStartX) * (0.35 + i * 0.05);
        const path = y === outputY
          ? `M ${inputPathStartX} ${y} H ${outputEndX}`
          : `M ${inputPathStartX} ${y} H ${midX} V ${outputY} H ${outputEndX}`;

        return (
          <g key={i}>
            {/* 입력 노드 */}
            {[0, 1, 2, 3].map((d) => (
              <rect key={d}
                x={inputDotsX + d * 12 - 2.5} y={y - 2.5}
                width={5} height={5} rx={0.5}
                fill={accentColor}
                opacity={0.12 + d * 0.06}
              />
            ))}

            {/* 가이드 패스 */}
            <path d={path} fill="none" stroke={accentColor}
              strokeWidth={0.6} opacity={0.07} />

            {/* 파티클 스트림 */}
            {!isReducedMotion &&
              [0, 1, 2, 3].map((p) => (
                <rect key={p} x={-2} y={-2} width={4} height={4} rx={0.5} fill={accentColor}>
                  <animateMotion
                    dur="3.5s"
                    begin={`${i * 0.2 + p * 0.85}s`}
                    repeatCount="indefinite"
                    keyPoints="0;1"
                    keyTimes="0;1"
                    path={path}
                  />
                  <animate
                    attributeName="opacity"
                    values="0;0.5;0.35;0"
                    keyTimes="0;0.08;0.7;1"
                    dur="3.5s"
                    begin={`${i * 0.2 + p * 0.85}s`}
                    repeatCount="indefinite"
                  />
                </rect>
              ))
            }
          </g>
        );
      })}
    </g>
  );
}

// ============================================================
// OutputChannels — 우측 4개 출력 엔드포인트
// ============================================================

function OutputChannels({ accentColor, isReducedMotion }) {
  const { outputEndX } = LAYOUT;

  return (
    <g>
      {OUTPUT_CHANNELS.map((channel, i) => {
        const { y } = channel;

        return (
          <g key={i}>
            <rect x={outputEndX - 5} y={y - 5} width={10} height={10} rx={1}
              fill={accentColor} opacity={0.7}>
              {!isReducedMotion && (
                <animate
                  attributeName="opacity"
                  values="0.7;0.95;0.7"
                  dur="2s"
                  begin={`${i * 0.3}s`}
                  repeatCount="indefinite"
                />
              )}
            </rect>
            <rect x={outputEndX - 12} y={y - 12} width={24} height={24} rx={2}
              fill={accentColor} opacity={0.06}>
              {!isReducedMotion && (
                <animate
                  attributeName="opacity"
                  values="0.04;0.1;0.04"
                  dur="2s"
                  begin={`${i * 0.3}s`}
                  repeatCount="indefinite"
                />
              )}
            </rect>
          </g>
        );
      })}
    </g>
  );
}

// ============================================================
// ContextEngine — 메인 컴포넌트
// ============================================================

/**
 * ContextEngine 컴포넌트
 *
 * "code → working design" 메타포를 시각화하는 SVG 인터랙티브 컴포넌트.
 * 좌측 코드 조각(타이핑 리빌) → 직선 파티클 스트림 → 우측 디자인 산출물(UI 조립).
 * SVG SMIL로 타이핑 리빌, animateMotion으로 파티클 이동.
 *
 * @param {string} accentColor - 강조 색상 CSS 값 [Optional, 기본값: 'var(--vdl-200)']
 * @param {object} sx - 추가 MUI 스타일 [Optional]
 *
 * Example usage:
 * <ContextEngine />
 * <ContextEngine accentColor="var(--vdl-200)" sx={{ opacity: 0.5 }} />
 */
const ContextEngine = forwardRef(function ContextEngine({
  accentColor = ACCENT,
  sx,
}, ref) {
  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getReducedMotionServer,
  );

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        ...sx,
      }}
    >
      <svg
        viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        style={{ display: 'block' }}
      >
        <InputStreams accentColor={accentColor} isReducedMotion={isReducedMotion} />
        <OutputChannels accentColor={accentColor} isReducedMotion={isReducedMotion} />
      </svg>
    </Box>
  );
});

export { ContextEngine };

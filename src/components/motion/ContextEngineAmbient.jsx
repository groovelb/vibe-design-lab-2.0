'use client';
import { useMemo, useSyncExternalStore } from 'react';
import Box from '@mui/material/Box';
import {
  VIEW, LAYOUT_V2, PROCESS_BARS, OUTPUT_CHANNELS_V2,
  SCAN_LINES, CYCLE, buildStage1Paths, buildStage2Paths,
  buildParticleMotion,
} from './contextEngineV2Constants';

const ACCENT = 'var(--vdl-200)';

// prefers-reduced-motion 구독
const subscribeReducedMotion = (cb) => {
  const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
  mql.addEventListener('change', cb);
  return () => mql.removeEventListener('change', cb);
};
const getReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const getReducedMotionServer = () => false;

/**
 * ContextEngineAmbient 컴포넌트
 *
 * ContextEngineV2의 구조적 요소(커넥션 경로, 파티클, 스캔라인, 노드 글로우)만 추출한
 * 앰비언트 배경 컴포넌트. UI 텍스트, 아이콘, 브래킷 등은 제거되어
 * 순수한 데이터 흐름 시각화 배경으로 사용된다.
 *
 * @param {number} progress - 스크롤 진행률 (0→1), opacity 매핑 [Optional, 기본값: 0]
 * @param {string} accentColor - 강조 색상 CSS 값 [Optional, 기본값: 'var(--vdl-200)']
 * @param {object} sx - 추가 MUI 스타일 [Optional]
 *
 * Example usage:
 * <ContextEngineAmbient progress={scrollProgress} sx={{ position: 'absolute', inset: 0 }} />
 */
function ContextEngineAmbient({
  progress = 0,
  accentColor = ACCENT,
  sx,
}) {
  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getReducedMotionServer,
  );

  const stage1Paths = useMemo(() => buildStage1Paths(), []);
  const stage2Paths = useMemo(() => buildStage2Paths(), []);
  const HALF_CYCLE = CYCLE / 2;

  // progress(0→1) → opacity(0.15→0.4)
  const opacity = 0.15 + progress * 0.25;

  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      opacity,
      maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)',
      WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)',
      willChange: 'opacity',
      ...sx,
    }}>
      <svg
        viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        style={{ display: 'block' }}
      >
        {/* Defs — 글로우 필터 + 파티클 그라디언트 */}
        <defs>
          <radialGradient id="ceAmb-particleGrad">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.9" />
            <stop offset="60%" stopColor={accentColor} stopOpacity="0.4" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
          </radialGradient>
          <filter id="ceAmb-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix in="blur" type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 3 0" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Scan lines */}
        {SCAN_LINES.map((y, i) => (
          <line key={i} x1={0} y1={y} x2={VIEW.w} y2={y}
            stroke={accentColor} strokeWidth={0.5} opacity={0.1}>
            {!isReducedMotion && (
              <animate
                attributeName="opacity"
                values="0.08;0.18;0.08"
                dur="2s"
                begin={`${i * 0.5}s`}
                repeatCount="indefinite"
              />
            )}
          </line>
        ))}

        {/* Connection paths — fully drawn, no intro animation */}
        <g opacity={0.5}>
          {stage1Paths.map((p, i) => (
            <path key={`s1-${i}`} d={p.path}
              fill="none" stroke={accentColor} strokeWidth={1} />
          ))}
          {stage2Paths.map((p, i) => (
            <path key={`s2-${i}`} d={p.path}
              fill="none" stroke={accentColor} strokeWidth={1} />
          ))}
        </g>

        {/* Node squares at bar positions — 6×6 construct square */}
        <g>
          {PROCESS_BARS.map((bar, i) => (
            <rect key={`bar-${i}`}
              x={LAYOUT_V2.barX + bar.w / 2 - 3} y={bar.y - 3}
              width={6} height={6}
              fill={accentColor} opacity={0.35}>
              {!isReducedMotion && (
                <animate
                  attributeName="opacity"
                  values="0.2;0.6;0.2"
                  dur="0.75s"
                  begin={`${i * 0.1}s`}
                  repeatCount="indefinite"
                />
              )}
            </rect>
          ))}
        </g>

        {/* Glow squares at output positions — 6×6 construct square */}
        <g>
          {OUTPUT_CHANNELS_V2.map((ch, i) => (
            <g key={`out-${i}`}>
              <rect
                x={LAYOUT_V2.outputX - 10} y={ch.y - 10}
                width={20} height={20}
                fill={accentColor} opacity={0.2}
                filter="url(#ceAmb-glow)"
              />
              <rect
                x={LAYOUT_V2.outputX - 3} y={ch.y - 3}
                width={6} height={6}
                fill={accentColor} opacity={0.4}>
                {!isReducedMotion && (
                  <animate
                    attributeName="opacity"
                    values="0.25;0.7;0.25"
                    dur="0.6s"
                    begin={`${i * 0.075}s`}
                    repeatCount="indefinite"
                  />
                )}
              </rect>
            </g>
          ))}
        </g>

        {/* Particles — continuous from 0s, no intro delay */}
        {!isReducedMotion && (
          <g>
            {stage1Paths.map((p, pathIdx) => {
              const pm = buildParticleMotion(pathIdx, 1);
              return (
                <rect key={`s1-${pathIdx}`} x={-3} y={-3} width={6} height={6}
                  fill={accentColor} opacity={0}>
                  <animateMotion
                    dur={`${HALF_CYCLE}s`}
                    begin="0s"
                    repeatCount="indefinite"
                    calcMode="linear"
                    keyPoints={pm.motion.keyPoints}
                    keyTimes={pm.motion.keyTimes}
                    path={p.path}
                  />
                  <animate
                    attributeName="opacity"
                    values={pm.opacity.values}
                    keyTimes={pm.opacity.keyTimes}
                    dur={`${HALF_CYCLE}s`}
                    begin="0s"
                    repeatCount="indefinite"
                  />
                </rect>
              );
            })}
            {stage2Paths.map((p, pathIdx) => {
              const pm = buildParticleMotion(pathIdx, 2);
              return (
                <rect key={`s2-${pathIdx}`} x={-4} y={-4} width={8} height={8}
                  fill={accentColor} opacity={0}>
                  <animateMotion
                    dur={`${HALF_CYCLE}s`}
                    begin="0s"
                    repeatCount="indefinite"
                    calcMode="linear"
                    keyPoints={pm.motion.keyPoints}
                    keyTimes={pm.motion.keyTimes}
                    path={p.path}
                  />
                  <animate
                    attributeName="opacity"
                    values={pm.opacity.values}
                    keyTimes={pm.opacity.keyTimes}
                    dur={`${HALF_CYCLE}s`}
                    begin="0s"
                    repeatCount="indefinite"
                  />
                </rect>
              );
            })}
          </g>
        )}
      </svg>
    </Box>
  );
}

export { ContextEngineAmbient };

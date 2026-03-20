'use client';
import { useRef, useEffect, useMemo, useCallback, forwardRef, useSyncExternalStore } from 'react';
import Box from '@mui/material/Box';
import gsap from 'gsap';
import {
  VIEW, SPHERE, INPUT_STREAMS, OUTPUT_CHANNELS, LAYOUT,
  generateSpherePoints, projectPoint, zSort, cleanBezier,
} from './contextEngineConstants';

const ACCENT = 'var(--vdl-200)';
const MUTED = 'var(--vdl-600)';
const FONT = 'monospace';

// prefers-reduced-motion 구독 (useSyncExternalStore 용)
const subscribeReducedMotion = (callback) => {
  const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
};
const getReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const getReducedMotionServer = () => false;

// ============================================================
// Sphere — 3D 회전 구체 (GSAP + 직접 DOM 조작)
// ============================================================

function Sphere({ pointCount, rotationDuration, accentColor, isReducedMotion }) {
  const groupRef = useRef(null);
  const nodesRef = useRef([]);
  const rotationRef = useRef({ value: 0 });

  const points = useMemo(() => generateSpherePoints(pointCount, 0.25), [pointCount]);

  const renderFrame = useCallback(() => {
    const angle = rotationRef.current.value;
    const projected = points.map((p) => ({
      ...p,
      ...projectPoint(p, angle, SPHERE.cx, SPHERE.cy, SPHERE.r),
    }));
    const sorted = zSort(projected);

    sorted.forEach((p, drawIndex) => {
      const node = nodesRef.current[drawIndex];
      if (!node) return;
      const s = p.size * 1.4;
      node.setAttribute('x', p.sx - s / 2);
      node.setAttribute('y', p.sy - s / 2);
      node.setAttribute('width', s);
      node.setAttribute('height', s);
      node.setAttribute('rx', 0.5);
      node.setAttribute('fill', p.isRelevant ? accentColor : MUTED);
      node.setAttribute('opacity', p.isRelevant ? p.opacity : p.opacity * 0.25);
    });
  }, [points, accentColor]);

  useEffect(() => {
    if (isReducedMotion) {
      renderFrame();
      return;
    }
    const tl = gsap.to(rotationRef.current, {
      value: Math.PI * 2,
      duration: rotationDuration,
      ease: 'none',
      repeat: -1,
      onUpdate: renderFrame,
    });
    return () => tl.kill();
  }, [rotationDuration, renderFrame, isReducedMotion]);

  const setNodeRef = useCallback((el, i) => {
    nodesRef.current[i] = el;
  }, []);

  return (
    <g ref={groupRef}>
      <circle cx={SPHERE.cx} cy={SPHERE.cy} r={SPHERE.r}
        fill="none" stroke={MUTED} strokeWidth={0.5} opacity={0.06} />
      {points.map((_, i) => (
        <rect key={i}
          ref={(el) => setNodeRef(el, i)}
          x={SPHERE.cx} y={SPHERE.cy}
          width={4} height={4} rx={0.5}
          fill={MUTED} opacity={0.01}
        />
      ))}
    </g>
  );
}

// ============================================================
// InputStreams — 좌측 6개 입력 스트림
// ============================================================

function InputStreams({ accentColor, isReducedMotion }) {
  const { inputLabelX, inputDotsX, inputPathStartX } = LAYOUT;
  const sphereEdgeX = SPHERE.cx - SPHERE.r;

  return (
    <g>
      <text x={inputLabelX} y={55} fill={MUTED}
        fontSize={9} fontFamily={FONT}
        letterSpacing="0.08em" opacity={0.5}>
        CODE
      </text>

      {INPUT_STREAMS.map((stream, i) => {
        const { label, y } = stream;
        const path = cleanBezier(inputPathStartX, y, sphereEdgeX, SPHERE.cy, { straightRatio: 0.7 });

        return (
          <g key={i}>
            <text x={inputLabelX} y={y + 4} fill={MUTED}
              fontSize={10} fontFamily={FONT} opacity={0.4}>
              {label}
            </text>

            {[0, 1, 2, 3].map((d) => (
              <rect key={d}
                x={inputDotsX + d * 12 - 2.5} y={y - 2.5}
                width={5} height={5} rx={0.5}
                fill={accentColor}
                opacity={0.12 + d * 0.06}
              />
            ))}

            <path d={path} fill="none" stroke={accentColor}
              strokeWidth={0.6} opacity={0.07} />

            {!isReducedMotion && (
              <>
                <rect x={-3} y={-3} width={6} height={6} rx={1} fill={accentColor}>
                  <animateMotion
                    dur="3.5s"
                    begin={`${i * 0.4}s`}
                    repeatCount="indefinite"
                    keyPoints="0;1"
                    keyTimes="0;1"
                    keySplines="0.4 0 0.2 1"
                    calcMode="spline"
                    rotate="auto"
                    path={path}
                  />
                  <animate
                    attributeName="opacity"
                    values="0;0.8;0.5;0"
                    keyTimes="0;0.08;0.6;1"
                    dur="3.5s"
                    begin={`${i * 0.4}s`}
                    repeatCount="indefinite"
                  />
                </rect>
                <rect x={-2} y={-2} width={4} height={4} rx={0.5} fill={accentColor}>
                  <animateMotion
                    dur="3.5s"
                    begin={`${i * 0.4 + 1.7}s`}
                    repeatCount="indefinite"
                    keyPoints="0;1"
                    keyTimes="0;1"
                    keySplines="0.4 0 0.2 1"
                    calcMode="spline"
                    rotate="auto"
                    path={path}
                  />
                  <animate
                    attributeName="opacity"
                    values="0;0.5;0.3;0"
                    keyTimes="0;0.1;0.6;1"
                    dur="3.5s"
                    begin={`${i * 0.4 + 1.7}s`}
                    repeatCount="indefinite"
                  />
                </rect>
              </>
            )}
          </g>
        );
      })}
    </g>
  );
}

// ============================================================
// OutputChannels — 우측 4개 출력 채널
// ============================================================

function OutputChannels({ accentColor, isReducedMotion }) {
  const sphereEdgeX = SPHERE.cx + SPHERE.r;
  const { outputEndX, outputLabelX } = LAYOUT;

  return (
    <g>
      <text x={outputLabelX} y={55} fill={MUTED}
        fontSize={9} fontFamily={FONT}
        letterSpacing="0.08em" opacity={0.5}>
        WORKING DESIGN
      </text>

      {OUTPUT_CHANNELS.map((channel, i) => {
        const { label, y } = channel;
        const path = cleanBezier(sphereEdgeX, SPHERE.cy, outputEndX, y, { straightRatio: 0.7 });

        return (
          <g key={i}>
            <path d={path} fill="none" stroke={accentColor}
              strokeWidth={0.6} opacity={0.07} />

            {!isReducedMotion && (
              <>
                <rect x={-3} y={-3} width={6} height={6} rx={1} fill={accentColor}>
                  <animateMotion
                    dur="3s"
                    begin={`${i * 0.55}s`}
                    repeatCount="indefinite"
                    keyPoints="0;1"
                    keyTimes="0;1"
                    keySplines="0.4 0 0.2 1"
                    calcMode="spline"
                    rotate="auto"
                    path={path}
                  />
                  <animate
                    attributeName="opacity"
                    values="0;0.7;0.6;0"
                    keyTimes="0;0.12;0.7;1"
                    dur="3s"
                    begin={`${i * 0.55}s`}
                    repeatCount="indefinite"
                  />
                </rect>
                <rect x={-2} y={-2} width={4} height={4} rx={0.5} fill={accentColor}>
                  <animateMotion
                    dur="3s"
                    begin={`${i * 0.55 + 1.5}s`}
                    repeatCount="indefinite"
                    keyPoints="0;1"
                    keyTimes="0;1"
                    keySplines="0.4 0 0.2 1"
                    calcMode="spline"
                    rotate="auto"
                    path={path}
                  />
                  <animate
                    attributeName="opacity"
                    values="0;0.4;0.3;0"
                    keyTimes="0;0.1;0.65;1"
                    dur="3s"
                    begin={`${i * 0.55 + 1.5}s`}
                    repeatCount="indefinite"
                  />
                </rect>
              </>
            )}

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

            <text x={outputLabelX + 18} y={y + 4} fill={MUTED}
              fontSize={10} fontFamily={FONT} opacity={0.6}>
              {label}
            </text>
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
 * 좌측 코드 조각(타이핑 리빌) → 중앙 3D 회전 구체 → 우측 디자인 산출물(UI 조립).
 * GSAP으로 구체 Y축 회전, SVG animateMotion으로 파티클 이동.
 *
 * @param {string} accentColor - 강조 색상 CSS 값 [Optional, 기본값: 'var(--vdl-200)']
 * @param {number} pointCount - 구체 노드 수 [Optional, 기본값: 120]
 * @param {number} rotationDuration - 구체 1회전 시간(초) [Optional, 기본값: 60]
 * @param {object} sx - 추가 MUI 스타일 [Optional]
 *
 * Example usage:
 * <ContextEngine />
 * <ContextEngine accentColor="var(--vdl-200)" sx={{ opacity: 0.5 }} />
 */
const ContextEngine = forwardRef(function ContextEngine({
  accentColor = ACCENT,
  pointCount = 120,
  rotationDuration = 60,
  sx,
}, ref) {
  const svgRef = useRef(null);
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
        ref={svgRef}
        viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block' }}
      >
        <InputStreams accentColor={accentColor} isReducedMotion={isReducedMotion} />
        <Sphere
          pointCount={pointCount}
          rotationDuration={rotationDuration}
          accentColor={accentColor}
          isReducedMotion={isReducedMotion}
        />
        <OutputChannels accentColor={accentColor} isReducedMotion={isReducedMotion} />
      </svg>
    </Box>
  );
});

export { ContextEngine };

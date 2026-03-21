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
// InputStreams — 좌측 6개 입력 스트림 + 타이핑 리빌
// ============================================================

// 타이핑 애니메이션 타이밍
const TYPE_SPEED = 200; // px/s
const TYPE_START = 0.5; // 첫 라벨 시작 딜레이
const TYPE_GAP = 0.3;   // 라벨 간 간격

// 각 라벨의 begin/dur 사전 계산
const INPUT_TIMINGS = (() => {
  let t = TYPE_START;
  return INPUT_STREAMS.map((s) => {
    const dur = s.w / TYPE_SPEED;
    const begin = t;
    t = begin + dur + TYPE_GAP;
    return { begin: +begin.toFixed(2), dur: +dur.toFixed(2) };
  });
})();

function InputStreams({ accentColor, isReducedMotion }) {
  const { inputLabelX, inputDotsX, inputPathStartX } = LAYOUT;
  const sphereEdgeX = SPHERE.cx - SPHERE.r;

  return (
    <g>
      {/* 타이핑 clipPath 정의 */}
      {!isReducedMotion && (
        <defs>
          {INPUT_STREAMS.map((stream, i) => {
            const { begin, dur } = INPUT_TIMINGS[i];
            return (
              <clipPath key={i} id={`ce-type-${i}`}>
                <rect x={inputLabelX - 2} y={stream.y - 14} width={0.01} height={28}>
                  <animate
                    attributeName="width"
                    from="0.01" to={stream.w + 4}
                    dur={`${dur}s`} begin={`${begin}s`}
                    fill="freeze"
                  />
                </rect>
              </clipPath>
            );
          })}
        </defs>
      )}

      <text x={inputLabelX} y={55} fill={MUTED}
        fontSize={9} fontFamily={FONT}
        letterSpacing="0.08em" opacity={0.5}>
        CODE
      </text>

      {INPUT_STREAMS.map((stream, i) => {
        const { label, y, w } = stream;
        const { begin, dur } = INPUT_TIMINGS[i];
        const path = cleanBezier(inputPathStartX, y, sphereEdgeX, SPHERE.cy, { straightRatio: 0.7 });

        return (
          <g key={i}>
            {/* 코드 라벨 — clipPath 타이핑 리빌 */}
            <g clipPath={isReducedMotion ? undefined : `url(#ce-type-${i})`}>
              <text x={inputLabelX} y={y + 4} fill={MUTED}
                fontSize={10} fontFamily={FONT} opacity={0.4}>
                {label}
              </text>
            </g>

            {/* 타이핑 커서 */}
            {!isReducedMotion && (
              <rect x={inputLabelX} y={y - 7} width={1.5} height={14}
                fill={accentColor} opacity={0.01}>
                <animate attributeName="x"
                  from={inputLabelX} to={inputLabelX + w}
                  dur={`${dur}s`} begin={`${begin}s`} fill="freeze" />
                <animate attributeName="opacity"
                  to="0.8" dur="0.05s" begin={`${begin}s`} fill="freeze" />
                <animate attributeName="opacity"
                  values="0.8;0.01;0.8" dur="0.8s"
                  begin={`${begin + dur}s`} repeatCount="indefinite" />
              </rect>
            )}

            {/* 스테이터스 인디케이터 */}
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

            {/* 흐르는 파티클 */}
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
// OutputChannels — 우측 4개 출력 채널 + UI 와이어프레임 조립
// ============================================================

// 와이어프레임 등장 타이밍 (입력 타이핑 완료 후)
const WIRE_START = 6.5;
const WIRE_STAGGER = 0.4;
const WIRE_DUR = 0.5;

// 와이어프레임 아이콘 — 각 출력 채널의 디자인 산출물 시각화
const WIREFRAME_ICONS = [
  // 컴포넌트 — 버튼 형태
  (wx, wy, c) => (
    <>
      <rect x={wx} y={wy - 5} width={18} height={10} rx={2}
        fill="none" stroke={c} strokeWidth={0.8} />
      <line x1={wx + 5} y1={wy} x2={wx + 13} y2={wy}
        stroke={c} strokeWidth={0.8} />
    </>
  ),
  // 레이아웃 — 2분할 그리드
  (wx, wy, c) => (
    <>
      <rect x={wx} y={wy - 7} width={8} height={14} rx={1}
        fill="none" stroke={c} strokeWidth={0.8} />
      <rect x={wx + 10} y={wy - 7} width={8} height={14} rx={1}
        fill="none" stroke={c} strokeWidth={0.8} />
    </>
  ),
  // 인터랙션 — rect + 모션 화살표
  (wx, wy, c) => (
    <>
      <rect x={wx} y={wy - 5} width={12} height={10} rx={1}
        fill="none" stroke={c} strokeWidth={0.8} />
      <line x1={wx + 14} y1={wy + 3} x2={wx + 18} y2={wy - 3}
        stroke={c} strokeWidth={0.8} />
      <polyline points={`${wx + 16},${wy - 3} ${wx + 18},${wy - 3} ${wx + 18},${wy - 1}`}
        fill="none" stroke={c} strokeWidth={0.8} />
    </>
  ),
  // 제품 — 스크린 아웃라인
  (wx, wy, c) => (
    <>
      <rect x={wx + 2} y={wy - 9} width={14} height={18} rx={2}
        fill="none" stroke={c} strokeWidth={0.8} />
      <line x1={wx + 7} y1={wy + 7} x2={wx + 11} y2={wy + 7}
        stroke={c} strokeWidth={0.6} />
    </>
  ),
];

function OutputChannels({ accentColor, isReducedMotion }) {
  const sphereEdgeX = SPHERE.cx + SPHERE.r;
  const { outputEndX, outputLabelX } = LAYOUT;
  const wireX = outputLabelX + 2;
  const labelX = outputLabelX + 26;

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
        const wireBegin = WIRE_START + i * WIRE_STAGGER;

        return (
          <g key={i}>
            {/* 가이드 패스 */}
            <path d={path} fill="none" stroke={accentColor}
              strokeWidth={0.6} opacity={0.07} />

            {/* 흐르는 파티클 */}
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

            {/* 엔드포인트 */}
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

            {/* UI 와이어프레임 아이콘 — 조립 애니메이션 */}
            <g opacity={isReducedMotion ? 0.6 : 0.01}>
              {!isReducedMotion && (
                <animate attributeName="opacity"
                  from="0.01" to="0.6"
                  dur={`${WIRE_DUR}s`} begin={`${wireBegin}s`}
                  fill="freeze" />
              )}
              {WIREFRAME_ICONS[i](wireX, y, accentColor)}
            </g>

            {/* 채널 라벨 */}
            <text x={labelX} y={y + 4} fill={MUTED}
              fontSize={10} fontFamily={FONT} opacity={isReducedMotion ? 0.6 : 0.01}>
              {!isReducedMotion && (
                <animate attributeName="opacity"
                  from="0.01" to="0.6"
                  dur={`${WIRE_DUR}s`} begin={`${wireBegin}s`}
                  fill="freeze" />
              )}
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

'use client';
import { forwardRef, useMemo, useSyncExternalStore } from 'react';
import Box from '@mui/material/Box';
import {
  VIEW, LAYOUT_V2, TYPING_PROMPTS, PROCESS_BARS, OUTPUT_CHANNELS_V2,
  TIMING, TYPING_TIMING, CYCLE, READOUTS, SCAN_LINES,
  ICON_PATHS, getLineY, buildStage1Paths, buildStage2Paths,
  buildTypingAnimation, buildParticleMotion,
} from './contextEngineV2Constants';

const ACCENT = 'var(--vdl-200)';
const CODE_FONT = "'IBM Plex Mono', monospace";

// prefers-reduced-motion 구독
const subscribeReducedMotion = (callback) => {
  const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
};
const getReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const getReducedMotionServer = () => false;

// ============================================================
// SvgDefs — 필터, 패턴, 그라디언트
// ============================================================

function SvgDefs({ accentColor }) {
  return (
    <defs>
      {/* 헥사 그리드 패턴 */}
      <pattern id="ceV2-hexGrid" width="28" height="48.5" patternUnits="userSpaceOnUse">
        <path
          d="M 14 0 L 28 8.08 L 28 24.25 L 14 32.33 L 0 24.25 L 0 8.08 Z M 14 48.5 L 28 40.42 L 28 56.58 L 14 64.67 L 0 56.58 L 0 40.42 Z"
          fill="none"
          stroke={accentColor}
          strokeWidth={0.3}
        />
      </pattern>

      {/* 출력 노드 글로우 필터 */}
      <filter id="ceV2-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
        <feColorMatrix in="blur" type="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.6 0" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* 파티클 소프트 도트 그라디언트 */}
      <radialGradient id="ceV2-particleGrad">
        <stop offset="0%" stopColor={accentColor} stopOpacity="0.9" />
        <stop offset="60%" stopColor={accentColor} stopOpacity="0.4" />
        <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

// ============================================================
// HexGridBackground
// ============================================================

function HexGridBackground({ isReducedMotion }) {
  return (
    <rect width={VIEW.w} height={VIEW.h} fill="url(#ceV2-hexGrid)" opacity={0.5}>
      {!isReducedMotion && (
        <animate
          attributeName="opacity"
          values="0.4;0.6;0.4"
          dur="6s"
          repeatCount="indefinite"
        />
      )}
    </rect>
  );
}

// ============================================================
// HorizontalScanLines
// ============================================================

function HorizontalScanLines({ accentColor, isReducedMotion }) {
  return (
    <g>
      {SCAN_LINES.map((y, i) => (
        <line key={i} x1={0} y1={y} x2={VIEW.w} y2={y}
          stroke={accentColor} strokeWidth={0.3} opacity={0.04}>
          {!isReducedMotion && (
            <animate
              attributeName="opacity"
              values="0.03;0.06;0.03"
              dur="8s"
              begin={`${i * 2}s`}
              repeatCount="indefinite"
            />
          )}
        </line>
      ))}
    </g>
  );
}

// ============================================================
// ConnectionPaths — 가이드 베지어 커브
// ============================================================

function ConnectionPaths({ accentColor, stage1Paths, stage2Paths }) {
  return (
    <g>
      {stage1Paths.map((p, i) => (
        <path key={`s1-${i}`} d={p.path}
          fill="none" stroke={accentColor}
          strokeWidth={0.7} opacity={0.07}
        />
      ))}
      {stage2Paths.map((p, i) => (
        <path key={`s2-${i}`} d={p.path}
          fill="none" stroke={accentColor}
          strokeWidth={0.7} opacity={0.07}
        />
      ))}
    </g>
  );
}

// ============================================================
// DataReadout — 장식용 모노스페이스 텍스트
// ============================================================

function DataReadout({ accentColor }) {
  return (
    <g>
      {READOUTS.map((r, i) => (
        <g key={i}>
          {r.lines.map((line, li) => (
            <text key={li}
              x={r.x} y={r.y + li * 10}
              fontFamily={CODE_FONT}
              fontSize={7}
              fill={accentColor}
              opacity={r.opacity}
            >
              {line}
            </text>
          ))}
        </g>
      ))}
    </g>
  );
}

// ============================================================
// PromptInput — 프롬프트 입력 컨테이너 (1개)
// 4줄의 타이핑 텍스트 + clipPath 리빌 + 커서
// ============================================================

function PromptInput({ accentColor, isReducedMotion }) {
  const { containerX, containerY, containerW, containerH } = LAYOUT_V2;
  const { fontSize, lineHeight, cursorBlinkDur } = TYPING_TIMING;
  const tc = CYCLE;
  const textX = containerX + 16;

  return (
    <g>
      {/* 컨테이너 외곽 */}
      <rect
        x={containerX} y={containerY}
        width={containerW} height={containerH}
        rx={4}
        fill="var(--vdl-900)"
        stroke={accentColor}
        strokeWidth={0.5}
        opacity={0.2}
      />

      {/* "Prompt" 라벨 */}
      <text
        x={containerX + 12} y={containerY + 16}
        fontFamily={CODE_FONT}
        fontSize={8}
        fill={accentColor}
        opacity={0.35}
        letterSpacing="1.5"
      >
        PROMPT
      </text>

      {/* 라벨 밑 구분선 */}
      <line
        x1={containerX + 8} y1={containerY + 24}
        x2={containerX + containerW - 8} y2={containerY + 24}
        stroke={accentColor}
        strokeWidth={0.3}
        opacity={0.15}
      />

      {/* 단일 프롬프트 */}
      {(() => {
        const prompt = TYPING_PROMPTS[0];
        const lineY = getLineY();

        if (isReducedMotion) {
          return (
            <text
              x={textX} y={lineY + 4}
              fontFamily={CODE_FONT} fontSize={fontSize}
              fill={accentColor} opacity={0.6}
            >
              {prompt.text}
            </text>
          );
        }

        const anim = buildTypingAnimation();
        const cursorValues = anim.values
          .split(';')
          .map((v) => Number(v) + textX)
          .join(';');

        return (
          <g>
            {/* clipPath for text reveal */}
            <clipPath id="typing-clip-0">
              <rect x={textX} y={lineY - lineHeight} width={0} height={lineHeight * 2}>
                <animate
                  attributeName="width"
                  values={anim.values}
                  keyTimes={anim.keyTimes}
                  dur={`${tc}s`}
                  repeatCount="indefinite"
                />
              </rect>
            </clipPath>

            {/* Prompt text (clipped) */}
            <text
              x={textX} y={lineY + 4}
              clipPath="url(#typing-clip-0)"
              fontFamily={CODE_FONT} fontSize={fontSize}
              fill={accentColor} opacity={0.6}
            >
              {prompt.text}
            </text>

            {/* Cursor */}
            <rect
              x={textX} y={lineY - lineHeight / 2}
              width={2} height={lineHeight}
              fill={accentColor}
            >
              <animate
                attributeName="x"
                values={cursorValues}
                keyTimes={anim.keyTimes}
                dur={`${tc}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.7;0.01;0.7"
                dur={`${cursorBlinkDur}s`}
                repeatCount="indefinite"
              />
            </rect>
          </g>
        );
      })()}
    </g>
  );
}

// ============================================================
// BarNode — 단일 바 노드 (가운데 프로세싱 레이어)
// ============================================================

const BAR_DEPTH_OPACITY = [0.8, 0.8, 0.75, 0.75, 0.7, 0.7, 0.65, 0.6, 0.55];

function BarNode({ bar, index, accentColor, isReducedMotion }) {
  const { barX } = LAYOUT_V2;
  const barH = 20;
  const barY = bar.y - barH / 2;
  const sqSize = 12;
  const sqX = barX + bar.w - sqSize - 6;
  const sqY = bar.y - sqSize / 2;
  const nodeOpacity = BAR_DEPTH_OPACITY[index];
  const glowDelay = index * 0.4;

  return (
    <g opacity={nodeOpacity}>
      {/* 바 배경 */}
      <rect
        x={barX} y={barY}
        width={bar.w} height={barH}
        fill="var(--vdl-800)"
        stroke={accentColor}
        strokeWidth={0.5}
        opacity={0.25}
      />

      {/* 라벨 텍스트 */}
      <text
        x={barX + 8}
        y={bar.y + 3.5}
        fontFamily={CODE_FONT}
        fontSize={9}
        fill={accentColor}
        opacity={0.6}
      >
        {bar.label}
      </text>

      {/* 정사각형 인디케이터 + 순차 glow */}
      <rect
        x={sqX} y={sqY}
        width={sqSize} height={sqSize}
        fill={accentColor}
        opacity={0.15}
      >
        {!isReducedMotion && (
          <animate
            attributeName="opacity"
            values="0.1;0.5;0.1"
            dur="2.5s"
            begin={`${glowDelay}s`}
            repeatCount="indefinite"
          />
        )}
      </rect>
      <rect
        x={sqX} y={sqY}
        width={sqSize} height={sqSize}
        fill="none"
        stroke={accentColor}
        strokeWidth={0.5}
        opacity={0.3}
      />
    </g>
  );
}

// ============================================================
// IconEmbed — 출력 노드 내부 lucide 아이콘
// ============================================================

function IconEmbed({ iconKey, cx, cy, accentColor }) {
  const iconData = ICON_PATHS[iconKey];
  if (!iconData) return null;

  // 24×24 아이콘을 16×16으로 축소
  const scale = 0.667;
  const tx = cx - 12 * scale;
  const ty = cy - 12 * scale;

  return (
    <g
      transform={`translate(${tx}, ${ty}) scale(${scale})`}
      stroke={accentColor}
      fill="none"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconData.map((el, i) => {
        if (el.tag === 'path') return <path key={i} d={el.d} />;
        if (el.tag === 'rect') return <rect key={i} {...el.attrs} />;
        if (el.tag === 'circle') return <circle key={i} {...el.attrs} />;
        return null;
      })}
    </g>
  );
}

// ============================================================
// OutputEndpoint — 단일 출력 엔드포인트 + 아이콘
// ============================================================

function OutputEndpoint({ channel, index, accentColor, isReducedMotion }) {
  const { outputX } = LAYOUT_V2;
  const cx = outputX;
  const cy = channel.y;
  const bracketSize = 24;
  const bracketLen = 6;

  return (
    <g>
      {/* 글로우 */}
      <rect
        x={cx - bracketSize} y={cy - bracketSize}
        width={bracketSize * 2} height={bracketSize * 2}
        fill={accentColor}
        opacity={0.03}
        filter="url(#ceV2-glow)"
      >
        {!isReducedMotion && (
          <animate
            attributeName="opacity"
            values="0.02;0.06;0.02"
            dur={`${TIMING.outputGlowDur}s`}
            begin={`${index * TIMING.outputGlowStagger}s`}
            repeatCount="indefinite"
          />
        )}
      </rect>

      {/* 외곽 rect */}
      <rect
        x={cx - 18} y={cy - 18}
        width={36} height={36}
        fill="none"
        stroke={accentColor}
        strokeWidth={0.5}
        opacity={0.3}
      />

      {/* 내부 rect (아이콘 배경) */}
      <rect
        x={cx - 10} y={cy - 10}
        width={20} height={20}
        fill={accentColor}
        opacity={0.15}
      >
        {!isReducedMotion && (
          <animate
            attributeName="opacity"
            values="0.1;0.2;0.1"
            dur={`${TIMING.outputPulseDur}s`}
            begin={`${index * TIMING.outputPulseStagger}s`}
            repeatCount="indefinite"
          />
        )}
      </rect>

      {/* 아이콘 */}
      <IconEmbed iconKey={channel.icon} cx={cx} cy={cy} accentColor={accentColor} />

      {/* 코너 브래킷 */}
      {[
        `M ${cx - bracketSize} ${cy - bracketSize + bracketLen} V ${cy - bracketSize} H ${cx - bracketSize + bracketLen}`,
        `M ${cx + bracketSize - bracketLen} ${cy - bracketSize} H ${cx + bracketSize} V ${cy - bracketSize + bracketLen}`,
        `M ${cx + bracketSize} ${cy + bracketSize - bracketLen} V ${cy + bracketSize} H ${cx + bracketSize - bracketLen}`,
        `M ${cx - bracketSize + bracketLen} ${cy + bracketSize} H ${cx - bracketSize} V ${cy + bracketSize - bracketLen}`,
      ].map((d, bi) => (
        <path key={bi} d={d}
          fill="none" stroke={accentColor}
          strokeWidth={0.5} opacity={0.25}
        />
      ))}

      {/* 스코어 텍스트 */}
      <text
        x={cx + bracketSize + 4}
        y={cy - bracketSize + 8}
        fontFamily={CODE_FONT}
        fontSize={8}
        fill={accentColor}
        opacity={0.35}
      >
        {channel.score}
      </text>

      {/* 라벨 */}
      <text
        x={cx}
        y={cy + bracketSize + 14}
        fontFamily={CODE_FONT}
        fontSize={9}
        fill={accentColor}
        opacity={0.4}
        textAnchor="middle"
      >
        {channel.label}
      </text>
    </g>
  );
}

// ============================================================
// ParticleSystem — 사이클 동기화 파티클
// 모든 파티클이 동일 dur(CYCLE)로 루프, keyTimes로 활성 구간 제어
// ============================================================

function ParticleSystem({ stage1Paths, stage2Paths }) {
  const tc = CYCLE;
  const particles = [];

  // Stage 1 파티클 (컨테이너→바, r=2, 경로당 2개)
  stage1Paths.forEach((p, pathIdx) => {
    for (let pi = 0; pi < 2; pi++) {
      const pm = buildParticleMotion(pathIdx + pi * 0.5, 1);
      particles.push(
        <circle key={`s1-${pathIdx}-${pi}`} r={2} fill="url(#ceV2-particleGrad)" opacity={0}>
          <animateMotion
            dur={`${tc}s`}
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
            dur={`${tc}s`}
            repeatCount="indefinite"
          />
        </circle>,
      );
    }
  });

  // Stage 2 파티클 (바→출력, r=3, 경로당 2개)
  stage2Paths.forEach((p, pathIdx) => {
    for (let pi = 0; pi < 2; pi++) {
      const pm = buildParticleMotion(pathIdx + pi * 0.5, 2);
      particles.push(
        <circle key={`s2-${pathIdx}-${pi}`} r={3} fill="url(#ceV2-particleGrad)" opacity={0}>
          <animateMotion
            dur={`${tc}s`}
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
            dur={`${tc}s`}
            repeatCount="indefinite"
          />
        </circle>,
      );
    }
  });

  return <g>{particles}</g>;
}

// ============================================================
// ContextEngineV2 — 메인 컴포넌트
// ============================================================

/**
 * ContextEngineV2 컴포넌트
 *
 * 3단계 파이프라인 SVG 시각화: 프롬프트 입력(1) → 바 노드(9) → 아이콘 엔드포인트(5).
 * 타이핑 완료 후 파티클이 순차 이동하는 동기화 흐름.
 * SVG SMIL 기반 타이핑 리빌, 파티클 모션, 글로우 필터, 헥사 그리드 배경.
 *
 * @param {string} accentColor - 강조 색상 CSS 값 [Optional, 기본값: 'var(--vdl-200)']
 * @param {object} sx - 추가 MUI 스타일 [Optional]
 *
 * Example usage:
 * <ContextEngineV2 />
 * <ContextEngineV2 accentColor="var(--vdl-200)" sx={{ opacity: 0.5 }} />
 */
const ContextEngineV2 = forwardRef(function ContextEngineV2({
  accentColor = ACCENT,
  sx,
}, ref) {
  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getReducedMotionServer,
  );

  const stage1Paths = useMemo(() => buildStage1Paths(), []);
  const stage2Paths = useMemo(() => buildStage2Paths(), []);

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        ...sx,
      }}
    >
      <svg
        viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMinYMid meet"
        style={{ display: 'block' }}
      >
        <SvgDefs accentColor={accentColor} />

        {/* Layer 0: Background — scan lines only */}
        <HorizontalScanLines accentColor={accentColor} isReducedMotion={isReducedMotion} />

        {/* Layer 1: Guide paths */}
        <ConnectionPaths accentColor={accentColor} stage1Paths={stage1Paths} stage2Paths={stage2Paths} />

        {/* Layer 2: Ambient data readouts */}
        <DataReadout accentColor={accentColor} />

        {/* Layer 3: Particles (synced to CYCLE) */}
        {!isReducedMotion && (
          <ParticleSystem stage1Paths={stage1Paths} stage2Paths={stage2Paths} />
        )}

        {/* Layer 4: Prompt input container (LEFT) */}
        <PromptInput accentColor={accentColor} isReducedMotion={isReducedMotion} />

        {/* Layer 5: Bar nodes (MIDDLE) */}
        <g>
          {PROCESS_BARS.map((bar, i) => (
            <BarNode key={i} bar={bar} index={i}
              accentColor={accentColor} isReducedMotion={isReducedMotion} />
          ))}
        </g>

        {/* Layer 6: Output endpoints with icons (RIGHT) */}
        <g>
          {OUTPUT_CHANNELS_V2.map((c, i) => (
            <OutputEndpoint key={i} channel={c} index={i}
              accentColor={accentColor} isReducedMotion={isReducedMotion} />
          ))}
        </g>
      </svg>
    </Box>
  );
});

export { ContextEngineV2 };

'use client';
import { forwardRef, useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FadeTransition from '../motion/FadeTransition';

/**
 * StickyNodeExplorer
 *
 * 스크롤 드리븐 노드 그래프 스토리텔링 컴포넌트.
 * 모바일: 상단 sticky 그래프 + 하단 스크롤 스텝 (단일 컬럼)
 * 데스크톱: 좌측 sticky 그래프 + 우측 스크롤 스텝 (2컬럼)
 *
 * @param {Array<{id,label,x,y,layer,isHighlight?}>} nodes - 전체 노드 [Required]
 * @param {Array<{source,target}>} edges - 전체 엣지 [Required]
 * @param {Array<{activeNodes,activeEdges,titleKo,bodyKo,callout?}>} steps - 스크롤 스텝 [Required]
 * @param {Object<string,string>} descriptions - 노드 ID → 설명 맵 [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 */

const CC_ORANGE = '#FF6B2C';
const CC_ORANGE_LIGHT = '#FF8F5C';

const LAYER_STROKE = {
  L1: 'var(--vdl-200)',
  L2: 'var(--vdl-400)',
  L3: 'var(--vdl-500)',
  L4: 'var(--vdl-600)',
};

const EDGE_STROKE = 'var(--vdl-700)';
const DIM_OPACITY = 0.12;
const PAST_OPACITY = 0.5;

const W = 720;
const H = 620;
const PAD = 48;
const NODE_R = 10;
const LABEL_SIZE = 13;

/* ── helpers ── */

function edgeKey(e) {
  const [s, t] = Array.isArray(e) ? e : [e.source, e.target];
  return `${s}→${t}`;
}

function buildActiveSet(step) {
  if (!step) return { nodes: new Set(), edges: new Set() };
  return {
    nodes: new Set(step.activeNodes),
    edges: new Set(step.activeEdges.map(edgeKey)),
  };
}

/* ── SVG sub-components ── */

function StickyEdge({ x1, y1, x2, y2, isActive, isPast, dashOffset }) {
  const opacity = isActive ? 1 : isPast ? PAST_OPACITY : DIM_OPACITY;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len === 0) return null;

  const r = NODE_R + 2;
  const sx = x1 + (dx / len) * r;
  const sy = y1 + (dy / len) * r;
  const ex = x2 - (dx / len) * r;
  const ey = y2 - (dy / len) * r;

  const mx = (sx + ex) / 2;
  const my = (sy + ey) / 2;
  const curveAmount = len > 100 ? 14 : 0;
  const nx = -dy / len;
  const ny = dx / len;
  const cx = mx + nx * curveAmount;
  const cy = my + ny * curveAmount;

  const pathD = curveAmount === 0
    ? `M${sx},${sy} L${ex},${ey}`
    : `M${sx},${sy} Q${cx},${cy} ${ex},${ey}`;

  const totalLen = len;

  return (
    <path
      d={pathD}
      fill="none"
      stroke={isActive ? CC_ORANGE : EDGE_STROKE}
      strokeWidth={isActive ? '1.5' : '1'}
      strokeLinecap="round"
      opacity={opacity}
      strokeDasharray={isActive ? totalLen : 'none'}
      strokeDashoffset={isActive ? dashOffset * totalLen : 0}
      style={{ transition: 'opacity 0.4s ease, stroke-dashoffset 0.6s ease-out, stroke 0.3s ease' }}
    />
  );
}

function StickyNode({ x, y, label, layer, isHighlight, isActive, isPast }) {
  const opacity = isActive ? 1 : isPast ? PAST_OPACITY : DIM_OPACITY;
  const stroke = isActive
    ? CC_ORANGE
    : isHighlight
      ? CC_ORANGE_LIGHT
      : (LAYER_STROKE[layer] || LAYER_STROKE.L2);
  const r = isActive ? NODE_R + 2 : NODE_R;
  const labelFill = isActive ? CC_ORANGE : isHighlight ? CC_ORANGE_LIGHT : 'var(--vdl-400)';

  return (
    <g
      opacity={opacity}
      style={{ transition: 'opacity 0.4s ease' }}
    >
      {/* glow */}
      {isActive && (
        <circle
          cx={x}
          cy={y}
          r={r + 8}
          fill={CC_ORANGE}
          opacity={0.12}
          style={{ transition: 'opacity 0.3s ease' }}
        >
          <animate
            attributeName="opacity"
            values="0.12;0.06;0.12"
            dur="2.4s"
            repeatCount="indefinite"
          />
        </circle>
      )}
      <circle
        cx={x}
        cy={y}
        r={r}
        fill="none"
        stroke={stroke}
        strokeWidth={isActive ? '2' : '1.5'}
        strokeLinecap="round"
        style={{ transition: 'r 0.3s ease, stroke 0.3s ease' }}
      />
      <text
        x={x}
        y={y + r + 16}
        textAnchor="middle"
        fill={labelFill}
        fontSize={LABEL_SIZE}
        fontFamily="var(--font-mono, 'IBM Plex Mono'), monospace"
        fontWeight={isActive ? '600' : '400'}
        style={{ transition: 'fill 0.3s ease' }}
      >
        {label}
      </text>
    </g>
  );
}

/* ── scroll step content ── */

function ScrollStep({ step, index, isActive, onInView }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onInView(index);
      },
      { threshold: 0.55, rootMargin: '-10% 0px -30% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index, onInView]);

  return (
    <Box
      ref={ref}
      sx={{
        minHeight: { xs: '50vh', md: '60vh' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        py: { xs: 4, md: 6 },
        opacity: isActive ? 1 : 0.3,
        transition: 'opacity 0.4s ease',
      }}
    >
      {/* step indicator */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
        <Box
          sx={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            border: '1.5px solid',
            borderColor: isActive ? CC_ORANGE : 'var(--vdl-600)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'border-color 0.3s ease',
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontFamily: 'var(--font-mono, "IBM Plex Mono"), monospace',
              color: isActive ? CC_ORANGE : 'text.secondary',
              fontWeight: 700,
              fontSize: '0.65rem',
              lineHeight: 1,
            }}
          >
            {index + 1}
          </Typography>
        </Box>
        {step.callout && (
          <Typography
            variant="code"
            sx={{
              color: isActive ? CC_ORANGE : 'text.secondary',
              fontSize: '0.75rem',
              transition: 'color 0.3s ease',
            }}
          >
            {step.callout.value} {step.callout.caption}
          </Typography>
        )}
      </Box>

      {/* title */}
      <Typography
        variant="h6"
        sx={{
          fontFamily: 'var(--font-mono, "IBM Plex Mono"), monospace',
          color: isActive ? 'text.primary' : 'text.secondary',
          fontWeight: 700,
          mb: 1.5,
          fontSize: { xs: '1rem', md: '1.5rem' },
          lineHeight: 1.4,
          transition: 'color 0.3s ease',
        }}
      >
        {step.titleKo}
      </Typography>

      {/* body */}
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          fontSize: { xs: '0.875rem', md: '1rem' },
          lineHeight: 1.8,
          maxWidth: 480,
        }}
      >
        {step.bodyKo}
      </Typography>
    </Box>
  );
}

/* ── main ── */

const StickyNodeExplorer = forwardRef(function StickyNodeExplorer(
  { nodes, edges, steps, descriptions, sx, ...props },
  ref,
) {
  const [activeStep, setActiveStep] = useState(0);
  const dashRef = useRef(1);
  const [dashOffset, setDashOffset] = useState(1);

  const onInView = useCallback((idx) => {
    setActiveStep(idx);
  }, []);

  // edge draw-in animation via dash offset
  useEffect(() => {
    dashRef.current = 1;
    setDashOffset(1);
    let raf;
    const start = performance.now();
    const dur = 600;
    function tick(now) {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - (1 - t) * (1 - t) * (1 - t); // easeOutCubic
      dashRef.current = 1 - eased;
      setDashOffset(dashRef.current);
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [activeStep]);

  const activeSet = useMemo(() => buildActiveSet(steps[activeStep]), [steps, activeStep]);
  const prevSet = useMemo(() => {
    if (activeStep === 0) return { nodes: new Set(), edges: new Set() };
    return buildActiveSet(steps[activeStep - 1]);
  }, [steps, activeStep]);

  if (!nodes || !steps || steps.length === 0) return null;

  // scaled positions
  const posMap = {};
  const scaledNodes = nodes.map((n) => {
    const px = PAD + n.x * (W - PAD * 2);
    const py = PAD + n.y * (H - PAD * 2);
    posMap[n.id] = { x: px, y: py };
    return { ...n, px, py };
  });

  const validEdges = edges.filter(
    (e) => posMap[e.source] && posMap[e.target],
  );

  const graphSvg = (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      fill="none"
      role="img"
      aria-label={`${nodes.length}개 노드의 관계 그래프 — Step ${activeStep + 1}/${steps.length}`}
      style={{ width: '100%', height: '100%' }}
    >
      {validEdges.map((e) => {
        const k = edgeKey(e);
        const isActive = activeSet.edges.has(k);
        const isPast = prevSet.edges.has(k);
        return (
          <StickyEdge
            key={k}
            x1={posMap[e.source].x}
            y1={posMap[e.source].y}
            x2={posMap[e.target].x}
            y2={posMap[e.target].y}
            isActive={isActive}
            isPast={isPast}
            dashOffset={isActive && !prevSet.edges.has(k) ? dashOffset : 0}
          />
        );
      })}
      {scaledNodes.map((n) => (
        <StickyNode
          key={n.id}
          x={n.px}
          y={n.py}
          label={n.label}
          layer={n.layer}
          isHighlight={n.isHighlight}
          isActive={activeSet.nodes.has(n.id)}
          isPast={prevSet.nodes.has(n.id)}
        />
      ))}
    </svg>
  );

  return (
    <FadeTransition isTriggerOnView direction="up" delay={200}>
      <Box ref={ref} sx={sx} {...props}>
        <Box
          sx={{
            display: { xs: 'block', md: 'grid' },
            gridTemplateColumns: { md: '1fr 1fr' },
            position: 'relative',
          }}
        >
          {/* Sticky graph — 모바일: 상단 고정, 데스크톱: 좌측 고정 */}
          <Box
            sx={{
              position: 'sticky',
              top: { xs: 0, md: 'calc(50vh - 310px)' },
              height: { xs: 280, md: H },
              alignSelf: { md: 'start' },
              zIndex: 1,
            }}
          >
            {graphSvg}
          </Box>

          {/* Scroll steps */}
          <Box sx={{ pl: { xs: 0, md: 4, lg: 6 } }}>
            {steps.map((step, i) => (
              <ScrollStep
                key={i}
                step={step}
                index={i}
                isActive={activeStep === i}
                onInView={onInView}
              />
            ))}
            {/* spacer for last step to have scroll room */}
            <Box sx={{ height: '30vh' }} />
          </Box>
        </Box>
      </Box>
    </FadeTransition>
  );
});

export { StickyNodeExplorer };

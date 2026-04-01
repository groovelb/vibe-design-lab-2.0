'use client';
import { forwardRef, useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FadeTransition from '../motion/FadeTransition';

/**
 * StickyNodeExplorer
 *
 * 스크롤 드리븐 노드 그래프 스토리텔링 컴포넌트.
 * 왼쪽: sticky 고정 SVG 노드 그래프 (점진적 노드/엣지 활성화)
 * 오른쪽: 스크롤 콘텐츠 스텝 (IntersectionObserver 기반)
 *
 * @param {Array<{id,label,x,y,layer,isHighlight?}>} nodes - 전체 노드 [Required]
 * @param {Array<{source,target}>} edges - 전체 엣지 [Required]
 * @param {Array<{activeNodes,activeEdges,titleKo,bodyKo,callout?}>} steps - 스크롤 스텝 [Required]
 * @param {Object<string,string>} descriptions - 노드 ID → 설명 맵 [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 */

const CC_ORANGE = '#FF6B2C';
const CC_ORANGE_LIGHT = '#FF8F5C';
const CC_ORANGE_MUTED = 'rgba(255, 107, 44, 0.10)';
const CC_ORANGE_STRONG = 'rgba(255, 107, 44, 0.18)';

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
        minHeight: { md: '60vh' },
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
          lineHeight: 1.5,
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
          lineHeight: 1.8,
          maxWidth: 400,
        }}
      >
        {step.bodyKo}
      </Typography>
    </Box>
  );
}

/* ── mobile step ── */

function MobileStep({ step, index, nodes, edges, activeSet, prevSet }) {
  return (
    <Box sx={{ mb: 4 }}>
      {/* mini inline graph */}
      <Box sx={{ mb: 2 }}>
        <svg
          viewBox={`0 0 ${W} ${H * 0.55}`}
          fill="none"
          style={{ width: '100%', maxWidth: 360 }}
        >
          {edges.map((e) => {
            const k = edgeKey(e);
            const isActive = activeSet.edges.has(k);
            const isPast = prevSet.edges.has(k);
            const s = nodes.find((n) => n.id === e.source);
            const t = nodes.find((n) => n.id === e.target);
            if (!s || !t) return null;
            const sx = PAD + s.x * (W - PAD * 2);
            const sy = PAD * 0.6 + s.y * (H * 0.55 - PAD * 1.2);
            const tx = PAD + t.x * (W - PAD * 2);
            const ty = PAD * 0.6 + t.y * (H * 0.55 - PAD * 1.2);
            return (
              <StickyEdge
                key={k}
                x1={sx} y1={sy} x2={tx} y2={ty}
                isActive={isActive} isPast={isPast} dashOffset={0}
              />
            );
          })}
          {nodes.map((n) => {
            const px = PAD + n.x * (W - PAD * 2);
            const py = PAD * 0.6 + n.y * (H * 0.55 - PAD * 1.2);
            return (
              <StickyNode
                key={n.id}
                x={px} y={py}
                label={n.label} layer={n.layer}
                isHighlight={n.isHighlight}
                isActive={activeSet.nodes.has(n.id)}
                isPast={prevSet.nodes.has(n.id)}
              />
            );
          })}
        </svg>
      </Box>

      {/* text */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <Box
          sx={{
            width: 20, height: 20, borderRadius: '50%',
            border: '1.5px solid', borderColor: CC_ORANGE,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontFamily: 'var(--font-mono, "IBM Plex Mono"), monospace',
              color: CC_ORANGE, fontWeight: 700, fontSize: '0.6rem', lineHeight: 1,
            }}
          >
            {index + 1}
          </Typography>
        </Box>
        {step.callout && (
          <Typography variant="code" sx={{ color: CC_ORANGE, fontSize: '0.7rem' }}>
            {step.callout.value} {step.callout.caption}
          </Typography>
        )}
      </Box>
      <Typography
        variant="body2"
        sx={{
          fontFamily: 'var(--font-mono, "IBM Plex Mono"), monospace',
          color: 'text.primary', fontWeight: 700, mb: 0.5,
        }}
      >
        {step.titleKo}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
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

  return (
    <FadeTransition isTriggerOnView direction="up" delay={200}>
      <Box ref={ref} sx={sx} {...props}>
        {/* ── Desktop: sticky 2-column ── */}
        <Box
          sx={{
            display: { xs: 'none', md: 'grid' },
            gridTemplateColumns: '1fr 1fr',
            gap: 0,
            position: 'relative',
          }}
        >
          {/* Left: sticky graph */}
          <Box
            sx={{
              position: 'sticky',
              top: 'calc(50vh - 310px)',
              height: H,
              alignSelf: 'start',
            }}
          >
            <svg
              viewBox={`0 0 ${W} ${H}`}
              fill="none"
              role="img"
              aria-label={`${nodes.length}개 노드의 관계 그래프 — Step ${activeStep + 1}/${steps.length}`}
              style={{ width: '100%', height: '100%' }}
            >
              {/* edges */}
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
              {/* nodes */}
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
          </Box>

          {/* Right: scroll steps */}
          <Box sx={{ pl: { md: 4, lg: 6 } }}>
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

        {/* ── Mobile: stacked ── */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          {steps.map((step, i) => {
            const stepActive = buildActiveSet(step);
            const stepPrev = i > 0 ? buildActiveSet(steps[i - 1]) : { nodes: new Set(), edges: new Set() };
            return (
              <MobileStep
                key={i}
                step={step}
                index={i}
                nodes={nodes}
                edges={edges}
                activeSet={stepActive}
                prevSet={stepPrev}
              />
            );
          })}
        </Box>
      </Box>
    </FadeTransition>
  );
});

export { StickyNodeExplorer };

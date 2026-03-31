'use client';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FadeTransition from '../motion/FadeTransition';

/**
 * MonolineDiagram
 *
 * 1px SVG monoline 다이어그램. 3가지 프리셋 variant를 제공한다.
 * - flow: QueryEngine 실행 루프 (Act 2)
 * - cycle: 감시 순환 (Act 3)
 * - timeline: 자율 진화 축 (Act 5)
 *
 * @param {'flow'|'cycle'|'timeline'} variant - 다이어그램 유형 [Required]
 * @param {object} sx - 추가 스타일 [Optional]
 */

const STROKE = 'var(--vdl-500)';
const STROKE_ACCENT = 'var(--vdl-200)';
const LABEL_FILL = 'var(--vdl-400)';
const LABEL_ACCENT = 'var(--vdl-200)';

/* ── 공통 마커 ── */
function Defs() {
  return (
    <defs>
      <marker
        id="ml-arrow"
        viewBox="0 0 6 6"
        refX="5"
        refY="3"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M0,0 L6,3 L0,6" fill="none" stroke={STROKE} strokeWidth="1" />
      </marker>
      <marker
        id="ml-arrow-accent"
        viewBox="0 0 6 6"
        refX="5"
        refY="3"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M0,0 L6,3 L0,6" fill="none" stroke={STROKE_ACCENT} strokeWidth="1" />
      </marker>
    </defs>
  );
}

/* ── 노드 원 + 라벨 ── */
function Node({ cx, cy, label, isAccent, labelY }) {
  const r = 4;
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={isAccent ? STROKE_ACCENT : STROKE}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <text
        x={cx}
        y={labelY ?? cy + 20}
        textAnchor="middle"
        fill={isAccent ? LABEL_ACCENT : LABEL_FILL}
        fontSize="11"
        fontFamily="var(--font-mono, 'IBM Plex Mono'), monospace"
      >
        {label}
      </text>
    </g>
  );
}

/* ── Flow Diagram (Act 2) ── */
function FlowDiagram() {
  // 입력 → QueryEngine → API → Tool Loop → 출력
  const nodes = [
    { cx: 60, cy: 60, label: '입력', isAccent: false },
    { cx: 200, cy: 60, label: 'QueryEngine', isAccent: true },
    { cx: 340, cy: 60, label: 'API', isAccent: false },
    { cx: 480, cy: 60, label: 'Tool Loop', isAccent: true },
    { cx: 620, cy: 60, label: '출력', isAccent: false },
  ];

  return (
    <svg
      viewBox="0 0 680 120"
      fill="none"
      role="img"
      aria-label="QueryEngine 실행 흐름: 입력에서 API, 도구 루프를 거쳐 출력"
    >
      <Defs />
      {/* 연결선 */}
      <line x1="68" y1="60" x2="192" y2="60" stroke={STROKE} strokeWidth="1" strokeLinecap="round" markerEnd="url(#ml-arrow)" />
      <line x1="208" y1="60" x2="332" y2="60" stroke={STROKE} strokeWidth="1" strokeLinecap="round" markerEnd="url(#ml-arrow)" />
      <line x1="348" y1="60" x2="472" y2="60" stroke={STROKE} strokeWidth="1" strokeLinecap="round" markerEnd="url(#ml-arrow)" />
      <line x1="488" y1="60" x2="612" y2="60" stroke={STROKE} strokeWidth="1" strokeLinecap="round" markerEnd="url(#ml-arrow)" />
      {/* Tool Loop 순환 화살표 */}
      <path
        d="M480,52 C480,30 340,30 340,52"
        stroke={STROKE_ACCENT}
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="4 4"
        fill="none"
        markerEnd="url(#ml-arrow-accent)"
      />
      <text
        x="410"
        y="28"
        textAnchor="middle"
        fill={LABEL_ACCENT}
        fontSize="9"
        fontFamily="var(--font-mono, 'IBM Plex Mono'), monospace"
      >
        반복
      </text>
      {/* 노드 */}
      {nodes.map((n) => (
        <Node key={n.label} {...n} labelY={90} />
      ))}
    </svg>
  );
}

/* ── Cycle Diagram (Act 3) ── */
function CycleDiagram() {
  // 6각형 순환: User → OTEL → BigQuery → GrowthBook → Flags → User
  const cx = 200;
  const cy = 140;
  const r = 100;
  const labels = ['사용자', 'OTEL', 'BigQuery', 'GrowthBook', 'Flags', '사용자'];
  const count = 6;
  const pts = labels.map((_, i) => {
    const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });

  return (
    <svg
      viewBox="0 0 400 280"
      fill="none"
      role="img"
      aria-label="감시 순환: 사용자 → OTEL → BigQuery → GrowthBook → Flags → 사용자"
    >
      <Defs />
      {/* 연결선 */}
      {pts.map((p, i) => {
        const next = pts[(i + 1) % count];
        // 살짝 안쪽 좌표 계산 (원 반지름 만큼 오프셋)
        const dx = next.x - p.x;
        const dy = next.y - p.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        const off = 8;
        return (
          <line
            key={i}
            x1={p.x + (dx / len) * off}
            y1={p.y + (dy / len) * off}
            x2={next.x - (dx / len) * off}
            y2={next.y - (dy / len) * off}
            stroke={i === 0 || i === count - 1 ? STROKE_ACCENT : STROKE}
            strokeWidth="1"
            strokeLinecap="round"
            markerEnd={i === 0 || i === count - 1 ? 'url(#ml-arrow-accent)' : 'url(#ml-arrow)'}
          />
        );
      })}
      {/* 노드 */}
      {pts.map((p, i) => (
        <Node
          key={i}
          cx={p.x}
          cy={p.y}
          label={labels[i]}
          isAccent={i === 0 || i === count - 1}
          labelY={p.y > cy ? p.y + 20 : p.y - 12}
        />
      ))}
    </svg>
  );
}

/* ── Timeline Diagram (Act 5) ── */
function TimelineDiagram() {
  const steps = ['수동', '예약', '반응', '능동', '상주', '자율'];
  const codes = ['cli_repl', 'Cron', 'Trigger', 'PROACTIVE', 'DAEMON', 'KAIROS'];
  const startX = 50;
  const gap = 100;
  const y = 40;

  return (
    <svg
      viewBox="0 0 620 90"
      fill="none"
      role="img"
      aria-label="자율 진화 축: 수동에서 자율까지 6단계"
    >
      <Defs />
      {/* 베이스 라인 */}
      <line
        x1={startX}
        y1={y}
        x2={startX + gap * (steps.length - 1)}
        y2={y}
        stroke={STROKE}
        strokeWidth="1"
        strokeLinecap="round"
      />
      {/* 노드 + 라벨 */}
      {steps.map((label, i) => {
        const x = startX + gap * i;
        const isLast = i === steps.length - 1;
        return (
          <g key={label}>
            <circle
              cx={x}
              cy={y}
              r={4}
              fill={isLast ? STROKE_ACCENT : 'none'}
              stroke={isLast ? STROKE_ACCENT : STROKE}
              strokeWidth="1"
            />
            <text
              x={x}
              y={y + 20}
              textAnchor="middle"
              fill={isLast ? LABEL_ACCENT : LABEL_FILL}
              fontSize="11"
              fontFamily="var(--font-mono, 'IBM Plex Mono'), monospace"
              fontWeight={isLast ? 600 : 400}
            >
              {label}
            </text>
            <text
              x={x}
              y={y + 34}
              textAnchor="middle"
              fill={LABEL_FILL}
              fontSize="9"
              fontFamily="var(--font-mono, 'IBM Plex Mono'), monospace"
              opacity="0.7"
            >
              {codes[i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ── 모바일 폴백 텍스트 ── */
const FALLBACK_TEXT = {
  flow: '입력 → QueryEngine → API → Tool Loop (반복) → 출력',
  cycle: '사용자 → OTEL → BigQuery → GrowthBook → Flags → 사용자',
  timeline: '수동 → 예약 → 반응 → 능동 → 상주 → 자율',
};

const VARIANT_MAP = {
  flow: FlowDiagram,
  cycle: CycleDiagram,
  timeline: TimelineDiagram,
};

const MonolineDiagram = forwardRef(function MonolineDiagram(
  { variant, sx, ...props },
  ref
) {
  const Diagram = VARIANT_MAP[variant];
  if (!Diagram) return null;

  return (
    <FadeTransition isTriggerOnView direction="up">
      <Box ref={ref} sx={sx} {...props}>
        {/* Desktop: SVG */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Diagram />
        </Box>
        {/* Mobile: 텍스트 폴백 */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <Typography
            variant="code"
            component="div"
            sx={{ color: 'text.secondary', fontSize: '0.75rem', lineHeight: 1.8 }}
          >
            {FALLBACK_TEXT[variant]}
          </Typography>
        </Box>
      </Box>
    </FadeTransition>
  );
});

export { MonolineDiagram };

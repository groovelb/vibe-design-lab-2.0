'use client';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import FadeTransition from '../motion/FadeTransition';

/**
 * IcebergMiniGraph
 *
 * graph-data.json 부분 집합을 렌더하는 미니 노드-엣지 그래프.
 * 좌표는 0–1 정규화된 값으로 전달받고, 캔버스 크기에 맞춰 스케일.
 *
 * @param {Array<{id,label,x,y,layer,isHighlight?}>} nodes - 표시할 노드 [Required]
 * @param {Array<{source,target}>} edges - 노드 간 연결선 [Required]
 * @param {object} sx - 추가 스타일 [Optional]
 */

const LAYER_STROKE = {
  L1: 'var(--vdl-200)',
  L2: 'var(--vdl-400)',
  L3: 'var(--vdl-500)',
  L4: 'var(--vdl-600)',
};
const HIGHLIGHT_STROKE = 'var(--vdl-200)';
const EDGE_STROKE = 'var(--vdl-700)';
const LABEL_FILL = 'var(--vdl-400)';
const LABEL_HIGHLIGHT = 'var(--vdl-200)';

const W = 400;
const H = 280;
const PAD = 30;

function GraphNode({ x, y, label, layer, isHighlight }) {
  const stroke = isHighlight ? HIGHLIGHT_STROKE : (LAYER_STROKE[layer] || LAYER_STROKE.L2);
  const fill = isHighlight ? LABEL_HIGHLIGHT : LABEL_FILL;
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={5}
        fill="none"
        stroke={stroke}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <text
        x={x}
        y={y + 18}
        textAnchor="middle"
        fill={fill}
        fontSize="10"
        fontFamily="var(--font-mono, 'IBM Plex Mono'), monospace"
      >
        {label}
      </text>
    </g>
  );
}

function GraphEdge({ x1, y1, x2, y2 }) {
  // quadratic bezier — 살짝 호를 넣는다
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  // 수직 오프셋 (짧은 선은 직선, 긴 선은 호)
  const curveAmount = len > 80 ? 12 : 0;
  const nx = -dy / len;
  const ny = dx / len;
  const cx = mx + nx * curveAmount;
  const cy = my + ny * curveAmount;

  // 원 반지름 오프셋
  const r = 7;
  const sx = x1 + (dx / len) * r;
  const sy = y1 + (dy / len) * r;
  const ex = x2 - (dx / len) * r;
  const ey = y2 - (dy / len) * r;

  if (curveAmount === 0) {
    return (
      <line
        x1={sx}
        y1={sy}
        x2={ex}
        y2={ey}
        stroke={EDGE_STROKE}
        strokeWidth="1"
        strokeLinecap="round"
      />
    );
  }

  return (
    <path
      d={`M${sx},${sy} Q${cx},${cy} ${ex},${ey}`}
      fill="none"
      stroke={EDGE_STROKE}
      strokeWidth="1"
      strokeLinecap="round"
    />
  );
}

const IcebergMiniGraph = forwardRef(function IcebergMiniGraph(
  { nodes, edges, sx, ...props },
  ref
) {
  if (!nodes || nodes.length === 0) return null;

  // 좌표 변환: 0–1 → 실제 px
  const posMap = {};
  const scaledNodes = nodes.map((n) => {
    const px = PAD + n.x * (W - PAD * 2);
    const py = PAD + n.y * (H - PAD * 2);
    posMap[n.id] = { x: px, y: py };
    return { ...n, px, py };
  });

  // 유효한 엣지만 필터
  const validEdges = edges.filter(
    (e) => posMap[e.source] && posMap[e.target]
  );

  return (
    <FadeTransition isTriggerOnView direction="up" delay={300}>
      <Box ref={ref} sx={sx} {...props}>
        {/* Desktop */}
        <Box sx={{ display: { xs: 'none', md: 'block' }, maxWidth: 480 }}>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            fill="none"
            role="img"
            aria-label={`${nodes.length}개 노드의 관계 그래프`}
          >
            {/* 엣지 먼저 (노드 아래) */}
            {validEdges.map((e) => (
              <GraphEdge
                key={`${e.source}-${e.target}`}
                x1={posMap[e.source].x}
                y1={posMap[e.source].y}
                x2={posMap[e.target].x}
                y2={posMap[e.target].y}
              />
            ))}
            {/* 노드 */}
            {scaledNodes.map((n) => (
              <GraphNode
                key={n.id}
                x={n.px}
                y={n.py}
                label={n.label}
                layer={n.layer}
                isHighlight={n.isHighlight}
              />
            ))}
          </svg>
        </Box>
        {/* Mobile: 주요 노드 리스트 */}
        <Box
          component="ul"
          sx={{
            display: { xs: 'block', md: 'none' },
            listStyle: 'none',
            p: 0,
            m: 0,
            fontFamily: 'var(--font-mono, "IBM Plex Mono"), monospace',
            fontSize: '0.75rem',
            color: 'text.secondary',
            lineHeight: 2,
          }}
        >
          {nodes
            .filter((n) => n.isHighlight)
            .map((n) => (
              <Box component="li" key={n.id}>
                {'· '}{n.label}
              </Box>
            ))}
        </Box>
      </Box>
    </FadeTransition>
  );
});

export { IcebergMiniGraph };

'use client';
import { forwardRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FadeTransition from '../motion/FadeTransition';

/**
 * IcebergMiniGraph
 *
 * graph-data.json 부분 집합을 렌더하는 미니 노드-엣지 그래프.
 * 좌표는 0–1 정규화된 값으로 전달받고, 캔버스 크기에 맞춰 스케일.
 *
 * @param {Array<{id,label,x,y,layer,isHighlight?}>} nodes - 표시할 노드 [Required]
 * @param {Array<{source,target}>} edges - 노드 간 연결선 [Required]
 * @param {Object<string,string>} descriptions - 노드 ID → 설명 맵. 있으면 인터랙티브 모드 [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 */

const LAYER_STROKE = {
  L1: 'var(--vdl-200)',
  L2: 'var(--vdl-400)',
  L3: 'var(--vdl-500)',
  L4: 'var(--vdl-600)',
};
const HIGHLIGHT_STROKE = '#FF6B2C';
const ACTIVE_STROKE = '#FF8F5C';
const EDGE_STROKE = 'var(--vdl-700)';
const LABEL_FILL = 'var(--vdl-400)';
const LABEL_HIGHLIGHT = '#FF6B2C';

const W = 400;
const H = 280;
const PAD = 30;

function GraphNode({ x, y, label, layer, isHighlight, id, isActive, isInteractive, onHover, onClick }) {
  const stroke = isActive
    ? ACTIVE_STROKE
    : isHighlight
      ? HIGHLIGHT_STROKE
      : (LAYER_STROKE[layer] || LAYER_STROKE.L2);
  const fill = isActive || isHighlight ? LABEL_HIGHLIGHT : LABEL_FILL;
  const r = isActive ? 7 : 5;

  return (
    <g
      style={isInteractive ? { cursor: 'pointer' } : undefined}
      onMouseEnter={isInteractive ? () => onHover(id) : undefined}
      onMouseLeave={isInteractive ? () => onHover(null) : undefined}
      onClick={isInteractive ? () => onClick(id) : undefined}
    >
      {/* 히트 영역 확장 (투명 원) */}
      {isInteractive && (
        <circle cx={x} cy={y} r={20} fill="transparent" />
      )}
      <circle
        cx={x}
        cy={y}
        r={r}
        fill="none"
        stroke={stroke}
        strokeWidth={isActive ? '1.5' : '1'}
        strokeLinecap="round"
      />
      <text
        x={x}
        y={y + 18}
        textAnchor="middle"
        fill={fill}
        fontSize="10"
        fontFamily="var(--font-mono, 'IBM Plex Mono'), monospace"
        fontWeight={isActive ? '600' : '400'}
      >
        {label}
      </text>
    </g>
  );
}

function GraphEdge({ x1, y1, x2, y2 }) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const curveAmount = len > 80 ? 12 : 0;
  const nx = -dy / len;
  const ny = dx / len;
  const cx = mx + nx * curveAmount;
  const cy = my + ny * curveAmount;

  const r = 7;
  const sx = x1 + (dx / len) * r;
  const sy = y1 + (dy / len) * r;
  const ex = x2 - (dx / len) * r;
  const ey = y2 - (dy / len) * r;

  if (curveAmount === 0) {
    return (
      <line
        x1={sx} y1={sy} x2={ex} y2={ey}
        stroke={EDGE_STROKE} strokeWidth="1" strokeLinecap="round"
      />
    );
  }

  return (
    <path
      d={`M${sx},${sy} Q${cx},${cy} ${ex},${ey}`}
      fill="none" stroke={EDGE_STROKE} strokeWidth="1" strokeLinecap="round"
    />
  );
}

const IcebergMiniGraph = forwardRef(function IcebergMiniGraph(
  { nodes, edges, descriptions, sx, ...props },
  ref
) {
  const [activeNode, setActiveNode] = useState(null);
  const isInteractive = Boolean(descriptions);

  if (!nodes || nodes.length === 0) return null;

  const posMap = {};
  const scaledNodes = nodes.map((n) => {
    const px = PAD + n.x * (W - PAD * 2);
    const py = PAD + n.y * (H - PAD * 2);
    posMap[n.id] = { x: px, y: py };
    return { ...n, px, py };
  });

  const validEdges = edges.filter(
    (e) => posMap[e.source] && posMap[e.target]
  );

  const activeDesc = activeNode && descriptions?.[activeNode];
  const activeLabel = activeNode && nodes.find((n) => n.id === activeNode)?.label;

  return (
    <FadeTransition isTriggerOnView direction="up" delay={300}>
      <Box ref={ref} sx={sx} {...props}>
        {/* Desktop */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            gap: 4,
            maxWidth: isInteractive ? 800 : 560,
            mx: 'auto',
            alignItems: 'flex-start',
          }}
        >
          <Box sx={{ flex: isInteractive ? '0 0 400px' : '1 1 auto' }}>
            <svg
              viewBox={`0 0 ${W} ${H}`}
              fill="none"
              role="img"
              aria-label={`${nodes.length}개 노드의 관계 그래프`}
            >
              {validEdges.map((e) => (
                <GraphEdge
                  key={`${e.source}-${e.target}`}
                  x1={posMap[e.source].x} y1={posMap[e.source].y}
                  x2={posMap[e.target].x} y2={posMap[e.target].y}
                />
              ))}
              {scaledNodes.map((n) => (
                <GraphNode
                  key={n.id}
                  id={n.id}
                  x={n.px}
                  y={n.py}
                  label={n.label}
                  layer={n.layer}
                  isHighlight={n.isHighlight}
                  isActive={activeNode === n.id}
                  isInteractive={isInteractive}
                  onHover={setActiveNode}
                  onClick={setActiveNode}
                />
              ))}
            </svg>
          </Box>

          {/* 인터랙티브 디테일 패널 */}
          {isInteractive && (
            <Box
              sx={{
                flex: 1,
                minHeight: 120,
                p: 2,
                bgcolor: activeDesc ? 'action.hover' : 'transparent',
                transition: 'background-color 0.15s',
              }}
            >
              {activeDesc ? (
                <>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: 'var(--font-mono, "IBM Plex Mono"), monospace',
                      fontWeight: 600,
                      color: 'text.primary',
                      mb: 1,
                    }}
                  >
                    {activeLabel}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {activeDesc}
                  </Typography>
                </>
              ) : (
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  노드를 hover하면 설명이 표시됩니다.
                </Typography>
              )}
            </Box>
          )}
        </Box>

        {/* Mobile: 노드 리스트 */}
        <Box
          component="ul"
          sx={{
            display: { xs: 'block', md: 'none' },
            listStyle: 'none',
            p: 0,
            m: 0,
          }}
        >
          {nodes.map((n) => (
            <Box
              component="li"
              key={n.id}
              sx={{
                py: 1,
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontFamily: 'var(--font-mono, "IBM Plex Mono"), monospace',
                  color: n.isHighlight ? 'text.primary' : 'text.secondary',
                  fontWeight: n.isHighlight ? 600 : 400,
                }}
              >
                {n.label}
              </Typography>
              {descriptions?.[n.id] && (
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {descriptions[n.id]}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </FadeTransition>
  );
});

export { IcebergMiniGraph };

'use client';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IcebergSection } from '../container/IcebergSection';
import { DataCallout } from '../data-display/DataCallout';
import { RevealCard } from '../card/RevealCard';
import { ACTS, CALLOUTS, REVEALS, DUAL_BUILD_COMPARISON, TOOL_GRID, CC } from '@/data/claudeCodeExperimentData';

const act = ACTS[0];

/**
 * ToolColumn — 도구 목록 컬럼 (hover 인터랙션)
 *
 * @param {Array<{name,desc}>} tools - 도구 배열 [Required]
 * @param {string} header - 컬럼 헤더 [Required]
 * @param {boolean} isHidden - 비공개 도구 컬럼 여부 [Optional]
 * @param {{name,desc}|null} hoveredTool - 현재 hover 중인 도구 [Required]
 * @param {function} onHover - hover 콜백 [Required]
 */
function ToolColumn({ tools, header, isHidden, hoveredTool, onHover }) {
  return (
    <Box>
      <Box
        sx={{
          py: 2,
          px: 3,
          borderBottom: '2px solid',
          borderColor: isHidden ? CC.orange : 'text.primary',
          bgcolor: isHidden ? CC.orangeMuted : 'transparent',
        }}
      >
        <Typography
          variant="overline"
          sx={{ color: isHidden ? CC.orange : 'text.primary' }}
        >
          {header}
        </Typography>
      </Box>
      {tools.map((tool) => {
        const isActive = hoveredTool?.name === tool.name;
        return (
          <Box
            key={tool.name}
            onMouseEnter={() => onHover(tool)}
            onMouseLeave={() => onHover(null)}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              py: 1.5,
              px: 3,
              borderBottom: '1px solid',
              borderColor: 'divider',
              cursor: 'default',
              bgcolor: isActive
                ? (isHidden ? CC.orangeMuted : 'action.hover')
                : 'transparent',
              transition: 'background-color 0.15s',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontFamily: 'var(--font-mono, "IBM Plex Mono"), monospace',
                color: isActive
                  ? (isHidden ? CC.orange : 'text.primary')
                  : (isHidden ? 'text.secondary' : 'text.primary'),
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {tool.name}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                display: { xs: 'none', sm: 'block' },
                textAlign: 'right',
                maxWidth: 200,
              }}
            >
              {tool.desc}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

/**
 * ClaudeCodeSurface
 *
 * § 1. Act 1 — 이중 빌드. 도구 테이블 + 비교 블록.
 */
export function ClaudeCodeSurface() {
  const [hoveredTool, setHoveredTool] = useState(null);

  return (
    <IcebergSection
      depth="shallow"
      density="standard"
      overline="Act 1 · 이중 빌드"
      tagline={act.tagline}
      transition={act.transition}
    >
      {/* 핵심 수치 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
          gap: { xs: 2, md: 3 },
          mb: { xs: 5, md: 8 },
        }}
      >
        {CALLOUTS[1].map((c, i) => (
          <DataCallout
            key={c.caption}
            value={c.value}
            caption={c.caption}
            variant={i === 0 ? 'hero' : 'accent'}
          />
        ))}
      </Box>

      {/* 42개 도구 테이블 — 공개/비공개 2컬럼 */}
      <Box sx={{ mb: { xs: 5, md: 8 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 0, md: 3 },
          }}
        >
          <ToolColumn
            tools={TOOL_GRID.public}
            header="공개 — 16개"
            hoveredTool={hoveredTool}
            onHover={setHoveredTool}
          />
          <ToolColumn
            tools={TOOL_GRID.hidden}
            header="비공개 — 26개"
            isHidden
            hoveredTool={hoveredTool}
            onHover={setHoveredTool}
          />
        </Box>

        {/* 모바일: hover 설명 패널 */}
        <Box
          sx={{
            display: { xs: 'block', sm: 'none' },
            minHeight: 48,
            mt: 2,
            p: hoveredTool ? 3 : 0,
            bgcolor: hoveredTool ? CC.orangeMuted : 'transparent',
            transition: 'all 0.15s',
          }}
        >
          {hoveredTool && (
            <>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: 'var(--font-mono, "IBM Plex Mono"), monospace',
                  fontWeight: 600,
                  color: CC.orange,
                }}
              >
                {hoveredTool.name}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {hoveredTool.desc}
              </Typography>
            </>
          )}
        </Box>
      </Box>

      {/* 이중 빌드 비교 — 2컬럼 그리드 카드 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: { xs: 2, md: 3 },
          mb: { xs: 5, md: 8 },
        }}
      >
        {[DUAL_BUILD_COMPARISON.external, DUAL_BUILD_COMPARISON.internal].map(
          (side, i) => (
            <Box
              key={side.label}
              sx={{
                p: { xs: 3, md: 4 },
                bgcolor: i === 1 ? CC.orangeMuted : 'action.hover',
                borderTop: i === 1 ? `3px solid ${CC.orange}` : '3px solid transparent',
              }}
            >
              <Typography
                variant="overline"
                sx={{
                  color: i === 1 ? CC.orange : 'text.secondary',
                  display: 'block',
                  mb: 3,
                }}
              >
                {side.label}
              </Typography>
              {side.items.map((item) => (
                <Box
                  key={item.metric}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    py: 1.5,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {item.metric}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: 'var(--font-mono, "IBM Plex Mono"), monospace',
                      fontWeight: 600,
                      color: i === 1 ? CC.orangeLight : 'text.primary',
                    }}
                  >
                    {item.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          ),
        )}
      </Box>

      {/* 인용 블록 */}
      <Box sx={{ maxWidth: 800, mx: 'auto', py: { xs: 4, md: 6 }, mb: { xs: 5, md: 8 } }}>
        <Typography
          variant="h4"
          sx={{ color: CC.orange, fontWeight: 700, mb: 3 }}
        >
          {'\u201C'}{act.pullQuote}{'\u201D'}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', lineHeight: 1.8 }}
        >
          {act.description}
        </Typography>
      </Box>

      {/* Reveals — 2컬럼 그리드 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: { xs: 0, md: 3 },
        }}
      >
        {REVEALS[1].map((r) => (
          <RevealCard
            key={r.id}
            title={r.titleKo}
            description={r.descriptionKo}
            quote={r.quote}
            surpriseLevel={r.surpriseLevel}
          />
        ))}
      </Box>
    </IcebergSection>
  );
}

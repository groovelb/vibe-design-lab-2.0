'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IcebergSection } from '../container/IcebergSection';
import { DataCallout } from '../data-display/DataCallout';
import { RevealCard } from '../card/RevealCard';
import { IcebergMiniGraph } from '../data-display/IcebergMiniGraph';
import { ACTS, CALLOUTS, REVEALS, MINI_GRAPHS, PROTOCOL_DIALOGUE, NODE_DESCRIPTIONS, CC } from '@/data/claudeCodeExperimentData';

const act = ACTS[3];

const ROLE_STYLES = {
  leader: { color: 'text.secondary', prefix: '→', bg: 'transparent' },
  teammate: { color: CC.orange, prefix: '←', bg: CC.orangeMuted },
};

/**
 * ClaudeCodeLegion
 *
 * § 4. Act 4 — 거부하는 기계. 프로토콜 대화 형식.
 */
export function ClaudeCodeLegion() {
  return (
    <IcebergSection
      depth="abyss"
      density="breathe"
      overline="Act 4 · 거부하는 기계"
      tagline={act.tagline}
      transition={act.transition}
    >
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

      {/* 콜아웃 + 프로토콜 대화 — 2컬럼 그리드 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: { xs: 3, md: 4 },
          mb: { xs: 5, md: 8 },
        }}
      >
        {/* 왼쪽: 콜아웃 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, md: 3 } }}>
          {CALLOUTS[4].map((c, i) => (
            <DataCallout key={c.caption} value={c.value} caption={c.caption} variant={i === 1 ? 'hero' : 'accent'} />
          ))}
        </Box>

        {/* 오른쪽: 프로토콜 대화 */}
        <Box
          sx={{
            bgcolor: CC.blackCard,
            p: { xs: 3, md: 4 },
          }}
        >
          <Typography
            variant="overline"
            sx={{ color: CC.orange, display: 'block', mb: 3 }}
          >
            Shutdown Protocol
          </Typography>
          {PROTOCOL_DIALOGUE.map((line, i) => {
            const style = ROLE_STYLES[line.role];
            return (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  gap: 2,
                  py: 2,
                  px: 2,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  alignItems: 'baseline',
                  bgcolor: style.bg,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: line.role === 'teammate' ? CC.orangeLight : 'text.secondary',
                    minWidth: 64,
                    flexShrink: 0,
                  }}
                >
                  {line.label}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: 'var(--font-mono, "IBM Plex Mono"), monospace',
                    color: style.color,
                    fontWeight: line.role === 'teammate' ? 600 : 400,
                  }}
                >
                  {style.prefix} {line.message}
                </Typography>
              </Box>
            );
          })}
          <Typography
            variant="body2"
            sx={{
              color: CC.orangeLight,
              mt: 3,
              pt: 2,
              textAlign: 'center',
              fontStyle: 'italic',
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            {'\u201C'}명령-복종이 아니라 요청-협상. 거부권이 있는 도구는 도구가 아니다.{'\u201D'}
          </Typography>
        </Box>
      </Box>

      <IcebergMiniGraph
        nodes={MINI_GRAPHS[4].nodes}
        edges={MINI_GRAPHS[4].edges}
        descriptions={NODE_DESCRIPTIONS[4]}
        sx={{ mb: { xs: 5, md: 8 } }}
      />

      {/* Reveals — 2컬럼 그리드 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: { xs: 0, md: 3 },
        }}
      >
        {REVEALS[4].map((r, i) => (
          <RevealCard
            key={r.id}
            title={r.titleKo}
            description={r.descriptionKo}
            quote={r.quote}
            surpriseLevel={r.surpriseLevel}
            delay={200 + i * 100}
          />
        ))}
      </Box>
    </IcebergSection>
  );
}

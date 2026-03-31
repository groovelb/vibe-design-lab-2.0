'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IcebergSection } from '../container/IcebergSection';
import { DataCallout } from '../data-display/DataCallout';
import { RevealCard } from '../card/RevealCard';
import { IcebergMiniGraph } from '../data-display/IcebergMiniGraph';
import { ACTS, CALLOUTS, REVEALS, MINI_GRAPHS } from '@/data/claudeCodeExperimentData';

const act = ACTS[3];

/**
 * ClaudeCodeLegion
 *
 * § 4. Act 4 — 멀티에이전트.
 */
export function ClaudeCodeLegion() {
  return (
    <IcebergSection
      depth="abyss"
      overline="Act 4 · Orchestration"
      tagline={act.tagline}
      transition={act.transition}
    >
      <Typography
        variant="body1"
        sx={{ color: 'text.secondary', maxWidth: 640, mb: { xs: 4, md: 6 } }}
      >
        {act.description}
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
          gap: { xs: 2, md: 4 },
          mb: { xs: 4, md: 6 },
        }}
      >
        {CALLOUTS[4].map((c) => (
          <DataCallout key={c.caption} value={c.value} caption={c.caption} />
        ))}
      </Box>

      {/* 인용 */}
      <Box sx={{ mb: { xs: 4, md: 6 } }}>
        <Typography
          variant="h3"
          component="div"
          sx={{
            fontFamily: 'var(--font-mono, "IBM Plex Mono"), monospace',
            fontWeight: 500,
            color: 'text.primary',
          }}
        >
          shutdown_rejected
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1.5 }}>
          팀메이트는 리더의 셧다운 요청을 거부할 수 있다. 작업이 끝나지 않았으면 강제 종료되지 않는다.
        </Typography>
      </Box>

      <IcebergMiniGraph
        nodes={MINI_GRAPHS[4].nodes}
        edges={MINI_GRAPHS[4].edges}
        sx={{ mb: { xs: 4, md: 6 } }}
      />

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
    </IcebergSection>
  );
}

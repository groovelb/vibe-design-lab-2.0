'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IcebergSection } from '../container/IcebergSection';
import { DataCallout } from '../data-display/DataCallout';
import { RevealCard } from '../card/RevealCard';
import { MonolineDiagram } from '../data-display/MonolineDiagram';
import { IcebergMiniGraph } from '../data-display/IcebergMiniGraph';
import { ACTS, CALLOUTS, REVEALS, MINI_GRAPHS } from '@/data/claudeCodeExperimentData';

const act = ACTS[2];

/**
 * ClaudeCodeControl
 *
 * § 3. Act 3 — 텔레메트리와 피처 플래그.
 */
export function ClaudeCodeControl() {
  return (
    <IcebergSection
      depth="deep"
      overline="Act 3 · Control"
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
        {CALLOUTS[3].map((c) => (
          <DataCallout key={c.caption} value={c.value} caption={c.caption} />
        ))}
      </Box>

      <MonolineDiagram variant="cycle" sx={{ mb: { xs: 4, md: 6 } }} />

      <IcebergMiniGraph
        nodes={MINI_GRAPHS[3].nodes}
        edges={MINI_GRAPHS[3].edges}
        sx={{ mb: { xs: 4, md: 6 } }}
      />

      {REVEALS[3].map((r, i) => (
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

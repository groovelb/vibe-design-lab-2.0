'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IcebergSection } from '../container/IcebergSection';
import { DataCallout } from '../data-display/DataCallout';
import { RevealCard } from '../card/RevealCard';
import { ACTS, CALLOUTS, REVEALS } from '@/data/claudeCodeExperimentData';

const act = ACTS[0];

/**
 * ClaudeCodeSurface
 *
 * § 1. Act 1 — 공개된 도구.
 */
export function ClaudeCodeSurface() {
  return (
    <IcebergSection
      depth="shallow"
      overline="Act 1 · Surface"
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
        {CALLOUTS[1].map((c) => (
          <DataCallout key={c.caption} value={c.value} caption={c.caption} />
        ))}
      </Box>

      {REVEALS[1].map((r) => (
        <RevealCard
          key={r.id}
          title={r.titleKo}
          description={r.descriptionKo}
          quote={r.quote}
          surpriseLevel={r.surpriseLevel}
        />
      ))}
    </IcebergSection>
  );
}

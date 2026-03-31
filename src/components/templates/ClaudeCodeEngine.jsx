'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IcebergSection } from '../container/IcebergSection';
import { DataCallout } from '../data-display/DataCallout';
import { RevealCard } from '../card/RevealCard';
import { MonolineDiagram } from '../data-display/MonolineDiagram';
import { IcebergMiniGraph } from '../data-display/IcebergMiniGraph';
import { ACTS, CALLOUTS, REVEALS, MINI_GRAPHS } from '@/data/claudeCodeExperimentData';

const act = ACTS[1];

/**
 * ClaudeCodeEngine
 *
 * § 2. Act 2 — QueryEngine.
 */
export function ClaudeCodeEngine() {
  return (
    <IcebergSection
      depth="mid"
      overline="Act 2 · Engine"
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
        {CALLOUTS[2].map((c) => (
          <DataCallout
            key={c.caption}
            value={c.value}
            caption={c.caption}
            variant="accent"
          />
        ))}
      </Box>

      {/* 코드 시그니처 */}
      <Box sx={{ mb: { xs: 4, md: 6 } }}>
        <Typography variant="code" component="div" sx={{ color: 'text.primary' }}>
          {'async *submitMessage(userMessage): AsyncGenerator<Event>'}
        </Typography>
        <Typography variant="caption" component="div" sx={{ color: 'text.secondary', mt: 1 }}>
          QueryEngine.submitMessage() — 모든 대화가 통과하는 1,297줄 AsyncGenerator.
        </Typography>
      </Box>

      <MonolineDiagram variant="flow" sx={{ mb: { xs: 4, md: 6 } }} />

      <IcebergMiniGraph
        nodes={MINI_GRAPHS[2].nodes}
        edges={MINI_GRAPHS[2].edges}
        sx={{ mb: { xs: 4, md: 6 } }}
      />

      {REVEALS[2].map((r, i) => (
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

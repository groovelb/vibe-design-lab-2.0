'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IcebergSection } from '../container/IcebergSection';
import { DataCallout } from '../data-display/DataCallout';
import { RevealCard } from '../card/RevealCard';
import { MonolineDiagram } from '../data-display/MonolineDiagram';
import { IcebergMiniGraph } from '../data-display/IcebergMiniGraph';
import {
  ACTS, CALLOUTS, REVEALS, MINI_GRAPHS,
  SUBMIT_MESSAGE_STEPS, NODE_DESCRIPTIONS, CC,
} from '@/data/claudeCodeExperimentData';

const act = ACTS[1];

/**
 * ClaudeCodeEngine
 *
 * § 2. Act 2 — 단일 관문. submitMessage() 코드 시각화 + 인터랙티브 그래프.
 */
export function ClaudeCodeEngine() {
  return (
    <IcebergSection
      depth="mid"
      density="tight"
      overline="Act 2 · 단일 관문"
      tagline={act.tagline}
      transition={act.transition}
    >
      {/* submitMessage() 코드 시각화 — 2컬럼 그리드 카드 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: { xs: 2, md: 3 },
          mb: { xs: 5, md: 8 },
        }}
      >
        {/* 코드 블록 */}
        <Box
          sx={{
            bgcolor: CC.blackCard,
            borderTop: `3px solid ${CC.orange}`,
            p: { xs: 3, md: 4 },
          }}
        >
          <Typography
            variant="code"
            component="div"
            sx={{ color: CC.orange, mb: 2 }}
          >
            {'async *submitMessage(userMessage) {'}
          </Typography>
          {SUBMIT_MESSAGE_STEPS.map((step, i) => (
            <Box
              key={i}
              sx={{
                py: 1.5,
                pl: { xs: 2, md: 3 },
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography variant="code" sx={{ color: 'text.primary' }}>
                {step.line}
              </Typography>
              <Typography
                variant="caption"
                component="div"
                sx={{ color: CC.orangeLight, mt: 0.5 }}
              >
                {'// '}{step.desc}
              </Typography>
            </Box>
          ))}
          <Typography
            variant="code"
            component="div"
            sx={{ color: CC.orange, mt: 2 }}
          >
            {'}'}
          </Typography>
        </Box>

        {/* 설명 + 콜아웃 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, md: 3 } }}>
          <Box sx={{ py: { xs: 3, md: 4 } }}>
            <Typography
              variant="h5"
              sx={{ color: CC.orange, fontWeight: 700, mb: 2 }}
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
          {CALLOUTS[2].map((c, i) => (
            <DataCallout
              key={c.caption}
              value={c.value}
              caption={c.caption}
              variant={i === 1 ? 'hero' : 'accent'}
            />
          ))}
        </Box>
      </Box>

      <MonolineDiagram variant="flow" sx={{ mb: { xs: 4, md: 6 } }} />

      <IcebergMiniGraph
        nodes={MINI_GRAPHS[2].nodes}
        edges={MINI_GRAPHS[2].edges}
        descriptions={NODE_DESCRIPTIONS[2]}
        sx={{ mb: { xs: 4, md: 6 } }}
      />

      {/* Reveals — 2컬럼 그리드 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: { xs: 0, md: 3 },
        }}
      >
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
      </Box>
    </IcebergSection>
  );
}

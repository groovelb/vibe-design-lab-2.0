'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IcebergSection } from '../container/IcebergSection';
import { DataCallout } from '../data-display/DataCallout';
import { RevealCard } from '../card/RevealCard';
import { MonolineDiagram } from '../data-display/MonolineDiagram';
import { IcebergMiniGraph } from '../data-display/IcebergMiniGraph';
import { ACTS, CALLOUTS, REVEALS, MINI_GRAPHS, SUB_KEYWORDS, NODE_DESCRIPTIONS, CC } from '@/data/claudeCodeExperimentData';

const act = ACTS[2];
const subKeywords = SUB_KEYWORDS[3];

/**
 * ClaudeCodeControl
 *
 * § 3. Act 3 — 단방향 거울 + 보이지 않는 전쟁 + 원격 조종석.
 */
export function ClaudeCodeControl() {
  return (
    <IcebergSection
      depth="deep"
      density="tight"
      overline="Act 3 · 단방향 거울"
      tagline={act.tagline}
      transition={act.transition}
    >
      {/* 서브 키워드 — 3컬럼 그리드 카드 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: { xs: 2, md: 3 },
          mb: { xs: 5, md: 8 },
        }}
      >
        {subKeywords.map((sub) => (
          <Box
            key={sub.keyword}
            sx={{
              p: { xs: 3, md: 4 },
              bgcolor: CC.blackCard,
            }}
          >
            <Typography
              variant="overline"
              sx={{ color: CC.orangeLight, display: 'block', mb: 1.5 }}
            >
              {sub.titleEn}
            </Typography>
            <Typography
              variant="h5"
              component="h3"
              sx={{ color: 'text.primary', fontWeight: 700, mb: 2 }}
            >
              {sub.keyword}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: CC.orange, fontWeight: 500, mb: 2 }}
            >
              {sub.impact}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', mb: 2 }}
            >
              {sub.description}
            </Typography>
            <Typography
              variant="code"
              component="div"
              sx={{ color: 'text.secondary' }}
            >
              {sub.quote}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* 콜아웃 — 3컬럼 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
          gap: { xs: 2, md: 3 },
          mb: { xs: 5, md: 8 },
        }}
      >
        {CALLOUTS[3].map((c, i) => (
          <DataCallout key={c.caption} value={c.value} caption={c.caption} variant={i === 0 ? 'hero' : 'muted'} />
        ))}
      </Box>

      <MonolineDiagram variant="cycle" sx={{ mb: { xs: 4, md: 6 } }} />

      <IcebergMiniGraph
        nodes={MINI_GRAPHS[3].nodes}
        edges={MINI_GRAPHS[3].edges}
        descriptions={NODE_DESCRIPTIONS[3]}
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
      </Box>
    </IcebergSection>
  );
}

'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IcebergSection } from '../container/IcebergSection';
import { DataCallout } from '../data-display/DataCallout';
import { RevealCard } from '../card/RevealCard';
import { StickyNodeExplorer } from '../data-display/StickyNodeExplorer';
import {
  ACTS, CALLOUTS, REVEALS, MINI_GRAPHS, PROTOCOL_DIALOGUE, NODE_DESCRIPTIONS,
  COORDINATOR_WORKFLOW, COORDINATOR_TOOLS, MESSAGE_TYPES, CC, SCROLL_STEPS,
} from '@/data/claudeCodeExperimentData';

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
          sx={{ color: CC.orange, mb: 3 }}
        >
          {act.pullQuote}
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
            }}
          >
            {'\u201C'}명령-복종이 아니라 요청-협상. 거부할 수 있는 에이전트는 도구가 아닙니다.{'\u201D'}
          </Typography>
        </Box>
      </Box>

      {/* Coordinator Workflow — 4컬럼 그리드 */}
      <Box sx={{ mb: { xs: 5, md: 8 } }}>
        <Typography variant="overline" sx={{ color: CC.orange, display: 'block', mb: 3 }}>
          Coordinator Workflow
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: { xs: 2, md: 3 },
          }}
        >
          {COORDINATOR_WORKFLOW.map((step) => (
            <Box
              key={step.label}
              sx={{
                p: { xs: 3, md: 4 },
                bgcolor: step.isCoordinator ? CC.orangeMuted : CC.blackCard,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: step.isCoordinator ? CC.orange : 'text.secondary',
                  display: 'block',
                  mb: 1,
                }}
              >
                Stage {step.stage}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  color: step.isCoordinator ? CC.orange : 'text.primary',
                  mb: 1,
                }}
              >
                {step.label}
              </Typography>
              <Typography variant="body2" sx={{ color: step.isCoordinator ? CC.orangeLight : 'text.secondary', mb: 1 }}>
                {step.desc}
              </Typography>
              <Typography
                variant="code"
                sx={{ color: step.isCoordinator ? CC.orange : 'text.secondary' }}
              >
                {step.executor}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Coordinator Tools + Message Types — 2컬럼 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: { xs: 2, md: 3 },
          mb: { xs: 5, md: 8 },
        }}
      >
        {/* 전용 도구 */}
        <Box sx={{ p: { xs: 3, md: 4 }, bgcolor: CC.blackCard }}>
          <Typography variant="overline" sx={{ color: CC.orange, display: 'block', mb: 2 }}>
            Coordinator-Only Tools
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {COORDINATOR_TOOLS.map((tool) => (
              <Typography
                key={tool}
                variant="code"
                component="span"
                sx={{
                  color: CC.orange,
                  bgcolor: CC.orangeMuted,
                  px: 1.5,
                  py: 0.5,
                }}
              >
                {tool}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* 메시지 타입 */}
        <Box sx={{ p: { xs: 3, md: 4 }, bgcolor: CC.blackCard }}>
          <Typography variant="overline" sx={{ color: CC.orange, display: 'block', mb: 2 }}>
            Inter-Agent Messages
          </Typography>
          {MESSAGE_TYPES.map((msg) => (
            <Box key={msg.type} sx={{ display: 'flex', gap: 2, py: 1, alignItems: 'baseline' }}>
              <Typography
                variant="code"
                sx={{ color: CC.orangeLight, minWidth: { xs: 0, sm: 120, md: 160 }, flexShrink: { xs: 1, sm: 0 } }}
              >
                {msg.type}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {msg.desc}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <StickyNodeExplorer
        nodes={MINI_GRAPHS[4].nodes}
        edges={MINI_GRAPHS[4].edges}
        steps={SCROLL_STEPS[4]}
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

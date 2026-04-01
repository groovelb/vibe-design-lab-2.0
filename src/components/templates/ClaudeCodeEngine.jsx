'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IcebergSection } from '../container/IcebergSection';
import { DataCallout } from '../data-display/DataCallout';
import { RevealCard } from '../card/RevealCard';
import { MonolineDiagram } from '../data-display/MonolineDiagram';
import { StickyNodeExplorer } from '../data-display/StickyNodeExplorer';
import {
  ACTS, CALLOUTS, REVEALS, MINI_GRAPHS,
  SUBMIT_MESSAGE_STEPS, NODE_DESCRIPTIONS,
  MEMORY_HIERARCHY, BOOT_PHASES, CC, SCROLL_STEPS,
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
        {/* 코드 블록 — 세로 분할 height 비례 */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            bgcolor: CC.blackCard,
          }}
        >
          {/* 헤더 */}
          <Box sx={{ px: { xs: 3, md: 4 }, py: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography
              sx={{
                fontFamily: 'var(--font-mono, "IBM Plex Mono"), monospace',
                fontSize: { xs: '0.8rem', md: '0.9rem' },
                color: CC.orange,
              }}
            >
              {'async *submitMessage(userMessage) {'}
            </Typography>
          </Box>

          {/* 스텝 — flex: weight로 높이 분배 */}
          {SUBMIT_MESSAGE_STEPS.map((step) => (
            <Box
              key={step.line}
              sx={{
                flex: step.weight,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                px: { xs: 3, md: 4 },
                py: { xs: 2, md: 3 },
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'var(--font-mono, "IBM Plex Mono"), monospace',
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  fontWeight: 600,
                  color: 'text.primary',
                }}
              >
                {step.line}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: CC.orangeLight, mt: 1 }}
              >
                {'// '}{step.desc}
              </Typography>
            </Box>
          ))}

          {/* 푸터 */}
          <Box sx={{ px: { xs: 3, md: 4 }, py: 2 }}>
            <Typography
              sx={{
                fontFamily: 'var(--font-mono, "IBM Plex Mono"), monospace',
                fontSize: { xs: '0.8rem', md: '0.9rem' },
                color: CC.orange,
              }}
            >
              {'}'}
            </Typography>
          </Box>
        </Box>

        {/* 설명 + 콜아웃 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, md: 3 } }}>
          <Box sx={{ py: { xs: 3, md: 4 } }}>
            <Typography
              variant="h5"
              sx={{ color: CC.orange, mb: 2 }}
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

      {/* 메모리 계층 — 6 레이어 + 4 타입 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: { xs: 2, md: 3 },
          mb: { xs: 5, md: 8 },
        }}
      >
        {/* CLAUDE.md 6-레이어 */}
        <Box sx={{ p: { xs: 3, md: 4 }, bgcolor: CC.blackCard }}>
          <Typography variant="overline" sx={{ color: CC.orange, display: 'block', mb: 2 }}>
            CLAUDE.md 6-Layer Stack
          </Typography>
          {MEMORY_HIERARCHY.layers.map((layer) => (
            <Box key={layer.level} sx={{ display: 'flex', gap: 2, py: 1.5, alignItems: 'baseline' }}>
              <Typography
                variant="code"
                sx={{ color: CC.orange, minWidth: 20, flexShrink: 0 }}
              >
                {layer.level}
              </Typography>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
                  {layer.name}
                </Typography>
                <Typography variant="code" sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>
                  {layer.path}
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: 'text.secondary', flexShrink: 0 }}>
                {layer.scope}
              </Typography>
            </Box>
          ))}
          <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
            <Typography variant="code" sx={{ color: 'text.secondary' }}>
              max {MEMORY_HIERARCHY.limits.maxLines} lines
            </Typography>
            <Typography variant="code" sx={{ color: 'text.secondary' }}>
              {MEMORY_HIERARCHY.limits.maxBytes}
            </Typography>
            <Typography variant="code" sx={{ color: 'text.secondary' }}>
              {MEMORY_HIERARCHY.limits.maxFiles} files
            </Typography>
          </Box>
        </Box>

        {/* 메모리 타입 4종 */}
        <Box sx={{ p: { xs: 3, md: 4 }, bgcolor: CC.blackCard }}>
          <Typography variant="overline" sx={{ color: CC.orange, display: 'block', mb: 2 }}>
            Memory Types
          </Typography>
          {MEMORY_HIERARCHY.types.map((t) => (
            <Box key={t.type} sx={{ py: 1.5 }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'baseline' }}>
                <Typography
                  variant="code"
                  sx={{ color: CC.orangeLight, minWidth: 80, flexShrink: 0 }}
                >
                  {t.type}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.primary' }}>
                  {t.desc}
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: 'text.secondary', pl: { xs: 0, md: '96px' } }}>
                {t.visibility}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* 부트 시퀀스 — 7페이즈 타임라인 */}
      <Box sx={{ mb: { xs: 5, md: 8 } }}>
        <Typography variant="overline" sx={{ color: CC.orange, display: 'block', mb: 3 }}>
          Boot Sequence — 7 Phases
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: { xs: 2, md: 3 },
          }}
        >
          {BOOT_PHASES.map((bp) => {
            const hasParallel = Boolean(bp.parallel);
            return (
              <Box
                key={bp.phase}
                sx={{
                  p: { xs: 3, md: 4 },
                  bgcolor: hasParallel ? CC.orangeMuted : CC.blackCard,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: hasParallel ? CC.orange : 'text.secondary',
                    display: 'block',
                    mb: 1,
                  }}
                >
                  Phase {bp.phase}{bp.timing ? ` · ${bp.timing}` : ''}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    color: hasParallel ? CC.orange : 'text.primary',
                    mb: 1,
                  }}
                >
                  {bp.label}
                </Typography>
                <Typography variant="body2" sx={{ color: hasParallel ? CC.orangeLight : 'text.secondary' }}>
                  {bp.desc}
                </Typography>
                {hasParallel && (
                  <Box sx={{ mt: 1.5, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {bp.parallel.map((sub) => (
                      <Typography
                        key={sub.name}
                        variant="code"
                        component="span"
                        sx={{ color: CC.orange, bgcolor: CC.orangeStrong, px: 1, py: 0.25, fontSize: '0.7rem' }}
                      >
                        {sub.name} {sub.timing}
                      </Typography>
                    ))}
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>

      <MonolineDiagram variant="flow" sx={{ mb: { xs: 4, md: 6 } }} />

      <StickyNodeExplorer
        nodes={MINI_GRAPHS[2].nodes}
        edges={MINI_GRAPHS[2].edges}
        steps={SCROLL_STEPS[2]}
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

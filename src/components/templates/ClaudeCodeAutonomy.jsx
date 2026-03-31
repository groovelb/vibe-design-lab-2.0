'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IcebergSection } from '../container/IcebergSection';
import { DataCallout } from '../data-display/DataCallout';
import { RevealCard } from '../card/RevealCard';
import { MonolineDiagram } from '../data-display/MonolineDiagram';
import { IcebergMiniGraph } from '../data-display/IcebergMiniGraph';
import { ACTS, CALLOUTS, REVEALS, MINI_GRAPHS } from '@/data/claudeCodeExperimentData';

const act = ACTS[4];

const EVOLUTION_STEPS = [
  { label: '수동', desc: '사용자 명령 → 에이전트 실행', code: 'cli_repl' },
  { label: '예약', desc: '시간 기반 자동 실행', code: 'CronScheduler' },
  { label: '반응', desc: '이벤트 기반 실행', code: 'RemoteTrigger' },
  { label: '능동', desc: '자율 행동 개시', code: 'PROACTIVE' },
  { label: '상주', desc: '백그라운드 상시 대기', code: 'DAEMON' },
  { label: '자율', desc: '자율 드리밍 · 기억 통합', code: 'KAIROS' },
];

/**
 * ClaudeCodeAutonomy
 *
 * § 5. Act 5 — 자율 에이전트.
 */
export function ClaudeCodeAutonomy() {
  return (
    <IcebergSection
      depth="abyss"
      overline="Act 5 · Autonomy"
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
        {CALLOUTS[5].map((c) => (
          <DataCallout key={c.caption} value={c.value} caption={c.caption} />
        ))}
      </Box>

      {/* 프롬프트 인용 */}
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
          You are an autonomous agent.
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1.5 }}>
          KAIROS/PROACTIVE 모드가 활성화되면, 수백 줄의 코딩 가이드라인이 모두 사라지고 이 한 줄로 대체된다.
        </Typography>
      </Box>

      {/* 진화 축 — 텍스트 타임라인 */}
      <Box sx={{ mb: { xs: 4, md: 6 } }}>
        <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block', mb: 3 }}>
          자율 진화 축
        </Typography>
        {EVOLUTION_STEPS.map((step, i) => (
          <Box
            key={step.label}
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '48px 1fr', sm: '64px 80px 1fr 120px' },
              gap: 1,
              alignItems: 'baseline',
              py: 1.5,
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {String(i + 1).padStart(2, '0')}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, color: 'text.primary', display: { xs: 'none', sm: 'block' } }}
            >
              {step.label}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              <Box component="span" sx={{ fontWeight: 600, color: 'text.primary', display: { sm: 'none' } }}>
                {step.label}
              </Box>
              {' '}{step.desc}
            </Typography>
            <Typography
              variant="code"
              sx={{ color: 'text.secondary', display: { xs: 'none', sm: 'block' } }}
            >
              {step.code}
            </Typography>
          </Box>
        ))}
      </Box>

      <MonolineDiagram variant="timeline" sx={{ mb: { xs: 4, md: 6 } }} />

      <IcebergMiniGraph
        nodes={MINI_GRAPHS[5].nodes}
        edges={MINI_GRAPHS[5].edges}
        sx={{ mb: { xs: 4, md: 6 } }}
      />

      {REVEALS[5].map((r, i) => (
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

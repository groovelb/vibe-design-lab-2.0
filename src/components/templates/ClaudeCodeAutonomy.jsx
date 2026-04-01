'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IcebergSection } from '../container/IcebergSection';
import { DataCallout } from '../data-display/DataCallout';
import { RevealCard } from '../card/RevealCard';
import { MonolineDiagram } from '../data-display/MonolineDiagram';
import { IcebergMiniGraph } from '../data-display/IcebergMiniGraph';
import { ACTS, CALLOUTS, REVEALS, MINI_GRAPHS, SUB_KEYWORDS, NODE_DESCRIPTIONS, CC } from '@/data/claudeCodeExperimentData';

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
      density="tight"
      overline="Act 5 · 각성 스위치"
      tagline={act.tagline}
      transition={act.transition}
    >
      <Box sx={{ maxWidth: 800, mx: 'auto', py: { xs: 4, md: 6 }, mb: { xs: 4, md: 6 } }}>
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

      {/* 콜아웃 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
          gap: { xs: 2, md: 3 },
          mb: { xs: 5, md: 8 },
        }}
      >
        {CALLOUTS[5].map((c, i) => (
          <DataCallout key={c.caption} value={c.value} caption={c.caption} variant={i === 2 ? 'hero' : 'accent'} />
        ))}
      </Box>

      {/* 프롬프트 인용 — 풀 오렌지 패널 */}
      <Box
        sx={{
          mb: { xs: 5, md: 8 },
          bgcolor: CC.orange,
          p: { xs: 4, md: 6 },
        }}
      >
        <Typography
          variant="h3"
          component="div"
          sx={{
            fontFamily: 'var(--font-mono, "IBM Plex Mono"), monospace',
            fontWeight: 700,
            color: CC.black,
          }}
        >
          You are an autonomous agent.
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.6)', mt: 2 }}>
          KAIROS/PROACTIVE 모드가 활성화되면, 수백 줄의 코딩 가이드라인이 모두 사라지고 이 한 줄로 대체된다.
        </Typography>
      </Box>

      {/* 진화 축 — 3컬럼 그리드 카드 */}
      <Box sx={{ mb: { xs: 5, md: 8 } }}>
        <Typography variant="overline" sx={{ color: CC.orange, display: 'block', mb: 3 }}>
          자율 진화 축
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: { xs: 2, md: 3 },
          }}
        >
          {EVOLUTION_STEPS.map((step, i) => {
            const isLast = i >= 4;
            return (
              <Box
                key={step.label}
                sx={{
                  p: { xs: 3, md: 4 },
                  bgcolor: isLast ? CC.orangeMuted : CC.blackCard,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: isLast ? CC.orange : 'text.secondary',
                    fontWeight: isLast ? 700 : 400,
                    display: 'block',
                    mb: 1,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    color: isLast ? CC.orange : 'text.primary',
                    mb: 1,
                  }}
                >
                  {step.label}
                </Typography>
                <Typography variant="body2" sx={{ color: isLast ? CC.orangeLight : 'text.secondary', mb: 1 }}>
                  {step.desc}
                </Typography>
                <Typography
                  variant="code"
                  sx={{
                    color: isLast ? CC.orange : 'text.secondary',
                    fontWeight: isLast ? 600 : 400,
                  }}
                >
                  {step.code}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* 관찰자 효과 서브섹션 — 카드 */}
      {SUB_KEYWORDS[5].map((sub) => (
        <Box
          key={sub.keyword}
          sx={{
            mb: { xs: 4, md: 6 },
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
            sx={{ color: 'text.secondary', maxWidth: 720, mb: 2 }}
          >
            {sub.description}
          </Typography>
          <Typography
            variant="code"
            component="div"
            sx={{ color: CC.orangeLight }}
          >
            {sub.quote}
          </Typography>
        </Box>
      ))}

      <MonolineDiagram variant="timeline" sx={{ mb: { xs: 6, md: 10 } }} />

      <IcebergMiniGraph
        nodes={MINI_GRAPHS[5].nodes}
        edges={MINI_GRAPHS[5].edges}
        descriptions={NODE_DESCRIPTIONS[5]}
        sx={{ mb: { xs: 6, md: 10 } }}
      />

      {/* Reveals — 2컬럼 그리드 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: { xs: 0, md: 3 },
        }}
      >
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
      </Box>
    </IcebergSection>
  );
}

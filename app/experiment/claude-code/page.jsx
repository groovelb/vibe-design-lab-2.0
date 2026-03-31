import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import { IcebergSection } from '@/components/container/IcebergSection';
import { DataCallout } from '@/components/data-display/DataCallout';
import { RevealCard } from '@/components/card/RevealCard';
import { QuotedContainer } from '@/components/typography/QuotedContainer';
import {
  PROLOGUE,
  ACTS,
  REVEALS,
  CALLOUTS,
  OUTRO,
} from '@/data/claudeCodeExperimentData';
import { BUDDY_SPECIES } from '@/data/buddySpecies';

export const metadata = {
  title: '해부 — Claude Code 512K',
  description:
    'AI 코딩 도구의 소스 코드 유출. 512,000줄의 TypeScript 속에서 발견한 4계층 빙산의 인터랙티브 해부 보고서.',
};

export default function ClaudeCodeExperimentPage() {
  const act1 = ACTS[0];
  const act2 = ACTS[1];
  const act3 = ACTS[2];
  const act4 = ACTS[3];
  const act5 = ACTS[4];
  const epilogue = ACTS[5];

  return (
    <Box component="article">
      {/* ============================================================
          § 0. PROLOGUE — 유출
          ============================================================ */}
      <IcebergSection depth="surface" isMinHeight>
        <Typography
          variant="overline"
          sx={{ color: 'grey.500', display: 'block', mb: 3 }}
        >
          {PROLOGUE.date}
        </Typography>

        <Typography
          variant="h1"
          sx={{ maxWidth: 640, mb: { xs: 4, md: 6 } }}
        >
          {PROLOGUE.headline}
        </Typography>

        <Typography
          variant="body1"
          sx={{ color: 'grey.600', maxWidth: 560, mb: 3 }}
        >
          {PROLOGUE.body}
        </Typography>

        <Typography
          variant="body1"
          sx={{ color: 'grey.500', maxWidth: 560 }}
        >
          {PROLOGUE.subBody}
        </Typography>
      </IcebergSection>

      {/* 수면선 */}
      <Box
        sx={{
          width: '100%',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      />

      {/* ============================================================
          § 1. ACT 1 — 터미널의 동반자
          ============================================================ */}
      <IcebergSection
        depth="shallow"
        overline="Act 1 · Surface"
        tagline={act1.tagline}
        transition={act1.transition}
      >
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', maxWidth: 640, mb: { xs: 4, md: 6 } }}
        >
          {act1.description}
        </Typography>

        {/* 숫자 콜아웃 */}
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

        {/* Reveal */}
        {REVEALS[1].map((r) => (
          <RevealCard
            key={r.id}
            title={r.titleKo}
            description={r.descriptionKo}
            quote={r.quote}
            surpriseLevel={r.surpriseLevel}
            sx={{ mb: 3 }}
          />
        ))}
      </IcebergSection>

      {/* ============================================================
          § 2. ACT 2 — 1,297줄의 심장
          ============================================================ */}
      <IcebergSection
        depth="mid"
        overline="Act 2 · Engine"
        tagline={act2.tagline}
        transition={act2.transition}
      >
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', maxWidth: 640, mb: { xs: 4, md: 6 } }}
        >
          {act2.description}
        </Typography>

        {/* 숫자 콜아웃 */}
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

        {/* 코드 블록 */}
        <Box
          sx={{
            bgcolor: 'action.hover',
            py: 2,
            px: 3,
            mb: { xs: 4, md: 6 },
            maxWidth: 560,
          }}
        >
          <Typography variant="code" component="div" sx={{ color: 'text.primary' }}>
            {'async *submitMessage(userMessage): AsyncGenerator<Event>'}
          </Typography>
          <Typography variant="caption" component="div" sx={{ color: 'text.secondary', mt: 1 }}>
            QueryEngine의 심장. 모든 질문의 생명주기를 관장하는 1,297줄의 비동기 제너레이터.
          </Typography>
        </Box>

        {/* Reveals */}
        {REVEALS[2].map((r, i) => (
          <RevealCard
            key={r.id}
            title={r.titleKo}
            description={r.descriptionKo}
            quote={r.quote}
            surpriseLevel={r.surpriseLevel}
            delay={200 + i * 100}
            sx={{ mb: 3 }}
          />
        ))}
      </IcebergSection>

      {/* ============================================================
          § 3. ACT 3 — 보이지 않는 눈
          ============================================================ */}
      <IcebergSection
        depth="deep"
        overline="Act 3 · Control"
        tagline={act3.tagline}
        transition={act3.transition}
      >
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', maxWidth: 640, mb: { xs: 4, md: 6 } }}
        >
          {act3.description}
        </Typography>

        {/* 숫자 콜아웃 */}
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

        {/* Reveals */}
        {REVEALS[3].map((r, i) => (
          <RevealCard
            key={r.id}
            title={r.titleKo}
            description={r.descriptionKo}
            quote={r.quote}
            surpriseLevel={r.surpriseLevel}
            delay={200 + i * 100}
            sx={{ mb: 3 }}
          />
        ))}
      </IcebergSection>

      {/* ============================================================
          § 4. ACT 4 — 깨어나는 군단
          ============================================================ */}
      <IcebergSection
        depth="abyss"
        overline="Act 4 · Orchestration"
        tagline={act4.tagline}
        transition={act4.transition}
      >
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', maxWidth: 640, mb: { xs: 4, md: 6 } }}
        >
          {act4.description}
        </Typography>

        {/* 숫자 콜아웃 */}
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
        <Box sx={{ mb: { xs: 4, md: 6 }, maxWidth: 640 }}>
          <QuotedContainer
            variant="h3"
            position="inside"
            quoteColor="text.disabled"
          >
            {'shutdown_rejected — 아직 작업 중입니다'}
          </QuotedContainer>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 2 }}>
            팀메이트는 리더의 셧다운 요청을 거부할 수 있다. AI 에이전트에게 자율적 판단권이 부여된 셈이다.
          </Typography>
        </Box>

        {/* Reveals */}
        {REVEALS[4].map((r, i) => (
          <RevealCard
            key={r.id}
            title={r.titleKo}
            description={r.descriptionKo}
            quote={r.quote}
            surpriseLevel={r.surpriseLevel}
            delay={200 + i * 100}
            sx={{ mb: 3 }}
          />
        ))}
      </IcebergSection>

      {/* ============================================================
          § 5. ACT 5 — 잠들지 않는 코드
          ============================================================ */}
      <IcebergSection
        depth="abyss"
        overline="Act 5 · Autonomy"
        tagline={act5.tagline}
        transition={act5.transition}
      >
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', maxWidth: 640, mb: { xs: 4, md: 6 } }}
        >
          {act5.description}
        </Typography>

        {/* 숫자 콜아웃 */}
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

        {/* 인용 — 자율 에이전트 프롬프트 */}
        <Box sx={{ mb: { xs: 4, md: 6 }, maxWidth: 640 }}>
          <Box
            sx={{
              bgcolor: 'action.hover',
              py: 3,
              px: 4,
              borderLeft: '1px solid',
              borderLeftColor: 'grey.100',
            }}
          >
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
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 2 }}>
            KAIROS/PROACTIVE 모드가 활성화되면, 수백 줄의 코딩 가이드라인이 모두 사라지고 이 한 줄로 대체된다.
          </Typography>
        </Box>

        {/* 진화 축 — 텍스트 타임라인 */}
        <Box sx={{ mb: { xs: 4, md: 6 } }}>
          <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block', mb: 3 }}>
            자율 진화 축
          </Typography>
          {[
            { label: '수동', desc: '사용자 명령 → 에이전트 실행', code: 'cli_repl' },
            { label: '예약', desc: '시간 기반 자동 실행', code: 'CronScheduler' },
            { label: '반응', desc: '이벤트 기반 실행', code: 'RemoteTrigger' },
            { label: '능동', desc: '자율 행동 개시', code: 'PROACTIVE' },
            { label: '상주', desc: '백그라운드 상시 대기', code: 'DAEMON' },
            { label: '자율', desc: '자율 드리밍 · 기억 통합', code: 'KAIROS' },
          ].map((step, i) => (
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

        {/* Reveals */}
        {REVEALS[5].map((r, i) => (
          <RevealCard
            key={r.id}
            title={r.titleKo}
            description={r.descriptionKo}
            quote={r.quote}
            surpriseLevel={r.surpriseLevel}
            delay={200 + i * 100}
            sx={{ mb: 3 }}
          />
        ))}
      </IcebergSection>

      {/* ============================================================
          § 6. EPILOGUE — buddy/
          ============================================================ */}
      <IcebergSection
        depth="abyss"
        overline="Epilogue"
        tagline={epilogue.tagline}
      >
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', maxWidth: 640, mb: { xs: 4, md: 6 } }}
        >
          {epilogue.description}
        </Typography>

        {/* ASCII 갤러리 */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(6, 1fr)',
            },
            gap: { xs: 2, md: 3 },
            mb: { xs: 4, md: 6 },
          }}
        >
          {BUDDY_SPECIES.map((s) => (
            <Box key={s.id} sx={{ textAlign: 'center', py: 2 }}>
              <Typography
                variant="codeBlock"
                component="div"
                sx={{
                  fontSize: { xs: '1.125rem', md: '1.25rem' },
                  lineHeight: 1.2,
                  color: 'text.primary',
                  letterSpacing: '0.05em',
                }}
              >
                {s.ascii}
              </Typography>
              <Typography
                variant="caption"
                component="div"
                sx={{ color: 'text.secondary', mt: 1 }}
              >
                {s.name}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* SALT 인용 */}
        <Box
          sx={{
            bgcolor: 'action.hover',
            py: 2,
            px: 3,
            mb: { xs: 4, md: 6 },
            maxWidth: 480,
          }}
        >
          <Typography variant="code" component="div" sx={{ color: 'text.primary' }}>
            {"SALT = 'friend-2026-401'"}
          </Typography>
          <Typography variant="caption" component="div" sx={{ color: 'text.secondary', mt: 1 }}>
            friend(친구) + 2026(출시 연도) + 401(4월 1일). 모든 buddy의 DNA에 friend가 새겨져 있다.
          </Typography>
        </Box>

        {/* Reveal */}
        {REVEALS.epilogue.map((r) => (
          <RevealCard
            key={r.id}
            title={r.titleKo}
            description={r.descriptionKo}
            quote={r.quote}
            surpriseLevel={r.surpriseLevel}
          />
        ))}
      </IcebergSection>

      {/* ============================================================
          § 7. OUTRO — 요약
          ============================================================ */}
      <IcebergSection depth="deep">
        <Divider sx={{ borderColor: 'divider', mb: { xs: 6, md: 8 } }} />

        <Typography
          variant="h3"
          sx={{ color: 'text.primary', maxWidth: 640, mb: { xs: 4, md: 6 } }}
        >
          {OUTRO.tagline}
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
            gap: { xs: 2, md: 4 },
            mb: { xs: 6, md: 8 },
          }}
        >
          {OUTRO.callouts.map((c) => (
            <DataCallout
              key={c.caption}
              value={c.value}
              caption={c.caption}
              variant="accent"
            />
          ))}
        </Box>

        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', maxWidth: 640 }}
        >
          당신이 채팅하는 동안, 그 아래에서는 1,297줄의 엔진이 돌고, 60개의 스위치가 당신을 관찰하고, 군단이 깨어날 준비를 하고 있었습니다.
        </Typography>
      </IcebergSection>
    </Box>
  );
}

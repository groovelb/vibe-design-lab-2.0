'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IcebergSection } from '../container/IcebergSection';
import { DataCallout } from '../data-display/DataCallout';
import { RevealCard } from '../card/RevealCard';
import { MonolineDiagram } from '../data-display/MonolineDiagram';
import { StickyNodeExplorer } from '../data-display/StickyNodeExplorer';
import {
  ACTS, CALLOUTS, REVEALS, MINI_GRAPHS, SUB_KEYWORDS, NODE_DESCRIPTIONS,
  MDM_PLATFORMS, SETTINGS_PRIORITY, FEATURE_FLAGS, PERMISSION_MODES, CC, SCROLL_STEPS,
} from '@/data/claudeCodeExperimentData';

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

      {/* MDM 원격 관리 — 3컬럼 */}
      <Box sx={{ mb: { xs: 5, md: 8 } }}>
        <Typography variant="overline" sx={{ color: CC.orange, display: 'block', mb: 3 }}>
          MDM Remote Management
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: { xs: 2, md: 3 },
          }}
        >
          {MDM_PLATFORMS.map((p) => (
            <Box key={p.platform} sx={{ p: { xs: 3, md: 4 }, bgcolor: CC.blackCard }}>
              <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
                {p.platform}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                {p.mechanism}
              </Typography>
              <Typography variant="code" sx={{ color: CC.orangeLight, display: 'block' }}>
                {p.tool}
              </Typography>
              <Typography variant="code" sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>
                {p.path}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* 설정 우선순위 + 퍼미션 모드 — 2컬럼 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: { xs: 2, md: 3 },
          mb: { xs: 5, md: 8 },
        }}
      >
        {/* 설정 우선순위 5-레벨 */}
        <Box sx={{ p: { xs: 3, md: 4 }, bgcolor: CC.blackCard }}>
          <Typography variant="overline" sx={{ color: CC.orange, display: 'block', mb: 2 }}>
            Settings Priority Chain
          </Typography>
          {SETTINGS_PRIORITY.map((s) => (
            <Box key={s.level} sx={{ display: 'flex', gap: 2, py: 1, alignItems: 'baseline' }}>
              <Typography
                variant="code"
                sx={{ color: CC.orange, minWidth: 20, flexShrink: 0 }}
              >
                {s.level}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600, minWidth: { xs: 100, md: 140 }, flexShrink: 0 }}>
                {s.source}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {s.desc}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* 퍼미션 모드 스펙트럼 */}
        <Box sx={{ p: { xs: 3, md: 4 }, bgcolor: CC.blackCard }}>
          <Typography variant="overline" sx={{ color: CC.orange, display: 'block', mb: 2 }}>
            Permission Modes
          </Typography>
          {PERMISSION_MODES.map((pm) => (
            <Box key={pm.mode} sx={{ display: 'flex', gap: 2, py: 1, alignItems: 'center' }}>
              <Box
                sx={{
                  width: 60,
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    width: `${(pm.level / 6) * 100}%`,
                    minWidth: 4,
                    height: 4,
                    bgcolor: pm.isInternal ? CC.orangeLight : CC.orange,
                  }}
                />
              </Box>
              <Typography
                variant="code"
                sx={{
                  color: pm.isInternal ? CC.orangeLight : 'text.primary',
                  fontWeight: 600,
                  minWidth: { xs: 80, md: 120 },
                  flexShrink: 0,
                }}
              >
                {pm.label}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {pm.desc}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Runtime Feature Flags — 코드네임 목록 */}
      <Box sx={{ mb: { xs: 5, md: 8 }, p: { xs: 3, md: 4 }, bgcolor: CC.blackCard }}>
        <Typography variant="overline" sx={{ color: CC.orange, display: 'block', mb: 1 }}>
          GrowthBook Runtime Flags
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
          {FEATURE_FLAGS.note}
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 1,
          }}
        >
          {FEATURE_FLAGS.runtime.map((flag) => (
            <Box key={flag.name} sx={{ display: 'flex', gap: 1.5, alignItems: 'baseline' }}>
              <Typography
                variant="code"
                sx={{ color: CC.orangeLight, fontSize: '0.75rem' }}
              >
                {flag.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', fontSize: '0.65rem' }}
              >
                {flag.category}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <MonolineDiagram variant="cycle" sx={{ mb: { xs: 4, md: 6 } }} />

      <StickyNodeExplorer
        nodes={MINI_GRAPHS[3].nodes}
        edges={MINI_GRAPHS[3].edges}
        steps={SCROLL_STEPS[3]}
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

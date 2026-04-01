'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IcebergSection } from '../container/IcebergSection';
import { RevealCard } from '../card/RevealCard';
import { ACTS, REVEALS, BUDDY_GACHA, CC } from '@/data/claudeCodeExperimentData';
import { BUDDY_SPECIES } from '@/data/buddySpecies';

const act = ACTS[5];

/**
 * ClaudeCodeEpilogue
 *
 * § 6. Epilogue — buddy/. 18종 ASCII 갤러리 + 감성적 해소.
 */
export function ClaudeCodeEpilogue() {
  return (
    <IcebergSection
      depth="abyss"
      density="breathe"
      overline="Epilogue · friend"
      tagline={act.tagline}
    >
      <Box sx={{ maxWidth: 800, mx: 'auto', py: { xs: 4, md: 6 }, mb: { xs: 6, md: 10 } }}>
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

      {/* ASCII 갤러리 — 그리드 카드 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(6, 1fr)',
          },
          gap: { xs: 2, md: 3 },
          mb: { xs: 6, md: 10 },
        }}
      >
        {BUDDY_SPECIES.map((s) => (
          <Box
            key={s.id}
            sx={{
              textAlign: 'center',
              py: { xs: 3, md: 4 },
              px: 2,
              bgcolor: CC.blackCard,
              transition: 'background-color 0.2s',
              '&:hover': { bgcolor: CC.orangeMuted },
            }}
          >
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
              sx={{ color: 'text.secondary', mt: 1.5 }}
            >
              {s.name}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* 가챠 시스템 — 희귀도 스펙트럼 + 눈/모자 */}
      <Box sx={{ mb: { xs: 6, md: 10 } }}>
        <Typography variant="overline" sx={{ color: CC.orange, display: 'block', mb: 3 }}>
          Buddy Gacha System
        </Typography>

        {/* 희귀도 바 */}
        <Box sx={{ display: 'flex', height: 32, mb: 2, overflow: 'hidden' }}>
          {BUDDY_GACHA.rarities.map((r) => (
            <Box
              key={r.tier}
              sx={{
                width: `${r.weight}%`,
                bgcolor: r.weight >= 25 ? CC.blackCard : r.weight >= 10 ? CC.orangeMuted : CC.orangeStrong,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.2s',
                '&:hover': { bgcolor: CC.orange },
                '&:hover .gacha-label': { color: CC.black },
              }}
            >
              <Typography
                className="gacha-label"
                variant="code"
                sx={{
                  color: r.weight <= 4 ? CC.orange : 'text.secondary',
                  fontSize: r.weight <= 4 ? '0.6rem' : '0.7rem',
                  transition: 'color 0.2s',
                }}
              >
                {r.weight > 10 ? `${r.tier} ${r.weight}%` : `${r.weight}%`}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* 희귀도 상세 — 5컬럼 */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(5, 1fr)' },
            gap: { xs: 2, md: 3 },
            mb: 4,
          }}
        >
          {BUDDY_GACHA.rarities.map((r) => (
            <Box key={r.tier} sx={{ p: { xs: 2, md: 3 }, bgcolor: CC.blackCard, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: CC.orangeLight, fontWeight: 700, mb: 0.5 }}>
                {'★'.repeat(r.stars)}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
                {r.tier}
              </Typography>
              <Typography variant="code" sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>
                floor: {r.floor}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* 눈/모자/스탯 — 3컬럼 */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: { xs: 2, md: 3 },
          }}
        >
          <Box sx={{ p: { xs: 3, md: 4 }, bgcolor: CC.blackCard }}>
            <Typography variant="overline" sx={{ color: CC.orange, display: 'block', mb: 2 }}>
              Eyes ({BUDDY_GACHA.eyes.length})
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {BUDDY_GACHA.eyes.map((eye) => (
                <Typography key={eye} variant="h5" sx={{ color: 'text.primary', fontFamily: 'var(--font-mono, "IBM Plex Mono"), monospace' }}>
                  {eye}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box sx={{ p: { xs: 3, md: 4 }, bgcolor: CC.blackCard }}>
            <Typography variant="overline" sx={{ color: CC.orange, display: 'block', mb: 2 }}>
              Hats ({BUDDY_GACHA.hats.length})
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              {BUDDY_GACHA.hats.filter((h) => h.ascii).map((hat) => (
                <Typography
                  key={hat.name}
                  variant="code"
                  sx={{ color: CC.orangeLight, bgcolor: CC.orangeMuted, px: 1, py: 0.5 }}
                >
                  {hat.ascii}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box sx={{ p: { xs: 3, md: 4 }, bgcolor: CC.blackCard }}>
            <Typography variant="overline" sx={{ color: CC.orange, display: 'block', mb: 2 }}>
              Stats · Shiny
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
              {BUDDY_GACHA.stats.map((stat) => (
                <Typography key={stat} variant="code" sx={{ color: 'text.secondary' }}>
                  {stat}
                </Typography>
              ))}
            </Box>
            <Typography variant="code" sx={{ color: CC.orangeLight }}>
              Shiny: {BUDDY_GACHA.shinyChance} · Legendary Shiny: {BUDDY_GACHA.legendaryShiny}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* SALT 인용 — 오렌지 액센트 */}
      <Box
        sx={{
          bgcolor: CC.orange,
          py: 3,
          px: 4,
          mb: { xs: 6, md: 10 },
          maxWidth: 560,
        }}
      >
        <Typography variant="code" component="div" sx={{ color: CC.black, fontWeight: 700 }}>
          {"SALT = 'friend-2026-401'"}
        </Typography>
        <Typography variant="caption" component="div" sx={{ color: 'rgba(0,0,0,0.6)', mt: 1.5 }}>
          friend(친구) + 2026(출시 연도) + 401(4월 1일). 모든 buddy의 해시 솔트에 friend가 들어간다.
        </Typography>
      </Box>

      {/* Reveals — 2컬럼 그리드 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: { xs: 0, md: 3 },
        }}
      >
        {REVEALS.epilogue.map((r) => (
          <RevealCard
            key={r.id}
            title={r.titleKo}
            description={r.descriptionKo}
            quote={r.quote}
            surpriseLevel={r.surpriseLevel}
          />
        ))}
      </Box>
    </IcebergSection>
  );
}

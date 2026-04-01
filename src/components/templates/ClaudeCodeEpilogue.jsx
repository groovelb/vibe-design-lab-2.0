'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IcebergSection } from '../container/IcebergSection';
import { RevealCard } from '../card/RevealCard';
import { ACTS, REVEALS, CC } from '@/data/claudeCodeExperimentData';
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

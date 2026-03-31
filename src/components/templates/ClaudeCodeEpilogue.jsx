'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IcebergSection } from '../container/IcebergSection';
import { RevealCard } from '../card/RevealCard';
import { ACTS, REVEALS } from '@/data/claudeCodeExperimentData';
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
      overline="Epilogue"
      tagline={act.tagline}
    >
      <Typography
        variant="body1"
        sx={{ color: 'text.secondary', maxWidth: 640, mb: { xs: 4, md: 6 } }}
      >
        {act.description}
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
          friend(친구) + 2026(출시 연도) + 401(4월 1일). 모든 buddy의 해시 솔트에 friend가 들어간다.
        </Typography>
      </Box>

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
  );
}

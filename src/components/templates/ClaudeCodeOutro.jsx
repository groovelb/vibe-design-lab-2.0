'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { IcebergSection } from '../container/IcebergSection';
import { DataCallout } from '../data-display/DataCallout';
import { OUTRO, CC } from '@/data/claudeCodeExperimentData';

/**
 * ClaudeCodeOutro
 *
 * § 7. Outro — 전체 요약 + 클로징.
 */
export function ClaudeCodeOutro() {
  return (
    <IcebergSection depth="deep" density="breathe">
      <Divider sx={{ borderColor: CC.orange, mb: { xs: 8, md: 12 } }} />

      <Typography
        variant="h3"
        sx={{ color: CC.orange, mb: { xs: 6, md: 10 } }}
      >
        {OUTRO.tagline}
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
          gap: { xs: 2, md: 3 },
          mb: { xs: 8, md: 12 },
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
        variant="body1"
        sx={{ color: 'text.secondary', maxWidth: 720 }}
      >
        {OUTRO.closing}
      </Typography>
    </IcebergSection>
  );
}

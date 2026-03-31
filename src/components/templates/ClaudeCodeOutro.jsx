'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { IcebergSection } from '../container/IcebergSection';
import { DataCallout } from '../data-display/DataCallout';
import { OUTRO } from '@/data/claudeCodeExperimentData';

/**
 * ClaudeCodeOutro
 *
 * § 7. Outro — 전체 요약 + 클로징.
 */
export function ClaudeCodeOutro() {
  return (
    <IcebergSection depth="deep">
      <Divider sx={{ borderColor: 'divider', mb: { xs: 6, md: 8 } }} />

      <Typography
        variant="h3"
        sx={{ color: 'text.primary', mb: { xs: 4, md: 6 } }}
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
        variant="body1"
        sx={{ color: 'text.secondary', maxWidth: 640 }}
      >
        {OUTRO.closing}
      </Typography>
    </IcebergSection>
  );
}

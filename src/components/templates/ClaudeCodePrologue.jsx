'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IcebergSection } from '../container/IcebergSection';
import { PROLOGUE } from '@/data/claudeCodeExperimentData';

/**
 * ClaudeCodePrologue
 *
 * § 0. 유출 — 밝은 수면 진입점 + 수면선.
 */
export function ClaudeCodePrologue() {
  return (
    <>
      <IcebergSection depth="surface" isMinHeight>
        <Typography
          variant="overline"
          sx={{ color: 'grey.500', display: 'block', mb: 3 }}
        >
          {PROLOGUE.date}
        </Typography>

        <Typography
          variant="h1"
          sx={{ mb: { xs: 4, md: 6 } }}
        >
          {PROLOGUE.headline}
        </Typography>

        <Typography
          variant="body1"
          sx={{ color: 'grey.600', maxWidth: 640, mb: 3 }}
        >
          {PROLOGUE.body}
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
    </>
  );
}

'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IcebergSection } from '../container/IcebergSection';
import { PROLOGUE, CC } from '@/data/claudeCodeExperimentData';

const ASCII_LOGO = ` ██████ ██      █████  ██    ██ ██████  ███████
██      ██     ██   ██ ██    ██ ██   ██ ██
██      ██     ███████ ██    ██ ██   ██ █████
██      ██     ██   ██ ██    ██ ██   ██ ██
 ██████ ██████ ██   ██  ██████  ██████  ███████

 ██████  ██████  ██████  ███████
██      ██    ██ ██   ██ ██
██      ██    ██ ██   ██ █████
██      ██    ██ ██   ██ ██
 ██████  ██████  ██████  ███████`;

/**
 * ClaudeCodePrologue
 *
 * § 0. 유출 — 터미널 컨셉 히어로 + ASCII 아트 로고.
 */
export function ClaudeCodePrologue() {
  return (
    <IcebergSection
      depth="deep"
      density="breathe"
      isMinHeight
      sx={{
        bgcolor: '#1E1E1E !important',
      }}
    >
      {/* Terminal chrome — traffic light dots */}
      <Box sx={{ display: 'flex', gap: 1, mb: { xs: 4, md: 6 } }}>
        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#FF5F56' }} />
        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#FFBD2E' }} />
        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#27C93F' }} />
      </Box>

      {/* Welcome message — bordered box */}
      <Box
        sx={{
          display: 'inline-flex',
          gap: 1.5,
          alignItems: 'center',
          border: '1px solid',
          borderColor: CC.orange,
          px: { xs: 2, md: 3 },
          py: 1.5,
          mb: { xs: 4, md: 6 },
        }}
      >
        <Typography
          component="span"
          sx={{
            fontFamily: 'var(--font-mono, "IBM Plex Mono"), monospace',
            color: CC.orange,
            fontSize: { xs: '0.875rem', md: '1rem' },
          }}
        >
          ✻
        </Typography>
        <Typography
          component="span"
          sx={{
            fontFamily: 'var(--font-mono, "IBM Plex Mono"), monospace',
            color: 'rgba(255,255,255,0.6)',
            fontSize: { xs: '0.875rem', md: '1rem' },
          }}
        >
          Welcome to the{' '}
          <Box component="span" sx={{ color: '#FFFFFF', fontWeight: 700 }}>
            Claude Code
          </Box>
          {' '}research preview!
        </Typography>
      </Box>

      {/* ASCII art logo */}
      <Box
        component="pre"
        sx={{
          fontFamily: 'var(--font-mono, "IBM Plex Mono"), monospace',
          color: CC.orange,
          fontSize: { xs: '0.4rem', sm: '0.6rem', md: '0.9rem', lg: '1.1rem' },
          lineHeight: { xs: 1.3, md: 1.2 },
          letterSpacing: { xs: '0.05em', md: '0.08em' },
          mb: { xs: 5, md: 8 },
          m: 0,
          overflow: 'hidden',
          whiteSpace: 'pre',
        }}
      >
        {ASCII_LOGO}
      </Box>

      {/* Prompt line — headline */}
      <Typography
        sx={{
          fontFamily: 'var(--font-mono, "IBM Plex Mono"), monospace',
          color: '#FFFFFF',
          fontSize: { xs: '1rem', md: '1.25rem' },
          fontWeight: 700,
          mb: 2,
        }}
      >
        {'> '}{PROLOGUE.headline}
      </Typography>

      {/* Body */}
      <Typography
        variant="body1"
        sx={{
          fontFamily: 'var(--font-mono, "IBM Plex Mono"), monospace',
          color: 'rgba(255,255,255,0.4)',
          maxWidth: 720,
          lineHeight: 1.8,
          mb: 4,
        }}
      >
        {PROLOGUE.body}
      </Typography>

      {/* Date stamp */}
      <Typography
        sx={{
          fontFamily: 'var(--font-mono, "IBM Plex Mono"), monospace',
          color: 'rgba(255,255,255,0.25)',
          fontSize: '0.75rem',
        }}
      >
        {PROLOGUE.date} · source leaked · 512,000 LOC
      </Typography>
    </IcebergSection>
  );
}

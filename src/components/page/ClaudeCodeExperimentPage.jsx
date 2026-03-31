'use client';
import Box from '@mui/material/Box';
import { ClaudeCodePrologue } from '../templates/ClaudeCodePrologue';
import { ClaudeCodeSurface } from '../templates/ClaudeCodeSurface';
import { ClaudeCodeEngine } from '../templates/ClaudeCodeEngine';
import { ClaudeCodeControl } from '../templates/ClaudeCodeControl';
import { ClaudeCodeLegion } from '../templates/ClaudeCodeLegion';
import { ClaudeCodeAutonomy } from '../templates/ClaudeCodeAutonomy';
import { ClaudeCodeEpilogue } from '../templates/ClaudeCodeEpilogue';
import { ClaudeCodeOutro } from '../templates/ClaudeCodeOutro';
import { PageContainer } from '../layout/PageContainer';

/**
 * ClaudeCodeExperimentPage
 *
 * Claude Code 512K 소스 코드 해부 — 인터랙티브 스토리텔링 페이지.
 * 빙산 다이브 메타포: 스크롤이 수심이다.
 *
 * 퍼널 흐름:
 * Prologue (수면) → Act 1 Surface → Act 2 Engine →
 * Act 3 Control → Act 4 Legion → Act 5 Autonomy →
 * Epilogue (buddy/) → Outro
 */
export function ClaudeCodeExperimentPage() {
  return (
    <PageContainer>
      <Box component="article">
        <ClaudeCodePrologue />
        <ClaudeCodeSurface />
        <ClaudeCodeEngine />
        <ClaudeCodeControl />
        <ClaudeCodeLegion />
        <ClaudeCodeAutonomy />
        <ClaudeCodeEpilogue />
        <ClaudeCodeOutro />
      </Box>
    </PageContainer>
  );
}

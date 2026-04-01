'use client';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import FadeTransition from '../motion/FadeTransition';

/**
 * 밀도별 여백 매핑
 * 스토리텔링 완급조절: tight(연속 흐름) → standard(기본 리듬) → breathe(극적 멈춤).
 */
const DENSITY_SPACING = {
  tight: {
    py: { xs: 6, md: 10 },
    taglineMb: { xs: 5, md: 7 },
    transitionMt: { xs: 5, md: 8 },
  },
  standard: {
    py: { xs: 8, md: 14 },
    taglineMb: { xs: 6, md: 9 },
    transitionMt: { xs: 6, md: 10 },
  },
  breathe: {
    py: { xs: 10, md: 18 },
    taglineMb: { xs: 8, md: 10 },
    transitionMt: { xs: 8, md: 12 },
  },
};

/**
 * 수심별 배경 매핑
 * 스크롤이 수심이다 — 내려갈수록 어두워진다.
 */
const DEPTH_STYLES = {
  surface: {
    bgcolor: 'grey.50',
    color: 'grey.950',
  },
  shallow: {
    bgcolor: 'grey.900',
    color: 'grey.100',
  },
  mid: {
    bgcolor: 'grey.900',
    color: 'grey.100',
  },
  deep: {
    bgcolor: 'background.default',
    color: 'grey.100',
  },
  abyss: {
    bgcolor: 'background.default',
    color: 'grey.200',
  },
};

/**
 * IcebergSection
 *
 * 빙산 다이브 스토리텔링의 섹션 래퍼.
 * depth에 따라 배경 명도가 변하고, 하단에 트랜지션 텍스트를 표시한다.
 *
 * @param {'surface'|'shallow'|'mid'|'deep'|'abyss'} depth - 빙산 수심 [Required]
 * @param {number|string} act - 내러티브 위치 (1-5, 'prologue', 'epilogue') [Optional]
 * @param {string} overline - 섹션 오버라인 텍스트 (예: 'Act 1 · Surface') [Optional]
 * @param {string} tagline - 섹션 태그라인/헤드라인 [Optional]
 * @param {string} transition - 섹션 하단 트랜지션 텍스트 [Optional]
 * @param {'tight'|'standard'|'breathe'} density - 여백 밀도 (스토리텔링 완급) [Optional, 기본값: 'standard']
 * @param {boolean} isMinHeight - 최소 높이 100vh 적용 [Optional, 기본값: false]
 * @param {node} children - 섹션 내용 [Required]
 * @param {object} sx - 추가 스타일 [Optional]
 */
const IcebergSection = forwardRef(function IcebergSection(
  {
    depth = 'deep',
    act,
    overline,
    tagline,
    transition,
    density = 'standard',
    isMinHeight = false,
    children,
    sx,
    ...props
  },
  ref
) {
  const depthStyle = DEPTH_STYLES[depth] || DEPTH_STYLES.deep;
  const spacing = DENSITY_SPACING[density] || DENSITY_SPACING.standard;

  return (
    <Box
      ref={ref}
      component="section"
      sx={{
        width: '100%',
        bgcolor: depthStyle.bgcolor,
        color: depthStyle.color,
        py: spacing.py,
        minHeight: isMinHeight ? '100vh' : 'auto',
        display: isMinHeight ? 'flex' : 'block',
        alignItems: isMinHeight ? 'center' : 'stretch',
        ...sx,
      }}
      {...props}
    >
      <Container maxWidth="xl" sx={{ width: '100%' }}>
        {/* Overline */}
        {overline && (
          <FadeTransition isTriggerOnView direction="up">
            <Typography
              variant="overline"
              sx={{ color: depth === 'surface' ? 'grey.600' : 'text.secondary', mb: 2, display: 'block' }}
            >
              {overline}
            </Typography>
          </FadeTransition>
        )}

        {/* Tagline */}
        {tagline && (
          <FadeTransition isTriggerOnView direction="up" delay={100}>
            <Typography
              variant="h2"
              sx={{ mb: spacing.taglineMb, whiteSpace: 'pre-line' }}
            >
              {tagline}
            </Typography>
          </FadeTransition>
        )}

        {/* Content */}
        {children}

        {/* Transition */}
        {transition && (
          <FadeTransition isTriggerOnView direction="up" delay={200}>
            <Divider
              sx={{
                borderColor: depth === 'surface' ? 'grey.200' : 'divider',
                mt: spacing.transitionMt,
                mb: 4,
              }}
            />
            <Typography
              variant="body1"
              sx={{
                color: depth === 'surface' ? 'grey.600' : 'text.secondary',
                textAlign: 'center',
                maxWidth: 720,
                mx: 'auto',
              }}
            >
              {transition}
            </Typography>
          </FadeTransition>
        )}
      </Container>
    </Box>
  );
});

export { IcebergSection };

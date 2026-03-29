'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import {
  DocumentTitle,
  PageContainer,
  SectionTitle,
} from '../../components/storybookDocumentation';

export default {
  title: 'Style/Tool Logos',
  parameters: {
    layout: 'padded',
  },
};

const TOOL_LOGOS = [
  {
    name: 'Claude Code',
    src: '/assets/toolLogos/claude.svg',
    source: 'SimpleIcons (Claude)',
    description: 'Claude — AI 코딩 에이전트. 이 프로젝트의 핵심 개발 도구.',
    tags: [{ label: 'AI Agent', color: 'primary' }],
    hasDarkBg: false,
  },
  {
    name: 'Google Antigravity',
    src: '/assets/toolLogos/antigravity.svg',
    source: 'Wikimedia Commons',
    description: 'Google Antigravity — AI 에이전트 기반 IDE. Gemini 3 기반. 다크모드 전용.',
    tags: [{ label: 'IDE', color: 'secondary' }],
    hasDarkBg: true,
  },
  {
    name: 'React',
    src: '/assets/toolLogos/react.svg',
    source: 'Wikimedia Commons',
    description: 'React 19 — UI 라이브러리. 컴포넌트 기반 프레젠테이션 레이어.',
    tags: [{ label: 'Library', color: 'info' }],
    hasDarkBg: true,
  },
  {
    name: 'Storybook',
    src: '/assets/toolLogos/storybook.svg',
    source: 'Storybook GitHub Brand',
    description: 'Storybook 10 — 컴포넌트 개발 환경. 디자인 시스템 문서화.',
    tags: [{ label: 'DevTool', color: 'warning' }],
    hasDarkBg: false,
  },
  {
    name: 'Next.js',
    src: '/assets/toolLogos/nextjs.svg',
    source: 'Wikimedia Commons',
    description: 'Next.js 16 — React 프레임워크. SSR/RSC 기반 프로덕션 빌드. 다크모드 전용.',
    tags: [{ label: 'Framework', color: 'default' }],
    hasDarkBg: true,
  },
];

const EMBLEM_LOGOS = [
  {
    name: 'Antigravity Emblem',
    src: '/assets/toolLogos/antigravity-emblem.svg',
    original: 'Google Antigravity',
    description: 'Antigravity 아이콘 마크 — 텍스트 제거, 컬러 그라디언트 스우시만 추출.',
  },
  {
    name: 'Next.js Emblem',
    src: '/assets/toolLogos/nextjs-emblem.svg',
    original: 'Next.js',
    description: 'Next.js N 마크 — 워드마크에서 N 아이콘만 추출. 다크모드 전용.',
    hasDarkBg: true,
  },
];

/**
 * 툴 로고 카드
 *
 * @param {string} name - 툴 이름 [Required]
 * @param {string} src - SVG 로고 경로 [Required]
 * @param {string} source - 로고 출처 [Required]
 * @param {string} description - 설명 [Required]
 * @param {Array<{label: string, color: string}>} tags - 분류 태그 [Optional]
 * @param {boolean} hasDarkBg - 다크 배경 사용 여부 [Optional, 기본값: false]
 *
 * Example usage:
 * <LogoCard name="React" src="/assets/toolLogos/react.svg" source="Wikimedia" description="..." hasDarkBg />
 */
const LogoCard = ({ name, src, source, description, tags = [], hasDarkBg = false }) => (
  <Box
    sx={{
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 1,
      overflow: 'hidden',
    }}
  >
    <Box
      sx={{
        bgcolor: hasDarkBg ? '#0a0a0a' : 'background.default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
        minHeight: 160,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box
        component="img"
        src={src}
        alt={`${name} logo`}
        sx={{
          maxWidth: '100%',
          maxHeight: 80,
          height: 'auto',
          objectFit: 'contain',
        }}
      />
    </Box>
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {name}
        </Typography>
        {tags.map((tag) => (
          <Chip
            key={tag.label}
            label={tag.label}
            size="small"
            color={tag.color || 'default'}
            variant="outlined"
            sx={{ fontSize: 11, height: 20 }}
          />
        ))}
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13, mb: 1 }}>
        {description}
      </Typography>
      {source && (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Typography
            variant="caption"
            sx={{ fontWeight: 600, color: 'text.secondary', minWidth: 40 }}
          >
            Source
          </Typography>
          <Typography
            variant="caption"
            sx={{ fontFamily: 'monospace', color: 'text.secondary' }}
          >
            {source}
          </Typography>
        </Box>
      )}
    </Box>
  </Box>
);

/**
 * 엠블럼 로고 카드
 *
 * @param {string} name - 엠블럼 이름 [Required]
 * @param {string} src - SVG 경로 [Required]
 * @param {string} original - 원본 로고 이름 [Required]
 * @param {string} description - 설명 [Required]
 * @param {boolean} hasDarkBg - 다크 배경 사용 여부 [Optional, 기본값: false]
 *
 * Example usage:
 * <EmblemCard name="Next.js Emblem" src="..." original="Next.js" description="..." hasDarkBg />
 */
const EmblemCard = ({ name, src, original, description, hasDarkBg = false }) => (
  <Box
    sx={{
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 1,
      overflow: 'hidden',
    }}
  >
    <Box
      sx={{
        bgcolor: hasDarkBg ? '#0a0a0a' : 'background.default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
        minHeight: 140,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box
        component="img"
        src={src}
        alt={`${name}`}
        sx={{
          maxWidth: 80,
          maxHeight: 80,
          height: 'auto',
          objectFit: 'contain',
        }}
      />
    </Box>
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {name}
        </Typography>
        <Chip
          label="Emblem"
          size="small"
          variant="outlined"
          sx={{ fontSize: 11, height: 20 }}
        />
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13, mb: 1 }}>
        {description}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Typography
          variant="caption"
          sx={{ fontWeight: 600, color: 'text.secondary', minWidth: 40 }}
        >
          Origin
        </Typography>
        <Typography
          variant="caption"
          sx={{ fontFamily: 'monospace', color: 'text.secondary' }}
        >
          {original}
        </Typography>
      </Box>
    </Box>
  </Box>
);

export const Docs = {
  render: () => (
    <>
      <DocumentTitle
        title="Tool Logos"
        status="Available"
        note="프로젝트 기술 스택 공식 SVG 로고 카탈로그"
        brandName="Vibe Design Labs"
        systemName="Style Documentation"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Tool Logos
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          프로젝트에서 사용하는 핵심 기술 스택의 공식 SVG 로고입니다.
          각 로고는 공식 소스에서 다운로드한 원본 SVG 파일이며,{' '}
          <Typography component="code" variant="body2" sx={{ fontFamily: 'monospace' }}>
            public/assets/toolLogos/
          </Typography>
          에 위치합니다. 다크모드 전용 로고는 어두운 배경에서 사용합니다.
        </Typography>

        <SectionTitle
          title="Wordmark / Full Logos"
          description="Claude Code, Antigravity, React, Storybook, Next.js — 5개 도구의 공식 SVG 로고"
        />

        <Grid container spacing={2} sx={{ mb: 4 }}>
          {TOOL_LOGOS.map((logo) => (
            <Grid key={logo.name} size={{ xs: 12, sm: 6 }}>
              <LogoCard
                name={logo.name}
                src={logo.src}
                source={logo.source}
                description={logo.description}
                tags={logo.tags}
                hasDarkBg={logo.hasDarkBg}
              />
            </Grid>
          ))}
        </Grid>

        <SectionTitle
          title="Emblem Logos"
          description="워드마크 로고에서 텍스트를 제거한 아이콘 전용 버전"
        />

        <Grid container spacing={2}>
          {EMBLEM_LOGOS.map((logo) => (
            <Grid key={logo.name} size={{ xs: 6, sm: 4 }}>
              <EmblemCard
                name={logo.name}
                src={logo.src}
                original={logo.original}
                description={logo.description}
                hasDarkBg={logo.hasDarkBg}
              />
            </Grid>
          ))}
        </Grid>
      </PageContainer>
    </>
  ),
};

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AmbientGrainedBackground } from './AmbientGrainedBackground';

export default {
  title: 'Interactive/15. DynamicColor/AmbientGrainedBackground',
  component: AmbientGrainedBackground,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## AmbientGrainedBackground

violetGray 950/900 기반 모노톤 ambient grained gradient 배경.
\`position: fixed\`로 뷰포트 전체를 덮는 독립 배경 레이어.

5-레이어 합성 구조:
1. **Base** — \`--vdl-950\`
2. **Ambient Glow** — \`--vdl-900\` radial-gradient 광원
3. **Gradient** — \`--vdl-900\` → \`--vdl-950\` → transparent
4. **Section Grain** — 어두운 노이즈 텍스처 (128px 타일)
5. **Global Grain** — 밝은 노이즈 텍스처 (미묘한 아날로그 질감)

\`hasScrollReactive\` 활성화 시 스크롤 진행률(0→1)에 따라
gradient stop %와 glow 위치가 동적으로 변화한다.
CSS custom property + RAF로 리렌더링 없이 업데이트.
\`prefers-reduced-motion: reduce\` 시 정적 gradient 유지.
        `,
      },
    },
  },
  argTypes: {
    hasGlow: {
      control: 'boolean',
      description: '앰비언트 글로우 레이어 표시 여부',
    },
    hasGrain: {
      control: 'boolean',
      description: '섹션 그레인 레이어 표시 여부',
    },
    grainSize: {
      control: { type: 'range', min: 32, max: 512, step: 16 },
      description: '섹션 그레인 타일 크기 (px). 작을수록 촘촘',
    },
    grainOpacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.05 },
      description: '섹션 그레인 불투명도',
    },
    hasGlobalGrain: {
      control: 'boolean',
      description: '글로벌 그레인 레이어 표시 여부',
    },
    globalGrainOpacity: {
      control: { type: 'range', min: 0, max: 0.3, step: 0.01 },
      description: '글로벌 그레인 불투명도',
    },
    hasScrollReactive: {
      control: 'boolean',
      description: '스크롤 반응형 그라데이션 효과',
    },
    sx: { table: { disable: true } },
  },
};

/**
 * Default — fixed 배경 + 스크롤 콘텐츠 데모
 */
export const Default = {
  args: {
    hasGlow: true,
    hasGrain: true,
    grainSize: 128,
    grainOpacity: 0.8,
    hasGlobalGrain: true,
    globalGrainOpacity: 0.07,
    hasScrollReactive: true,
  },
  render: (args) => (
    <>
      <AmbientGrainedBackground {...args} />
      <Box sx={{ position: 'relative', zIndex: 1, minHeight: '200vh', px: 4 }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          gap: 2,
          textAlign: 'center',
        }}>
          <Typography
            variant="h2"
            sx={{ fontWeight: 800, color: 'var(--vdl-50)' }}
          >
            Ambient Grained
          </Typography>
          <Typography
            variant="body1"
            sx={{ maxWidth: 480, color: 'var(--vdl-400)' }}
          >
            violetGray 950/900만으로 구성한 모노톤 배경.
            스크롤하면 gradient stop이 변화하며 배경 톤이 서서히 달라진다.
          </Typography>
        </Box>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 600, color: 'var(--vdl-300)' }}
          >
            ↑ 스크롤하여 고정 배경 확인
          </Typography>
        </Box>
      </Box>
    </>
  ),
};

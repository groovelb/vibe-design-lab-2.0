import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { GeometricX } from './GeometricX';

export default {
  title: 'Interactive/14. Motion/GeometricX',
  component: GeometricX,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## GeometricX

기하학적 X 마크 SVG 컴포넌트.
뷰포트 진입 시 두 대각선이 순차적으로 그려지는 stroke-draw 애니메이션.
\`prefers-reduced-motion: reduce\` 시 즉시 표시.
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'range', min: 12, max: 120, step: 4 },
      description: 'SVG 크기 (px)',
    },
    strokeWidth: {
      control: { type: 'range', min: 0.5, max: 4, step: 0.5 },
      description: '선 두께',
    },
    color: {
      control: 'color',
      description: '선 색상',
    },
    duration: {
      control: { type: 'range', min: 200, max: 2000, step: 100 },
      description: '애니메이션 지속 시간 (ms)',
    },
    delay: {
      control: { type: 'range', min: 0, max: 2000, step: 100 },
      description: '애니메이션 지연 시간 (ms)',
    },
    isTriggerOnView: {
      control: 'boolean',
      description: '뷰포트 진입 시 트리거',
    },
    sx: { table: { disable: true } },
  },
};

export const Default = {
  args: {
    size: 48,
    strokeWidth: 1.5,
    color: 'var(--vdl-400)',
    duration: 600,
    delay: 0,
    isTriggerOnView: false,
  },
};

export const Sizes = {
  render: () => (
    <Stack direction="row" spacing={4} alignItems="center">
      {[24, 36, 48, 64, 96].map((s) => (
        <Stack key={s} alignItems="center" spacing={1}>
          <GeometricX size={s} color="var(--vdl-300)" isTriggerOnView={false} />
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {s}px
          </Typography>
        </Stack>
      ))}
    </Stack>
  ),
};

export const WithLabel = {
  render: () => (
    <Stack spacing={3}>
      {[
        '개발 환경 세팅, 시작부터 지치는 디자이너',
        'AI스러운 디자인과 색감 문제',
      ].map((text, i) => (
        <Stack key={i} direction="row" spacing={2} alignItems="flex-start">
          <GeometricX
            size={28}
            color="var(--vdl-500)"
            delay={i * 300}
            isTriggerOnView={false}
          />
          <Box>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {text}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, mt: 1 }}>
              해결 방안 텍스트
            </Typography>
          </Box>
        </Stack>
      ))}
    </Stack>
  ),
};

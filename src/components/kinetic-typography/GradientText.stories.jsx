import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { GradientText } from './GradientText';

export default {
  title: 'Interactive/11. KineticTypography/GradientText',
  component: GradientText,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '루핑 그라디언트가 배경으로 마스킹되는 타이포그래피. CSS `background-clip: text` + `background-position` 애니메이션 기반. 리렌더링 없이 GPU 가속으로 동작한다.',
      },
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: '표시할 텍스트',
    },
    colors: {
      control: 'object',
      description: '그라디언트 색상 배열 (CSS 색상값)',
    },
    duration: {
      control: { type: 'number', min: 1, max: 20, step: 0.5 },
      description: '한 사이클 시간(초)',
    },
    angle: {
      control: { type: 'number', min: 0, max: 360, step: 15 },
      description: '그라디언트 각도(deg)',
    },
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2'],
      description: 'MUI Typography variant',
    },
  },
};

export const Default = {
  args: {
    children: '바이브 디자인 랩',
    duration: 6,
    angle: 90,
    variant: 'h1',
  },
};

export const Variants = {
  render: () => (
    <Stack spacing={6} alignItems="center">
      <GradientText variant="h1">
        4월 7일 공식 오픈
      </GradientText>

      <GradientText
        variant="h2"
        colors={['var(--vdl-50)', 'var(--vdl-500)', 'var(--vdl-200)', 'var(--vdl-50)']}
        duration={4}
      >
        Vibe Design Lab
      </GradientText>

      <GradientText
        variant="h3"
        colors={['#a78bfa', '#818cf8', '#c4b5fd', '#a78bfa']}
        duration={8}
        angle={135}
      >
        도구가 바뀌어도 남는 체계
      </GradientText>

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
        {['바이브', '코딩', '디자인', '언어'].map((word) => (
          <GradientText key={word} variant="h2" duration={6}>
            {word}
          </GradientText>
        ))}
      </Box>
    </Stack>
  ),
};

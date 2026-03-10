import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { PixelButton } from './PixelButton';

export default {
  title: 'Component/7. Input & Control/PixelButton',
  component: PixelButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'MUI Button(contained)을 PixelContainer로 래핑하여 픽셀 채움 배경을 적용한 버튼.',
      },
    },
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      description: '픽셀이 채워지기 시작하는 방향',
    },
    pixelSize: {
      control: { type: 'number', min: 2, max: 16 },
      description: '각 픽셀의 크기 (px)',
    },
    pixelColor: {
      control: 'text',
      description: '픽셀 색상 (MUI 테마 토큰 또는 CSS 색상)',
    },
    progress: {
      control: { type: 'range', min: 0, max: 1, step: 0.01 },
      description: '채움 진행률 (0~1)',
    },
    isTriggerOnView: {
      control: 'boolean',
      description: '뷰포트 진입 시 애니메이션 트리거 여부',
    },
    duration: {
      control: { type: 'number', min: 100, max: 5000, step: 100 },
      description: '애니메이션 지속 시간 (ms)',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
      description: 'MUI Button color',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'MUI Button size',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    children: {
      control: 'text',
      description: '버튼 텍스트',
    },
    onClick: {
      action: 'clicked',
      description: '클릭 핸들러',
    },
  },
};

export const Default = {
  args: {
    children: 'Pixel Button',
    direction: 'left',
    pixelSize: 4,
    color: 'primary',
    size: 'large',
    progress: 1,
    isTriggerOnView: false,
  },
};

export const Directions = {
  render: () => (
    <Stack direction="row" spacing={2}>
      {['left', 'right', 'top', 'bottom'].map((dir) => (
        <PixelButton key={dir} direction={dir} size="large">
          {dir}
        </PixelButton>
      ))}
    </Stack>
  ),
};

export const Colors = {
  render: () => (
    <Stack direction="row" spacing={2}>
      {['primary', 'secondary', 'error', 'warning', 'info', 'success'].map((c) => (
        <PixelButton key={c} color={c} size="large">
          {c}
        </PixelButton>
      ))}
    </Stack>
  ),
};

export const OnView = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start' }}>
      <PixelButton direction="left" isTriggerOnView duration={800} size="large">
        뷰포트 진입 시 애니메이션
      </PixelButton>
      <PixelButton direction="bottom" isTriggerOnView duration={1200} color="secondary" size="large">
        아래에서 위로
      </PixelButton>
    </Box>
  ),
};

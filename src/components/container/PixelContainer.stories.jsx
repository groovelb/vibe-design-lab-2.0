import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { PixelContainer } from './PixelContainer';

export default {
  title: 'Component/2. Container/PixelContainer',
  component: PixelContainer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '배경이 픽셀 단위로 한쪽 방향에서부터 채워지는 키 비쥬얼 컨테이너. 뷰포트 진입 시 자동 애니메이션 또는 progress prop으로 진행률을 제어한다.',
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
      control: { type: 'number', min: 2, max: 32 },
      description: '각 픽셀의 크기 (px)',
    },
    color: {
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
  },
};

export const Default = {
  args: {
    direction: 'left',
    pixelSize: 8,
    color: 'text.primary',
    progress: 0.5,
    isTriggerOnView: false,
  },
  render: (args) => (
    <PixelContainer
      {...args}
      sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Typography
        variant="h2"
        sx={{ color: 'background.default', fontWeight: 700 }}
      >
        Why Vibe Design
      </Typography>
    </PixelContainer>
  ),
};

export const OnView = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        스크롤하여 뷰포트에 진입하면 애니메이션이 시작됩니다.
      </Typography>
      <Box sx={{ height: 300 }} />
      <PixelContainer
        direction="left"
        pixelSize={6}
        duration={1500}
        sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Typography variant="h2" sx={{ color: 'background.default', fontWeight: 700 }}>
          Trigger on View
        </Typography>
      </PixelContainer>
    </Box>
  ),
};

export const Directions = {
  render: () => (
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
      {['left', 'right', 'top', 'bottom'].map((dir) => (
        <PixelContainer
          key={dir}
          direction={dir}
          progress={0.6}
          isTriggerOnView={false}
          pixelSize={6}
          sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Typography variant="h5" sx={{ color: 'background.default', fontWeight: 700 }}>
            {dir}
          </Typography>
        </PixelContainer>
      ))}
    </Box>
  ),
};

export const FullProgress = {
  render: () => (
    <PixelContainer
      direction="bottom"
      progress={1}
      isTriggerOnView={false}
      pixelSize={4}
      color="primary.main"
      sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Typography variant="h3" sx={{ color: 'primary.contrastText', fontWeight: 700 }}>
        100%
      </Typography>
    </PixelContainer>
  ),
};

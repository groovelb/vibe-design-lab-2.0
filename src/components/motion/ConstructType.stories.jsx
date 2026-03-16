import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { ConstructType } from './ConstructType';

export default {
  title: 'Interactive/14. Motion/ConstructType',
  component: ConstructType,
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: '표시할 텍스트',
    },
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1'],
      description: 'MUI Typography variant',
    },
    typingSpeed: {
      control: { type: 'number', min: 10, max: 200, step: 10 },
      description: '문자 간 딜레이 (ms)',
    },
    isTriggerOnView: {
      control: 'boolean',
      description: '뷰포트 진입 시 자동 트리거 여부',
    },
    delay: {
      control: { type: 'number', min: 0, max: 3000, step: 100 },
      description: '시작 지연 시간 (ms)',
    },
  },
};

export const Default = {
  args: {
    text: 'VIBE DESIGN LAB',
    variant: 'h2',
    typingSpeed: 60,
    isTriggerOnView: false,
    delay: 0,
  },
  render: (args) => (
    <Box sx={{ maxWidth: 600 }}>
      <ConstructType {...args} />
    </Box>
  ),
};

export const Heading = {
  render: () => (
    <Box sx={{ maxWidth: 800 }}>
      <ConstructType
        text="디자인 시스템 위에서 만드는 바이브 코딩"
        variant="h3"
        typingSpeed={25}
        isTriggerOnView={false}
      />
    </Box>
  ),
};

export const StaggeredDelay = {
  render: () => (
    <Stack spacing={4} sx={{ maxWidth: 600 }}>
      <ConstructType text="SYSTEM" variant="h2" isTriggerOnView={false} delay={0} />
      <ConstructType text="OVER" variant="h2" isTriggerOnView={false} delay={400} />
      <ConstructType text="DRAWING" variant="h2" isTriggerOnView={false} delay={800} />
    </Stack>
  ),
};

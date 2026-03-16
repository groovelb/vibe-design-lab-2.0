import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { ConstructButton } from './ConstructButton';

export default {
  title: 'Interactive/14. Motion/ConstructButton',
  component: ConstructButton,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: '버튼 텍스트',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'MUI Button color',
    },
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
      description: 'MUI Button variant',
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
    children: '시작하기',
    color: 'primary',
    variant: 'contained',
    isTriggerOnView: false,
    delay: 0,
  },
  render: (args) => (
    <Box sx={{ maxWidth: 400 }}>
      <ConstructButton {...args} />
    </Box>
  ),
};

export const StaggeredDelay = {
  render: () => (
    <Stack direction="row" spacing={4}>
      <ConstructButton isTriggerOnView={false} delay={0}>첫 번째</ConstructButton>
      <ConstructButton isTriggerOnView={false} delay={400}>두 번째</ConstructButton>
      <ConstructButton isTriggerOnView={false} delay={800}>세 번째</ConstructButton>
    </Stack>
  ),
};

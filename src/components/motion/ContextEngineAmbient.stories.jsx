import Box from '@mui/material/Box';
import { ContextEngineAmbient } from './ContextEngineAmbient';

export default {
  title: 'Interactive/14. Motion/ContextEngineAmbient',
  component: ContextEngineAmbient,
  tags: ['autodocs'],
  argTypes: {
    progress: {
      control: { type: 'range', min: 0, max: 1, step: 0.01 },
      description: '스크롤 진행률 (0→1). opacity 매핑에 사용',
    },
    accentColor: {
      control: 'color',
      description: '강조 색상 CSS 값',
    },
  },
};

export const Default = {
  render: (args) => (
    <Box sx={{
      width: '100%',
      height: '60vh',
      backgroundColor: 'var(--vdl-950, #0a0a0f)',
      position: 'relative',
    }}>
      <ContextEngineAmbient {...args} />
    </Box>
  ),
  args: {
    progress: 0.5,
  },
};

import Box from '@mui/material/Box';
import { ContextEngine } from './ContextEngine';

export default {
  title: 'Interactive/14. Motion/ContextEngine',
  component: ContextEngine,
  tags: ['autodocs'],
  argTypes: {
    accentColor: { control: 'text', description: '강조 색상 (CSS 값 또는 hex)' },
    pointCount: {
      control: { type: 'number', min: 20, max: 200 },
      description: '구체 노드 수',
    },
    rotationDuration: {
      control: { type: 'number', min: 10, max: 120 },
      description: '구체 1회전 시간(초)',
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = {
  args: {
    pointCount: 120,
    rotationDuration: 60,
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: '100%', height: '500px', bgcolor: 'background.default' }}>
        <Story />
      </Box>
    ),
  ],
};

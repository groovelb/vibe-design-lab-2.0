import Box from '@mui/material/Box';
import { ContextEngineV2 } from './ContextEngineV2';

export default {
  title: 'Interactive/14. Motion/ContextEngineV2',
  component: ContextEngineV2,
  tags: ['autodocs'],
  argTypes: {
    accentColor: { control: 'text', description: '강조 색상 (CSS 값 또는 hex)' },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = {
  args: {},
  decorators: [
    (Story) => (
      <Box sx={{ width: '100%', height: '500px', bgcolor: 'background.default' }}>
        <Story />
      </Box>
    ),
  ],
};

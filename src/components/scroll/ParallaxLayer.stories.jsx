import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ParallaxLayer } from './ParallaxLayer';
import Placeholder from '../../common/ui/Placeholder';

export default {
  title: 'Interactive/12. Scroll/ParallaxLayer',
  component: ParallaxLayer,
  tags: ['autodocs'],
  argTypes: {
    speed: {
      control: { type: 'number', min: 0.1, max: 3, step: 0.1 },
      description: '스크롤 속도 배수. 1=기본, >1=빠르게, <1=느리게',
    },
  },
};

export const Default = {
  render: (args) => (
    <Stack spacing={0} sx={{ height: '300vh' }}>
      <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h4" color="text.secondary">Scroll down</Typography>
      </Box>
      <ParallaxLayer {...args} sx={{ height: '100vh' }}>
        <Stack spacing={3} sx={{ p: 4 }}>
          <Placeholder.Box label={`speed: ${args.speed}`} height={200} />
          <Placeholder.Paragraph lines={3} />
        </Stack>
      </ParallaxLayer>
    </Stack>
  ),
  args: {
    speed: 1.3,
  },
};

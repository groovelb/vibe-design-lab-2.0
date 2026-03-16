import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AreaConstruct } from './AreaConstruct';
import Placeholder from '../../common/ui/Placeholder';

export default {
  title: 'Interactive/14. Motion/AreaConstruct',
  component: AreaConstruct,
  tags: ['autodocs'],
  argTypes: {
    isTriggerOnView: {
      control: 'boolean',
      description: '뷰포트 진입 시 자동 트리거 여부',
    },
    delay: {
      control: { type: 'number', min: 0, max: 3000, step: 100 },
      description: '시작 지연 시간 (ms)',
    },
    children: {
      control: false,
      description: '애니메이션 후 등장할 콘텐츠',
    },
  },
};

export const Default = {
  args: {
    isTriggerOnView: false,
    delay: 0,
  },
  render: (args) => (
    <Box sx={{ maxWidth: 480 }}>
      <AreaConstruct {...args}>
        <Placeholder.Media ratio="16/9" />
      </AreaConstruct>
    </Box>
  ),
};

export const StaggeredDelay = {
  render: () => (
    <Stack spacing={4} sx={{ maxWidth: 480 }}>
      {[0, 300, 600].map((d, i) => (
        <AreaConstruct key={d} isTriggerOnView={false} delay={d}>
          <Placeholder.Media ratio="16/9" index={i} />
        </AreaConstruct>
      ))}
    </Stack>
  ),
};

export const WithText = {
  render: () => (
    <Box sx={{ maxWidth: 600 }}>
      <AreaConstruct isTriggerOnView={false}>
        <Box sx={{ p: 4, border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            Vibe Design Lab
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            디자이너를 위한 바이브 코딩 교육 플랫폼
          </Typography>
        </Box>
      </AreaConstruct>
    </Box>
  ),
};

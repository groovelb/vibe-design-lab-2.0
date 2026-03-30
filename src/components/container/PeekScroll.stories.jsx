import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { PeekScroll } from './PeekScroll';
import Placeholder from '../../common/ui/Placeholder';

export default {
  title: 'Component/2. Container/PeekScroll',
  component: PeekScroll,
  tags: ['autodocs'],
  argTypes: {
    peek: {
      control: { type: 'number', min: 0, max: 200, step: 8 },
      description: '다음 아이템 노출 크기 (px)',
    },
    gap: {
      control: { type: 'number', min: 0, max: 64, step: 4 },
      description: '아이템 간 간격 (px)',
    },
    isSnapEnabled: {
      control: 'boolean',
      description: 'scroll-snap 활성화 여부',
    },
    inset: {
      control: { type: 'number', min: 0, max: 64, step: 4 },
      description: '좌우 여백 (px). full-bleed 시 컨텐츠 정렬용',
    },
    children: { table: { disable: true } },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

const DEMO_ITEMS = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  label: `Card ${i + 1}`,
}));

export const Docs = {
  args: {
    peek: 40,
    gap: 16,
    isSnapEnabled: true,
    inset: 0,
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420, mx: 'auto', py: 4, overflow: 'hidden' }}>
      <Typography variant="h6" sx={{ px: 2, mb: 2 }}>
        기본 Peek Scroll
      </Typography>
      <PeekScroll {...args}>
        {DEMO_ITEMS.map((item) => (
          <Placeholder.Box key={item.id} label={item.label} height={200} />
        ))}
      </PeekScroll>
    </Box>
  ),
};

export const WithCards = {
  render: () => (
    <Box sx={{ maxWidth: 420, mx: 'auto', py: 4, overflow: 'hidden' }}>
      <Typography variant="h6" sx={{ px: 2, mb: 2 }}>
        카드 컨텐츠
      </Typography>
      <PeekScroll peek={48} gap={16}>
        {DEMO_ITEMS.map((item) => (
          <Box
            key={item.id}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              overflow: 'hidden',
            }}
          >
            <Placeholder.Media index={item.id} ratio="4/3" />
            <Box sx={{ p: 2 }}>
              <Placeholder.Text variant="heading" />
              <Placeholder.Paragraph lines={2} />
            </Box>
          </Box>
        ))}
      </PeekScroll>
    </Box>
  ),
};

export const WithInset = {
  render: () => (
    <Box sx={{ maxWidth: 420, mx: 'auto', py: 4, overflow: 'hidden' }}>
      <Typography variant="h6" sx={{ px: 3, mb: 2 }}>
        Inset (좌우 여백 정렬)
      </Typography>
      <PeekScroll peek={40} gap={16} inset={24}>
        {DEMO_ITEMS.map((item) => (
          <Placeholder.Box key={item.id} label={item.label} height={180} />
        ))}
      </PeekScroll>
    </Box>
  ),
};

export const NoSnap = {
  render: () => (
    <Box sx={{ maxWidth: 420, mx: 'auto', py: 4, overflow: 'hidden' }}>
      <Typography variant="h6" sx={{ px: 2, mb: 2 }}>
        Snap 비활성
      </Typography>
      <PeekScroll peek={60} gap={12} isSnapEnabled={false}>
        {DEMO_ITEMS.map((item) => (
          <Placeholder.Box key={item.id} label={item.label} height={160} />
        ))}
      </PeekScroll>
    </Box>
  ),
};

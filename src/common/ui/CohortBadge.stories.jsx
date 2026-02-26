import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CohortBadge } from './CohortBadge';

export default {
  title: 'Common/CohortBadge',
  component: CohortBadge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## CohortBadge

코호트(코스 기수) 상태를 표시하는 뱃지.
무채색 명도 차이로만 상태를 구분한다.

- **recruiting** — 밝은 배경, 모집 중 상태
- **ongoing** — 중간 명도, 진행 중 상태
- **upcoming** — 어두운 배경, 예정 상태
        `,
      },
    },
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['recruiting', 'ongoing', 'upcoming'],
      description: '코호트 상태',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: '뱃지 크기',
    },
  },
};

/**
 * 기본 (모집 중)
 */
export const Default = {
  args: {
    status: 'recruiting',
    size: 'md',
  },
};

/**
 * 전체 상태 비교
 */
export const AllStatuses = {
  render: () => (
    <Stack spacing={3} alignItems="center" sx={{ p: 4 }}>
      {['recruiting', 'ongoing', 'upcoming'].map((status) => (
        <Stack key={status} direction="row" spacing={2} alignItems="center">
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary', width: 80, textAlign: 'right' }}
          >
            {status}
          </Typography>
          <CohortBadge status={status} />
        </Stack>
      ))}
    </Stack>
  ),
};

/**
 * 크기 비교
 */
export const Sizes = {
  render: () => (
    <Stack spacing={3} alignItems="center" sx={{ p: 4 }}>
      {['sm', 'md'].map((size) => (
        <Stack key={size} spacing={1} alignItems="center">
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {size.toUpperCase()}
          </Typography>
          <Stack direction="row" spacing={1}>
            <CohortBadge status="recruiting" size={size} />
            <CohortBadge status="ongoing" size={size} />
            <CohortBadge status="upcoming" size={size} />
          </Stack>
        </Stack>
      ))}
    </Stack>
  ),
};

/**
 * 카드 내 사용 예시
 */
export const InCardContext = {
  render: () => (
    <Box
      sx={{
        p: 3,
        width: 280,
        backgroundColor: 'background.paper',
        border: 1,
        borderColor: 'divider',
      }}
    >
      <Stack spacing={1.5}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle2">UX 디자인 기초</Typography>
          <CohortBadge status="recruiting" size="sm" />
        </Stack>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          4주 과정 · 온라인
        </Typography>
      </Stack>
    </Box>
  ),
};

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { MythCard } from './MythCard';

export default {
  title: 'Component/3. Card/MythCard',
  component: MythCard,
  parameters: {
    docs: {
      description: {
        component: '통념 → 수직선 → 실제 구조의 편견 깨기 카드. 수직선이 남은 높이를 채워 시각적 거리감을 만든다.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    philosophy: { control: 'text' },
    conventional: { control: 'text' },
    reversal: { control: 'text' },
  },
};

export const Default = {
  args: {
    label: '도구의 편견',
    philosophy: '구현은 언어를 따른다',
    conventional: '더 좋은 AI 모델이 나오면 결과물이 좋아진다',
    reversal:
      '도구는 이미 충분합니다. 결과를 바꾸는 건 모델의 성능이 아니라 내 의도를 날카롭게 깎는 훈련입니다.',
  },
  decorators: [
    (Story) => (
      <Box sx={{ height: 400 }}>
        <Story />
      </Box>
    ),
  ],
};

export const ThreeUp = {
  render: () => (
    <Grid container spacing={6} sx={{ height: 500 }}>
      <Grid size={{ xs: 12, md: 4 }}>
        <MythCard
          label="도구의 편견"
          philosophy="구현은 언어를 따른다"
          conventional="더 좋은 AI 모델이 나오면 결과물이 좋아진다"
          reversal="도구는 이미 충분합니다. 결과를 바꾸는 건 모델의 성능이 아니라 내 의도를 날카롭게 깎는 훈련입니다."
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <MythCard
          label="디자인의 편견"
          philosophy="감각도 쪼개면 로직이다"
          conventional="일단 만들고, 디자인은 나중에 입히면 된다"
          reversal="디자인은 설계와 구현을 동시에 담당하는 언어입니다. 디자인이 다루는 범위를 알면, 설계가 곧 구현의 명세가 됩니다."
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <MythCard
          label="스킬의 편견"
          philosophy="언어는 경험을 함축한다"
          conventional="새 스킬을 빨리 배워야 살아남는다"
          reversal="스킬은 도구와 함께 바뀝니다. 경험이 축적된 언어 체계는 도구가 바뀌어도 남습니다."
        />
      </Grid>
    </Grid>
  ),
};

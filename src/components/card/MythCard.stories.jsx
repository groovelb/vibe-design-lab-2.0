import Grid from '@mui/material/Grid';
import { MythCard } from './MythCard';

export default {
  title: 'Component/3. Card/MythCard',
  component: MythCard,
  parameters: {
    docs: {
      description: {
        component: '통념 → 반전 2단 구조의 편견 깨기 카드.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    conventional: { control: 'text' },
    reversal: { control: 'text' },
  },
};

export const Default = {
  args: {
    label: '도구의 편견',
    conventional: '더 좋은 모델, 더 좋은 서비스가 나오면 결과가 달라진다',
    reversal:
      '도구는 이미 충분하다. 결과를 결정하는 건 도구의 성능이 아니라 의도의 정밀도다',
  },
};

export const ThreeUp = {
  render: () => (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12, md: 4 }}>
        <MythCard
          label="도구의 편견"
          conventional="더 좋은 모델, 더 좋은 서비스가 나오면 결과가 달라진다"
          reversal="도구는 이미 충분하다. 결과를 결정하는 건 도구의 성능이 아니라 의도의 정밀도다"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <MythCard
          label="디자인의 편견"
          conventional="일단 만들고, 디자인은 나중에 입히면 된다"
          reversal="디자인은 마지막에 입히는 것이 아니라, 설계와 구현을 동시에 결정하는 언어다"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <MythCard
          label="스킬의 편견"
          conventional="새 도구, 새 스킬을 빨리 배워야 살아남는다"
          reversal="스킬보다 먼저 바뀌어야 하는 건, 의도와 결과가 불일치하는 구조를 받아들이는 습관이다"
        />
      </Grid>
    </Grid>
  ),
};

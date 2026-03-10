import Grid from '@mui/material/Grid';
import { PainPointCard } from './PainPointCard';

export default {
  title: 'Component/3. Card/PainPointCard',
  component: PainPointCard,
  parameters: {
    docs: {
      description: {
        component: '굵은 라벨 + 설명 텍스트 구조의 페인포인트 카드.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
  },
};

export const Default = {
  args: {
    label: '정확한 의도',
    description: 'UX 설계를 중심으로 예측 가능한 결과물을 만듭니다',
  },
};

export const ThreeUp = {
  render: () => (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12, md: 4 }}>
        <PainPointCard
          label="정확한 의도"
          description="UX 설계를 중심으로 예측 가능한 결과물을 만듭니다"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <PainPointCard
          label="AI와의 공용어"
          description="디자인 택소노미로 사람과 AI가 같은 언어를 씁니다"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <PainPointCard
          label="설계 안의 구현"
          description="올바른 디자인 설계에는 이미 구현 공식이 들어 있습니다"
        />
      </Grid>
    </Grid>
  ),
};

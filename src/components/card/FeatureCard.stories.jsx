import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { FeatureCard } from './FeatureCard';

export default {
  title: 'Component/3. Card/FeatureCard',
  component: FeatureCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## FeatureCard

일러스트 + 제목 + 설명 구조의 가치 제안 카드.
기능 소개, 밸류 프로포지션 등 비주얼 중심 메시지 전달에 사용한다.

- \`illustrationSlot\`을 전달하면 커스텀 비주얼 표시
- 미전달 시 dashed placeholder 표시
        `,
      },
    },
  },
};

/**
 * 기본 (placeholder)
 */
export const Default = {
  args: {
    title: 'System Over Drawing',
    description: '그리기 전에 기준을 먼저 세운다. 결과물이 아니라 Grid + 토큰 + 규칙이 먼저다.',
  },
};

/**
 * 커스텀 일러스트
 */
export const WithIllustration = {
  args: {
    title: 'The Vibe Standard',
    description: '같은 키워드가 일관된 결과를 만든다. AI가 알아듣는 표준 디자인 언어.',
    illustrationSlot: (
      <Box
        sx={{
          width: '100%',
          height: 120,
          backgroundColor: 'action.hover',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'text.disabled',
          fontSize: '0.875rem',
        }}
      >
        Illustration
      </Box>
    ),
  },
};

/**
 * 3컬럼 그리드
 */
export const ThreeColumnGrid = {
  render: () => (
    <Grid container spacing={3}>
      {[
        { title: 'System Over Drawing', description: '그리기 전에 기준을 먼저 세운다' },
        { title: 'The Vibe Standard', description: '같은 키워드가 일관된 결과를 만든다' },
        { title: 'Design As Build', description: '설계가 곧 구현이 된다' },
      ].map((item) => (
        <Grid key={item.title} size={{ xs: 12, md: 4 }}>
          <FeatureCard title={item.title} description={item.description} />
        </Grid>
      ))}
    </Grid>
  ),
};

import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { StatementCard } from './StatementCard';

export default {
  title: 'Component/3. Card/StatementCard',
  component: StatementCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## StatementCard

제목 + 설명 구조의 간결한 진술형 카드.
문제 정의, 페르소나별 페인포인트 등 짧은 메시지 전달에 사용한다.
CardContainer 기반.

- **editorial** — 배경 투명, 보더 없음 (Landing 기본)
- **outlined** — 보더 있는 카드
        `,
      },
    },
  },
  argTypes: {
    cardVariant: {
      control: 'radio',
      options: ['editorial', 'outlined'],
    },
  },
};

/**
 * Editorial (Landing 기본)
 */
export const Editorial = {
  args: {
    title: '캔버스 디자이너',
    description: '채용 시장은 디자인 엔지니어를 찾는데, 나는 Figma 안에서만 영향력이 있다',
    cardVariant: 'editorial',
  },
};

/**
 * Outlined
 */
export const Outlined = {
  args: {
    title: 'VOD 한계',
    description: '혼자 듣는 VOD는 혼자 막히고 혼자 포기한다',
    cardVariant: 'outlined',
  },
};

/**
 * 3컬럼 그리드
 */
export const ThreeColumnGrid = {
  render: () => (
    <Grid container spacing={2}>
      {[
        { title: '캔버스 디자이너', description: '채용 시장은 디자인 엔지니어를 찾는데, 나는 Figma 안에서만 영향력이 있다' },
        { title: '샌드위치 PM', description: 'AI가 실행을 가져가는데, 보여줄 게 없는 기획자의 자리는 어디인가' },
        { title: '파이프라인 개발자', description: '구현은 되는데 왜 어색한지 설명을 못 한다' },
      ].map((item) => (
        <Grid key={item.title} size={{ xs: 12, md: 4 }}>
          <StatementCard title={item.title} description={item.description} />
        </Grid>
      ))}
    </Grid>
  ),
};

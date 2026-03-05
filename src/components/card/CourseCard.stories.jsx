import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Placeholder from '../../common/ui/Placeholder';
import { CourseCard } from './CourseCard';

export default {
  title: 'Component/3. Card/CourseCard',
  component: CourseCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## CourseCard

코스 정보를 표시하는 카드. CustomCard 기반.
미디어 + 코호트 배지 + 메타 정보 + 제목 + 부제 + 대상 + CTA 구조.

- **editorial** — 배경 투명, 보더 없음 (Landing 기본)
- **outlined** — 보더 있는 카드
        `,
      },
    },
  },
  argTypes: {
    cohortStatus: {
      control: 'radio',
      options: ['recruiting', 'ongoing', 'upcoming'],
    },
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
    mediaSlot: <Placeholder.Media index={0} ratio="1/1" />,
    cohortStatus: 'recruiting',
    duration: '4주',
    chapters: 8,
    title: '디자인 시스템 입문',
    subtitle: 'MUI 기반 컴포넌트 설계와 토큰 시스템을 배운다',
    target: '주니어 디자이너',
    ctaLabel: '자세히 보기',
    cardVariant: 'editorial',
  },
};

/**
 * Outlined
 */
export const Outlined = {
  args: {
    mediaSlot: <Placeholder.Media index={1} ratio="1/1" />,
    cohortStatus: 'ongoing',
    duration: '6주',
    chapters: 12,
    title: '바이브 코딩 실전',
    subtitle: 'AI와 협업하여 프로덕션 레벨 UI를 구현한다',
    target: '시니어 디자이너 · PM',
    ctaLabel: '자세히 보기',
    cardVariant: 'outlined',
  },
};

/**
 * 2컬럼 그리드
 */
export const TwoColumnGrid = {
  render: () => (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <CourseCard
          mediaSlot={<Placeholder.Media index={0} ratio="1/1" />}
          cohortStatus="recruiting"
          duration="4주"
          chapters={8}
          title="디자인 시스템 입문"
          subtitle="MUI 기반 컴포넌트 설계와 토큰 시스템을 배운다"
          target="주니어 디자이너"
          ctaLabel="자세히 보기"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CourseCard
          mediaSlot={<Placeholder.Media index={1} ratio="1/1" />}
          cohortStatus="ongoing"
          duration="6주"
          chapters={12}
          title="바이브 코딩 실전"
          subtitle="AI와 협업하여 프로덕션 레벨 UI를 구현한다"
          target="시니어 디자이너 · PM"
          ctaLabel="자세히 보기"
        />
      </Grid>
    </Grid>
  ),
};

/**
 * 최소 정보
 */
export const Minimal = {
  args: {
    title: '커뮤니티 워크숍',
    subtitle: '비정기 무료 세션',
  },
};

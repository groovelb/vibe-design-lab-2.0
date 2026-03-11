import { CardTextStack } from './CardTextStack';

export default {
  title: 'Component/1. Typography/CardTextStack',
  component: CardTextStack,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: '상단 캡션 라벨' },
    title: { control: 'text', description: '제목' },
    subtitle: { control: 'text', description: '부제목' },
    description: { control: 'text', description: '설명' },
  },
};

export const Docs = {
  args: {
    label: '현업 중심 예제',
    title: '한번 신기해하고 끝나는 예제가 아닙니다',
    description:
      '운영과 유지보수를 전제한 현업 수준의 예제를 다룹니다. 디자인 시스템의 확장, 데이터 구조의 변경, 컴포넌트의 유지보수 역량을 키웁니다.',
  },
};

export const TitleOnly = {
  args: {
    title: '사고와 구현의 주체를 일치시킨다',
  },
};

export const TitleWithSubtitle = {
  args: {
    title: 'System Over Drawing',
    subtitle: '결과물보다 기준을 먼저 설계합니다',
  },
};

export const TitleWithDescription = {
  args: {
    title: '정확한 의미 전달',
    description: 'UX 설계로 구조화된 의도를 전달합니다',
  },
};

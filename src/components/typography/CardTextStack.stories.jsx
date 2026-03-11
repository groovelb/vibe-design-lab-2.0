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
    size: {
      control: 'radio',
      options: ['md', 'lg'],
      description: '타이포 사이즈 (md: h4, lg: h3)',
    },
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

export const Large = {
  args: {
    size: 'lg',
    title: 'Vibe Design Starter Kit',
    subtitle: '디자인 자체를 구현 수단으로 활용하는 바이브 코딩 실전 코스',
    description:
      '디자인 사고로 제품을 설계하는 바이브 코딩. 준비된 Starter Kit과 함께 디자인 자체를 구현 수단으로 활용하는 연습을 합니다.',
  },
};

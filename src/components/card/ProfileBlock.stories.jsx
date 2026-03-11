import { ProfileBlock } from './ProfileBlock';

export default {
  title: 'Component/3. Card/ProfileBlock',
  component: ProfileBlock,
  tags: ['autodocs'],
  argTypes: {
    imageSrc: { control: 'text', description: '프로필 이미지 경로' },
    name: { control: 'text', description: '이름' },
    titles: { control: 'object', description: '직함/소속 배열' },
    projects: { control: 'object', description: '참여 프로젝트 배열 ({year, title})' },
    projectsLabel: { control: 'text', description: '프로젝트 섹션 라벨' },
  },
};

export const Default = {
  args: {
    name: 'DDD',
    titles: [
      'Data Driven Design 대표',
      'Vibe Design Lab 운영',
    ],
    projects: [
      { year: '2025', title: '금융·보험사 컴플라이언스 솔루션 디자인' },
      { year: '2024', title: 'Honest AI 인터랙티브 브랜딩 페이지 제작' },
      { year: '2022', title: '서울시 디지털시장실 디자인 컨설팅' },
    ],
    projectsLabel: '참여 프로젝트',
  },
};

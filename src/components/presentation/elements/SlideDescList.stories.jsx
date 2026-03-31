'use client';
import { SlideDescList } from './SlideDescList';
import { presentationTokens as t } from '../../../styles/themes/presentation';
import Box from '@mui/material/Box';

export default {
  title: 'Component/Presentation/Element/SlideDescList',
  component: SlideDescList,
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object', description: '항목 배열 [{ title, desc }]' },
    level: {
      control: 'select',
      options: ['headline', 'subtitle'],
      description: '제목 타이포 스케일',
    },
    gap: { control: { type: 'number', min: 0, max: 64 }, description: '항목 간 간격 (px)' },
  },
  decorators: [
    (Story) => (
      <Box sx={{ bgcolor: t.color.bg, p: `${t.slide.padding.x}px` }}>
        <Story />
      </Box>
    ),
  ],
};

export const Docs = {
  args: {
    items: [
      { title: '팀빌딩이 완성되지 않은 스타트업', desc: '이빨이 하나 없어도 사업이 돌아가게 도와줍니다.' },
      { title: 'R & D 가 필요한 MVP 시장 진출', desc: '결정장애가 왔을때 무엇을 어떻게 만들지 고민합니다.' },
      { title: '인터랙티브 웹 + 데이터 시각화', desc: '이런건 어떻게 만들지? 라는걸 만들어 줍니다.' },
    ],
    level: 'headline',
  },
};

export const Subtitle = {
  args: {
    items: [
      { title: '소셜 미디어 스타트업', desc: '사용자 리서치, UX 디자인, 프로토타이핑' },
      { title: '여행 스타트업', desc: '프로덕트 디자인, 디자인 시스템, 프론트엔드 개발' },
    ],
    level: 'subtitle',
  },
};

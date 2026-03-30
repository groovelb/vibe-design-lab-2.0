'use client';
import { SlideList } from './SlideList';
import { presentationTokens as t } from '../../../styles/themes/presentation';
import Box from '@mui/material/Box';

export default {
  title: 'Component/Presentation/Element/SlideList',
  component: SlideList,
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object', description: '리스트 항목 배열' },
    variant: {
      control: 'select',
      options: ['bullet', 'number'],
      description: '불렛 / 넘버',
    },
    level: {
      control: 'select',
      options: ['headline', 'body'],
      description: '텍스트 크기',
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
      'Typography — 텍스트 표현과 장식',
      'Container — 시각적 경계와 그룹핑',
      'Card — 독립적 정보 단위',
      'Media — 이미지, 비디오 표시',
    ],
    variant: 'bullet',
    level: 'body',
  },
};

export const Numbered = {
  args: {
    items: [
      '텍소노미 카테고리 확인',
      '해당 디렉토리에 생성',
      '스토리 co-locate',
    ],
    variant: 'number',
    level: 'headline',
  },
};

'use client';
import { SlideTitle } from './SlideTitle';
import { presentationTokens as t } from '../../../styles/themes/presentation';
import Box from '@mui/material/Box';

export default {
  title: 'Component/Presentation/Element/SlideTitle',
  component: SlideTitle,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text', description: '타이틀 텍스트' },
    level: {
      control: 'select',
      options: [1, 2],
      description: '1=title 스케일, 2=subtitle 스케일',
    },
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
    children: '바이브 디자인: 관점의 전환',
    level: 1,
  },
};

export const Level2 = {
  args: {
    children: '디자인 택소노미 활용법',
    level: 2,
  },
};

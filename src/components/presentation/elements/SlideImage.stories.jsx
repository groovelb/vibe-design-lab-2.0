'use client';
import { SlideImage } from './SlideImage';
import { presentationTokens as t } from '../../../styles/themes/presentation';
import { placeholderSvg } from '../../../common/ui/Placeholder';
import Box from '@mui/material/Box';

export default {
  title: 'Component/Presentation/Element/SlideImage',
  component: SlideImage,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text', description: '이미지 경로' },
    alt: { control: 'text', description: '대체 텍스트' },
    ratio: {
      control: 'select',
      options: ['original', '16/9', '4/3', '1/1'],
      description: '이미지 비율',
    },
    caption: { control: 'text', description: '이미지 캡션' },
    objectFit: {
      control: 'select',
      options: ['cover', 'contain'],
      description: '이미지 피팅',
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ bgcolor: t.color.bg, p: `${t.slide.padding.x}px`, maxWidth: 600 }}>
        <Story />
      </Box>
    ),
  ],
};

export const Docs = {
  args: {
    src: placeholderSvg(800, 450),
    alt: '예제 이미지',
    ratio: '16/9',
    caption: '그림 1. 디자인 시스템 구조도',
    objectFit: 'contain',
  },
};

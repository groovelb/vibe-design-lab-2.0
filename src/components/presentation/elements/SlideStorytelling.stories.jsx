'use client';
import { SlideStorytelling } from './SlideStorytelling';
import { presentationTokens as t } from '../../../styles/themes/presentation';
import Box from '@mui/material/Box';

export default {
  title: 'Component/Presentation/Element/SlideStorytelling',
  component: SlideStorytelling,
  tags: ['autodocs'],
  argTypes: {
    from: { control: 'text', description: '원인/질문 문장' },
    to: { control: 'text', description: '결과/답변 문장' },
    arrowLabel: { control: 'text', description: '화살표 옆 라벨' },
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: '화살표 방향',
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ bgcolor: t.color.bg, p: `${t.slide.padding.x}px`, minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Story />
      </Box>
    ),
  ],
};

export const Docs = {
  args: {
    from: '도구가 바뀌면 무엇이 남는가?',
    to: '디자인 언어 체계가 남는다',
    direction: 'vertical',
  },
};

export const WithLabel = {
  args: {
    from: '맥락적 오류',
    to: '컴파일 오류',
    arrowLabel: 'vs',
    direction: 'horizontal',
  },
};

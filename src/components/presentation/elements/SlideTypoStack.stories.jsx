'use client';
import { SlideTypoStack } from './SlideTypoStack';
import { presentationTokens as t } from '../../../styles/themes/presentation';
import Box from '@mui/material/Box';

export default {
  title: 'Component/Presentation/Element/SlideTypoStack',
  component: SlideTypoStack,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: '타이틀 (title 스케일)' },
    subtitle: { control: 'text', description: '서브타이틀 (subtitle 스케일)' },
    headline: { control: 'text', description: '항목 헤드라인 (headline 스케일)' },
    body: { control: 'text', description: '본문 (body 스케일)' },
    gap: { control: { type: 'number', min: 0, max: 100 }, description: '요소 간 간격 (px)' },
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
    title: '디자인 택소노미',
    subtitle: '15카테고리 분류 체계',
    headline: '컴포넌트와 스타일의 분류',
    body: '포화상태 분류체계 — 새로운 UI 패턴이 등장해도 체계 안에서 설명 가능하다.',
  },
};

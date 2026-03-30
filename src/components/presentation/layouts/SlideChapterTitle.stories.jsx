'use client';
import { SlideChapterTitle } from './SlideChapterTitle';
import { SlideMaster } from '../SlideMaster';

export default {
  title: 'Component/Presentation/Layout/SlideChapterTitle',
  component: SlideChapterTitle,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    overline: { control: 'text', description: '챕터 라벨' },
    title: { control: 'text', description: '챕터 제목' },
    summary: { control: 'text', description: '챕터 요약' },
    toc: { control: 'object', description: '목차 항목 배열' },
  },
  decorators: [
    (Story) => (
      <SlideMaster>
        <Story />
      </SlideMaster>
    ),
  ],
};

export const Docs = {
  args: {
    overline: 'CHAPTER 02',
    title: '바이브 디자인: 관점의 전환',
    summary: '이 챕터에서는 바이브 디자인의 핵심 개념을 소개하고, 디자인 택소노미가 왜 중요한지 탐구합니다.',
    toc: [
      '왜 바이브 디자인인가',
      '디자인 택소노미 활용법: 컴포넌트와 스타일의 분류 체계',
      '왜 프레임워크가 필요한가: 피그마와 React.js의 관계',
      '디자인 vs 개발 생태계 비교하기',
      '개발환경 세팅 & 익숙해지기',
    ],
  },
};

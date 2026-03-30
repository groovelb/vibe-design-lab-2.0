'use client';
import { SlideMessage } from './SlideMessage';
import { SlideMaster } from '../SlideMaster';

export default {
  title: 'Component/Presentation/Layout/SlideMessage',
  component: SlideMessage,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    children: { control: 'text', description: '메시지 콘텐츠' },
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
    children: '"디자인은 항상 체계였다"',
  },
};

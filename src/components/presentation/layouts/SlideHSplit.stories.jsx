'use client';
import { SlideHSplit } from './SlideHSplit';
import { SlideTypoStack } from '../elements/SlideTypoStack';
import { SlideList } from '../elements/SlideList';
import { SlideMaster } from '../SlideMaster';
import Placeholder from '../../../common/ui/Placeholder';

export default {
  title: 'Component/Presentation/Layout/SlideHSplit',
  component: SlideHSplit,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    columns: {
      control: 'select',
      options: [2, 3, 4],
      description: '컬럼 수',
    },
    gap: { control: { type: 'number', min: 0, max: 100 }, description: '컬럼 간 간격 (px)' },
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
  render: (args) => (
    <SlideHSplit {...args}>
      <SlideTypoStack
        title="왼쪽 콘텐츠"
        body="디자인 언어 체계가 AI를 위한 설계도가 되는 과정을 설명합니다."
      />
      <SlideList
        items={['Typography', 'Container', 'Card', 'Media', 'Data Display']}
        level="headline"
      />
    </SlideHSplit>
  ),
  args: {
    columns: 2,
  },
};

export const ThreeColumns = {
  render: () => (
    <SlideHSplit columns={3}>
      <Placeholder.Box label="1/3" height={200} />
      <Placeholder.Box label="2/3" height={200} />
      <Placeholder.Box label="3/3" height={200} />
    </SlideHSplit>
  ),
};

'use client';
import { SlideGrid } from './SlideGrid';
import { SlideMaster } from '../SlideMaster';
import Placeholder from '../../../common/ui/Placeholder';

export default {
  title: 'Component/Presentation/Layout/SlideGrid',
  component: SlideGrid,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    columns: { control: { type: 'number', min: 1, max: 6 }, description: '컬럼 수' },
    rows: { control: { type: 'number', min: 1, max: 6 }, description: '행 수' },
    gap: { control: { type: 'number', min: 0, max: 100 }, description: '셀 간 간격 (px)' },
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
    <SlideGrid {...args}>
      {Array.from({ length: args.columns * (args.rows || 2) }, (_, i) => (
        <Placeholder.Box key={i} label={`${Math.floor(i / args.columns) + 1},${(i % args.columns) + 1}`} height={120} />
      ))}
    </SlideGrid>
  ),
  args: {
    columns: 3,
    rows: 2,
  },
};

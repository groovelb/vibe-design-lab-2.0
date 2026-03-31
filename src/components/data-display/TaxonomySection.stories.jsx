import { TaxonomySection } from './TaxonomySection';

export default {
  title: 'Component/5. Data Display/TaxonomySection',
  component: TaxonomySection,
  tags: ['autodocs'],
  argTypes: {
    defaultViewMode: {
      control: 'select',
      options: ['list', 'tree'],
      description: '초기 뷰 모드',
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = {
  args: {
    defaultViewMode: 'list',
  },
};

export const TreeView = {
  args: {
    defaultViewMode: 'tree',
  },
};

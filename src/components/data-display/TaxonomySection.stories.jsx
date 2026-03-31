import { TaxonomySection } from './TaxonomySection';
import { TAXONOMY, TAXONOMY_STATS } from '../../data/taxonomyData';

export default {
  title: 'Component/5. Data Display/TaxonomySection',
  component: TaxonomySection,
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'TAXONOMY 배열 (4개 Part)',
    },
    stats: {
      control: 'object',
      description: 'TAXONOMY_STATS 객체 { parts, categories, keywords }',
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = {
  args: {
    data: TAXONOMY,
    stats: TAXONOMY_STATS,
  },
};

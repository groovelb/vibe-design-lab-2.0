import Box from '@mui/material/Box';
import { TaxonomyTree } from './TaxonomyTree';

/**
 * 샘플 텍소노미 데이터
 */
const sampleData = [
  {
    id: 'typography',
    label: '#1 Typography',
    children: [
      { id: 'fit-text', label: 'FitText' },
      { id: 'title', label: 'Title' },
      { id: 'quoted-container', label: 'QuotedContainer' },
    ],
  },
  {
    id: 'container',
    label: '#2 Container',
    children: [
      { id: 'section-container', label: 'SectionContainer' },
      { id: 'comparison-block', label: 'ComparisonBlock' },
      { id: 'course-cta-block', label: 'CourseCTABlock' },
    ],
  },
  {
    id: 'card',
    label: '#3 Card',
    children: [
      { id: 'card-container', label: 'CardContainer' },
      { id: 'custom-card', label: 'CustomCard' },
      { id: 'testimonial-card', label: 'TestimonialCard' },
      {
        id: 'community-activity-card',
        label: 'CommunityActivityCard',
      },
    ],
  },
  {
    id: 'media',
    label: '#4 Media',
    children: [
      { id: 'aspect-media', label: 'AspectMedia' },
      { id: 'image-carousel', label: 'ImageCarousel' },
    ],
  },
  {
    id: 'data-display',
    label: '#5 Data Display',
    children: [
      { id: 'taxonomy-tree', label: 'TaxonomyTree' },
    ],
  },
];

export default {
  title: 'Component/5. Data Display/TaxonomyTree',
  component: TaxonomyTree,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## TaxonomyTree

트리 구조의 텍소노미(분류 체계)를 표시하는 컴포넌트.
MUI SimpleTreeView 기반, Monoline 스타일의 1px 연결선.

- **full** — 전체 노드 펼침/접기 가능
- **preview** — 최대 2레벨, "더 보기" 표시
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['full', 'preview'],
    },
  },
};

/**
 * 기본 (full)
 */
export const Default = {
  args: {
    data: sampleData,
    variant: 'full',
    defaultExpanded: ['typography', 'container'],
  },
};

/**
 * Preview 모드
 */
export const Preview = {
  args: {
    data: sampleData,
    variant: 'preview',
    defaultExpanded: ['typography'],
  },
};

/**
 * 제한 폭
 */
export const InContainer = {
  render: () => (
    <Box sx={{ maxWidth: 360, mx: 'auto' }}>
      <TaxonomyTree
        data={sampleData}
        variant="full"
        defaultExpanded={['typography', 'card']}
      />
    </Box>
  ),
};

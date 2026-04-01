import { StickyNodeExplorer } from './StickyNodeExplorer';
import {
  MINI_GRAPHS, NODE_DESCRIPTIONS, SCROLL_STEPS,
} from '../../data/claudeCodeExperimentData';

export default {
  title: 'Component/5. Data Display/StickyNodeExplorer',
  component: StickyNodeExplorer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    nodes: { control: 'object', description: '전체 노드 배열' },
    edges: { control: 'object', description: '전체 엣지 배열' },
    steps: { control: 'object', description: '스크롤 스텝 배열' },
    descriptions: { control: 'object', description: '노드 ID → 설명 맵' },
  },
};

export const Docs = {
  args: {
    nodes: MINI_GRAPHS[2].nodes,
    edges: MINI_GRAPHS[2].edges,
    steps: SCROLL_STEPS[2],
    descriptions: NODE_DESCRIPTIONS[2],
  },
};

export const Act3Control = {
  args: {
    nodes: MINI_GRAPHS[3].nodes,
    edges: MINI_GRAPHS[3].edges,
    steps: SCROLL_STEPS[3],
    descriptions: NODE_DESCRIPTIONS[3],
  },
};

export const Act4Legion = {
  args: {
    nodes: MINI_GRAPHS[4].nodes,
    edges: MINI_GRAPHS[4].edges,
    steps: SCROLL_STEPS[4],
    descriptions: NODE_DESCRIPTIONS[4],
  },
};

export const Act5Autonomy = {
  args: {
    nodes: MINI_GRAPHS[5].nodes,
    edges: MINI_GRAPHS[5].edges,
    steps: SCROLL_STEPS[5],
    descriptions: NODE_DESCRIPTIONS[5],
  },
};

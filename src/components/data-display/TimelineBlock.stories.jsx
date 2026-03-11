import { TimelineBlock } from './TimelineBlock';

export default {
  title: 'Component/5. Data Display/TimelineBlock',
  component: TimelineBlock,
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object', description: '타임라인 항목 배열 ({chapterNum, title, description?})' },
  },
};

export const Default = {
  args: {
    items: [
      { chapterNum: 1, title: '바이브 디자인 환경 완벽 적응하기' },
      { chapterNum: 2, title: '응용 1 – 감도높은 브랜드 웹사이트 클론디자인' },
      { chapterNum: 3, title: '응용 2 – 스타터 베이스 만들기' },
      { chapterNum: 4, title: '개인 사이드 프로젝트 완성' },
    ],
  },
};

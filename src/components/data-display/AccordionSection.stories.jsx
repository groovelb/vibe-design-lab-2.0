import { AccordionSection } from './AccordionSection';

const curriculumItems = [
  {
    id: 'ch1',
    title: '바이브 디자인 환경 완벽 적응하기',
    items: [
      '디자인과 개발 생태계의 연관성 완벽 이해',
      '스타터 키트의 기본 구성과 역할 파악',
      'UX 계층구조 관점에서 바라본 바이브 코딩 방법론',
    ],
  },
  {
    id: 'ch2',
    title: '응용 1 – 감도높은 브랜드 웹사이트 클론디자인',
    items: [
      '조명 브랜드에 맞는 레이아웃·컬러·타이포 튜닝',
      '조명 브랜드 UX 섹션 구조 설계와 컴포넌트 매핑',
      '스타터 키트 기반 조명 브랜드 랜딩 페이지 클론',
    ],
  },
];

const faqItems = [
  {
    id: 'faq-1',
    question: '개발 지식이 거의 없어도 수강할 수 있나요?',
    answer: '네. 터미널과 에디터를 처음 써보셔도, 디자인 실무 경험이 있다면 스타터 키트를 중심으로 충분히 따라올 수 있도록 구성했습니다.',
  },
  {
    id: 'faq-2',
    question: '프론트엔드 개발자인데 디자인이 약합니다.',
    answer: '네. 이미 개발 흐름을 알고 있다면, 스타터 키트를 통해 디자인 시스템과 패턴을 조합하는 법을 집중적으로 연습하게 됩니다.',
  },
];

export default {
  title: 'Component/5. Data Display/AccordionSection',
  component: AccordionSection,
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object', description: '아코디언 항목 배열' },
    defaultExpandedId: { control: 'text', description: '기본 펼침 항목 ID' },
    variant: {
      control: 'select',
      options: ['curriculum', 'faq'],
      description: '아코디언 스타일 변형',
    },
  },
};

export const Default = {
  args: {
    variant: 'faq',
    items: faqItems,
  },
};

export const Curriculum = {
  args: {
    variant: 'curriculum',
    items: curriculumItems,
    defaultExpandedId: 'ch1',
  },
};

export const FAQ = {
  args: {
    variant: 'faq',
    items: faqItems,
  },
};

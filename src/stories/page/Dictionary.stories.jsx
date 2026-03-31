import { DictionaryPage } from '../../components/page/DictionaryPage';

export default {
  title: 'Page/Dictionary',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Dictionary Page

Vibe Dictionary — 디자인 패턴의 분류 체계.
4 Parts · 20 Categories · 207+ Keywords.

**구성:**
Hero → Stats Strip → Part Tabs (Sticky) → Taxonomy Body (Accordion) → Bottom CTA
        `,
      },
    },
  },
};

/**
 * ## 전체 페이지
 *
 * Dictionary 페이지 전체 플로우.
 */
export const FullPage = {
  render: () => <DictionaryPage />,
};

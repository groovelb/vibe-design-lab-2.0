import { DictionaryPage } from '@/components/page/DictionaryPage';

export const metadata = {
  title: 'Dictionary',
  description:
    'Vibe Dictionary — 디자인 패턴의 분류 체계. 도구가 바뀌어도 유효한 200개 이상의 디자인 키워드를 제공합니다.',
};

export default function Page() {
  return <DictionaryPage />;
}

import { DictionaryPage } from '@/components/page/DictionaryPage';

export const metadata = {
  title: 'Vibe Dictionary — AI가 이해하는 디자인 언어 체계',
  description:
    '200+ 디자인 키워드. 디자인 시스템의 기준을 AI가 이해하는 언어로 번역한 체계. 도구가 바뀌어도 이 키워드는 남습니다.',
  alternates: {
    canonical: 'https://vibedesignlab.net/dictionary',
  },
};

export default function Page() {
  return <DictionaryPage />;
}

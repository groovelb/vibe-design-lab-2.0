import { LandingPage } from '@/components/page/LandingPage';

export const metadata = {
  title: 'Vibe Design Lab — 디자이너를 위한 바이브 코딩 교육',
  description:
    '바이브 코딩, 내맘대로 되고 있나요? 디자인 사고로 제품을 설계하는 바이브 코딩 교육. 디자인 언어 체계와 커뮤니티 학습으로 시작하세요.',
  openGraph: {
    title: 'Vibe Design Lab — 디자이너를 위한 바이브 코딩 교육',
    description:
      '되는 대로가 아니라 의도대로. 디자인 언어 체계를 배우면 AI 결과물이 달라집니다.',
  },
  alternates: {
    canonical: 'https://vibedesignlab.net',
  },
};

export default function HomePage() {
  return <LandingPage />;
}

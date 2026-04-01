import { ClaudeCodeExperimentPage } from '@/components/page/ClaudeCodeExperimentPage';

export const metadata = {
  title: '클로드 코드 유출 — 512K 줄 속에 숨겨진 협상 프로토콜',
  description:
    '클로드 코드 유출 512,000줄을 읽었습니다. 코딩 도구가 아니었습니다. 이중 빌드, 단일 관문, 단방향 거울, 거부하는 기계, 각성 스위치 — 당신의 의도와 AI의 능력 사이를 조율하는 협상 프로토콜의 인터랙티브 해부 보고서.',
  alternates: {
    canonical: 'https://vibedesignlab.net/experiment/claude-code',
  },
};

export default function Page() {
  return <ClaudeCodeExperimentPage />;
}

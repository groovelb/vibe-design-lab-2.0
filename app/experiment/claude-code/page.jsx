import { ClaudeCodeExperimentPage } from '@/components/page/ClaudeCodeExperimentPage';

export const metadata = {
  title: '해부 — Claude Code 512K',
  description:
    'AI 코딩 도구의 소스 코드 유출. 512,000줄의 TypeScript 속에서 발견한 4계층 빙산의 인터랙티브 해부 보고서.',
};

export default function Page() {
  return <ClaudeCodeExperimentPage />;
}

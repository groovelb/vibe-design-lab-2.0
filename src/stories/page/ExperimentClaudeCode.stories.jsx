import { AmbientGrainedBackground } from '../../components/dynamic-color/AmbientGrainedBackground';
import { ClaudeCodeExperimentPage } from '../../components/page/ClaudeCodeExperimentPage';

export default {
  title: 'Page/Experiment — Claude Code',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Experiment: Claude Code 해부

AI 코딩 도구 소스 코드 512K LOC 유출 분석을
스크롤-드리븐 빙산 다이브로 체험하는 인터랙티브 스토리텔링.

**구조:** Prologue → Act 1–5 → Epilogue → Outro (8 섹션)
**수심 = 스크롤:** 밝은 수면(vdl-50) → 어두운 심해(vdl-950)
        `,
      },
    },
  },
};

/**
 * ## 전체 페이지
 *
 * 8개 섹션이 조립된 빙산 다이브 전체 플로우.
 * Prologue(밝은 배경) → 수면선 → Act 1–5(점진적 어둠) → Epilogue → Outro
 */
export const FullPage = {
  render: () => (
    <>
      <AmbientGrainedBackground />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <ClaudeCodeExperimentPage />
      </div>
    </>
  ),
};

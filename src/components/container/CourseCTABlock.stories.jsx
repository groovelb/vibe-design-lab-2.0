import Box from '@mui/material/Box';
import { CourseCTABlock } from './CourseCTABlock';

export default {
  title: 'Component/2. Container/CourseCTABlock',
  component: CourseCTABlock,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## CourseCTABlock

서브페이지 하단에 공통으로 배치되는 코스 유도 블록.
중앙 정렬 헤드라인 + CTA 버튼으로 구성.

- Dictionary, Experiment, Story 등 서브페이지 하단 공통 사용
        `,
      },
    },
  },
};

/**
 * 기본
 */
export const Default = {
  args: {
    headline: '지금 코호트에 합류하세요',
    ctaLabel: '코스 보기',
    ctaHref: '/courses',
  },
};

/**
 * 다른 메시지
 */
export const AlternateMessage = {
  args: {
    headline: '디자인 시스템, 함께 만들어 볼까요?',
    ctaLabel: '무료 체험 시작',
    ctaHref: '/trial',
  },
};

/**
 * 제한 폭
 */
export const InContainer = {
  render: () => (
    <Box sx={{ maxWidth: 720, mx: 'auto' }}>
      <CourseCTABlock
        headline="실전 프로젝트로 성장하세요"
        ctaLabel="커리큘럼 확인"
        ctaHref="/courses/design-system"
      />
    </Box>
  ),
};

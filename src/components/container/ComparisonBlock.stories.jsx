import Box from '@mui/material/Box';
import { ComparisonBlock } from './ComparisonBlock';

export default {
  title: 'VDL/ComparisonBlock',
  component: ComparisonBlock,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## ComparisonBlock

좌우 대비 블록. SplitScreen 기반으로 두 그룹의 항목을 나란히 비교한다.
무채색 명도 차이로 negative / positive 톤을 표현한다.

- 모바일에서 상하 스택 전환
- tone으로 시각적 강약 조절
        `,
      },
    },
  },
  argTypes: {
    leftTone: {
      control: 'select',
      options: ['negative', 'positive', 'neutral'],
    },
    rightTone: {
      control: 'select',
      options: ['negative', 'positive', 'neutral'],
    },
  },
};

/**
 * 기본 (VOD vs VDL 비교)
 */
export const Default = {
  args: {
    leftLabel: '일반 VOD 학습',
    rightLabel: 'VDL 코호트 학습',
    leftItems: [
      '혼자서 영상 시청',
      '일방향 강의, 질문 불가',
      '완강률 15% 미만',
      '포트폴리오 없음',
    ],
    rightItems: [
      '동기와 함께 진행',
      '실시간 피드백 & 코드 리뷰',
      '4주 완주율 89%',
      '실전 프로젝트 결과물',
    ],
    leftTone: 'negative',
    rightTone: 'positive',
  },
};

/**
 * Neutral 톤
 */
export const NeutralComparison = {
  args: {
    leftLabel: 'Before',
    rightLabel: 'After',
    leftItems: [
      '산발적인 컴포넌트 관리',
      '디자인-개발 간 불일치',
      '반복적인 스타일 작업',
    ],
    rightItems: [
      '체계적 디자인 시스템',
      '디자인 토큰으로 일관성 보장',
      '재사용 가능한 컴포넌트',
    ],
    leftTone: 'neutral',
    rightTone: 'neutral',
  },
};

/**
 * 제한된 폭 안에서
 */
export const InContainer = {
  render: () => (
    <Box sx={{ maxWidth: 720, mx: 'auto' }}>
      <ComparisonBlock
        leftLabel="독학"
        rightLabel="코호트"
        leftItems={[
          '방향성 없는 학습',
          '피드백 부재',
          '동기 부여 어려움',
        ]}
        rightItems={[
          '커리큘럼 기반 학습',
          '전문가 피드백',
          '동기 부여 커뮤니티',
        ]}
      />
    </Box>
  ),
};

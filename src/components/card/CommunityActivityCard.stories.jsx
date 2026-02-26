import Stack from '@mui/material/Stack';
import { CommunityActivityCard } from './CommunityActivityCard';

export default {
  title: 'Component/3. Card/CommunityActivityCard',
  component: CommunityActivityCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## CommunityActivityCard

커뮤니티 활동(질문, 챌린지, 피드백)을 미리보기로 표시하는 카드.
본문은 3줄 line-clamp으로 잘림 처리한다.
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['question', 'challenge', 'feedback'],
    },
  },
};

/**
 * 기본 (질문)
 */
export const Default = {
  args: {
    type: 'question',
    contentPreview: 'MUI 테마 커스텀에서 colorSchemes를 dark/light 모두 설정했는데, 특정 컴포넌트에서만 라이트 모드가 적용되지 않습니다. cssVariables: true 설정도 했는데 어디를 확인해야 할까요?',
    memberName: '김질문',
    timestamp: '2시간 전',
  },
};

/**
 * 전체 유형 비교
 */
export const AllTypes = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 400 }}>
      <CommunityActivityCard
        type="question"
        contentPreview="컴포넌트 props 구조를 잡을 때 variant와 size를 분리하는 게 나은지, 하나의 preset으로 합치는 게 나은지 고민입니다."
        memberName="이고민"
        timestamp="30분 전"
      />
      <CommunityActivityCard
        type="challenge"
        contentPreview="이번 주 챌린지: 기존 프로젝트의 색상 시스템을 violet-tinted grayscale로 마이그레이션하기. 변환 전후 스크린샷을 공유해주세요."
        memberName="박도전"
        timestamp="1일 전"
      />
      <CommunityActivityCard
        type="feedback"
        contentPreview="SplitScreen 컴포넌트의 stackAt 기능이 정말 편리합니다. 다만 ratio prop에 커스텀 비율을 넣을 때 검증 로직이 있으면 좋겠어요."
        memberName="최피드백"
        timestamp="3시간 전"
      />
    </Stack>
  ),
};

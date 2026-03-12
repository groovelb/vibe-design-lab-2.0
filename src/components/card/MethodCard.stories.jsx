import Box from '@mui/material/Box';
import { MethodCard } from './MethodCard';
import { Network, BookOpenText, UsersRound, Layers } from 'lucide-react';

export default {
  title: 'Component/3. Card/MethodCard',
  component: MethodCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## MethodCard

좌측 아이콘 + 우측 텍스트 구조의 학습 방식 카드.
데스크탑에서 수평, 모바일에서 수직 레이아웃.
        `,
      },
    },
  },
  argTypes: {
    icon: { control: false, description: 'lucide-react 아이콘 컴포넌트' },
    label: { control: 'text', description: '카테고리 라벨' },
    title: { control: 'text', description: '카드 제목' },
    description: { control: 'text', description: '카드 설명' },
  },
};

export const Default = {
  args: {
    icon: Network,
    label: '연결된 환경',
    title: '리드와 참여자가 연결되있습니다',
    description:
      'Discord와 학습 플랫폼에서 리드와 수강생이 실시간으로 연결됩니다. 챕터마다 챌린지를 수행하고, 서로의 진행 상황이 보입니다.',
  },
};

export const AllVariants = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <MethodCard
        icon={Network}
        label="연결된 환경"
        title="리드와 참여자가 연결되있습니다"
        description="Discord와 학습 플랫폼에서 리드와 수강생이 실시간으로 연결됩니다."
      />
      <MethodCard
        icon={BookOpenText}
        label="학습 경험 공유"
        title="모든 질의 응답이 기록됩니다"
        description="질문은 해당 챕터에 바로 연결됩니다. 같은 지점을 고민한 동료의 질문과 시행착오도 함께 보입니다."
      />
      <MethodCard
        icon={UsersRound}
        label="참여자 주도"
        title="커리큘럼에 참여자 의견이 반영됩니다"
        description="코스 완주 후에도 추가 웨비나에 참여하고, 연 2회 커리큘럼 개정에 직접 의견을 제시할 수 있습니다."
      />
      <MethodCard
        icon={Layers}
        label="현업 중심 예제"
        title="한번 신기해하고 끝나는 예제가 아닙니다"
        description="운영과 유지보수를 전제한 현업 수준의 예제를 다룹니다."
      />
    </Box>
  ),
};

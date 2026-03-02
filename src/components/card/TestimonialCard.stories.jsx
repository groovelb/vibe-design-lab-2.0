import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { TestimonialCard } from './TestimonialCard';

export default {
  title: 'VDL/TestimonialCard',
  component: TestimonialCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## TestimonialCard

수강생 증언을 인용 스타일로 표시하는 카드.
QuotedContainer로 인용문 스타일링, full variant에서 AspectMedia로 결과물 미리보기.

- **compact** — Landing 페이지용 짧은 인용
- **full** — Course Detail용 전체 인용 + 결과물
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['compact', 'full'],
    },
  },
};

/**
 * Compact (Landing 용)
 */
export const Compact = {
  args: {
    quote: '코호트 덕분에 혼자서는 절대 만들 수 없었던 포트폴리오가 완성되었습니다. 피드백이 정말 큰 차이를 만들어요.',
    quoteShort: '코호트 덕분에 포트폴리오가 완성되었습니다.',
    memberName: '김설계',
    memberRole: 'UX 디자이너, 3년차',
    memberPersona: '커리어 전환자',
    variant: 'compact',
  },
};

/**
 * Full (Course Detail 용)
 */
export const Full = {
  args: {
    quote: '코호트 덕분에 혼자서는 절대 만들 수 없었던 포트폴리오가 완성되었습니다. 매주 피드백을 받으며 방향을 잡아갈 수 있었고, 동기들과 함께하니 완주할 수 있었습니다.',
    memberName: '김설계',
    memberRole: 'UX 디자이너, 3년차',
    memberPersona: '커리어 전환자',
    resultImage: 'https://placehold.co/640x360/1a1a2e/e0e0e0?text=Result',
    resultUrl: '#',
    variant: 'full',
  },
};

/**
 * 여러 카드 나열
 */
export const MultipleCards = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 480 }}>
      <TestimonialCard
        quote="실무에서 바로 쓸 수 있는 컴포넌트 설계를 배웠습니다."
        memberName="이코드"
        memberRole="프론트엔드 개발자"
        variant="compact"
      />
      <TestimonialCard
        quote="디자인 시스템을 체계적으로 구축하는 방법을 알게 되었어요."
        memberName="박디자인"
        memberRole="프로덕트 디자이너, 5년차"
        memberPersona="시니어 전환"
        variant="compact"
      />
      <TestimonialCard
        quote="혼자 고민하던 문제를 동기들과 함께 해결할 수 있었습니다."
        memberName="최실험"
        memberRole="UX 리서처"
        variant="compact"
      />
    </Stack>
  ),
};

/**
 * 제한 폭
 */
export const InContainer = {
  render: () => (
    <Box sx={{ maxWidth: 560, mx: 'auto' }}>
      <TestimonialCard
        quote="4주 동안 매주 과제를 제출하고 피드백을 받으니, 혼자서는 1년이 걸렸을 성장을 한 달 만에 경험했습니다."
        memberName="정성장"
        memberRole="주니어 개발자"
        resultImage="https://placehold.co/640x360/1a1a2e/e0e0e0?text=Portfolio"
        variant="full"
      />
    </Box>
  ),
};

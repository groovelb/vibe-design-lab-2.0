import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { ConstructBlock } from './ConstructBlock';

export default {
  title: 'Interactive/14. Motion/ConstructBlock',
  component: ConstructBlock,
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: '표시할 텍스트',
    },
    variant: {
      control: 'select',
      options: ['body1', 'body2', 'h4', 'h5', 'subtitle1'],
      description: 'MUI Typography variant',
    },
    typingSpeed: {
      control: { type: 'number', min: 10, max: 200, step: 5 },
      description: '스캔 속도 (문자당 ms)',
    },
    isTriggerOnView: {
      control: 'boolean',
      description: '뷰포트 진입 시 자동 트리거 여부',
    },
    delay: {
      control: { type: 'number', min: 0, max: 3000, step: 100 },
      description: '시작 지연 시간 (ms)',
    },
  },
};

const SAMPLE_TEXT =
  '채용 시장은 디자인 엔지니어를 찾는데, 나는 Figma 안에서만 영향력이 있다. 도구가 바뀌면 내 역량도 사라진다. 시스템으로 사고하면 도구가 바뀌어도 유효하다.';

export const Default = {
  args: {
    text: SAMPLE_TEXT,
    variant: 'body1',
    typingSpeed: 30,
    isTriggerOnView: false,
    delay: 0,
  },
  render: (args) => (
    <Box sx={{ maxWidth: 600 }}>
      <ConstructBlock {...args} />
    </Box>
  ),
};

export const NarrowContainer = {
  render: () => (
    <Box sx={{ maxWidth: 300 }}>
      <ConstructBlock
        text="좁은 컨테이너에서 자연스럽게 줄바꿈되며, 각 visual line마다 스캔 커서가 동시에 sweep합니다."
        typingSpeed={20}
        isTriggerOnView={false}
      />
    </Box>
  ),
};

export const StaggeredDelay = {
  render: () => (
    <Stack spacing={4} sx={{ maxWidth: 600 }}>
      <ConstructBlock
        text="첫 번째 문단이 등장합니다. 시스템 위에서 만드는 디자인."
        typingSpeed={30}
        isTriggerOnView={false}
        delay={0}
      />
      <ConstructBlock
        text="두 번째 문단이 뒤따릅니다. 바이브 코딩의 시작."
        typingSpeed={30}
        isTriggerOnView={false}
        delay={1000}
      />
    </Stack>
  ),
};

import { useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FloatingCTA } from './FloatingCTA';

export default {
  title: 'Component/10. Navigation/FloatingCTA',
  component: FloatingCTA,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## FloatingCTA

화면 하단에 고정되는 플로팅 CTA 바.
IntersectionObserver로 특정 요소가 뷰포트에 보이면 자동으로 숨겨진다.

- \`position: fixed\`, \`bottom: 0\`
- \`zIndex: 1099\` (GNB 아래)
- \`prefers-reduced-motion\` 대응
        `,
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    href: { control: 'text' },
    subText: { control: 'text' },
  },
};

/**
 * 기본 (항상 표시)
 */
export const Default = {
  args: {
    label: '지금 신청하기',
    href: '/enroll',
    subText: '₩990,000 · 4주',
  },
};

/**
 * 보조 텍스트 없이
 */
export const WithoutSubText = {
  args: {
    label: '코스 보기',
    href: '/courses',
  },
};

/**
 * 스크롤 시 show/hide 데모
 */
export const ScrollBehavior = {
  render: () => {
    function ScrollDemo() {
      const targetRef = useRef(null);

      return (
        <Box>
          <Box sx={{ height: '150vh', p: 4 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              아래로 스크롤하세요
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              하단의 CTA 버튼이 표시됩니다.
              아래 파란 영역이 보이면 CTA가 숨겨집니다.
            </Typography>
          </Box>

          <Box
            ref={targetRef}
            sx={{
              height: 300,
              backgroundColor: 'grey.800',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h6" sx={{ color: 'grey.200' }}>
              이 영역이 보이면 FloatingCTA 숨김
            </Typography>
          </Box>

          <Box sx={{ height: '100vh', p: 4 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              다시 스크롤하면 CTA가 나타납니다.
            </Typography>
          </Box>

          <FloatingCTA
            label="지금 신청하기"
            href="/enroll"
            subText="₩990,000 · 4주"
            hideWhenVisible={targetRef}
          />
        </Box>
      );
    }

    return <ScrollDemo />;
  },
};

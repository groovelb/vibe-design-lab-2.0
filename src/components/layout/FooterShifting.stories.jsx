import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FooterShifting } from './FooterShifting';

export default {
  title: 'Component/8. Layout/FooterShifting',
  component: FooterShifting,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## FooterShifting

스크롤 시 footer가 콘텐츠 아래에서 슬라이드업되며 배경색이 드러나는 레이아웃.

**동작 원리:**
- \`--progress\` CSS 커스텀 프로퍼티를 scroll 이벤트로 0→1 업데이트
- footer: \`translateY(-50% → 0)\` 슬라이드업 + \`background.default\` 오버레이 페이드아웃
- children은 \`zIndex: 20\`으로 footer 위에 표시

**사용 시 주의:**
- \`children\` 영역은 자동으로 \`bgcolor: background.default\`가 적용됨
- footer 콘텐츠의 텍스트 색상은 \`footerBg\` 배경과의 대비를 고려해야 함
        `,
      },
    },
  },
};

const DummyContent = () => (
  <Box>
    {Array.from({ length: 3 }).map((_, i) => (
      <Box
        key={i}
        sx={{
          minHeight: '100svh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="h3" sx={{ color: 'text.secondary' }}>
          Section {i + 1}
        </Typography>
      </Box>
    ))}
  </Box>
);

const DummyFooter = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100svh',
      textAlign: 'center',
      p: 4,
    }}
  >
    <Typography variant="h1" sx={{ fontWeight: 800, color: 'primary.contrastText' }}>
      Footer Content
    </Typography>
    <Typography variant="h4" sx={{ mt: 3, color: 'primary.contrastText', opacity: 0.7 }}>
      Slides up from beneath the content
    </Typography>
  </Box>
);

export const Default = {
  render: () => (
    <FooterShifting footer={<DummyFooter />}>
      <DummyContent />
    </FooterShifting>
  ),
};

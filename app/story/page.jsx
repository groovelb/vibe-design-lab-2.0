import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export const metadata = {
  title: '바이브 디자인이란 — Vibe Design Lab의 철학',
  description:
    '구현은 언어를 따릅니다. 바이브 코딩 환경에서 디자인 의도를 정확히 전달하는 언어 체계, 바이브 디자인을 연구합니다.',
  alternates: {
    canonical: 'https://vibedesignlab.net/story',
  },
};

export default function StoryPage() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h3" sx={{ color: 'text.secondary' }}>
        Story — Coming Soon
      </Typography>
    </Box>
  );
}

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export const metadata = {
  title: 'Story',
  description:
    'Vibe Design Labs의 미션, 철학, 가치 제안. 사고와 구현의 주체를 일치시킨다.',
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

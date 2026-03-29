import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export const metadata = {
  title: 'Story | Vibe Design Labs',
  description: 'Vibe Design Labs 브랜드 스토리',
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

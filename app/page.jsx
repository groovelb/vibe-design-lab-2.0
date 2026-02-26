import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const metadata = {
  title: 'Starter Kit',
  description: 'Your design system foundation',
};

export default function HomePage() {
  return (
    <Box
      sx={ {
        p: 4,
        textAlign: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      } }
    >
      <Typography variant="h3" gutterBottom>
        Starter Kit
      </Typography>
      <Typography color="text.secondary">
        Your design system foundation
      </Typography>
    </Box>
  );
}

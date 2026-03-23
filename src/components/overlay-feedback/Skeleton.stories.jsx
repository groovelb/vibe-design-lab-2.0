import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Skeleton } from './Skeleton';

export default {
  title: 'Component/9. Overlay & Feedback/Skeleton',
  component: Skeleton,
};

export const Default = {
  render: () => (
    <Box sx={{ width: 320, p: 3 }}>
      <Stack spacing={1.5}>
        <Skeleton width="72%" height="1.2em" />
        <Skeleton width="100%" height="0.9em" animationDelay={0.2} />
        <Skeleton width="88%" height="0.9em" animationDelay={0.4} />
        <Skeleton width="52%" height="0.9em" animationDelay={0.6} />
      </Stack>
    </Box>
  ),
};

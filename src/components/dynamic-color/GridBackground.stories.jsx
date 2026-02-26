import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { GridBackground } from './GridBackground';

export default {
  title: 'Interactive/15. DynamicColor/GridBackground',
  component: GridBackground,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## GridBackground

순수 CSS 기반의 Grid 배경 패턴.
dot 또는 line 스타일의 그리드를 배경에 렌더링한다.

- **dot** — \`radial-gradient\` 반복
- **line** — \`linear-gradient\` 교차
- 셀 크기: \`theme.vdl.grid.unit × 4 = 32px\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['dot', 'line'],
    },
    opacity: {
      control: { type: 'range', min: 0.05, max: 0.5, step: 0.05 },
    },
  },
};

/**
 * Dot 패턴
 */
export const Dot = {
  args: {
    variant: 'dot',
    opacity: 0.15,
  },
  render: (args) => (
    <GridBackground {...args} sx={{ height: 400, backgroundColor: 'background.default' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 400 }}>
        <Typography variant="h3" sx={{ fontWeight: 800 }}>
          Dot Grid
        </Typography>
      </Box>
    </GridBackground>
  ),
};

/**
 * Line 패턴
 */
export const Line = {
  args: {
    variant: 'line',
    opacity: 0.1,
  },
  render: (args) => (
    <GridBackground {...args} sx={{ height: 400, backgroundColor: 'background.default' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 400 }}>
        <Typography variant="h3" sx={{ fontWeight: 800 }}>
          Line Grid
        </Typography>
      </Box>
    </GridBackground>
  ),
};

/**
 * 두 패턴 비교
 */
export const Comparison = {
  render: () => (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={0}>
      <GridBackground variant="dot" opacity={0.2} sx={{ flex: 1, height: 300, backgroundColor: 'background.default' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>Dot</Typography>
        </Box>
      </GridBackground>
      <GridBackground variant="line" opacity={0.12} sx={{ flex: 1, height: 300, backgroundColor: 'background.default' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>Line</Typography>
        </Box>
      </GridBackground>
    </Stack>
  ),
};

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { defaultTheme } from '../src/styles/themes';

// Google Fonts 로드 (Material Symbols + 브랜드/코드 폰트)
const googleFonts = [
  // Material Symbols
  'Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
  'Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
  'Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
  // Inter (brand)
  'Inter:wght@400;500;600;700',
  // IBM Plex Mono (code)
  'IBM+Plex+Mono:wght@400;500',
];

googleFonts.forEach((font) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${font}&display=swap`;
  document.head.appendChild(link);
});

// SUIT 로컬 폰트 (Storybook은 next/font 미지원이므로 @font-face 직접 등록)
const suitStyle = document.createElement('style');
suitStyle.textContent = `
  @font-face {
    font-family: 'SUIT Variable';
    src: url('/fonts/SUIT-Variable.woff2') format('woff2');
    font-weight: 100 900;
    font-display: swap;
  }
`;
document.head.appendChild(suitStyle);

/** @type { import('@storybook/nextjs').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
    options: {
      storySort: {
        order: [
          'Overview',
          'Style',
          ['Overview', 'Colors', 'Typography', 'Icons', 'Spacing', 'Component Tokens'],
          'Component',
          [
            '1. Typography',
            '2. Container',
            '3. Card',
            '4. Media',
            '5. Data Display',
            '6. In-page Navigation',
            '7. Input & Control',
            '8. Layout',
            '9. Overlay & Feedback',
            '10. Navigation',
          ],
          'Interactive',
          ['12. Scroll'],
          'Common',
          'Template',
          'Test Data',
        ],
        method: 'alphabetical',
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline enableColorScheme />
        <div style={ { width: '100%', paddingTop: '40px' } }>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;

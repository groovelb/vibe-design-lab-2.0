'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import { defaultTheme } from '@/styles/themes';

/**
 * ThemeRegistry
 *
 * Next.js App Router 환경에서 MUI + Emotion SSR을 지원하는 프로바이더입니다.
 * AppRouterCacheProvider가 Emotion 스타일을 SSR 스트리밍으로 처리합니다.
 *
 * Props:
 * @param {ReactNode} children - 래핑할 자식 요소 [Required]
 *
 * Example usage:
 * <ThemeRegistry>{children}</ThemeRegistry>
 */
function ThemeRegistry({ children }) {
  return (
    <AppRouterCacheProvider options={ { key: 'mui' } }>
      <ThemeProvider theme={ defaultTheme }>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}

export default ThemeRegistry;

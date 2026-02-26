import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import ThemeRegistry from './providers';
import { ibmPlexSans, suit, ibmPlexMono } from './fonts';
import './globals.css';

export const metadata = {
  title: 'Vibe Design Labs',
  description: 'Design language system for vibe coding education',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ko"
      className={ `${ibmPlexSans.variable} ${suit.variable} ${ibmPlexMono.variable}` }
      suppressHydrationWarning
    >
      <body>
        <InitColorSchemeScript attribute="data-mui-color-scheme" defaultMode="dark" />
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}

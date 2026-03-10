import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import ThemeRegistry from './providers';
import SiteShell from './shell';
import { inter, suit, ibmPlexMono } from './fonts';
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
      className={ `${inter.variable} ${suit.variable} ${ibmPlexMono.variable}` }
      suppressHydrationWarning
    >
      <head>
        <meta name="darkreader-lock" />
      </head>
      <body>
        <InitColorSchemeScript attribute="data-mui-color-scheme" defaultMode="dark" />
        <ThemeRegistry>
          <SiteShell>
            {children}
          </SiteShell>
        </ThemeRegistry>
      </body>
    </html>
  );
}

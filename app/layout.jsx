import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import ThemeRegistry from './providers';
import SiteShell from './shell';
import FirebaseAnalytics from './FirebaseAnalytics';
import { inter, suit, ibmPlexMono } from './fonts';
import './globals.css';

export const metadata = {
  metadataBase: new URL('https://vibedesignlab.net'),
  title: {
    default: 'Vibe Design Lab',
    template: '%s | Vibe Design Lab',
  },
  description:
    '디자이너를 위한 바이브 코딩 교육 플랫폼. 커뮤니티와 챌린지 중심 피어 학습으로 도구가 바뀌어도 유효한 디자인 언어 체계를 습득합니다.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    siteName: 'Vibe Design Lab',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
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
        <FirebaseAnalytics />
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

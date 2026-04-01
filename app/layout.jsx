import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import ThemeRegistry from './providers';
import SiteShell from './shell';
import FirebaseAnalytics from './FirebaseAnalytics';
import { inter, suit, ibmPlexMono } from './fonts';
import './globals.css';

export const metadata = {
  metadataBase: new URL('https://vibedesignlab.net'),
  title: {
    default: 'Vibe Design Lab — 디자이너를 위한 바이브 코딩 교육',
    template: '%s | Vibe Design Lab',
  },
  description:
    '바이브 코딩, 내맘대로 되고 있나요? 디자인 사고로 제품을 설계하는 바이브 코딩 교육. 디자인 언어 체계와 커뮤니티 학습으로 시작하세요.',
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'Vibe Design Lab',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://vibedesignlab.net',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  name: 'Vibe Design Lab',
                  url: 'https://vibedesignlab.net',
                  description:
                    'AI가 이해하는 디자인 언어를 연구하는 브랜드',
                  foundingDate: '2025',
                  slogan: 'Design at the Speed of Thought',
                },
                {
                  '@type': 'WebSite',
                  name: 'Vibe Design Lab',
                  url: 'https://vibedesignlab.net',
                  inLanguage: 'ko',
                },
              ],
            }),
          }}
        />
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

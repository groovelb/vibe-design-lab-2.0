import ThemeRegistry from './providers';
import { outfit, pretendard } from './fonts';
import './globals.css';

export const metadata = {
  title: 'Starter Kit',
  description: 'Your design system foundation',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={ `${outfit.variable} ${pretendard.variable}` }>
      <body>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}

/**
 * VDL Default Theme
 *
 * Vibe Design Labs 디자인 시스템 토큰을 정의하는 표준 테마입니다.
 *
 * ## 핵심 철학
 * - **Dark-first**: 다크 모드가 기본 경험
 * - **Achromatic Primary**: 무채색 (dark: white, light: black)
 * - **Violet-tinted Grayscale**: hue 260° 기반 회색 스케일
 * - **Sharp Corners**: borderRadius 0
 * - **Brightness Elevation**: 다크 모드에서 명도 차이로 위계 표현
 */

import { createTheme } from '@mui/material/styles';

// ============================================================
// 1. Primitive Tokens — Violet-tinted Grayscale
// ============================================@================
const violetGray = {
  950: 'hsl(260, 20%, 2%)',
  900: 'hsl(260, 16%, 4%)',
  800: 'hsl(260, 12%, 8%)',
  700: 'hsl(260, 8%, 14%)',
  600: 'hsl(260, 6%, 22%)',
  500: 'hsl(260, 6%, 48%)',
  400: 'hsl(260, 5%, 58%)',
  300: 'hsl(260, 5%, 68%)',
  200: 'hsl(260, 8%, 82%)',
  100: 'hsl(260, 10%, 90%)',
  50: 'hsl(260, 12%, 96%)',
};

// ============================================================
// 2. Shadow Tokens (그림자 토큰)
// ============================================================
const customShadows = {
  none: 'none',
  sm: '0 0 12px rgba(0, 0, 0, 0.06)',
  md: '0 0 16px rgba(0, 0, 0, 0.08)',
  lg: '0 0 20px rgba(0, 0, 0, 0.10)',
  xl: '0 0 24px rgba(0, 0, 0, 0.12)',
};

// ============================================================
// 3. Typography Tokens (타이포그래피 토큰)
// ============================================================

// 폰트 패밀리 상수
const suitFamily = 'var(--font-suit, "SUIT Variable"), SUIT, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif';
const brandFamily = 'var(--font-brand, "Inter"), "Inter", sans-serif';
const codeFamily = 'var(--font-mono, "IBM Plex Mono"), "IBM Plex Mono", monospace';

const typography = {
  fontFamily: suitFamily,
  headingFontFamily: suitFamily,
  brandFontFamily: brandFamily,
  codeFontFamily: codeFamily,

  fontSize: 14,
  htmlFontSize: 16,

  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,

  // 헤딩 — SUITh1
  h1: {
    fontFamily: suitFamily,
    fontWeight: 700,
    fontSize: '2.75rem',
    lineHeight: 1.075,
    letterSpacing: '-0.03em',
    wordSpacing: '0.1em',
  },
  h2: {
    fontFamily: suitFamily,
    fontWeight: 700,
    fontSize: '2.5rem',
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
    wordSpacing: '0.1em',
  },
  h3: {
    fontFamily: suitFamily,
    fontWeight: 500,
    fontSize: '2rem',
    lineHeight: 1.25,
    letterSpacing: '-0.01em',
    wordSpacing: '0.1em',
  },
  h4: {
    fontFamily: suitFamily,
    fontWeight: 700,
    fontSize: '1.25rem',
    lineHeight: 1.2,
    letterSpacing: '-0.01em',
    wordSpacing: '0.1em',
  },
  h5: {
    fontFamily: suitFamily,
    fontWeight: 700,
    fontSize: '1.25rem',
    lineHeight: 1.4,
    letterSpacing: '0',
    wordSpacing: '0.1em',
  },
  h6: {
    fontFamily: suitFamily,
    fontWeight: 600,
    fontSize: '1.125rem',
    lineHeight: 1.4,
    letterSpacing: '0',
    wordSpacing: '0.1em',
  },

  // 본문 — SUIT (fontFamily 상속)
  body1: {
    fontSize: '1rem',
    lineHeight: 1.7,
    letterSpacing: '0',
  },
  body2: {
    fontSize: '0.85rem',
    lineHeight: 1.7,
    letterSpacing: '0',
  },

  // 부제목
  subtitle1: {
    fontSize: '1.125rem',
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: '0.01em',
  },
  subtitle2: {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: '0.01em',
  },

  // 기타
  button: {
    fontSize: '0.9375rem',
    fontWeight: 600,
    lineHeight: 1.75,
    letterSpacing: '0.02em',
    textTransform: 'none',
  },
  caption: {
    fontSize: '0.8125rem',
    lineHeight: 1.5,
    letterSpacing: '0.02em',
  },
  overline: {
    fontSize: '0.8125rem',
    fontWeight: 600,
    lineHeight: 2,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },

  // 신규 variant — Display (SUIT for 한글, Inter for 영문 fallback)
  display: {
    fontFamily: suitFamily,
    fontWeight: 700,
    fontSize: 'clamp(4rem, 7vw, 4.5rem)',
    lineHeight: 1.1,
    letterSpacing: '-0.04em',
    wordSpacing: '0.06em',
  },

  // 신규 variant — Code (IBM Plex Mono)
  code: {
    fontFamily: codeFamily,
    fontWeight: 500,
    fontSize: '0.875rem',
    lineHeight: 1.6,
  },

  // 신규 variant — Code Block (IBM Plex Mono)
  codeBlock: {
    fontFamily: codeFamily,
    fontWeight: 400,
    fontSize: '0.875rem',
    lineHeight: 1.7,
  },
};

// ============================================================
// 4. Spacing Token
// ============================================================
const spacing = 8;

// ============================================================
// 5. Shape Token
// ============================================================
const shape = {
  borderRadius: 4,
};

// ============================================================
// 6. Breakpoints
// ============================================================
const breakpoints = {
  values: {
    xs: 0,
    sm: 768,
    md: 900,
    lg: 1200,
    xl: 1440,
  },
};

// ============================================================
// 7. Z-Index
// ============================================================
const zIndex = {
  mobileStepper: 1000,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
};

// ============================================================
// 8. Transitions
// ============================================================
const transitions = {
  duration: {
    shortest: 150,
    shorter: 200,
    short: 250,
    standard: 300,
    complex: 375,
    enteringScreen: 225,
    leavingScreen: 195,
  },
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
};

// ============================================================
// 9. Component Overrides
// ============================================================
const components = {
  MuiCssBaseline: {
    styleOverrides: `
      :root {
        --vdl-950: ${violetGray[950]};
        --vdl-900: ${violetGray[900]};
        --vdl-800: ${violetGray[800]};
        --vdl-700: ${violetGray[700]};
        --vdl-600: ${violetGray[600]};
        --vdl-500: ${violetGray[500]};
        --vdl-400: ${violetGray[400]};
        --vdl-300: ${violetGray[300]};
        --vdl-200: ${violetGray[200]};
        --vdl-100: ${violetGray[100]};
        --vdl-50: ${violetGray[50]};
      }
      body {
        scrollbar-width: thin;
      }
    `,
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
      },
      elevation0: {
        boxShadow: customShadows.none,
      },
      elevation1: {
        boxShadow: customShadows.sm,
      },
      elevation2: {
        boxShadow: customShadows.md,
      },
      elevation3: {
        boxShadow: customShadows.lg,
      },
      elevation4: {
        boxShadow: customShadows.xl,
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 0,
        textTransform: 'none',
      },
      sizeSmall: {
        padding: '8px 20px',
        fontSize: '0.875rem',
      },
      sizeMedium: {
        padding: '12px 32px',
        fontSize: '1rem',
      },
      sizeLarge: {
        padding: '16px 44px',
        fontSize: '1rem',
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 0,
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 4,
      },
    },
  },
};

// ============================================================
// 10. Light Palette (보존 — 향후 라이트 모드 전환 시 사용)
// ============================================================
const lightPalette = {
  primary: {
    main: violetGray[950],
    light: violetGray[700],
    dark: '#000000',
    contrastText: violetGray[50],
  },
  secondary: {
    main: violetGray[700],
    light: violetGray[500],
    dark: violetGray[900],
    contrastText: '#FFFFFF',
  },
  background: {
    default: violetGray[50],
    paper: '#ffffff',
  },
  text: {
    primary: violetGray[950],
    secondary: violetGray[700],
    disabled: violetGray[200],
  },
  divider: violetGray[100],
  action: {
    active: violetGray[950],
    hover: violetGray[100],
    selected: violetGray[100],
    disabled: violetGray[200],
    disabledBackground: violetGray[100],
    focus: violetGray[100],
  },
  grey: violetGray,
};

// ============================================================
// 11. Theme 생성 — Dark 고정
// ============================================================
const defaultTheme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'dark',
    primary: {
      main: violetGray[50],
      light: '#ffffff',
      dark: violetGray[200],
      contrastText: violetGray[950],
    },
    secondary: {
      main: violetGray[200],
      light: violetGray[100],
      dark: violetGray[300],
      contrastText: violetGray[950],
    },
    error: {
      light: '#ef5350',
      main: '#d32f2f',
      dark: '#c62828',
      contrastText: '#FFFFFF',
    },
    warning: {
      light: '#ff9800',
      main: '#ed6c02',
      dark: '#e65100',
      contrastText: '#FFFFFF',
    },
    success: {
      light: '#4caf50',
      main: '#2e7d32',
      dark: '#1b5e20',
      contrastText: '#FFFFFF',
    },
    info: {
      light: '#03a9f4',
      main: '#0288d1',
      dark: '#01579b',
      contrastText: '#FFFFFF',
    },
    background: {
      default: violetGray[950],
      paper: violetGray[900],
    },
    text: {
      primary: violetGray[100],
      secondary: violetGray[400],
      disabled: violetGray[700],
    },
    divider: violetGray[600],
    action: {
      active: violetGray[200],
      hover: violetGray[800],
      selected: violetGray[800],
      disabled: violetGray[700],
      disabledBackground: violetGray[800],
      focus: violetGray[800],
    },
    grey: violetGray,
  },
  typography,
  spacing,
  shape,
  breakpoints,
  zIndex,
  transitions,
  components,
});

// ============================================================
// 커스텀 속성 추가
// ============================================================
defaultTheme.customShadows = customShadows;

// VDL 전용 토큰
defaultTheme.vdl = {
  monoline: {
    weight: '1px',
    cap: 'round',
    join: 'round',
  },
  grid: {
    unit: 8,
    color: 'hsla(260, 12%, 18%, 0.15)',
  },
  namingLine: {
    dotSize: 4,
    labelGap: 8,
  },
  primitives: violetGray,
};

export default defaultTheme;

// 개별 토큰 내보내기 (문서화용)
export {
  violetGray,
  lightPalette,
  typography,
  spacing,
  shape,
  customShadows,
  breakpoints,
  zIndex,
  transitions,
  components,
};

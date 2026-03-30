'use client';
import { useState, forwardRef, createContext, useContext } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

/**
 * GNB Context
 */
const GNBContext = createContext({
  isDrawerOpen: false,
  toggleDrawer: () => {},
  closeDrawer: () => {},
  isMobile: false,
});

export const useGNB = () => useContext(GNBContext);

/**
 * GNB 컴포넌트
 *
 * 반응형 GNB (Global Navigation Bar).
 * 데스크탑에서는 헤더에 네비게이션을 표시하고,
 * 모바일에서는 햄버거 메뉴 + 드로어로 전환된다.
 *
 * Props:
 * @param {node} logo - 로고 영역 (항상 표시) [Optional]
 * @param {node} navContent - 네비게이션 콘텐츠 (반응형 전환 대상) [Optional]
 * @param {node} persistent - 헤더에 항상 표시될 요소 [Optional]
 * @param {node} drawerHeader - 드로어 상단 커스텀 요소 [Optional]
 * @param {node} drawerFooter - 드로어 하단 커스텀 요소 [Optional]
 * @param {string} breakpoint - 반응형 전환 브레이크포인트 ('sm' | 'md' | 'lg') [Optional, 기본값: 'md']
 * @param {number} height - 헤더 높이 (px) [Optional, 기본값: 64]
 * @param {number} drawerWidth - 드로어 너비 (px) [Optional, 기본값: 280]
 * @param {boolean} hasBorder - 헤더 하단 보더 [Optional, 기본값: true]
 * @param {boolean} isSticky - 헤더 고정 [Optional, 기본값: true]
 * @param {boolean} isTransparent - 헤더 투명 배경 [Optional, 기본값: false]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <GNB
 *   logo={<Logo />}
 *   navContent={<NavMenu items={menuItems} />}
 *   persistent={<SearchBar />}
 * />
 */
const GNB = forwardRef(function GNB({
  logo,
  navContent,
  persistent,
  drawerHeader,
  drawerFooter,
  breakpoint = 'md',
  height = 64,
  drawerWidth = 280,
  hasBorder = true,
  isSticky = true,
  isTransparent = false,
  sx,
  ...props
}, ref) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(breakpoint));

  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);
  const closeDrawer = () => setIsDrawerOpen(false);

  /* CSS 기반 반응형 (useMediaQuery 지연 방지) */
  const desktopDisplay = { xs: 'none', [breakpoint]: 'flex' };
  const mobileDisplay = { xs: 'flex', [breakpoint]: 'none' };

  /**
   * 헤더 스타일
   */
  const headerStyles = {
    position: isSticky ? 'sticky' : 'relative',
    top: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.appBar,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height,
    px: { xs: 2, sm: 3, md: 4 },
    backgroundColor: 'transparent',
    borderBottom: hasBorder ? '1px solid' : 'none',
    borderColor: 'divider',
    backdropFilter: 'none',
    ...sx,
  };

  return (
    <GNBContext.Provider value={{ isDrawerOpen, toggleDrawer, closeDrawer, isMobile }}>
      {/* Header */}
      <Box ref={ref} component="header" sx={headerStyles} {...props}>
        {/* Left: Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {logo}
        </Box>

        {/* Right: Navigation */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Persistent (always visible) */}
          {persistent}

          {/* Desktop: navContent (CSS 기반 숨김) */}
          <Box sx={{ display: desktopDisplay, alignItems: 'center' }}>
            {navContent}
          </Box>

          {/* Mobile: Hamburger (CSS 기반 숨김) */}
          {navContent && (
            <IconButton
              onClick={toggleDrawer}
              size="medium"
              aria-label="Open menu"
              aria-expanded={isDrawerOpen}
              sx={{ display: mobileDisplay }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Box>
      </Box>

      {/* Full-screen Mobile Drawer */}
      <Drawer
        anchor="top"
        open={isDrawerOpen}
        onClose={closeDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: '100%',
            height: '100%',
            backgroundColor: 'var(--vdl-950)',
            backgroundImage: 'none',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          {/* Drawer Header — 로고(클릭 시 닫기) + 닫기 */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height,
              px: { xs: 2, sm: 3 },
              flexShrink: 0,
            }}
          >
            <Box onClick={closeDrawer} sx={{ cursor: 'pointer' }}>
              {drawerHeader || logo}
            </Box>
            <IconButton
              onClick={closeDrawer}
              size="medium"
              aria-label="Close menu"
              sx={{ color: 'text.primary' }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Drawer Content — 수직 중앙 대형 메뉴 */}
          <Box
            onClick={closeDrawer}
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              '& nav': {
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
              },
              '& [role="menuitem"]': {
                fontSize: 'h2.fontSize',
                fontWeight: 500,
                letterSpacing: '0.02em',
                color: 'common.white',
                py: 1.5,
                px: 3,
                '&:hover': { color: 'text.primary' },
                '&[aria-current="page"]': {
                  color: 'text.primary',
                  fontWeight: 600,
                },
              },
            }}
          >
            {navContent}
          </Box>

          {/* Drawer Footer */}
          {drawerFooter && (
            <Box
              sx={{
                p: 3,
                textAlign: 'center',
                flexShrink: 0,
              }}
            >
              {drawerFooter}
            </Box>
          )}
        </Box>
      </Drawer>
    </GNBContext.Provider>
  );
});

export { GNB };

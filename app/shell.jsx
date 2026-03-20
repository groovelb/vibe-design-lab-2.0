'use client';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { AppShell } from '@/components/layout/AppShell';
import { NavMenu } from '@/components/navigation/NavMenu';
import { AmbientGrainedBackground } from '@/components/dynamic-color/AmbientGrainedBackground';
import { GNB as GNB_DATA } from '@/data/contents';

const navItems = GNB_DATA.menus.map((menu) => ({
  id: menu.href,
  label: menu.label,
}));

/**
 * SiteShell 컴포넌트
 *
 * Next.js 레이아웃용 AppShell 래퍼.
 * GNB 설정을 포함하여 모든 페이지에 공통 네비게이션을 제공한다.
 *
 * Props:
 * @param {node} children - 페이지 콘텐츠 [Required]
 *
 * Example usage:
 * <SiteShell>{children}</SiteShell>
 */
export default function SiteShell({ children }) {
  return (
    <>
    <AmbientGrainedBackground />
    <AppShell
      sx={{ position: 'relative' }}
      logo={
        <Typography variant="h6" sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
          {GNB_DATA.logo}
        </Typography>
      }
      headerCollapsible={
        <NavMenu items={navItems} variant="underline" />
      }
      headerPersistent={
        <Button
          variant="contained"
          size="small"
          sx={{ display: { xs: 'none', sm: 'flex' } }}
        >
          {GNB_DATA.cta}
        </Button>
      }
      isHeaderTransparent
      hasHeaderBorder={false}
    >
      {children}
    </AppShell>
    </>
  );
}

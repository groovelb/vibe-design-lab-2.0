'use client';
import Link from 'next/link';

import { AppShell } from '@/components/layout/AppShell';
import { NavMenu } from '@/components/navigation/NavMenu';
import { VdlLogo } from '@/components/typography/VdlLogo';
import { AmbientGrainedBackground } from '@/components/dynamic-color/AmbientGrainedBackground';
import { GNB as GNB_DATA } from '@/data/contents';

const navItems = [
  { id: '/', label: 'Home', href: '/' },
  ...GNB_DATA.menus.map((menu) => ({
    id: menu.href,
    label: menu.label,
    href: menu.href,
  })),
];

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
        <Link href="/" style={{ textDecoration: 'none' }}>
          <VdlLogo size={16} />
        </Link>
      }
      headerCollapsible={
        <NavMenu
          items={navItems}
          linkComponent={Link}
          size="md"
          sx={{
            gap: 0.5,
            '& [role="menuitem"]': {
              color: 'text.primary',
              fontWeight: 500,
              letterSpacing: '0.02em',
              backgroundColor: 'transparent !important',
              '&:hover': { color: 'text.primary', backgroundColor: 'transparent !important' },
              '&[aria-current="page"]': { color: 'text.primary', fontWeight: 500, backgroundColor: 'transparent !important' },
            },
            '& [role="menuitem"]:first-child': { display: { md: 'none' } },
          }}
        />
      }
      isHeaderTransparent
      hasHeaderBorder={false}
    >
      {children}
    </AppShell>
    </>
  );
}

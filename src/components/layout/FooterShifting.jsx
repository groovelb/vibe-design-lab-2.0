'use client';
import { useRef, useEffect } from 'react';
import Box from '@mui/material/Box';

/**
 * FooterShifting 레이아웃 컴포넌트
 *
 * 스크롤 시 footer가 콘텐츠 아래에서 슬라이드업되며
 * 배경색이 드러나는 효과를 적용하는 레이아웃.
 *
 * 동작 원리:
 * 1. footer가 뷰포트 하단에 있을 때 translateY(-50%) 상태 (콘텐츠 뒤에 숨음)
 * 2. 스크롤에 따라 translateY(0)으로 슬라이드업
 * 3. background.default 오버레이가 페이드아웃되며 footerBg 색상이 드러남
 * 4. footer는 z-index: -1로 콘텐츠 뒤에 배치 (콘텐츠에 stacking context를 만들지 않아 blend mode 관통 가능)
 *
 * @param {ReactNode} children - 메인 콘텐츠 [Required]
 * @param {ReactNode} footer - 슬라이드업 효과가 적용될 footer 콘텐츠 [Required]
 * @param {string} footerBg - footer 배경색 토큰 [Optional, 기본값: 'primary.main']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <FooterShifting footer={<LandingFooterCTA />}>
 *   <LandingHero />
 *   <LandingProblem />
 * </FooterShifting>
 */
export function FooterShifting({ children, footer, sx, ...props }) {
  const footerRef = useRef(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / window.innerHeight));
        el.style.setProperty('--progress', p);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <Box sx={{ position: 'relative', zIndex: 0, ...sx }} {...props}>
      {/* 메인 콘텐츠 — stacking context 없이 blend mode 관통 허용 */}
      <Box sx={{ position: 'relative' }}>
        {children}
      </Box>

      {/* 슬라이드업 footer — negative z-index로 콘텐츠 뒤에 배치 */}
      <Box
        ref={footerRef}
        sx={{
          position: 'relative',
          zIndex: -1,
          minHeight: '100svh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          willChange: 'transform',
          '--progress': '0',
          transform: 'translate3d(0, calc(-50% + 50% * var(--progress)), 0)',
        }}
      >
        {footer}
      </Box>
    </Box>
  );
}

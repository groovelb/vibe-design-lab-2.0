'use client';
import { useState, useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import { presentationTokens as t } from '../../styles/themes/presentation';

/**
 * SlideMaster 컴포넌트
 *
 * 슬라이드 전체를 감싸는 고정 크롬 (마스터 레이아웃).
 * 16:9 비율 컨테이너, 네비게이션, 브레드크럼, Drawer 메뉴.
 * ArrowLeft/ArrowRight 키보드 바인딩.
 *
 * @param {ReactNode} children - 슬라이드 콘텐츠 (Layout) [Required]
 * @param {object} breadcrumb - { section, chapter, part } 브레드크럼 라벨 [Optional]
 * @param {number} slideIndex - 현재 슬라이드 번호 (1-based) [Optional]
 * @param {number} totalSlides - 전체 슬라이드 수 [Optional]
 * @param {function} onPrev - 이전 슬라이드 핸들러 [Optional]
 * @param {function} onNext - 다음 슬라이드 핸들러 [Optional]
 * @param {string} slideTitle - 현재 슬라이드 타이틀 [Optional]
 * @param {ReactNode} drawerContent - Drawer 메뉴 내용 [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <SlideMaster
 *   breadcrumb={{ section: 'S2', chapter: 'Ch2', part: 'Part A' }}
 *   slideIndex={3}
 *   totalSlides={12}
 *   onPrev={() => {}}
 *   onNext={() => {}}
 * >
 *   <SlideMessage>내용</SlideMessage>
 * </SlideMaster>
 */
function SlideMaster({
  children,
  breadcrumb,
  slideIndex,
  totalSlides,
  onPrev,
  onNext,
  slideTitle,
  drawerContent,
  sx,
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'Escape' && isDrawerOpen) setIsDrawerOpen(false);
    },
    [onPrev, onNext, isDrawerOpen],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const hasNav = slideIndex != null && totalSlides != null;
  const hasBreadcrumb = breadcrumb && (breadcrumb.section || breadcrumb.chapter || breadcrumb.part);

  const crumbs = hasBreadcrumb
    ? [breadcrumb.section, breadcrumb.chapter, breadcrumb.part].filter(Boolean)
    : [];

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        bgcolor: t.color.bg,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
    >
      {/* ─── Header: Breadcrumb ─── */}
      <Box
        sx={{
          height: t.nav.headerHeight,
          px: `${t.slide.padding.x}px`,
          display: 'flex',
          alignItems: 'center',
          flexShrink: 0,
          borderBottom: '1px solid',
          borderColor: t.color.border,
        }}
      >
        {(crumbs.length > 0 || slideTitle) && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
            {crumbs.map((crumb, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                {i > 0 && (
                  <Box
                    component="span"
                    sx={{
                      fontFamily: t.fontFamily.body,
                      fontSize: t.typo.label.fontSize,
                      color: t.color.textTertiary,
                      userSelect: 'none',
                    }}
                  >
                    ›
                  </Box>
                )}
                <Box
                  component="span"
                  sx={{
                    fontFamily: t.fontFamily.body,
                    fontSize: t.typo.label.fontSize,
                    fontWeight: i === crumbs.length - 1 && !slideTitle ? 600 : 400,
                    color: i === crumbs.length - 1 && !slideTitle ? t.color.text : t.color.textSecondary,
                  }}
                >
                  {crumb}
                </Box>
              </Box>
            ))}
            {slideTitle && (
              <>
                {crumbs.length > 0 && (
                  <Box
                    component="span"
                    sx={{
                      fontFamily: t.fontFamily.body,
                      fontSize: t.typo.label.fontSize,
                      color: t.color.textTertiary,
                      userSelect: 'none',
                      flexShrink: 0,
                    }}
                  >
                    ›
                  </Box>
                )}
                <Box
                  component="span"
                  sx={{
                    fontFamily: t.fontFamily.body,
                    fontSize: t.typo.label.fontSize,
                    fontWeight: 600,
                    color: t.color.text,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {slideTitle}
                </Box>
              </>
            )}
          </Box>
        )}
      </Box>

      {/* ─── Content Area ─── */}
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: `${t.slide.padding.x}px`,
          py: `${t.slide.padding.y}px`,
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: t.content.maxWidth,
            aspectRatio: t.content.aspectRatio,
            maxHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            '& > *': { flex: 1, minHeight: 0 },
          }}
        >
          {children}
        </Box>
      </Box>

      {/* ─── Footer: Navigation ─── */}
      <Box
        sx={{
          height: t.nav.headerHeight,
          px: `${t.slide.padding.x}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
          borderTop: '1px solid',
          borderColor: t.color.border,
        }}
      >
        {/* Prev / Indicator / Next */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {hasNav && (
            <>
              <IconButton
                size="small"
                onClick={onPrev}
                disabled={slideIndex <= 1}
                sx={{ color: t.color.text, '&.Mui-disabled': { color: t.color.textTertiary } }}
              >
                <ChevronLeft size={18} />
              </IconButton>
              <Box
                component="span"
                sx={{
                  fontFamily: t.fontFamily.code,
                  fontSize: t.typo.label.fontSize,
                  color: t.color.textSecondary,
                  minWidth: 48,
                  textAlign: 'center',
                  userSelect: 'none',
                }}
              >
                {slideIndex} / {totalSlides}
              </Box>
              <IconButton
                size="small"
                onClick={onNext}
                disabled={slideIndex >= totalSlides}
                sx={{ color: t.color.text, '&.Mui-disabled': { color: t.color.textTertiary } }}
              >
                <ChevronRight size={18} />
              </IconButton>
            </>
          )}
        </Box>

        {/* Drawer Toggle */}
        {drawerContent && (
          <IconButton
            size="small"
            onClick={() => setIsDrawerOpen(true)}
            sx={{ color: t.color.text }}
          >
            <Menu size={18} />
          </IconButton>
        )}
      </Box>

      {/* ─── Drawer ─── */}
      {drawerContent && (
        <Drawer
          anchor="right"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          PaperProps={{
            sx: {
              width: t.nav.drawerWidth,
              bgcolor: t.color.surface,
              borderLeft: '1px solid',
              borderColor: t.color.border,
            },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
            <IconButton size="small" onClick={() => setIsDrawerOpen(false)} sx={{ color: t.color.text }}>
              <X size={18} />
            </IconButton>
          </Box>
          <Box sx={{ px: 2, pb: 2 }}>{drawerContent}</Box>
        </Drawer>
      )}
    </Box>
  );
}

export { SlideMaster };

'use client';
import { forwardRef, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

/**
 * FloatingCTA 컴포넌트
 *
 * 화면 하단에 고정되는 플로팅 CTA 바.
 * IntersectionObserver로 특정 요소가 보일 때 자동으로 숨겨진다.
 *
 * Props:
 * @param {string} label - CTA 버튼 텍스트 [Required]
 * @param {string} href - CTA 링크 [Required]
 * @param {string} subText - 보조 텍스트 (가격, 일정 등) [Optional]
 * @param {object} hideWhenVisible - 이 요소가 뷰포트에 보이면 CTA 숨김 (ref 객체) [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <FloatingCTA
 *   label="지금 신청하기"
 *   href="/enroll"
 *   subText="₩990,000 · 4주"
 * />
 */
const FloatingCTA = forwardRef(function FloatingCTA({
  label,
  href,
  subText,
  hideWhenVisible,
  sx,
  ...props
}, ref) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!hideWhenVisible?.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(hideWhenVisible.current);

    return () => observer.disconnect();
  }, [hideWhenVisible]);

  return (
    <Box
      ref={ref}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1099,
        transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        '@media (prefers-reduced-motion: reduce)': {
          transition: 'none',
        },
        ...sx,
      }}
      {...props}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          py: 1.5,
          px: 3,
          backgroundColor: 'background.paper',
          borderTop: 1,
          borderColor: 'divider',
        }}
      >
        {subText && (
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            {subText}
          </Typography>
        )}
        <Button
          variant="contained"
          href={href}
          sx={{ minWidth: 140 }}
        >
          {label}
        </Button>
      </Box>
    </Box>
  );
});

export { FloatingCTA };

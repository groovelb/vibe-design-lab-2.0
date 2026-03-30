'use client';
import { forwardRef, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { MessageSquare } from 'lucide-react';

/**
 * FloatingCTA 컴포넌트
 *
 * 화면 하단에 고정되는 플로팅 CTA 바.
 * IntersectionObserver로 특정 요소가 보일 때 자동으로 숨겨진다.
 *
 * Props:
 * @param {string} label - CTA 버튼 텍스트 [Required]
 * @param {string} href - CTA 링크 [Required]
 * @param {string} title - 좌측 타이틀 (코스명 등) [Optional]
 * @param {string} subText - 보조 텍스트 (할인 안내 등) [Optional]
 * @param {string} inquiryLabel - 문의 버튼 텍스트 [Optional]
 * @param {string} inquiryHref - 문의 링크 [Optional]
 * @param {object} hideWhenVisible - 이 요소가 뷰포트에 보이면 CTA 숨김 (ref 객체) [Optional]
 * @param {object} showAfterHidden - 이 요소가 뷰포트에서 사라진 후에만 CTA 표시 (ref 객체) [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <FloatingCTA
 *   label="온라인 얼리버드 신청"
 *   href="#enroll"
 *   title="Vibe Design Starter Kit"
 *   subText="1차 얼리버드 신청자 25% 할인"
 *   inquiryLabel="문의하기"
 * />
 */
const FloatingCTA = forwardRef(function FloatingCTA({
  label,
  href,
  target,
  title,
  subText,
  inquiryLabel,
  inquiryHref,
  hideWhenVisible,
  showAfterHidden,
  sx,
  ...props
}, ref) {
  const [isGateGone, setIsGateGone] = useState(!showAfterHidden);
  const [isTargetHidden, setIsTargetHidden] = useState(true);

  useEffect(() => {
    if (!showAfterHidden?.current) { setIsGateGone(true); return; }
    const observer = new IntersectionObserver(
      ([entry]) => setIsGateGone(!entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(showAfterHidden.current);
    return () => observer.disconnect();
  }, [showAfterHidden]);

  useEffect(() => {
    if (!hideWhenVisible?.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsTargetHidden(!entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(hideWhenVisible.current);
    return () => observer.disconnect();
  }, [hideWhenVisible]);

  const isVisible = isGateGone && isTargetHidden;

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
          backgroundColor: 'background.paper',
          borderTop: 1,
          borderColor: 'divider',
          py: 2,
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* 좌측: 타이틀 + 서브텍스트 */}
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            {title && (
              <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                {title}
              </Typography>
            )}
            {subText && (
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {subText}
              </Typography>
            )}
          </Stack>

          {/* 우측: 버튼 그룹 */}
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{ ml: { xs: 0, md: 'auto' }, width: { xs: '100%', md: 'auto' }, justifyContent: { xs: 'center', md: 'flex-end' } }}
          >
            {inquiryLabel && (
              <Button
                variant="outlined"
                size="small"
                href={inquiryHref}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<MessageSquare size={14} />}
                sx={{
                  borderColor: 'divider',
                  color: 'text.secondary',
                  '&:hover': { borderColor: 'text.secondary', backgroundColor: 'action.hover' },
                }}
              >
                {inquiryLabel}
              </Button>
            )}
            <Button
              variant="contained"
              color="error"
              size="small"
              href={href}
              target={target}
              rel={target === '_blank' ? 'noopener noreferrer' : undefined}
              sx={{ px: 3 }}
            >
              {label}
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
});

export { FloatingCTA };

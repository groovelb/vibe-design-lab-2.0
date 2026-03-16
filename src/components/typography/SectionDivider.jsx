'use client';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import { useInView } from '../../hooks/useInView';
import Typography from '@mui/material/Typography';
import { AreaConstruct } from '../motion/AreaConstruct';

/**
 * SectionDivider 컴포넌트
 *
 * overline 라벨 + 우측 수평선으로 섹션 경계를 표시한다.
 * 라벨은 AreaConstruct로 래핑되어 ■ → 바운딩 박스 확장 → 라벨 페이드인.
 * 뷰포트 진입 시 라인이 좌→우로 그려지는 애니메이션이 실행된다.
 *
 * @param {string} label - overline 텍스트 [Required]
 * @param {number} duration - 라인 애니메이션 시간 (ms) [Optional, 기본값: 400]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <SectionDivider label="Difference" />
 */
const SectionDivider = forwardRef(function SectionDivider({
  label,
  duration = 400,
  sx,
  ...props
}, ref) {
  const [inViewRef, isVisible] = useInView({ trigger: 0.1 });

  return (
    <Box
      ref={(node) => {
        inViewRef(node);
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        ...sx,
      }}
      {...props}
    >
      <AreaConstruct
        isTriggerOnView
        sx={{ flexShrink: 0, display: 'inline-flex' }}
      >
        <Box sx={{ px: 2, py: 1, bgcolor: 'text.primary' }}>
          <Typography
            variant="overline"
            sx={{ color: 'text.disabled', textAlign: 'center' }}
          >
            {label}
          </Typography>
        </Box>
      </AreaConstruct>
      <Box
        sx={{
          flex: 1,
          height: '1px',
          bgcolor: 'divider',
          transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          '@media (prefers-reduced-motion: reduce)': {
            transition: 'none',
            transform: 'scaleX(1)',
          },
        }}
      />
    </Box>
  );
});

export { SectionDivider };

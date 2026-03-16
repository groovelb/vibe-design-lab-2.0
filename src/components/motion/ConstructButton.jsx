'use client';
import { forwardRef } from 'react';
import Button from '@mui/material/Button';
import { AreaConstruct } from './AreaConstruct';

/**
 * ConstructButton 컴포넌트
 *
 * MUI Button을 AreaConstruct로 래핑한 버튼.
 * ■ → 바운딩 박스 확장 → 버튼 페이드인.
 *
 * @param {boolean} isTriggerOnView - 뷰포트 진입 시 자동 트리거 여부 [Optional, 기본값: true]
 * @param {number} delay - 시작 지연 (ms) [Optional, 기본값: 0]
 * @param {string} color - MUI Button color [Optional, 기본값: 'primary']
 * @param {string} variant - MUI Button variant [Optional, 기본값: 'contained']
 * @param {React.ReactNode} children - 버튼 콘텐츠 [Required]
 * @param {object} sx - 추가 스타일 (루트 컨테이너에 적용) [Optional]
 *
 * Example usage:
 * <ConstructButton delay={300}>시작하기</ConstructButton>
 */
const ConstructButton = forwardRef(function ConstructButton(
  {
    isTriggerOnView = true,
    delay = 0,
    color = 'primary',
    variant = 'contained',
    children,
    sx,
    ...buttonProps
  },
  ref,
) {
  return (
    <AreaConstruct
      isTriggerOnView={isTriggerOnView}
      delay={delay}
      sx={{ display: 'inline-flex', ...sx }}
    >
      <Button
        ref={ref}
        variant={variant}
        color={color}
        disableElevation
        {...buttonProps}
      >
        {children}
      </Button>
    </AreaConstruct>
  );
});

export { ConstructButton };

'use client';
import { forwardRef, useState } from 'react';
import Button from '@mui/material/Button';
import { PixelContainer } from '../container/PixelContainer';

/**
 * PixelButton 컴포넌트
 *
 * MUI Button(contained)을 PixelContainer로 래핑하여 픽셀 채움 배경을 적용한 버튼.
 * variant는 contained로 고정되며, 나머지 MUI Button props는 그대로 전달된다.
 * hover 시 각 픽셀의 opacity가 랜덤하게 반짝이는 shimmer 효과.
 *
 * @param {string} direction - 픽셀이 채워지는 시작 방향 ('left' | 'right' | 'top' | 'bottom') [Optional, 기본값: 'left']
 * @param {number} pixelSize - 각 픽셀의 크기 (px) [Optional, 기본값: 4]
 * @param {string} pixelColor - 픽셀 색상 (MUI 테마 토큰 또는 CSS 색상). 미지정 시 color prop 기반 자동 [Optional]
 * @param {number} progress - 채움 진행률 (0~1) [Optional, 기본값: 1]
 * @param {boolean} isTriggerOnView - 뷰포트 진입 시 애니메이션 트리거 여부 [Optional, 기본값: false]
 * @param {number} duration - 애니메이션 지속 시간 (ms) [Optional, 기본값: 1500]
 * @param {string} color - MUI Button color prop [Optional, 기본값: 'primary']
 * @param {ReactNode} children - 버튼 콘텐츠 [Required]
 * @param {object} sx - 추가 스타일 (루트 컨테이너에 적용) [Optional]
 *
 * Example usage:
 * <PixelButton onClick={handleClick}>Click me</PixelButton>
 * <PixelButton direction="bottom" pixelSize={6} color="secondary">Secondary</PixelButton>
 */
const PixelButton = forwardRef(function PixelButton({
  direction = 'left',
  pixelSize = 4,
  pixelColor,
  progress = 1,
  isTriggerOnView = false,
  duration = 1500,
  color = 'primary',
  variant,
  children,
  sx,
  ...buttonProps
}, ref) {
  const [isHovered, setIsHovered] = useState(false);
  const resolvedPixelColor = pixelColor || `${color}.main`;

  return (
    <PixelContainer
      direction={direction}
      pixelSize={pixelSize}
      color={resolvedPixelColor}
      progress={isTriggerOnView ? undefined : progress}
      isTriggerOnView={isTriggerOnView}
      duration={duration}
      isShimmering={isHovered}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{ display: 'inline-flex', borderRadius: 1, ...sx }}
    >
      <Button
        ref={ref}
        variant="contained"
        color={color}
        disableElevation
        sx={{
          bgcolor: 'transparent',
          '&:hover': { bgcolor: 'transparent' },
        }}
        {...buttonProps}
      >
        {children}
      </Button>
    </PixelContainer>
  );
});

export { PixelButton };

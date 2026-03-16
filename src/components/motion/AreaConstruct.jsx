'use client';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import { useConstruct } from './useConstruct';
import { ConstructOverlay } from './ConstructOverlay';

/**
 * AreaConstruct 컴포넌트
 *
 * Construct 브랜드 키 비주얼의 범용 모션 컨테이너.
 * ■가 4개로 분열 → 바운딩 박스 확장(앵커+엣지) → 콘텐츠 페이드인.
 * 이미지, 일러스트, 비디오 등 미디어 콘텐츠에 적합.
 *
 * 동작 흐름:
 * 1. idle: 콘텐츠 투명(0.01), 오버레이 대기
 * 2. tag: 좌상단에 ■ 등장
 * 3. scatter: ■ → 4 꼭지점 앵커 분산 + 윤곽선 확장
 * 4. reveal: 앵커/윤곽선 퇴장
 * 5. done: 콘텐츠 페이드인
 *
 * @param {React.ReactNode} children - 애니메이션 후 등장할 콘텐츠 [Required]
 * @param {boolean} isTriggerOnView - 뷰포트 진입 시 자동 트리거 여부 [Optional, 기본값: true]
 * @param {number} delay - 시작 지연 (ms) [Optional, 기본값: 0]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <AreaConstruct isTriggerOnView delay={120}>
 *   <img src="/hero.png" style={{ width: '100%' }} />
 * </AreaConstruct>
 */
const AreaConstruct = forwardRef(function AreaConstruct(
  { children, isTriggerOnView = true, delay = 0, sx, ...props },
  forwardedRef,
) {
  const { phase, handleRef, size } = useConstruct({ isTriggerOnView, delay });

  const mergedRef = (el) => {
    handleRef(el);
    if (typeof forwardedRef === 'function') forwardedRef(el);
    else if (forwardedRef) forwardedRef.current = el;
  };

  const showContent = phase === 'reveal' || phase === 'done';

  return (
    <Box ref={mergedRef} sx={{ position: 'relative', ...sx }} {...props}>
      {/* 콘텐츠 레이어 */}
      <Box
        sx={{
          opacity: showContent ? 1 : 0.01,
          transition: 'opacity 600ms cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'opacity',
          '@media (prefers-reduced-motion: reduce)': {
            opacity: 1,
            transition: 'none',
          },
        }}
      >
        {children}
      </Box>

      <ConstructOverlay phase={phase} size={size} />
    </Box>
  );
});

export { AreaConstruct };

'use client';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useInView } from '../../hooks/useInView';
import { ConstructCursor } from './ConstructCursor';

/**
 * ConstructType 컴포넌트
 *
 * Construct 브랜드 키 비주얼의 키네틱 타이핑 모션 컨테이너.
 * ■가 타이핑 커서 역할을 하며 좌→우로 이동, 랜덤 Y점프로 디지털 메타포를 표현.
 * 헤딩, 라벨, 브랜드명 등 짧은 텍스트에 적합.
 *
 * @param {string} text - 표시할 텍스트 [Required]
 * @param {string} variant - MUI Typography variant [Optional, 기본값: 'h2']
 * @param {number} typingSpeed - 문자 간 딜레이 ms [Optional, 기본값: 60]
 * @param {boolean} isTriggerOnView - 뷰포트 진입 시 자동 트리거 여부 [Optional, 기본값: true]
 * @param {boolean} isEnabled - 트리거 활성화 여부 [Optional, 기본값: true]
 * @param {number} delay - 시작 지연 (ms) [Optional, 기본값: 0]
 * @param {boolean} isIdleVisible - 트리거 전 커서 펄스 표시 여부 [Optional, 기본값: false]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <ConstructType text="VIBE DESIGN LAB" variant="h2" isTriggerOnView />
 */
const ConstructType = forwardRef(function ConstructType(
  { text, variant = 'h2', typingSpeed = 30, isTriggerOnView = true, isEnabled = true, delay = 0, isIdleVisible = false, sx, ...props },
  forwardedRef,
) {
  const [inViewRef, isInView] = useInView({
    trigger: 0.1,
    delay,
    isEnabled: isTriggerOnView && isEnabled,
  });

  const [isActive, setIsActive] = useState(false);

  const mergedRef = useCallback(
    (el) => {
      inViewRef(el);
      if (typeof forwardedRef === 'function') forwardedRef(el);
      else if (forwardedRef) forwardedRef.current = el;
    },
    [inViewRef, forwardedRef],
  );

  /** 뷰포트 트리거 */
  useEffect(() => {
    if (isTriggerOnView && isInView) setIsActive(true);
  }, [isTriggerOnView, isInView]);

  /** 수동 트리거 (isTriggerOnView=false) */
  useEffect(() => {
    if (isTriggerOnView || !isEnabled) return;
    const t = setTimeout(() => setIsActive(true), delay);
    return () => clearTimeout(t);
  }, [isTriggerOnView, delay, isEnabled]);

  return (
    <Box ref={mergedRef} sx={{ position: 'relative', ...sx }} {...props}>
      <ConstructCursor
        text={text}
        variant={variant}
        typingSpeed={typingSpeed}
        isActive={isActive}
        isIdleVisible={isIdleVisible && !isActive}
      />
    </Box>
  );
});

export { ConstructType };

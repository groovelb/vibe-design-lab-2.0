'use client';
import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import { useInView } from '../../hooks/useInView';
import { ConstructCursor } from './ConstructCursor';

/**
 * ConstructBlock 컴포넌트
 *
 * Construct 브랜드 키 비주얼의 문단 스캔 리빌 모션 컨테이너.
 * 문단의 모든 줄에 ConstructCursor를 동시에 실행하여
 * 스캔 라인이 좌→우로 sweep하며 텍스트를 마스킹 리빌하는 효과.
 * 설명 문단, 본문 텍스트 등 긴 텍스트에 적합.
 *
 * @param {string} text - 표시할 텍스트 [Required]
 * @param {string} variant - MUI Typography variant [Optional, 기본값: 'body1']
 * @param {number} typingSpeed - 스캔 속도 (문자당 ms) [Optional, 기본값: 30]
 * @param {boolean} isSplitSentences - 문장 단위 분할 여부 (false면 줄바꿈 기준) [Optional, 기본값: true]
 * @param {boolean} isTriggerOnView - 뷰포트 진입 시 자동 트리거 여부 [Optional, 기본값: true]
 * @param {number} delay - 시작 지연 (ms) [Optional, 기본값: 0]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <ConstructBlock
 *   text="채용 시장은 디자인 엔지니어를 찾는데. 나는 Figma 안에서만 영향력이 있다."
 *   variant="body1"
 *   isTriggerOnView
 * />
 */
const ConstructBlock = forwardRef(function ConstructBlock(
  {
    text,
    variant = 'body1',
    typingSpeed = 30,
    isSplitSentences = true,
    isTriggerOnView = true,
    delay = 0,
    sx,
    ...props
  },
  forwardedRef,
) {
  const [inViewRef, isInView] = useInView({
    trigger: 0.1,
    delay,
    isEnabled: isTriggerOnView,
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

  /** 줄 분할 */
  const lines = useMemo(() => {
    if (isSplitSentences) {
      return text.split(/(?<=[.?!])\s+/).filter(Boolean);
    }
    return text.split('\n').filter(Boolean);
  }, [text, isSplitSentences]);

  /** 뷰포트 트리거 */
  useEffect(() => {
    if (isTriggerOnView && isInView) setIsActive(true);
  }, [isTriggerOnView, isInView]);

  /** 수동 트리거 */
  useEffect(() => {
    if (isTriggerOnView) return;
    const t = setTimeout(() => setIsActive(true), delay);
    return () => clearTimeout(t);
  }, [isTriggerOnView, delay]);

  return (
    <Box ref={mergedRef} sx={{ ...sx }} {...props}>
      {lines.map((line, i) => (
        <ConstructCursor
          key={i}
          text={line}
          variant={variant}
          typingSpeed={typingSpeed}
          isActive={isActive}
        />
      ))}
    </Box>
  );
});

export { ConstructBlock };

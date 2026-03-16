'use client';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useInView } from '../../hooks/useInView';
import { ConstructCursor } from './ConstructCursor';

/**
 * ConstructBlock 컴포넌트
 *
 * Construct 브랜드 키 비주얼의 문단 스캔 리빌 모션 컨테이너.
 * 텍스트를 native CSS로 렌더링해 줄바꿈 위치를 측정한 뒤,
 * 각 visual line을 ConstructCursor로 동시 실행.
 * 모든 줄의 ■ 커서가 한 글자씩 동시에 좌→우 타이핑하며
 * 문단 전체가 마스킹 리빌된다.
 *
 * @param {string} text - 표시할 텍스트 [Required]
 * @param {string} variant - MUI Typography variant [Optional, 기본값: 'body1']
 * @param {number} typingSpeed - 스캔 속도 (문자당 ms) [Optional, 기본값: 30]
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
  const [lines, setLines] = useState([text]);
  const measureRef = useRef(null);
  const containerRef = useRef(null);

  const mergedRef = useCallback(
    (el) => {
      containerRef.current = el;
      inViewRef(el);
      if (typeof forwardedRef === 'function') forwardedRef(el);
      else if (forwardedRef) forwardedRef.current = el;
    },
    [inViewRef, forwardedRef],
  );

  /** CSS 줄바꿈 위치 감지 — getBoundingClientRect로 visual line 분할 */
  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;

    const detect = () => {
      const spans = el.querySelectorAll('[data-measure]');
      if (spans.length === 0) return;

      const detected = [];
      let currentLine = '';
      let lastTop = Math.round(spans[0].getBoundingClientRect().top);

      spans.forEach((span) => {
        const top = Math.round(span.getBoundingClientRect().top);
        if (Math.abs(top - lastTop) > 2) {
          detected.push(currentLine);
          currentLine = '';
          lastTop = top;
        }
        currentLine += span.textContent;
      });
      if (currentLine) detected.push(currentLine);

      if (detected.length > 0) setLines(detected);
    };

    detect();
    const ro = new ResizeObserver(detect);
    ro.observe(el);
    return () => ro.disconnect();
  }, [text, variant]);

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
    <Box ref={mergedRef} sx={{ position: 'relative', ...sx }} {...props}>
      {/* 측정 레이어 — 레이아웃 공간 확보 + CSS 줄바꿈 감지 */}
      <Typography
        ref={measureRef}
        variant={variant}
        aria-hidden
        sx={{
          opacity: 0.01,
          pointerEvents: 'none',
          '@media (prefers-reduced-motion: reduce)': {
            opacity: 1,
          },
        }}
      >
        {text.split('').map((char, i) => (
          <span key={i} data-measure>
            {char}
          </span>
        ))}
      </Typography>

      {/* ConstructCursor 오버레이 — visual line별 동시 실행 */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          '@media (prefers-reduced-motion: reduce)': {
            display: 'none',
          },
        }}
      >
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
    </Box>
  );
});

export { ConstructBlock };

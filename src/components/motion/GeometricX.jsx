'use client';
import { forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';

/* ── 대각선 길이: (5,5)→(19,19) = 14√2 ≈ 19.799 ── */
const LINE_LENGTH = 19.8;

/**
 * GeometricX 컴포넌트
 *
 * 기하학적 X 마크 SVG. 뷰포트 진입 시 stroke가 그려지는 애니메이션.
 * prefers-reduced-motion 시 즉시 표시.
 *
 * @param {number} size - SVG 크기 (px) [Optional, 기본값: 24]
 * @param {number} strokeWidth - 선 두께 [Optional, 기본값: 1.5]
 * @param {string} color - 선 색상 [Optional, 기본값: 'currentColor']
 * @param {number} duration - 애니메이션 지속 시간 (ms) [Optional, 기본값: 600]
 * @param {number} delay - 애니메이션 지연 시간 (ms) [Optional, 기본값: 0]
 * @param {boolean} isTriggerOnView - 뷰포트 진입 시 트리거 [Optional, 기본값: true]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <GeometricX size={32} />
 * <GeometricX size={48} color="var(--vdl-400)" duration={800} />
 */
const GeometricX = forwardRef(function GeometricX({
  size = 24,
  strokeWidth = 1.5,
  color = 'currentColor',
  duration = 600,
  delay = 0,
  isTriggerOnView = true,
  sx,
  ...props
}, ref) {
  const localRef = useRef(null);
  const [isVisible, setIsVisible] = useState(!isTriggerOnView);

  const setRefs = useCallback((node) => {
    localRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  }, [ref]);

  useEffect(() => {
    if (!isTriggerOnView) return;

    const el = localRef.current;
    if (!el) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isTriggerOnView]);

  const lineStyle = (extraDelay) => ({
    strokeDasharray: LINE_LENGTH,
    strokeDashoffset: isVisible ? 0 : LINE_LENGTH,
    transition: `stroke-dashoffset ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay + extraDelay}ms`,
  });

  return (
    <Box
      ref={setRefs}
      component="svg"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      sx={{
        width: size,
        height: size,
        flexShrink: 0,
        display: 'block',
        ...sx,
      }}
      {...props}
    >
      <line
        x1="5" y1="5" x2="19" y2="19"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        style={lineStyle(0)}
      />
      <line
        x1="19" y1="5" x2="5" y2="19"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        style={lineStyle(duration * 0.3)}
      />
    </Box>
  );
});

export { GeometricX };

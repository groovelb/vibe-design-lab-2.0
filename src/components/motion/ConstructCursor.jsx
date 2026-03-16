'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CURSOR_SIZE, CURSOR_Y_RANGE, EASE_OUT } from './constants';

/**
 * ConstructCursor 컴포넌트
 *
 * Construct 브랜드 키 비주얼의 타이핑 커서 프리미티브.
 * ■ (6×6)가 좌→우로 이동하며 문자를 순차 등장시킨다.
 * 디지털 메타포를 위해 커서 Y 위치가 랜덤하게 점프한다.
 * ConstructType, ConstructBlock에서 내부적으로 사용.
 *
 * @param {string} text - 렌더링할 텍스트 [Required]
 * @param {string} variant - MUI Typography variant [Optional, 기본값: 'h2']
 * @param {number} typingSpeed - 문자당 딜레이 ms [Optional, 기본값: 60]
 * @param {boolean} isActive - 커서 시작 여부 [Optional, 기본값: false]
 * @param {function} onComplete - 타이핑 완료 콜백 [Optional]
 *
 * Example usage:
 * <ConstructCursor text="VIBE DESIGN" isActive typingSpeed={60} />
 */
function ConstructCursor({ text, variant = 'h2', typingSpeed = 60, isActive = false, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const hasStartedRef = useRef(false);
  const textRef = useRef(null);
  const charWidthsRef = useRef([]);

  const chars = useMemo(() => text.split(''), [text]);

  /** 랜덤 Y 오프셋 배열 — text 변경 시 재생성 */
  const yOffsets = useMemo(() => {
    const offsets = [];
    let currentY = 0;
    let nextJump = 2 + Math.floor(Math.random() * 3);
    let count = 0;
    for (let i = 0; i < chars.length; i++) {
      if (count >= nextJump) {
        currentY = (Math.random() * 2 - 1) * CURSOR_Y_RANGE;
        nextJump = 2 + Math.floor(Math.random() * 3);
        count = 0;
      }
      offsets.push(currentY);
      count++;
    }
    return offsets;
  }, [chars]);

  /** 문자별 누적 너비 측정 */
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const spans = el.querySelectorAll('[data-char]');
    const widths = [];
    let cumulative = 0;
    spans.forEach((span) => {
      widths.push(cumulative);
      cumulative += span.offsetWidth;
    });
    widths.push(cumulative);
    charWidthsRef.current = widths;
  }, [text, variant]);

  /** 타이핑 진행 */
  useEffect(() => {
    if (!isActive || hasStartedRef.current) return;
    hasStartedRef.current = true;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        if (next >= chars.length) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            onComplete?.();
          }, 150);
          return chars.length;
        }
        return next;
      });
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [isActive, chars.length, typingSpeed, onComplete]);

  /** 리셋 (text 변경 시) */
  useEffect(() => {
    hasStartedRef.current = false;
    setCurrentIndex(0);
    setIsDone(false);
  }, [text]);

  const lineHeight = textRef.current?.offsetHeight || 0;
  const cursorX = charWidthsRef.current[currentIndex] || 0;
  const cursorYRatio = currentIndex < yOffsets.length ? yOffsets[currentIndex] : 0;
  const cursorY = lineHeight * cursorYRatio;
  const isCursorVisible = isActive && !isDone;

  return (
    <Box sx={{ position: 'relative' }}>
      <Typography
        ref={textRef}
        variant={variant}
        component="div"
        aria-label={text}
        sx={{
          whiteSpace: 'pre',
          '@media (prefers-reduced-motion: reduce)': {
            '& > span': { opacity: '1 !important', transition: 'none !important' },
          },
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            data-char
            aria-hidden
            style={{
              opacity: i < currentIndex ? 1 : 0.01,
              transition: i < currentIndex ? `opacity 60ms ${EASE_OUT}` : 'none',
            }}
          >
            {char}
          </span>
        ))}
      </Typography>

      {/* ■ 커서 */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: 0,
          width: CURSOR_SIZE,
          height: CURSOR_SIZE,
          backgroundColor: 'primary.main',
          transform: `translate3d(${cursorX}px, calc(-50% + ${cursorY}px), 0)`,
          opacity: isCursorVisible ? 1 : 0.01,
          transition: isCursorVisible
            ? `transform ${typingSpeed}ms ${EASE_OUT}, opacity 150ms ${EASE_OUT}`
            : `opacity 150ms ${EASE_OUT}`,
          willChange: 'transform, opacity',
          pointerEvents: 'none',
          '@media (prefers-reduced-motion: reduce)': {
            display: 'none',
          },
        }}
      />
    </Box>
  );
}

export { ConstructCursor };

'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CURSOR_RATIO, EASE_OUT, WORD_DELAY_MULTIPLIER } from './constants';

/**
 * ConstructCursor 컴포넌트
 *
 * Construct 브랜드 키 비주얼의 타이핑 커서 프리미티브.
 * ■가 좌→우로 이동하며 문자를 순차 등장시킨다.
 * 디지털 메타포를 위해 커서 Y 위치가 랜덤하게 점프한다.
 * 커서 크기는 폰트 사이즈에 비례하며, word 간 이동 시 3배 딜레이.
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
function ConstructCursor({ text, variant = 'h2', typingSpeed = 30, isActive = false, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [cursorSize, setCursorSize] = useState(6);
  const hasStartedRef = useRef(false);
  const textRef = useRef(null);
  const charWidthsRef = useRef([]);
  const timeoutRef = useRef(null);

  const chars = useMemo(() => text.split(''), [text]);

  /** 랜덤 Y 그리드 오프셋 배열 — lineHeight 6등분 그리드에서 랜덤 선택 */
  const yGridIndices = useMemo(() => {
    const indices = [];
    let currentSlot = 0;
    let nextJump = 2 + Math.floor(Math.random() * 3);
    let count = 0;
    for (let i = 0; i < chars.length; i++) {
      if (count >= nextJump) {
        let next;
        do { next = Math.floor(Math.random() * 6); } while (next === currentSlot);
        currentSlot = next;
        nextJump = 2 + Math.floor(Math.random() * 3);
        count = 0;
      }
      indices.push(currentSlot);
      count++;
    }
    if (indices.length > 0) indices[indices.length - 1] = 5;
    return indices;
  }, [chars]);

  /** 문자별 누적 너비 측정 + 폰트 비례 커서 크기 계산 */
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

    const fontSize = parseFloat(getComputedStyle(el).fontSize);
    setCursorSize(Math.round(fontSize * CURSOR_RATIO));
  }, [text, variant]);

  /** 타이핑 진행 — word 간 3배 딜레이 */
  useEffect(() => {
    if (!isActive || hasStartedRef.current) return;
    hasStartedRef.current = true;

    const tick = (idx) => {
      if (idx >= chars.length) {
        timeoutRef.current = setTimeout(() => {
          setIsDone(true);
          onComplete?.();
        }, 150);
        return;
      }
      setCurrentIndex(idx + 1);
      const delay = chars[idx] === ' ' ? typingSpeed * WORD_DELAY_MULTIPLIER : typingSpeed;
      timeoutRef.current = setTimeout(() => tick(idx + 1), delay);
    };

    timeoutRef.current = setTimeout(() => tick(0), typingSpeed);

    return () => clearTimeout(timeoutRef.current);
  }, [isActive, chars, typingSpeed, onComplete]);

  /** 리셋 (text 변경 시) */
  useEffect(() => {
    hasStartedRef.current = false;
    setCurrentIndex(0);
    setIsDone(false);
    clearTimeout(timeoutRef.current);
  }, [text]);

  const lineHeight = textRef.current?.offsetHeight || 0;
  const cursorX = charWidthsRef.current[currentIndex] || 0;
  const gridSlot = yGridIndices[Math.min(currentIndex, yGridIndices.length - 1)] || 0;
  const cursorY = lineHeight > 0 ? (gridSlot / 5) * lineHeight - lineHeight / 2 : 0;
  const isCursorVisible = isActive && !isDone;

  return (
    <Box sx={{ position: 'relative' }}>
      <Typography
        ref={textRef}
        variant={variant}
        component="div"
        aria-label={text}
        sx={{
          whiteSpace: 'nowrap',
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
          width: cursorSize,
          height: cursorSize,
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

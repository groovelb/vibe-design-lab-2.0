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
  const [cursorSize, setCursorSize] = useState(6);
  const hasStartedRef = useRef(false);
  const textRef = useRef(null);
  const cursorRef = useRef(null);
  const charWidthsRef = useRef([]);
  const lineHeightRef = useRef(0);
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
    lineHeightRef.current = el.offsetHeight;

    const fontSize = parseFloat(getComputedStyle(el).fontSize);
    setCursorSize(Math.round(fontSize * CURSOR_RATIO));
  }, [text, variant]);

  /** 타이핑 진행 — 직접 DOM 조작으로 React 리렌더 제거 */
  useEffect(() => {
    if (!isActive || hasStartedRef.current) return;
    hasStartedRef.current = true;

    const el = textRef.current;
    const cursor = cursorRef.current;
    if (!el || !cursor) return;

    const spans = el.querySelectorAll('[data-char]');
    const lh = lineHeightRef.current;

    const moveCursor = (idx) => {
      const x = charWidthsRef.current[idx] || 0;
      const gridSlot = yGridIndices[Math.min(idx, yGridIndices.length - 1)] || 0;
      const y = lh > 0 ? (gridSlot / 5) * lh - lh / 2 : 0;
      cursor.style.transform = `translate3d(${x}px, calc(-50% + ${y}px), 0)`;
    };

    cursor.style.opacity = '1';
    cursor.style.transition = `transform ${typingSpeed}ms ${EASE_OUT}, opacity 150ms ${EASE_OUT}`;

    const tick = (idx) => {
      if (idx >= chars.length) {
        timeoutRef.current = setTimeout(() => {
          cursor.style.opacity = '0.01';
          cursor.style.transition = `opacity 150ms ${EASE_OUT}`;
          onComplete?.();
        }, 150);
        return;
      }
      if (spans[idx]) {
        spans[idx].style.opacity = '1';
        spans[idx].style.transition = `opacity 60ms ${EASE_OUT}`;
      }
      moveCursor(idx + 1);
      const delay = chars[idx] === ' ' ? typingSpeed * WORD_DELAY_MULTIPLIER : typingSpeed;
      timeoutRef.current = setTimeout(() => tick(idx + 1), delay);
    };

    timeoutRef.current = setTimeout(() => tick(0), typingSpeed);

    return () => clearTimeout(timeoutRef.current);
  }, [isActive, chars, typingSpeed, onComplete, yGridIndices]);

  /** 리셋 (text 변경 시) */
  useEffect(() => {
    hasStartedRef.current = false;
    clearTimeout(timeoutRef.current);
  }, [text]);

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      <Typography
        ref={textRef}
        variant={variant}
        component="div"
        aria-label={text}
        sx={{
          whiteSpace: 'pre-wrap',
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
            style={{ opacity: 0.01 }}
          >
            {char}
          </span>
        ))}
      </Typography>

      {/* ■ 커서 — 직접 DOM 조작으로 위치/투명도 제어 */}
      <Box
        ref={cursorRef}
        sx={{
          position: 'absolute',
          top: '50%',
          left: 0,
          width: cursorSize,
          height: cursorSize,
          backgroundColor: 'primary.main',
          transform: 'translate3d(0, -50%, 0)',
          opacity: 0.01,
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

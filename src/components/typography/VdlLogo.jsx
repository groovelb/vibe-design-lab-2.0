'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Box from '@mui/material/Box';

const LOGO_TEXT = 'VIBE DESIGN LAB';
const TYPING_SPEED = 50;
const ERASE_SPEED = 30;

/**
 * VdlLogo 컴포넌트
 *
 * VIBE DESIGN LAB 브랜드 로고. Inter Black(900) 타이포 기반.
 * isExtend prop에 따라 V <-> VIBE DESIGN LAB 타이핑 애니메이션으로 전환.
 * 축소 상태에서는 블링킹 커서가 표시되고, 확장 완료 후 커서가 페이드아웃된다.
 *
 * @param {number} size - 폰트 크기 (px) [Optional, 기본값: 18]
 * @param {boolean} isExtend - 전체 텍스트 펼침 여부 [Optional, 기본값: true]
 *
 * Example usage:
 * <VdlLogo size={24} isExtend />
 * <VdlLogo size={14} isExtend={false} />
 */
function VdlLogo({ size = 18, isExtend = true, sx }) {
  const hasMounted = useRef(false);
  const timerRef = useRef(null);
  const posRef = useRef(isExtend ? LOGO_TEXT.length : 1);
  const [text, setText] = useState(
    isExtend ? LOGO_TEXT : LOGO_TEXT.charAt(0),
  );
  const [isTyping, setIsTyping] = useState(false);

  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    hasMounted.current = true;
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const animate = useCallback((targetLen) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (posRef.current === targetLen) return;

    if (reducedMotion.current) {
      posRef.current = targetLen;
      setText(LOGO_TEXT.slice(0, targetLen));
      return;
    }

    setIsTyping(true);

    const step = () => {
      const current = posRef.current;
      if (current === targetLen) {
        setIsTyping(false);
        return;
      }

      const expanding = targetLen > current;
      const next = expanding ? current + 1 : current - 1;
      const clamped = Math.max(1, next);
      posRef.current = clamped;
      setText(LOGO_TEXT.slice(0, clamped));

      if (clamped === targetLen) {
        setIsTyping(false);
        return;
      }

      const delay = expanding ? TYPING_SPEED : ERASE_SPEED;
      timerRef.current = setTimeout(step, delay);
    };

    timerRef.current = setTimeout(step, TYPING_SPEED);
  }, []);

  useEffect(() => {
    if (!hasMounted.current) return;
    animate(isExtend ? LOGO_TEXT.length : 1);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isExtend, animate]);

  const showCursor = isTyping || !isExtend;

  const cursorW = Math.max(1.5, size * 0.08);
  const cursorH = size * 0.75;
  const cursorMl = size * 0.05;

  return (
    <Box
      component="span"
      role="img"
      aria-label="Vibe Design Lab"
      sx={{
        fontFamily: (theme) => theme.typography.brandFontFamily,
        fontWeight: 900,
        fontSize: size,
        letterSpacing: '-0.02em',
        wordSpacing:'0.15em',
        color: 'text.primary',
        whiteSpace: 'nowrap',
        display: 'inline-flex',
        alignItems: 'center',
        lineHeight: 1,
        userSelect: 'none',
        ...sx,
      }}
    >
      {text}
      <Box
        component="span"
        aria-hidden="true"
        sx={{
          display: 'inline-block',
          width: cursorW,
          height: cursorH,
          bgcolor: 'text.primary',
          ml: `${cursorMl}px`,
          flexShrink: 0,
          opacity: showCursor ? 1 : 0.01,
          transition: showCursor ? 'none' : 'opacity 0.5s ease-out 0.3s',
          ...(showCursor &&
            !isTyping && {
              animation: 'vdlCursorBlink 1s step-end infinite',
            }),
          '@keyframes vdlCursorBlink': {
            '0%, 100%': { opacity: 1 },
            '50%': { opacity: 0.01 },
          },
        }}
      />
    </Box>
  );
}

export { VdlLogo };

'use client';
import { forwardRef, useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useInView } from '../../hooks/useInView';

const VARIANT_STYLES = {
  default: {
    bg: 'transparent',
    valueColor: 'text.primary',
    captionColor: 'text.secondary',
  },
  accent: {
    bg: 'transparent',
    valueColor: '#FF6B2C',
    captionColor: 'text.secondary',
  },
  hero: {
    bg: '#FF6B2C',
    valueColor: '#0A0A0A',
    captionColor: 'rgba(0,0,0,0.6)',
  },
  muted: {
    bg: 'rgba(255, 107, 44, 0.10)',
    valueColor: '#FF8F5C',
    captionColor: 'text.secondary',
  },
};

/**
 * value 문자열에서 숫자 부분과 접두/접미 분리.
 * '1,297' → { prefix: '', num: 1297, suffix: '', hasComma: true }
 * '40+'   → { prefix: '', num: 40, suffix: '+', hasComma: false }
 * '5/5'   → null (비율은 카운트업 안 함)
 */
function parseValue(value) {
  const str = String(value);
  const match = str.match(/^([^0-9]*?)([\d,]+)([^0-9]*?)$/);
  if (!match) return null;
  const [, prefix, numStr, suffix] = match;
  const hasComma = numStr.includes(',');
  const num = Number(numStr.replace(/,/g, ''));
  if (Number.isNaN(num) || num === 0) return null;
  return { prefix, num, suffix, hasComma };
}

function formatNum(n, hasComma) {
  const rounded = Math.round(n);
  return hasComma ? rounded.toLocaleString('en-US') : String(rounded);
}

const DURATION = 1200;

function useCountUp(target, isActive, hasComma) {
  const [display, setDisplay] = useState('0');
  const rafRef = useRef(null);

  useEffect(() => {
    if (!isActive || target === 0) return;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / DURATION, 1);
      // ease-out cubic
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(formatNum(eased * target, hasComma));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, isActive, hasComma]);

  return display;
}

/**
 * DataCallout
 *
 * 핵심 수치를 display 사이즈로 강조하고 캡션으로 설명하는 블록.
 * 뷰포트 진입 시 0에서 목표 수치까지 카운트업 애니메이션.
 *
 * @param {string} value - 표시할 숫자 또는 텍스트 (예: '1,297', '40+') [Required]
 * @param {string} caption - 숫자 아래 캡션 (예: '줄 QueryEngine') [Required]
 * @param {'default'|'accent'|'hero'|'muted'} variant - 색상 변형 [Optional, 기본값: 'default']
 * @param {object} sx - 추가 스타일 [Optional]
 */
const DataCallout = forwardRef(function DataCallout(
  { value, caption, variant = 'default', sx, ...props },
  ref
) {
  const style = VARIANT_STYLES[variant] || VARIANT_STYLES.default;
  const parsed = parseValue(value);
  const [inViewRef, isInView] = useInView({ trigger: 0.3 });
  const countedValue = useCountUp(
    parsed ? parsed.num : 0,
    isInView && !!parsed,
    parsed?.hasComma ?? false,
  );

  // ref 병합 (forwardRef + inViewRef)
  const setRefs = (node) => {
    inViewRef(node);
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  const displayValue = parsed
    ? `${parsed.prefix}${countedValue}${parsed.suffix}`
    : value;

  return (
    <Box
      ref={setRefs}
      sx={{
        textAlign: 'center',
        py: { xs: 4, md: 5 },
        px: { xs: 2, md: 3 },
        bgcolor: style.bg,
        ...sx,
      }}
      {...props}
    >
      <Typography
        variant="display"
        component="div"
        sx={{
          color: style.valueColor,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {displayValue}
      </Typography>
      <Typography
        variant="caption"
        component="div"
        sx={{
          color: style.captionColor,
          mt: 1.5,
          letterSpacing: '0.04em',
        }}
      >
        {caption}
      </Typography>
    </Box>
  );
});

export { DataCallout };

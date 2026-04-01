'use client';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
 * DataCallout
 *
 * 핵심 수치를 display 사이즈로 강조하고 캡션으로 설명하는 블록.
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

  return (
    <Box
      ref={ref}
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
        {value}
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

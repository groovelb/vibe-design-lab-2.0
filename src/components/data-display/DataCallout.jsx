'use client';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * DataCallout
 *
 * 핵심 수치를 display 사이즈로 강조하고 캡션으로 설명하는 블록.
 *
 * @param {string} value - 표시할 숫자 또는 텍스트 (예: '1,297', '40+') [Required]
 * @param {string} caption - 숫자 아래 캡션 (예: '줄 QueryEngine') [Required]
 * @param {'default'|'accent'} variant - default: text.primary, accent: secondary.main 강조 [Optional, 기본값: 'default']
 * @param {object} sx - 추가 스타일 [Optional]
 */
const DataCallout = forwardRef(function DataCallout(
  { value, caption, variant = 'default', sx, ...props },
  ref
) {
  return (
    <Box
      ref={ref}
      sx={{
        textAlign: 'center',
        py: { xs: 2, md: 3 },
        ...sx,
      }}
      {...props}
    >
      <Typography
        variant="display"
        component="div"
        sx={{
          color: variant === 'accent' ? 'secondary.main' : 'text.primary',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value}
      </Typography>
      <Typography
        variant="caption"
        component="div"
        sx={{
          color: 'text.secondary',
          mt: 1,
          letterSpacing: '0.04em',
        }}
      >
        {caption}
      </Typography>
    </Box>
  );
});

export { DataCallout };

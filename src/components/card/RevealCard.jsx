'use client';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FadeTransition from '../motion/FadeTransition';

/**
 * RevealCard
 *
 * 스크롤 진입 시 드러나는 서프라이즈 발견 블록.
 * 에디토리얼 플랫 레이아웃 — 타이틀 + 설명 인라인, 코드 인용 하단.
 *
 * @param {string} title - Reveal 제목 [Required]
 * @param {string} description - Reveal 설명 [Required]
 * @param {string} quote - 핵심 인용구 (코드/수치) [Optional]
 * @param {number} surpriseLevel - 1–5 강도 [Optional, 기본값: 3]
 * @param {number} delay - FadeTransition 지연 (ms) [Optional, 기본값: 200]
 * @param {object} sx - 추가 스타일 [Optional]
 */
const RevealCard = forwardRef(function RevealCard(
  { title, description, quote, surpriseLevel = 3, delay = 200, sx, ...props },
  ref
) {
  return (
    <FadeTransition isTriggerOnView direction="up" delay={delay}>
      <Box
        ref={ref}
        sx={{
          py: { xs: 3, md: 4 },
          px: { xs: 2, md: 3 },
          borderTop: '1px solid',
          borderColor: 'divider',
          transition: 'background-color 0.2s',
          '&:hover': { bgcolor: 'rgba(255, 107, 44, 0.06)' },
          ...sx,
        }}
        {...props}
      >
        <Typography variant="body2" component="div" sx={{ color: 'text.secondary' }}>
          <Typography
            component="span"
            variant="body2"
            sx={{ fontWeight: 600, color: '#FF6B2C' }}
          >
            {title}
          </Typography>
          {' — '}
          {description}
        </Typography>

        {quote && (
          <Typography
            variant="code"
            component="div"
            sx={{ color: 'text.secondary', mt: 1.5 }}
          >
            {quote}
          </Typography>
        )}
      </Box>
    </FadeTransition>
  );
});

export { RevealCard };

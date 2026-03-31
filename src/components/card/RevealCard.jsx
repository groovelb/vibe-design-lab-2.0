'use client';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CardContainer } from './CardContainer';
import FadeTransition from '../motion/FadeTransition';

/**
 * surpriseLevel → 좌측 border 명도 매핑
 * 높을수록 밝아진다 (주목도 증가)
 */
const ACCENT_MAP = {
  1: 'grey.700',
  2: 'grey.700',
  3: 'grey.500',
  4: 'grey.200',
  5: 'grey.100',
};

/**
 * RevealCard
 *
 * 스크롤 진입 시 드러나는 서프라이즈 발견 카드.
 * reveals.json의 개별 항목을 렌더링한다.
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
  const accentColor = ACCENT_MAP[surpriseLevel] || ACCENT_MAP[3];

  return (
    <FadeTransition isTriggerOnView direction="up" delay={delay}>
      <CardContainer
        ref={ref}
        variant="ghost"
        padding="md"
        radius="none"
        sx={{
          borderLeft: '1px solid',
          borderLeftColor: accentColor,
          ...sx,
        }}
        {...props}
      >
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', display: 'block', mb: 1 }}
        >
          Discovery
        </Typography>

        <Typography variant="h4" sx={{ color: 'text.primary', mb: 2 }}>
          {title}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary', mb: quote ? 2 : 0 }}>
          {description}
        </Typography>

        {quote && (
          <Box
            sx={{
              mt: 2,
              py: 1.5,
              px: 2,
              bgcolor: 'action.hover',
              borderRadius: 0,
            }}
          >
            <Typography
              variant="code"
              component="div"
              sx={{ color: 'text.primary' }}
            >
              {quote}
            </Typography>
          </Box>
        )}
      </CardContainer>
    </FadeTransition>
  );
});

export { RevealCard };

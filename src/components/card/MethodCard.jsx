'use client';
import { forwardRef } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ConstructType } from '../motion/ConstructType';
import { ConstructBlock } from '../motion/ConstructBlock';

/**
 * MethodCard 컴포넌트
 *
 * 좌측 아이콘 + 우측 타이틀 섹션(label+title) 수평 가운데 정렬,
 * 하단 본문과 spacing 8 간격.
 * 타이틀은 ConstructType, 설명은 ConstructBlock으로 리빌.
 *
 * @param {elementType} icon - lucide-react 아이콘 컴포넌트 [Optional]
 * @param {string} label - 카테고리 라벨 [Optional]
 * @param {string} title - 카드 제목 [Required]
 * @param {string} description - 카드 설명 [Optional]
 * @param {number} delay - Construct 시작 지연 (ms) [Optional, 기본값: 0]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <MethodCard
 *   icon={Network}
 *   label="연결된 환경"
 *   title="리드와 참여자가 연결되있습니다"
 *   description="Discord와 학습 플랫폼에서..."
 *   delay={120}
 * />
 */
const MethodCard = forwardRef(function MethodCard({
  icon: Icon,
  label,
  title,
  description,
  delay = 0,
  sx,
  ...props
}, ref) {
  return (
    <Stack ref={ref} spacing={4} sx={sx} {...props}>
      {Icon && <Icon size={40} strokeWidth={1} style={{ flexShrink: 0 }} />}
      <Stack spacing={2} sx={{ width: { xs: '100%', md: '75%' } }}>
        <Stack spacing={0.5}>
          {label && (
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              {label}
            </Typography>
          )}
          <ConstructType
            text={title}
            variant="h4"
            typingSpeed={20}
            delay={delay}
            sx={{ '& .MuiTypography-root': { fontWeight: 900 } }}
          />
        </Stack>

        {description && (
          <ConstructBlock
            text={description}
            variant="body1"
            duration={800}
            delay={delay + 200}
            sx={{ color: 'text.secondary', '& .MuiTypography-root': { lineHeight: 1.7, wordBreak: 'keep-all' } }}
          />
        )}
      </Stack>
    </Stack>
  );
});

export { MethodCard };

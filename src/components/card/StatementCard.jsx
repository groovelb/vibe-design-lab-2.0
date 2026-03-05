'use client';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { CardContainer } from './CardContainer';

/**
 * StatementCard 컴포넌트
 *
 * 제목 + 설명 구조의 간결한 진술형 카드.
 * 문제 정의, 페르소나별 페인포인트 등 짧은 메시지 전달에 사용한다.
 *
 * Props:
 * @param {node} thumbnailSlot - 썸네일 영역 커스텀 요소 [Optional]
 * @param {string} title - 카드 제목 [Required]
 * @param {string} description - 카드 설명 [Required]
 * @param {string} cardVariant - 카드 컨테이너 스타일 ('outlined' | 'editorial') [Optional, 기본값: 'editorial']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <StatementCard
 *   title="캔버스 디자이너"
 *   description="채용 시장은 디자인 엔지니어를 찾는데, 나는 Figma 안에서만 영향력이 있다"
 * />
 */
const StatementCard = forwardRef(function StatementCard({
  thumbnailSlot,
  title,
  description,
  cardVariant = 'editorial',
  sx,
  ...props
}, ref) {
  return (
    <CardContainer
      ref={ref}
      variant={cardVariant}
      padding="none"
      sx={{ height: '100%', ...sx }}
      {...props}
    >
      {/* 썸네일 1:1 */}
      {thumbnailSlot || (
        <Box
          sx={{
            width: '100%',
            aspectRatio: '1/1',
            border: '1px dashed',
            borderColor: 'divider',
          }}
        />
      )}
      <Stack spacing={1.5} sx={{ pt: 2 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 800 }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', lineHeight: 1.7 }}
        >
          {description}
        </Typography>
      </Stack>
    </CardContainer>
  );
});

export { StatementCard };

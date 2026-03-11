'use client';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { CardTextStack } from '../typography/CardTextStack';

/**
 * FeatureCard 컴포넌트
 *
 * 일러스트 + 제목 + 설명 구조의 가치 제안 카드.
 * 기능 소개, 밸류 프로포지션 등 비주얼 중심 메시지 전달에 사용한다.
 *
 * Props:
 * @param {node} illustrationSlot - 일러스트 영역 [Optional]
 * @param {string} title - 카드 제목 [Required]
 * @param {string} description - 카드 설명 [Required]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <FeatureCard
 *   illustrationSlot={<Placeholder.Media ratio="16/9" />}
 *   title="System Over Drawing"
 *   description="그리기 전에 기준을 먼저 세운다"
 * />
 */
const FeatureCard = forwardRef(function FeatureCard({
  illustrationSlot,
  title,
  description,
  sx,
  ...props
}, ref) {
  return (
    <Stack ref={ref} sx={sx} {...props}>
      {illustrationSlot || (
        <Box
          sx={{
            width: '100%',
            aspectRatio: '1/1',
            border: '1px dashed',
            borderColor: 'divider',
          }}
        />
      )}
      <CardTextStack
        title={title}
        subtitle={description}
        sx={{ mt: 6, width: '100%' }}
      />
    </Stack>
  );
});

export { FeatureCard };

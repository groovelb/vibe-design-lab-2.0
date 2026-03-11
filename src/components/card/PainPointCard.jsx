'use client';
import { forwardRef } from 'react';
import { CardTextStack } from '../typography/CardTextStack';

/**
 * PainPointCard 컴포넌트
 *
 * 제목 + 설명 구조의 카드.
 *
 * @param {string} label - 카드 제목 (예: '정확한 의도') [Required]
 * @param {string} description - 설명 [Required]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <PainPointCard
 *   label="정확한 의도"
 *   description="UX 설계를 중심으로 예측 가능한 결과물을 만듭니다"
 * />
 */
const PainPointCard = forwardRef(function PainPointCard({
  label,
  description,
  sx,
  ...props
}, ref) {
  return (
    <CardTextStack
      ref={ref}
      title={label}
      description={description}
      sx={sx}
      {...props}
    />
  );
});

export { PainPointCard };

'use client';
import { forwardRef } from 'react';
import Chip from '@mui/material/Chip';

/**
 * 상태별 스타일 매핑
 * 무채색 명도 차이로만 상태를 구분한다.
 * recruiting(밝은) → ongoing(중간) → upcoming(어두운)
 */
const statusMap = {
  recruiting: {
    label: '모집 중',
    bg: 'grey.200',
    color: 'grey.900',
  },
  ongoing: {
    label: '진행 중',
    bg: 'grey.600',
    color: 'grey.50',
  },
  upcoming: {
    label: '예정',
    bg: 'grey.800',
    color: 'grey.300',
  },
};

/**
 * 크기별 치수 매핑
 */
const sizeMap = {
  sm: { height: 22, fontSize: '0.7rem' },
  md: { height: 28, fontSize: '0.8rem' },
};

/**
 * CohortBadge 컴포넌트
 *
 * 코호트(코스 기수) 상태를 표시하는 뱃지.
 * 무채색 명도 차이로만 recruiting / ongoing / upcoming 상태를 구분한다.
 *
 * Props:
 * @param {string} status - 코호트 상태 ('recruiting' | 'ongoing' | 'upcoming') [Required]
 * @param {string} size - 뱃지 크기 ('sm' | 'md') [Optional, 기본값: 'md']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <CohortBadge status="recruiting" />
 * <CohortBadge status="ongoing" size="sm" />
 */
const CohortBadge = forwardRef(function CohortBadge({
  status,
  size = 'md',
  sx,
  ...props
}, ref) {
  const config = statusMap[status] || statusMap.upcoming;
  const dimensions = sizeMap[size] || sizeMap.md;

  return (
    <Chip
      ref={ref}
      label={config.label}
      size="small"
      sx={{
        height: dimensions.height,
        fontSize: dimensions.fontSize,
        fontWeight: 600,
        letterSpacing: '0.02em',
        backgroundColor: config.bg,
        color: config.color,
        ...sx,
      }}
      {...props}
    />
  );
});

export { CohortBadge };

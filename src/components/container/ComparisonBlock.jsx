'use client';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { SplitScreen } from '../layout/SplitScreen';

/**
 * 톤별 스타일 매핑
 * 무채색 명도 차이로 negative / positive / neutral 톤을 구분한다.
 */
const toneStyles = {
  negative: {
    bg: 'grey.900',
    color: 'grey.400',
    labelColor: 'grey.500',
  },
  positive: {
    bg: 'grey.800',
    color: 'grey.50',
    labelColor: 'grey.200',
  },
  neutral: {
    bg: 'background.paper',
    color: 'text.primary',
    labelColor: 'text.secondary',
  },
};

/**
 * ComparisonBlock 내부 패널
 */
function ComparisonPanel({ label, items, tone = 'neutral' }) {
  const style = toneStyles[tone] || toneStyles.neutral;

  return (
    <Box
      sx={{
        p: { xs: 3, md: 4 },
        backgroundColor: style.bg,
        height: '100%',
      }}
    >
      <Typography
        variant="overline"
        sx={{ color: style.labelColor, mb: 2, display: 'block' }}
      >
        {label}
      </Typography>
      <Stack spacing={1.5}>
        {items.map((item, index) => (
          <Typography
            key={index}
            variant="body2"
            sx={{ color: style.color }}
          >
            {item}
          </Typography>
        ))}
      </Stack>
    </Box>
  );
}

/**
 * ComparisonBlock 컴포넌트
 *
 * 좌우 대비 블록. SplitScreen을 활용하여 두 그룹의 항목을 비교 표시한다.
 * 모바일에서는 상하 스택으로 전환된다.
 *
 * Props:
 * @param {string} leftLabel - 왼쪽 레이블 [Required]
 * @param {string} rightLabel - 오른쪽 레이블 [Required]
 * @param {string[]} leftItems - 왼쪽 항목 리스트 [Required]
 * @param {string[]} rightItems - 오른쪽 항목 리스트 [Required]
 * @param {string} leftTone - 왼쪽 시각 톤 ('negative' | 'positive' | 'neutral') [Optional, 기본값: 'negative']
 * @param {string} rightTone - 오른쪽 시각 톤 ('negative' | 'positive' | 'neutral') [Optional, 기본값: 'positive']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <ComparisonBlock
 *   leftLabel="일반 VOD"
 *   rightLabel="VDL 코호트"
 *   leftItems={['혼자 학습', '일방향 강의']}
 *   rightItems={['함께 학습', '실시간 피드백']}
 * />
 */
const ComparisonBlock = forwardRef(function ComparisonBlock({
  leftLabel,
  rightLabel,
  leftItems = [],
  rightItems = [],
  leftTone = 'negative',
  rightTone = 'positive',
  sx,
  ...props
}, ref) {
  return (
    <Box ref={ref} sx={sx} {...props}>
      <SplitScreen
        ratio="50:50"
        stackAt="sm"
        left={
          <ComparisonPanel
            label={leftLabel}
            items={leftItems}
            tone={leftTone}
          />
        }
        right={
          <ComparisonPanel
            label={rightLabel}
            items={rightItems}
            tone={rightTone}
          />
        }
      />
    </Box>
  );
});

export { ComparisonBlock };

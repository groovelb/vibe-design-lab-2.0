'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

/**
 * FlowStep - 유저 플로우 단계를 수직 타임라인으로 시각화하는 컴포넌트
 *
 * Props:
 * @param {number} step - 단계 번호 (1부터 시작) [Required]
 * @param {string} label - 단계 이름 [Required]
 * @param {string} type - 단계 유형 (entry/page/branch-a/branch-b/exit) [Optional]
 * @param {string} detail - 상세 설명 [Optional]
 * @param {boolean} isLast - 마지막 단계 여부 (커넥터 숨김) [Optional, 기본값: false]
 *
 * Example usage:
 * <FlowStep step={1} label="외부 유입" type="entry" detail="SNS / 검색" />
 */

const TYPE_CONFIG = {
  entry: { label: 'Entry', color: 'success' },
  page: { label: 'Page', color: 'primary' },
  'branch-a': { label: 'Branch A', color: 'warning' },
  'branch-b': { label: 'Branch B', color: 'warning' },
  exit: { label: 'Exit', color: 'error' },
};

export const FlowStep = ({ step, label, type, detail, isLast = false }) => {
  const typeConfig = type ? TYPE_CONFIG[type] : null;

  return (
    <Box sx={ { display: 'flex', position: 'relative', minHeight: 56 } }>
      {/* 번호 원 + 수직 커넥터 */}
      <Box
        sx={ {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mr: 2,
          position: 'relative',
        } }
      >
        {/* 번호 원 */}
        <Box
          sx={ {
            width: 28,
            height: 28,
            borderRadius: '50%',
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontWeight: 700,
            fontFamily: 'monospace',
            flexShrink: 0,
          } }
        >
          { step }
        </Box>

        {/* 수직 커넥터 라인 */}
        { !isLast && (
          <Box
            sx={ {
              width: 2,
              flex: 1,
              backgroundColor: 'divider',
              mt: 0.5,
              mb: 0,
            } }
          />
        ) }
      </Box>

      {/* 콘텐츠 영역 */}
      <Box sx={ { pb: isLast ? 0 : 2, pt: 0.25 } }>
        {/* 라벨 + 타입 Chip */}
        <Box sx={ { display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 } }>
          <Typography
            variant="body1"
            sx={ { fontWeight: 600, lineHeight: 1.4 } }
          >
            { label }
          </Typography>
          { typeConfig && (
            <Chip
              label={ typeConfig.label }
              color={ typeConfig.color }
              size="small"
              variant="outlined"
              sx={ { height: 20, fontSize: 11 } }
            />
          ) }
        </Box>

        {/* 상세 설명 */}
        { detail && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={ { lineHeight: 1.5 } }
          >
            { detail }
          </Typography>
        ) }
      </Box>
    </Box>
  );
};

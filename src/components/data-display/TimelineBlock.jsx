'use client';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

/**
 * TimelineBlock 컴포넌트
 *
 * 수업 일정 등 순차적 단계를 타임라인 형태로 표시한다.
 *
 * @param {Array<{chapterNum: number, title: string, description?: string}>} items - 타임라인 항목 [Required]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <TimelineBlock
 *   items={[
 *     { chapterNum: 1, title: '환경 세팅' },
 *     { chapterNum: 2, title: '클론 디자인' },
 *   ]}
 * />
 */
const TimelineBlock = forwardRef(function TimelineBlock({
  items = [],
  sx,
  ...props
}, ref) {
  return (
    <Stack ref={ref} spacing={0} sx={sx} {...props}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <Stack
            key={item.chapterNum}
            direction="row"
            spacing={3}
            sx={{ position: 'relative' }}
          >
            {/* 타임라인 라인 + 도트 */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flexShrink: 0,
                width: 24,
              }}
            >
              {/* 도트 */}
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  bgcolor: 'text.primary',
                  flexShrink: 0,
                  mt: 0.75,
                }}
              />
              {/* 라인 */}
              {!isLast && (
                <Box
                  sx={{
                    width: 1,
                    flex: 1,
                    bgcolor: 'divider',
                    mt: 1,
                  }}
                />
              )}
            </Box>

            {/* 콘텐츠 */}
            <Stack spacing={0.5} sx={{ pb: isLast ? 0 : 4 }}>
              <Typography
                variant="caption"
                sx={{ color: 'text.disabled', textTransform: 'uppercase' }}
              >
                Chapter {item.chapterNum}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {item.title}
              </Typography>
              {item.description && (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {item.description}
                </Typography>
              )}
            </Stack>
          </Stack>
        );
      })}
    </Stack>
  );
});

export { TimelineBlock };

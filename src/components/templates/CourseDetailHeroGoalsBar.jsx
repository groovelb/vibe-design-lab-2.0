'use client';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import FadeTransition from '../motion/FadeTransition';
import { TECH_BADGE_ICONS } from '../../common/ui/TechBadgeIcons';
import { GLASS_SX } from '../../common/ui/glassSx';

/**
 * CourseDetailHeroGoalsBar 컴포넌트
 *
 * Hero 하단 3-col 학습 목표 바: 글래스 컨테이너 + 기술 Chip.
 *
 * @param {Array} goals - 학습 목표 배열 [Required]
 *   각 항목: { label: string, title: string, badges: string[] }
 *
 * Example usage:
 * <CourseDetailHeroGoalsBar goals={learningGoals.goals} />
 */
export function CourseDetailHeroGoalsBar({ goals }) {
  return (
    <Box sx={{ mt: 10, ...GLASS_SX }}>
      <FadeTransition direction="up" delay={400} isTriggerOnView>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          {goals.map((goal, index) => (
            <Box
              key={goal.label}
              sx={{
                flex: 1,
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                ...(index > 0 && {
                  borderLeft: { md: '1px solid' },
                  borderLeftColor: { md: GLASS_SX.borderColor },
                  borderTop: { xs: '1px solid', md: 'none' },
                  borderTopColor: { xs: GLASS_SX.borderColor },
                }),
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary' }}
              >
                {goal.label}
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: 'text.primary' }}
              >
                {goal.title}
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {goal.badges.map((badge) => (
                  <Chip
                    key={badge}
                    icon={TECH_BADGE_ICONS[badge]}
                    label={badge}
                    size="small"
                    sx={{
                      bgcolor: 'action.hover',
                      color: 'text.primary',
                      fontSize: '0.75rem',
                      borderRadius: '4px',
                      '& .MuiChip-icon': { ml: 0.5 },
                    }}
                  />
                ))}
              </Stack>
            </Box>
          ))}
        </Box>
      </FadeTransition>
    </Box>
  );
}

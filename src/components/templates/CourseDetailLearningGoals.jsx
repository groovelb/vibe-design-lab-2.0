'use client';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { SectionContainer } from '../container/SectionContainer';
import { SectionDivider } from '../typography/SectionDivider';
import LineGrid from '../layout/LineGrid';
import { CardTextStack } from '../typography/CardTextStack';
import FadeTransition from '../motion/FadeTransition';
import { PAGES } from '../../data/contents';

const { learningGoals } = PAGES.courseDetail;

/**
 * CourseDetailLearningGoals 섹션 템플릿
 *
 * 학습 목표 3칼럼. 각 칼럼: 라벨 + 타이틀 + 기술 배지.
 *
 * Example usage:
 * <CourseDetailLearningGoals />
 */
export function CourseDetailLearningGoals() {
  return (
    <SectionContainer>
      <FadeTransition direction="up" isTriggerOnView>
        <SectionDivider label={learningGoals.dividerLabel} sx={{ mb: { xs: 6, md: 10 } }} />
      </FadeTransition>

      <LineGrid container gap={96} borderColor="divider">
        {learningGoals.goals.map((goal, index) => (
          <Grid key={goal.label} size={{ xs: 12, md: 4 }}>
            <FadeTransition direction="up" delay={index * 100} isTriggerOnView>
              <Stack spacing={3}>
                <CardTextStack label={goal.label} title={goal.title} />
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {goal.badges.map((badge) => (
                    <Chip
                      key={badge}
                      label={badge}
                      size="small"
                      sx={{
                        bgcolor: 'action.hover',
                        color: 'text.secondary',
                        fontSize: '0.75rem',
                      }}
                    />
                  ))}
                </Stack>
              </Stack>
            </FadeTransition>
          </Grid>
        ))}
      </LineGrid>
    </SectionContainer>
  );
}

'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { SectionContainer } from '../container/SectionContainer';
import { PageContainer } from '../layout/PageContainer';
import { Title } from '../typography/Title';
import { CustomCard } from '../card/CustomCard';
import { CohortBadge } from '../../common/ui/CohortBadge';
import Placeholder from '../../common/ui/Placeholder';
import FadeTransition from '../motion/FadeTransition';
import { PAGES } from '../../data/contents';
import { MOCK_COURSES } from '../../data/landingMockData';

const { courseHighlight } = PAGES.landing;

/**
 * LandingCourseHighlight 섹션 템플릿
 *
 * 코스 하이라이트 섹션. 2개의 코스 카드를 그리드로 배치하고 1차 CTA를 유도한다.
 * CustomCard + Placeholder.Media로 코스 커버를 표현하고, CohortBadge로 상태를 표시한다.
 *
 * Example usage:
 * <LandingCourseHighlight />
 */
export function LandingCourseHighlight() {
  return (
    <SectionContainer>
      <PageContainer>
        <FadeTransition direction="up" isTriggerOnView>
          <Title title={courseHighlight.headline} level="h2" sx={{ mb: 6 }} />
        </FadeTransition>

        <Grid container spacing={3}>
          {MOCK_COURSES.map((course, index) => (
            <Grid key={course.slug} size={{ xs: 12, md: 6 }}>
              <FadeTransition direction="up" delay={index * 150} isTriggerOnView>
                <CustomCard
                  mediaSlot={<Placeholder.Media index={index} ratio="16/9" />}
                  mediaRatio="16/9"
                >
                  <Stack spacing={1.5}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CohortBadge status={course.cohortStatus} size="sm" />
                      <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                        {course.duration} · {course.chapters}챕터
                      </Typography>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {course.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {course.subtitle}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      대상: {course.target}
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ alignSelf: 'flex-start', mt: 1 }}
                    >
                      {courseHighlight.ctaPrimary}
                    </Button>
                  </Stack>
                </CustomCard>
              </FadeTransition>
            </Grid>
          ))}
        </Grid>

        <FadeTransition direction="up" delay={400} isTriggerOnView>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button variant="text" href="/course">
              {courseHighlight.ctaSecondary}
            </Button>
          </Box>
        </FadeTransition>
      </PageContainer>
    </SectionContainer>
  );
}

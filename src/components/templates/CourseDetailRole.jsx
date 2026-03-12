'use client';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SectionContainer } from '../container/SectionContainer';
import { SectionDivider } from '../typography/SectionDivider';
import { SectionTitle } from '../typography/SectionTitle';
import LineGrid from '../layout/LineGrid';
import FadeTransition from '../motion/FadeTransition';
import { PAGES } from '../../data/contents';

const { role } = PAGES.courseDetail;

/**
 * CourseDetailRole 섹션 템플릿
 *
 * 스타터키트가 해결하는 현실 문제 4가지.
 * 문제 → 해결 구조의 카드 4칼럼.
 *
 * Example usage:
 * <CourseDetailRole />
 */
export function CourseDetailRole() {
  return (
    <SectionContainer>
      <FadeTransition direction="up" isTriggerOnView>
        <SectionDivider label={role.dividerLabel} sx={{ mb: 3 }} />
        <SectionTitle
          headline={role.headline}
          sx={{ mb: { xs: 6, md: 10 } }}
        />
      </FadeTransition>

      <LineGrid container gap={96} borderColor="divider">
        {role.cards.map((card, index) => (
          <Grid key={card.problem} size={{ xs: 12, md: 6 }}>
            <FadeTransition direction="up" delay={index * 100} isTriggerOnView>
              <Stack spacing={2}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 700 }}>
                    ✕
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary' }}
                  >
                    {card.problem}
                  </Typography>
                </Stack>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {card.solution}
                </Typography>
              </Stack>
            </FadeTransition>
          </Grid>
        ))}
      </LineGrid>
    </SectionContainer>
  );
}

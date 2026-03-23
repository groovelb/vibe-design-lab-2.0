'use client';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SectionContainer } from '../container/SectionContainer';
import { SectionDivider } from '../typography/SectionDivider';
import { SectionTitle } from '../typography/SectionTitle';
import FadeTransition from '../motion/FadeTransition';
import { PAGES } from '../../data/contents';

const { earlyBird } = PAGES.courseDetail;

/**
 * CourseDetailEarlyBird 섹션 템플릿
 *
 * 얼리버드 특별혜택 3칼럼 border 카드.
 *
 * Example usage:
 * <CourseDetailEarlyBird />
 */
export function CourseDetailEarlyBird() {
  return (
    <SectionContainer>
      <FadeTransition direction="up" isTriggerOnView>
        <SectionDivider label={earlyBird.dividerLabel} sx={{ mb: 3 }} />
        <SectionTitle
          headline={earlyBird.headline}
          subtitle={earlyBird.subCopy}
          sx={{ mb: { xs: 6, md: 10 } }}
        />
      </FadeTransition>

      <Grid container spacing={3}>
        {earlyBird.benefits.map((benefit, index) => (
          <Grid key={benefit.title} size={{ xs: 12, md: 4 }}>
            <FadeTransition direction="up" delay={index * 100} isTriggerOnView>
              <Box
                sx={{
                  p: 4,
                  border: 1,
                  borderColor: 'divider',
                  height: '100%',
                }}
              >
                <Stack spacing={2}>
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: 800, color: 'text.secondary' }}
                  >
                    {index + 1}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {benefit.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', lineHeight: 1.7 }}
                  >
                    {benefit.description}
                  </Typography>
                </Stack>
              </Box>
            </FadeTransition>
          </Grid>
        ))}
      </Grid>
    </SectionContainer>
  );
}

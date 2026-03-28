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

const { benefits } = PAGES.courseDetail;

/**
 * CourseDetailBenefits 섹션 템플릿
 *
 * 특별 혜택 3칼럼 border 카드.
 *
 * Example usage:
 * <CourseDetailBenefits />
 */
export function CourseDetailBenefits() {
  return (
    <SectionContainer>
      <FadeTransition direction="up" isTriggerOnView>
        <SectionDivider label={benefits.dividerLabel} sx={{ mb: 3 }} />
        <SectionTitle
          headline={benefits.headline}
          sx={{ mb: { xs: 6, md: 10 } }}
        />
      </FadeTransition>

      <Grid container spacing={3}>
        {benefits.items.map((item, index) => (
          <Grid key={item.title} size={{ xs: 12, md: 4 }}>
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
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', lineHeight: 1.7 }}
                  >
                    {item.description}
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

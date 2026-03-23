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
import { TARGET_PERSONAS } from '../../data/courseDetailMockData';

const { targetAudience } = PAGES.courseDetail;

/**
 * CourseDetailTargetAudience 섹션 템플릿
 *
 * 수강 대상 3개 직무 카드. border 컨테이너 + 이미지.
 * 이미지 → 번호 → 직무 타이틀 → 설명 구조.
 *
 * Example usage:
 * <CourseDetailTargetAudience />
 */
export function CourseDetailTargetAudience() {
  return (
    <SectionContainer>
      <FadeTransition direction="up" isTriggerOnView>
        <SectionDivider label={targetAudience.dividerLabel} sx={{ mb: 3 }} />
        <SectionTitle
          headline={targetAudience.headline}
          subtitle={targetAudience.subCopy}
          sx={{ mb: { xs: 6, md: 10 } }}
        />
      </FadeTransition>

      <Grid container spacing={3}>
        {TARGET_PERSONAS.map((persona, index) => (
          <Grid key={persona.role} size={{ xs: 12, md: 4 }}>
            <FadeTransition direction="up" delay={index * 100} isTriggerOnView>
              <Box
                sx={{
                  border: 1,
                  borderColor: 'divider',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* 이미지 */}
                <Box
                  component="img"
                  src={persona.imageSrc}
                  alt={persona.role}
                  sx={{
                    width: '100%',
                    aspectRatio: '4/3',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />

                {/* 콘텐츠 */}
                <Stack spacing={2} sx={{ p: 4 }}>
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: 800, color: 'text.secondary' }}
                  >
                    {index + 1}
                  </Typography>

                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {persona.role}
                  </Typography>

                  <Stack spacing={0.5}>
                    {persona.descriptions.map((desc, i) => (
                      <Typography
                        key={i}
                        variant="body2"
                        sx={{ color: 'text.secondary' }}
                      >
                        {desc}
                      </Typography>
                    ))}
                  </Stack>
                </Stack>
              </Box>
            </FadeTransition>
          </Grid>
        ))}
      </Grid>
    </SectionContainer>
  );
}

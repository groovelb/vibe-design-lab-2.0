'use client';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { SectionContainer } from '../container/SectionContainer';
import { SectionDivider } from '../typography/SectionDivider';
import { SectionTitle } from '../typography/SectionTitle';
import FadeTransition from '../motion/FadeTransition';
import LineGrid from '../layout/LineGrid';
import { PAGES } from '../../data/contents';

const { vision } = PAGES.courseDetail;

const VISION_VIDEOS = [
  '/assets/course/course_thumbnail_line.mp4',
  '/assets/course/coure_thumbnail_starterkit.mp4',
];

/**
 * CourseDetailVision 섹션 템플릿
 *
 * 탑티어 비전: 바이브 디자이너 vs 메이커 개발자.
 * 2칼럼 비전 카드 + 영상 구성.
 *
 * Example usage:
 * <CourseDetailVision />
 */
export function CourseDetailVision() {
  return (
    <SectionContainer>
      <FadeTransition direction="up" isTriggerOnView>
        <SectionDivider label={vision.dividerLabel} sx={{ mb: 3 }} />
        <SectionTitle
          headline={vision.headline}
          sx={{ mb: { xs: 6, md: 10 } }}
        />
      </FadeTransition>

      <LineGrid container gap={96} borderColor="divider">
        {vision.cards.map((card, index) => (
          <Grid key={card.title} size={{ xs: 12, md: 6 }}>
            <FadeTransition direction="up" delay={index * 150} isTriggerOnView>
              <Stack spacing={3}>
                {/* 번호 */}
                <Typography variant="h3" sx={{ fontWeight: 800, color: 'text.secondary' }}>
                  {index + 1}
                </Typography>
                {/* 영상 */}
                <Box
                  sx={{
                    width: '100%',
                    aspectRatio: '16/9',
                    overflow: 'hidden',
                    '@media (prefers-reduced-motion: reduce)': {
                      '& video': { display: 'none' },
                    },
                  }}
                >
                  <Box
                    component="video"
                    src={VISION_VIDEOS[index]}
                    autoPlay
                    loop
                    muted
                    playsInline
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </Box>
                <Stack spacing={1.5}>
                  <Typography variant="h4" sx={{ fontWeight: 800 }}>
                    {card.title}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 400, color: 'text.secondary' }}>
                    {card.subtitle}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: 'text.secondary', lineHeight: 1.7, wordBreak: 'keep-all' }}
                  >
                    {card.description}
                  </Typography>
                </Stack>
              </Stack>
            </FadeTransition>
          </Grid>
        ))}
      </LineGrid>
    </SectionContainer>
  );
}

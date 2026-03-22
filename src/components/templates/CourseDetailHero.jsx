'use client';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { CohortBadge } from '../../common/ui/CohortBadge';
import { SectionContainer } from '../container/SectionContainer';
import FadeTransition from '../motion/FadeTransition';
import { PAGES } from '../../data/contents';
import { COURSES } from '../../data/landingMockData';

const { hero } = PAGES.courseDetail;
const course = COURSES[0];

/**
 * CourseDetailHero 섹션 템플릿
 *
 * 코스 상세 페이지의 Hero 영역.
 * SectionContainer로 콘텐츠 폭 제한.
 * 좌: 배지 + 디스플레이 타이틀 + 부제 + 설명.
 * 우: sticky 신청 카드 (가격 + CTA).
 *
 * Example usage:
 * <CourseDetailHero />
 */
export function CourseDetailHero() {
  return (
    <SectionContainer sx={{ py: { xs: 6, md: 12 } }}>
      <Grid container spacing={{ xs: 6, md: 8 }}>
          {/* ── 좌측: 타이틀 + 설명 ── */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={{ xs: 4, md: 6 }}>
              {/* 배지 */}
              <FadeTransition direction="up" isTriggerOnView>
                <Chip
                  label={hero.badge}
                  size="small"
                  sx={{
                    bgcolor: 'error.main',
                    color: 'error.contrastText',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    alignSelf: 'flex-start',
                  }}
                />
              </FadeTransition>

              {/* 디스플레이 타이틀 */}
              <FadeTransition direction="up" delay={100} isTriggerOnView>
                <Typography
                  variant="display"
                  component="h1"
                  sx={{ textTransform: 'uppercase', wordBreak: 'keep-all' }}
                >
                  {course.title}
                </Typography>
              </FadeTransition>

              {/* 부제 + 설명 */}
              <FadeTransition direction="up" delay={200} isTriggerOnView>
                <Stack spacing={3}>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {hero.subCopy}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: 'text.secondary', whiteSpace: 'pre-line', lineHeight: 1.75 }}
                  >
                    {hero.description}
                  </Typography>
                </Stack>
              </FadeTransition>
            </Stack>
          </Grid>

          {/* ── 우측: sticky 신청 카드 ── */}
          <Grid size={{ xs: 12, md: 5 }}>
            <FadeTransition direction="up" delay={300} isTriggerOnView>
              <Box
                sx={{
                  position: { md: 'sticky' },
                  top: { md: 100 },
                  p: 4,
                  border: 1,
                  borderColor: 'divider',
                }}
              >
                <Stack spacing={3}>
                  {/* 상단 안내 */}
                  <Stack spacing={1}>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      오프라인 3기 진행중
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      온라인 얼리버드 신청
                    </Typography>
                  </Stack>

                  {/* 구분선 */}
                  <Box sx={{ borderTop: 1, borderColor: 'divider' }} />

                  {/* 가격 */}
                  <Stack spacing={1}>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      수강료
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {hero.price}
                    </Typography>
                  </Stack>

                  {/* 안내 문구 */}
                  <Box
                    sx={{
                      p: 2,
                      border: 1,
                      borderColor: 'divider',
                    }}
                  >
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {hero.priceNote}
                    </Typography>
                  </Box>

                  {/* CTA 버튼 */}
                  <Button
                    variant="contained"
                    size="large"
                    href="#enroll"
                    fullWidth
                    sx={{ py: 1.5 }}
                  >
                    {hero.ctaLabel}
                  </Button>
                </Stack>
              </Box>
            </FadeTransition>
          </Grid>
        </Grid>
    </SectionContainer>
  );
}

'use client';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { SectionContainer } from '../container/SectionContainer';
import FadeTransition from '../motion/FadeTransition';
import { PAGES } from '../../data/contents';
import { COURSES } from '../../data/landingMockData';

const courseVideo = '/assets/course/course_thumbnail_line.mp4';

const { hero, learningGoals } = PAGES.courseDetail;
const course = COURSES[0];

/** 반투명 카드 배경 */
const CARD_BG = 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)';

/**
 * CourseDetailHero 섹션 템플릿
 *
 * 코스 상세 페이지의 풀스크린 Hero 영역.
 * vibedesignlab.net 프로덕션 레이아웃 반영:
 * 배경 영상(전체 커버) + 그라데이션 오버레이 + 2-col 콘텐츠.
 * 좌 66%: 배지 + 타이틀 + 서브카피 + 설명.
 * 우 32%: 반투명 신청 카드 (자연 오프셋).
 * 하단: 3-col 학습 목표 바 (border 컨테이너 + 기술 Chip).
 *
 * Example usage:
 * <CourseDetailHero />
 */
export function CourseDetailHero() {
  return (
    <SectionContainer isFullWidth sx={{ py: 0 }}>
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          py: 14,
          mb: 16,
        }}
      >
        {/* ── 레이어 0: 배경 영상 (전체 커버) ── */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            overflow: 'hidden',
            '@media (prefers-reduced-motion: reduce)': {
              '& video': { display: 'none' },
            },
          }}
        >
          <Box
            component="video"
            src={courseVideo}
            autoPlay
            loop
            muted
            playsInline
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>

        {/* ── 레이어 1: 그라데이션 오버레이 ── */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background:
              'linear-gradient(60deg, rgba(5,5,5,0.95) 30%, rgba(5,5,5,0.65) 70%)',
          }}
        />

        {/* ── 레이어 2: 콘텐츠 ── */}
        <Container
          maxWidth="xl"
          sx={{ position: 'relative', zIndex: 2 }}
        >
          {/* 상단 2-col: 좌 타이틀 / 우 신청 카드 */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 4,
            }}
          >
            {/* ── 좌측: 배지 + 타이틀 + 설명 (66%) ── */}
            <Box sx={{ flex: '0 0 66%', maxWidth: { md: '66%' } }}>
              <Stack sx={{ height: '100%' }} spacing={0}>
                {/* 배지 */}
                <FadeTransition direction="up" isTriggerOnView>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'error.main',
                      fontWeight: 500,
                      mb: 1.5,
                    }}
                  >
                    {hero.badge}
                  </Typography>
                </FadeTransition>

                {/* 타이틀 */}
                <FadeTransition direction="up" delay={100} isTriggerOnView>
                  <Typography
                    variant="h1"
                    component="h1"
                    sx={{
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      wordBreak: 'keep-all',
                      color: 'common.white',
                    }}
                  >
                    {course.title}
                  </Typography>
                </FadeTransition>

                {/* 서브카피 + 설명 */}
                <FadeTransition direction="up" delay={200} isTriggerOnView>
                  <Box sx={{ mt: 12, maxWidth: '75%' }}>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 900, color: 'common.white' }}
                    >
                      {hero.subCopy}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        mt: 1,
                        color: 'rgba(255, 255, 255, 0.8)',
                        whiteSpace: 'pre-line',
                        lineHeight: 1.7,
                        fontSize: '1.1rem',
                      }}
                    >
                      {hero.description}
                    </Typography>
                  </Box>
                </FadeTransition>
              </Stack>
            </Box>

            {/* ── 우측: 신청 카드 (32%) ── */}
            <Box sx={{ flex: '1 1 auto', pt: { md: 10 } }}>
              <FadeTransition direction="up" delay={300} isTriggerOnView>
                <Box
                  sx={{
                    p: 4,
                    background: CARD_BG,
                    border: '1px solid',
                    borderColor: 'rgba(255,255,255,0.08)',
                  }}
                >
                  <Stack spacing={3}>
                    <Stack spacing={1}>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                        오프라인 3기 진행중
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700, color: 'common.white' }}>
                        온라인 얼리버드 신청
                      </Typography>
                    </Stack>

                    <Box sx={{ borderTop: '1px solid', borderColor: 'rgba(255,255,255,0.12)' }} />

                    <Stack spacing={1}>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                        수강료
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: 'common.white' }}>
                        {hero.price}
                      </Typography>
                    </Stack>

                    <Box
                      sx={{
                        p: 2,
                        border: '1px solid',
                        borderColor: 'rgba(255,255,255,0.12)',
                      }}
                    >
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                        {hero.priceNote}
                      </Typography>
                    </Box>

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
            </Box>
          </Box>

          {/* ── 하단 3-col 학습 목표 바 ── */}
          <FadeTransition direction="up" delay={400} isTriggerOnView>
            <Box
              sx={{
                mt: 10,
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                '@keyframes floatAntiGravity': {
                  '0%, 100%': { transform: 'translateY(0)' },
                  '50%': { transform: 'translateY(-3px)' },
                },
              }}
            >
              {learningGoals.goals.map((goal, index) => (
                <Box
                  key={goal.label}
                  sx={{
                    flex: 1,
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    border: '1px solid',
                    borderColor: 'rgba(255,255,255,0.08)',
                    background: CARD_BG,
                    ...(index > 0 && {
                      borderLeft: { md: 'none' },
                      borderTop: { xs: 'none', md: '1px solid' },
                      borderTopColor: { md: 'rgba(255,255,255,0.08)' },
                    }),
                  }}
                >
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                    {goal.label}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'common.white' }}>
                    {goal.title}
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {goal.badges.map((badge) => (
                      <Chip
                        key={badge}
                        label={badge}
                        size="small"
                        sx={{
                          bgcolor: 'rgba(255,255,255,0.08)',
                          color: 'common.white',
                          fontSize: '0.75rem',
                          borderRadius: '4px',
                          ...(badge === 'Cursor' && {
                            animation: 'floatAntiGravity 2.4s ease-in-out infinite',
                            '@media (prefers-reduced-motion: reduce)': {
                              animation: 'none',
                            },
                          }),
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              ))}
            </Box>
          </FadeTransition>
        </Container>
      </Box>
    </SectionContainer>
  );
}

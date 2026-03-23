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

/** 기술 브랜드 아이콘 (reference SVG 기반) */
const BADGE_ICONS = {
  'React.js': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348" width="14" height="14">
      <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
      <g stroke="#61dafb" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  ),
  Storybook: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#FF4785" width="14" height="14">
      <path d="M16.71.243l-.12 2.71a.18.18 0 00.29.15l1.06-.8.9.7a.18.18 0 00.28-.14l-.1-2.76 1.33-.1a1.2 1.2 0 011.279 1.2v21.596a1.2 1.2 0 01-1.26 1.2l-16.096-.72a1.2 1.2 0 01-1.15-1.16l-.75-19.797a1.2 1.2 0 011.13-1.27L16.7.222zM13.64 9.3c0 .47 3.16.24 3.59-.08 0-3.2-1.72-4.89-4.859-4.89-3.15 0-4.899 1.72-4.899 4.29 0 4.45 5.999 4.53 5.999 6.959 0 .7-.32 1.1-1.05 1.1-.96 0-1.35-.49-1.3-2.16 0-.36-3.649-.48-3.769 0-.27 4.03 2.23 5.2 5.099 5.2 2.79 0 4.969-1.49 4.969-4.18 0-4.77-6.099-4.64-6.099-6.999 0-.97.72-1.1 1.13-1.1.45 0 1.25.07 1.19 1.87z" />
    </svg>
  ),
  Antigravity: (
    <svg viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="14" height="13">
      <mask id="ag-mask" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="15">
        <path d="M14.0777 13.984C14.945 14.6345 16.2458 14.2008 15.0533 13.0084C11.476 9.53949 12.2349 0 7.79033 0C3.34579 0 4.10461 9.53949 0.527295 13.0084C-0.773543 14.3092 0.635692 14.6345 1.50293 13.984C4.86344 11.7076 4.64663 7.69664 7.79033 7.69664C10.934 7.69664 10.7172 11.7076 14.0777 13.984Z" fill="black" />
      </mask>
      <g mask="url(#ag-mask)">
        <rect width="16" height="15" fill="#FFE432" />
        <circle cx="12" cy="4" r="6" fill="#FC413D" opacity="0.8" />
        <circle cx="4" cy="6" r="6" fill="#00B95C" opacity="0.8" />
        <circle cx="10" cy="12" r="5" fill="#3186FF" opacity="0.8" />
        <circle cx="6" cy="2" r="4" fill="#FBBC04" opacity="0.7" />
      </g>
    </svg>
  ),
  Claude: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#D97757" width="14" height="14">
      <path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z" />
    </svg>
  ),
  Figma: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 57" fill="none" width="10" height="14">
      <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
      <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
      <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
      <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
      <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
    </svg>
  ),
  MUI: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#007FFF" width="14" height="14">
      <path d="M20.229 15.793a.666.666 0 0 0 .244-.243.666.666 0 0 0 .09-.333l.012-3.858a.666.666 0 0 1 .09-.333.666.666 0 0 1 .245-.243L23 9.58a.667.667 0 0 1 .333-.088.667.667 0 0 1 .333.09.667.667 0 0 1 .244.243.666.666 0 0 1 .089.333v7.014a.667.667 0 0 1-.335.578l-7.893 4.534a.666.666 0 0 1-.662 0l-6.194-3.542a.667.667 0 0 1-.246-.244.667.667 0 0 1-.09-.335v-3.537c0-.004.004-.006.008-.004s.008 0 .008-.005v-.004c0-.003.002-.005.004-.007l5.102-2.93c.004-.003.002-.01-.003-.01a.005.005 0 0 1-.004-.002.005.005 0 0 1-.001-.004l.01-3.467a.667.667 0 0 0-.333-.58.667.667 0 0 0-.667 0L8.912 9.799a.667.667 0 0 1-.665 0l-3.804-2.19a.667.667 0 0 0-.999.577v6.267a.667.667 0 0 1-.332.577.666.666 0 0 1-.332.09.667.667 0 0 1-.333-.088L.336 13.825a.667.667 0 0 1-.246-.244.667.667 0 0 1-.09-.336L.019 2.292a.667.667 0 0 1 .998-.577l7.23 4.153a.667.667 0 0 0 .665 0l7.228-4.153a.666.666 0 0 1 .333-.088.666.666 0 0 1 .333.09.667.667 0 0 1 .244.244.667.667 0 0 1 .088.333V13.25c0 .117-.03.232-.089.334a.667.667 0 0 1-.245.244l-3.785 2.18a.667.667 0 0 0-.245.245.666.666 0 0 0-.089.334.667.667 0 0 0 .09.334.666.666 0 0 0 .247.244l2.088 1.189a.67.67 0 0 0 .33.087.667.667 0 0 0 .332-.089l4.457-2.56Zm.438-9.828a.666.666 0 0 0 .09.335.666.666 0 0 0 .248.244.667.667 0 0 0 .67-.008l2.001-1.2a.666.666 0 0 0 .237-.243.667.667 0 0 0 .087-.329V2.32a.667.667 0 0 0-.091-.335.667.667 0 0 0-.584-.33.667.667 0 0 0-.334.094l-2 1.2a.666.666 0 0 0-.238.243.668.668 0 0 0-.086.329v2.445Z" />
    </svg>
  ),
};

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

          {/* 2-col: 좌 타이틀+설명 / 우 신청 카드 (상단 라인 정렬) */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'flex-start',
              gap: 4,
            }}
          >
            {/* ── 좌측: 타이틀 + 설명 (66%) ── */}
            <Box sx={{ flex: '0 0 66%', maxWidth: { md: '66%' } }}>
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
            </Box>

            {/* ── 우측: 신청 카드 (32%) ── */}
            <Box sx={{ flex: '1 1 auto' }}>
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
                    <Typography variant="h5" sx={{ fontWeight: 700, color: 'common.white' }}>
                      온라인 얼리버드 신청
                    </Typography>

                    <Box sx={{ borderTop: '1px solid', borderColor: 'rgba(255,255,255,0.12)' }} />

                    <Stack spacing={1}>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                        수강료
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="baseline">
                        <Typography variant="h5" sx={{ fontWeight: 700, color: 'common.white' }}>
                          {hero.price}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                          {hero.priceOriginal}
                        </Typography>
                      </Stack>
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
                        icon={BADGE_ICONS[badge]}
                        label={badge}
                        size="small"
                        sx={{
                          bgcolor: 'rgba(255,255,255,0.08)',
                          color: 'common.white',
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
        </Container>
      </Box>
    </SectionContainer>
  );
}

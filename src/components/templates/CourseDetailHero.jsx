'use client';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { SectionContainer } from '../container/SectionContainer';
import FadeTransition from '../motion/FadeTransition';
import { PAGES } from '../../data/contents';
import { COURSES } from '../../data/landingMockData';
import { CourseDetailHeroBackground } from './CourseDetailHeroBackground';
import { CourseDetailHeroCopy } from './CourseDetailHeroCopy';
import { CourseDetailHeroEnrollCard } from './CourseDetailHeroEnrollCard';
import { CourseDetailHeroGoalsBar } from './CourseDetailHeroGoalsBar';

const defaultHero = PAGES.courseDetail.hero;
const defaultLearningGoals = PAGES.courseDetail.learningGoals;
const defaultCourse = COURSES[0];

/**
 * CourseDetailHero 섹션 템플릿
 *
 * 코스 상세 페이지의 풀스크린 Hero 영역.
 * Background → Copy + EnrollCard → GoalsBar 순서로 조립.
 *
 * @param {object} hero - Hero 섹션 콘텐츠 데이터 [Optional, 기본값: PAGES.courseDetail.hero]
 * @param {object} learningGoals - 학습 목표 데이터 [Optional, 기본값: PAGES.courseDetail.learningGoals]
 * @param {object} course - 코스 데이터 [Optional, 기본값: COURSES[0]]
 *
 * Example usage:
 * <CourseDetailHero />
 * <CourseDetailHero hero={customHero} course={customCourse} />
 */
export function CourseDetailHero({
  hero = defaultHero,
  learningGoals = defaultLearningGoals,
  enrollUrl,
} = {}) {
  return (
    <SectionContainer isFullWidth sx={{ py: 0 }}>
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: '100vh',
          py: { xs: 8, md: 14 },
        }}
      >
        <CourseDetailHeroBackground />

        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Container maxWidth="xl">
            <FadeTransition direction="up" isTriggerOnView>
              <Typography
                variant="body1"
                sx={{ color: 'error.main', fontWeight: 500, mb: 1.5 }}
              >
                {hero.badge}
              </Typography>
            </FadeTransition>

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'flex-start',
                gap: 4,
              }}
            >
              <CourseDetailHeroCopy
                subCopy={hero.subCopy}
                description={hero.description}
              />
              <CourseDetailHeroEnrollCard
                enrollCardTitle={hero.enrollCardTitle}
                enrollFeeLabel={hero.enrollFeeLabel}
                price={hero.price}
                priceOriginal={hero.priceOriginal}
                priceDiscount={hero.priceDiscount}
                priceNote={hero.priceNote}
                ctaLabel={hero.ctaLabel}
                enrollUrl={enrollUrl}
              />
            </Box>

            <CourseDetailHeroGoalsBar goals={learningGoals.goals} />
          </Container>
        </Box>
      </Box>
    </SectionContainer>
  );
}

'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { SectionContainer } from '../container/SectionContainer';
import { PageContainer } from '../layout/PageContainer';
import LineGrid from '../layout/LineGrid';
import { TestimonialCard } from '../card/TestimonialCard';
import FadeTransition from '../motion/FadeTransition';
import { PAGES } from '../../data/contents';
import { MOCK_TESTIMONIALS } from '../../data/landingMockData';

const { courseReview } = PAGES.landing;

/**
 * LandingCourseReview 섹션 템플릿
 *
 * "멤버가 말하는 경험" — 수강생 증언을 표시하는 섹션.
 * split 헤더: 좌측 overline + 대형 헤드라인.
 * 페르소나별(디자이너, PM, 개발자) 1명씩 3개의 TestimonialCard를 배치한다.
 *
 * Example usage:
 * <LandingCourseReview />
 */
export function LandingCourseReview() {
  return (
    <SectionContainer sx={{ py: { xs: 8, md: 12 } }}>
      <PageContainer>
        {/* 섹션 헤드 — overline + 대형 헤드라인 */}
        <FadeTransition direction="up" isTriggerOnView>
          <Box sx={{ mb: { xs: 6, md: 10 } }}>
            <Typography
              variant="overline"
              sx={{ color: 'text.disabled', mb: 1.5, display: 'block' }}
            >
              Review
            </Typography>
            <Typography
              variant="h1"
              component="h2"
              sx={{ fontWeight: 800 }}
            >
              {courseReview.headline}
            </Typography>
          </Box>
        </FadeTransition>

        {/* 후기 카드 3열 */}
        <LineGrid container gap={24} borderColor="divider">
          {MOCK_TESTIMONIALS.map((testimonial, index) => (
            <Grid key={testimonial.id} size={{ xs: 12, md: 4 }}>
              <FadeTransition direction="up" delay={index * 150} isTriggerOnView>
                <TestimonialCard
                  quote={testimonial.quote}
                  quoteShort={testimonial.quoteShort}
                  memberName={testimonial.memberName}
                  memberRole={testimonial.memberRole}
                  variant="compact"
                  cardVariant="editorial"
                  sx={{ height: '100%' }}
                />
              </FadeTransition>
            </Grid>
          ))}
        </LineGrid>
      </PageContainer>
    </SectionContainer>
  );
}

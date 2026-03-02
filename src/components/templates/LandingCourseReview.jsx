'use client';
import Grid from '@mui/material/Grid';
import { SectionContainer } from '../container/SectionContainer';
import { PageContainer } from '../layout/PageContainer';
import { Title } from '../typography/Title';
import { TestimonialCard } from '../card/TestimonialCard';
import FadeTransition from '../motion/FadeTransition';
import { PAGES } from '../../data/contents';
import { MOCK_TESTIMONIALS } from '../../data/landingMockData';

const { courseReview } = PAGES.landing;

/**
 * LandingCourseReview 섹션 템플릿
 *
 * "멤버가 말하는 경험" — 수강생 증언을 표시하는 섹션.
 * 페르소나별(디자이너, PM, 개발자) 1명씩 3개의 TestimonialCard를 배치한다.
 *
 * Example usage:
 * <LandingCourseReview />
 */
export function LandingCourseReview() {
  return (
    <SectionContainer>
      <PageContainer>
        <FadeTransition direction="up" isTriggerOnView>
          <Title title={courseReview.headline} level="h2" sx={{ mb: 6 }} />
        </FadeTransition>

        <Grid container spacing={3}>
          {MOCK_TESTIMONIALS.map((testimonial, index) => (
            <Grid key={testimonial.id} size={{ xs: 12, md: 4 }}>
              <FadeTransition direction="up" delay={index * 150} isTriggerOnView>
                <TestimonialCard
                  quote={testimonial.quote}
                  quoteShort={testimonial.quoteShort}
                  memberName={testimonial.memberName}
                  memberRole={testimonial.memberRole}
                  variant="compact"
                  sx={{ height: '100%' }}
                />
              </FadeTransition>
            </Grid>
          ))}
        </Grid>
      </PageContainer>
    </SectionContainer>
  );
}

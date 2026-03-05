'use client';
import Grid from '@mui/material/Grid';
import { SectionContainer } from '../container/SectionContainer';
import LineGrid from '../layout/LineGrid';
import { TestimonialCard } from '../card/TestimonialCard';
import FadeTransition from '../motion/FadeTransition';
import { SectionDivider } from '../typography/SectionDivider';
import { SectionTitle } from '../typography/SectionTitle';
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
    <SectionContainer>
        <FadeTransition direction="up" isTriggerOnView>
          <SectionDivider label="Review" sx={{ mb: 3 }} />
          <SectionTitle
            headline={courseReview.headline}
            sx={{ mb: { xs: 6, md: 10 } }}
          />
        </FadeTransition>

        {/* 후기 카드 3열 */}
        <LineGrid container gap={96} borderColor="divider">
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
    </SectionContainer>
  );
}

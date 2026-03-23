'use client';
import Grid from '@mui/material/Grid';
import { SectionContainer } from '../container/SectionContainer';
import { SectionDivider } from '../typography/SectionDivider';
import { SectionTitle } from '../typography/SectionTitle';
import { CardTextStack } from '../typography/CardTextStack';
import LineGrid from '../layout/LineGrid';
import FadeTransition from '../motion/FadeTransition';
import { COL_STAGGER } from '../motion/constants';
import { PAGES } from '../../data/contents';

const { earlyBird } = PAGES.courseDetail;

/**
 * CourseDetailEarlyBird 섹션 템플릿
 *
 * 얼리버드 혜택 3칼럼 카드.
 *
 * Example usage:
 * <CourseDetailEarlyBird />
 */
export function CourseDetailEarlyBird() {
  return (
    <SectionContainer>
      <FadeTransition direction="up" isTriggerOnView>
        <SectionDivider label={earlyBird.dividerLabel} sx={{ mb: 3 }} />
        <SectionTitle
          headline={earlyBird.headline}
          subtitle={earlyBird.subCopy}
          sx={{ mb: { xs: 6, md: 10 } }}
        />
      </FadeTransition>

      <LineGrid container gap={96} borderColor="divider">
        {earlyBird.benefits.map((benefit, index) => (
          <Grid key={benefit.title} size={{ xs: 12, md: 4 }}>
            <FadeTransition direction="up" delay={(index % 3) * COL_STAGGER} isTriggerOnView threshold={0.5}>
              <CardTextStack
                title={benefit.title}
                description={benefit.description}
              />
            </FadeTransition>
          </Grid>
        ))}
      </LineGrid>
    </SectionContainer>
  );
}

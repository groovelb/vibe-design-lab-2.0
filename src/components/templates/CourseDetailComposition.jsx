'use client';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { SectionContainer } from '../container/SectionContainer';
import { SectionDivider } from '../typography/SectionDivider';
import { SectionTitle } from '../typography/SectionTitle';
import { CardTextStack } from '../typography/CardTextStack';
import LineGrid from '../layout/LineGrid';
import FadeTransition from '../motion/FadeTransition';
import { PAGES } from '../../data/contents';

const { composition } = PAGES.courseDetail;

/**
 * CourseDetailComposition 섹션 템플릿
 *
 * 스타터 키트 구성요소 3칼럼 + 기술 배지.
 *
 * Example usage:
 * <CourseDetailComposition />
 */
export function CourseDetailComposition() {
  return (
    <SectionContainer>
      <FadeTransition direction="up" isTriggerOnView>
        <SectionDivider label={composition.dividerLabel} sx={{ mb: 3 }} />
        <SectionTitle
          headline={composition.headline}
          sx={{ mb: { xs: 6, md: 10 } }}
        />
      </FadeTransition>

      <LineGrid container gap={96} borderColor="divider">
        {composition.items.map((item, index) => (
          <Grid key={item.title} size={{ xs: 12, md: 4 }}>
            <FadeTransition direction="up" delay={index * 100} isTriggerOnView>
              <CardTextStack
                title={item.title}
                description={item.description}
              />
            </FadeTransition>
          </Grid>
        ))}
      </LineGrid>

      {/* 기술 배지 */}
      {composition.techBadges && (
        <FadeTransition direction="up" delay={300} isTriggerOnView>
          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            sx={{ mt: { xs: 4, md: 6 } }}
          >
            {composition.techBadges.map((badge) => (
              <Chip
                key={badge}
                label={badge}
                size="small"
                sx={{
                  bgcolor: 'action.hover',
                  color: 'text.secondary',
                  fontSize: '0.75rem',
                }}
              />
            ))}
          </Stack>
        </FadeTransition>
      )}
    </SectionContainer>
  );
}

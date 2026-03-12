'use client';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SectionContainer } from '../container/SectionContainer';
import { SectionDivider } from '../typography/SectionDivider';
import { SectionTitle } from '../typography/SectionTitle';
import LineGrid from '../layout/LineGrid';
import FadeTransition from '../motion/FadeTransition';
import { PAGES } from '../../data/contents';
import { TARGET_PERSONAS } from '../../data/courseDetailMockData';

const { targetAudience } = PAGES.courseDetail;

/**
 * CourseDetailTargetAudience 섹션 템플릿
 *
 * 수강 대상 3개 직무 카드를 번호 매긴 3칼럼 그리드로 표시.
 *
 * Example usage:
 * <CourseDetailTargetAudience />
 */
export function CourseDetailTargetAudience() {
  return (
    <SectionContainer>
      <FadeTransition direction="up" isTriggerOnView>
        <SectionDivider label={targetAudience.dividerLabel} sx={{ mb: 3 }} />
        <SectionTitle
          headline={targetAudience.headline}
          subtitle={targetAudience.subCopy}
          sx={{ mb: { xs: 6, md: 10 } }}
        />
      </FadeTransition>

      <LineGrid container gap={96} borderColor="divider">
        {TARGET_PERSONAS.map((persona, index) => (
          <Grid key={persona.role} size={{ xs: 12, md: 4 }}>
            <FadeTransition direction="up" delay={index * 100} isTriggerOnView>
              <Stack spacing={3}>
                {/* 번호 */}
                <Typography variant="h3" sx={{ fontWeight: 800, color: 'text.secondary' }}>
                  {index + 1}
                </Typography>

                {/* 직무 타이틀 */}
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {persona.role}
                </Typography>

                {/* 설명 */}
                <Stack spacing={0.5}>
                  {persona.descriptions.map((desc, i) => (
                    <Typography
                      key={i}
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {desc}
                    </Typography>
                  ))}
                </Stack>
              </Stack>
            </FadeTransition>
          </Grid>
        ))}
      </LineGrid>
    </SectionContainer>
  );
}

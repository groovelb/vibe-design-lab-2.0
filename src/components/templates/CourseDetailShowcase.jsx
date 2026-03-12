'use client';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Check } from 'lucide-react';
import { SectionContainer } from '../container/SectionContainer';
import { SectionDivider } from '../typography/SectionDivider';
import { SectionTitle } from '../typography/SectionTitle';
import LineGrid from '../layout/LineGrid';
import FadeTransition from '../motion/FadeTransition';
import { PAGES } from '../../data/contents';
import { SHOWCASE_PORTFOLIO } from '../../data/courseDetailMockData';

const { showcase } = PAGES.courseDetail;

/**
 * CourseDetailShowcase 섹션 템플릿
 *
 * 스타터키트 중요성 사례.
 * 대표 사례 설명 + 3칼럼 프로젝트 카드(스크린샷 + 체크리스트).
 *
 * Example usage:
 * <CourseDetailShowcase />
 */
export function CourseDetailShowcase() {
  return (
    <SectionContainer>
      <FadeTransition direction="up" isTriggerOnView>
        <SectionDivider label={showcase.dividerLabel} sx={{ mb: 3 }} />
        <SectionTitle
          headline={showcase.headline}
          sx={{ mb: { xs: 4, md: 6 } }}
        />
      </FadeTransition>

      {/* 대표 사례 설명 */}
      <FadeTransition direction="up" delay={100} isTriggerOnView>
        <Stack spacing={1} sx={{ mb: { xs: 6, md: 10 } }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {showcase.subCopy}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'text.secondary', whiteSpace: 'pre-line', lineHeight: 1.7 }}
          >
            {showcase.description}
          </Typography>
        </Stack>
      </FadeTransition>

      {/* 프로젝트 카드 3칼럼 */}
      <LineGrid container gap={96} borderColor="divider">
        {SHOWCASE_PORTFOLIO.map((item, index) => (
          <Grid key={item.id} size={{ xs: 12, md: 4 }}>
            <FadeTransition direction="up" delay={index * 100} isTriggerOnView>
              <Stack spacing={3}>
                {/* 스크린샷 placeholder */}
                <Box
                  sx={{
                    width: '100%',
                    aspectRatio: '4/3',
                    border: '1px dashed',
                    borderColor: 'divider',
                  }}
                />
                {/* 타이틀 */}
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {item.title}
                </Typography>
                {/* 체크리스트 */}
                <Stack spacing={1}>
                  {item.tags.map((tag) => (
                    <Stack key={tag} direction="row" spacing={1} alignItems="center">
                      <Check size={16} />
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {tag}
                      </Typography>
                    </Stack>
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

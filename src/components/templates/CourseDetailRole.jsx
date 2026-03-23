'use client';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { SectionContainer } from '../container/SectionContainer';
import { SectionDivider } from '../typography/SectionDivider';
import { SectionTitle } from '../typography/SectionTitle';
import FadeTransition from '../motion/FadeTransition';
import { GeometricX } from '../motion/GeometricX';
import { PAGES } from '../../data/contents';

const { role } = PAGES.courseDetail;

/**
 * CourseDetailRole 섹션 템플릿
 *
 * 스타터키트가 해결하는 현실 문제 4가지.
 * GeometricX stroke-draw 애니메이션 + 문제 → 해결 구조.
 * 큰 카드 레이아웃 (2×2 그리드, 충분한 패딩).
 *
 * Example usage:
 * <CourseDetailRole />
 */
export function CourseDetailRole() {
  return (
    <SectionContainer>
      <FadeTransition direction="up" isTriggerOnView>
        <SectionDivider label={role.dividerLabel} sx={{ mb: 3 }} />
        <SectionTitle
          headline={role.headline}
          sx={{ mb: { xs: 6, md: 10 } }}
        />
      </FadeTransition>

      <Grid container spacing={3}>
        {role.cards.map((card, index) => (
          <Grid key={card.problem} size={{ xs: 12, md: 6 }}>
            <FadeTransition direction="up" delay={index * 120} isTriggerOnView>
              <Box
                sx={{
                  p: { xs: 4, md: 5 },
                  border: 1,
                  borderColor: 'divider',
                  height: '100%',
                }}
              >
                <Stack spacing={3}>
                  {/* 문제: GeometricX + 텍스트 */}
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <GeometricX
                      size={28}
                      strokeWidth={2}
                      color="var(--vdl-500)"
                      delay={index * 120 + 300}
                    />
                    <Typography
                      variant="body1"
                      sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                    >
                      {card.problem}
                    </Typography>
                  </Stack>
                  {/* 해결 */}
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {card.solution}
                  </Typography>
                </Stack>
              </Box>
            </FadeTransition>
          </Grid>
        ))}
      </Grid>
    </SectionContainer>
  );
}

'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SectionContainer } from '../container/SectionContainer';
import { PageContainer } from '../layout/PageContainer';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import LineGrid from '../layout/LineGrid';
import FadeTransition from '../motion/FadeTransition';
import { PAGES, VALUE_PROPOSITIONS } from '../../data/contents';

const { howDifferent } = PAGES.landing;

/**
 * LandingDifference 섹션 템플릿
 *
 * "VOD가 아니다" — VDL이 기존 VOD 학습과 어떻게 다른지 비교하는 섹션.
 * split 레이아웃 헤더: 좌측 대형 헤드라인 + 우측 서브카피.
 * ComparisonBlock으로 좌(VOD, 부정적 톤) / 우(VDL, 긍정적 톤) 대비를 표현한다.
 *
 * Example usage:
 * <LandingDifference />
 */
export function LandingDifference() {
  return (
    <SectionContainer sx={{ py: { xs: 8, md: 12 } }}>
      <PageContainer>
        {/* 헤드라인 — split: 좌 대형 + 우 서브카피 */}
        <FadeTransition direction="up" isTriggerOnView>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', md: 'flex-end' },
              gap: { xs: 2, md: 4 },
              mb: { xs: 6, md: 10 },
            }}
          >
            <Box>
              <Typography
                variant="overline"
                sx={{ color: 'text.disabled', mb: 1.5, display: 'block' }}
              >
                Difference
              </Typography>
              <Typography
                variant="h1"
                component="h2"
                sx={{ fontWeight: 800, fontSize: { xs: '2rem', md: '3rem' } }}
              >
                {howDifferent.headline}
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                maxWidth: '32ch',
                textAlign: { xs: 'left', md: 'right' },
                flexShrink: 0,
              }}
            >
              {howDifferent.subCopy}
            </Typography>
          </Box>
        </FadeTransition>

        {/* 가치 제안 — 3컬럼 */}
        <LineGrid container gap={24} borderColor="divider">
          {VALUE_PROPOSITIONS.map((vp, index) => (
            <Grid key={vp.name} size={{ xs: 12, md: 4 }}>
              <FadeTransition direction="up" delay={index * 100} isTriggerOnView>
                <Stack spacing={2} sx={{ py: { xs: 3, md: 4 } }}>
                  <Box
                    sx={{
                      width: '100%',
                      height: 120,
                      border: '1px dashed',
                      borderColor: 'divider',
                    }}
                  />
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {vp.name}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    {vp.description}
                  </Typography>
                </Stack>
              </FadeTransition>
            </Grid>
          ))}
        </LineGrid>
      </PageContainer>
    </SectionContainer>
  );
}

'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { GridBackground } from '../dynamic-color/GridBackground';
import { PageContainer } from '../layout/PageContainer';
import { FitText } from '../typography/FitText';
import FadeTransition from '../motion/FadeTransition';
import { BuiltForPurposeIllustration } from '../../stories/overview/ux/referenceIllustrations';
import { PAGES } from '../../data/contents';

const { hero } = PAGES.landing;

/**
 * LandingHero 섹션 템플릿
 *
 * Landing 페이지의 첫 번째 섹션. 전체 화면 히어로 영역.
 * GridBackground 위에 키비쥬얼, 메인 헤드라인, 서브카피를 배치한다.
 * 콘텐츠를 하단 정렬하여 스크롤 유도 동선을 만든다.
 *
 * Example usage:
 * <LandingHero />
 */
export function LandingHero() {
  return (
    <GridBackground
      variant="dot"
      opacity={0.06}
      sx={{ minHeight: '100svh' }}
    >
      <PageContainer
        sx={{
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          pb: { xs: 8, md: 12 },
          pt: { xs: 16, md: 20 },
        }}
      >
        {/* 키비쥬얼 — 좌측 정렬, 억제된 존재감 */}
        <FadeTransition direction="up" isTriggerOnView>
          <Box
            sx={{
              maxWidth: 240,
              mb: { xs: 6, md: 10 },
              opacity: 0.7,
            }}
          >
            <BuiltForPurposeIllustration width="100%" height="auto" />
          </Box>
        </FadeTransition>

        {/* 메인 헤드라인 — FitText로 전체 폭 점유 */}
        <FadeTransition direction="up" delay={200} isTriggerOnView>
          <FitText text={hero.headline} variant="headline" />
        </FadeTransition>

        {/* 서브카피 — 좌측 정렬, 제한 폭, 충분한 상단 간격 */}
        <FadeTransition direction="up" delay={400} isTriggerOnView>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: '48ch',
              mt: { xs: 3, md: 4 },
              lineHeight: 1.7,
            }}
          >
            {hero.subCopy}
          </Typography>
        </FadeTransition>
      </PageContainer>
    </GridBackground>
  );
}

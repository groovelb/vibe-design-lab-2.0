'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { GridBackground } from '../dynamic-color/GridBackground';
import { PageContainer } from '../layout/PageContainer';
import { FitText } from '../typography/FitText';
import FadeTransition from '../motion/FadeTransition';
import { PAGES } from '../../data/contents';

const { hero, footerCta } = PAGES.landing;

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
          justifyContent: 'center',
          alignItems: 'center',
          pb: { xs: 8, md: 12 },
          pt: { xs: 16, md: 20 },
        }}
      >
        {/* 키비쥬얼 placeholder */}
        <FadeTransition direction="up" isTriggerOnView>
          <Box
            sx={{
              width: 240,
              height: 160,
              mb: { xs: 6, md: 10 },
              border: '1px dashed',
              borderColor: 'divider',
            }}
          />
        </FadeTransition>

        {/* 메인 헤드라인 — FitText로 전체 폭 점유 */}
        <FadeTransition direction="up" delay={200} isTriggerOnView>
          <FitText text={hero.headline} variant="headline" />
        </FadeTransition>

        {/* 서브카피 — 중앙 정렬 */}
        <FadeTransition direction="up" delay={400} isTriggerOnView>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: '48ch',
              mt: { xs: 3, md: 4 },
              lineHeight: 1.7,
              textAlign: 'center',
            }}
          >
            {hero.subCopy}
          </Typography>
        </FadeTransition>

        {/* CTA */}
        <FadeTransition direction="up" delay={600} isTriggerOnView>
          <Button
            variant="contained"
            size="large"
            href="/course"
            sx={{ mt: { xs: 4, md: 5 }, px: 5, py: 1.5 }}
          >
            {footerCta.cta}
          </Button>
        </FadeTransition>
      </PageContainer>
    </GridBackground>
  );
}

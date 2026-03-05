'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { GridBackground } from '../dynamic-color/GridBackground';
import { PageContainer } from '../layout/PageContainer';
import FadeTransition from '../motion/FadeTransition';
import { PAGES } from '../../data/contents';

const { hero, footerCta } = PAGES.landing;

/**
 * LandingHero 섹션 템플릿
 *
 * Landing 페이지의 첫 번째 섹션. 전체 화면 히어로 영역.
 * GridBackground 위에 브랜드 서체 헤드라인, 태그라인, CTA를 좌측 정렬 배치한다.
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
          pt: '30vh',
        }}
      >
        {/* 메인 헤드라인 — 브랜드 서체 (IBM Plex Sans) */}
        <FadeTransition direction="up" isTriggerOnView>
          <Typography
            variant="display"
          >
            {hero.headline}
          </Typography>
        </FadeTransition>

        {/* 태그라인 */}
        <FadeTransition direction="up" delay={200} isTriggerOnView>
          <Typography
            variant="h3"
            sx={{
              color: 'text.secondary',
              fontWeight: 400,
              mt: { xs: 2, md: 3 },
            }}
          >
            {hero.subCopy}
          </Typography>
        </FadeTransition>

        {/* CTA */}
        <FadeTransition direction="up" delay={400} isTriggerOnView>
          <Box sx={{ display: 'flex', mt: { xs: 4, md: 5 } }}>
            <Button
              variant="contained"
              size="large"
              href="/course"
            >
              {footerCta.cta}
            </Button>
          </Box>
        </FadeTransition>
      </PageContainer>
    </GridBackground>
  );
}

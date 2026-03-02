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
          alignItems: 'center',
          justifyContent: 'center',
          py: 8,
        }}
      >
        <FadeTransition direction="up" isTriggerOnView>
          <Box sx={{ maxWidth: 300, mx: 'auto', mb: 4 }}>
            <BuiltForPurposeIllustration width="100%" height="auto" />
          </Box>
        </FadeTransition>

        <FadeTransition direction="up" delay={200} isTriggerOnView>
          <FitText text={hero.headline} variant="headline" />
        </FadeTransition>

        <FadeTransition direction="up" delay={400} isTriggerOnView>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              textAlign: 'center',
              maxWidth: '50ch',
              mx: 'auto',
              mt: 3,
            }}
          >
            {hero.subCopy}
          </Typography>
        </FadeTransition>
      </PageContainer>
    </GridBackground>
  );
}

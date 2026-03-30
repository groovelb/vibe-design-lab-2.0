'use client';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { GridBackground } from '../dynamic-color/GridBackground';
import { ContextEngineV2 } from '../motion/ContextEngineV2';
import Container from '@mui/material/Container';
import { SectionContainer } from '../container/SectionContainer';
import { PhiSplit } from '../layout/PhiSplit';
import { LandingHeroMessage } from './LandingHeroMessage';
import { LandingHeroPainPoints } from './LandingHeroPainPoints';
import { ParallaxLayer } from '../scroll/ParallaxLayer';
import { BG_PARALLAX_SPEED } from '../motion/constants';

/**
 * LandingHero 섹션 템플릿
 *
 * Landing 페이지의 첫 번째 섹션. 전체 화면 히어로 영역.
 * 프랙탈 황금비율 레이아웃:
 *   L1: 뷰포트 = ContextEngine(38.2%) + 콘텐츠(61.8%)
 *   L2: 콘텐츠 = 메인메시지(61.8%) + 페인포인트(38.2%)
 * 인터랙티브 배경은 50% 높이로 콘텐츠 영역과 적당히 오버랩.
 *
 * Example usage:
 * <LandingHero />
 */
export function LandingHero() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <SectionContainer isFullWidth sx={{ py: 0 }}>
    <GridBackground
      variant="dot"
      opacity={0.06}
      sx={{ height: '100svh', position: 'relative', overflowX: 'hidden' }}
    >
      {/* ContextEngine — absolute 배경 레이어, 느린 패럴럭스 */}
      <ParallaxLayer speed={BG_PARALLAX_SPEED} sx={{
        position: 'absolute',
        top: 0,
        left: { xs: '16px', md: 'max(24px, calc(50vw - 696px))' },
        right: { xs: '-100vw', md: 0 },
        height: { xs: '86%', md: '60%' },
        pointerEvents: 'none',
        willChange: 'transform',
        maskImage: 'linear-gradient(to bottom, black 55%, rgba(0,0,0,0.4)), linear-gradient(to right, black 92%, transparent)',
        maskComposite: 'intersect',
        WebkitMaskImage: 'linear-gradient(to bottom, black 55%, rgba(0,0,0,0.4)), linear-gradient(to right, black 92%, transparent)',
        WebkitMaskComposite: 'source-in',
      }}>
        <ContextEngineV2 isEager isInstant={isMobile} />
      </ParallaxLayer>

      <ParallaxLayer speed={1.08} sx={{ height: '100svh', position: 'relative' }}>
        <Container maxWidth="xl" sx={{ height: '100svh' }}>
          {/* L1: 뷰포트 분할 — 상단 여백(38.2%) / 콘텐츠(61.8%) */}
          <PhiSplit
            direction="column"
            isReversed
            stackAt="none"
            sx={{ height: '100%' }}
            secondary={<Box />}
            primary={
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: { xs: 'flex-end', md: 'center' }, height: '100%', pb: { xs: 6, md: 0 } }}>
                <LandingHeroMessage />
                {/* 3pp — PC에서만 100svh 안에 표시 */}
                <Box sx={{ mt: 10, display: { xs: 'none', md: 'block' } }}>
                  <LandingHeroPainPoints />
                </Box>
              </Box>
            }
          />
        </Container>
      </ParallaxLayer>
    </GridBackground>

    {/* 3pp — 모바일에서 100svh 아래에 표시 (뷰포트 트리거) */}
    <Box sx={{ display: { xs: 'block', md: 'none' }, py: 6 }}>
      <Container maxWidth="xl">
        <LandingHeroPainPoints isDelayed={false} />
      </Container>
    </Box>
    </SectionContainer>
  );
}

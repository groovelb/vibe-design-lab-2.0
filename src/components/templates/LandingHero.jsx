'use client';
import Box from '@mui/material/Box';
import { GridBackground } from '../dynamic-color/GridBackground';
import { ContextEngineV2 } from '../motion/ContextEngineV2';
import { PageContainer } from '../layout/PageContainer';
import { PhiSplit } from '../layout/PhiSplit';
import { LandingHeroMessage } from './LandingHeroMessage';
import { LandingHeroPainPoints } from './LandingHeroPainPoints';

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
  return (
    <GridBackground
      variant="dot"
      opacity={0.06}
      sx={{ height: '100svh', position: 'relative', overflowX: 'hidden' }}
    >
      {/* ContextEngine — absolute 배경 레이어, 좌측은 콘텐츠 정렬 / 우측은 뷰포트 끝 */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: { xs: '16px', md: 'max(24px, calc(50vw - 696px))' },
        right: 0,
        height: '60%',
        pointerEvents: 'none',
        maskImage: 'linear-gradient(to bottom, black 55%, rgba(0,0,0,0.4)), linear-gradient(to right, black 92%, transparent)',
        maskComposite: 'intersect',
        WebkitMaskImage: 'linear-gradient(to bottom, black 55%, rgba(0,0,0,0.4)), linear-gradient(to right, black 92%, transparent)',
        WebkitMaskComposite: 'source-in',
      }}>
        <ContextEngineV2 />
      </Box>

      <PageContainer sx={{ height: '100svh', position: 'relative' }}>
        {/* L1: 뷰포트 분할 — 상단 여백(38.2%) / 콘텐츠(61.8%) */}
        <PhiSplit
          direction="column"
          isReversed
          stackAt="none"
          sx={{ height: '100%' }}
          secondary={<Box />}
          primary={
            /* L2: 콘텐츠 분할 — 메인메시지(61.8%) / 페인포인트(38.2%) */
            <PhiSplit
              direction="column"
              isReversed
              stackAt="none"
              sx={{ height: '100%' }}
              primary={<LandingHeroPainPoints />}
              secondary={<LandingHeroMessage />}
            />
          }
        />
      </PageContainer>
    </GridBackground>
  );
}

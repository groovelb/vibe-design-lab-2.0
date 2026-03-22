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
 *   L3: 내부 간격 피보나치 캐스케이드 3→5
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
      {/* ContextEngine — absolute 배경 레이어, 레이아웃에 영향 없음 */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '38.2%',
        pointerEvents: 'none',
        maskImage: [
          'linear-gradient(to right, transparent 2%, black 8%, black 98%, transparent)',
          'linear-gradient(to bottom, black, black 70%, transparent)',
        ].join(', '),
        WebkitMaskImage: [
          'linear-gradient(to right, transparent 2%, black 8%, black 98%, transparent)',
          'linear-gradient(to bottom, black, black 70%, transparent)',
        ].join(', '),
        maskComposite: 'intersect',
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

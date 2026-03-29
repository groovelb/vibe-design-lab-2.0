'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SectionContainer } from '../container/SectionContainer';
import { VdlLogo } from '../typography/VdlLogo';
import FadeTransition from '../motion/FadeTransition';

/**
 * LandingFooterCTA 섹션 템플릿
 *
 * Landing 페이지의 최종 CTA 섹션.
 * FooterShifting 레이아웃과 함께 사용된다.
 * 전환 퍼널의 마지막 단계. 공식 오픈 날짜 안내 메시지.
 *
 * Example usage:
 * <LandingFooterCTA />
 */
export function LandingFooterCTA() {
  return (
    <SectionContainer>
      <FadeTransition direction="up" isTriggerOnView threshold={0.3}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            py: { xs: 8, md: 16 },
          }}
        >
          <VdlLogo size={96} />
          <Typography
            variant="h1"
            component="p"
            sx={{ fontWeight: 700, mt: { xs: 4, md: 5 } }}
          >
            4월 7일 공식 오픈
          </Typography>
        </Box>
      </FadeTransition>
    </SectionContainer>
  );
}

'use client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { SectionContainer } from '../container/SectionContainer';
import { PageContainer } from '../layout/PageContainer';
import { FitText } from '../typography/FitText';
import FadeTransition from '../motion/FadeTransition';
import { PAGES } from '../../data/contents';

const { footerCta } = PAGES.landing;

/**
 * LandingFooterCTA 섹션 템플릿
 *
 * Landing 페이지의 최종 CTA 섹션.
 * 전환 퍼널의 마지막 단계. 극적인 대형 디스플레이 헤드라인 + CTA 버튼.
 * 충분한 수직 여백으로 섹션의 무게감을 부여한다.
 *
 * Example usage:
 * <LandingFooterCTA />
 */
export function LandingFooterCTA() {
  return (
    <SectionContainer sx={{ py: { xs: 12, md: 20 } }}>
      <PageContainer>
        <FadeTransition direction="up" isTriggerOnView>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              py: { xs: 4, md: 8 },
            }}
          >
            <Box sx={{ width: '100%', mb: { xs: 4, md: 5 } }}>
              <FitText text={footerCta.headline} variant="headline" />
            </Box>
            <Button
              variant="contained"
              size="large"
              href="/course"
              sx={{ px: 5, py: 1.5 }}
            >
              {footerCta.cta}
            </Button>
          </Box>
        </FadeTransition>
      </PageContainer>
    </SectionContainer>
  );
}

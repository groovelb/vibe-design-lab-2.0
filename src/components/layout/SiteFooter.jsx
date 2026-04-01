'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SectionContainer } from '../container/SectionContainer';
import { VdlLogo } from '../typography/VdlLogo';
import FadeTransition from '../motion/FadeTransition';
import { GLASS_SX } from '../../common/ui/glassSx';
import { gradientLoopKf } from '../kinetic-typography/GradientText';

const DiscordIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="#5865F2" style={{ flexShrink: 0 }}>
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.001.022.01.04.027.057a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

/**
 * SiteFooter 컴포넌트
 *
 * 전역 푸터. 모든 페이지 하단에 표시된다.
 * VDL 로고 + CTA + Discord 배너 + 사업자 정보.
 *
 * Example usage:
 * <SiteFooter />
 */
export function SiteFooter() {
  return (
    <SectionContainer>
      <Box
        component="footer"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          py: { xs: 4, md: 16 },
        }}
      >
        <FadeTransition direction="up" isTriggerOnView threshold={0.3}>
          <VdlLogo
            size={96}
            sx={{
              fontSize: { xs: 32, md: 64 },
              background: 'linear-gradient(135deg, var(--vdl-50), var(--vdl-100), var(--vdl-50))',
              backgroundSize: '200% auto',
              backgroundRepeat: 'repeat-x',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
              animation: `${gradientLoopKf} 6s linear infinite`,
            }}
          />
          <Typography
            variant="h1"
            component="p"
            sx={{ fontWeight: 700, mt: { xs: 3, md: 5 } }}
          >
            4월 7일 공식 오픈
          </Typography>
        </FadeTransition>

        {/* Discord 커뮤니티 배너 */}
        <FadeTransition direction="up" isTriggerOnView threshold={0.3} delay={200}>
          <Box
            component="a"
            href="https://discord.gg/FNA4ZcFMsu"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              ...GLASS_SX,
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              justifyContent: { xs: 'center', sm: 'space-between' },
              gap: { xs: 2, md: 6 },
              px: { xs: 3, md: 6 },
              py: { xs: 3, md: 5 },
              mt: { xs: 4, md: 8 },
              width: '100%',
              maxWidth: 720,
              textDecoration: 'none',
              transition: 'border-color 0.2s',
              '&:hover': { borderColor: 'rgba(255,255,255,0.2)' },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, md: 3 }, textAlign: 'left' }}>
              <DiscordIcon size={24} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                Discord 커뮤니티
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', whiteSpace: 'nowrap', flexShrink: 0, fontWeight: 500, display: { xs: 'none', sm: 'block' } }}
            >
              입장하기 →
            </Typography>
          </Box>
        </FadeTransition>

        {/* 사업자 정보 */}
        <Box
          sx={{
            mt: { xs: 6, md: 10 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            데이터 드리븐 디자인
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            서울특별시 관악구 행운1나길 8-15, 1동 2층 202호
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            010-7610-0640
          </Typography>
        </Box>
      </Box>
    </SectionContainer>
  );
}

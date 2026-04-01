import Link from 'next/link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export const metadata = {
  title: 'Experiment',
  description:
    'Vibe Dictionary의 어휘 체계로 설계하고 바이브 코딩으로 구현한 가상 브랜드·서비스 웹사이트 실험 프로젝트.',
};

export default function ExperimentPage() {
  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        minHeight: '100vh',
        py: { xs: 12, md: 16 },
      }}
    >
      <Container maxWidth="xl">
        <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block', mb: 4 }}>
          Experiment
        </Typography>

        <Typography variant="h2" sx={{ color: 'text.primary', mb: { xs: 6, md: 8 } }}>
          Experiment
        </Typography>

        {/* 3col Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: { xs: 2, md: 3 },
          }}
        >
          {/* Claude Code */}
          <Link href="/experiment/claude-code" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <Box
              sx={{
                bgcolor: 'grey.900',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                transition: 'background-color 0.2s',
                '&:hover': { bgcolor: 'grey.800' },
                '&:hover .experiment-card-arrow': { transform: 'translateX(4px)' },
              }}
            >
              {/* OG 썸네일 */}
              <Box
                component="img"
                src="/og-claude-code-v1.webp"
                alt="Claude Code 512K 유출 분석"
                sx={{
                  width: '100%',
                  aspectRatio: '16 / 9',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              <Box sx={{ p: { xs: 3, md: 4 }, display: 'flex', flexDirection: 'column', flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                  <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                    2026. 3. 31.
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary', bgcolor: 'action.hover', px: 1.5, py: 0.5 }}
                  >
                    Report
                  </Typography>
                </Box>

                <Typography variant="h5" sx={{ color: 'text.primary', fontWeight: 700, mb: 2 }}>
                  Claude Code는 코딩 도구가 아니다
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', mb: 4, flex: 1 }}
                >
                  512,000줄의 소스코드 유출. 협상 프로토콜의 인터랙티브 해부 보고서.
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography
                    variant="caption"
                    sx={{
                      fontFamily: 'var(--font-mono, "IBM Plex Mono"), monospace',
                      color: 'text.secondary',
                    }}
                  >
                    512K LOC · 6 Acts
                  </Typography>
                  <Typography
                    className="experiment-card-arrow"
                    variant="body1"
                    sx={{ color: 'text.primary', transition: 'transform 0.2s' }}
                  >
                    →
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

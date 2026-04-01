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
        bgcolor: 'background.default',
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
                p: { xs: 3, md: 4 },
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'background-color 0.2s',
                '&:hover': { bgcolor: 'grey.800' },
                '&:hover .experiment-card-arrow': { transform: 'translateX(4px)' },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                <Typography variant="overline" sx={{ color: '#FF6B2C' }}>
                  2026. 3. 31.
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: '#FF6B2C', bgcolor: 'rgba(255,107,44,0.10)', px: 1.5, py: 0.5 }}
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
                512,000줄의 TypeScript 소스코드 유출. 4계층 빙산 구조 속 9개의 키워드.
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
                  sx={{ color: '#FF6B2C', transition: 'transform 0.2s' }}
                >
                  →
                </Typography>
              </Box>
            </Box>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

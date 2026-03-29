import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { SectionContainer } from '@/components/container/SectionContainer';

export const metadata = {
  title: 'Experiment | Vibe Design Labs',
  description: '가상 브랜드·서비스 웹사이트 실험 프로젝트',
};

export default function ExperimentPage() {
  return (
    <SectionContainer sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: 960 }}>
        {/* Header line */}
        <Divider sx={{ borderColor: 'divider', mb: 3 }} />

        {/* Top row: label + status */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            mb: 6,
          }}
        >
          <Typography variant="overline" sx={{ color: 'text.secondary' }}>
            Experiment
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Coming Soon
          </Typography>
        </Box>

        {/* Title */}
        <Typography
          variant="h2"
          sx={{ color: 'text.primary', mb: 6, maxWidth: 640 }}
        >
          Experiment
        </Typography>

        <Divider sx={{ borderColor: 'divider', mb: 4 }} />

        {/* Description grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '200px 1fr' },
            gap: { xs: 1, sm: 4 },
            mb: 3,
          }}
        >
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            정의
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Vibe Dictionary의 어휘 체계로 설계하고 바이브 코딩으로 구현한
            가상의 브랜드·서비스 웹사이트.
          </Typography>
        </Box>

        <Divider sx={{ borderColor: 'divider', mb: 4 }} />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '200px 1fr' },
            gap: { xs: 1, sm: 4 },
            mb: 3,
          }}
        >
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            목적
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            표준 어휘로 설계했을 때 결과물이 어떻게 달라지는지 확인하는 실험 프로젝트.
            Before/After 비교를 통해 디자인 언어의 정밀도 차이를 기록한다.
          </Typography>
        </Box>

        <Divider sx={{ borderColor: 'divider', mb: 4 }} />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '200px 1fr' },
            gap: { xs: 1, sm: 4 },
            mb: 3,
          }}
        >
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            공개 범위
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            멤버십 회원에게 전체 소스 코드 공개.
          </Typography>
        </Box>

        <Divider sx={{ borderColor: 'divider' }} />
      </Box>
    </SectionContainer>
  );
}

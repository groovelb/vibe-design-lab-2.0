import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { SectionContainer } from '@/components/container/SectionContainer';

export const metadata = {
  title: 'Dictionary | Vibe Design Labs',
  description: '디자인 택소노미 기반 표준 어휘 체계',
};

export default function DictionaryPage() {
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
            Dictionary
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
          Vibe Dictionary
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
            디자인 패턴, 레이아웃, 인터랙션을 분류·명명한 표준 어휘 체계.
            AI 프롬프트에 사용할 수 있는 200개 이상의 디자인 키워드를 제공한다.
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
            디자인 의도를 정밀하게 전달하기 위한 공통 언어.
            도구가 바뀌어도 유효한 분류 기준을 제공한다.
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
            구성
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            카테고리 15개, 키워드 200+, 각 항목에 정의·용례·프롬프트 예시 포함.
          </Typography>
        </Box>

        <Divider sx={{ borderColor: 'divider' }} />
      </Box>
    </SectionContainer>
  );
}

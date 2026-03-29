'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FadeTransition from '../motion/FadeTransition';

/**
 * CourseDetailHeroCopy 컴포넌트
 *
 * Hero 좌측 카피 영역: 코스 타이틀 + 서브카피 + 설명.
 *
 * @param {string} subCopy - 서브카피 텍스트 [Required]
 * @param {string} description - 설명 텍스트 [Required]
 *
 * Example usage:
 * <CourseDetailHeroCopy subCopy="..." description="..." />
 */
export function CourseDetailHeroCopy({ subCopy, description }) {
  return (
    <Box sx={{ flex: { xs: '0 0 auto', md: '0 0 66%' }, maxWidth: { md: '66%' } }}>
      <FadeTransition direction="up" delay={100} isTriggerOnView>
        <Typography
          variant="display"
          component="h1"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '5.5rem' },
            textTransform: 'uppercase',
            wordBreak: 'keep-all',
            color: 'text.primary',
            whiteSpace: 'pre-line',
            textShadow: '0 0 24px hsl(260, 12%, 96%, 0.4)',
          }}
        >
          {'VIBE DESIGN\nSTARTER KIT'}
        </Typography>
      </FadeTransition>

      <FadeTransition direction="up" delay={200} isTriggerOnView>
        <Box sx={{ mt: { xs: 6, md: 12 }, maxWidth: { xs: '100%', md: '75%' } }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: 900, color: 'text.primary' }}
          >
            {subCopy}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mt: 1,
              color: 'text.secondary',
              whiteSpace: 'pre-line',
              lineHeight: 1.7,
            }}
          >
            {description}
          </Typography>
        </Box>
      </FadeTransition>
    </Box>
  );
}

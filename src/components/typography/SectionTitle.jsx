'use client';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * SectionTitle 컴포넌트
 *
 * 섹션 헤드라인 + 선택적 서브타이틀 조합.
 * headline은 h1 스타일, subtitle은 h2 스타일로 렌더링한다.
 *
 * @param {string} headline - 섹션 헤드라인 [Required]
 * @param {string} subtitle - 서브타이틀 [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <SectionTitle headline="도구 이전에, 언어 체계." subtitle="도구는 바뀌어도 설계의 기준은 남습니다" />
 */
const SectionTitle = forwardRef(function SectionTitle({
  headline,
  subtitle,
  sx,
  ...props
}, ref) {
  return (
    <Box ref={ref} sx={sx} {...props}>
      <Typography
        variant="h2"
        component="h2"
        sx={{ fontWeight: 700 }}
      >
        {headline}
      </Typography>
      {subtitle && (
        <Typography
          variant="h3"
          component="p"
          sx={{ color: 'text.secondary', mt: 1, fontWeight: 400 }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
});

export { SectionTitle };

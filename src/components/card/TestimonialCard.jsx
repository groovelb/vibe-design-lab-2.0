'use client';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { QuotedContainer } from '../typography/QuotedContainer';
import AspectMedia from '../media/AspectMedia';

/**
 * TestimonialCard 컴포넌트
 *
 * 수강생 증언을 인용 스타일로 표시하는 카드.
 * QuotedContainer를 활용하여 인용문 스타일링, AspectMedia로 결과물 미리보기를 제공한다.
 *
 * Props:
 * @param {string} quote - 증언 전문 [Required]
 * @param {string} quoteShort - Landing용 짧은 증언 [Optional]
 * @param {string} memberName - 멤버 이름 [Required]
 * @param {string} memberRole - 역할 (예: "UX 디자이너, 3년차") [Optional]
 * @param {string} memberPersona - 페르소나 [Optional]
 * @param {string} resultUrl - 결과물 URL [Optional]
 * @param {string} resultImage - 결과물 이미지 [Optional]
 * @param {string} variant - 표시 모드 ('compact' | 'full') [Optional, 기본값: 'compact']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <TestimonialCard
 *   quote="코호트 덕분에 포트폴리오가 완성되었습니다."
 *   memberName="김설계"
 *   memberRole="UX 디자이너, 3년차"
 * />
 */
const TestimonialCard = forwardRef(function TestimonialCard({
  quote,
  quoteShort,
  memberName,
  memberRole,
  memberPersona,
  resultUrl,
  resultImage,
  variant = 'compact',
  sx,
  ...props
}, ref) {
  const isCompact = variant === 'compact';
  const displayQuote = isCompact && quoteShort ? quoteShort : quote;

  return (
    <Box
      ref={ref}
      sx={{
        p: { xs: 3, md: 4 },
        backgroundColor: 'background.paper',
        border: 1,
        borderColor: 'divider',
        ...sx,
      }}
      {...props}
    >
      <Stack spacing={2}>
        {/* 인용문 */}
        <QuotedContainer
          variant="body1"
          quoteSize="sm"
          position="inside"
        >
          {displayQuote}
        </QuotedContainer>

        {/* 멤버 정보 */}
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          divider={
            <Typography
              component="span"
              sx={{ color: 'text.disabled', fontSize: '0.75rem' }}
            >
              ·
            </Typography>
          }
        >
          <Typography variant="subtitle2">{memberName}</Typography>
          {memberRole && (
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {memberRole}
            </Typography>
          )}
          {memberPersona && (
            <Typography variant="caption" sx={{ color: 'text.disabled' }}>
              {memberPersona}
            </Typography>
          )}
        </Stack>

        {/* 결과물 미리보기 (full variant에서만) */}
        {!isCompact && resultImage && (
          <Box
            component={resultUrl ? 'a' : 'div'}
            href={resultUrl || undefined}
            target={resultUrl ? '_blank' : undefined}
            rel={resultUrl ? 'noopener noreferrer' : undefined}
            sx={{
              display: 'block',
              textDecoration: 'none',
              mt: 1,
            }}
          >
            <AspectMedia
              src={resultImage}
              alt={`${memberName}의 결과물`}
              aspectRatio="16/9"
              sx={{
                border: 1,
                borderColor: 'divider',
              }}
            />
          </Box>
        )}
      </Stack>
    </Box>
  );
});

export { TestimonialCard };

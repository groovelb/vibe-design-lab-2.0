'use client';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
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
 * @param {string|object} thumbnailSrc - 포트폴리오 썸네일 이미지 (URL 또는 Next.js static import) [Optional]
 * @param {string} thumbnailAlt - 썸네일 대체 텍스트 [Optional]
 * @param {string} resultUrl - 결과물 URL [Optional]
 * @param {string} resultImage - 결과물 이미지 [Optional]
 * @param {string} variant - 표시 모드 ('compact' | 'full') [Optional, 기본값: 'compact']
 * @param {string} cardVariant - 카드 컨테이너 스타일 ('outlined' | 'editorial') [Optional, 기본값: 'outlined']
 * @param {string} mediaRatio - 썸네일 비율 ('1/1' | '4/3' | '16/9' | 'auto') [Optional, 기본값: '1/1']
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
  thumbnailSrc,
  thumbnailAlt,
  resultUrl,
  resultImage,
  variant = 'compact',
  cardVariant = 'outlined',
  mediaRatio = '1/1',
  sx,
  ...props
}, ref) {
  const isCompact = variant === 'compact';
  const displayQuote = isCompact && quoteShort ? quoteShort : quote;
  const imgSrc = typeof thumbnailSrc === 'string' ? thumbnailSrc : thumbnailSrc?.src;

  return (
    <Box
      ref={ref}
      sx={{
        ...(cardVariant === 'editorial'
          ? { backgroundColor: 'transparent', border: 'none' }
          : { backgroundColor: 'background.paper', border: 1, borderColor: 'divider' }),
        ...sx,
      }}
      {...props}
    >
      {/* 썸네일 */}
      {imgSrc ? (
        <Box
          component="img"
          src={imgSrc}
          alt={thumbnailAlt || `${memberName}의 결과물`}
          sx={mediaRatio === 'auto'
            ? { display: 'block', width: '100%', height: 'auto', objectFit: 'contain', aspectRatio: 'auto' }
            : { width: '100%', aspectRatio: mediaRatio, objectFit: 'cover', display: 'block' }
          }
        />
      ) : (
        <Box
          sx={{
            width: '100%',
            ...(mediaRatio !== 'auto' && { aspectRatio: mediaRatio }),
            border: '1px dashed',
            borderColor: 'divider',
          }}
        />
      )}

      <Stack spacing={1.5} sx={{ pt: 2 }}>
        {/* 멤버 정보 — 이름 + 역할 수직 배치 */}
        <Stack spacing={0.25}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            {memberName}
          </Typography>
          {(memberRole || memberPersona) && (
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {[memberRole, memberPersona].filter(Boolean).join(' · ')}
            </Typography>
          )}
        </Stack>

        {/* 인용문 */}
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', lineHeight: 1.7, wordBreak: 'keep-all' }}
        >
          {displayQuote}
        </Typography>

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

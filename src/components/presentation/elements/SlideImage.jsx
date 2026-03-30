'use client';
import Box from '@mui/material/Box';
import { presentationTokens as t } from '../../../styles/themes/presentation';

/**
 * SlideImage 컴포넌트
 *
 * 비율 지정 또는 원본 비율 이미지. 캡션 선택.
 *
 * @param {string} src - 이미지 경로 [Required]
 * @param {string} alt - 대체 텍스트 [Required]
 * @param {string} ratio - 비율 ('16/9', '4/3', '1/1', 'original') [Optional, 기본값: 'original']
 * @param {string} caption - 이미지 캡션 [Optional]
 * @param {string} objectFit - 이미지 피팅 ('cover' | 'contain') [Optional, 기본값: 'contain']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <SlideImage src="/img/example.png" alt="예제" ratio="16/9" caption="그림 1" />
 */
function SlideImage({ src, alt, ratio = 'original', caption, objectFit = 'contain', sx }) {
  const isOriginal = ratio === 'original';

  return (
    <Box
      component="figure"
      sx={{
        m: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: `${t.spacing.tight}px`,
        ...sx,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          ...(isOriginal ? {} : { aspectRatio: ratio }),
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={src}
          alt={alt}
          sx={{
            display: 'block',
            width: '100%',
            ...(isOriginal
              ? { height: 'auto' }
              : {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit,
              }),
          }}
        />
      </Box>
      {caption && (
        <Box
          component="figcaption"
          sx={{
            fontFamily: t.fontFamily.body,
            fontSize: t.typo.caption.fontSize,
            fontWeight: t.typo.caption.fontWeight,
            lineHeight: t.typo.caption.lineHeight,
            color: t.color.textSecondary,
          }}
        >
          {caption}
        </Box>
      )}
    </Box>
  );
}

export { SlideImage };

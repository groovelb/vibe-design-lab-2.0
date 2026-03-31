'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { presentationTokens as t } from '../../styles/themes/presentation';

/**
 * 덱 데이터를 플랫 슬라이드 배열로 변환
 * @param {object} deck - { id, chapters: [{ id, title, parts: [{ slides }] }] }
 * @returns {object[]} breadcrumb이 포함된 슬라이드 배열
 */
export function flattenSlides(deck) {
  const slides = [];
  deck.chapters.forEach((chapter) => {
    chapter.parts.forEach((part) => {
      part.slides.forEach((slide) => {
        slides.push({
          ...slide,
          breadcrumb: {
            section: deck.id,
            chapter: `${chapter.id}. ${chapter.title}`,
            part: part.title,
          },
        });
      });
    });
  });
  return slides;
}

/**
 * Drawer 목차 컴포넌트
 * @param {object[]} slides - flattenSlides 결과
 * @param {number} currentIdx - 현재 슬라이드 인덱스
 * @param {function} onSelect - 슬라이드 선택 콜백
 */
export function DrawerToC({ slides, currentIdx, onSelect }) {
  let lastPart = '';
  let num = 0;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      {slides.map((slide, i) => {
        if (!slide.title) return null;
        num += 1;
        const showPartHeader = slide.breadcrumb.part !== lastPart;
        lastPart = slide.breadcrumb.part;

        return (
          <Box key={slide.id}>
            {showPartHeader && (
              <Typography
                sx={{
                  fontFamily: t.fontFamily.body,
                  fontSize: t.typo.label.fontSize,
                  fontWeight: 600,
                  color: t.color.textSecondary,
                  mt: i > 0 ? '12px' : 0,
                  mb: '4px',
                }}
              >
                {slide.breadcrumb.part}
              </Typography>
            )}
            <Box
              onClick={() => onSelect(i)}
              sx={{
                py: '3px',
                px: '6px',
                cursor: 'pointer',
                borderRadius: '4px',
                bgcolor: i === currentIdx ? 'rgba(255,255,255,0.08)' : 'transparent',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
              }}
            >
              <Typography
                sx={{
                  fontFamily: t.fontFamily.body,
                  fontSize: t.typo.caption.fontSize,
                  lineHeight: 1.5,
                  color: i === currentIdx ? t.color.accent : t.color.textTertiary,
                }}
              >
                {num}. {slide.title}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

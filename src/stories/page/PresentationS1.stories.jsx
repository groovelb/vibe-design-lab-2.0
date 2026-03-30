'use client';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SlideMaster } from '../../components/presentation';
import { presentationTokens as t } from '../../styles/themes/presentation';
import { S1 } from '../../data/presentations';

export default {
  title: 'Page/Presentation/S1',
  parameters: { layout: 'fullscreen' },
};

// ─── Flatten ───

function flattenSlides(section) {
  const slides = [];
  section.chapters.forEach((chapter) => {
    chapter.parts.forEach((part) => {
      part.slides.forEach((slide) => {
        slides.push({
          ...slide,
          breadcrumb: {
            section: section.id,
            chapter: `${chapter.id}. ${chapter.title}`,
            part: part.title,
          },
        });
      });
    });
  });
  return slides;
}

const allSlides = flattenSlides(S1);

// ─── Drawer ToC ───

function DrawerToC({ slides, currentIdx, onSelect }) {
  let lastPart = '';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      {slides.map((slide, i) => {
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
                {i + 1}. {slide.title}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

// ─── Story ───

export const Docs = {
  render: () => {
    const [idx, setIdx] = useState(0);
    const slide = allSlides[idx];

    return (
      <SlideMaster
        breadcrumb={slide.breadcrumb}
        slideIndex={idx + 1}
        totalSlides={allSlides.length}
        onPrev={() => setIdx((p) => Math.max(0, p - 1))}
        onNext={() => setIdx((p) => Math.min(allSlides.length - 1, p + 1))}
        drawerContent={<DrawerToC slides={allSlides} currentIdx={idx} onSelect={setIdx} />}
      >
        {slide.render()}
      </SlideMaster>
    );
  },
};

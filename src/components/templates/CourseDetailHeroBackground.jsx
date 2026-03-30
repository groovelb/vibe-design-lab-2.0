'use client';
import Box from '@mui/material/Box';
import { ParallaxLayer } from '../scroll/ParallaxLayer';

const courseVideo = '/assets/course/course_thumbnail_line.mp4';

/**
 * CourseDetailHeroBackground 컴포넌트
 *
 * Hero 배경 레이어: 패럴랙스 영상(screen blend) + 그라데이션 오버레이.
 *
 * Example usage:
 * <CourseDetailHeroBackground />
 */
export function CourseDetailHeroBackground() {
  return (
    <>
      <ParallaxLayer
        speed={0.85}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          overflow: 'hidden',
          mixBlendMode: 'screen',
          WebkitMaskImage: {
            xs: 'linear-gradient(to bottom, transparent 0%, black 12%, black 55%, transparent 100%)',
            md: 'linear-gradient(to bottom, black 60%, transparent 100%)',
          },
          maskImage: {
            xs: 'linear-gradient(to bottom, transparent 0%, black 12%, black 55%, transparent 100%)',
            md: 'linear-gradient(to bottom, black 60%, transparent 100%)',
          },
          '@media (prefers-reduced-motion: reduce)': {
            '& video': { display: 'none' },
          },
        }}
      >
        <Box
          component="video"
          src={courseVideo}
          autoPlay
          loop
          muted
          playsInline
          sx={{
            position: 'absolute',
            right: 0,
            top: { xs: 140, md: 0 },
            height: { xs: 'auto', md: '100%' },
            width: { xs: '100%', md: 'auto' },
            maxWidth: 'none',
            WebkitMaskImage: { xs: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)', md: 'none' },
            maskImage: { xs: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)', md: 'none' },
          }}
        />
      </ParallaxLayer>

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: (theme) => {
            const bg = theme.vdl.primitives[950];
            return `linear-gradient(60deg, color-mix(in srgb, ${bg} 95%, transparent) 30%, color-mix(in srgb, ${bg} 65%, transparent) 70%)`;
          },
          WebkitMaskImage: {
            xs: 'linear-gradient(to bottom, transparent 0%, black 12%, black 55%, transparent 100%)',
            md: 'linear-gradient(to bottom, black 60%, transparent 100%)',
          },
          maskImage: {
            xs: 'linear-gradient(to bottom, transparent 0%, black 12%, black 55%, transparent 100%)',
            md: 'linear-gradient(to bottom, black 60%, transparent 100%)',
          },
        }}
      />
    </>
  );
}

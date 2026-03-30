'use client';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FadeTransition from '../motion/FadeTransition';

/**
 * CourseDetailHeroCopy 컴포넌트
 *
 * Hero 좌측 카피 영역: 코스 타이틀 + 서브카피 + 설명.
 * 모바일: subCopy \n 개행 적용, description 첫 단락만 노출 + 펼쳐보기 토글.
 *
 * @param {string} subCopy - 서브카피 텍스트 [Required]
 * @param {string} description - 설명 텍스트 [Required]
 *
 * Example usage:
 * <CourseDetailHeroCopy subCopy="..." description="..." />
 */
export function CourseDetailHeroCopy({ subCopy, description }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const paragraphs = description ? description.split('\n\n') : [];
  const hasMore = paragraphs.length > 1;

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
        <Box sx={{ mt: { xs: 20, md: 12 }, maxWidth: { xs: '100%', md: '75%' } }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              color: 'text.primary',
              whiteSpace: { xs: 'pre-line', md: 'normal' },
            }}
          >
            {subCopy}
          </Typography>

          {paragraphs.length > 0 && (
            <Typography
              variant="body1"
              sx={{
                mt: 1,
                color: 'text.secondary',
                whiteSpace: 'pre-line',
                lineHeight: 1.7,
              }}
            >
              {paragraphs[0]}
            </Typography>
          )}

          {/* 나머지 단락 — 모바일: 펼쳐보기 토글, 데스크톱: 항상 노출 */}
          {hasMore && (
            <>
              <Typography
                variant="body1"
                sx={{
                  mt: 2,
                  color: 'text.secondary',
                  whiteSpace: 'pre-line',
                  lineHeight: 1.7,
                  display: { xs: isExpanded ? 'block' : 'none', md: 'block' },
                }}
              >
                {paragraphs.slice(1).join('\n\n')}
              </Typography>
              <Button
                variant="text"
                size="small"
                onClick={() => setIsExpanded((prev) => !prev)}
                sx={{
                  display: { xs: 'inline-flex', md: 'none' },
                  mt: 1,
                  p: 0,
                  minWidth: 0,
                  color: 'text.secondary',
                }}
              >
                {isExpanded ? '접기' : '펼쳐보기'}
              </Button>
            </>
          )}
        </Box>
      </FadeTransition>
    </Box>
  );
}

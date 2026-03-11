'use client';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SectionContainer } from '../container/SectionContainer';
import { SectionDivider } from '../typography/SectionDivider';
import { SectionTitle } from '../typography/SectionTitle';
import FadeTransition from '../motion/FadeTransition';
import MarqueeContainer from '../motion/MarqueeContainer';
import { PAGES } from '../../data/contents';
import { TARGET_PERSONAS } from '../../data/courseDetailMockData';

const { targetAudience } = PAGES.courseDetail;

/**
 * CourseDetailTargetAudience 섹션 템플릿
 *
 * 수강 대상 3개 직무 카드를 무한 캐러셀로 표시.
 * MarqueeContainer로 자동 스크롤.
 *
 * Example usage:
 * <CourseDetailTargetAudience />
 */
export function CourseDetailTargetAudience() {
  const personas = [...TARGET_PERSONAS, ...TARGET_PERSONAS];

  return (
    <SectionContainer>
      <FadeTransition direction="up" isTriggerOnView>
        <SectionDivider label={targetAudience.dividerLabel} sx={{ mb: 3 }} />
        <SectionTitle
          headline={targetAudience.headline}
          subtitle={targetAudience.subCopy}
          sx={{ mb: { xs: 6, md: 10 } }}
        />
      </FadeTransition>

      <FadeTransition direction="up" delay={200} isTriggerOnView>
        <MarqueeContainer speed={40} gap={24} isPauseOnHover>
          {personas.map((persona, index) => (
            <Box
              key={`${persona.role}-${index}`}
              sx={{
                flexShrink: 0,
                width: { xs: 280, md: 360 },
                border: 1,
                borderColor: 'divider',
                p: 4,
              }}
            >
              <Stack spacing={3}>
                {/* 비디오 placeholder */}
                <Box
                  sx={{
                    width: '100%',
                    aspectRatio: '16/9',
                    border: '1px dashed',
                    borderColor: 'divider',
                  }}
                />
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {persona.role}
                </Typography>
                <Stack spacing={0.5}>
                  {persona.descriptions.map((desc, i) => (
                    <Typography
                      key={i}
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {desc}
                    </Typography>
                  ))}
                </Stack>
              </Stack>
            </Box>
          ))}
        </MarqueeContainer>
      </FadeTransition>
    </SectionContainer>
  );
}

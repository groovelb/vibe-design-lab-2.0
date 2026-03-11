'use client';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { SectionContainer } from '../container/SectionContainer';
import { SectionDivider } from '../typography/SectionDivider';
import { SectionTitle } from '../typography/SectionTitle';
import { BentoGrid, BentoItem } from '../layout/BentoGrid';
import FadeTransition from '../motion/FadeTransition';
import { PAGES } from '../../data/contents';
import { SHOWCASE_PORTFOLIO } from '../../data/courseDetailMockData';

const { showcase } = PAGES.courseDetail;

/**
 * CourseDetailShowcase 섹션 템플릿
 *
 * 스타터키트 중요성 사례 + 포트폴리오 비디오 그리드.
 * 대표 사례(featured) + BentoGrid 포트폴리오.
 *
 * Example usage:
 * <CourseDetailShowcase />
 */
export function CourseDetailShowcase() {
  return (
    <SectionContainer>
      <FadeTransition direction="up" isTriggerOnView>
        <SectionDivider label={showcase.dividerLabel} sx={{ mb: 3 }} />
        <SectionTitle
          headline={showcase.headline}
          sx={{ mb: { xs: 6, md: 10 } }}
        />
      </FadeTransition>

      {/* 대표 사례 */}
      <FadeTransition direction="up" delay={100} isTriggerOnView>
        <Stack spacing={3} sx={{ mb: { xs: 6, md: 10 } }}>
          <Box
            sx={{
              width: '100%',
              aspectRatio: '16/9',
              border: '1px dashed',
              borderColor: 'divider',
            }}
          />
          <Stack spacing={1}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {showcase.subCopy}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: 'text.secondary', whiteSpace: 'pre-line', lineHeight: 1.7 }}
            >
              {showcase.description}
            </Typography>
          </Stack>
        </Stack>
      </FadeTransition>

      {/* 포트폴리오 그리드 */}
      <FadeTransition direction="up" delay={200} isTriggerOnView>
        <BentoGrid columns={3} gap={2} rowHeight="240px" isAutoRows>
          {SHOWCASE_PORTFOLIO.map((item) => (
            <BentoItem key={item.id} sx={{ borderRadius: 0 }}>
              <Stack
                spacing={2}
                sx={{
                  height: '100%',
                  p: 3,
                  border: 1,
                  borderColor: 'divider',
                }}
              >
                {/* 비디오 placeholder */}
                <Box
                  sx={{
                    width: '100%',
                    aspectRatio: '16/9',
                    border: '1px dashed',
                    borderColor: 'divider',
                    flexShrink: 0,
                  }}
                />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  {item.title}
                </Typography>
                <Stack direction="row" spacing={0.5} flexWrap="wrap">
                  {item.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{
                        bgcolor: 'action.hover',
                        color: 'text.secondary',
                        fontSize: '0.7rem',
                      }}
                    />
                  ))}
                </Stack>
              </Stack>
            </BentoItem>
          ))}
        </BentoGrid>
      </FadeTransition>
    </SectionContainer>
  );
}

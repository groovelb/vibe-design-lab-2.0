'use client';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import { SectionContainer } from '../container/SectionContainer';
import { SectionDivider } from '../typography/SectionDivider';
import { SectionTitle } from '../typography/SectionTitle';
import { AccordionSection } from '../data-display/AccordionSection';
import FadeTransition from '../motion/FadeTransition';
import { TECH_BADGE_ICONS } from '../../common/ui/TechBadgeIcons';
import { PAGES } from '../../data/contents';
import curriculumJson from '../../data/program/vdsk_online_curriculum.json';

const { curriculum } = PAGES.courseDetail;

/** 섹션별 오픈 날짜 (S1: 4/7, 이후 매주 월요일) */
const SECTION_OPEN_DATES = ['4/7 오픈', '4/14 오픈', '4/21 오픈', '4/28 오픈', '5/5 오픈', '5/12 오픈'];

/** JSON sections → AccordionSection items 변환 */
const CURRICULUM_ITEMS = curriculumJson.sections.map((section, index) => ({
  id: section.id,
  title: section.title,
  description: section.context?.description || null,
  goal: section.context?.goal || null,
  openDate: SECTION_OPEN_DATES[index] || null,
  chapters: section.chapters.map((ch, chIndex) => ({
    label: `Ch${chIndex + 1}`,
    title: ch.title,
    parts: ch.parts.map((part) => ({
      title: part.title,
      items: part.items.map((item) => item.title),
    })),
  })),
}));

/** 전체 챕터 수 */
const TOTAL_CHAPTERS = CURRICULUM_ITEMS.reduce((sum, s) => sum + s.chapters.length, 0);

/**
 * CourseDetailCurriculum 섹션 템플릿
 *
 * 코스 커리큘럼 아코디언(6섹션).
 * AccordionSection(curriculum variant)을 사용한다.
 * 모바일에서는 요약/목표를 생략하고 "커리큘럼 전체보기" 모달을 제공한다.
 *
 * Example usage:
 * <CourseDetailCurriculum />
 */
export function CourseDetailCurriculum() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <SectionContainer>
      <FadeTransition direction="up" isTriggerOnView>
        <SectionDivider label={curriculum.dividerLabel} sx={{ mb: 3 }} />
        <SectionTitle
          headline={curriculum.headline}
          subtitle={curriculum.subtitle}
          sx={{ mb: 2 }}
        />
        {curriculum.note && (
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary', mb: 3, display: 'block', whiteSpace: 'pre-line' }}
          >
            {curriculum.note}
          </Typography>
        )}

        {/* 모바일 전체보기 버튼 */}
        <Button
          variant="outlined"
          size="small"
          onClick={() => setIsModalOpen(true)}
          sx={{
            display: { xs: 'inline-flex', md: 'none' },
            mb: 4,
            borderColor: 'divider',
            color: 'text.secondary',
            '&:hover': { borderColor: 'text.primary', color: 'text.primary' },
          }}
        >
          커리큘럼 전체보기 · {curriculumJson.sections.length}섹션 {TOTAL_CHAPTERS}챕터
        </Button>

        {curriculum.tools && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 3,
              mb: { xs: 6, md: 10 },
            }}
          >
            {curriculum.tools.map((tool) => (
              <Box
                key={tool.label}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  p: 2.5,
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                  flex: 1,
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                  {tool.label}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: 13 }}>
                  {tool.description}
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 0.5 }}>
                  {tool.badges.map((badge) => (
                    <Chip
                      key={badge}
                      icon={TECH_BADGE_ICONS[badge]}
                      label={badge}
                      size="small"
                      sx={{
                        bgcolor: 'action.hover',
                        color: 'text.primary',
                        fontSize: '0.75rem',
                        borderRadius: '4px',
                        '& .MuiChip-icon': { ml: 0.5 },
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            ))}
          </Box>
        )}
      </FadeTransition>

      <FadeTransition direction="up" delay={200} isTriggerOnView>
        <AccordionSection
          variant="curriculum"
          labelPrefix="Section"
          items={CURRICULUM_ITEMS}
          defaultExpandedId="S1"
        />
      </FadeTransition>

      {/* 모바일 커리큘럼 전체보기 모달 */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fullScreen
        PaperProps={{
          sx: {
            bgcolor: 'background.default',
            backgroundImage: 'none',
          },
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          {/* 헤더 */}
          <Box
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 1,
              bgcolor: 'background.default',
              borderBottom: 1,
              borderColor: 'divider',
              px: 3,
              py: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              커리큘럼
            </Typography>
            <IconButton
              onClick={() => setIsModalOpen(false)}
              size="small"
              aria-label="닫기"
              sx={{ color: 'text.secondary' }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* 본문 — 섹션 > 챕터 > 파트 불릿 */}
          <Box sx={{ px: 3, py: 3 }}>
            <Stack spacing={0}>
              {CURRICULUM_ITEMS.map((section, sIndex) => (
                <Box key={section.id}>
                  {sIndex > 0 && <Divider sx={{ my: 3 }} />}

                  {/* 섹션 헤더 */}
                  <Stack spacing={0.5} sx={{ mb: 2.5 }}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Typography
                        variant="caption"
                        sx={{ color: 'error.main', fontWeight: 600 }}
                      >
                        Section {sIndex + 1}
                      </Typography>
                      {section.openDate && (
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {section.openDate}
                        </Typography>
                      )}
                    </Stack>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      {section.title}
                    </Typography>
                  </Stack>

                  {/* 챕터 목록 */}
                  <Stack spacing={2.5}>
                    {section.chapters.map((chapter) => (
                      <Stack key={chapter.label} spacing={1}>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                          {chapter.label} — {chapter.title}
                        </Typography>
                        <Stack spacing={0.5} sx={{ pl: 1.5 }}>
                          {chapter.parts.map((part, pIndex) => (
                            <Typography
                              key={pIndex}
                              variant="body2"
                              sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                            >
                              · {part.title}
                            </Typography>
                          ))}
                        </Stack>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Box>
        </DialogContent>
      </Dialog>
    </SectionContainer>
  );
}

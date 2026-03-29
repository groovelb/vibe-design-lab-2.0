'use client';
import { forwardRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import MuiAccordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { ChevronDown } from 'lucide-react';

/**
 * AccordionSection 컴포넌트
 *
 * MUI Accordion을 VDL 토큰으로 래핑한 아코디언 섹션.
 * curriculum과 faq 두 가지 variant를 지원한다.
 *
 * curriculum variant는 두 가지 데이터 형식을 지원:
 * - flat: { id, title, items: string[] }
 * - nested: { id, title, parts: [{ title, items: string[] }] }
 *   nested일 경우 part별 제목 + 항목이 구분선과 함께 표시된다.
 *
 * @param {Array} items - 아코디언 항목 배열 [Required]
 *   - curriculum flat: { id, title, items: string[] }
 *   - curriculum nested: { id, title, parts: [{ title, items: string[] }] }
 *   - faq: { id, question, answer }
 * @param {string} defaultExpandedId - 기본 펼침 항목 ID [Optional]
 * @param {string} variant - 'curriculum' | 'faq' [Optional, 기본값: 'faq']
 * @param {string} labelPrefix - curriculum variant의 인덱스 라벨 접두사 [Optional, 기본값: 'Chapter']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <AccordionSection
 *   variant="curriculum"
 *   items={[{ id: 'S1', title: '섹션 1', parts: [{ title: '파트 A', items: ['항목 1'] }] }]}
 * />
 */
const AccordionSection = forwardRef(function AccordionSection({
  items = [],
  defaultExpandedId,
  variant = 'faq',
  labelPrefix = 'Chapter',
  sx,
  ...props
}, ref) {
  const [expandedId, setExpandedId] = useState(defaultExpandedId || null);

  const handleChange = (id) => (_, isExpanded) => {
    setExpandedId(isExpanded ? id : null);
  };

  return (
    <Box ref={ref} sx={sx} {...props}>
      {items.map((item, index) => {
        const id = item.id || `accordion-${index}`;
        const isExpanded = expandedId === id;

        return (
          <MuiAccordion
            key={id}
            expanded={isExpanded}
            onChange={handleChange(id)}
            disableGutters
            square
            sx={{
              backgroundColor: 'transparent',
              backgroundImage: 'none',
              borderBottom: 1,
              borderColor: 'divider',
              '&:before': { display: 'none' },
              '&.Mui-expanded': { margin: 0 },
            }}
          >
            <AccordionSummary
              expandIcon={
                <ChevronDown
                  size={28}
                  style={{
                    transition: 'transform 200ms ease',
                  }}
                />
              }
              sx={{
                px: 0,
                py: { xs: 3, md: 4 },
                minHeight: 'unset',
                color: 'text.primary',
                '& .MuiAccordionSummary-expandIconWrapper': {
                  color: 'text.secondary',
                },
                '& .MuiAccordionSummary-content': {
                  margin: 0,
                },
                '@media (prefers-reduced-motion: reduce)': {
                  '& .MuiAccordionSummary-expandIconWrapper': {
                    transition: 'none',
                  },
                },
              }}
            >
              {variant === 'curriculum' ? (
                <Stack spacing={{ xs: 1.5, md: 2.5 }}>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 0.5, md: 3 }} alignItems={{ md: 'center' }}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Typography
                        variant="body2"
                        sx={{ color: 'error.main', flexShrink: 0, fontWeight: 600, minWidth: { md: 72 } }}
                      >
                        {labelPrefix} {index + 1}
                      </Typography>
                      {item.openDate && (
                        <Typography
                          variant="caption"
                          sx={{ color: 'text.secondary', flexShrink: 0, display: { md: 'none' } }}
                        >
                          {item.openDate}
                        </Typography>
                      )}
                    </Stack>
                    <Typography variant="h3" sx={{ fontWeight: 700 }}>
                      {item.title}
                    </Typography>
                    {item.openDate && (
                      <Typography
                        variant="caption"
                        sx={{ color: 'text.secondary', flexShrink: 0, display: { xs: 'none', md: 'block' } }}
                      >
                        {item.openDate}
                      </Typography>
                    )}
                  </Stack>
                  <Stack spacing={0.5} sx={{ display: { xs: 'none', md: 'flex' } }}>
                    {item.description && (
                      <Stack direction="row" spacing={3} alignItems="center">
                        <Typography
                          variant="body1"
                          sx={{ color: 'text.secondary', flexShrink: 0, fontWeight: 500, minWidth: { md: 72 } }}
                        >
                          요약
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                          {item.description}
                        </Typography>
                      </Stack>
                    )}
                    {item.goal && (
                      <Stack direction="row" spacing={3} alignItems="center">
                        <Typography
                          variant="body1"
                          sx={{ color: 'text.secondary', flexShrink: 0, fontWeight: 500, minWidth: { md: 72 } }}
                        >
                          목표
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                          {item.goal}
                        </Typography>
                      </Stack>
                    )}
                  </Stack>
                </Stack>
              ) : (
                <Typography variant="h4" sx={{ fontWeight: 500 }}>
                  {item.question || item.title}
                </Typography>
              )}
            </AccordionSummary>
            <AccordionDetails
              sx={{
                px: 0,
                pb: 8,
                pt: 0,
              }}
            >
              {variant === 'curriculum' && item.chapters ? (
                /* ── 섹션 > 챕터 > 파트 3단 구조 ── */
                <Stack spacing={0}>
                  {item.chapters.map((chapter, chIndex) => (
                    <Box key={`${id}-ch-${chIndex}`}>
                      {chIndex > 0 && (
                        <Divider sx={{ borderColor: 'divider' }} />
                      )}
                      <Box sx={{ py: 2.5 }}>
                        {/* 챕터 헤더 */}
                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 0.5, md: 3 }} alignItems={{ md: 'center' }} sx={{ mb: 2 }}>
                          <Typography
                            variant="body2"
                            sx={{ color: 'text.secondary', flexShrink: 0, fontWeight: 700, minWidth: { md: 72 } }}
                          >
                            {chapter.label}
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {chapter.title}
                          </Typography>
                        </Stack>
                        {/* 파트 타이틀 목록 */}
                        <Stack spacing={0.5} sx={{ pl: { xs: 0, md: `calc(72px + 24px)` } }}>
                          {chapter.parts.map((part, partIndex) => (
                            <Typography
                              key={`${id}-ch-${chIndex}-p-${partIndex}`}
                              variant="body1"
                              sx={{ color: 'text.secondary' }}
                            >
                              · {part.title}
                            </Typography>
                          ))}
                        </Stack>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              ) : variant === 'curriculum' && item.items ? (
                /* ── flat items: 하위 호환 ── */
                <Stack spacing={1.5} sx={{ pl: { xs: 0, md: 12 } }}>
                  {item.items.map((subItem, subIndex) => (
                    <Typography
                      key={subIndex}
                      variant="body1"
                      sx={{ color: 'text.secondary', fontSize: '1.05rem' }}
                    >
                      {subItem}
                    </Typography>
                  ))}
                </Stack>
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.75,
                    whiteSpace: 'pre-line',
                    maxWidth: '72ch',
                  }}
                >
                  {item.answer || item.content}
                </Typography>
              )}
            </AccordionDetails>
          </MuiAccordion>
        );
      })}
    </Box>
  );
});

export { AccordionSection };

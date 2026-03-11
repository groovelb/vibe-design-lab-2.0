'use client';
import { forwardRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
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
 * @param {Array} items - 아코디언 항목 배열 [Required]
 *   - curriculum: { id, title, items: string[] }
 *   - faq: { id, question, answer }
 * @param {string} defaultExpandedId - 기본 펼침 항목 ID [Optional]
 * @param {string} variant - 'curriculum' | 'faq' [Optional, 기본값: 'faq']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <AccordionSection
 *   variant="curriculum"
 *   items={[{ id: 'ch1', title: '챕터 1', items: ['항목 1', '항목 2'] }]}
 * />
 */
const AccordionSection = forwardRef(function AccordionSection({
  items = [],
  defaultExpandedId,
  variant = 'faq',
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
                  size={20}
                  style={{
                    transition: 'transform 200ms ease',
                  }}
                />
              }
              sx={{
                px: 0,
                py: 2,
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
                <Stack direction="row" spacing={2} alignItems="baseline">
                  <Typography
                    variant="overline"
                    sx={{ color: 'text.disabled', flexShrink: 0 }}
                  >
                    Chapter {index + 1}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {item.title}
                  </Typography>
                </Stack>
              ) : (
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {item.question || item.title}
                </Typography>
              )}
            </AccordionSummary>
            <AccordionDetails
              sx={{
                px: 0,
                pb: 3,
                pt: 0,
              }}
            >
              {variant === 'curriculum' && item.items ? (
                <Stack spacing={1} sx={{ pl: { xs: 0, md: 9.5 } }}>
                  {item.items.map((subItem, subIndex) => (
                    <Typography
                      key={subIndex}
                      variant="body1"
                      sx={{ color: 'text.secondary' }}
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

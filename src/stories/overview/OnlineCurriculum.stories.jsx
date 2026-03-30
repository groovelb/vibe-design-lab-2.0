'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { ChevronDown } from 'lucide-react';
import { DocumentTitle, PageContainer } from '../../components/storybookDocumentation';
import curriculum from '../../data/program/vdsk_online_curriculum.json';

export default {
  title: 'Overview/Online Curriculum',
  parameters: { layout: 'padded' },
};

const mono = { fontFamily: 'monospace', fontSize: 11 };
const accordionSx = {
  backgroundColor: 'transparent',
  '&:before': { display: 'none' },
  boxShadow: 'none',
  '& .MuiAccordionSummary-root': { userSelect: 'text' },
};

/**
 * 아이템 한 줄
 *
 * @param {object} item - 커리큘럼 아이템 [Required]
 */
function Item({ item }) {
  return (
    <Box sx={ { display: 'flex', gap: 1, py: 0.25, pl: 1 } }>
      <Typography component="span" sx={ { ...mono, flexShrink: 0, width: 14 } }>
        { item.status }
      </Typography>
      <Typography variant="caption" sx={ { lineHeight: 1.6 } }>
        { item.title }
      </Typography>
    </Box>
  );
}

/**
 * 파트 아코디언
 *
 * @param {object} part - 파트 데이터 [Required]
 */
function Part({ part }) {
  const items = part.items || [];
  if (items.length === 0) return null;

  return (
    <Accordion disableGutters sx={ { ...accordionSx, ml: 2 } }>
      <AccordionSummary
        expandIcon={ <ChevronDown size={ 14 } /> }
        sx={ { minHeight: 32, '& .MuiAccordionSummary-content': { my: 0.5 } } }
      >
        <Box sx={ { display: 'flex', alignItems: 'center', gap: 1 } }>
          <Typography sx={ { ...mono, color: 'text.secondary' } }>{ part.id }</Typography>
          <Typography variant="body2">{ part.title }</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={ { pt: 0, pb: 1 } }>
        { items.map((item, i) => <Item key={ i } item={ item } />) }
      </AccordionDetails>
    </Accordion>
  );
}

/**
 * 챕터 아코디언
 *
 * @param {object} chapter - 챕터 데이터 [Required]
 * @param {string} sId - 섹션 ID [Required]
 */
function Chapter({ chapter, sId }) {
  const parts = chapter.parts || [];

  return (
    <Accordion disableGutters sx={ { ...accordionSx, borderBottom: '1px solid', borderColor: 'divider' } }>
      <AccordionSummary
        expandIcon={ <ChevronDown size={ 16 } /> }
        sx={ { minHeight: 40, '& .MuiAccordionSummary-content': { my: 0.5 } } }
      >
        <Box sx={ { display: 'flex', alignItems: 'center', gap: 1 } }>
          <Typography sx={ { ...mono, color: 'text.secondary', fontWeight: 700, minWidth: 52 } }>
            { sId }-{ chapter.id }
          </Typography>
          <Typography variant="body2" sx={ { fontWeight: 600 } }>{ chapter.title }</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={ { pt: 0, pb: 1 } }>
        { chapter.coreMessage && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={ { display: 'block', pl: 1, mb: 1, fontStyle: 'italic' } }
          >
            { chapter.coreMessage }
          </Typography>
        ) }
        { parts.map((part) => <Part key={ part.id } part={ part } />) }
      </AccordionDetails>
    </Accordion>
  );
}

/**
 * 섹션 아코디언
 *
 * @param {object} section - 섹션 데이터 [Required]
 */
function Section({ section }) {
  const chapters = section.chapters || [];

  return (
    <Accordion
      disableGutters
      defaultExpanded
      sx={ {
        ...accordionSx,
        border: '1px solid',
        borderColor: 'divider',
        mb: 1,
      } }
    >
      <AccordionSummary
        expandIcon={ <ChevronDown size={ 18 } /> }
        sx={ { '& .MuiAccordionSummary-content': { my: 1 } } }
      >
        <Box sx={ { display: 'flex', alignItems: 'baseline', gap: 1.5 } }>
          <Typography sx={ { ...mono, fontWeight: 700 } }>{ section.id }</Typography>
          <Typography variant="body1" sx={ { fontWeight: 700 } }>{ section.title }</Typography>
          <Typography variant="caption" color="text.secondary">
            { chapters.length }ch
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={ { pt: 0 } }>
        { chapters.map((ch) => <Chapter key={ ch.id } chapter={ ch } sId={ section.id } />) }
      </AccordionDetails>
    </Accordion>
  );
}

/**
 * CurriculumBrowser 컴포넌트
 *
 * 커리큘럼 원본 데이터를 Section > Chapter > Part > Item 아코디언으로 탐색
 */
function CurriculumBrowser() {
  return (
    <>
      <DocumentTitle
        title="Online Curriculum"
        status="Data"
        note="vdsk_online_curriculum.json — Section › Chapter › Part › Item"
        brandName="Vibe Design"
        systemName="Online"
        version={ curriculum.meta.version }
      />
      <PageContainer>
        <Box sx={ { display: 'flex', gap: 3, mb: 3 } }>
          { Object.entries(curriculum.meta.definitions).map(([key, desc]) => (
            <Typography key={ key } variant="caption" color="text.secondary">
              <Typography component="span" variant="caption" sx={ { fontWeight: 700, color: 'text.primary' } }>
                { key }
              </Typography>
              { ' ' }{ desc }
            </Typography>
          )) }
        </Box>
        { curriculum.sections.map((s) => <Section key={ s.id } section={ s } />) }
      </PageContainer>
    </>
  );
}

/** 커리큘럼 데이터 브라우저 */
export const Doc = {
  render: () => <CurriculumBrowser />,
};

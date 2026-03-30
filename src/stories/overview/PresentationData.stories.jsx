'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { ChevronDown } from 'lucide-react';
import { DocumentTitle, PageContainer } from '../../components/storybookDocumentation';
import { S1 } from '../../data/presentations';

export default {
  title: 'Overview/Presentation Data',
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
 * 파트 아코디언
 *
 * @param {object} part - 파트 데이터 [Required]
 */
function Part({ part }) {
  return (
    <Accordion disableGutters sx={ { ...accordionSx, ml: 2 } }>
      <AccordionSummary
        expandIcon={ <ChevronDown size={ 14 } /> }
        sx={ { minHeight: 32, '& .MuiAccordionSummary-content': { my: 0.5 } } }
      >
        <Box sx={ { display: 'flex', alignItems: 'center', gap: 1 } }>
          <Typography sx={ { ...mono, color: 'text.secondary' } }>{ part.id }</Typography>
          <Typography variant="body2">{ part.title }</Typography>
          <Typography sx={ { ...mono, color: 'text.secondary' } }>{ part.slides.length }</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={ { pt: 0, pb: 1 } }>
        { part.slides.map((slide, i) => (
          <Box key={ slide.id } sx={ { display: 'flex', gap: 1, py: 0.25, pl: 1 } }>
            <Typography sx={ { ...mono, color: 'text.secondary', flexShrink: 0, minWidth: 20 } }>
              { i + 1 }.
            </Typography>
            <Typography variant="caption" sx={ { lineHeight: 1.6 } }>
              { slide.title }
            </Typography>
          </Box>
        )) }
      </AccordionDetails>
    </Accordion>
  );
}

/**
 * 챕터 아코디언
 *
 * @param {object} chapter - 챕터 데이터 [Required]
 */
function ChapterBlock({ chapter }) {
  return (
    <Accordion
      disableGutters
      sx={ { ...accordionSx, borderBottom: '1px solid', borderColor: 'divider' } }
    >
      <AccordionSummary
        expandIcon={ <ChevronDown size={ 16 } /> }
        sx={ { minHeight: 40, '& .MuiAccordionSummary-content': { my: 0.5 } } }
      >
        <Box sx={ { display: 'flex', alignItems: 'center', gap: 1 } }>
          <Typography sx={ { ...mono, color: 'text.secondary', fontWeight: 700 } }>
            { chapter.id }
          </Typography>
          <Typography variant="body2" sx={ { fontWeight: 600 } }>{ chapter.title }</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={ { pt: 0, pb: 1 } }>
        { chapter.parts.map((part) => <Part key={ part.id } part={ part } />) }
      </AccordionDetails>
    </Accordion>
  );
}

/**
 * PresentationBrowser 컴포넌트
 *
 * presentationData.js S1을 Chapter > Part > Slide 아코디언으로 탐색
 */
function PresentationBrowser() {
  return (
    <>
      <DocumentTitle
        title="Presentation Data"
        status="Data"
        note={ `${ S1.id }. ${ S1.title }` }
        brandName="Vibe Design"
        systemName="Online"
        version="1.0"
      />
      <PageContainer>
        <Accordion
          disableGutters
          defaultExpanded
          sx={ {
            ...accordionSx,
            border: '1px solid',
            borderColor: 'divider',
          } }
        >
          <AccordionSummary
            expandIcon={ <ChevronDown size={ 18 } /> }
            sx={ { '& .MuiAccordionSummary-content': { my: 1 } } }
          >
            <Box sx={ { display: 'flex', alignItems: 'baseline', gap: 1.5 } }>
              <Typography sx={ { ...mono, fontWeight: 700 } }>{ S1.id }</Typography>
              <Typography variant="body1" sx={ { fontWeight: 700 } }>{ S1.title }</Typography>
              <Typography variant="caption" color="text.secondary">
                { S1.chapters.length }ch
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={ { pt: 0 } }>
            { S1.chapters.map((ch) => <ChapterBlock key={ ch.id } chapter={ ch } />) }
          </AccordionDetails>
        </Accordion>
      </PageContainer>
    </>
  );
}

/** S1 프레젠테이션 데이터 브라우저 */
export const Doc = {
  render: () => <PresentationBrowser />,
};

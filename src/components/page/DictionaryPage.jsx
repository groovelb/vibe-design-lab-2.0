'use client';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { SectionContainer } from '../container/SectionContainer';
import { SectionDivider } from '../typography/SectionDivider';
import { SectionTitle } from '../typography/SectionTitle';
import { TaxonomySection } from '../data-display/TaxonomySection';
import { PageContainer } from '../layout/PageContainer';
import { TAXONOMY, TAXONOMY_STATS } from '../../data/taxonomyData';
import { PAGES } from '../../data/contents';

const { dictionary } = PAGES;

/**
 * DictionaryPage 컴포넌트
 *
 * Vibe Dictionary 페이지 콘텐츠를 조립하는 페이지 컴포넌트.
 * Hero + TaxonomySection + Bottom CTA 구성.
 *
 * Example usage:
 * <DictionaryPage />
 */
export function DictionaryPage() {
  return (
    <PageContainer>
      {/* Hero */}
      <SectionContainer sx={{ pb: { xs: 0, md: 0 } }}>
        <SectionDivider label="Dictionary" sx={{ mb: 3 }} />
        <SectionTitle
          headline={dictionary.intro.headline}
          subtitle={dictionary.intro.subCopy}
        />
      </SectionContainer>

      {/* Taxonomy */}
      <TaxonomySection data={TAXONOMY} stats={TAXONOMY_STATS} />

      {/* Bottom CTA */}
      <SectionContainer>
        <Stack spacing={3} sx={{ alignItems: 'center', textAlign: 'center', py: { xs: 4, md: 8 } }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: 'text.primary' }}>
            {dictionary.bottomCta.headline}
          </Typography>
          <Box>
            <Button variant="outlined" href="/course/starter-kit" size="large">
              {dictionary.bottomCta.cta}
            </Button>
          </Box>
        </Stack>
      </SectionContainer>
    </PageContainer>
  );
}

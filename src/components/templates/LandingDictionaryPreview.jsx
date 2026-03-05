'use client';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { SectionContainer } from '../container/SectionContainer';
import { PhiSplit } from '../layout/PhiSplit';
import FadeTransition from '../motion/FadeTransition';
import { SectionDivider } from '../typography/SectionDivider';
import { SectionTitle } from '../typography/SectionTitle';
import { PAGES } from '../../data/contents';

const { dictionaryPreview } = PAGES.landing;

/**
 * LandingDictionaryPreview 섹션 템플릿
 *
 * "도구가 바뀌어도 남는 체계" — Vibe Dictionary 소개 섹션.
 * PhiSplit으로 좌(overline + 대형 타이포 + CTA) / 우(키비쥬얼 placeholder) 구성.
 * 등가 다이어그램 키비쥬얼은 미완성이므로 PoweredByAgentsIllustration으로 대체.
 *
 * Example usage:
 * <LandingDictionaryPreview />
 */
export function LandingDictionaryPreview() {
  return (
    <SectionContainer>
        <FadeTransition direction="up" isTriggerOnView>
          <PhiSplit
            gap={6}
            stackAt="sm"
            primary={
              <Stack
                spacing={3}
                sx={{ justifyContent: 'center', height: '100%' }}
              >
                <Box>
                  <SectionDivider label="Dictionary" sx={{ mb: 3 }} />
                  <SectionTitle
                    headline={dictionaryPreview.headline}
                    subtitle={dictionaryPreview.subCopy}
                  />
                </Box>
                <Box>
                  <Button variant="text" href="/dictionary">
                    {dictionaryPreview.cta}
                  </Button>
                </Box>
              </Stack>
            }
            secondary={
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: { xs: 3, md: 5 },
                  border: '1px dashed',
                  borderColor: 'divider',
                  minHeight: 320,
                }}
              />
            }
          />
        </FadeTransition>
    </SectionContainer>
  );
}

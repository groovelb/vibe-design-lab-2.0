'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { SectionContainer } from '../container/SectionContainer';
import { PageContainer } from '../layout/PageContainer';
import { PhiSplit } from '../layout/PhiSplit';
import FadeTransition from '../motion/FadeTransition';
import { PoweredByAgentsIllustration } from '../../stories/overview/ux/referenceIllustrations';
import { PAGES } from '../../data/contents';

const { dictionaryPreview } = PAGES.landing;

/**
 * LandingDictionaryPreview 섹션 템플릿
 *
 * "도구가 바뀌어도 남는 체계" — Vibe Dictionary 소개 섹션.
 * PhiSplit으로 좌(텍스트+CTA) / 우(키비쥬얼 placeholder) 레이아웃을 구성한다.
 * 등가 다이어그램 키비쥬얼은 미완성이므로 PoweredByAgentsIllustration으로 대체.
 *
 * Example usage:
 * <LandingDictionaryPreview />
 */
export function LandingDictionaryPreview() {
  return (
    <SectionContainer>
      <PageContainer>
        <FadeTransition direction="up" isTriggerOnView>
          <PhiSplit
            gap={6}
            stackAt="sm"
            primary={
              <Stack spacing={3} sx={{ justifyContent: 'center', height: '100%' }}>
                <Typography variant="h2" component="h2" sx={{ fontWeight: 800 }}>
                  {dictionaryPreview.headline}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                  {dictionaryPreview.subCopy}
                </Typography>
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
                  p: 4,
                  backgroundColor: 'background.paper',
                  border: 1,
                  borderColor: 'divider',
                  minHeight: 280,
                }}
              >
                <PoweredByAgentsIllustration
                  width="100%"
                  height="auto"
                  style={{ maxWidth: 260 }}
                />
              </Box>
            }
          />
        </FadeTransition>
      </PageContainer>
    </SectionContainer>
  );
}

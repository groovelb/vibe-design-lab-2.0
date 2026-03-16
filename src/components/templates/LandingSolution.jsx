'use client';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import { SectionContainer } from '../container/SectionContainer';
import LineGrid from '../layout/LineGrid';
import { SectionDivider } from '../typography/SectionDivider';
import { SectionTitle } from '../typography/SectionTitle';
import { AreaConstruct } from '../motion/AreaConstruct';
import { ConstructType } from '../motion/ConstructType';
import { ConstructBlock } from '../motion/ConstructBlock';
import { ConstructButton } from '../motion/ConstructButton';
import { COL_STAGGER, VISUAL_LEAD } from '../motion/constants';
import { PAGES, VALUE_PROPOSITIONS } from '../../data/contents';
import { SystemOverDrawingV3 } from '../../assets/brandIllustration/SystemOverDrawingV3';
import { VibeStandard } from '../../assets/brandIllustration/VibeStandard';
import { DesignAsBuild } from '../../assets/brandIllustration/DesignAsBuild';

const ILLUSTRATIONS = [SystemOverDrawingV3, VibeStandard, DesignAsBuild];

const { howDifferent } = PAGES.landing;

/**
 * LandingSolution 섹션 템플릿
 *
 * VDL의 차별점을 설명하는 섹션.
 * VALUE_PROPOSITIONS 3컬럼 카드 + 각 카드의 "자세히" 버튼으로
 * howDifferent.details 모달을 열어 학습 내용의 구체적 증거를 보여준다.
 *
 * Example usage:
 * <LandingSolution />
 */
export function LandingSolution() {
  const [openIndex, setOpenIndex] = useState(null);

  const activeDetail = openIndex !== null ? howDifferent.details?.[openIndex] : null;

  return (
    <SectionContainer>
      <SectionDivider label="Solution" sx={{ mb: 3 }} />
      <SectionTitle
        headline={howDifferent.headline}
        subtitle={howDifferent.subCopy}
        sx={{ mb: { xs: 6, md: 10 } }}
      />

      {/* 가치 제안 — 3컬럼 + 자세히 버튼 */}
      <LineGrid container gap={96} borderColor="divider">
        {VALUE_PROPOSITIONS.map((vp, index) => {
          const Illustration = ILLUSTRATIONS[index];
          const colDelay = (index % 3) * COL_STAGGER;
          return (
            <Grid key={vp.name} size={{ xs: 12, md: 4 }}>
              <AreaConstruct isTriggerOnView delay={colDelay}>
                <Illustration />
              </AreaConstruct>
              <Box sx={{ mt: 6 }}>
                <ConstructType
                  text={vp.name}
                  variant="h4"
                  typingSpeed={20}
                  delay={colDelay + VISUAL_LEAD}
                  sx={{ '& .MuiTypography-root': { fontWeight: 900, textTransform: 'uppercase' } }}
                />
                <ConstructBlock
                  text={vp.description}
                  variant="body1"
                  duration={800}
                  delay={colDelay + VISUAL_LEAD + 200}
                  sx={{ mt: 1 }}
                />
                {howDifferent.details?.[index] && (
                  <ConstructButton
                    size="small"
                    delay={colDelay + VISUAL_LEAD + 400}
                    onClick={() => setOpenIndex(index)}
                    sx={{ mt: 2 }}
                  >
                    자세히
                  </ConstructButton>
                )}
              </Box>
            </Grid>
          );
        })}
      </LineGrid>

      {/* 상세 모달 */}
      <Dialog
        open={openIndex !== null}
        onClose={() => setOpenIndex(null)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: 'background.default',
            backgroundImage: 'none',
            borderRadius: 0,
            m: { xs: 2, md: 4 },
            maxHeight: '90vh',
          },
        }}
      >
        {activeDetail && (
          <DialogContent sx={{ p: { xs: 3, md: 6 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
              <IconButton
                onClick={() => setOpenIndex(null)}
                size="small"
                aria-label="닫기"
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 6,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h2"
                  component="h3"
                  sx={{ fontWeight: 800 }}
                >
                  {activeDetail.headline}
                </Typography>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="h4"
                  component="p"
                  sx={{ color: 'text.secondary', fontWeight: 400, lineHeight: 1.6 }}
                >
                  {activeDetail.description}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                mt: { xs: 4, md: 6 },
                width: '100%',
                aspectRatio: { xs: '4/3', md: '16/9' },
                border: '1px dashed',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: 'text.disabled' }}
              >
                {activeDetail.tabLabel}
              </Typography>
            </Box>
          </DialogContent>
        )}
      </Dialog>
    </SectionContainer>
  );
}

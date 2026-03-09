'use client';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import { SectionContainer } from '../container/SectionContainer';
import LineGrid from '../layout/LineGrid';
import { FeatureCard } from '../card/FeatureCard';
import FadeTransition from '../motion/FadeTransition';
import { SectionDivider } from '../typography/SectionDivider';
import { SectionTitle } from '../typography/SectionTitle';
import { PAGES, VALUE_PROPOSITIONS } from '../../data/contents';
import { SystemOverDrawing } from '../../assets/brandIllustration/SystemOverDrawing';
import { VibeStandard } from '../../assets/brandIllustration/VibeStandard';
import { DesignAsBuild } from '../../assets/brandIllustration/DesignAsBuild';

const ILLUSTRATIONS = [SystemOverDrawing, VibeStandard, DesignAsBuild];

const { howDifferent } = PAGES.landing;

/**
 * LandingDifference 섹션 템플릿
 *
 * VDL의 차별점을 설명하는 섹션.
 * VALUE_PROPOSITIONS 3컬럼 카드 + 각 카드의 "자세히" 버튼으로
 * howDifferent.details 모달을 열어 학습 내용의 구체적 증거를 보여준다.
 *
 * Example usage:
 * <LandingDifference />
 */
export function LandingDifference() {
  const [openIndex, setOpenIndex] = useState(null);

  const activeDetail = openIndex !== null ? howDifferent.details?.[openIndex] : null;

  return (
    <SectionContainer>
      <FadeTransition direction="up" isTriggerOnView>
        <SectionDivider label="Difference" sx={{ mb: 3 }} />
        <SectionTitle
          headline={howDifferent.headline}
          subtitle={howDifferent.subCopy}
          sx={{ mb: { xs: 6, md: 10 } }}
        />
      </FadeTransition>

      {/* 가치 제안 — 3컬럼 + 자세히 버튼 */}
      <LineGrid container gap={96} borderColor="divider">
        {VALUE_PROPOSITIONS.map((vp, index) => (
          <Grid key={vp.name} size={{ xs: 12, md: 4 }}>
            <FadeTransition direction="up" delay={index * 100} isTriggerOnView>
              <FeatureCard
                illustrationSlot={(() => {
                  const Illustration = ILLUSTRATIONS[index];
                  return <Illustration />;
                })()}
                title={vp.name}
                description={vp.description}
              />
              {howDifferent.details?.[index] && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => setOpenIndex(index)}
                  sx={{
                    mt: 2,
                    bgcolor: 'common.white',
                    color: 'common.black',
                    '&:hover': { bgcolor: 'grey.200' },
                  }}
                >
                  자세히
                </Button>
              )}
            </FadeTransition>
          </Grid>
        ))}
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
            {/* 닫기 */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
              <IconButton
                onClick={() => setOpenIndex(null)}
                size="small"
                aria-label="닫기"
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* 헤드라인(좌) + 설명(우) — 1:1 */}
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

            {/* 풀폭 비주얼 슬롯 */}
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

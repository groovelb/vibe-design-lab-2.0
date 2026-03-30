'use client';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CloseIcon from '@mui/icons-material/Close';
import { SectionContainer } from '../container/SectionContainer';
import { PeekScroll } from '../container/PeekScroll';
import LineGrid from '../layout/LineGrid';
import { SectionDivider } from '../typography/SectionDivider';
import { SectionTitle } from '../typography/SectionTitle';
import { AreaConstruct } from '../motion/AreaConstruct';
import { ConstructType } from '../motion/ConstructType';
import { ConstructBlock } from '../motion/ConstructBlock';
import { ConstructButton } from '../motion/ConstructButton';
import { COL_STAGGER, VISUAL_LEAD, T } from '../motion/constants';
import { PAGES, VALUE_PROPOSITIONS } from '../../data/contents';
import { SystemOverDrawingV3 } from '../../assets/brandIllustration/SystemOverDrawingV3';
import { VibeStandardTree } from '../../assets/brandIllustration/VibeStandardTree';
import { DesignAsBuild } from '../../assets/brandIllustration/DesignAsBuild';

const ILLUSTRATIONS = [SystemOverDrawingV3, VibeStandardTree, DesignAsBuild];

// AreaConstruct reveal까지: tag(80) + scatter(250) + settle(40) + reveal(150) = 520ms
// + illustration IO가 construct IO보다 ~300ms 먼저 발동 (threshold 0.2 vs center)
const CONSTRUCT_OVERHEAD = T.tag + T.scatter + T.settle + T.reveal + 300;

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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

      {/* 가치 제안 — 모바일: PeekScroll / 데스크톱: 3컬럼 LineGrid */}
      {isMobile ? (
        <PeekScroll peek={40} gap={16}>
          {VALUE_PROPOSITIONS.map((vp, index) => {
            const Illustration = ILLUSTRATIONS[index];
            return (
              <Box key={vp.name}>
                <AreaConstruct isTriggerOnView>
                  <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, overflow: 'hidden' }}>
                    <Illustration delay={CONSTRUCT_OVERHEAD} />
                  </Box>
                </AreaConstruct>
                <Box sx={{ mt: 6 }}>
                  <ConstructType
                    text={vp.name}
                    variant="h4"
                    typingSpeed={20}
                    delay={VISUAL_LEAD}
                    sx={{ '& .MuiTypography-root': { fontWeight: 900, textTransform: 'uppercase' } }}
                  />
                  <ConstructBlock
                    text={vp.description}
                    variant="body1"
                    duration={800}
                    delay={VISUAL_LEAD + 200}
                    sx={{ mt: 1 }}
                  />
                </Box>
              </Box>
            );
          })}
        </PeekScroll>
      ) : (
        <LineGrid container gap={{ xs: 48, md: 96 }} borderColor="divider">
          {VALUE_PROPOSITIONS.map((vp, index) => {
            const Illustration = ILLUSTRATIONS[index];
            const colDelay = (index % 3) * COL_STAGGER;
            return (
              <Grid key={vp.name} size={{ xs: 12, sm: 6, md: 4 }}>
                <AreaConstruct isTriggerOnView delay={colDelay}>
                  <Illustration delay={CONSTRUCT_OVERHEAD + colDelay} />
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
                </Box>
              </Grid>
            );
          })}
        </LineGrid>
      )}

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

'use client';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SectionContainer } from '../container/SectionContainer';
import { PeekScroll } from '../container/PeekScroll';
import LineGrid from '../layout/LineGrid';
import { SectionDivider } from '../typography/SectionDivider';
import { SectionTitle } from '../typography/SectionTitle';
import { MethodCard } from '../card/MethodCard';
import { Network, BookOpenText, UsersRound, Layers } from 'lucide-react';
import { COL_STAGGER } from '../motion/constants';
import { PAGES } from '../../data/contents';

const { learningMethod } = PAGES.landing;

const METHOD_ICONS = [Network, BookOpenText, UsersRound, Layers];

/**
 * LandingLearningMethod 섹션 템플릿
 *
 * 학습 방식을 설명하는 섹션.
 * 타이틀 → 코스 리드 프로필 → 메서드 카드 그리드 순서.
 *
 * Example usage:
 * <LandingLearningMethod />
 */
export function LandingLearningMethod() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <SectionContainer>
      <SectionDivider label="Method" sx={{ mb: 3 }} />
      <SectionTitle
        headline={learningMethod.headline}
        subtitle={learningMethod.subCopy}
        sx={{ mb: { xs: 6, md: 10 } }}
      />

      {isMobile ? (
        <PeekScroll peek={40} gap={16}>
          {learningMethod.methods.map((method, index) => (
            <MethodCard
              key={method.label}
              icon={METHOD_ICONS[index]}
              label={method.label}
              title={method.title}
              description={method.description}
            />
          ))}
        </PeekScroll>
      ) : (
        <LineGrid container gap={{ xs: 48, md: 120 }} borderColor="divider">
          {learningMethod.methods.map((method, index) => (
            <Grid key={method.label} size={{ xs: 12, sm: 6, md: 6 }}>
              <MethodCard
                icon={METHOD_ICONS[index]}
                label={method.label}
                title={method.title}
                description={method.description}
                delay={(index % 2) * COL_STAGGER}
              />
            </Grid>
          ))}
        </LineGrid>
      )}
    </SectionContainer>
  );
}

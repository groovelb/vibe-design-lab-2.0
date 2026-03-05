'use client';
import { SectionContainer } from '../container/SectionContainer';
import Grid from '@mui/material/Grid';
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
 * "VOD가 아니다" — VDL이 기존 VOD 학습과 어떻게 다른지 비교하는 섹션.
 * split 레이아웃 헤더: 좌측 대형 헤드라인 + 우측 서브카피.
 * ComparisonBlock으로 좌(VOD, 부정적 톤) / 우(VDL, 긍정적 톤) 대비를 표현한다.
 *
 * Example usage:
 * <LandingDifference />
 */
export function LandingDifference() {
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

      {/* 가치 제안 — 3컬럼 */}
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
            </FadeTransition>
          </Grid>
        ))}
      </LineGrid>
    </SectionContainer>
  );
}

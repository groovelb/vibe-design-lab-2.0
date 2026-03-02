'use client';
import { SectionContainer } from '../container/SectionContainer';
import { PageContainer } from '../layout/PageContainer';
import { Title } from '../typography/Title';
import { ComparisonBlock } from '../container/ComparisonBlock';
import FadeTransition from '../motion/FadeTransition';
import { PAGES, COMPARISON_TABLE } from '../../data/contents';

const { howDifferent } = PAGES.landing;

/**
 * LandingDifference 섹션 템플릿
 *
 * "VOD가 아니다" — VDL이 기존 VOD 학습과 어떻게 다른지 비교하는 섹션.
 * ComparisonBlock으로 좌(VOD, 부정적 톤) / 우(VDL, 긍정적 톤) 대비를 표현한다.
 *
 * Example usage:
 * <LandingDifference />
 */
export function LandingDifference() {
  const leftItems = COMPARISON_TABLE.map((row) => row.vod);
  const rightItems = COMPARISON_TABLE.map((row) => row.vdl);

  return (
    <SectionContainer>
      <PageContainer>
        <FadeTransition direction="up" isTriggerOnView>
          <Title
            title={howDifferent.headline}
            subtitle={howDifferent.subCopy}
            level="h2"
            sx={{ mb: 6 }}
          />
        </FadeTransition>

        <FadeTransition direction="up" delay={200} isTriggerOnView>
          <ComparisonBlock
            leftLabel="일반 VOD"
            rightLabel="VDL 코호트"
            leftItems={leftItems}
            rightItems={rightItems}
            leftTone="negative"
            rightTone="positive"
          />
        </FadeTransition>
      </PageContainer>
    </SectionContainer>
  );
}

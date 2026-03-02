'use client';
import { SectionContainer } from '../container/SectionContainer';
import { CourseCTABlock } from '../container/CourseCTABlock';
import { PAGES } from '../../data/contents';

const { footerCta } = PAGES.landing;

/**
 * LandingFooterCTA 섹션 템플릿
 *
 * Landing 페이지의 최종 CTA 섹션.
 * 전환 퍼널의 마지막 단계로, 중앙 정렬된 헤드라인과 CTA 버튼을 표시한다.
 *
 * Example usage:
 * <LandingFooterCTA />
 */
export function LandingFooterCTA() {
  return (
    <SectionContainer sx={{ py: 0 }}>
      <CourseCTABlock
        headline={footerCta.headline}
        ctaLabel={footerCta.cta}
        ctaHref="/course"
      />
    </SectionContainer>
  );
}

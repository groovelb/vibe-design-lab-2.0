'use client';
import { ConstructType } from '../motion/ConstructType';
import { ConstructButton } from '../motion/ConstructButton';
import { PAGES } from '../../data/contents';
import { WORD_DELAY_MULTIPLIER } from '../motion/constants';

const { hero, footerCta } = PAGES.landing;

/** headline 타이핑 소요시간 — word 간 딜레이 반영 */
const HEADLINE_SPEED = 25;
const spaceCount = (hero.headline.match(/ /g) || []).length;
const HEADLINE_DURATION =
  hero.headline.length * HEADLINE_SPEED + spaceCount * HEADLINE_SPEED * (WORD_DELAY_MULTIPLIER - 1);
/** CTA는 headline 70% 지점에서 시작 */
const CTA_START = Math.round(HEADLINE_DURATION * 0.7);

/**
 * LandingHeroMessage — 메인 메시지 영역 (headline + CTA)
 *
 * 등장 순서:
 * 1. headline (ConstructType) — 즉시
 * 2. CTA 버튼 (ConstructButton) — headline 완료 후
 *
 * Example usage:
 * <LandingHeroMessage />
 */
export function LandingHeroMessage() {
  return (
    <>
      <ConstructType
        text={hero.headline}
        variant="display"
        typingSpeed={HEADLINE_SPEED}
        isTriggerOnView={false}
        delay={0}
      />

      <ConstructButton
        size="large"
        href="/course"
        isTriggerOnView={false}
        delay={CTA_START}
        sx={{ mt: 8 }}
      >
        {footerCta.cta}
      </ConstructButton>
    </>
  );
}

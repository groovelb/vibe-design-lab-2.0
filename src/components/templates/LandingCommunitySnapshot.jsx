'use client';
import { SectionContainer } from '../container/SectionContainer';
import { PageContainer } from '../layout/PageContainer';
import { Title } from '../typography/Title';
import { CarouselContainer } from '../container/CarouselContainer';
import { CommunityActivityCard } from '../card/CommunityActivityCard';
import FadeTransition from '../motion/FadeTransition';
import { PAGES } from '../../data/contents';
import { MOCK_COMMUNITY } from '../../data/landingMockData';

const { communitySnapshot } = PAGES.landing;

/**
 * LandingCommunitySnapshot 섹션 템플릿
 *
 * "지금 커뮤니티에서 일어나는 일" — 커뮤니티 활동 미리보기 섹션.
 * CarouselContainer로 4개의 CommunityActivityCard를 가로 스크롤 배치한다.
 *
 * Example usage:
 * <LandingCommunitySnapshot />
 */
export function LandingCommunitySnapshot() {
  return (
    <SectionContainer>
      <PageContainer>
        <FadeTransition direction="up" isTriggerOnView>
          <Title title={communitySnapshot.headline} level="h2" sx={{ mb: 6 }} />
        </FadeTransition>

        <FadeTransition direction="up" delay={200} isTriggerOnView>
          <CarouselContainer
            items={MOCK_COMMUNITY}
            visible={{ xs: 1, sm: 2, md: 3, lg: 4 }}
            gap={16}
            renderItem={(item) => (
              <CommunityActivityCard
                type={item.type}
                contentPreview={item.contentPreview}
                memberName={item.memberName}
                timestamp={item.timestamp}
                sx={{ height: '100%' }}
              />
            )}
          />
        </FadeTransition>
      </PageContainer>
    </SectionContainer>
  );
}

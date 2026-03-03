'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SectionContainer } from '../container/SectionContainer';
import { PageContainer } from '../layout/PageContainer';
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
 * overline + 대형 헤드라인 + CarouselContainer로 가로 스크롤 배치.
 *
 * Example usage:
 * <LandingCommunitySnapshot />
 */
export function LandingCommunitySnapshot() {
  return (
    <SectionContainer sx={{ py: { xs: 8, md: 12 } }}>
      <PageContainer>
        {/* 섹션 헤드 — overline + 대형 헤드라인 */}
        <FadeTransition direction="up" isTriggerOnView>
          <Box sx={{ mb: { xs: 6, md: 10 } }}>
            <Typography
              variant="overline"
              sx={{ color: 'text.disabled', mb: 1.5, display: 'block' }}
            >
              Community
            </Typography>
            <Typography
              variant="h1"
              component="h2"
              sx={{ fontWeight: 800 }}
            >
              {communitySnapshot.headline}
            </Typography>
          </Box>
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

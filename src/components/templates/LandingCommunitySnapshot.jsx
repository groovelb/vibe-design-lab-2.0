'use client';
import Grid from '@mui/material/Grid';
import { SectionContainer } from '../container/SectionContainer';
import LineGrid from '../layout/LineGrid';
import { CommunityActivityCard } from '../card/CommunityActivityCard';
import FadeTransition from '../motion/FadeTransition';
import { SectionDivider } from '../typography/SectionDivider';
import { SectionTitle } from '../typography/SectionTitle';
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
    <SectionContainer>
        <FadeTransition direction="up" isTriggerOnView>
          <SectionDivider label="Community" sx={{ mb: 3 }} />
          <SectionTitle
            headline={communitySnapshot.headline}
            sx={{ mb: { xs: 6, md: 10 } }}
          />
        </FadeTransition>

        <FadeTransition direction="up" delay={200} isTriggerOnView>
          <LineGrid container gap={96} borderColor="divider">
            {MOCK_COMMUNITY.map((item, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                <CommunityActivityCard
                  type={item.type}
                  contentPreview={item.contentPreview}
                  memberName={item.memberName}
                  timestamp={item.timestamp}
                  cardVariant="editorial"
                  sx={{ height: '100%' }}
                />
              </Grid>
            ))}
          </LineGrid>
        </FadeTransition>
    </SectionContainer>
  );
}

'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { SectionContainer } from '../container/SectionContainer';
import { PageContainer } from '../layout/PageContainer';
import LineGrid from '../layout/LineGrid';
import { StatementCard } from '../card/StatementCard';
import FadeTransition from '../motion/FadeTransition';
import { PAGES } from '../../data/contents';

const { problem } = PAGES.landing;

/**
 * LandingProblem 섹션 템플릿
 *
 * "시장은 바뀌는데, 배울 곳이 없다" — 방문자의 문제를 정의하는 섹션.
 * 커리어 문제(페르소나별)와 학습 환경 문제를 카드 그리드로 배치한다.
 * overline 레이블 + 대형 헤드라인 + 카드 그리드 구조.
 *
 * Example usage:
 * <LandingProblem />
 */
export function LandingProblem() {
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
              Problem
            </Typography>
            <Typography
              variant="h1"
              component="h2"
              sx={{ fontWeight: 800 }}
            >
              {problem.headline}
            </Typography>
          </Box>
        </FadeTransition>

        {/* 커리어 문제 — 페르소나별 3컬럼 */}
        <Box sx={{ mb: { xs: 6, md: 8 } }}>
          <Typography
            variant="caption"
            sx={{
              color: 'text.disabled',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 600,
              mb: 3,
              display: 'block',
            }}
          >
            커리어 문제
          </Typography>
          <LineGrid container gap={96} borderColor="divider">
            {problem.career.map((item, index) => (
              <Grid key={item.persona} size={{ xs: 12, md: 4 }}>
                <FadeTransition direction="up" delay={index * 100} isTriggerOnView>
                  <StatementCard title={item.persona} description={item.text} />
                </FadeTransition>
              </Grid>
            ))}
          </LineGrid>
        </Box>

        {/* 학습 환경 문제 — 3컬럼 */}
        <Box>
          <Typography
            variant="caption"
            sx={{
              color: 'text.disabled',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 600,
              mb: 3,
              display: 'block',
            }}
          >
            학습 환경 문제
          </Typography>
          <LineGrid container gap={96} borderColor="divider">
            {problem.learning.map((item, index) => (
              <Grid key={item.problem} size={{ xs: 12, md: 4 }}>
                <FadeTransition direction="up" delay={index * 100} isTriggerOnView>
                  <StatementCard title={item.problem} description={item.text} />
                </FadeTransition>
              </Grid>
            ))}
          </LineGrid>
        </Box>
      </PageContainer>
    </SectionContainer>
  );
}

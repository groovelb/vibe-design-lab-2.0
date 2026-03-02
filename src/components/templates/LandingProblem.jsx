'use client';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { SectionContainer } from '../container/SectionContainer';
import { PageContainer } from '../layout/PageContainer';
import { Title } from '../typography/Title';
import { CardContainer } from '../card/CardContainer';
import FadeTransition from '../motion/FadeTransition';
import { PAGES } from '../../data/contents';

const { problem } = PAGES.landing;

/**
 * LandingProblem 섹션 템플릿
 *
 * "시장은 바뀌는데, 배울 곳이 없다" — 방문자의 문제를 정의하는 섹션.
 * 커리어 문제(페르소나별)와 학습 환경 문제를 카드 그리드로 배치한다.
 *
 * Example usage:
 * <LandingProblem />
 */
export function LandingProblem() {
  return (
    <SectionContainer>
      <PageContainer>
        <FadeTransition direction="up" isTriggerOnView>
          <Title title={problem.headline} level="h2" sx={{ mb: 6 }} />
        </FadeTransition>

        {/* 커리어 문제 — 페르소나별 */}
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', mb: 2, display: 'block' }}
        >
          커리어 문제
        </Typography>
        <Grid container spacing={2} sx={{ mb: 5 }}>
          {problem.career.map((item, index) => (
            <Grid key={item.persona} size={{ xs: 12, md: 4 }}>
              <FadeTransition direction="up" delay={index * 100} isTriggerOnView>
                <CardContainer variant="outlined" sx={{ height: '100%' }}>
                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2">{item.persona}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {item.text}
                    </Typography>
                  </Stack>
                </CardContainer>
              </FadeTransition>
            </Grid>
          ))}
        </Grid>

        {/* 학습 환경 문제 */}
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', mb: 2, display: 'block' }}
        >
          학습 환경 문제
        </Typography>
        <Grid container spacing={2}>
          {problem.learning.map((item, index) => (
            <Grid key={item.problem} size={{ xs: 12, md: 4 }}>
              <FadeTransition direction="up" delay={index * 100} isTriggerOnView>
                <CardContainer variant="outlined" sx={{ height: '100%' }}>
                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2">{item.problem}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {item.text}
                    </Typography>
                  </Stack>
                </CardContainer>
              </FadeTransition>
            </Grid>
          ))}
        </Grid>
      </PageContainer>
    </SectionContainer>
  );
}

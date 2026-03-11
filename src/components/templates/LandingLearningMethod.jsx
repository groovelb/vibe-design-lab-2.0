'use client';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { SectionContainer } from '../container/SectionContainer';
import LineGrid from '../layout/LineGrid';
import FadeTransition from '../motion/FadeTransition';
import { SectionDivider } from '../typography/SectionDivider';
import { SectionTitle } from '../typography/SectionTitle';
import { PAGES } from '../../data/contents';

const { learningMethod } = PAGES.landing;

/**
 * LandingLearningMethod 섹션 템플릿
 *
 * 학습 방식을 설명하는 섹션.
 * 커뮤니티 학습, 맥락 질문 피드, 콘텐츠 주기 3가지 방법을 카드 형태로 배치한다.
 *
 * Example usage:
 * <LandingLearningMethod />
 */
export function LandingLearningMethod() {
  return (
    <SectionContainer>
      <FadeTransition direction="up" isTriggerOnView>
        <SectionDivider label="Method" sx={{ mb: 3 }} />
        <SectionTitle
          headline={learningMethod.headline}
          subtitle={learningMethod.subCopy}
          sx={{ mb: { xs: 6, md: 10 } }}
        />
      </FadeTransition>

      <LineGrid container gap={96} borderColor="divider">
        {learningMethod.methods.map((method, index) => (
          <Grid key={method.label} size={{ xs: 12, md: 6 }}>
            <FadeTransition direction="up" delay={index * 100} isTriggerOnView>
              <Stack spacing={2}>
                <Typography
                  variant="caption"
                  sx={{ color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.08em' }}
                >
                  {method.label}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800 }}>
                  {method.title}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                  {method.description}
                </Typography>
              </Stack>
            </FadeTransition>
          </Grid>
        ))}
      </LineGrid>
    </SectionContainer>
  );
}

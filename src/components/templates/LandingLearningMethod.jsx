'use client';
import Grid from '@mui/material/Grid';
import { SectionContainer } from '../container/SectionContainer';
import LineGrid from '../layout/LineGrid';
import FadeTransition from '../motion/FadeTransition';
import { SectionDivider } from '../typography/SectionDivider';
import { SectionTitle } from '../typography/SectionTitle';
import { CardTextStack } from '../typography/CardTextStack';
import { PAGES } from '../../data/contents';

const { learningMethod } = PAGES.landing;

/**
 * LandingLearningMethod 섹션 템플릿
 *
 * 학습 방식을 설명하는 섹션.
 * 커뮤니티 학습, 맥락 질문 피드, 콘텐츠 주기, 현업 예제 4가지 방법을 카드 형태로 배치한다.
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
              <CardTextStack
                label={method.label}
                title={method.title}
                description={method.description}
              />
            </FadeTransition>
          </Grid>
        ))}
      </LineGrid>
    </SectionContainer>
  );
}

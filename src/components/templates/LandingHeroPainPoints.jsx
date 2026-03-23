'use client';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import LineGrid from '../layout/LineGrid';
import { ConstructType } from '../motion/ConstructType';
import { ConstructBlock } from '../motion/ConstructBlock';
import { PAGES } from '../../data/contents';
import { COL_STAGGER, WORD_DELAY_MULTIPLIER } from '../motion/constants';

const { hero } = PAGES.landing;

/** word 간 3배 딜레이를 포함한 실제 타이핑 소요시간 계산 */
const countSpaces = (str) => (str.match(/ /g) || []).length;
const typingDuration = (str, speed) =>
  str.length * speed + countSpaces(str) * speed * (WORD_DELAY_MULTIPLIER - 1);

/** 인터랙티브 인트로(2.2s) 완료 후 3pp 등장 */
const PAIN_START = 2400;

/** 타이틀 50% 지점에서 설명 시작 */
const TITLE_SPEED = 20;
const TITLE_HALF = Math.round(
  Math.max(...hero.painPoints.map((p) => typingDuration(p.label, TITLE_SPEED))) * 0.5,
);

/**
 * LandingHeroPainPoints — 3축 그리드 (의도 / 어휘 / 설계)
 *
 * 등장 순서:
 * 0. 커서(■) 펄스 (즉시 표시, 트리거 전까지 idle 펄스)
 * 1. 각 카드 타이틀 (ConstructType) — 좌→우 COL_STAGGER
 * 2. 각 카드 설명 (ConstructBlock) — 타이틀 완료 후
 *
 * Example usage:
 * <LandingHeroPainPoints />
 */
export function LandingHeroPainPoints() {
  return (
    <Stack sx={{ height: '100%' }} justifyContent="center">
      <LineGrid container gap={96} borderColor="divider">
        {hero.painPoints.map((point, index) => {
          const colDelay = index * COL_STAGGER;
          const titleDelay = PAIN_START + colDelay;
          const blockDelay = titleDelay + TITLE_HALF;

          return (
            <Grid key={point.label} size={{ xs: 12, md: 4 }}>
              <Box>
                <ConstructType
                  text={point.label}
                  variant="h4"
                  typingSpeed={TITLE_SPEED}
                  isTriggerOnView={false}
                  delay={titleDelay}
                  isIdleVisible
                  sx={{ '& .MuiTypography-root': { fontWeight: 900 } }}
                />
                <ConstructBlock
                  text={point.text}
                  variant="body1"
                  duration={800}
                  isTriggerOnView={false}
                  delay={blockDelay}
                  isIdleVisible
                  sx={{ mt: 2 }}
                />
              </Box>
            </Grid>
          );
        })}
      </LineGrid>
    </Stack>
  );
}

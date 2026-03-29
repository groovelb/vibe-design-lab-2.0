'use client';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { SectionContainer } from '../container/SectionContainer';
import { CarouselContainer } from '../container/CarouselContainer';
import LineGrid from '../layout/LineGrid';
import { TestimonialCard } from '../card/TestimonialCard';
import FadeTransition from '../motion/FadeTransition';
import { SectionDivider } from '../typography/SectionDivider';
import { SectionTitle } from '../typography/SectionTitle';
import { COL_STAGGER } from '../motion/constants';
import { PAGES } from '../../data/contents';
import { courseReviews, webinarReviews } from '../../data/review';

const { courseReview } = PAGES.courseDetail;

const VISIBLE_WEBINAR_COUNT = 4;

function maskUserId(userId) {
  if (userId.length <= 5) return userId;
  return userId.slice(0, 3) + '***' + userId.slice(-2);
}

function formatRole(review) {
  if (review.company) return `${review.role} · ${review.company}`;
  return review.role;
}

/**
 * CourseDetailReview 섹션 템플릿
 *
 * 코스 상세 페이지의 수강생 후기 + 웨비나 참여자 후기 2단 구성.
 * 코스 후기: CarouselContainer 4col 캐러셀, 2줄 클램프 + 더보기 토글.
 * 웨비나 후기: 4col 그리드, 2줄 클램프 + 하단 더보기 토글.
 * LandingCourseReview 패턴 재활용.
 *
 * Example usage:
 * <CourseDetailReview />
 */
export function CourseDetailReview() {
  const [expandedCourse, setExpandedCourse] = useState({});
  const [isWebinarExpanded, setIsWebinarExpanded] = useState(false);

  const visibleWebinarReviews = isWebinarExpanded
    ? webinarReviews
    : webinarReviews.slice(0, VISIBLE_WEBINAR_COUNT);

  return (
    <SectionContainer>
      {/* ── 코스 후기 헤더 ── */}
      <FadeTransition direction="up" isTriggerOnView threshold={0.5}>
        <SectionDivider label={courseReview.dividerLabel} sx={{ mb: 3 }} />
        <SectionTitle
          headline={courseReview.headline}
          subtitle={courseReview.subtitle}
          sx={{ mb: { xs: 6, md: 10 } }}
        />
      </FadeTransition>

      {/* ── 코스 후기 — 4col 캐러셀, 2줄 클램프 ── */}
      <FadeTransition direction="up" isTriggerOnView threshold={0.5}>
        <CarouselContainer
          items={courseReviews}
          visible={{ xs: 1, sm: 2, md: 4 }}
          gap={24}
          hasDivider
          navPosition="outside"
          renderItem={(review, index) => (
            <Box>
              <TestimonialCard
                thumbnailSrc={review.image}
                thumbnailAlt={`${review.name}의 결과물`}
                quote={review.content}
                memberName={review.name}
                memberRole={formatRole(review)}
                variant="compact"
                cardVariant="editorial"
                mediaRatio="auto"
                sx={{
                  ...(!expandedCourse[index] && {
                    '& .MuiTypography-body2': {
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    },
                  }),
                }}
              />
              <Button
                variant="text"
                size="small"
                onClick={() =>
                  setExpandedCourse((prev) => ({
                    ...prev,
                    [index]: !prev[index],
                  }))
                }
                sx={{ mt: 0.5, p: 0, minWidth: 0 }}
              >
                {expandedCourse[index] ? '접기' : '더보기'}
              </Button>
            </Box>
          )}
        />
      </FadeTransition>

      {/* ── 웨비나 참여자 후기 — 4col 그리드, 더보기 토글 ── */}
      <Box sx={{ mt: { xs: 8, md: 12 } }}>
        <FadeTransition direction="up" isTriggerOnView threshold={0.5}>
          <SectionDivider
            label={courseReview.webinarLabel}
            sx={{ mb: { xs: 4, md: 6 } }}
          />
        </FadeTransition>

        <LineGrid container gap={{ xs: 24, md: 48 }} borderColor="divider">
          {visibleWebinarReviews.map((review, index) => (
            <Grid key={review.userId} size={{ xs: 12, sm: 6, md: 3 }}>
              <FadeTransition
                direction="up"
                delay={(index % 4) * COL_STAGGER}
                isTriggerOnView
                threshold={0.5}
              >
                <Stack spacing={1.5}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        bgcolor: 'action.hover',
                        fontSize: '0.75rem',
                        color: 'text.secondary',
                      }}
                    />
                    <Stack spacing={0}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        @{maskUserId(review.userId)}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: 'text.secondary' }}
                      >
                        Threads
                      </Typography>
                    </Stack>
                  </Stack>

                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.7,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {review.content}
                  </Typography>
                </Stack>
              </FadeTransition>
            </Grid>
          ))}
        </LineGrid>

        {webinarReviews.length > VISIBLE_WEBINAR_COUNT && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setIsWebinarExpanded((prev) => !prev)}
            >
              {isWebinarExpanded
                ? '접기'
                : `더보기 (${webinarReviews.length - VISIBLE_WEBINAR_COUNT})`}
            </Button>
          </Box>
        )}
      </Box>
    </SectionContainer>
  );
}

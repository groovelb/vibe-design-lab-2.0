'use client';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { SectionContainer } from '../container/SectionContainer';
import LineGrid from '../layout/LineGrid';
import { TestimonialCard } from '../card/TestimonialCard';
import FadeTransition from '../motion/FadeTransition';
import { SectionDivider } from '../typography/SectionDivider';
import { SectionTitle } from '../typography/SectionTitle';
import { PAGES } from '../../data/contents';
import { courseReviews, webinarReviews } from '../../data/review';

const { courseReview } = PAGES.courseDetail;

const VISIBLE_COURSE_COUNT = 4;
const VISIBLE_WEBINAR_COUNT = 3;
const TRUNCATE_LENGTH = 120;

function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '…';
}

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
 * LandingCourseReview 패턴을 코스 상세 맥락에 맞게 재구성.
 *
 * Example usage:
 * <CourseDetailReview />
 */
export function CourseDetailReview() {
  const [expandedCourse, setExpandedCourse] = useState({});
  const [expandedWebinar, setExpandedWebinar] = useState({});

  const visibleCourseReviews = courseReviews.slice(0, VISIBLE_COURSE_COUNT);
  const visibleWebinarReviews = webinarReviews.slice(0, VISIBLE_WEBINAR_COUNT);

  return (
    <SectionContainer>
      {/* ── 코스 후기 헤더 ── */}
      <FadeTransition direction="up" isTriggerOnView>
        <SectionDivider label={courseReview.dividerLabel} sx={{ mb: 3 }} />
        <SectionTitle
          headline={courseReview.headline}
          subtitle={courseReview.subtitle}
          sx={{ mb: { xs: 6, md: 10 } }}
        />
      </FadeTransition>

      {/* ── 코스 후기 카드 — 3컬럼 ── */}
      <LineGrid container gap={96} borderColor="divider">
        {visibleCourseReviews.map((review, index) => (
          <Grid key={review.name} size={{ xs: 12, md: 4 }}>
            <FadeTransition direction="up" delay={index * 150} isTriggerOnView>
              <TestimonialCard
                thumbnailSrc={review.image}
                thumbnailAlt={`${review.name}의 결과물`}
                quote={
                  expandedCourse[index]
                    ? review.content
                    : truncateText(review.content, TRUNCATE_LENGTH)
                }
                memberName={review.name}
                memberRole={formatRole(review)}
                variant="compact"
                cardVariant="editorial"
                mediaRatio="auto"
              />
              {review.content.length > TRUNCATE_LENGTH && (
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
              )}
            </FadeTransition>
          </Grid>
        ))}
      </LineGrid>

      {/* ── 웨비나 참여자 후기 ── */}
      <Box sx={{ mt: { xs: 8, md: 12 } }}>
        <FadeTransition direction="up" isTriggerOnView>
          <SectionDivider
            label={courseReview.webinarLabel}
            sx={{ mb: { xs: 4, md: 6 } }}
          />
        </FadeTransition>

        <LineGrid container gap={96} borderColor="divider">
          {visibleWebinarReviews.map((review, index) => (
            <Grid key={review.userId} size={{ xs: 12, md: 4 }}>
              <FadeTransition direction="up" delay={index * 100} isTriggerOnView>
                <Stack spacing={1.5}>
                  {/* 유저 정보 */}
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        bgcolor: 'action.hover',
                        fontSize: '0.75rem',
                        color: 'text.disabled',
                      }}
                    />
                    <Stack spacing={0}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        @{maskUserId(review.userId)}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: 'text.disabled' }}
                      >
                        Threads
                      </Typography>
                    </Stack>
                  </Stack>

                  {/* 리뷰 본문 */}
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', lineHeight: 1.7 }}
                  >
                    {expandedWebinar[index]
                      ? review.content
                      : truncateText(review.content, TRUNCATE_LENGTH)}
                  </Typography>

                  {/* 더보기 */}
                  {review.content.length > TRUNCATE_LENGTH && (
                    <Button
                      variant="text"
                      size="small"
                      onClick={() =>
                        setExpandedWebinar((prev) => ({
                          ...prev,
                          [index]: !prev[index],
                        }))
                      }
                      sx={{ p: 0, minWidth: 0, alignSelf: 'flex-start' }}
                    >
                      {expandedWebinar[index] ? '접기' : '더보기'}
                    </Button>
                  )}
                </Stack>
              </FadeTransition>
            </Grid>
          ))}
        </LineGrid>
      </Box>
    </SectionContainer>
  );
}

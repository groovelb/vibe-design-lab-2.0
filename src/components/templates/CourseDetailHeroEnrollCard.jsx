'use client';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FadeTransition from '../motion/FadeTransition';
import { GLASS_SX, GLASS_DIVIDER_SX } from '../../common/ui/glassSx';

/**
 * CourseDetailHeroEnrollCard 컴포넌트
 *
 * Hero 우측 글래스 신청 카드: 제목 + 가격 + CTA 버튼.
 *
 * @param {string} enrollCardTitle - 카드 제목 [Required]
 * @param {string} enrollFeeLabel - 수강료 라벨 [Required]
 * @param {string} price - 할인 가격 [Required]
 * @param {string} priceOriginal - 원래 가격 (삭선 표시) [Required]
 * @param {string} priceDiscount - 할인 안내 문구 [Required]
 * @param {string} priceNote - 가격 안내 문구 [Required]
 * @param {string} ctaLabel - CTA 버튼 텍스트 [Required]
 *
 * Example usage:
 * <CourseDetailHeroEnrollCard enrollCardTitle="수강 신청" price="₩990,000" ... />
 */
export function CourseDetailHeroEnrollCard({
  enrollCardTitle,
  enrollFeeLabel,
  price,
  priceOriginal,
  priceDiscount,
  priceNote,
  ctaLabel,
  enrollUrl,
}) {
  return (
    <Box sx={{ flex: '1 1 auto', ...GLASS_SX }}>
      <FadeTransition direction="up" delay={300} isTriggerOnView>
        <Box sx={{ p: { xs: 3, md: 5 }, wordBreak: 'keep-all' }}>
          <Stack spacing={4}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: 'text.primary' }}
            >
              {enrollCardTitle}
            </Typography>

            <Box sx={GLASS_DIVIDER_SX} />

            <Stack spacing={1.5}>
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary' }}
              >
                {enrollFeeLabel}
              </Typography>
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="baseline"
              >
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 800, color: 'text.primary' }}
                >
                  {price}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', textDecoration: 'line-through' }}
                >
                  {priceOriginal}
                </Typography>
              </Stack>
              <Typography
                variant="body2"
                sx={{ color: 'error.main', fontWeight: 600 }}
              >
                {priceDiscount}
              </Typography>
            </Stack>

            <Box
              sx={{
                p: 2,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary' }}
              >
                {priceNote}
              </Typography>
            </Box>

            <Button
              variant="contained"
              color="error"
              size="large"
              href={enrollUrl || '#enroll'}
              target={enrollUrl ? '_blank' : undefined}
              rel={enrollUrl ? 'noopener noreferrer' : undefined}
              fullWidth
              sx={{ py: 2.5, fontSize: '1.125rem', fontWeight: 700 }}
            >
              {ctaLabel}
            </Button>
          </Stack>
        </Box>
      </FadeTransition>
    </Box>
  );
}

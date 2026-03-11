'use client';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

/**
 * ProfileBlock 컴포넌트
 *
 * 강사/인물 프로필 블록.
 * 이미지 + 이름 + 타이틀 + 참여 프로젝트 리스트.
 *
 * @param {string} imageSrc - 프로필 이미지 경로 [Optional]
 * @param {string} name - 이름 [Required]
 * @param {string[]} titles - 직함/소속 배열 [Required]
 * @param {Array<{year: string, title: string}>} projects - 참여 프로젝트 [Optional]
 * @param {string} projectsLabel - 프로젝트 섹션 라벨 [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <ProfileBlock
 *   name="DDD"
 *   titles={['Data Driven Design 대표']}
 *   projects={[{ year: '2025', title: '프로젝트명' }]}
 *   projectsLabel="참여 프로젝트"
 * />
 */
const ProfileBlock = forwardRef(function ProfileBlock({
  imageSrc,
  name,
  titles = [],
  projects = [],
  projectsLabel,
  sx,
  ...props
}, ref) {
  return (
    <Stack ref={ref} spacing={4} sx={sx} {...props}>
      {/* 프로필 이미지 */}
      {imageSrc ? (
        <Box
          component="img"
          src={imageSrc}
          alt={name}
          sx={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
      ) : (
        <Box
          sx={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            border: '1px dashed',
            borderColor: 'divider',
          }}
        />
      )}

      {/* 이름 + 타이틀 */}
      <Stack spacing={1}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          {name}
        </Typography>
        {titles.map((title) => (
          <Typography
            key={title}
            variant="body2"
            sx={{ color: 'text.secondary' }}
          >
            {title}
          </Typography>
        ))}
      </Stack>

      {/* 참여 프로젝트 */}
      {projects.length > 0 && (
        <Stack spacing={2}>
          {projectsLabel && (
            <Typography
              variant="caption"
              sx={{
                color: 'text.disabled',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              {projectsLabel}
            </Typography>
          )}
          <Stack spacing={1}>
            {projects.map((project, index) => (
              <Stack key={index} direction="row" spacing={2} alignItems="baseline">
                <Typography
                  variant="caption"
                  sx={{ color: 'text.disabled', flexShrink: 0 }}
                >
                  {project.year}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {project.title}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
});

export { ProfileBlock };

'use client';
import Box from '@mui/material/Box';

/**
 * PageContainer
 *
 * 페이지당 한 번만 사용하는 최상위 컨테이너.
 * 헤더 영역 패딩 등 페이지 수준의 통일 사항을 관리한다.
 * 개별 섹션의 콘텐츠 폭 제약은 SectionContainer가 담당.
 *
 * @param {node} children - 페이지 콘텐츠 [Required]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <PageContainer>
 *   <HeroSection />
 *   <ContentSection />
 * </PageContainer>
 */
export const PageContainer = ({ children, sx, ...props }) => {
  return (
    <Box
      sx={{
        width: '100%',
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

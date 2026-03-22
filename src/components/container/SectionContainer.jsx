'use client';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

/**
 * SectionContainer
 *
 * 페이지 내의 각 섹션을 구분하는 컨테이너입니다.
 * 기본적으로 콘텐츠 영역(max-width + 중앙정렬 + 좌우 gutter)이 적용되며,
 * isFullWidth로 전체 너비 모드를 사용할 수 있습니다.
 *
 * @param {node} children - 콘텐츠 [Required]
 * @param {boolean} isFullWidth - 전체 너비 모드 [Optional, 기본값: false]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <SectionContainer>콘텐츠 영역</SectionContainer>
 * <SectionContainer isFullWidth>풀 와이드 영역</SectionContainer>
 */
export const SectionContainer = ({ children, isFullWidth = false, sx, ...props }) => {
  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        py: { xs: 8, md: 16 },
        ...sx
      }}
      {...props}
    >
      {isFullWidth ? children : (
        <Container maxWidth="xl">
          {children}
        </Container>
      )}
    </Box>
  );
};


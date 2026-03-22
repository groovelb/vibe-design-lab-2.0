import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { SectionContainer } from './SectionContainer';
import { DocumentTitle, SectionTitle } from '../storybookDocumentation';
import Placeholder from '../../common/ui/Placeholder';

export default {
  title: 'Component/2. Container/SectionContainer',
  component: SectionContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

/**
 * ## 기본 사용법
 *
 * SectionContainer는 페이지 내의 각 섹션을 구분하는 컨테이너입니다.
 * - 기본 모드: 콘텐츠 영역(max-width + 중앙정렬 + 좌우 gutter) 자동 적용
 * - isFullWidth: 전체 너비 모드 (Hero, 가로 스크롤 등)
 * - section 태그로 시맨틱 마크업 적용
 */
export const Default = {
  render: () => (
    <Box>
      <DocumentTitle
        title="SectionContainer"
        status="Ready"
        note="콘텐츠 영역 제약 + 전체 너비 모드를 지원하는 섹션 컨테이너"
        brandName="Layout"
        systemName="Container"
        version="2.0"
      />

      <Box sx={{ py: 4 }}>
        <SectionTitle>기본 사용법 (콘텐츠 영역)</SectionTitle>
        <SectionContainer sx={{ bgcolor: 'grey.50', border: '2px dashed', borderColor: 'secondary.main' }}>
          <Typography variant="h6" gutterBottom color="secondary">
            SectionContainer
          </Typography>
          <Typography color="text.secondary">
            기본 모드에서는 Container maxWidth=&quot;xl&quot;이 자동 적용되어
            콘텐츠 폭이 제한됩니다.
          </Typography>
        </SectionContainer>
      </Box>
    </Box>
  ),
};

/**
 * ## 전체 너비 모드
 *
 * isFullWidth 사용 시 콘텐츠 영역 제약 없이 전체 너비로 확장됩니다.
 * Hero 섹션, 가로 스크롤 컨테이너 등에 사용합니다.
 */
export const FullWidth = {
  render: () => (
    <Box sx={{ py: 4 }}>
      <SectionTitle>전체 너비 모드 (isFullWidth)</SectionTitle>
      <SectionContainer isFullWidth sx={{ bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h3" gutterBottom>
          Full Width Section
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.8 }}>
          isFullWidth로 전체 너비를 사용합니다. Hero, 가로 스크롤 등에 적합합니다.
        </Typography>
      </SectionContainer>
    </Box>
  ),
};

/**
 * ## 여러 섹션 쌓기
 *
 * SectionContainer를 연속으로 배치하여 섹션을 구분합니다.
 * 각 섹션이 자체적으로 콘텐츠 폭을 결정합니다.
 */
export const StackingSections = {
  render: () => (
    <Box sx={{ py: 4 }}>
      <SectionTitle>여러 섹션 쌓기</SectionTitle>

      <SectionContainer isFullWidth sx={{ bgcolor: 'grey.900', color: 'white', py: { xs: 12, md: 20 } }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom>Hero (Full Width)</Typography>
          <Typography sx={{ opacity: 0.7 }}>isFullWidth — 전체 너비</Typography>
        </Box>
      </SectionContainer>

      <SectionContainer sx={{ bgcolor: 'grey.50' }}>
        <Typography variant="h5" gutterBottom>Content Section 1</Typography>
        <Typography>기본 모드 — 콘텐츠 영역 자동 제약</Typography>
      </SectionContainer>

      <SectionContainer isFullWidth sx={{ bgcolor: 'primary.dark', color: 'white' }}>
        <Typography variant="h5" gutterBottom sx={{ px: 4 }}>Full Width Section</Typography>
        <Typography sx={{ px: 4, opacity: 0.8 }}>isFullWidth — 전체 너비, 패딩은 직접 관리</Typography>
      </SectionContainer>

      <SectionContainer>
        <Typography variant="h5" gutterBottom>Content Section 2</Typography>
        <Typography>기본 모드 — 콘텐츠 영역 자동 제약</Typography>
      </SectionContainer>
    </Box>
  ),
};

/**
 * ## Props 문서
 */
export const Props = {
  render: () => (
    <Box sx={{ py: 4 }}>
      <SectionTitle>Props</SectionTitle>
      <SectionContainer>
        <Paper sx={{ p: 3 }}>
          <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', '& td, & th': { p: 1.5, borderBottom: '1px solid', borderColor: 'divider', textAlign: 'left' } }}>
            <thead>
              <tr>
                <th><Typography variant="subtitle2">Prop</Typography></th>
                <th><Typography variant="subtitle2">타입</Typography></th>
                <th><Typography variant="subtitle2">기본값</Typography></th>
                <th><Typography variant="subtitle2">설명</Typography></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><Typography variant="body2" sx={{ fontFamily: 'monospace' }}>children</Typography></td>
                <td><Typography variant="body2" color="text.secondary">node</Typography></td>
                <td><Typography variant="body2" color="text.secondary">-</Typography></td>
                <td><Typography variant="body2">섹션 내부 콘텐츠</Typography></td>
              </tr>
              <tr>
                <td><Typography variant="body2" sx={{ fontFamily: 'monospace' }}>isFullWidth</Typography></td>
                <td><Typography variant="body2" color="text.secondary">boolean</Typography></td>
                <td><Typography variant="body2" color="text.secondary">false</Typography></td>
                <td><Typography variant="body2">true: 전체 너비 / false: 콘텐츠 영역(Container maxWidth=&quot;xl&quot;) 자동 적용</Typography></td>
              </tr>
              <tr>
                <td><Typography variant="body2" sx={{ fontFamily: 'monospace' }}>sx</Typography></td>
                <td><Typography variant="body2" color="text.secondary">object</Typography></td>
                <td><Typography variant="body2" color="text.secondary">-</Typography></td>
                <td><Typography variant="body2">추가 스타일 (bgcolor, py 오버라이드 등)</Typography></td>
              </tr>
            </tbody>
          </Box>
        </Paper>
      </SectionContainer>
    </Box>
  ),
};

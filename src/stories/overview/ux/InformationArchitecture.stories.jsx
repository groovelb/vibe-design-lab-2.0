import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import {
  DocumentTitle,
  PageContainer,
  SectionTitle,
  SiteMapNode,
} from '../../../components/storybookDocumentation';
import {
  SITE_MAP,
  CONTENT_CLASSIFICATION,
  VALUE_MAP,
} from '../../../data/uxDocData';
import { GNB, FOOTER } from '../../../data/contents';

export default {
  title: 'Overview/UX/Information Architecture',
  parameters: {
    layout: 'padded',
  },
};

/** 정보 구조 (IA) 문서 */
export const Docs = {
  render: () => (
    <>
      <DocumentTitle
        title="Information Architecture"
        status="Available"
        note="사이트 구조, 콘텐츠 분류, 내비게이션 체계"
        brandName="Vibe Design Labs"
        systemName="UX Documentation"
        version="1.1"
      />
      <PageContainer>
        <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
          Information Architecture
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
          VDL 플랫폼의 페이지 구조, 섹션 구성, 콘텐츠 분류 원칙을 정의합니다.
        </Typography>

        {/* 사이트 맵 트리 */}
        <SectionTitle title="사이트 맵" description="페이지 → 섹션 계층 구조 (클릭하여 펼침/접기)" />
        <Box sx={ { p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, mb: 4 } }>
          <SiteMapNode node={ SITE_MAP } defaultOpen />
        </Box>

        {/* 콘텐츠 분류 */}
        <SectionTitle title="콘텐츠 분류" description="모든 페이지 콘텐츠는 4가지 유형으로 분류됩니다" />
        <TableContainer sx={ { mb: 4 } }>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>유형</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>기준</TableCell>
                <TableCell sx={ { fontWeight: 600, width: '50%' } }>해당 페이지</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { CONTENT_CLASSIFICATION.map((row) => (
                <TableRow key={ row.type }>
                  <TableCell sx={ { fontWeight: 600, whiteSpace: 'nowrap' } }>{ row.type }</TableCell>
                  <TableCell sx={ { color: 'text.secondary', fontSize: 13 } }>{ row.criterion }</TableCell>
                  <TableCell>
                    <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 0.5 } }>
                      { row.pages.map((page) => (
                        <Chip key={ page } label={ page } size="small" variant="outlined" sx={ { fontSize: 11 } } />
                      )) }
                    </Box>
                  </TableCell>
                </TableRow>
              )) }
            </TableBody>
          </Table>
        </TableContainer>

        {/* GNB 구조 */}
        <SectionTitle title="GNB 구조" description="글로벌 내비게이션 바 구성" />
        <Box sx={ { p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, mb: 4 } }>
          <Box sx={ { display: 'flex', alignItems: 'center', gap: 3, mb: 1 } }>
            <Typography sx={ { fontWeight: 700 } }>{ GNB.logo }</Typography>
            <Box sx={ { display: 'flex', gap: 2 } }>
              { GNB.menus.map((menu) => (
                <Typography
                  key={ menu.label }
                  sx={ { fontFamily: 'monospace', fontSize: 13, color: 'text.secondary' } }
                >
                  { menu.label }
                  <Typography component="span" sx={ { fontSize: 11, color: 'text.disabled', ml: 0.5 } }>
                    { menu.href }
                  </Typography>
                </Typography>
              )) }
            </Box>
            <Chip label={ GNB.cta } color="primary" size="small" />
          </Box>
        </Box>

        {/* Footer 구조 */}
        <SectionTitle title="Footer 구조" description="푸터 구성 요소" />
        <Box sx={ { p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, mb: 4 } }>
          <Typography variant="body2" sx={ { mb: 1 } }>{ FOOTER.tagline }</Typography>
          <Box sx={ { display: 'flex', gap: 2, mb: 1 } }>
            { FOOTER.menus.map((menu) => (
              <Typography key={ menu } sx={ { fontFamily: 'monospace', fontSize: 13, color: 'text.secondary' } }>
                { menu }
              </Typography>
            )) }
            <Chip label={ FOOTER.communityLink } size="small" variant="outlined" sx={ { fontSize: 11 } } />
          </Box>
          <Typography variant="caption" color="text.secondary">{ FOOTER.copyright }</Typography>
        </Box>

        {/* 핵심 가치 매핑 */}
        <SectionTitle title="핵심 가치 ↔ 화면 매핑" description="VDL의 핵심 가치가 어떤 화면에서 전달되는지" />
        <TableContainer sx={ { mb: 4 } }>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600, width: '30%' } }>핵심 가치</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>Landing 터치포인트</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>기타 터치포인트</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { VALUE_MAP.map((row) => (
                <TableRow key={ row.value }>
                  <TableCell sx={ { fontWeight: 600, fontSize: 13 } }>{ row.value }</TableCell>
                  <TableCell sx={ { fontSize: 13, color: 'text.secondary' } }>{ row.landingTouchpoint }</TableCell>
                  <TableCell sx={ { fontSize: 13, color: 'text.secondary' } }>{ row.otherTouchpoints }</TableCell>
                </TableRow>
              )) }
            </TableBody>
          </Table>
        </TableContainer>
      </PageContainer>
    </>
  ),
};

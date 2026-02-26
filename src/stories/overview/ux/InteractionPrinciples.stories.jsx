import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
  DocumentTitle,
  PageContainer,
  SectionTitle,
} from '../../../components/storybookDocumentation';
import {
  INTERACTION_PRINCIPLES,
  REPEATING_PATTERNS,
  INTERACTION_PATTERNS,
} from '../../../data/uxDocData';

export default {
  title: 'Overview/UX/Interaction Principles',
  parameters: {
    layout: 'padded',
  },
};

const CATEGORY_LABELS = {
  navigation: '내비게이션',
  scrollLayout: '스크롤 & 레이아웃',
  transitionMotion: '트랜지션 & 모션',
  feedbackStates: '피드백 & 상태',
  accessibility: '접근성',
};

/** 인터랙션 원칙 문서 */
export const Docs = {
  render: () => (
    <>
      <DocumentTitle
        title="Interaction Principles"
        status="Available"
        note="인터랙션 원칙, 반복 패턴, 인터랙션 패턴"
        brandName="Vibe Design Labs"
        systemName="UX Documentation"
        version="1.1"
      />
      <PageContainer>
        <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
          Interaction Principles
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
          VDL 플랫폼의 인터랙션 원칙, 반복 UI 패턴, 인터랙션 패턴을 정의합니다.
        </Typography>

        {/* 인터랙션 원칙 5카테고리 */}
        { Object.entries(INTERACTION_PRINCIPLES).map(([key, rules]) => (
          <Box key={ key }>
            <SectionTitle
              title={ CATEGORY_LABELS[key] || key }
              description={ `${rules.length}개 원칙` }
            />
            <TableContainer sx={ { mb: 4 } }>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={ { fontWeight: 600, width: 180 } }>원칙</TableCell>
                    <TableCell sx={ { fontWeight: 600 } }>규칙</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { rules.map((item) => (
                    <TableRow key={ item.principle }>
                      <TableCell sx={ { fontWeight: 600, whiteSpace: 'nowrap', fontSize: 13 } }>{ item.principle }</TableCell>
                      <TableCell sx={ { fontSize: 13, color: 'text.secondary' } }>{ item.rule }</TableCell>
                    </TableRow>
                  )) }
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )) }

        {/* 반복 UI 패턴 */}
        <SectionTitle title="반복 UI 패턴" description="여러 페이지에 걸쳐 반복 등장하는 UI 패턴" />
        <TableContainer sx={ { mb: 4 } }>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>패턴</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>사용 페이지</TableCell>
                <TableCell sx={ { fontWeight: 600, width: '40%' } }>설명</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { REPEATING_PATTERNS.map((item) => (
                <TableRow key={ item.pattern }>
                  <TableCell sx={ { fontWeight: 600, whiteSpace: 'nowrap', fontSize: 13 } }>{ item.pattern }</TableCell>
                  <TableCell sx={ { fontSize: 12, color: 'text.secondary' } }>{ item.pages }</TableCell>
                  <TableCell sx={ { fontSize: 13 } }>{ item.description }</TableCell>
                </TableRow>
              )) }
            </TableBody>
          </Table>
        </TableContainer>

        {/* 인터랙션 패턴 */}
        <SectionTitle title="인터랙션 패턴" description="사용자 조작에 반응하는 인터랙션 패턴" />
        <TableContainer sx={ { mb: 4 } }>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>패턴</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>사용 페이지</TableCell>
                <TableCell sx={ { fontWeight: 600, width: '40%' } }>설명</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { INTERACTION_PATTERNS.map((item) => (
                <TableRow key={ item.pattern }>
                  <TableCell sx={ { fontWeight: 600, whiteSpace: 'nowrap', fontSize: 13 } }>{ item.pattern }</TableCell>
                  <TableCell sx={ { fontSize: 12, color: 'text.secondary' } }>{ item.pages }</TableCell>
                  <TableCell sx={ { fontSize: 13 } }>{ item.description }</TableCell>
                </TableRow>
              )) }
            </TableBody>
          </Table>
        </TableContainer>
      </PageContainer>
    </>
  ),
};

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
  FlowStep,
} from '../../../components/storybookDocumentation';
import {
  USER_FLOWS,
  LANDING_NARRATIVE,
} from '../../../data/uxDocData';

export default {
  title: 'Overview/UX/User Flows',
  parameters: {
    layout: 'padded',
  },
};

const PRIORITY_COLORS = {
  Primary: 'error',
  Secondary: 'warning',
  Circular: 'info',
};

/** 유저 플로우 문서 */
export const Docs = {
  render: () => (
    <>
      <DocumentTitle
        title="User Flows"
        status="Available"
        note="4가지 핵심 유저 플로우와 Landing 전환 내러티브"
        brandName="Vibe Design Labs"
        systemName="UX Documentation"
        version="1.1"
      />
      <PageContainer>
        <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
          User Flows
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
          VDL 플랫폼의 4가지 유저 플로우와 Landing 페이지 전환 내러티브를 정의합니다.
        </Typography>

        {/* 플로우 요약 테이블 */}
        <SectionTitle title="플로우 개요" description="4가지 유저 플로우 요약" />
        <TableContainer sx={ { mb: 4 } }>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>ID</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>이름</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>우선순위</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>설명</TableCell>
                <TableCell sx={ { fontWeight: 600, width: '30%' } }>근거</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { USER_FLOWS.map((flow) => (
                <TableRow key={ flow.id }>
                  <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>{ flow.id }</TableCell>
                  <TableCell sx={ { fontWeight: 600, whiteSpace: 'nowrap' } }>
                    { flow.name }
                    <Typography component="span" sx={ { fontSize: 12, color: 'text.secondary', ml: 1 } }>
                      { flow.nameEn }
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={ flow.priority }
                      color={ PRIORITY_COLORS[flow.priority] || 'default' }
                      size="small"
                      variant="outlined"
                      sx={ { fontSize: 11 } }
                    />
                  </TableCell>
                  <TableCell sx={ { fontSize: 13 } }>{ flow.description }</TableCell>
                  <TableCell sx={ { fontSize: 13, color: 'text.secondary' } }>{ flow.rationale }</TableCell>
                </TableRow>
              )) }
            </TableBody>
          </Table>
        </TableContainer>

        {/* 각 플로우 상세 */}
        { USER_FLOWS.map((flow) => (
          <Box key={ flow.id }>
            <SectionTitle
              title={ `Flow ${flow.id.replace('flow-', '').toUpperCase()}: ${flow.name}` }
              description={ `${flow.nameEn} — ${flow.description}` }
            />
            <Box sx={ { pl: 1, mb: 4 } }>
              { flow.steps.map((step, idx) => (
                <FlowStep
                  key={ idx }
                  step={ idx + 1 }
                  label={ step.label }
                  type={ step.type }
                  detail={ step.detail }
                  isLast={ idx === flow.steps.length - 1 }
                />
              )) }
            </Box>
          </Box>
        )) }

        {/* Landing 전환 내러티브 */}
        <SectionTitle
          title="Landing 전환 내러티브"
          description="Landing 페이지 8단계 스크롤 내러티브 (전환 퍼널)"
        />
        <Box sx={ { pl: 1, mb: 4 } }>
          { LANDING_NARRATIVE.map((item) => (
            <FlowStep
              key={ item.step }
              step={ item.step }
              label={ `${item.section} — ${item.role}` }
              detail={ item.message }
              isLast={ item.step === LANDING_NARRATIVE.length }
            />
          )) }
        </Box>
      </PageContainer>
    </>
  ),
};

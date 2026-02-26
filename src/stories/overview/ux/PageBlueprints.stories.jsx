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
} from '../../../components/storybookDocumentation';
import { PAGE_BLUEPRINTS } from '../../../data/uxDocData';

export default {
  title: 'Overview/UX/Page Blueprints',
  parameters: {
    layout: 'padded',
  },
};

/**
 * 페이지 메타 정보 블록
 *
 * Props:
 * @param {object} blueprint - 페이지 블루프린트 데이터 [Required]
 */
const BlueprintMeta = ({ blueprint }) => (
  <Box
    sx={ {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 2,
      p: 2,
      mb: 2,
      backgroundColor: 'action.hover',
      borderRadius: 1,
    } }
  >
    <Box>
      <Typography variant="caption" color="text.secondary">경로</Typography>
      <Typography sx={ { fontFamily: 'monospace', fontSize: 13 } }>{ blueprint.path }</Typography>
    </Box>
    <Box sx={ { flex: 1, minWidth: 200 } }>
      <Typography variant="caption" color="text.secondary">목적</Typography>
      <Typography variant="body2">{ blueprint.purpose }</Typography>
    </Box>
    <Box>
      <Typography variant="caption" color="text.secondary">진입</Typography>
      <Typography variant="body2" sx={ { fontSize: 13 } }>{ blueprint.entry }</Typography>
    </Box>
    <Box>
      <Typography variant="caption" color="text.secondary">이탈</Typography>
      <Typography variant="body2" sx={ { fontSize: 13 } }>{ blueprint.exit }</Typography>
    </Box>
  </Box>
);

/** 페이지 블루프린트 문서 */
export const Docs = {
  render: () => (
    <>
      <DocumentTitle
        title="Page Blueprints"
        status="Available"
        note="페이지별 목적, 섹션 구성, 진입/이탈 경로"
        brandName="Vibe Design Labs"
        systemName="UX Documentation"
        version="1.1"
      />
      <PageContainer>
        <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
          Page Blueprints
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
          각 페이지의 목적, 섹션 구성, 진입·이탈 경로를 정의합니다.
        </Typography>

        { Object.entries(PAGE_BLUEPRINTS).map(([key, bp]) => (
          <Box key={ key }>
            <SectionTitle title={ bp.title } description={ bp.purpose } />
            <BlueprintMeta blueprint={ bp } />
            <TableContainer sx={ { mb: 4 } }>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={ { fontWeight: 600, width: 40 } }>#</TableCell>
                    <TableCell sx={ { fontWeight: 600 } }>섹션</TableCell>
                    { bp.sections[0]?.narrativeRole && (
                      <TableCell sx={ { fontWeight: 600 } }>역할</TableCell>
                    ) }
                    <TableCell sx={ { fontWeight: 600, width: '35%' } }>설명</TableCell>
                    <TableCell sx={ { fontWeight: 600, width: '25%' } }>핵심 요소</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { bp.sections.map((section) => (
                    <TableRow key={ section.order }>
                      <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>{ section.order }</TableCell>
                      <TableCell sx={ { fontWeight: 600, whiteSpace: 'nowrap', fontSize: 13 } }>{ section.name }</TableCell>
                      { section.narrativeRole !== undefined && (
                        <TableCell>
                          <Chip
                            label={ section.narrativeRole }
                            size="small"
                            color="secondary"
                            variant="outlined"
                            sx={ { fontSize: 11 } }
                          />
                        </TableCell>
                      ) }
                      <TableCell sx={ { fontSize: 13, color: 'text.secondary' } }>{ section.description }</TableCell>
                      <TableCell sx={ { fontSize: 12, color: 'text.secondary' } }>{ section.keyElements }</TableCell>
                    </TableRow>
                  )) }
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )) }
      </PageContainer>
    </>
  ),
};

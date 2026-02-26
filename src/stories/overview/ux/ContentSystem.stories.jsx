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
import { MESSAGE_TONE } from '../../../data/uxDocData';
import {
  PERSONAS,
  CTA_LABELS,
  COHORT_BADGES,
  STATUS_MESSAGES,
  POSITIONING,
  MYTH_BUSTING,
  TIME_HORIZON,
  COMPARISON_TABLE,
} from '../../../data/contents';

export default {
  title: 'Overview/UX/Content System',
  parameters: {
    layout: 'padded',
  },
};

/** 콘텐츠 시스템 문서 */
export const Docs = {
  render: () => {
    const personaEntries = Object.entries(PERSONAS);
    const statusCategories = Object.entries(STATUS_MESSAGES);

    return (
      <>
        <DocumentTitle
          title="Content System"
          status="Available"
          note="메시지 톤, 페르소나, CTA, 상태 메시지, 포지셔닝"
          brandName="Vibe Design Labs"
          systemName="UX Documentation"
          version="1.0"
        />
        <PageContainer>
          <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
            Content System
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
            VDL의 메시지 톤, 페르소나별 문구, CTA 패턴, 상태 메시지를 정의합니다.
          </Typography>

          {/* 메시지 톤 */}
          <SectionTitle title="메시지 톤 5축" description="모든 VDL 텍스트가 따르는 5가지 톤 원칙" />
          <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 } }>
            { MESSAGE_TONE.map((tone) => (
              <Box
                key={ tone.axis }
                sx={ {
                  flex: '1 1 220px',
                  p: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                } }
              >
                <Typography variant="h6" sx={ { fontWeight: 700, mb: 0.5 } }>{ tone.axis }</Typography>
                <Typography variant="body2" color="text.secondary" sx={ { mb: 1 } }>{ tone.rule }</Typography>
                <Typography
                  variant="caption"
                  sx={ { fontFamily: 'monospace', color: 'text.secondary', whiteSpace: 'pre-line' } }
                >
                  { tone.example }
                </Typography>
              </Box>
            )) }
          </Box>

          {/* 페르소나별 문구 */}
          <SectionTitle title="페르소나별 핵심 문구" description="3개 타겟 페르소나의 핵심 메시지" />
          <TableContainer sx={ { mb: 4 } }>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600 } }>페르소나</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>Pain Point</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>전환 메시지</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>도착 상태</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>정체성 보호</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { personaEntries.map(([key, p]) => (
                  <TableRow key={ key }>
                    <TableCell sx={ { fontWeight: 600, whiteSpace: 'nowrap' } }>{ p.label }</TableCell>
                    <TableCell sx={ { fontSize: 13 } }>{ p.painPoint }</TableCell>
                    <TableCell sx={ { fontSize: 13 } }>{ p.conversionMessage }</TableCell>
                    <TableCell sx={ { fontSize: 13 } }>{ p.arrival }</TableCell>
                    <TableCell sx={ { fontSize: 13, color: 'text.secondary' } }>{ p.identityProtection }</TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>

          {/* CTA 패턴 */}
          <SectionTitle title="CTA 패턴" description="위치별 CTA 라벨" />
          <TableContainer sx={ { mb: 4 } }>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600 } }>위치</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>라벨</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { Object.entries(CTA_LABELS).map(([key, label]) => (
                  <TableRow key={ key }>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>{ key }</TableCell>
                    <TableCell>{ label }</TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>

          {/* 코호트 뱃지 */}
          <SectionTitle title="코호트 뱃지" description="코스 카드에 표시되는 코호트 상태 뱃지" />
          <Box sx={ { display: 'flex', gap: 1, mb: 4 } }>
            <Chip label={ COHORT_BADGES.recruiting } color="success" size="small" />
            <Chip label={ COHORT_BADGES.ongoing(3) } color="primary" size="small" />
            <Chip label={ COHORT_BADGES.upcoming(4) } color="default" size="small" variant="outlined" />
          </Box>

          {/* 상태 메시지 */}
          <SectionTitle title="상태 메시지" description="에러, 빈 상태, 성공 메시지" />
          { statusCategories.map(([category, messages]) => (
            <Box key={ category } sx={ { mb: 3 } }>
              <Typography variant="subtitle2" sx={ { fontWeight: 600, mb: 1, textTransform: 'capitalize' } }>
                { category }
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={ { fontWeight: 600, width: 200 } }>키</TableCell>
                      <TableCell sx={ { fontWeight: 600 } }>메시지</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    { Object.entries(messages).map(([key, msg]) => (
                      <TableRow key={ key }>
                        <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>{ key }</TableCell>
                        <TableCell sx={ { fontSize: 13 } }>{ msg }</TableCell>
                      </TableRow>
                    )) }
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )) }

          {/* 포지셔닝 */}
          <SectionTitle title="포지셔닝" description="VDL이 아닌 것 vs VDL인 것" />
          <TableContainer sx={ { mb: 4 } }>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600, color: 'error.main' } }>VDL이 아닌 것</TableCell>
                  <TableCell sx={ { fontWeight: 600, color: 'success.main' } }>VDL인 것</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { POSITIONING.map((row, idx) => (
                  <TableRow key={ idx }>
                    <TableCell sx={ { fontSize: 13, color: 'text.secondary' } }>{ row.not }</TableCell>
                    <TableCell sx={ { fontSize: 13, fontWeight: 500 } }>{ row.is }</TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>

          {/* 편견 깨기 */}
          <SectionTitle title="편견 깨기 (Myth-Busting)" description="VDL이 반전시키는 3가지 통념" />
          <TableContainer sx={ { mb: 4 } }>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600 } }>통념</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>기존 관점</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>VDL 반전</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>핵심 문구</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { MYTH_BUSTING.map((row) => (
                  <TableRow key={ row.id }>
                    <TableCell sx={ { fontWeight: 600, fontSize: 13 } }>{ row.myth }</TableCell>
                    <TableCell sx={ { fontSize: 13, color: 'text.secondary' } }>{ row.conventional }</TableCell>
                    <TableCell sx={ { fontSize: 13 } }>{ row.reversal }</TableCell>
                    <TableCell sx={ { fontSize: 12, fontStyle: 'italic', color: 'text.secondary' } }>{ row.keyPhrase }</TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>

          {/* 약속의 시간축 */}
          <SectionTitle title="약속의 시간축" description="수강생이 얻게 되는 3단계 변화" />
          <Box sx={ { display: 'flex', gap: 2, mb: 4 } }>
            { TIME_HORIZON.map((item, idx) => (
              <Box
                key={ item.horizon }
                sx={ {
                  flex: 1,
                  p: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  position: 'relative',
                } }
              >
                <Chip
                  label={ `${item.horizon} · ${item.label}` }
                  size="small"
                  color={ idx === 0 ? 'primary' : idx === 1 ? 'secondary' : 'default' }
                  sx={ { mb: 1 } }
                />
                <Typography variant="body2" sx={ { fontWeight: 600, mb: 0.5 } }>{ item.keyPhrase }</Typography>
                <Typography variant="caption" color="text.secondary">{ item.subCopy }</Typography>
              </Box>
            )) }
          </Box>

          {/* VOD vs VDL 비교 */}
          <SectionTitle title="VOD vs VDL 비교" description="기존 VOD 강의와 VDL 학습의 차이" />
          <TableContainer sx={ { mb: 4 } }>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600 } }>카테고리</TableCell>
                  <TableCell sx={ { fontWeight: 600, color: 'text.secondary' } }>기존 VOD</TableCell>
                  <TableCell sx={ { fontWeight: 600, color: 'primary.main' } }>VDL</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { COMPARISON_TABLE.map((row) => (
                  <TableRow key={ row.category }>
                    <TableCell sx={ { fontWeight: 600, whiteSpace: 'nowrap', fontSize: 13 } }>{ row.category }</TableCell>
                    <TableCell sx={ { fontSize: 13, color: 'text.secondary' } }>{ row.vod }</TableCell>
                    <TableCell sx={ { fontSize: 13 } }>{ row.vdl }</TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>
        </PageContainer>
      </>
    );
  },
};

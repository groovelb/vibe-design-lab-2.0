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
  BRAND,
  PHILOSOPHY,
  VALUE_PROPOSITIONS,
  PERSONAS,
  POSITIONING,
  MYTH_BUSTING,
  TIME_HORIZON,
  COMPARISON_TABLE,
  ENGLISH_ONLY_TERMS,
  VISUAL_ASSETS,
} from '../../../data/contents';

export default {
  title: 'Overview/UX/Verbal Branding',
  parameters: {
    layout: 'padded',
  },
};

/** VDL 버벌 브랜딩 — 세계관 계층 */
export const Docs = {
  render: () => {
    const personaEntries = Object.entries(PERSONAS);

    return (
      <>
        <DocumentTitle
          title="Verbal Branding"
          status="Available"
          note="브랜드 정체성, 철학, 가치 제안, 페르소나, 포지셔닝, 편견 깨기, 시각 자산"
          brandName="Vibe Design Labs"
          systemName="UX Documentation"
          version="1.0"
        />
        <PageContainer>
          <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
            Verbal Branding
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
            VDL의 세계관을 구성하는 브랜드 정체성, 철학, 포지셔닝, 시각 자산 체계.
          </Typography>

          {/* ──────────────── 1. 브랜드 고정 문구 ──────────────── */}
          <SectionTitle title="1. 브랜드 고정 문구" description="변경 불가. BRAND 객체" />
          <TableContainer sx={ { mb: 4 } }>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600, width: 160 } }>키</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>값</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { Object.entries(BRAND).map(([key, value]) => (
                  <TableRow key={ key }>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>{ key }</TableCell>
                    <TableCell sx={ { fontSize: 13 } }>{ value }</TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>

          {/* ──────────────── 2. Vibe Philosophy ──────────────── */}
          <SectionTitle title="2. Vibe Philosophy" description="세 가지 신념. PHILOSOPHY 배열" />
          <Box sx={ { display: 'flex', gap: 2, mb: 4 } }>
            { PHILOSOPHY.map((item) => (
              <Box
                key={ item.id }
                sx={ {
                  flex: 1,
                  p: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                } }
              >
                <Chip label={ item.domain } size="small" color="primary" sx={ { mb: 1 } } />
                <Typography variant="subtitle2" sx={ { fontWeight: 700, mb: 0.5 } }>{ item.belief }</Typography>
                <Typography variant="body2" color="text.secondary" sx={ { mb: 1 } }>{ item.description }</Typography>
                <Typography variant="caption" sx={ { fontFamily: 'monospace', color: 'text.secondary' } }>
                  derivedValue: { item.derivedValue }
                </Typography>
              </Box>
            )) }
          </Box>

          {/* ──────────────── 3. 가치 제안 ──────────────── */}
          <SectionTitle title="3. 가치 제안 (Value Proposition)" description="세 단계. VALUE_PROPOSITIONS 배열" />
          <TableContainer sx={ { mb: 4 } }>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600, width: 60 } }>Step</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>Name</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>설명</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>Short</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { VALUE_PROPOSITIONS.map((vp) => (
                  <TableRow key={ vp.step }>
                    <TableCell sx={ { fontWeight: 600 } }>{ vp.step }</TableCell>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 12, whiteSpace: 'nowrap' } }>{ vp.name }</TableCell>
                    <TableCell sx={ { fontSize: 13 } }>{ vp.description }</TableCell>
                    <TableCell sx={ { fontSize: 13 } }>{ vp.shortVersion }</TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>

          {/* ──────────────── 메시지 톤 ──────────────── */}
          <SectionTitle title="메시지 톤 5축" description="모든 VDL 텍스트가 따르는 5가지 톤 원칙 (MESSAGE_TONE)" />
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

          {/* ──────────────── 4. 페르소나 ──────────────── */}
          <SectionTitle title="4. 페르소나별 핵심 문구" description="3개 타겟 페르소나의 핵심 메시지. PERSONAS 객체" />
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

          {/* ──────────────── 10. 포지셔닝 ──────────────── */}
          <SectionTitle title="5. 포지셔닝" description="VDL이 아닌 것 vs VDL인 것. POSITIONING 배열" />
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

          {/* ──────────────── 11. 편견 깨기 ──────────────── */}
          <SectionTitle title="6. 편견 깨기 (Myth-Busting)" description="VDL이 반전시키는 3가지 통념. MYTH_BUSTING 배열" />
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

          {/* ──────────────── 12. 약속의 시간축 ──────────────── */}
          <SectionTitle title="7. 약속의 시간축" description="수강생이 얻게 되는 3단계 변화. TIME_HORIZON 배열" />
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

          {/* ──────────────── VOD vs VDL ──────────────── */}
          <SectionTitle title="8. VOD vs VDL 비교" description="기존 VOD 강의와 VDL 학습의 차이. COMPARISON_TABLE 배열" />
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

          {/* ──────────────── 13. 영문 고정 키워드 ──────────────── */}
          <SectionTitle title="9. 영문 고정 키워드" description="한국어 전용 Phase에서도 영문을 유지하는 용어. ENGLISH_ONLY_TERMS 배열" />
          <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 } }>
            { ENGLISH_ONLY_TERMS.map((term) => (
              <Chip key={ term } label={ term } size="small" variant="outlined" />
            )) }
          </Box>

          {/* ──────────────── 14. 브랜드 시각 자산 ──────────────── */}
          <SectionTitle title="10. 브랜드 시각 자산" description="VISUAL_ASSETS 객체 — 로고, 모티프, 일러스트, SNS 템플릿" />

          {/* 로고 시스템 */}
          <Typography variant="subtitle2" sx={ { fontWeight: 700, mb: 1 } }>로고 시스템 (6종)</Typography>
          <TableContainer sx={ { mb: 3 } }>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600 } }>ID</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>이름</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>설명</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>Transform</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>용도</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { VISUAL_ASSETS.logo.map((item) => (
                  <TableRow key={ item.id }>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>{ item.id }</TableCell>
                    <TableCell sx={ { fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' } }>{ item.name }</TableCell>
                    <TableCell sx={ { fontSize: 13 } }>{ item.description }</TableCell>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 11, color: 'text.secondary' } }>{ item.transform }</TableCell>
                    <TableCell sx={ { fontSize: 13, color: 'text.secondary' } }>{ item.usage }</TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>

          {/* 그래픽 모티프 */}
          <Typography variant="subtitle2" sx={ { fontWeight: 700, mb: 1 } }>그래픽 모티프 (4종)</Typography>
          <TableContainer sx={ { mb: 3 } }>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600 } }>이름</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>설명</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>용도</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { VISUAL_ASSETS.motifs.map((item) => (
                  <TableRow key={ item.id }>
                    <TableCell sx={ { fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' } }>{ item.name }</TableCell>
                    <TableCell sx={ { fontSize: 13 } }>{ item.description }</TableCell>
                    <TableCell sx={ { fontSize: 13, color: 'text.secondary' } }>{ item.usage }</TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>

          {/* 키 일러스트레이션 */}
          <Typography variant="subtitle2" sx={ { fontWeight: 700, mb: 1 } }>키 일러스트레이션 (3종)</Typography>
          <TableContainer sx={ { mb: 3 } }>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600 } }>이름</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>설명</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>스타일</TableCell>
                  <TableCell sx={ { fontWeight: 600, width: 80 } }>우선순위</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { VISUAL_ASSETS.keyIllustrations.map((item) => (
                  <TableRow key={ item.id }>
                    <TableCell sx={ { fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' } }>{ item.name }</TableCell>
                    <TableCell sx={ { fontSize: 13 } }>{ item.description }</TableCell>
                    <TableCell sx={ { fontSize: 12, color: 'text.secondary' } }>{ item.style }</TableCell>
                    <TableCell>
                      <Chip
                        label={ item.priority }
                        size="small"
                        color={ item.priority === 'high' ? 'error' : 'default' }
                        variant="outlined"
                      />
                    </TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>

          {/* Philosophy 일러스트 */}
          <Typography variant="subtitle2" sx={ { fontWeight: 700, mb: 1 } }>Philosophy 일러스트 (3종)</Typography>
          <TableContainer sx={ { mb: 3 } }>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600 } }>신념</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>일러스트명</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>설명</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>스타일</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { VISUAL_ASSETS.philosophy.map((item) => (
                  <TableRow key={ item.id }>
                    <TableCell sx={ { fontSize: 13, fontWeight: 600 } }>{ item.belief }</TableCell>
                    <TableCell sx={ { fontSize: 13, whiteSpace: 'nowrap' } }>{ item.name }</TableCell>
                    <TableCell sx={ { fontSize: 13 } }>{ item.description }</TableCell>
                    <TableCell sx={ { fontSize: 12, color: 'text.secondary' } }>{ item.style }</TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>

          {/* Value Proposition 일러스트 */}
          <Typography variant="subtitle2" sx={ { fontWeight: 700, mb: 1 } }>Value Proposition 일러스트 (3종)</Typography>
          <TableContainer sx={ { mb: 3 } }>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600, width: 60 } }>Step</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>Name</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>비주얼 컨셉</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>스타일</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { VISUAL_ASSETS.valueProposition.map((item) => (
                  <TableRow key={ item.id }>
                    <TableCell sx={ { fontWeight: 600 } }>{ item.step }</TableCell>
                    <TableCell sx={ { fontSize: 13, fontFamily: 'monospace', whiteSpace: 'nowrap' } }>{ item.name }</TableCell>
                    <TableCell sx={ { fontSize: 13 } }>{ item.visualConcept }</TableCell>
                    <TableCell sx={ { fontSize: 12, color: 'text.secondary' } }>{ item.style }</TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>

          {/* Myth-Busting 시각 자산 */}
          <Typography variant="subtitle2" sx={ { fontWeight: 700, mb: 1 } }>Myth-Busting 시각 자산 (3종)</Typography>
          <TableContainer sx={ { mb: 3 } }>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600 } }>통념</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>비주얼 컨셉</TableCell>
                  <TableCell sx={ { fontWeight: 600, width: 140 } }>Philosophy Ref</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { VISUAL_ASSETS.mythBusting.map((item) => (
                  <TableRow key={ item.id }>
                    <TableCell sx={ { fontSize: 13, fontWeight: 600 } }>{ item.myth }</TableCell>
                    <TableCell sx={ { fontSize: 13 } }>{ item.visualConcept }</TableCell>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 12, color: 'text.secondary' } }>{ item.philosophyRef }</TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>

          {/* SNS 콘텐츠 시각 템플릿 */}
          <Typography variant="subtitle2" sx={ { fontWeight: 700, mb: 1 } }>SNS 콘텐츠 시각 템플릿 (4종)</Typography>
          <TableContainer sx={ { mb: 4 } }>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600 } }>패턴</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>설명</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>스타일</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { VISUAL_ASSETS.snsTemplates.map((item) => (
                  <TableRow key={ item.id }>
                    <TableCell sx={ { fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' } }>{ item.pattern }</TableCell>
                    <TableCell sx={ { fontSize: 13 } }>{ item.description }</TableCell>
                    <TableCell sx={ { fontSize: 12, color: 'text.secondary' } }>{ item.style }</TableCell>
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

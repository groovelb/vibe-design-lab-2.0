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
import {
  TONE_BLACKLIST,
  TONE_WHITELIST,
  TONE_REGISTER,
  CHANNEL_TONE,
  CONTENT_PATTERNS,
  TITLE_FORMULA,
  FRAMING_PRINCIPLES,
  CONTENT_MIX,
  FOUNDER_VOICE,
  VDL_TERMS,
  TERM_REPLACEMENTS,
  VOCABULARY_LEVELS,
  BEFORE_AFTER_CLOSING,
  WEBSITE_COPY,
  PROBLEM_DEFINITION,
} from '../../../data/verbalIdentity';

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

          {/* ──────────────── 문제 정의 ──────────────── */}
          <SectionTitle title="5. 문제 정의" description="시장 문제 + 학습 문제. 각각 문장형(선언)과 문단형(풀어쓰기). PROBLEM_DEFINITION 객체" />

          <Typography variant="subtitle2" sx={ { fontWeight: 700, mb: 1 } }>시장 문제</Typography>
          <Box sx={ { p: 2, border: '1px solid', borderColor: 'divider', mb: 2 } }>
            <Typography variant="caption" color="text.secondary" sx={ { display: 'block', mb: 0.5 } }>문장형</Typography>
            <Typography variant="body2" sx={ { fontWeight: 600, mb: 2 } }>
              &ldquo;{ PROBLEM_DEFINITION.market.sentence }&rdquo;
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={ { display: 'block', mb: 0.5 } }>문단형</Typography>
            { PROBLEM_DEFINITION.market.lines.map((line, idx) => (
              <Box key={ idx } sx={ { display: 'flex', gap: 1.5, mb: idx < PROBLEM_DEFINITION.market.lines.length - 1 ? 0.5 : 0 } }>
                <Typography variant="caption" sx={ { fontFamily: 'monospace', color: 'text.secondary', whiteSpace: 'nowrap', minWidth: 200, pt: 0.25 } }>
                  { line.intent }
                </Typography>
                <Typography variant="body2" sx={ { lineHeight: 1.8 } }>{ line.text }</Typography>
              </Box>
            )) }
          </Box>
          <TableContainer sx={ { mb: 3 } }>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600 } }>페르소나</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>페인포인트</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>구조적 원인</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>VDL 솔루션</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>도달 상태</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { PROBLEM_DEFINITION.market.details.map((item) => (
                  <TableRow key={ item.persona }>
                    <TableCell sx={ { fontWeight: 600, whiteSpace: 'nowrap', fontSize: 13 } }>{ item.persona }</TableCell>
                    <TableCell sx={ { fontSize: 13 } }>{ item.painPoint }</TableCell>
                    <TableCell sx={ { fontSize: 13, color: 'text.secondary' } }>{ item.structuralCause }</TableCell>
                    <TableCell sx={ { fontSize: 13 } }>{ item.solution }</TableCell>
                    <TableCell sx={ { fontSize: 13, fontWeight: 500 } }>{ item.arrival }</TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="subtitle2" sx={ { fontWeight: 700, mb: 1 } }>학습 문제</Typography>
          <Box sx={ { p: 2, border: '1px solid', borderColor: 'divider', mb: 2 } }>
            <Typography variant="caption" color="text.secondary" sx={ { display: 'block', mb: 0.5 } }>문장형</Typography>
            <Typography variant="body2" sx={ { fontWeight: 600, mb: 2 } }>
              &ldquo;{ PROBLEM_DEFINITION.learning.sentence }&rdquo;
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={ { display: 'block', mb: 0.5 } }>문단형</Typography>
            { PROBLEM_DEFINITION.learning.lines.map((line, idx) => (
              <Box key={ idx } sx={ { display: 'flex', gap: 1.5, mb: idx < PROBLEM_DEFINITION.learning.lines.length - 1 ? 0.5 : 0 } }>
                <Typography variant="caption" sx={ { fontFamily: 'monospace', color: 'text.secondary', whiteSpace: 'nowrap', minWidth: 200, pt: 0.25 } }>
                  { line.intent }
                </Typography>
                <Typography variant="body2" sx={ { lineHeight: 1.8 } }>{ line.text }</Typography>
              </Box>
            )) }
          </Box>
          <TableContainer sx={ { mb: 4 } }>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600 } }>문제</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>원인</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>VDL 접근</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { PROBLEM_DEFINITION.learning.details.map((item) => (
                  <TableRow key={ item.problem }>
                    <TableCell sx={ { fontWeight: 600, whiteSpace: 'nowrap', fontSize: 13 } }>{ item.problem }</TableCell>
                    <TableCell sx={ { fontSize: 13, color: 'text.secondary' } }>{ item.cause }</TableCell>
                    <TableCell sx={ { fontSize: 13 } }>{ item.approach }</TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>

          {/* ──────────────── 포지셔닝 ──────────────── */}
          <SectionTitle title="6. 포지셔닝" description="VDL이 아닌 것 vs VDL인 것. POSITIONING 배열" />
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
          <SectionTitle title="7. 편견 깨기 (Myth-Busting)" description="VDL이 반전시키는 3가지 통념. MYTH_BUSTING 배열" />
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
          <SectionTitle title="8. 약속의 시간축" description="수강생이 얻게 되는 3단계 변화. TIME_HORIZON 배열" />
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
          <SectionTitle title="9. VOD vs VDL 비교" description="기존 VOD 강의와 VDL 학습의 차이. COMPARISON_TABLE 배열" />
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
          <SectionTitle title="10. 영문 고정 키워드" description="한국어 전용 Phase에서도 영문을 유지하는 용어. ENGLISH_ONLY_TERMS 배열" />
          <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 } }>
            { ENGLISH_ONLY_TERMS.map((term) => (
              <Chip key={ term } label={ term } size="small" variant="outlined" />
            )) }
          </Box>

          {/* ──────────────── 11. 블랙리스트 / 화이트리스트 ──────────────── */}
          <SectionTitle title="12. 톤 블랙리스트" description="§2.2 절대 쓰지 않는 표현" />
          <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 } }>
            { Object.entries(TONE_BLACKLIST).map(([category, words]) => (
              <Box key={ category } sx={ { flex: '1 1 200px' } }>
                <Typography variant="caption" sx={ { fontFamily: 'monospace', color: 'text.secondary', mb: 0.5, display: 'block' } }>
                  { category }
                </Typography>
                <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 0.5 } }>
                  { words.map((w) => (
                    <Chip key={ w } label={ w } size="small" color="error" variant="outlined" />
                  )) }
                </Box>
              </Box>
            )) }
          </Box>

          <SectionTitle title="13. 톤 화이트리스트" description="§2.3 권장 표현" />
          <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 } }>
            { Object.entries(TONE_WHITELIST).map(([category, words]) => (
              <Box key={ category } sx={ { flex: '1 1 200px' } }>
                <Typography variant="caption" sx={ { fontFamily: 'monospace', color: 'text.secondary', mb: 0.5, display: 'block' } }>
                  { category }
                </Typography>
                <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 0.5 } }>
                  { words.map((w) => (
                    <Chip key={ w } label={ w } size="small" variant="outlined" />
                  )) }
                </Box>
              </Box>
            )) }
          </Box>

          {/* ──────────────── 13. 완급 조절 ──────────────── */}
          <SectionTitle title="14. 완급 조절" description="§2.4 합니다/해요 혼용 규칙" />
          <TableContainer sx={ { mb: 4 } }>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600, width: 100 } }>스타일</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>역할</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>예시</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { TONE_REGISTER.map((item) => (
                  <TableRow key={ item.style }>
                    <TableCell sx={ { fontWeight: 600, fontSize: 13 } }>{ item.style }</TableCell>
                    <TableCell sx={ { fontSize: 13 } }>{ item.role }</TableCell>
                    <TableCell sx={ { fontSize: 13, color: 'text.secondary' } }>{ item.example }</TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>

          {/* ──────────────── 14. 채널별 톤 ──────────────── */}
          <SectionTitle title="15. 채널별 톤 조절" description="§2.5 보이스는 동일하되, 톤의 온도가 다르다" />
          <TableContainer sx={ { mb: 4 } }>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600 } }>채널</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>톤</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>문장 스타일</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>예시</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { CHANNEL_TONE.map((item) => (
                  <TableRow key={ item.channel }>
                    <TableCell sx={ { fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap' } }>{ item.channel }</TableCell>
                    <TableCell sx={ { fontSize: 13 } }>{ item.tone }</TableCell>
                    <TableCell sx={ { fontSize: 13 } }>{ item.style }</TableCell>
                    <TableCell sx={ { fontSize: 12, color: 'text.secondary' } }>{ item.example }</TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>

          {/* ──────────────── 15. 고성과 글 패턴 ──────────────── */}
          <SectionTitle title="16. 고성과 글 패턴" description="§3.2 콘텐츠 구조 패턴" />
          <Box sx={ { display: 'flex', flexDirection: 'column', gap: 2, mb: 4 } }>
            { CONTENT_PATTERNS.map((pattern) => (
              <Box
                key={ pattern.id }
                sx={ { p: 2, border: '1px solid', borderColor: 'divider' } }
              >
                <Typography variant="subtitle2" sx={ { fontWeight: 700, mb: 0.5 } }>{ pattern.name }</Typography>
                <Typography variant="body2" color="text.secondary" sx={ { mb: 1 } }>{ pattern.description }</Typography>
                <Typography variant="caption" color="text.secondary">맥락: { pattern.context }</Typography>
                { pattern.example && (
                  <Typography
                    variant="body2"
                    sx={ { mt: 1, p: 1.5, bgcolor: 'background.paper', fontFamily: 'monospace', fontSize: 12, whiteSpace: 'pre-line' } }
                  >
                    { pattern.example }
                  </Typography>
                ) }
                { pattern.examples && (
                  <Box sx={ { mt: 1, p: 1.5, bgcolor: 'background.paper' } }>
                    { pattern.examples.map((ex, i) => (
                      <Typography key={ i } variant="body2" sx={ { fontFamily: 'monospace', fontSize: 12 } }>{ ex }</Typography>
                    )) }
                  </Box>
                ) }
              </Box>
            )) }
          </Box>

          {/* ──────────────── 16. 제목 공식 ──────────────── */}
          <SectionTitle title="17. 제목 공식" description="§3.3 제목 구조와 예시" />
          <Typography variant="body2" sx={ { fontFamily: 'monospace', mb: 2 } }>{ TITLE_FORMULA.structure }</Typography>
          <TableContainer sx={ { mb: 2 } }>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600 } }>구조</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>제목</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { TITLE_FORMULA.examples.map((item) => (
                  <TableRow key={ item.title }>
                    <TableCell sx={ { fontSize: 13, whiteSpace: 'nowrap' } }>{ item.structure }</TableCell>
                    <TableCell sx={ { fontSize: 13 } }>{ item.title }</TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 4 } }>
            <Typography variant="caption" color="text.secondary" sx={ { mr: 1 } }>블랙리스트:</Typography>
            { TITLE_FORMULA.blacklist.map((b) => (
              <Chip key={ b } label={ b } size="small" color="error" variant="outlined" />
            )) }
          </Box>

          {/* ──────────────── 17. 프레이밍 원칙 ──────────────── */}
          <SectionTitle title="18. 프레이밍 원칙" description="§3.4 제품이 아니라 변화를 말한다" />
          <TableContainer sx={ { mb: 4 } }>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600, color: 'text.secondary' } }>❌ 제품 프레이밍</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>✅ 변화 프레이밍</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { FRAMING_PRINCIPLES.map((item) => (
                  <TableRow key={ item.product }>
                    <TableCell sx={ { fontSize: 13, color: 'text.secondary' } }>{ item.product }</TableCell>
                    <TableCell sx={ { fontSize: 13, fontWeight: 500 } }>{ item.change }</TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>

          {/* ──────────────── 18. 콘텐츠 유형 믹스 ──────────────── */}
          <SectionTitle title="19. 콘텐츠 유형 믹스" description="§4.2 유형별 비중" />
          <TableContainer sx={ { mb: 4 } }>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600 } }>유형</TableCell>
                  <TableCell sx={ { fontWeight: 600, width: 80 } }>비중</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>설명</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { CONTENT_MIX.map((item) => (
                  <TableRow key={ item.type }>
                    <TableCell sx={ { fontSize: 13, fontWeight: 600 } }>{ item.type }</TableCell>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>{ item.ratio }</TableCell>
                    <TableCell sx={ { fontSize: 13, color: 'text.secondary' } }>{ item.description }</TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>

          {/* ──────────────── 19. 파운더 보이스 ──────────────── */}
          <SectionTitle title="20. 파운더(DDD) 보이스 규칙" description="§4.4 개인 vs 브랜드" />
          <TableContainer sx={ { mb: 4 } }>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600 } }>구분</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>DDD 개인</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>VDL 브랜드</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { FOUNDER_VOICE.map((item) => (
                  <TableRow key={ item.aspect }>
                    <TableCell sx={ { fontWeight: 600, fontSize: 13 } }>{ item.aspect }</TableCell>
                    <TableCell sx={ { fontSize: 13 } }>{ item.personal }</TableCell>
                    <TableCell sx={ { fontSize: 13 } }>{ item.brand }</TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>

          {/* ──────────────── 20. VDL 고유 용어 ──────────────── */}
          <SectionTitle title="21. VDL 고유 용어" description="§5.1 브랜드 고유 용어 정의" />
          <TableContainer sx={ { mb: 4 } }>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600 } }>용어</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>정의</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>사용 맥락</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { VDL_TERMS.map((item) => (
                  <TableRow key={ item.term }>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap' } }>{ item.term }</TableCell>
                    <TableCell sx={ { fontSize: 13 } }>{ item.definition }</TableCell>
                    <TableCell sx={ { fontSize: 13, color: 'text.secondary' } }>{ item.context }</TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>

          {/* ──────────────── 21. 대체 용어 ──────────────── */}
          <SectionTitle title="22. 대체 용어 테이블" description="§5.2 쓰지 않는 표현 → 대체 표현" />
          <TableContainer sx={ { mb: 4 } }>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600, color: 'text.secondary' } }>❌ 금지</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>✅ 대체</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>이유</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { TERM_REPLACEMENTS.map((item) => (
                  <TableRow key={ item.wrong }>
                    <TableCell sx={ { fontSize: 13, color: 'text.secondary' } }>{ item.wrong }</TableCell>
                    <TableCell sx={ { fontSize: 13, fontWeight: 500 } }>{ item.right }</TableCell>
                    <TableCell sx={ { fontSize: 12, color: 'text.secondary' } }>{ item.reason }</TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>

          {/* ──────────────── 22. 어휘 수준 조절 ──────────────── */}
          <SectionTitle title="23. 디자인 어휘 수준 조절" description="§5.3 대상별 어휘 밀도" />
          <TableContainer sx={ { mb: 4 } }>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600 } }>대상</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>어휘 수준</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>예시</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { VOCABULARY_LEVELS.map((item) => (
                  <TableRow key={ item.audience }>
                    <TableCell sx={ { fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' } }>{ item.audience }</TableCell>
                    <TableCell sx={ { fontSize: 13 } }>{ item.level }</TableCell>
                    <TableCell sx={ { fontSize: 12, fontFamily: 'monospace', color: 'text.secondary' } }>{ item.example }</TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>

          {/* ──────────────── 23. Before/After 마무리 문구 ──────────────── */}
          <SectionTitle title="24. Before/After 마무리 문구 풀" description="§6.2 모든 채널에서 반복 사용" />
          <Box sx={ { display: 'flex', flexDirection: 'column', gap: 1, mb: 4 } }>
            { BEFORE_AFTER_CLOSING.map((phrase, idx) => (
              <Typography key={ idx } variant="body2" sx={ { fontStyle: 'italic', color: 'text.secondary' } }>
                &ldquo;{ phrase }&rdquo;
              </Typography>
            )) }
          </Box>

          {/* ──────────────── 24. 웹사이트 카피 풀 ──────────────── */}
          <SectionTitle title="25. 웹사이트 핵심 카피 풀" description="히어로, Dictionary, 코호트, 미션 섹션 카피 후보" />

          <Typography variant="subtitle2" sx={ { fontWeight: 700, mb: 1 } }>히어로 헤드라인 후보</Typography>
          <Box sx={ { mb: 2 } }>
            { WEBSITE_COPY.hero.headlines.map((h, i) => (
              <Typography key={ i } variant="body2" sx={ { fontFamily: 'monospace', fontSize: 13 } }>
                { String.fromCharCode(65 + i) }. { h }
              </Typography>
            )) }
          </Box>

          <Typography variant="subtitle2" sx={ { fontWeight: 700, mb: 1 } }>히어로 서브카피 후보</Typography>
          <Box sx={ { mb: 3 } }>
            { WEBSITE_COPY.hero.subCopy.map((s, i) => (
              <Typography key={ i } variant="body2" sx={ { fontFamily: 'monospace', fontSize: 13 } }>
                { String.fromCharCode(65 + i) }. { s }
              </Typography>
            )) }
          </Box>

          <Typography variant="subtitle2" sx={ { fontWeight: 700, mb: 1 } }>Dictionary 소개</Typography>
          <Box sx={ { p: 2, border: '1px solid', borderColor: 'divider', mb: 2 } }>
            <Typography variant="body2" sx={ { fontWeight: 600 } }>{ WEBSITE_COPY.dictionary.headline }</Typography>
            <Typography variant="caption" color="text.secondary">{ WEBSITE_COPY.dictionary.sub }</Typography>
          </Box>

          <Typography variant="subtitle2" sx={ { fontWeight: 700, mb: 1 } }>코호트 소개</Typography>
          <Box sx={ { p: 2, border: '1px solid', borderColor: 'divider', mb: 2 } }>
            <Typography variant="body2" sx={ { fontWeight: 600 } }>{ WEBSITE_COPY.cohort.headline }</Typography>
            <Typography variant="caption" color="text.secondary">{ WEBSITE_COPY.cohort.sub }</Typography>
          </Box>

          <Typography variant="subtitle2" sx={ { fontWeight: 700, mb: 1 } }>미션 섹션</Typography>
          <Box sx={ { p: 2, border: '1px solid', borderColor: 'divider', mb: 4 } }>
            { WEBSITE_COPY.mission.map((line, i) => (
              <Typography key={ i } variant="body2" sx={ { minHeight: line ? 'auto' : 16, color: line ? 'text.primary' : 'transparent' } }>
                { line || ' ' }
              </Typography>
            )) }
          </Box>

          {/* ──────────────── 25. 브랜드 시각 자산 ──────────────── */}
          <SectionTitle title="26. 브랜드 시각 자산" description="VISUAL_ASSETS 객체 — 로고, 모티프, 일러스트, SNS 템플릿" />

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

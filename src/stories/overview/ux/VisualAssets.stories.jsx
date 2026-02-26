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
import { VISUAL_ASSETS, PHILOSOPHY, VALUE_PROPOSITIONS, MYTH_BUSTING } from '../../../data/contents';

export default {
  title: 'Overview/UX/Visual Assets',
  parameters: {
    layout: 'padded',
  },
};

/** 비주얼 에셋 카탈로그 */
export const Docs = {
  render: () => (
    <>
      <DocumentTitle
        title="Visual Assets"
        status="Available"
        note="브랜드 시각 자산 카탈로그 (텍스트 메타 기준)"
        brandName="Vibe Design Labs"
        systemName="UX Documentation"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
          Visual Assets
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
          VDL 브랜드 시각 자산 카탈로그입니다. 실제 이미지 제작은 별도 — 여기서는 메타데이터만 정리합니다.
        </Typography>

        {/* 로고 시스템 */}
        <SectionTitle title="로고 시스템" description="Seed Parameters에서 파생되는 6종의 로고 변형" />
        <TableContainer sx={ { mb: 4 } }>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>이름</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>설명</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>Transform</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>용도</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { VISUAL_ASSETS.logo.map((item) => (
                <TableRow key={ item.id }>
                  <TableCell sx={ { fontWeight: 600, whiteSpace: 'nowrap', fontSize: 13 } }>{ item.name }</TableCell>
                  <TableCell sx={ { fontSize: 13 } }>{ item.description }</TableCell>
                  <TableCell sx={ { fontFamily: 'monospace', fontSize: 12, color: 'text.secondary' } }>{ item.transform }</TableCell>
                  <TableCell sx={ { fontSize: 13, color: 'text.secondary' } }>{ item.usage }</TableCell>
                </TableRow>
              )) }
            </TableBody>
          </Table>
        </TableContainer>

        {/* 그래픽 모티프 */}
        <SectionTitle title="그래픽 모티프" description="VDL 비쥬얼의 최소 패턴 단위" />
        <TableContainer sx={ { mb: 4 } }>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>이름</TableCell>
                <TableCell sx={ { fontWeight: 600, width: '40%' } }>설명</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>용도</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { VISUAL_ASSETS.motifs.map((item) => (
                <TableRow key={ item.id }>
                  <TableCell sx={ { fontWeight: 600, whiteSpace: 'nowrap', fontSize: 13 } }>{ item.name }</TableCell>
                  <TableCell sx={ { fontSize: 13 } }>{ item.description }</TableCell>
                  <TableCell sx={ { fontSize: 13, color: 'text.secondary' } }>{ item.usage }</TableCell>
                </TableRow>
              )) }
            </TableBody>
          </Table>
        </TableContainer>

        {/* 키 일러스트 */}
        <SectionTitle title="키 일러스트레이션" description="VDL 세계관 핵심 장면" />
        <TableContainer sx={ { mb: 4 } }>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>이름</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>우선순위</TableCell>
                <TableCell sx={ { fontWeight: 600, width: '35%' } }>설명</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>용도</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { VISUAL_ASSETS.keyIllustrations.map((item) => (
                <TableRow key={ item.id }>
                  <TableCell sx={ { fontWeight: 600, whiteSpace: 'nowrap', fontSize: 13 } }>{ item.name }</TableCell>
                  <TableCell>
                    <Chip
                      label={ item.priority }
                      size="small"
                      color={ item.priority === 'high' ? 'error' : 'default' }
                      variant="outlined"
                      sx={ { fontSize: 11 } }
                    />
                  </TableCell>
                  <TableCell sx={ { fontSize: 13 } }>{ item.description }</TableCell>
                  <TableCell sx={ { fontSize: 13, color: 'text.secondary' } }>{ item.usage }</TableCell>
                </TableRow>
              )) }
            </TableBody>
          </Table>
        </TableContainer>

        {/* Philosophy 일러스트 */}
        <SectionTitle title="Philosophy 일러스트" description="세 가지 신념의 시각화" />
        <TableContainer sx={ { mb: 4 } }>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>신념</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>일러스트명</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>파생 가치</TableCell>
                <TableCell sx={ { fontWeight: 600, width: '35%' } }>시각 컨셉</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { VISUAL_ASSETS.philosophy.map((item) => {
                const phil = PHILOSOPHY.find((p) => p.id === item.id.replace('phil-', ''));
                return (
                  <TableRow key={ item.id }>
                    <TableCell sx={ { fontWeight: 600, fontSize: 13 } }>{ item.belief }</TableCell>
                    <TableCell sx={ { fontSize: 13 } }>{ item.name }</TableCell>
                    <TableCell>
                      <Chip label={ item.derivedValue } size="small" variant="outlined" sx={ { fontSize: 11 } } />
                    </TableCell>
                    <TableCell sx={ { fontSize: 12, color: 'text.secondary' } }>
                      { item.description }
                      { phil && (
                        <Typography variant="caption" display="block" sx={ { mt: 0.5, fontStyle: 'italic' } }>
                          { phil.shortDescription }
                        </Typography>
                      ) }
                    </TableCell>
                  </TableRow>
                );
              }) }
            </TableBody>
          </Table>
        </TableContainer>

        {/* Value Proposition 일러스트 */}
        <SectionTitle title="Value Proposition 일러스트" description="세 단계 가치 제안의 시각화" />
        <TableContainer sx={ { mb: 4 } }>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>단계</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>이름</TableCell>
                <TableCell sx={ { fontWeight: 600, width: '30%' } }>비주얼 컨셉</TableCell>
                <TableCell sx={ { fontWeight: 600, width: '25%' } }>스타일</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { VISUAL_ASSETS.valueProposition.map((item) => {
                const vp = VALUE_PROPOSITIONS.find((v) => v.step === item.step);
                return (
                  <TableRow key={ item.id }>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>Step { item.step }</TableCell>
                    <TableCell sx={ { fontWeight: 600, fontSize: 13 } }>
                      { item.name }
                      { vp && (
                        <Typography variant="caption" display="block" color="text.secondary">
                          { vp.description }
                        </Typography>
                      ) }
                    </TableCell>
                    <TableCell sx={ { fontSize: 13 } }>{ item.visualConcept }</TableCell>
                    <TableCell sx={ { fontSize: 12, color: 'text.secondary' } }>{ item.style }</TableCell>
                  </TableRow>
                );
              }) }
            </TableBody>
          </Table>
        </TableContainer>

        {/* Myth-Busting 일러스트 */}
        <SectionTitle title="Myth-Busting 시각 자산" description="편견 반전 장면의 비주얼 컨셉" />
        <TableContainer sx={ { mb: 4 } }>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>통념</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>철학 연결</TableCell>
                <TableCell sx={ { fontWeight: 600, width: '45%' } }>비주얼 컨셉</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { VISUAL_ASSETS.mythBusting.map((item) => {
                const myth = MYTH_BUSTING.find((m) => m.id === item.id.replace('myth-', ''));
                return (
                  <TableRow key={ item.id }>
                    <TableCell sx={ { fontWeight: 600, fontSize: 13 } }>{ item.myth }</TableCell>
                    <TableCell>
                      <Chip
                        label={ item.philosophyRef }
                        size="small"
                        variant="outlined"
                        sx={ { fontSize: 11 } }
                      />
                      { myth && (
                        <Typography variant="caption" display="block" color="text.secondary" sx={ { mt: 0.5 } }>
                          { myth.keyPhrase }
                        </Typography>
                      ) }
                    </TableCell>
                    <TableCell sx={ { fontSize: 13 } }>{ item.visualConcept }</TableCell>
                  </TableRow>
                );
              }) }
            </TableBody>
          </Table>
        </TableContainer>

        {/* SNS 템플릿 */}
        <SectionTitle title="SNS 콘텐츠 템플릿" description="4종의 SNS 시각 콘텐츠 패턴" />
        <TableContainer sx={ { mb: 4 } }>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>패턴</TableCell>
                <TableCell sx={ { fontWeight: 600, width: '40%' } }>설명</TableCell>
                <TableCell sx={ { fontWeight: 600, width: '30%' } }>스타일</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { VISUAL_ASSETS.snsTemplates.map((item) => (
                <TableRow key={ item.id }>
                  <TableCell sx={ { fontWeight: 600, whiteSpace: 'nowrap', fontSize: 13 } }>{ item.pattern }</TableCell>
                  <TableCell sx={ { fontSize: 13 } }>{ item.description }</TableCell>
                  <TableCell sx={ { fontSize: 12, color: 'text.secondary' } }>{ item.style }</TableCell>
                </TableRow>
              )) }
            </TableBody>
          </Table>
        </TableContainer>
      </PageContainer>
    </>
  ),
};

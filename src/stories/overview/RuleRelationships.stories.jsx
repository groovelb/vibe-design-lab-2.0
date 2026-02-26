'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import { DocumentTitle, PageContainer, SectionTitle } from '../../components/storybookDocumentation';
import {
  ruleNodes,
  ruleEdges,
  edgeTypes,
  priorityMeta,
  conditionMatrix,
} from '../../data/ruleRelationships';

export default {
  title: 'Overview/Rule Relationships',
  parameters: {
    layout: 'padded',
  },
};

/**
 * PriorityChip - 우선순위 뱃지
 *
 * @param {string} priority - 우선순위 키 [Required]
 */
function PriorityChip({ priority }) {
  const meta = priorityMeta[priority];
  if (!meta) return null;

  return (
    <Chip
      label={ priority }
      size="small"
      sx={ {
        backgroundColor: meta.color,
        color: '#fff',
        fontWeight: 600,
        fontSize: 11,
        height: 22,
      } }
    />
  );
}

/**
 * NodeBox - 노드 렌더링 공통 컴포넌트
 *
 * @param {object} node - ruleNode 객체 [Required]
 * @param {string} borderStyle - border 스타일 [Optional, 기본값: 'solid']
 */
function NodeBox({ node, borderStyle = 'solid' }) {
  const meta = priorityMeta[node.priority];

  return (
    <Box
      sx={ {
        px: 1.5,
        py: 0.5,
        border: `1px ${borderStyle}`,
        borderColor: meta?.color || 'divider',
        borderLeftWidth: borderStyle === 'solid' ? 3 : 1,
        fontFamily: 'monospace',
        fontSize: 12,
      } }
      title={ `${node.path}\n${node.description}` }
    >
      { node.name }
    </Box>
  );
}

/**
 * TreeDiagram - CLAUDE.md 중심 룰 계층 트리
 */
function TreeDiagram() {
  const root = ruleNodes.find((n) => n.id === 'claude-md');

  const ruleGroups = {
    CRITICAL: ruleNodes.filter((n) => n.priority === 'CRITICAL'),
    MUST: ruleNodes.filter((n) => n.priority === 'MUST'),
  };

  const skillNodes = ruleNodes.filter((n) => n.priority === 'Skill');
  const referenceNodes = ruleNodes.filter((n) => n.priority === 'Reference');

  const skillResourceEdges = ruleEdges.filter((e) => e.type === 'resources');
  const uxRefEdges = ruleEdges.filter(
    (e) => e.from === 'ux-architecture' && e.type === 'references'
  );
  const crossEdges = ruleEdges.filter(
    (e) => e.from !== 'claude-md' && e.from !== 'ux-architecture' && e.type === 'references'
  );

  return (
    <Box sx={ { p: 3, border: '1px solid', borderColor: 'divider' } }>
      {/* Root */}
      <Box
        sx={ {
          display: 'inline-block',
          px: 2,
          py: 1,
          border: '2px solid',
          borderColor: '#000',
          fontFamily: 'monospace',
          fontWeight: 700,
          fontSize: 14,
          mb: 3,
        } }
      >
        { root.name }
      </Box>

      {/* 자동 로드 룰 그룹 */}
      <Typography variant="caption" color="text.secondary" sx={ { display: 'block', pl: 4, mb: 1 } }>
        자동 로드 (loads)
      </Typography>
      <Box sx={ { display: 'flex', flexDirection: 'column', gap: 2, pl: 4, mb: 3 } }>
        { Object.entries(ruleGroups).map(([priority, nodes]) => {
          if (nodes.length === 0) return null;

          return (
            <Box key={ priority }>
              <Box sx={ { display: 'flex', alignItems: 'center', gap: 1, mb: 1 } }>
                <Box sx={ { width: 24, borderTop: '1px solid', borderColor: 'text.disabled' } } />
                <PriorityChip priority={ priority } />
                <Typography variant="caption" color="text.secondary">
                  { priorityMeta[priority].label }
                </Typography>
              </Box>
              <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 1, pl: 4 } }>
                { nodes.map((node) => (
                  <NodeBox key={ node.id } node={ node } />
                )) }
              </Box>
            </Box>
          );
        }) }
      </Box>

      {/* UX 참조 문서 (ux-architecture → docs) */}
      { referenceNodes.length > 0 && (
        <>
          <Typography variant="caption" color="text.secondary" sx={ { display: 'block', pl: 4, mb: 1 } }>
            UX 참조 문서 (ux-architecture → on-demand Read)
          </Typography>
          <Box sx={ { pl: 4, mb: 3 } }>
            <Box sx={ { display: 'flex', alignItems: 'center', gap: 1, mb: 1 } }>
              <Box
                sx={ {
                  width: 24,
                  borderTop: '2px dashed',
                  borderColor: priorityMeta.Reference.color,
                } }
              />
              <Box
                sx={ {
                  px: 1.5,
                  py: 0.5,
                  border: '2px solid',
                  borderColor: priorityMeta.MUST.color,
                  fontFamily: 'monospace',
                  fontSize: 12,
                  fontWeight: 700,
                } }
              >
                ux-architecture.md
              </Box>
              <Typography variant="caption" color="text.secondary">
                작업 성격에 따라 해당 문서 참조
              </Typography>
            </Box>
            <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 1, pl: 6 } }>
              { referenceNodes.map((node) => {
                const edge = uxRefEdges.find((e) => e.to === node.id);

                return (
                  <Box
                    key={ node.id }
                    sx={ {
                      px: 1.5,
                      py: 0.5,
                      border: '1px dashed',
                      borderColor: priorityMeta.Reference.color,
                      fontFamily: 'monospace',
                      fontSize: 11,
                      color: 'text.secondary',
                    } }
                    title={ `${node.path}\n${edge?.note || node.description}` }
                  >
                    { node.name }
                    <Typography
                      component="span"
                      sx={ { fontSize: 10, ml: 1, color: 'text.disabled' } }
                    >
                      { edge?.note }
                    </Typography>
                  </Box>
                );
              }) }
            </Box>
          </Box>
        </>
      ) }

      {/* 스킬 그룹 (의도 기반 활성화) */}
      { skillNodes.length > 0 && (
        <>
          <Typography variant="caption" color="text.secondary" sx={ { display: 'block', pl: 4, mb: 1 } }>
            의도 기반 활성화 (activates)
          </Typography>
          <Box sx={ { pl: 4, mb: 2 } }>
            { skillNodes.map((skillNode) => {
              const resourceEdgesForSkill = skillResourceEdges.filter((e) => e.from === skillNode.id);
              const resourceNodes = resourceEdgesForSkill.map((e) =>
                ruleNodes.find((n) => n.id === e.to)
              ).filter(Boolean);

              return (
                <Box key={ skillNode.id } sx={ { mb: 2 } }>
                  <Box sx={ { display: 'flex', alignItems: 'center', gap: 1, mb: 1 } }>
                    <Box
                      sx={ {
                        width: 24,
                        borderTop: '2px dashed',
                        borderColor: priorityMeta.Skill.color,
                      } }
                    />
                    <Box
                      sx={ {
                        px: 1.5,
                        py: 0.5,
                        border: '2px solid',
                        borderColor: priorityMeta.Skill.color,
                        fontFamily: 'monospace',
                        fontSize: 12,
                        fontWeight: 700,
                      } }
                    >
                      { skillNode.name }
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      { skillNode.description }
                    </Typography>
                  </Box>

                  {/* Skill Resources */}
                  { resourceNodes.length > 0 && (
                    <Box sx={ { pl: 6 } }>
                      <Typography variant="caption" color="text.secondary" sx={ { display: 'block', mb: 0.5 } }>
                        on-demand Read (resources)
                      </Typography>
                      <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 1 } }>
                        { resourceNodes.map((res) => {
                          const edge = resourceEdgesForSkill.find((e) => e.to === res.id);

                          return (
                            <Box
                              key={ res.id }
                              sx={ {
                                px: 1.5,
                                py: 0.5,
                                border: '1px dashed',
                                borderColor: priorityMeta['Skill Resource'].color,
                                fontFamily: 'monospace',
                                fontSize: 11,
                                color: 'text.secondary',
                              } }
                              title={ edge?.note || res.description }
                            >
                              { res.name }
                            </Box>
                          );
                        }) }
                      </Box>
                    </Box>
                  ) }
                </Box>
              );
            }) }
          </Box>
        </>
      ) }

      {/* 서브룰 간 참조 */}
      { crossEdges.length > 0 && (
        <Box sx={ { mt: 2, pt: 2, borderTop: '1px dashed', borderColor: 'divider' } }>
          <Typography variant="caption" color="text.secondary" sx={ { display: 'block', mb: 1 } }>
            룰 간 참조 (references)
          </Typography>
          { crossEdges.map((edge, i) => {
            const fromNode = ruleNodes.find((n) => n.id === edge.from);
            const toNode = ruleNodes.find((n) => n.id === edge.to);

            return (
              <Typography
                key={ i }
                variant="caption"
                sx={ { display: 'block', fontFamily: 'monospace', fontSize: 11, color: 'text.secondary' } }
              >
                { fromNode?.name } {'  \u2192  '} { toNode?.name }
                { edge.note && ` (${edge.note})` }
              </Typography>
            );
          }) }
        </Box>
      ) }
    </Box>
  );
}

export const Doc = {
  render: () => (
    <>
      <DocumentTitle
        title="Rule Relationships"
        status="Available"
        note="Project rule structure and relationships"
        brandName="Vibe Design Labs"
        systemName="Starter Kit"
        version="2.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
          Rule Relationships
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
          CLAUDE.md를 중심으로 한 프로젝트 룰의 계층 구조와 참조 관계입니다.
        </Typography>

        {/* 1. 룰 계층 구조 */}
        <SectionTitle title="룰 계층 구조" description="CLAUDE.md에서 각 서브룰로의 로드 관계" />
        <Box sx={ { mb: 4 } }>
          <TreeDiagram />
        </Box>

        {/* 2. 룰 목록 */}
        <SectionTitle title="룰 목록" description="모든 룰 파일과 우선순위, 역할" />
        <TableContainer sx={ { mb: 4 } }>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>파일명</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>우선순위</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>경로</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>설명</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { ruleNodes.map((node) => (
                <TableRow key={ node.id }>
                  <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>
                    { node.name }
                  </TableCell>
                  <TableCell>
                    <PriorityChip priority={ node.priority } />
                  </TableCell>
                  <TableCell sx={ { fontFamily: 'monospace', fontSize: 11, color: 'text.disabled' } }>
                    { node.path }
                  </TableCell>
                  <TableCell sx={ { color: 'text.secondary', fontSize: 13 } }>
                    { node.description }
                  </TableCell>
                </TableRow>
              )) }
            </TableBody>
          </Table>
        </TableContainer>

        {/* 3. 참조 관계 */}
        <SectionTitle title="참조 관계" description="룰 간 참조 방식과 방향" />
        <Box sx={ { display: 'flex', gap: 3, mb: 2 } }>
          { Object.entries(edgeTypes).map(([key, meta]) => (
            <Box key={ key } sx={ { display: 'flex', alignItems: 'center', gap: 1 } }>
              <Box
                sx={ {
                  width: 24,
                  borderTop: `2px ${meta.style}`,
                  borderColor: 'text.primary',
                } }
              />
              <Typography variant="caption" color="text.secondary">
                { meta.label }
              </Typography>
            </Box>
          )) }
        </Box>
        <TableContainer sx={ { mb: 4 } }>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>From</TableCell>
                <TableCell sx={ { fontWeight: 600 } }></TableCell>
                <TableCell sx={ { fontWeight: 600 } }>To</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>유형</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>비고</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { ruleEdges.map((edge, i) => {
                const fromNode = ruleNodes.find((n) => n.id === edge.from);
                const toNode = ruleNodes.find((n) => n.id === edge.to);

                return (
                  <TableRow key={ i }>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>
                      { fromNode?.name }
                    </TableCell>
                    <TableCell sx={ { textAlign: 'center' } }>{'\u2192'}</TableCell>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>
                      { toNode?.name }
                    </TableCell>
                    <TableCell sx={ { fontSize: 12 } }>
                      { edgeTypes[edge.type]?.label }
                    </TableCell>
                    <TableCell sx={ { color: 'text.secondary', fontSize: 12 } }>
                      { edge.note || '-' }
                    </TableCell>
                  </TableRow>
                );
              }) }
            </TableBody>
          </Table>
        </TableContainer>

        {/* 4. 활용 조건 매트릭스 */}
        <SectionTitle title="활용 조건 매트릭스" description="작업 유형별 확인해야 할 룰, 스킬, UX 문서" />
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>작업 유형</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>확인할 룰</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>Skill</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>Skill Resources</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>UX 문서</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>비고</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { conditionMatrix.map((row, i) => (
                <TableRow key={ i }>
                  <TableCell sx={ { fontWeight: 600, fontSize: 13 } }>
                    { row.task }
                  </TableCell>
                  <TableCell>
                    <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 0.5 } }>
                      { row.rules.map((ruleId) => {
                        const node = ruleNodes.find((n) => n.id === ruleId);
                        const meta = priorityMeta[node?.priority];

                        return (
                          <Chip
                            key={ ruleId }
                            label={ node?.name?.replace('.md', '') }
                            size="small"
                            variant="outlined"
                            sx={ {
                              fontSize: 11,
                              height: 22,
                              borderColor: meta?.color,
                              color: meta?.color,
                            } }
                          />
                        );
                      }) }
                    </Box>
                  </TableCell>
                  <TableCell>
                    { row.skill ? (
                      <Chip
                        label={ row.skill }
                        size="small"
                        sx={ {
                          fontSize: 11,
                          height: 22,
                          backgroundColor: priorityMeta.Skill?.color,
                          color: '#fff',
                        } }
                      />
                    ) : (
                      <Typography variant="caption" color="text.disabled">-</Typography>
                    ) }
                  </TableCell>
                  <TableCell>
                    { row.skillResources?.length > 0 ? (
                      <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 0.5 } }>
                        { row.skillResources.map((resId) => {
                          const node = ruleNodes.find((n) => n.id === resId);

                          return (
                            <Chip
                              key={ resId }
                              label={ node?.name?.replace('.md', '') }
                              size="small"
                              variant="outlined"
                              sx={ {
                                fontSize: 11,
                                height: 22,
                                borderColor: priorityMeta['Skill Resource']?.color,
                                color: priorityMeta['Skill Resource']?.color,
                              } }
                            />
                          );
                        }) }
                      </Box>
                    ) : (
                      <Typography variant="caption" color="text.disabled">-</Typography>
                    ) }
                  </TableCell>
                  <TableCell>
                    { row.uxDocs?.length > 0 ? (
                      <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 0.5 } }>
                        { row.uxDocs.map((docId) => {
                          const node = ruleNodes.find((n) => n.id === docId);

                          return (
                            <Chip
                              key={ docId }
                              label={ node?.name?.replace('.md', '') }
                              size="small"
                              variant="outlined"
                              sx={ {
                                fontSize: 11,
                                height: 22,
                                borderColor: priorityMeta.Reference?.color,
                                color: priorityMeta.Reference?.color,
                              } }
                            />
                          );
                        }) }
                      </Box>
                    ) : (
                      <Typography variant="caption" color="text.disabled">-</Typography>
                    ) }
                  </TableCell>
                  <TableCell sx={ { color: 'text.secondary', fontSize: 12 } }>
                    { row.note || '-' }
                  </TableCell>
                </TableRow>
              )) }
            </TableBody>
          </Table>
        </TableContainer>
      </PageContainer>
    </>
  ),
};

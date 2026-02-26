'use client';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

/**
 * 재귀적 TreeItem 렌더
 */
function renderTreeItems(nodes, onNodeClick) {
  return nodes.map((node) => (
    <TreeItem
      key={node.id}
      itemId={node.id}
      label={node.label}
      onClick={onNodeClick ? () => onNodeClick(node) : undefined}
    >
      {node.children && node.children.length > 0
        ? renderTreeItems(node.children, onNodeClick)
        : null}
    </TreeItem>
  ));
}

/**
 * preview 모드용: 최대 2레벨까지만 렌더
 */
function renderPreviewItems(nodes, onNodeClick, depth = 0) {
  if (depth >= 2) return null;

  return nodes.map((node) => (
    <TreeItem
      key={node.id}
      itemId={node.id}
      label={node.label}
      onClick={onNodeClick ? () => onNodeClick(node) : undefined}
    >
      {node.children && node.children.length > 0 && depth < 1
        ? renderPreviewItems(node.children, onNodeClick, depth + 1)
        : null}
    </TreeItem>
  ));
}

/**
 * TaxonomyTree 컴포넌트
 *
 * 트리 구조의 텍소노미(분류 체계)를 표시하는 컴포넌트.
 * MUI SimpleTreeView 기반, Monoline 스타일 (1px 연결선, round cap).
 *
 * Props:
 * @param {array} data - DictionaryCategory 구조의 트리 데이터 [Required]
 *   각 노드: { id: string, label: string, children?: array }
 * @param {string} variant - 표시 모드 ('full' | 'preview') [Optional, 기본값: 'full']
 * @param {string[]} defaultExpanded - 기본 펼침 노드 ID 목록 [Optional]
 * @param {function} onNodeClick - 노드 클릭 콜백 (node) => void [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <TaxonomyTree
 *   data={categoryData}
 *   variant="preview"
 *   onNodeClick={(node) => navigate(node.id)}
 * />
 */
const TaxonomyTree = forwardRef(function TaxonomyTree({
  data = [],
  variant = 'full',
  defaultExpanded = [],
  onNodeClick,
  sx,
  ...props
}, ref) {
  const isPreview = variant === 'preview';

  return (
    <Box ref={ref} sx={sx} {...props}>
      <SimpleTreeView
        defaultExpandedItems={defaultExpanded}
        sx={{
          '& .MuiTreeItem-content': {
            py: 0.5,
          },
          '& .MuiTreeItem-label': {
            fontSize: '0.875rem',
          },
          '& .MuiTreeItem-iconContainer': {
            color: 'text.disabled',
          },
          /* Monoline 스타일 — 연결선 */
          '& .MuiTreeItem-groupTransition': {
            ml: 2,
            pl: 2,
            borderLeft: '1px solid',
            borderColor: 'divider',
          },
        }}
      >
        {isPreview
          ? renderPreviewItems(data, onNodeClick)
          : renderTreeItems(data, onNodeClick)
        }
      </SimpleTreeView>

      {isPreview && data.length > 0 && (
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            mt: 1,
            ml: 2,
            color: 'text.secondary',
            cursor: 'pointer',
            '&:hover': { textDecoration: 'underline' },
          }}
          onClick={onNodeClick ? () => onNodeClick({ id: '__more__', label: '더 보기' }) : undefined}
        >
          더 보기...
        </Typography>
      )}
    </Box>
  );
});

export { TaxonomyTree };

'use client';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';

/**
 * SiteMapNode - IA 트리를 펼침/접기로 시각화하는 컴포넌트
 *
 * Props:
 * @param {object} node - 노드 데이터 { id, label, path, contentType, sections, children } [Required]
 * @param {number} depth - 트리 깊이 [Optional, 기본값: 0]
 * @param {boolean} defaultOpen - 초기 펼침 상태 [Optional, 기본값: false]
 *
 * Example usage:
 * <SiteMapNode node={SITE_MAP} defaultOpen />
 */
export const SiteMapNode = ({ node, depth = 0, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const hasChildren = (node.children && node.children.length > 0) || (node.sections && node.sections.length > 0);

  return (
    <Box sx={ { ml: depth > 0 ? 2.5 : 0 } }>
      {/* 노드 헤더 */}
      <Box
        onClick={ () => hasChildren && setIsOpen(!isOpen) }
        sx={ {
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          py: 0.75,
          px: 1,
          cursor: hasChildren ? 'pointer' : 'default',
          borderRadius: 1,
          borderLeft: depth > 0 ? '2px solid' : 'none',
          borderColor: depth === 1 ? 'primary.main' : 'divider',
          '&:hover': hasChildren ? { backgroundColor: 'action.hover' } : {},
        } }
      >
        {/* 펼침/접힘 아이콘 */}
        { hasChildren ? (
          <Typography
            component="span"
            sx={ {
              width: 16,
              color: 'text.secondary',
              fontSize: 12,
              fontFamily: 'monospace',
              userSelect: 'none',
            } }
          >
            { isOpen ? '▼' : '▶' }
          </Typography>
        ) : (
          <Box sx={ { width: 16 } } />
        ) }

        {/* 페이지 라벨 */}
        <Typography
          component="span"
          sx={ {
            fontWeight: depth === 0 ? 700 : 600,
            fontSize: depth === 0 ? 15 : 13,
          } }
        >
          { node.label }
        </Typography>

        {/* 경로 (있으면) */}
        { node.path && (
          <Typography
            component="span"
            sx={ {
              fontFamily: 'monospace',
              fontSize: 12,
              color: 'text.secondary',
            } }
          >
            { node.path }
          </Typography>
        ) }

        {/* contentType Chip (있으면) */}
        { node.contentType && (
          <Chip
            label={ node.contentType }
            size="small"
            variant="outlined"
            sx={ { height: 20, fontSize: 11 } }
          />
        ) }

        {/* narrativeRole Chip (섹션용) */}
        { node.narrativeRole && (
          <Chip
            label={ node.narrativeRole }
            size="small"
            color="secondary"
            variant="outlined"
            sx={ { height: 20, fontSize: 11 } }
          />
        ) }
      </Box>

      {/* 하위 노드 */}
      { hasChildren && (
        <Collapse in={ isOpen }>
          {/* sections (리프 노드) */}
          { node.sections && node.sections.map((section) => (
            <SiteMapNode
              key={ section.id }
              node={ section }
              depth={ depth + 1 }
            />
          )) }

          {/* children (페이지 서브트리) */}
          { node.children && node.children.map((child) => (
            <SiteMapNode
              key={ child.id }
              node={ child }
              depth={ depth + 1 }
              defaultOpen={ depth < 1 }
            />
          )) }
        </Collapse>
      ) }
    </Box>
  );
};

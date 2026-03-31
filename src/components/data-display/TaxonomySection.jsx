'use client';
import { forwardRef, useState, useRef, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import MuiAccordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { ChevronDown, LayoutList, Network } from 'lucide-react';
import { TAXONOMY, TAXONOMY_STATS } from '../../data/taxonomyData';

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

/** Stats strip — 3개 핵심 수치 */
function StatsStrip({ stats }) {
  const entries = [
    { value: stats.parts, label: 'Parts' },
    { value: stats.categories, label: 'Categories' },
    { value: `${stats.keywords}+`, label: 'Keywords' },
  ];

  return (
    <Box sx={{ py: { xs: 6, md: 8 } }}>
      <Grid container>
        {entries.map((entry, i) => (
          <Grid key={entry.label} size={{ xs: 4 }}>
            <Stack
              spacing={0.5}
              sx={{
                alignItems: 'center',
                borderLeft: i > 0 ? '1px solid' : 'none',
                borderColor: 'divider',
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontWeight: 500,
                  color: 'text.primary',
                }}
              >
                {entry.value}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {entry.label}
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

/** Part header — overline + title + description */
function PartHeader({ part }) {
  return (
    <Box sx={{ pt: { xs: 6, md: 10 }, pb: { xs: 3, md: 4 } }}>
      <Typography
        variant="overline"
        sx={{ color: 'text.secondary', mb: 1, display: 'block' }}
      >
        Part {part.number}
      </Typography>
      <Typography variant="h3" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
        {part.label}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {part.description}
        {' — '}
        <Box component="span" sx={{ fontFamily: '"IBM Plex Mono", monospace' }}>
          {part.count}
        </Box>
        개 키워드
      </Typography>
      <Divider sx={{ mt: 3 }} />
    </Box>
  );
}

/** Component item row — Parts 1 & 2 공통 */
function ItemRow({ item, isInteractive, isLast }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: isInteractive
          ? { xs: '1fr', md: '160px 1fr 180px 60px' }
          : { xs: '1fr', md: '160px 1fr 100px' },
        gap: { xs: 0.5, md: 2 },
        alignItems: 'baseline',
        py: 1.5,
        borderBottom: isLast ? 'none' : '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontFamily: '"IBM Plex Mono", monospace',
          color: 'text.primary',
          fontWeight: 500,
        }}
      >
        {item.name}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {item.description}
      </Typography>
      {isInteractive ? (
        <>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              display: { xs: 'none', md: 'block' },
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '0.75rem',
            }}
          >
            {item.dependency}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              display: { xs: 'none', md: 'block' },
              textAlign: 'right',
            }}
          >
            {item.frequency}
          </Typography>
        </>
      ) : (
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            display: { xs: 'none', md: 'block' },
            textAlign: 'right',
          }}
        >
          {item.source}
        </Typography>
      )}
    </Box>
  );
}

/** Reference item row — Part 4용 */
function ReferenceItemRow({ item, isLast }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '140px 1fr 1fr' },
        gap: { xs: 0.5, md: 2 },
        alignItems: 'baseline',
        py: 1.5,
        borderBottom: isLast ? 'none' : '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontFamily: '"IBM Plex Mono", monospace',
          color: 'text.primary',
          fontWeight: 500,
        }}
      >
        {item.name}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {item.description}
      </Typography>
      {item.whenToUse && (
        <Typography
          variant="caption"
          sx={{ color: 'text.secondary', display: { xs: 'none', md: 'block' } }}
        >
          {item.whenToUse}
        </Typography>
      )}
    </Box>
  );
}

/** Category accordion — 카테고리 펼침/접기 */
function CategoryAccordion({ category, isInteractive, isReference, expanded, onChange }) {
  return (
    <MuiAccordion
      expanded={expanded}
      onChange={onChange}
      disableGutters
      square
      sx={{
        backgroundColor: 'transparent',
        backgroundImage: 'none',
        borderBottom: 1,
        borderColor: 'divider',
        '&:before': { display: 'none' },
        '&.Mui-expanded': { margin: 0 },
      }}
    >
      <AccordionSummary
        expandIcon={
          <ChevronDown
            size={20}
            style={{ transition: 'transform 200ms ease' }}
          />
        }
        sx={{
          px: 0,
          py: { xs: 2.5, md: 3 },
          minHeight: 'unset',
          color: 'text.primary',
          '& .MuiAccordionSummary-expandIconWrapper': {
            color: 'text.secondary',
          },
          '& .MuiAccordionSummary-content': {
            margin: 0,
            alignItems: 'baseline',
            justifyContent: 'space-between',
            pr: 2,
          },
          '@media (prefers-reduced-motion: reduce)': {
            '& .MuiAccordionSummary-expandIconWrapper': {
              transition: 'none',
            },
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, minWidth: 0 }}>
          <Typography
            variant="body2"
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              color: 'text.secondary',
              flexShrink: 0,
            }}
          >
            {category.number}.
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {category.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            — {category.subtitle}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            color: 'text.secondary',
            flexShrink: 0,
          }}
        >
          {category.count}
        </Typography>
      </AccordionSummary>

      <AccordionDetails sx={{ px: 0, pb: { xs: 4, md: 6 }, pt: 0 }}>
        {/* Definition */}
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', mb: 3, maxWidth: '60ch' }}
        >
          {category.definition}
        </Typography>

        {/* Column header for desktop */}
        {!isReference && (
          <Box
            sx={{
              display: { xs: 'none', md: 'grid' },
              gridTemplateColumns: isInteractive
                ? '160px 1fr 180px 60px'
                : '160px 1fr 100px',
              gap: 2,
              pb: 1,
              mb: 1,
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
              Name
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
              Description
            </Typography>
            {isInteractive ? (
              <>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  Dependency
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textAlign: 'right' }}>
                  Freq
                </Typography>
              </>
            ) : (
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textAlign: 'right' }}>
                Source
              </Typography>
            )}
          </Box>
        )}

        {/* Groups */}
        {category.groups.map((group, gi) => (
          <Box key={gi}>
            {group.label && (
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 600,
                  display: 'block',
                  mt: gi > 0 ? 3 : 0,
                  mb: 1,
                  pl: { xs: 0, md: 0 },
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  pb: 1,
                }}
              >
                {group.label}
              </Typography>
            )}
            {group.items.map((item, ii) => (
              isReference ? (
                <ReferenceItemRow
                  key={ii}
                  item={item}
                  isLast={ii === group.items.length - 1 && gi === category.groups.length - 1}
                />
              ) : (
                <ItemRow
                  key={ii}
                  item={item}
                  isInteractive={isInteractive}
                  isLast={ii === group.items.length - 1 && gi === category.groups.length - 1}
                />
              )
            ))}
          </Box>
        ))}
      </AccordionDetails>
    </MuiAccordion>
  );
}

/** Movements table — Part 3 전용 */
function MovementsTable({ items }) {
  return (
    <Box sx={{ pt: 2 }}>
      {/* Desktop header */}
      <Box
        sx={{
          display: { xs: 'none', md: 'grid' },
          gridTemplateColumns: '160px 140px 1fr 1fr',
          gap: 2,
          pb: 1,
          mb: 1,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
          Movement
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
          Feel
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
          When to Use
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
          When to Avoid
        </Typography>
      </Box>

      {items.map((item, i) => (
        <Box
          key={i}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '160px 140px 1fr 1fr' },
            gap: { xs: 0.5, md: 2 },
            alignItems: 'baseline',
            py: { xs: 2, md: 1.5 },
            borderBottom: i < items.length - 1 ? '1px solid' : 'none',
            borderColor: 'divider',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              color: 'text.primary',
              fontWeight: 500,
            }}
          >
            {item.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {item.feel}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', display: { xs: 'none', md: 'block' } }}
          >
            {item.whenToUse}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary', display: { xs: 'none', md: 'block' } }}
          >
            {item.whenToAvoid}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

/** Tree node label — name + description compact */
function TreeNodeLabel({ name, secondary, count, isMono }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, py: 0.25 }}>
      <Typography
        variant="body2"
        sx={{
          fontFamily: isMono ? '"IBM Plex Mono", monospace' : 'inherit',
          fontWeight: isMono ? 500 : 600,
          color: 'text.primary',
          flexShrink: 0,
        }}
      >
        {name}
      </Typography>
      {secondary && (
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {secondary}
        </Typography>
      )}
      {count != null && (
        <Typography
          variant="caption"
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            color: 'text.secondary',
            flexShrink: 0,
            ml: 'auto',
          }}
        >
          {count}
        </Typography>
      )}
    </Box>
  );
}

/** Monoline tree styles — 1px 연결선, round cap */
const treeViewSx = {
  '& .MuiTreeItem-content': { py: 0.5 },
  '& .MuiTreeItem-iconContainer': { color: 'text.secondary' },
  '& .MuiTreeItem-groupTransition': {
    ml: 2,
    pl: 2,
    borderLeft: '1px solid',
    borderColor: 'divider',
  },
};

/** Hierarchy tree view — 전체 텍소노미 트리 렌더 */
function HierarchyTreeView({ data }) {
  const defaultExpanded = data.map((p) => p.id);

  return (
    <SimpleTreeView defaultExpandedItems={defaultExpanded} sx={treeViewSx}>
      {data.map((part) => (
        <TreeItem
          key={part.id}
          itemId={part.id}
          label={
            <TreeNodeLabel
              name={`Part ${part.number}: ${part.label}`}
              count={part.count}
            />
          }
        >
          {/* Part 3: movements — flat items */}
          {part.type === 'movements' && part.items?.map((item, i) => (
            <TreeItem
              key={`${part.id}-m-${i}`}
              itemId={`${part.id}-m-${i}`}
              label={
                <TreeNodeLabel name={item.name} secondary={item.feel} isMono />
              }
            />
          ))}

          {/* Parts 1, 2, 4: categories → groups → items */}
          {part.categories?.map((cat) => (
            <TreeItem
              key={cat.id}
              itemId={cat.id}
              label={
                <TreeNodeLabel
                  name={`${cat.number}. ${cat.name}`}
                  secondary={cat.subtitle}
                  count={cat.count}
                />
              }
            >
              {cat.groups.map((group, gi) => {
                // 서브그룹 라벨이 있으면 그룹 노드 추가
                if (group.label) {
                  const groupId = `${cat.id}-g${gi}`;
                  return (
                    <TreeItem
                      key={groupId}
                      itemId={groupId}
                      label={
                        <TreeNodeLabel
                          name={group.label}
                          count={group.items.length}
                        />
                      }
                    >
                      {group.items.map((item, ii) => (
                        <TreeItem
                          key={`${groupId}-i${ii}`}
                          itemId={`${groupId}-i${ii}`}
                          label={
                            <TreeNodeLabel
                              name={item.name}
                              secondary={item.description}
                              isMono
                            />
                          }
                        />
                      ))}
                    </TreeItem>
                  );
                }
                // 라벨 없으면 아이템 직접 렌더
                return group.items.map((item, ii) => (
                  <TreeItem
                    key={`${cat.id}-g${gi}-i${ii}`}
                    itemId={`${cat.id}-g${gi}-i${ii}`}
                    label={
                      <TreeNodeLabel
                        name={item.name}
                        secondary={item.description}
                        isMono
                      />
                    }
                  />
                ));
              })}
            </TreeItem>
          ))}
        </TreeItem>
      ))}
    </SimpleTreeView>
  );
}

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────

/**
 * TaxonomySection 컴포넌트
 *
 * Dictionary 페이지의 핵심 인터랙티브 영역.
 * Stats strip + Part tabs (sticky) + 카테고리 아코디언/트리 뷰 구성.
 * 뷰 모드 토글: list (아코디언) / tree (계층 트리)
 *
 * @param {string} defaultViewMode - 초기 뷰 모드 ('list' | 'tree') [Optional, 기본값: 'list']
 * @param {object} sx - 추가 스타일 [Optional]
 */
const TaxonomySection = forwardRef(function TaxonomySection({
  defaultViewMode = 'list',
  sx,
  ...props
}, ref) {
  const data = TAXONOMY;
  const stats = TAXONOMY_STATS;
  const [activeTab, setActiveTab] = useState(0);
  const [expandedIds, setExpandedIds] = useState(new Set());
  const [viewMode, setViewMode] = useState(defaultViewMode);
  const partRefs = useRef({});

  const handleTabChange = useCallback((_, newValue) => {
    setActiveTab(newValue);
    const partId = data[newValue]?.id;
    if (partId && partRefs.current[partId]) {
      partRefs.current[partId].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [data]);

  const handleAccordionChange = useCallback((categoryId) => (_, isExpanded) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (isExpanded) {
        next.add(categoryId);
      } else {
        next.delete(categoryId);
      }
      return next;
    });
  }, []);

  return (
    <Box ref={ref} sx={sx} {...props}>
      {/* Stats Strip */}
      <Container maxWidth="xl">
        <Divider />
        <StatsStrip stats={stats} />
        <Divider />
      </Container>

      {/* Sticky Part Tabs + View Toggle */}
      <Box
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          backgroundColor: 'hsl(260, 20%, 2%)',
          borderBottom: '1px solid hsl(260, 6%, 22%)',
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Part tabs — MUI Tabs 대신 직접 렌더 */}
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                overflow: 'auto',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
              }}
            >
              {data.map((part, i) => {
                const isActive = activeTab === i && viewMode !== 'tree';
                return (
                  <Box
                    key={part.id}
                    component="button"
                    onClick={() => handleTabChange(null, i)}
                    style={{
                      all: 'unset',
                      cursor: 'pointer',
                      padding: '16px 24px',
                      fontSize: '0.875rem',
                      whiteSpace: 'nowrap',
                      color: isActive ? 'hsl(260, 10%, 90%)' : 'hsl(260, 5%, 58%)',
                      borderBottom: isActive ? '1px solid hsl(260, 10%, 90%)' : '1px solid transparent',
                      transition: 'color 200ms',
                    }}
                  >
                    {part.label}
                    {' '}
                    <span style={{ fontFamily: '"IBM Plex Mono", monospace', opacity: 0.6, fontSize: '0.75rem' }}>
                      {part.count}
                    </span>
                  </Box>
                );
              })}
            </Box>

            {/* View mode toggle */}
            <Box sx={{ display: 'flex', flexShrink: 0, ml: 1 }}>
              {[
                { value: 'list', icon: <LayoutList size={18} />, label: 'List view' },
                { value: 'tree', icon: <Network size={18} />, label: 'Tree view' },
              ].map(({ value, icon, label }) => (
                <Box
                  key={value}
                  component="button"
                  aria-label={label}
                  onClick={() => setViewMode(value)}
                  style={{
                    all: 'unset',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px 12px',
                    color: viewMode === value ? 'hsl(260, 10%, 90%)' : 'hsl(260, 5%, 58%)',
                    backgroundColor: viewMode === value ? 'hsl(260, 12%, 8%)' : 'transparent',
                  }}
                >
                  {icon}
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Taxonomy Body */}
      <Container maxWidth="xl">
        {viewMode === 'tree' ? (
          /* ── Tree (hierarchy) mode ── */
          <Box sx={{ py: { xs: 4, md: 6 } }}>
            <HierarchyTreeView data={data} />
          </Box>
        ) : (
          /* ── List (accordion) mode ── */
          data.map((part) => (
            <Box
              key={part.id}
              id={part.id}
              ref={(el) => { partRefs.current[part.id] = el; }}
              sx={{ scrollMarginTop: 60 }}
            >
              <PartHeader part={part} />

              {/* Part 3: Movements — flat table */}
              {part.type === 'movements' && part.items && (
                <MovementsTable items={part.items} />
              )}

              {/* Parts 1, 2, 4: Category accordions */}
              {part.categories && part.categories.map((category) => (
                <CategoryAccordion
                  key={category.id}
                  category={category}
                  isInteractive={part.type === 'interactive'}
                  isReference={part.type === 'reference'}
                  expanded={expandedIds.has(category.id)}
                  onChange={handleAccordionChange(category.id)}
                />
              ))}
            </Box>
          ))
        )}
      </Container>
    </Box>
  );
});

export { TaxonomySection };

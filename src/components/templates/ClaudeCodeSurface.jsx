'use client';
import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { scaleLinear } from 'd3';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { Canvas, useFrame } from '@react-three/fiber';
import KeyboardArrowDownOutlined from '@mui/icons-material/KeyboardArrowDownOutlined';
import FolderOutlined from '@mui/icons-material/FolderOutlined';
import PlayArrowOutlined from '@mui/icons-material/PlayArrowOutlined';
import LanguageOutlined from '@mui/icons-material/LanguageOutlined';
import ChecklistOutlined from '@mui/icons-material/ChecklistOutlined';
import TuneOutlined from '@mui/icons-material/TuneOutlined';
import SmartToyOutlined from '@mui/icons-material/SmartToyOutlined';
import HubOutlined from '@mui/icons-material/HubOutlined';
import CellTowerOutlined from '@mui/icons-material/CellTowerOutlined';
import AccountTreeOutlined from '@mui/icons-material/AccountTreeOutlined';
import MemoryOutlined from '@mui/icons-material/MemoryOutlined';
import { IcebergSection } from '../container/IcebergSection';
import { RevealCard } from '../card/RevealCard';
import { ACTS, CALLOUTS, REVEALS, DUAL_BUILD_COMPARISON, DUAL_BUILD_STATS, TOOL_GRID, CC } from '@/data/claudeCodeExperimentData';

const CATEGORY_ICONS = {
  '파일 시스템': FolderOutlined,
  '실행': PlayArrowOutlined,
  '웹': LanguageOutlined,
  '태스크': ChecklistOutlined,
  '제어': TuneOutlined,
  '자율 에이전트': SmartToyOutlined,
  '멀티에이전트': HubOutlined,
  '알림 · 통신': CellTowerOutlined,
  '계획 · 격리': AccountTreeOutlined,
  '내부 런타임': MemoryOutlined,
};

const act = ACTS[0];

/**
 * ToolColumn — 도구 목록 컬럼 (카테고리 그룹 + hover 인터랙션)
 *
 * @param {Array<{category,tools}>} groups - 카테고리별 도구 그룹 [Required]
 * @param {string} header - 컬럼 헤더 [Required]
 * @param {boolean} isHidden - 비공개 도구 컬럼 여부 [Optional]
 * @param {{name,desc}|null} hoveredTool - 현재 hover 중인 도구 [Required]
 * @param {function} onHover - hover 콜백 [Required]
 */
function ToolColumn({ groups, header, isHidden, hoveredTool, onHover }) {
  const ROW = {
    display: 'flex',
    alignItems: 'center',
    height: 44,
    px: 3,
    borderBottom: '1px solid',
    borderColor: 'divider',
    overflow: 'hidden',
  };

  return (
    <Box>
      <Box sx={{ ...ROW, bgcolor: isHidden ? CC.orangeMuted : 'transparent' }}>
        <Typography variant="overline" sx={{ color: isHidden ? CC.orange : 'text.primary' }}>
          {header}
        </Typography>
      </Box>
      {groups.map((group) => (
        <Box key={group.category}>
          <Box sx={{ ...ROW, gap: 0.75 }}>
            {(() => {
              const Icon = CATEGORY_ICONS[group.category];
              return Icon ? (
                <Icon sx={{ fontSize: 14, color: isHidden ? CC.orangeLight : 'text.secondary' }} />
              ) : null;
            })()}
            <Typography
              variant="caption"
              sx={{
                color: isHidden ? CC.orangeLight : 'text.secondary',
                fontWeight: 700,
                letterSpacing: '0.04em',
              }}
            >
              {group.category}
            </Typography>
          </Box>
          {group.tools.map((tool) => {
            const isActive = hoveredTool?.name === tool.name;
            return (
              <Box
                key={tool.name}
                onMouseEnter={() => onHover(tool)}
                onMouseLeave={() => onHover(null)}
                sx={{
                  ...ROW,
                  justifyContent: 'space-between',
                  cursor: 'default',
                  bgcolor: isActive
                    ? (isHidden ? CC.orangeMuted : 'action.hover')
                    : 'transparent',
                  transition: 'background-color 0.15s',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: 'var(--font-mono, "IBM Plex Mono"), monospace',
                    color: isActive
                      ? (isHidden ? CC.orange : 'text.primary')
                      : (isHidden ? 'text.secondary' : 'text.primary'),
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {tool.name}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    display: { xs: 'none', sm: 'block' },
                    textAlign: 'right',
                    maxWidth: 200,
                  }}
                >
                  {tool.desc}
                </Typography>
              </Box>
            );
          })}
        </Box>
      ))}
    </Box>
  );
}

const MONO = 'var(--font-mono, "IBM Plex Mono"), monospace';
const W = { white10: 'rgba(255,255,255,0.10)', white30: 'rgba(255,255,255,0.30)', white50: 'rgba(255,255,255,0.50)' };

/* ─── Claw'd 복셀 (스크롤 연동 재등장) ─── */

const CLAW_ORANGE = '#E57B55';
const CLAW_BLACK = '#1A1A1A';

function buildClawdBlocks() {
  const blocks = [];
  const bodyW = 9;
  const off = -4;
  const bodyD = 3;
  const zOff = -1;
  for (const lx of [0, 2, 6, 8]) {
    for (const lz of [0, 2]) {
      for (let y = 0; y <= 2; y++) {
        blocks.push({ x: lx + off, y, z: lz + zOff, color: CLAW_ORANGE });
      }
    }
  }
  for (let y = 3; y <= 5; y++) {
    for (let x = 0; x < bodyW; x++) {
      for (let z = 0; z < bodyD; z++) {
        const c = (y === 4 && z === 0 && (x === 3 || x === 5)) ? CLAW_BLACK : CLAW_ORANGE;
        blocks.push({ x: x + off, y, z: z + zOff, color: c });
      }
    }
  }
  for (let ax = 1; ax <= 2; ax++) {
    for (let z = 0; z < bodyD; z++) {
      blocks.push({ x: off - ax, y: 4, z: z + zOff, color: CLAW_ORANGE });
      blocks.push({ x: bodyW + off - 1 + ax, y: 4, z: z + zOff, color: CLAW_ORANGE });
    }
  }
  return blocks;
}

const clawdProgress = { current: 0 };

function ClawdScrollModel() {
  const groupRef = useRef();
  const { orangeBlocks, blackBlocks } = useMemo(() => {
    const all = buildClawdBlocks();
    return {
      orangeBlocks: all.filter((b) => b.color === CLAW_ORANGE),
      blackBlocks: all.filter((b) => b.color === CLAW_BLACK),
    };
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    const p = clawdProgress.current;
    groupRef.current.rotation.y = p * Math.PI;
    groupRef.current.position.y = p * 3;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={0.3}>
      {orangeBlocks.map((b, i) => (
        <mesh key={`o-${i}`} position={[b.x, b.y, b.z]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={CLAW_ORANGE} roughness={0.85} />
        </mesh>
      ))}
      {blackBlocks.map((b, i) => (
        <mesh key={`b-${i}`} position={[b.x, b.y, b.z]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={CLAW_BLACK} roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * CalloutStrip — 수직 border 구분 + 카운터 애니메이션
 */
function CalloutStrip() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const dur = 1200;
          const t0 = performance.now();
          const step = (now) => {
            const raw = Math.min((now - t0) / dur, 1);
            setProgress(1 - (1 - raw) ** 3);
            if (raw < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const items = CALLOUTS[1];

  const formatValue = (val) => {
    const num = parseInt(val.replace(/,/g, ''), 10);
    if (Number.isNaN(num)) return val;
    const current = Math.round(num * progress);
    return num >= 1000 ? current.toLocaleString() : String(current);
  };

  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        mb: { xs: 5, md: 8 },
      }}
    >
      {items.map((c, i) => (
        <Box
          key={c.caption}
          sx={{
            flex: 1,
            pl: i > 0 ? { xs: 2, md: 4 } : 0,
            borderLeft: i > 0 ? '1px solid' : 'none',
            borderColor: 'divider',
          }}
        >
          <Typography
            component="div"
            sx={{
              fontFamily: MONO,
              fontVariantNumeric: 'tabular-nums',
              fontSize: { xs: '3rem', md: '4.5rem' },
              lineHeight: 1,
              color: i === 0 ? CC.orange : 'text.primary',
              fontWeight: 700,
            }}
          >
            {formatValue(c.value)}
          </Typography>
          <Typography
            variant="body2"
            component="div"
            sx={{ color: 'text.secondary', mt: 1 }}
          >
            {c.caption}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

/**
 * DualBuildChart — D3 스케일 + 스크롤 트리거 카운트업 애니메이션
 */
function DualBuildChart() {
  const chartRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const animated = useRef(false);

  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const dur = 1400;
          const t0 = performance.now();
          const step = (now) => {
            const raw = Math.min((now - t0) / dur, 1);
            setProgress(1 - (1 - raw) ** 3);
            if (raw < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const margin = { top: 0, right: 120, bottom: 20, left: 0 };
  const width = 960;
  const barH = 44;
  const gap = 16;
  const innerH = DUAL_BUILD_STATS.length * (barH + gap) - gap;
  const height = margin.top + innerH + margin.bottom;
  const innerW = width - margin.left - margin.right;

  const xScale = useMemo(() => {
    const maxVal = Math.max(...DUAL_BUILD_STATS.map((d) => d.public + d.hidden));
    return scaleLinear().domain([0, maxVal]).range([0, innerW]).nice();
  }, [innerW]);

  const ticks = useMemo(() => xScale.ticks(4), [xScale]);

  return (
    <Box ref={chartRef} sx={{ mb: { xs: 5, md: 8 } }}>
      {/* 범례 */}
      <Box sx={{ display: 'flex', gap: 3, mb: 1.5 }}>
        {[
          { color: W.white10, label: '공개' },
          { color: CC.orange, label: '비공개' },
        ].map((l) => (
          <Box key={l.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box sx={{ width: 10, height: 10, bgcolor: l.color, flexShrink: 0 }} />
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {l.label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* 모바일 텍스트 폴백 */}
      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        {DUAL_BUILD_STATS.map((row) => {
          const total = row.public + row.hidden;
          return (
            <Box key={row.label} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1 }}>
              <Box sx={{ flex: 1, display: 'flex', height: 20 }}>
                {row.public > 0 && (
                  <Box sx={{ flex: row.public, bgcolor: W.white10 }} />
                )}
                <Box sx={{ flex: row.hidden, bgcolor: CC.orange, opacity: 0.78 }} />
              </Box>
              <Typography
                variant="code"
                sx={{ color: 'text.secondary', minWidth: 80, textAlign: 'right', fontSize: '0.7rem' }}
              >
                {Math.round(total * progress)} {row.label}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }}>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          {/* 수직 그리드 */}
          {ticks.map((t) => (
            <line
              key={t}
              x1={xScale(t)} y1={0} x2={xScale(t)} y2={innerH}
              stroke="rgba(255,255,255,0.06)" strokeWidth={1}
            />
          ))}

          {/* 베이스 라인 */}
          <line x1={0} y1={innerH} x2={innerW} y2={innerH} stroke={W.white10} strokeWidth={1} />

          {/* 바 */}
          {DUAL_BUILD_STATS.map((row, i) => {
            const y = i * (barH + gap);
            const total = row.public + row.hidden;
            const wPub = xScale(row.public) * progress;
            const wHid = xScale(row.hidden) * progress;
            const dispPub = Math.round(row.public * progress);
            const dispHid = Math.round(row.hidden * progress);
            const dispTotal = Math.round(total * progress);

            return (
              <g key={row.label} transform={`translate(0,${y})`}>
                {/* 공개 세그먼트 */}
                {row.public > 0 && (
                  <>
                    <rect x={0} y={0} width={wPub} height={barH} fill={W.white10} rx={1} />
                    {wPub > 22 && (
                      <text
                        x={wPub / 2} y={barH / 2}
                        textAnchor="middle" dominantBaseline="central"
                        fill={W.white50} fontSize={7.5} fontWeight={600} fontFamily={MONO}
                      >
                        {dispPub}
                      </text>
                    )}
                    {progress > 0.1 && (
                      <line x1={wPub} y1={0} x2={wPub} y2={barH} stroke={W.white30} strokeWidth={0.5} />
                    )}
                  </>
                )}

                {/* 비공개 세그먼트 */}
                {wHid > 0 && (
                  <rect
                    x={wPub} y={0} width={wHid} height={barH}
                    fill={CC.orange} opacity={0.78} rx={1}
                  />
                )}
                {wHid > 22 && (
                  <text
                    x={wPub + wHid / 2} y={barH / 2}
                    textAnchor="middle" dominantBaseline="central"
                    fill={CC.black} fontSize={7.5} fontWeight={600} fontFamily={MONO}
                  >
                    {dispHid}
                  </text>
                )}

                {/* 우측: 합계 + 라벨 */}
                <text
                  x={innerW + 10} y={barH / 2}
                  textAnchor="start" dominantBaseline="central" fontFamily={MONO}
                >
                  <tspan fill={W.white50} fontSize={8} fontWeight={600}>{dispTotal}</tspan>
                  <tspan fill={W.white30} fontSize={7.5} dx={5}>{row.label}</tspan>
                </text>
              </g>
            );
          })}

          {/* 틱 라벨 */}
          {ticks.map((t) => (
            <text
              key={t}
              x={xScale(t)} y={innerH + 12}
              textAnchor="middle"
              fill={W.white30} fontSize={7.5} fontFamily={MONO}
            >
              {t}
            </text>
          ))}
        </g>
      </svg>
      </Box>
    </Box>
  );
}

/**
 * ClaudeCodeSurface
 *
 * § 1. Act 1 — 이중 빌드. 도구 테이블 + 비교 블록.
 */
export function ClaudeCodeSurface() {
  const [hoveredTool, setHoveredTool] = useState(null);
  const [tableOpen, setTableOpen] = useState(false);
  const quoteRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (!quoteRef.current) return;
      const rect = quoteRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = 1 - rect.bottom / (vh + rect.height);
      clawdProgress.current = Math.max(0, Math.min(1, p));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <IcebergSection
      depth="shallow"
      density="standard"
      overline="Act 1 · 이중 빌드"
      tagline={act.tagline}
      transition={act.transition}
    >
      {/* 핵심 수치 — 수직 border 구분 + 카운터 */}
      <CalloutStrip />

      {/* 인프라 비례 차트 */}
      <DualBuildChart />

      {/* 42개 도구 테이블 — 미리보기 + 펼치기 */}
      <Box sx={{ mb: { xs: 5, md: 8 } }}>
        {/* 테이블 영역: 접힌 상태에서 8 row(헤더+첫 카테고리) 노출 */}
        <Box
          sx={{
            position: 'relative',
            maxHeight: tableOpen ? 'none' : 44 * 8,
            overflow: 'hidden',
            transition: 'max-height 0.5s ease',
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: { xs: 0, md: 3 },
            }}
          >
            <ToolColumn
              groups={TOOL_GRID.public}
              header="공개 — 16개"
              hoveredTool={hoveredTool}
              onHover={setHoveredTool}
            />
            <ToolColumn
              groups={TOOL_GRID.hidden}
              header="비공개 — 26개"
              isHidden
              hoveredTool={hoveredTool}
              onHover={setHoveredTool}
            />
          </Box>

          {/* 그라데이션 페이드 */}
          {!tableOpen && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 80,
                background: 'linear-gradient(to bottom, transparent, #0A0A0A)',
                pointerEvents: 'none',
              }}
            />
          )}
        </Box>

        {/* 토글 버튼 */}
        <ButtonBase
          onClick={() => setTableOpen((v) => !v)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.75,
            width: '100%',
            py: 2,
            mt: 1,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {tableOpen ? '접기' : '나머지 도구 펼치기'}
          </Typography>
          <KeyboardArrowDownOutlined
            sx={{
              fontSize: 16,
              color: 'text.secondary',
              transition: 'transform 0.3s',
              transform: tableOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </ButtonBase>

        {/* 모바일: hover 설명 패널 */}
        <Box
          sx={{
            display: { xs: 'block', sm: 'none' },
            minHeight: 48,
            mt: 2,
            p: hoveredTool ? 3 : 0,
            bgcolor: hoveredTool ? CC.orangeMuted : 'transparent',
            transition: 'all 0.15s',
          }}
        >
          {hoveredTool && (
            <>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: 'var(--font-mono, "IBM Plex Mono"), monospace',
                  fontWeight: 600,
                  color: CC.orange,
                }}
              >
                {hoveredTool.name}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {hoveredTool.desc}
              </Typography>
            </>
          )}
        </Box>
      </Box>

      {/* 이중 빌드 비교 — 2컬럼 그리드 카드 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: { xs: 2, md: 3 },
          mb: { xs: 5, md: 8 },
        }}
      >
        {[DUAL_BUILD_COMPARISON.external, DUAL_BUILD_COMPARISON.internal].map(
          (side, i) => (
            <Box
              key={side.label}
              sx={{
                p: { xs: 3, md: 4 },
                bgcolor: i === 1 ? CC.orangeMuted : 'action.hover',
              }}
            >
              <Typography
                variant="overline"
                sx={{
                  color: i === 1 ? CC.orange : 'text.secondary',
                  display: 'block',
                  mb: 3,
                }}
              >
                {side.label}
              </Typography>
              {side.items.map((item) => (
                <Box
                  key={item.metric}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    py: 1.5,
                  }}
                >
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {item.metric}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: 'var(--font-mono, "IBM Plex Mono"), monospace',
                      fontWeight: 600,
                      color: i === 1 ? CC.orangeLight : 'text.primary',
                    }}
                  >
                    {item.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          ),
        )}
      </Box>

      {/* 인용 블록 + Claw'd 재등장 */}
      <Box
        ref={quoteRef}
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: { xs: 3, md: 4 },
          alignItems: 'center',
          py: { xs: 4, md: 6 },
          mb: { xs: 5, md: 8 },
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{ color: CC.orange, mb: 3 }}
          >
            {act.pullQuote}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'text.secondary', lineHeight: 1.8 }}
          >
            {act.description}
          </Typography>
        </Box>
        <Box
          sx={{
            height: { xs: 280, md: 400 },
            pointerEvents: 'none',
          }}
        >
          <Canvas
            orthographic
            frameloop="always"
            camera={{ zoom: 55, position: [10, 8, -10], near: -100, far: 100 }}
            style={{ width: '100%', height: '100%' }}
            gl={{ alpha: true }}
          >
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 10, -5]} intensity={0.5} />
            <ClawdScrollModel />
          </Canvas>
        </Box>
      </Box>

      {/* Reveals — 2컬럼 그리드 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: { xs: 0, md: 3 },
        }}
      >
        {REVEALS[1].map((r) => (
          <RevealCard
            key={r.id}
            title={r.titleKo}
            description={r.descriptionKo}
            quote={r.quote}
            surpriseLevel={r.surpriseLevel}
          />
        ))}
      </Box>
    </IcebergSection>
  );
}

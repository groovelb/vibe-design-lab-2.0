'use client';
import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BUDDY_SPECIES } from '@/data/buddySpecies';

/**
 * FloatingBuddies
 *
 * Buddy ASCII 캐릭터를 반복 그리드 패턴으로 배경에 깔아주는 장식 레이어.
 *
 * @param {string} color - ASCII 텍스트 색상 [Optional]
 * @param {number} cols - 열 수 [Optional, default: 7]
 * @param {number} rows - 행 수 [Optional, default: 5]
 */
export function FloatingBuddies({ color = 'rgba(255,255,255,0.14)', cols = 7, rows = 5 }) {
  const grid = useMemo(() => {
    const cells = [];
    const total = cols * rows;
    for (let i = 0; i < total; i++) {
      cells.push({
        species: BUDDY_SPECIES[i % BUDDY_SPECIES.length],
        col: i % cols,
        row: Math.floor(i / cols),
      });
    }
    return cells;
  }, [cols, rows]);

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        alignItems: 'center',
        justifyItems: 'center',
      }}
    >
      {grid.map((cell) => (
        <Typography
          key={`${cell.row}-${cell.col}`}
          component="span"
          sx={{
            fontFamily: 'var(--font-mono, "IBM Plex Mono"), monospace',
            fontSize: { xs: '0.65rem', md: '0.85rem' },
            color,
            whiteSpace: 'nowrap',
            userSelect: 'none',
            // 홀수 행 살짝 오프셋 → 벽돌 패턴
            transform: cell.row % 2 === 1 ? 'translateX(50%)' : 'none',
          }}
        >
          {cell.species.ascii}
        </Typography>
      ))}
    </Box>
  );
}

'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  DocumentTitle,
  PageContainer,
  SectionTitle,
} from '../../../components/storybookDocumentation';
import { IsometricGridReference } from '../../../assets/brandIllustration/IsometricGridReference';

export default {
  title: 'Overview/UX/Isometric Grid Reference',
  parameters: {
    layout: 'padded',
  },
};

/**
 * 다크 배경 프리뷰 패널
 *
 * @param {ReactNode} children - 콘텐츠 [Required]
 * @param {string} label - 레이블 [Optional]
 * @param {number} maxWidth - 최대 너비 [Optional, 기본값: 560]
 */
const DarkPanel = ({ children, label, maxWidth = 560 }) => (
  <Box
    sx={{
      border: '1px solid',
      borderColor: 'divider',
      overflow: 'hidden',
      mb: 3,
    }}
  >
    {label && (
      <Box
        sx={{
          px: 2,
          py: 1,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'monospace',
            fontSize: 11,
            color: 'text.secondary',
          }}
        >
          {label}
        </Typography>
      </Box>
    )}
    <Box
      sx={{
        bgcolor: 'var(--vdl-950)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 6,
      }}
    >
      <Box sx={{ width: '100%', maxWidth }}>
        {children}
      </Box>
    </Box>
  </Box>
);

export const Docs = {
  render: () => (
    <>
      <DocumentTitle
        title="Isometric Grid Reference"
        status="Prototype"
        note="3개 VP 일러스트가 공유하는 아이소메트릭 좌표계 시각 검증"
        brandName="Vibe Design Labs"
        systemName="Brand Visual"
        version="0.1"
      />
      <PageContainer>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Isometric Coordinate System
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          VP1(System Over Drawing), VP2(The Vibe Standard), VP3(Design As Build)가
          공유하는 표준 아이소메트릭 좌표계. 동일 각도(~26.57°), 동일 단위(8px),
          동일 원점을 기반으로 공간적 통일감을 확보한다.
        </Typography>

        <SectionTitle
          title="좌표계 시각 레퍼런스"
          description="바닥면(Floor) + 좌측벽(Left Wall) + 우측벽(Right Wall) 그리드, 3축, Prism/Card 배치 예시, Naming Line, Dimension Line"
        />
        <DarkPanel label="IsometricGridReference · 280×280 · unit: 8px">
          <IsometricGridReference style={{ width: '100%', height: 'auto' }} />
        </DarkPanel>

        <SectionTitle
          title="좌표 변환 공식"
          description="아이소메트릭 3축 → 스크린 2D 변환"
        />
        <Box
          component="pre"
          sx={{
            fontFamily: 'monospace',
            fontSize: 12,
            color: 'text.secondary',
            bgcolor: 'action.hover',
            p: 3,
            mb: 4,
            overflow: 'auto',
            lineHeight: 1.8,
          }}
        >
{`screenX = originX + (ix - iy) × 8
screenY = originY + (ix + iy) × 4 - iz × 8

3축:
  X → screen (+8, +4)   우하 대각
  Y → screen (-8, +4)   좌하 대각
  Z → screen (0, -8)    수직 상승

3평면:
  Floor      = X × Y    다이아몬드 (바닥)
  Right Wall = X × Z    우측 면
  Left Wall  = Y × Z    좌측 면`}
        </Box>

        <SectionTitle
          title="API"
          description="isometricGrid.js 유틸리티 함수"
        />
        <Box
          component="pre"
          sx={{
            fontFamily: 'monospace',
            fontSize: 11,
            color: 'text.secondary',
            bgcolor: 'action.hover',
            p: 3,
            mb: 4,
            overflow: 'auto',
            lineHeight: 1.7,
          }}
        >
{`// 좌표 변환
isoToScreen(ix, iy, iz?, origin?)     → { x, y }
floorToScreen(ix, iy, origin?)        → { x, y }
rightWallToScreen(ix, iz, iy?, origin?) → { x, y }
leftWallToScreen(iy, iz, ix?, origin?)  → { x, y }

// 프리미티브 생성
prism(ix, iy, iz, w, d, h, origin?)   → { outline, vLine, top, center, bottom }
card(ix, iy, iz, w, h, origin?)       → { outline, vLine }

// 그리드
floorGrid(rangeX, rangeY, step?, origin?)       → { xLines[], yLines[] }
rightWallGrid(rangeX, rangeZ, iy?, step?, origin?) → { hLines[], vLines[] }
leftWallGrid(rangeY, rangeZ, ix?, step?, origin?)  → { hLines[], vLines[] }

// 어노테이션
namingLine(fromX, fromY, length, dir?)  → { line, dot, labelAnchor }
dimensionLine(x1, y1, x2, y2, offset?) → { line, ticks[], midpoint }`}
        </Box>
      </PageContainer>
    </>
  ),
};

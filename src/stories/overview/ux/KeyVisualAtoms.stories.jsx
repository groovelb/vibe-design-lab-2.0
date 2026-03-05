'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  DocumentTitle,
  PageContainer,
  SectionTitle,
} from '../../../components/storybookDocumentation';

export default {
  title: 'Overview/UX/Key Visual Atoms',
  parameters: {
    layout: 'padded',
  },
};

// ============================================================
// 공통 — 다크 캔버스
// ============================================================

/**
 * 다크 배경 SVG 프리뷰 패널
 *
 * @param {ReactNode} children - SVG 콘텐츠 [Required]
 * @param {string} label - 패널 레이블 [Optional]
 * @param {string} sublabel - 보조 설명 [Optional]
 * @param {number} height - 패널 높이 [Optional, 기본값: 280]
 */
const DarkPanel = ({ children, label, sublabel, height = 280 }) => (
  <Box
    sx={ {
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 0,
      overflow: 'hidden',
      mb: 2,
    } }
  >
    <Box
      sx={ {
        bgcolor: 'var(--vdl-950)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: height,
        position: 'relative',
      } }
    >
      { label && (
        <Typography
          variant="caption"
          sx={ {
            position: 'absolute',
            top: 12,
            left: 16,
            color: 'var(--vdl-600)',
            fontFamily: 'monospace',
            fontSize: 11,
          } }
        >
          { label }
        </Typography>
      ) }
      { sublabel && (
        <Typography
          variant="caption"
          sx={ {
            position: 'absolute',
            top: 12,
            right: 16,
            color: 'var(--vdl-700)',
            fontFamily: 'monospace',
            fontSize: 10,
          } }
        >
          { sublabel }
        </Typography>
      ) }
      { children }
    </Box>
  </Box>
);

/**
 * 가로 나란히 배치하는 패널 그룹
 *
 * @param {ReactNode} children - DarkPanel 콘텐츠들 [Required]
 */
const PanelRow = ({ children }) => (
  <Box sx={ { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2, mb: 2 } }>
    { children }
  </Box>
);

// ============================================================
// ATOM 1 — Monoline Stroke Weight
// ============================================================

const MonolineTest = ({ weight, label }) => (
  <DarkPanel label={ label } sublabel={ `stroke: ${weight}px` } height={ 240 }>
    <svg width="260" height="200" viewBox="0 0 260 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 직선 */}
      <line
        x1="30" y1="40" x2="230" y2="40"
        stroke="var(--vdl-200)" strokeWidth={ weight }
        strokeLinecap="round"
      />
      <text x="240" y="43" fill="var(--vdl-600)" fontSize="9" fontFamily="monospace">line</text>

      {/* 직각 꺾임 (Naming Line / Circuitry 패턴) */}
      <polyline
        points="30,80 100,80 100,120 180,120"
        stroke="var(--vdl-200)" strokeWidth={ weight }
        strokeLinecap="round" strokeLinejoin="round"
        fill="none"
      />
      <circle cx="30" cy="80" r="2" fill="var(--vdl-200)" />
      <text x="186" y="123" fill="var(--vdl-600)" fontSize="9" fontFamily="monospace">bend</text>

      {/* 아이소메트릭 Prism 아웃라인 */}
      <g transform="translate(130, 155)">
        <path
          d="M0 -20 l30 15 v24 l-30 15 l-30 -15 v-24 z"
          stroke="var(--vdl-200)" strokeWidth={ weight }
          strokeLinecap="round" strokeLinejoin="round"
          fill="var(--vdl-950)"
        />
        <path
          d="M-30 -5 l30 15 l30 -15"
          stroke="var(--vdl-800)" strokeWidth={ weight }
          strokeLinecap="round" strokeLinejoin="round"
          fill="none"
        />
      </g>
      <text x="170" y="160" fill="var(--vdl-600)" fontSize="9" fontFamily="monospace">prism</text>

      {/* 가는 보조선 (subtle) */}
      <line
        x1="30" y1="180" x2="230" y2="180"
        stroke="var(--vdl-800)" strokeWidth={ weight }
        strokeLinecap="round"
      />
      <text x="236" y="183" fill="var(--vdl-700)" fontSize="8" fontFamily="monospace">subtle</text>
    </svg>
  </DarkPanel>
);

// ============================================================
// ATOM 2 — Violet-Gray Palette
// ============================================================

const PaletteStrip = () => {
  const steps = [
    { token: '950', hsl: 'hsl(260,20%,4%)', role: 'bg-primary' },
    { token: '900', hsl: 'hsl(260,16%,8%)', role: 'bg-secondary' },
    { token: '800', hsl: 'hsl(260,12%,18%)', role: 'line-subtle / divider' },
    { token: '700', hsl: 'hsl(260,8%,28%)', role: 'text-disabled' },
    { token: '600', hsl: 'hsl(260,6%,38%)', role: '' },
    { token: '500', hsl: 'hsl(260,6%,48%)', role: '' },
    { token: '400', hsl: 'hsl(260,5%,58%)', role: '' },
    { token: '300', hsl: 'hsl(260,5%,68%)', role: '' },
    { token: '200', hsl: 'hsl(260,8%,82%)', role: 'text-secondary' },
    { token: '100', hsl: 'hsl(260,10%,90%)', role: '' },
    { token: '50', hsl: 'hsl(260,12%,96%)', role: 'text-primary' },
  ];

  return (
    <Box sx={ { mb: 2 } }>
      {/* 컬러 스트립 */}
      <Box sx={ { display: 'flex', height: 64, mb: 1 } }>
        { steps.map((s) => (
          <Box
            key={ s.token }
            sx={ {
              flex: 1,
              bgcolor: `var(--vdl-${s.token})`,
              border: '1px solid',
              borderColor: 'var(--vdl-800)',
            } }
          />
        )) }
      </Box>
      {/* 레이블 */}
      <Box sx={ { display: 'flex' } }>
        { steps.map((s) => (
          <Box key={ s.token } sx={ { flex: 1, px: 0.25 } }>
            <Typography sx={ { fontFamily: 'monospace', fontSize: 10, color: 'text.secondary' } }>
              { s.token }
            </Typography>
            { s.role && (
              <Typography sx={ { fontFamily: 'monospace', fontSize: 8, color: 'text.disabled', mt: 0.25 } }>
                { s.role }
              </Typography>
            ) }
          </Box>
        )) }
      </Box>

      {/* saturation 비교 — 순수 gray vs violet-tinted */}
      <Box sx={ { mt: 3, display: 'flex', gap: 2 } }>
        <Box sx={ { flex: 1 } }>
          <Typography sx={ { fontFamily: 'monospace', fontSize: 10, color: 'text.secondary', mb: 0.5 } }>
            violet-tinted (hue 260°)
          </Typography>
          <Box sx={ { display: 'flex', height: 40 } }>
            { [4, 8, 18, 28, 48, 82, 96].map((l) => (
              <Box
                key={ l }
                sx={ {
                  flex: 1,
                  bgcolor: `hsl(260, ${l < 20 ? 16 : l < 50 ? 6 : 10}%, ${l}%)`,
                  border: '1px solid',
                  borderColor: 'var(--vdl-800)',
                } }
              />
            )) }
          </Box>
        </Box>
        <Box sx={ { flex: 1 } }>
          <Typography sx={ { fontFamily: 'monospace', fontSize: 10, color: 'text.secondary', mb: 0.5 } }>
            neutral gray (hue 0°, sat 0%)
          </Typography>
          <Box sx={ { display: 'flex', height: 40 } }>
            { [4, 8, 18, 28, 48, 82, 96].map((l) => (
              <Box
                key={ l }
                sx={ {
                  flex: 1,
                  bgcolor: `hsl(0, 0%, ${l}%)`,
                  border: '1px solid',
                  borderColor: 'var(--vdl-800)',
                } }
              />
            )) }
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

// ============================================================
// ATOM 3 — Angle Bracket `<` Proportions
// ============================================================

const AngleBracketTest = ({ angle, ratio, label }) => {
  // angle: 꺾임 각도 (작을수록 예리), ratio: 세로/가로 비율
  const w = 40;
  const h = w * ratio;
  const cx = 50;
  const cy = 60;

  return (
    <DarkPanel label={ label } sublabel={ `angle ${angle}° · ratio 1:${ratio}` } height={ 160 }>
      <svg width="100" height="120" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polyline
          points={ `${cx + w / 2},${cy - h / 2} ${cx - w / 2},${cy} ${cx + w / 2},${cy + h / 2}` }
          stroke="var(--vdl-200)" strokeWidth="1"
          strokeLinecap="round" strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </DarkPanel>
  );
};

// ============================================================
// ATOM 4 — Dot Sizes
// ============================================================

const DotTest = () => (
  <DarkPanel label="ATOM 4 — Dot" sublabel="Naming Line origin" height={ 160 }>
    <svg width="360" height="120" viewBox="0 0 360 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      { [
        { r: 1.5, x: 50, label: '3px' },
        { r: 2, x: 130, label: '4px' },
        { r: 2.5, x: 210, label: '5px' },
        { r: 3, x: 290, label: '6px' },
      ].map(({ r, x, label }) => (
        <g key={ label }>
          {/* 도트 */}
          <circle cx={ x } cy="50" r={ r } fill="var(--vdl-200)" />
          {/* 도트에서 이어지는 Naming Line */}
          <line
            x1={ x + r + 4 } y1="50" x2={ x + 50 } y2="50"
            stroke="var(--vdl-200)" strokeWidth="1" strokeLinecap="round"
          />
          {/* 레이블 */}
          <text x={ x - 4 } y="85" fill="var(--vdl-600)" fontSize="10" fontFamily="monospace">
            { label }
          </text>
          {/* 실제 사이즈 표시 */}
          <text x={ x - 6 } y="98" fill="var(--vdl-700)" fontSize="8" fontFamily="monospace">
            r={ r }
          </text>
        </g>
      )) }
    </svg>
  </DarkPanel>
);

// ============================================================
// ATOM 5 — Syntax Highlight Colors
// ============================================================

const SyntaxColorSet = ({ label, colors }) => (
  <DarkPanel label={ label } height={ 220 }>
    <svg width="320" height="180" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* bg-secondary 코드 블록 */}
      <rect x="20" y="16" width="280" height="148" rx="0" fill="var(--vdl-900)" />

      {/* 코드 라인 시뮬레이션 */}
      <text x="36" y="44" fontFamily="monospace" fontSize="12">
        <tspan fill={ colors.keyword }>{'<V'}</tspan>
        <tspan fill={ colors.attr }>{' design'}</tspan>
        <tspan fill="var(--vdl-600)">{'='}</tspan>
        <tspan fill={ colors.string }>{'"system-over-drawing"'}</tspan>
      </text>
      <text x="56" y="64" fontFamily="monospace" fontSize="12">
        <tspan fill={ colors.attr }>{'standard'}</tspan>
        <tspan fill="var(--vdl-600)">{'='}</tspan>
        <tspan fill={ colors.string }>{'"vibe"'}</tspan>
      </text>
      <text x="56" y="84" fontFamily="monospace" fontSize="12">
        <tspan fill={ colors.attr }>{'build'}</tspan>
        <tspan fill="var(--vdl-600)">{'='}</tspan>
        <tspan fill={ colors.boolean }>{'{ true }'}</tspan>
      </text>
      <text x="36" y="104" fontFamily="monospace" fontSize="12">
        <tspan fill={ colors.keyword }>{'/>'}</tspan>
      </text>

      {/* 행번호 */}
      { [1, 2, 3, 4].map((n, i) => (
        <text
          key={ n }
          x="28"
          y={ 44 + i * 20 }
          fill="var(--vdl-700)"
          fontFamily="monospace"
          fontSize="10"
          textAnchor="end"
        >
          { n }
        </text>
      )) }

      {/* 컬러 스와치 */}
      <g transform="translate(36, 130)">
        { Object.entries(colors).map(([name, color], i) => (
          <g key={ name } transform={ `translate(${i * 68}, 0)` }>
            <rect width="12" height="12" fill={ color } rx="0" />
            <text x="16" y="10" fill="var(--vdl-400)" fontFamily="monospace" fontSize="9">
              { name }
            </text>
          </g>
        )) }
      </g>
    </svg>
  </DarkPanel>
);

// ============================================================
// MOLECULE — Naming Line
// ============================================================

const NamingLineTest = () => (
  <DarkPanel label="MOLECULE — Naming Line" sublabel="dot(4px) + 1px line + monospace label" height={ 280 }>
    <svg width="400" height="240" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 8px Grid 배경 (subtle) */}
      <defs>
        <pattern id="grid8" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="0" cy="0" r="0.4" fill="var(--vdl-800)" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="400" height="240" fill="url(#grid8)" />

      {/* 수평 Naming Line */}
      <circle cx="40" cy="50" r="2" fill="var(--vdl-200)" />
      <line x1="44" y1="50" x2="120" y2="50" stroke="var(--vdl-200)" strokeWidth="1" strokeLinecap="round" />
      <text x="128" y="53" fill="var(--vdl-200)" fontFamily="monospace" fontSize="12">bg-primary</text>

      {/* 직각 꺾임 Naming Line (가장 일반적) */}
      <circle cx="40" cy="100" r="2" fill="var(--vdl-200)" />
      <polyline
        points="44,100 80,100 80,120 120,120"
        stroke="var(--vdl-200)" strokeWidth="1"
        strokeLinecap="round" strokeLinejoin="round"
        fill="none"
      />
      <text x="128" y="123" fill="var(--vdl-200)" fontFamily="monospace" fontSize="12">border-radius: 0</text>

      {/* 수직 Naming Line */}
      <circle cx="40" cy="160" r="2" fill="var(--vdl-200)" />
      <polyline
        points="40,164 40,190 80,190"
        stroke="var(--vdl-200)" strokeWidth="1"
        strokeLinecap="round" strokeLinejoin="round"
        fill="none"
      />
      <text x="88" y="193" fill="var(--vdl-200)" fontFamily="monospace" fontSize="12">typography.h2</text>

      {/* 복수 Naming Line (Circuitry 연결) */}
      <g transform="translate(230, 30)">
        {/* 대상 오브젝트 (사각형) */}
        <rect x="20" y="20" width="60" height="80" fill="var(--vdl-900)" stroke="var(--vdl-800)" strokeWidth="1" />

        {/* Line 1 → 상단 */}
        <circle cx="20" cy="30" r="2" fill="var(--vdl-200)" />
        <polyline
          points="16,30 -20,30"
          stroke="var(--vdl-200)" strokeWidth="1"
          strokeLinecap="round" fill="none"
        />
        <text x="-78" y="33" fill="var(--vdl-200)" fontFamily="monospace" fontSize="10">padding</text>

        {/* Line 2 → 중단 */}
        <circle cx="20" cy="60" r="2" fill="var(--vdl-200)" />
        <polyline
          points="16,60 -10,60 -10,55 -20,55"
          stroke="var(--vdl-200)" strokeWidth="1"
          strokeLinecap="round" strokeLinejoin="round" fill="none"
        />
        <text x="-68" y="58" fill="var(--vdl-200)" fontFamily="monospace" fontSize="10">color</text>

        {/* Line 3 → 하단 */}
        <circle cx="20" cy="90" r="2" fill="var(--vdl-200)" />
        <polyline
          points="16,90 -10,90 -10,80 -20,80"
          stroke="var(--vdl-200)" strokeWidth="1"
          strokeLinecap="round" strokeLinejoin="round" fill="none"
        />
        <text x="-76" y="83" fill="var(--vdl-200)" fontFamily="monospace" fontSize="10">spacing</text>

        {/* Line 4 → 우측 */}
        <circle cx="80" cy="60" r="2" fill="var(--vdl-200)" />
        <polyline
          points="84,60 110,60"
          stroke="var(--vdl-200)" strokeWidth="1"
          strokeLinecap="round" fill="none"
        />
        <text x="116" y="63" fill="var(--vdl-200)" fontFamily="monospace" fontSize="10">Card</text>
      </g>

      {/* 하단에 파라미터 주석 */}
      <text x="40" y="230" fill="var(--vdl-700)" fontFamily="monospace" fontSize="9">
        dot: 4px · line: 1px round · label-gap: 8px · label: monospace 12px · multi-gap: 16px
      </text>
    </svg>
  </DarkPanel>
);

// ============================================================
// MOLECULE — <V> Mark Prototypes
// ============================================================

const VMarkVariant = ({ label, sublabel, children }) => (
  <DarkPanel label={ label } sublabel={ sublabel } height={ 200 }>
    { children }
  </DarkPanel>
);

const VMarkA = () => (
  <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* < 기호 */}
    <polyline
      points="52,52 32,80 52,108"
      stroke="var(--vdl-200)" strokeWidth="1"
      strokeLinecap="round" strokeLinejoin="round"
      fill="none"
    />
    {/* V 문자 — monoline */}
    <polyline
      points="64,52 80,108 96,52"
      stroke="var(--vdl-200)" strokeWidth="1"
      strokeLinecap="round" strokeLinejoin="round"
      fill="none"
    />
    {/* > 기호 */}
    <polyline
      points="108,52 128,80 108,108"
      stroke="var(--vdl-200)" strokeWidth="1"
      strokeLinecap="round" strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const VMarkB = () => (
  <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* < 가 V로 읽히는 형태: 앵글이 좁아서 V의 좌반쪽처럼 보임 */}
    <polyline
      points="56,48 36,80 56,112"
      stroke="var(--vdl-200)" strokeWidth="1"
      strokeLinecap="round" strokeLinejoin="round"
      fill="none"
    />
    {/* 거울상 > — V의 우반쪽 */}
    <polyline
      points="104,48 124,80 104,112"
      stroke="var(--vdl-200)" strokeWidth="1"
      strokeLinecap="round" strokeLinejoin="round"
      fill="none"
    />
    {/* 하단 꼭짓점 연결 — V의 바닥 */}
    <line
      x1="56" y1="112" x2="80" y2="128"
      stroke="var(--vdl-200)" strokeWidth="1"
      strokeLinecap="round"
    />
    <line
      x1="104" y1="112" x2="80" y2="128"
      stroke="var(--vdl-200)" strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);

const VMarkC = () => (
  <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* < 앵글 브라켓이 V의 왼쪽 획으로 동시 기능 */}
    <polyline
      points="90,42 40,80 80,118"
      stroke="var(--vdl-200)" strokeWidth="1"
      strokeLinecap="round" strokeLinejoin="round"
      fill="none"
    />
    {/* V의 오른쪽 획 */}
    <line
      x1="80" y1="118" x2="120" y2="42"
      stroke="var(--vdl-200)" strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);

const VMarkD = () => (
  <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* V 마크 */}
    <polyline
      points="48,48 80,108 112,48"
      stroke="var(--vdl-200)" strokeWidth="1"
      strokeLinecap="round" strokeLinejoin="round"
      fill="none"
    />
    {/* V 마크에 Naming Line 부착 */}
    <circle cx="80" cy="108" r="2" fill="var(--vdl-200)" />
    <polyline
      points="80,112 80,132 100,132"
      stroke="var(--vdl-200)" strokeWidth="1"
      strokeLinecap="round" strokeLinejoin="round"
      fill="none"
    />
    <text x="108" y="135" fill="var(--vdl-200)" fontFamily="monospace" fontSize="10">
      vibe-design-labs
    </text>
  </svg>
);

// ============================================================
// MOLECULE — Grid Background
// ============================================================

const GridTest = () => (
  <DarkPanel label="MOLECULE — Grid Background" sublabel="8px unit · dot vs line" height={ 220 }>
    <svg width="480" height="180" viewBox="0 0 480 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Dot Grid */}
      <defs>
        <pattern id="dotGrid" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="0.4" fill="var(--vdl-800)" opacity="0.4" />
        </pattern>
        <pattern id="lineGrid" width="8" height="8" patternUnits="userSpaceOnUse">
          <line x1="0" y1="8" x2="8" y2="8" stroke="var(--vdl-800)" strokeWidth="0.3" opacity="0.25" />
          <line x1="8" y1="0" x2="8" y2="8" stroke="var(--vdl-800)" strokeWidth="0.3" opacity="0.25" />
        </pattern>
        <pattern id="dotGridDense" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="0.5" fill="var(--vdl-700)" opacity="0.35" />
        </pattern>
      </defs>

      {/* Dot Grid */}
      <rect x="16" y="16" width="140" height="140" fill="url(#dotGrid)" />
      <text x="16" y="170" fill="var(--vdl-600)" fontFamily="monospace" fontSize="9">dot · r:0.4 · op:0.4</text>

      {/* Line Grid */}
      <rect x="172" y="16" width="140" height="140" fill="url(#lineGrid)" />
      <text x="172" y="170" fill="var(--vdl-600)" fontFamily="monospace" fontSize="9">line · 0.3px · op:0.25</text>

      {/* Dot Grid Dense */}
      <rect x="328" y="16" width="140" height="140" fill="url(#dotGridDense)" />
      <text x="328" y="170" fill="var(--vdl-600)" fontFamily="monospace" fontSize="9">dot-dense · r:0.5 · op:0.35</text>

      {/* 각 그리드 위에 샘플 Naming Line */}
      { [86, 242, 398].map((cx) => (
        <g key={ cx }>
          <circle cx={ cx - 30 } cy="80" r="2" fill="var(--vdl-200)" />
          <line
            x1={ cx - 26 } y1="80" x2={ cx + 20 } y2="80"
            stroke="var(--vdl-200)" strokeWidth="1" strokeLinecap="round"
          />
          <text x={ cx + 26 } y="83" fill="var(--vdl-200)" fontFamily="monospace" fontSize="9">token</text>
        </g>
      )) }
    </svg>
  </DarkPanel>
);

// ============================================================
// ORGANISM — Words > Code > Design 흐름
// ============================================================

const FlowTest = () => (
  <DarkPanel label="ORGANISM — Words → Code → Design" sublabel="<V> 변환 흐름" height={ 320 }>
    <svg width="660" height="280" viewBox="0 0 660 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Grid 배경 */}
      <defs>
        <pattern id="flowGrid" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="0.4" fill="var(--vdl-800)" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="660" height="280" fill="url(#flowGrid)" />

      {/* ── 영역 1: WORDS ── */}
      <text x="30" y="30" fill="var(--vdl-600)" fontFamily="monospace" fontSize="10" letterSpacing="2">WORDS</text>

      <text x="30" y="65" fill="var(--vdl-400)" fontFamily="monospace" fontSize="13">
        &quot;Bento Grid +
      </text>
      <text x="30" y="85" fill="var(--vdl-400)" fontFamily="monospace" fontSize="13">
        {'  '}semantic color
      </text>
      <text x="30" y="105" fill="var(--vdl-400)" fontFamily="monospace" fontSize="13">
        {'  '}token + 8px
      </text>
      <text x="30" y="125" fill="var(--vdl-400)" fontFamily="monospace" fontSize="13">
        {'  '}spacing&quot;
      </text>

      {/* Naming Line 키워드 하이라이트 */}
      <circle cx="30" cy="155" r="2" fill="var(--vdl-200)" />
      <line x1="34" y1="155" x2="80" y2="155" stroke="var(--vdl-200)" strokeWidth="1" strokeLinecap="round" />
      <text x="86" y="158" fill="var(--vdl-200)" fontFamily="monospace" fontSize="9">3 keywords</text>

      {/* ── 변환 화살표 1: → ── */}
      <g transform="translate(200, 80)">
        <line x1="0" y1="0" x2="30" y2="0" stroke="var(--vdl-600)" strokeWidth="1" strokeLinecap="round" />
        <polyline points="25,-4 31,0 25,4" stroke="var(--vdl-600)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* ── 영역 2: CODE (중앙, <V> 마크) ── */}
      <text x="250" y="30" fill="var(--vdl-600)" fontFamily="monospace" fontSize="10" letterSpacing="2">CODE</text>

      {/* <V> 마크 작게 */}
      <g transform="translate(300, 42)">
        <polyline points="8,0 0,8 8,16" stroke="var(--vdl-200)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <polyline points="14,0 20,16 26,0" stroke="var(--vdl-200)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <polyline points="32,0 40,8 32,16" stroke="var(--vdl-200)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* 코드 블록 */}
      <rect x="250" y="68" width="170" height="100" fill="var(--vdl-900)" />
      <text x="262" y="88" fontFamily="monospace" fontSize="11">
        <tspan fill="hsl(210,60%,65%)">{'<Grid'}</tspan>
      </text>
      <text x="272" y="104" fontFamily="monospace" fontSize="11">
        <tspan fill="hsl(40,60%,65%)">{'container'}</tspan>
      </text>
      <text x="272" y="120" fontFamily="monospace" fontSize="11">
        <tspan fill="hsl(40,60%,65%)">{'spacing'}</tspan>
        <tspan fill="var(--vdl-600)">{'='}</tspan>
        <tspan fill="hsl(160,50%,55%)">{'{ 1 }'}</tspan>
      </text>
      <text x="262" y="136" fontFamily="monospace" fontSize="11">
        <tspan fill="hsl(210,60%,65%)">{'>'}</tspan>
      </text>
      <text x="262" y="152" fontFamily="monospace" fontSize="11">
        <tspan fill="hsl(210,60%,65%)">{'</Grid>'}</tspan>
      </text>

      {/* ── 변환 화살표 2: → ── */}
      <g transform="translate(438, 80)">
        <line x1="0" y1="0" x2="30" y2="0" stroke="var(--vdl-600)" strokeWidth="1" strokeLinecap="round" />
        <polyline points="25,-4 31,0 25,4" stroke="var(--vdl-600)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* ── 영역 3: DESIGN ── */}
      <text x="488" y="30" fill="var(--vdl-600)" fontFamily="monospace" fontSize="10" letterSpacing="2">DESIGN</text>

      {/* 아이소메트릭 Bento Grid 시각화 */}
      <g transform="translate(530, 60)">
        {/* 아이소메트릭 카드 1 — 큰 */}
        <path
          d="M0 30 l40 20 v30 l-40 -20 z"
          fill="var(--vdl-900)" stroke="var(--vdl-200)" strokeWidth="1" strokeLinejoin="round"
        />
        {/* 아이소메트릭 카드 2 — 작은 */}
        <path
          d="M44 18 l24 12 v20 l-24 -12 z"
          fill="var(--vdl-900)" stroke="var(--vdl-200)" strokeWidth="1" strokeLinejoin="round"
        />
        {/* 아이소메트릭 카드 3 */}
        <path
          d="M44 52 l24 12 v20 l-24 -12 z"
          fill="var(--vdl-900)" stroke="var(--vdl-200)" strokeWidth="1" strokeLinejoin="round"
        />
        {/* 아이소메트릭 카드 4 — 하단 */}
        <path
          d="M0 82 l68 34 v20 l-68 -34 z"
          fill="var(--vdl-900)" stroke="var(--vdl-200)" strokeWidth="1" strokeLinejoin="round"
        />

        {/* Naming Line */}
        <circle cx="-6" cy="30" r="1.5" fill="var(--vdl-200)" />
        <polyline
          points="-10,30 -24,30 -24,20"
          stroke="var(--vdl-200)" strokeWidth="0.8"
          strokeLinecap="round" strokeLinejoin="round" fill="none"
        />
        <text x="-56" y="18" fill="var(--vdl-200)" fontFamily="monospace" fontSize="8">Card</text>
      </g>

      {/* 하단 설명 */}
      <line x1="30" y1="240" x2="630" y2="240" stroke="var(--vdl-800)" strokeWidth="0.5" strokeLinecap="round" />
      <text x="30" y="260" fill="var(--vdl-700)" fontFamily="monospace" fontSize="9">
        자연어 의도 → 구조화된 코드 → 시각적 결과. 유채색은 CODE 영역에서만 등장한다.
      </text>
    </svg>
  </DarkPanel>
);

// ============================================================
// Stories
// ============================================================

/** Phase 0 — Atoms 전체 테스트 보드 */
export const Docs = {
  render: () => (
    <>
      <DocumentTitle
        title="Key Visual Atoms — Phase 0"
        status="Prototype"
        note="키 비주얼 제너레이티브 시스템의 아토믹 단위 프로토타이핑"
        brandName="Vibe Design Labs"
        systemName="Branding Prototype"
        version="0.1"
      />
      <PageContainer>
        <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
          Key Visual Atoms — Phase 0
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
          제너레이티브 비주얼 시스템의 최소 단위를 검증합니다.
          모든 시각 출력은 이 atoms의 조합이므로, 여기서 값이 확정되어야 위의 모든 것이 성립합니다.
        </Typography>

        {/* ── ATOM 1: Monoline Stroke Weight ── */}
        <SectionTitle
          title="ATOM 1 — Monoline Stroke Weight"
          description="전체 시스템의 골격. 0.5px / 1px / 1.5px를 다크 배경 위에서 비교합니다. 직선, 직각 꺾임, 아이소메트릭 프리즘에서 각각의 존재감을 확인하세요."
        />
        <PanelRow>
          <MonolineTest weight={ 0.5 } label="ATOM 1-A" />
          <MonolineTest weight={ 1 } label="ATOM 1-B" />
          <MonolineTest weight={ 1.5 } label="ATOM 1-C" />
        </PanelRow>
        <Typography variant="body2" color="text.secondary" sx={ { mb: 4, fontFamily: 'monospace', fontSize: 12 } }>
          판단 기준: 1px가 &quot;있지만 섬세한&quot; 균형점인가? 0.5px는 소멸하지 않는가? 1.5px는 무겁지 않은가?
        </Typography>

        {/* ── ATOM 2: Violet-Gray Palette ── */}
        <SectionTitle
          title="ATOM 2 — Violet-tinted Grayscale"
          description="hue 260° 기반 violet-tinted grayscale 11단계. 순수 neutral gray(sat 0%)와 나란히 비교하여 violet tint의 온도감을 확인합니다."
        />
        <PaletteStrip />
        <Typography variant="body2" color="text.secondary" sx={ { mb: 4, fontFamily: 'monospace', fontSize: 12 } }>
          판단 기준: violet tint가 &quot;차갑지 않으면서도 무채색으로 읽히는가&quot;. 원칙 2 — 소재의 온도가 차별화다.
        </Typography>

        {/* ── ATOM 3: Angle Bracket ── */}
        <SectionTitle
          title="ATOM 3 — Angle Bracket < Proportions"
          description="<V> 마크의 원자. 꺾임 각도와 세로:가로 비율에 따른 형태 변화를 탐색합니다."
        />
        <PanelRow>
          <AngleBracketTest angle={ 60 } ratio={ 1.0 } label="ATOM 3-A" />
          <AngleBracketTest angle={ 90 } ratio={ 1.4 } label="ATOM 3-B" />
          <AngleBracketTest angle={ 45 } ratio={ 0.8 } label="ATOM 3-C" />
        </PanelRow>
        <Typography variant="body2" color="text.secondary" sx={ { mb: 4, fontFamily: 'monospace', fontSize: 12 } }>
          판단 기준: HTML의 &lt;로 읽히면서 기하학적 아름다움을 갖는 비율은?
        </Typography>

        {/* ── ATOM 4: Dot ── */}
        <SectionTitle
          title="ATOM 4 — Dot"
          description="Naming Line의 기원점. 3px / 4px / 5px / 6px를 monoline과 함께 비교합니다."
        />
        <DotTest />

        {/* ── ATOM 5: Syntax Highlight Colors ── */}
        <SectionTitle
          title="ATOM 5 — Syntax Highlight Colors"
          description="유일한 유채색. violet-gray 팔레트 위에서 코드 구문이 자연스럽게 읽히는 3가지 후보 세트."
        />
        <SyntaxColorSet
          label="SET A — Cool (VS Code Dark+ 계열)"
          colors={ {
            keyword: 'hsl(210, 60%, 65%)',
            attr: 'hsl(40, 60%, 65%)',
            string: 'hsl(120, 40%, 60%)',
            boolean: 'hsl(30, 70%, 60%)',
          } }
        />
        <SyntaxColorSet
          label="SET B — Violet-shifted"
          colors={ {
            keyword: 'hsl(240, 50%, 72%)',
            attr: 'hsl(320, 40%, 68%)',
            string: 'hsl(170, 45%, 58%)',
            boolean: 'hsl(45, 55%, 65%)',
          } }
        />
        <SyntaxColorSet
          label="SET C — Monochrome + single accent"
          colors={ {
            keyword: 'hsl(260, 40%, 75%)',
            attr: 'hsl(260, 15%, 62%)',
            string: 'hsl(160, 40%, 58%)',
            boolean: 'hsl(260, 25%, 70%)',
          } }
        />
        <Typography variant="body2" color="text.secondary" sx={ { mb: 4, fontFamily: 'monospace', fontSize: 12 } }>
          판단 기준: Set A=범용적 가독성. Set B=VDL violet과 조화. Set C=무채색 기조 유지 + 최소 유채색.
        </Typography>

        {/* ── MOLECULE: Grid Background ── */}
        <SectionTitle
          title="MOLECULE — Grid Background"
          description="8px 단위 그리드 배경 3종(dot / line / dot-dense). Naming Line이 올라갔을 때 간섭 여부를 확인합니다."
        />
        <GridTest />

        {/* ── MOLECULE: Naming Line ── */}
        <SectionTitle
          title="MOLECULE — Naming Line"
          description="dot(4px) + monoline(1px) + 직각 꺾임 + monospace 레이블. 수평, 꺾임, 수직, 복수 연결 4가지 패턴."
        />
        <NamingLineTest />

        {/* ── MOLECULE: <V> Mark ── */}
        <SectionTitle
          title={ 'MOLECULE — <V> Mark Prototypes' }
          description="HTML 앵글 브라켓 <와 VDL의 V를 결합하는 4가지 방향 탐색."
        />
        <PanelRow>
          <VMarkVariant label="VAR-A" sublabel="<V> 태그 문법">
            <VMarkA />
          </VMarkVariant>
          <VMarkVariant label="VAR-B" sublabel="< > 를 V 하단으로 연결">
            <VMarkB />
          </VMarkVariant>
        </PanelRow>
        <PanelRow>
          <VMarkVariant label="VAR-C" sublabel="< 의 꺾임이 V의 좌획">
            <VMarkC />
          </VMarkVariant>
          <VMarkVariant label="VAR-D" sublabel="V + Naming Line 자기참조">
            <VMarkD />
          </VMarkVariant>
        </PanelRow>
        <Typography variant="body2" color="text.secondary" sx={ { mb: 4, fontFamily: 'monospace', fontSize: 12 } }>
          A: 코드 리터럴. B: 기하학적 구성. C: 이중 읽기. D: VDL 문법의 자기 참조.
        </Typography>

        {/* ── ORGANISM: Words → Code → Design ── */}
        <SectionTitle
          title="ORGANISM — Words → Code → Design"
          description="세 방향의 통합 장면 최소 프로토타입. 자연어(좌) → 코드(중앙) → 아이소메트릭 디자인(우)의 흐름. 유채색은 CODE 영역에서만 등장합니다."
        />
        <FlowTest />

      </PageContainer>
    </>
  ),
};

'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { RotateCcw } from 'lucide-react';
import {
  DocumentTitle,
  PageContainer,
  SectionTitle,
} from '../../../components/storybookDocumentation';
import { SystemOverDrawing } from '../../../assets/brandIllustration/SystemOverDrawing';
import { VibeStandard } from '../../../assets/brandIllustration/VibeStandard';
import { DesignAsBuild } from '../../../assets/brandIllustration/DesignAsBuild';
import { SystemOverDrawingV2 } from '../../../assets/brandIllustration/SystemOverDrawingV2';
import { DesignAsBuildV2 } from '../../../assets/brandIllustration/DesignAsBuildV2';
import { SystemOverDrawingIso } from '../../../assets/brandIllustration/SystemOverDrawingIso';
import { SystemOverDrawingV3 } from '../../../assets/brandIllustration/SystemOverDrawingV3';
import { SystemOverDrawingV6 } from '../../../assets/brandIllustration/SystemOverDrawingV6';
import { SystemOverDrawingGemini } from '../../../assets/brandIllustration/SystemOverDrawingGemini';
import { SystemOverDrawingGL } from '../../../assets/brandIllustration/SystemOverDrawingGL';
import { SystemOverDrawingR3F } from '../../../assets/brandIllustration/SystemOverDrawingR3F';
import { HubSpokeR3F } from '../../../assets/brandIllustration/HubSpokeR3F';
import { VibeStandardIso } from '../../../assets/brandIllustration/VibeStandardIso';
import { DesignAsBuildIso } from '../../../assets/brandIllustration/DesignAsBuildIso';
import { VibeStandardTree } from '../../../assets/brandIllustration/VibeStandardTree';

export default {
  title: 'Overview/UX/Brand Illustrations',
  parameters: {
    layout: 'padded',
  },
};

/**
 * 다크 배경 프리뷰 패널 (Replay 지원)
 *
 * @param {ReactNode} children - 콘텐츠 [Required]
 * @param {string} label - 레이블 [Optional]
 * @param {string} sublabel - 보조 설명 [Optional]
 * @param {number} maxWidth - 최대 너비 [Optional, 기본값: 400]
 */
const IllustrationPanel = ({ children, label, sublabel, maxWidth = 400 }) => {
  const [replayKey, setReplayKey] = useState(0);

  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
        mb: 2,
      }}
    >
      {(label || sublabel) && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 2,
            py: 0.5,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          {label && (
            <Typography
              sx={{ fontFamily: 'monospace', fontSize: 11, color: 'text.secondary' }}
            >
              {label}
            </Typography>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {sublabel && (
              <Typography
                sx={{ fontFamily: 'monospace', fontSize: 10, color: 'text.disabled' }}
              >
                {sublabel}
              </Typography>
            )}
            <IconButton
              size="small"
              onClick={() => setReplayKey((k) => k + 1)}
              aria-label="Replay"
              sx={{ color: 'text.secondary' }}
            >
              <RotateCcw size={14} />
            </IconButton>
          </Box>
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
        <Box key={replayKey} sx={{ width: '100%', maxWidth }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

// ═══════════════════════════════════════════════════════════
// Docs — 확정 일러스트 (LandingSolution에서 사용 중)
// ═══════════════════════════════════════════════════════════

export const Docs = {
  render: () => (
    <>
      <DocumentTitle
        title="Brand Illustrations"
        status="Production"
        note="LandingSolution 섹션에서 사용 중인 확정 일러스트"
        brandName="Vibe Design Labs"
        systemName="Brand Visual"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Brand Illustrations — Confirmed
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
          LandingSolution FeatureCard에 사용 중인 확정 SVG 일러스트.
          동일 아이소메트릭 좌표계(~26.57° · 8px unit · RoundedSlab) 기반.
        </Typography>

        {/* ── 1. VP1: System Over Drawing ── */}
        <SectionTitle
          title="VP1 — System Over Drawing"
          description="&quot;기준을 먼저 설계하는 과정&quot; — RoundedSlab 프리미티브 사용, 5개 디자인 토큰 레이어가 합쳐지기 직전의 분해도."
        />
        <IllustrationPanel
          label="SystemOverDrawingV3"
          sublabel="layers: 5 · RoundedSlab · w: 8u · h: 1u · cornerR: 0.6u"
          maxWidth={600}
        >
          <SystemOverDrawingV3 />
        </IllustrationPanel>

        {/* ── 2. VP2: Vibe Standard Tree ── */}
        <SectionTitle
          title="VP2 — Vibe Standard Tree"
          description="&quot;감각을 언어로 번역한 체계&quot; — 디자인 언어 택소노미를 아이소메트릭 노드 트리로 시각화. Root → 4 L1 → 8 L2 → 4 L3 dots. v10 픽셀 측정 + 수학적 역산 기반."
        />
        <IllustrationPanel
          label="VibeStandardTree"
          sublabel="levels: 4 · nodes: 13+4dots · RoundedSlab · v10 pixel-measured"
          maxWidth={600}
        >
          <VibeStandardTree />
        </IllustrationPanel>

        {/* ── 3. VP3: Design As Build ── */}
        <SectionTitle
          title="VP3 — Design As Build"
          description="&quot;설계가 곧 구현이다&quot; — 3개 세워진 랜드스케이프 스크린(Code → Anatomy → UI)이 깊이 배열. 대응 요소를 잇는 dashed 연결선 + hover glow."
        />
        <IllustrationPanel
          label="DesignAsBuild"
          sublabel="panels: 3 · standing screens · dashed connections · hover glow"
          maxWidth={600}
        >
          <DesignAsBuild />
        </IllustrationPanel>
      </PageContainer>
    </>
  ),
};

// ═══════════════════════════════════════════════════════════
// Ideation — 실험·대안 일러스트 아카이브
// ═══════════════════════════════════════════════════════════

export const Ideation = {
  render: () => (
    <>
      <DocumentTitle
        title="Brand Illustrations — Ideation"
        status="Archive"
        note="VP별 탐색 과정에서 생성된 실험·대안 일러스트 아카이브"
        brandName="Vibe Design Labs"
        systemName="Brand Visual"
        version="0.1"
      />
      <PageContainer>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Brand Illustrations — Ideation Archive
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
          확정 전 탐색 과정의 실험 일러스트. 참고용으로 보존.
        </Typography>

        {/* ════════════════════════════════════════════════════
            Isometric Variants
            ════════════════════════════════════════════════════ */}
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          Isometric Variants
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          공유 아이소메트릭 좌표계 기반 대안 버전들.
        </Typography>

        <SectionTitle
          title="VP1 Iso — System Over Drawing"
          description="Prism 프리미티브 기반 초기 버전. 익스플로디드 레이어 스택."
        />
        <IllustrationPanel
          label="SystemOverDrawingIso"
          sublabel="layers: 5 · w: 7u · exploded view · top face content"
          maxWidth={560}
        >
          <SystemOverDrawingIso />
        </IllustrationPanel>

        <SectionTitle
          title="VP1 V6 — Containers Only"
          description="5개 레이어의 컨테이너(슬래브 외형)만 구현. 상면 콘텐츠 미포함."
        />
        <IllustrationPanel
          label="SystemOverDrawingV6"
          sublabel="layers: 5 · RoundedSlab · containers only"
          maxWidth={600}
        >
          <SystemOverDrawingV6 />
        </IllustrationPanel>

        <SectionTitle
          title="VP1 Gemini — Gemini Version"
          description="Gemini 버전에 맞춘 5개 디자인 토큰 컨테이너 렌더링."
        />
        <IllustrationPanel
          label="SystemOverDrawingGemini"
          sublabel="layers: 5 · RoundedSlab · gemini version"
          maxWidth={600}
        >
          <SystemOverDrawingGemini />
        </IllustrationPanel>

        <SectionTitle
          title="VP1 R3F — Interactive Exploded View"
          description="R3F + drei 기반 인터랙티브 분해도. OrbitControls 자유 회전 + 슬라이더 분해/조립."
        />
        <IllustrationPanel
          label="SystemOverDrawingR3F"
          sublabel="R3F · drei · OrbitControls · RoundedBox · explode slider"
          maxWidth={700}
        >
          <SystemOverDrawingR3F />
        </IllustrationPanel>

        <SectionTitle
          title="Hub-Spoke R3F — Web Agent"
          description="Opero Labs 스타일 Hub-and-Spoke 구성. 세워진 브라우저 스크린 + 눕힌 패널 + 허브 연결선 + 바닥 그리드."
        />
        <IllustrationPanel
          label="HubSpokeR3F"
          sublabel="R3F · drei · hub-spoke · standing screens · flat panels · grid"
          maxWidth={700}
        >
          <HubSpokeR3F />
        </IllustrationPanel>

        <SectionTitle
          title="VP1 GL — Three.js"
          description="Three.js OrthographicCamera + EdgesGeometry 기반 구조적 정확성 검증용."
        />
        <IllustrationPanel
          label="SystemOverDrawingGL"
          sublabel="Three.js · OrthographicCamera · dimetric 2:1 · EdgesGeometry"
          maxWidth={600}
        >
          <SystemOverDrawingGL sx={{ height: 450 }} />
        </IllustrationPanel>

        <SectionTitle
          title="VP2 Iso — The Vibe Standard"
          description="토큰 레지스트리 모듈: 5개 슬롯이 동일 포맷으로 정렬."
        />
        <IllustrationPanel
          label="VibeStandardIso"
          sublabel="container: 7u×24u · slots: 5 · uniform format"
          maxWidth={560}
        >
          <VibeStandardIso />
        </IllustrationPanel>

        <SectionTitle
          title="VP3 Iso — Design As Build"
          description="Card 컴포넌트를 4개 레이어로 분해한 익스플로디드 뷰."
        />
        <IllustrationPanel
          label="DesignAsBuildIso"
          sublabel="layers: 4 · w: 7u · exploded view · CSS annotations"
          maxWidth={560}
        >
          <DesignAsBuildIso />
        </IllustrationPanel>

        <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', my: 8 }} />

        {/* ════════════════════════════════════════════════════
            2D Generative Variants
            ════════════════════════════════════════════════════ */}
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          2D Generative Variants
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          아이소메트릭 도입 전 2D 제너러티브 실험들.
        </Typography>

        <SectionTitle
          title="VP1 — System Over Drawing (Rosette)"
          description="타원 회전·복제로 로제트 패턴을 생성. 기준 타원이 결과물보다 밝게 강조."
        />
        <IllustrationPanel
          label="SystemOverDrawing"
          sublabel="count: 18 · rx: 155 · ry: 48 · rotate(i * 180/N)"
        >
          <SystemOverDrawing />
        </IllustrationPanel>

        <SectionTitle
          title="VP1 v2 — System Over Drawing (Hub-Spoke)"
          description="9개 앵커 → 허브 스포크 → 외곽 경계선 → 면 채움 순으로 구조가 드러남."
        />
        <IllustrationPanel
          label="SystemOverDrawingV2"
          sublabel="anchors: 9 · hub: center · spokes: 8 · boundary: 8 edges"
        >
          <SystemOverDrawingV2 />
        </IllustrationPanel>

        <SectionTitle
          title="VP2 — The Vibe Standard (Parametric Ellipses)"
          description="수직 축을 공유하는 타원들이 폭만 파라메트릭하게 변주."
        />
        <IllustrationPanel
          label="VibeStandard"
          sublabel="count: 14 · rxMin: 5 · rxMax: 170 · ry: 156 · lerp(t)"
        >
          <VibeStandard />
        </IllustrationPanel>

        <SectionTitle
          title="VP3 — Design As Build (Symmetric Branch)"
          description="중심 노드(⊕)에서 좌우 분기하는 대칭 구조."
        />
        <IllustrationPanel
          label="DesignAsBuild"
          sublabel="branches: 10 · busOffset: 54 · cornerR: 12 · Q-bezier"
        >
          <DesignAsBuild />
        </IllustrationPanel>

        <SectionTitle
          title="VP3 v2 — Design As Build (Card Anatomy)"
          description="UI Card의 anatomy가 레이어별로 드로잉되며 완성."
        />
        <IllustrationPanel
          label="DesignAsBuildV2"
          sublabel="card: 184×320 · pad: 20 · phases: 5 · naming lines: 4"
        >
          <DesignAsBuildV2 />
        </IllustrationPanel>
      </PageContainer>
    </>
  ),
};

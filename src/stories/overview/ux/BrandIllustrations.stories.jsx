'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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

export default {
  title: 'Overview/UX/Brand Illustrations',
  parameters: {
    layout: 'padded',
  },
};

/**
 * 다크 배경 프리뷰 패널
 *
 * @param {ReactNode} children - 콘텐츠 [Required]
 * @param {string} label - 레이블 [Optional]
 * @param {string} sublabel - 보조 설명 [Optional]
 * @param {number} maxWidth - 최대 너비 [Optional, 기본값: 400]
 */
const IllustrationPanel = ({ children, label, sublabel, maxWidth = 400 }) => (
  <Box
    sx={{
      border: '1px solid',
      borderColor: 'divider',
      overflow: 'hidden',
      mb: 2,
    }}
  >
    {/* 레이블 바 */}
    {(label || sublabel) && (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
          py: 1,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        {label && (
          <Typography
            sx={{
              fontFamily: 'monospace',
              fontSize: 11,
              color: 'text.secondary',
            }}
          >
            {label}
          </Typography>
        )}
        {sublabel && (
          <Typography
            sx={{
              fontFamily: 'monospace',
              fontSize: 10,
              color: 'text.disabled',
            }}
          >
            {sublabel}
          </Typography>
        )}
      </Box>
    )}

    {/* 일러스트 영역 */}
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
        title="Brand Illustrations"
        status="Prototype"
        note="3가지 가치 제안(Value Propositions)을 시각화하는 제너러티브 일러스트레이션"
        brandName="Vibe Design Labs"
        systemName="Brand Visual"
        version="0.1"
      />
      <PageContainer>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Brand Illustrations — Value Propositions
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
          LandingDifference 섹션의 FeatureCard에 들어갈 제너러티브 SVG 일러스트.
          모든 형태는 데이터·알고리즘·규칙으로 생성된다.
        </Typography>

        {/* ── VP1: System Over Drawing ── */}
        <SectionTitle
          title="VP1 — System Over Drawing"
          description="&quot;결과물보다 기준을 먼저 설계합니다&quot; — 하나의 타원(규칙)이 회전·복제되어 로제트 패턴(결과물)을 만든다. 기준 타원과 가이드 원이 결과물보다 밝게 강조된다."
        />
        <IllustrationPanel
          label="SystemOverDrawing"
          sublabel="count: 18 · rx: 155 · ry: 48 · rotate(i * 180/N)"
        >
          <SystemOverDrawing />
        </IllustrationPanel>

        <Box sx={{ mb: 2 }}>
          <Typography
            variant="body2"
            sx={{ fontFamily: 'monospace', fontSize: 12, color: 'text.secondary', mb: 1 }}
          >
            색상 위계
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            {[
              { color: 'var(--vdl-200)', label: '--vdl-200 (hero)', desc: '기준 타원 + 가이드 원 + 중심점' },
              { color: 'var(--vdl-700)', label: '--vdl-700 (subtle)', desc: '결과물 로제트 (17개 타원)' },
              { color: 'var(--vdl-800)', label: '--vdl-800 (structure)', desc: '구조 축' },
            ].map((item) => (
              <Box key={item.label} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    bgcolor: item.color,
                    flexShrink: 0,
                    mt: 0.25,
                  }}
                />
                <Box>
                  <Typography sx={{ fontFamily: 'monospace', fontSize: 11, color: 'text.secondary' }}>
                    {item.label}
                  </Typography>
                  <Typography sx={{ fontFamily: 'monospace', fontSize: 10, color: 'text.disabled' }}>
                    {item.desc}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Typography
          variant="body2"
          sx={{ fontFamily: 'monospace', fontSize: 12, color: 'text.disabled', mb: 6 }}
        >
          알고리즘: for(i=0; i&lt;18; i++) ellipse(cx, cy, 155, 48).rotate(i * 10°)
          — 규칙 하나(회전)로 복잡한 결과물을 생성하는 &quot;System Over Drawing&quot;의 시각적 증거.
        </Typography>

        {/* ── VP1 v2: System Over Drawing ── */}
        <SectionTitle
          title="VP1 v2 — System Over Drawing"
          description="&quot;기준점이 먼저 정해지면 형태는 결과로 완성된다&quot; — 9개 앵커가 먼저 찍히고, 허브 스포크 → 외곽 경계선 → 면 채움 순으로 구조가 드러난다."
        />
        <IllustrationPanel
          label="SystemOverDrawingV2"
          sublabel="anchors: 9 · hub: center · spokes: 8 · boundary: 8 edges · fills: 2 triangles"
        >
          <SystemOverDrawingV2 />
        </IllustrationPanel>

        <Box sx={{ mb: 2 }}>
          <Typography
            variant="body2"
            sx={{ fontFamily: 'monospace', fontSize: 12, color: 'text.secondary', mb: 1 }}
          >
            색상 위계
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            {[
              { color: 'var(--vdl-200)', label: '--vdl-200 (hero)', desc: '앵커 포인트 (9개)' },
              { color: 'var(--vdl-700)', label: '--vdl-700 (subtle)', desc: '외곽 경계선' },
              { color: 'var(--vdl-800)', label: '--vdl-800 (structure)', desc: '허브 스포크' },
              { color: 'var(--vdl-900)', label: '--vdl-900 (fill)', desc: '삼각형 면 채움' },
            ].map((item) => (
              <Box key={item.label} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    bgcolor: item.color,
                    flexShrink: 0,
                    mt: 0.25,
                  }}
                />
                <Box>
                  <Typography sx={{ fontFamily: 'monospace', fontSize: 11, color: 'text.secondary' }}>
                    {item.label}
                  </Typography>
                  <Typography sx={{ fontFamily: 'monospace', fontSize: 10, color: 'text.disabled' }}>
                    {item.desc}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Typography
          variant="body2"
          sx={{ fontFamily: 'monospace', fontSize: 12, color: 'text.disabled', mb: 6 }}
        >
          시퀀스: 허브 앵커 → 나머지 앵커 → 허브 스포크 draw → 외곽 경계 draw → 면 채움 fade
          — 기준(앵커)이 먼저 놓이면 형태(네트워크)가 저절로 완성된다.
        </Typography>

        {/* ── VP2: The Vibe Standard ── */}
        <SectionTitle
          title="VP2 — The Vibe Standard"
          description="&quot;AI가 알아듣는 표준 디자인 언어 체계&quot; — 하나의 수직 축(표준)을 공유하는 타원들이 폭만 파라메트릭하게 변주되며, 상·하단 수렴점에서 정확히 만난다."
        />
        <IllustrationPanel
          label="VibeStandard"
          sublabel="count: 14 · rxMin: 5 · rxMax: 170 · ry: 156 · lerp(t)"
        >
          <VibeStandard />
        </IllustrationPanel>

        <Box sx={{ mb: 2 }}>
          <Typography
            variant="body2"
            sx={{ fontFamily: 'monospace', fontSize: 12, color: 'text.secondary', mb: 1 }}
          >
            색상 위계
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            {[
              { color: 'var(--vdl-200)', label: '--vdl-200 (hero)', desc: '수직 축(표준) + 수렴점' },
              { color: 'var(--vdl-600)', label: '--vdl-600 (default)', desc: '파라메트릭 타원 (14개)' },
              { color: 'var(--vdl-800)', label: '--vdl-800 (structure)', desc: '수평 축 + 화살표' },
            ].map((item) => (
              <Box key={item.label} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    bgcolor: item.color,
                    flexShrink: 0,
                    mt: 0.25,
                  }}
                />
                <Box>
                  <Typography sx={{ fontFamily: 'monospace', fontSize: 11, color: 'text.secondary' }}>
                    {item.label}
                  </Typography>
                  <Typography sx={{ fontFamily: 'monospace', fontSize: 10, color: 'text.disabled' }}>
                    {item.desc}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Typography
          variant="body2"
          sx={{ fontFamily: 'monospace', fontSize: 12, color: 'text.disabled', mb: 6 }}
        >
          알고리즘: for(i=0; i&lt;14; i++) ellipse(cx, cy, lerp(5, 170, i/13), 156)
          — 하나의 파라미터(폭)만 변주해도 모든 타원이 같은 축 위에서 정확히 수렴하는 &quot;The Vibe Standard&quot;의 시각적 증거.
        </Typography>

        {/* ── VP3: Design As Build ── */}
        <SectionTitle
          title="VP3 — Design As Build"
          description="&quot;구현의 설계도가 되는 디자인 접근방식&quot; — 중심 노드(⊕)에서 좌우로 분기하는 대칭 구조. 좌·우가 동일한 곡률과 스타일을 가져 &quot;설계 = 구현&quot;을 표현한다."
        />
        <IllustrationPanel
          label="DesignAsBuild"
          sublabel="branches: 10 · busOffset: 54 · cornerR: 12 · Q-bezier"
        >
          <DesignAsBuild />
        </IllustrationPanel>

        <Box sx={{ mb: 2 }}>
          <Typography
            variant="body2"
            sx={{ fontFamily: 'monospace', fontSize: 12, color: 'text.secondary', mb: 1 }}
          >
            색상 위계
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            {[
              { color: 'var(--vdl-50)', label: '--vdl-50 (focal)', desc: '중심 노드 dot' },
              { color: 'var(--vdl-200)', label: '--vdl-200 (hero)', desc: '중심 노드 ⊕ 심볼' },
              { color: 'var(--vdl-700)', label: '--vdl-700 (subtle)', desc: '실선 분기 + 화살표' },
              { color: 'var(--vdl-800)', label: '--vdl-800 (structure)', desc: '점선/대시 분기' },
            ].map((item) => (
              <Box key={item.label} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    bgcolor: item.color,
                    flexShrink: 0,
                    mt: 0.25,
                  }}
                />
                <Box>
                  <Typography sx={{ fontFamily: 'monospace', fontSize: 11, color: 'text.secondary' }}>
                    {item.label}
                  </Typography>
                  <Typography sx={{ fontFamily: 'monospace', fontSize: 10, color: 'text.disabled' }}>
                    {item.desc}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Typography
          variant="body2"
          sx={{ fontFamily: 'monospace', fontSize: 12, color: 'text.disabled', mb: 6 }}
        >
          알고리즘: forEach(offset) path(center → Q-bezier corner → vertical → Q-bezier corner → edge)
          — 좌우 대칭 구조로 &quot;설계도가 곧 구현물&quot;임을 시각적으로 증명한다.
        </Typography>

        {/* ── VP3 v2: Design As Build ── */}
        <SectionTitle
          title="VP3 v2 — Design As Build"
          description="&quot;해부도를 그리는 행위가 곧 컴포넌트를 완성하는 행위&quot; — UI Card의 anatomy가 레이어별로 드로잉되면서 완성된 컴포넌트가 되고, Naming Line이 각 파트를 레이블링한다."
        />
        <IllustrationPanel
          label="DesignAsBuildV2"
          sublabel="card: 184×320 · pad: 20 · phases: 5 · naming lines: 4"
        >
          <DesignAsBuildV2 />
        </IllustrationPanel>

        <Box sx={{ mb: 2 }}>
          <Typography
            variant="body2"
            sx={{ fontFamily: 'monospace', fontSize: 12, color: 'text.secondary', mb: 1 }}
          >
            색상 위계
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            {[
              { color: 'var(--vdl-200)', label: '--vdl-200 (hero)', desc: 'Naming Line dot + 선 + 레이블' },
              { color: 'var(--vdl-700)', label: '--vdl-700 (subtle)', desc: '외곽 컨테이너 + 헤딩 + CTA' },
              { color: 'var(--vdl-800)', label: '--vdl-800 (structure)', desc: '패딩 가이드 + 구조선 + 본문 + 미디어' },
            ].map((item) => (
              <Box key={item.label} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    bgcolor: item.color,
                    flexShrink: 0,
                    mt: 0.25,
                  }}
                />
                <Box>
                  <Typography sx={{ fontFamily: 'monospace', fontSize: 11, color: 'text.secondary' }}>
                    {item.label}
                  </Typography>
                  <Typography sx={{ fontFamily: 'monospace', fontSize: 10, color: 'text.disabled' }}>
                    {item.desc}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Typography
          variant="body2"
          sx={{ fontFamily: 'monospace', fontSize: 12, color: 'text.disabled', mb: 6 }}
        >
          시퀀스: 외곽 draw → 패딩 가이드 fade → 구조선 draw → 콘텐츠 fade → CTA draw → Naming Lines
          — 설계도(해부)를 그리는 행위가 곧 컴포넌트(구현)를 완성하는 행위.
        </Typography>
      </PageContainer>
    </>
  ),
};

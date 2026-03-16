import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import {
  DocumentTitle,
  PageContainer,
  SectionTitle,
} from '../../../components/storybookDocumentation';
import { VISUAL_ASSETS, PHILOSOPHY, VALUE_PROPOSITIONS, MYTH_BUSTING } from '../../../data/contents';
import {
  BuiltForPurposeIllustration,
  PoweredByAgentsIllustration,
  DesignedForSpeedIllustration,
} from './referenceIllustrations';
import {
  ImplementationIllustration,
  LanguageIllustration,
  DesignIllustration,
} from './philosophyIllustrations';

export default {
  title: 'Overview/UX/Visual Assets',
  parameters: {
    layout: 'padded',
  },
};

const PERSONA_ILLUSTRATIONS = [
  {
    fig: 'PERSONA 1',
    title: 'Canvas Designer',
    description: 'Line art — 디자인 캔버스 위에서 직접 손을 대고 만드는 디자이너. 도구가 아니라 캔버스 위에서 살고 있는 존재.',
    src: '/persona/canvas_designer_line.png',
    style: 'White contour line art, isometric, dark violet-gray background',
    prompt: 'Pure white contour line art illustration in isometric perspective. Every form is defined exclusively by thin, consistent white outline strokes on a very dark near-black violet-gray background. A young woman with her hair in a bun, seen from behind, standing in front of a large floating isometric design tool interface.',
  },
  {
    fig: 'PERSONA 2',
    title: 'Pipeline Developer',
    description: 'Line art — 개발 파이프라인 컨베이어 위에 앉아 코딩하는 개발자. 공정의 일부이자 운영자.',
    src: '/persona/pipeline_developer_line.png',
    style: 'White contour line art, isometric, dark violet-gray background',
    prompt: 'Pure white contour line art illustration in isometric perspective. A young man wearing a cap sits cross-legged on top of an isometric assembly-line conveyor belt, with a keyboard on his lap. Behind him, a horizontal development pipeline stretches as a mechanical conveyor system.',
  },
];

const REFERENCE_ILLUSTRATIONS = [
  {
    fig: 'FIG 0.2',
    title: 'Built for purpose',
    description: 'Isometric layered platform with dome — shaped by practices and principles of world-class product teams.',
    Illustration: BuiltForPurposeIllustration,
  },
  {
    fig: 'FIG 0.3',
    title: 'Powered by AI agents',
    description: 'Isometric multi-module architecture — designed for workflows shared by humans and agents.',
    Illustration: PoweredByAgentsIllustration,
  },
  {
    fig: 'FIG 0.4',
    title: 'Designed for speed',
    description: 'Cascading isometric momentum cards — reduces noise and restores momentum to ship with high velocity.',
    Illustration: DesignedForSpeedIllustration,
  },
];

const PHILOSOPHY_ILLUSTRATIONS = [
  {
    fig: 'FIG 0.5',
    title: '구현은 언어를 따른다',
    description: '좌우 대비 — 좌측 산란 카드(모호한 입력)와 우측 정돈 카드(정밀한 언어)의 배치가 입력↔결과 대응을 증명한다.',
    Illustration: ImplementationIllustration,
  },
  {
    fig: 'FIG 0.6',
    title: '언어는 경험을 함축한다',
    description: '방사 확장 — 중앙 대형 프리즘(압축된 키워드)에서 외곽 소형 프리즘(전개된 결정들)으로 높이가 감소하며 퍼진다.',
    Illustration: LanguageIllustration,
  },
  {
    fig: 'FIG 0.7',
    title: '감각도 쪼개면 로직이다',
    description: '수직 피라미드 — 하단의 큰 프리즘(완성된 결과물)에서 상단의 작은 프리즘(원자적 토큰)으로 분해되는 적층 구조.',
    Illustration: DesignIllustration,
  },
];

/**
 * 레퍼런스 일러스트 프리뷰 카드
 *
 * @param {string} fig - FIG 번호 [Required]
 * @param {string} title - 일러스트 제목 [Required]
 * @param {string} description - 설명 [Required]
 * @param {Function} Illustration - SVG 일러스트 컴포넌트 [Required]
 *
 * Example usage:
 * <ReferenceCard fig="FIG 0.2" title="Built for purpose" description="..." Illustration={BuiltForPurposeIllustration} />
 */
const ReferenceCard = ({ fig, title, description, Illustration }) => (
  <Box
    sx={{
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 1,
      overflow: 'hidden',
      mb: 2,
    }}
  >
    <Box
      sx={{
        bgcolor: '#08090A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
        minHeight: 280,
        position: 'relative',
      }}
    >
      <Typography
        variant="caption"
        sx={{
          position: 'absolute',
          top: 12,
          left: 16,
          color: 'rgba(255,255,255,0.3)',
          fontFamily: 'monospace',
          fontSize: 11,
        }}
      >
        {fig}
      </Typography>
      <Illustration style={{ maxWidth: '100%', height: 'auto' }} />
    </Box>
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13 }}>
        {description}
      </Typography>
    </Box>
  </Box>
);

/**
 * 페르소나 일러스트 프리뷰 카드 (래스터 이미지)
 *
 * @param {string} fig - PERSONA 번호 [Required]
 * @param {string} title - 일러스트 제목 [Required]
 * @param {string} description - 설명 [Required]
 * @param {string} src - 이미지 경로 [Required]
 * @param {string} style - 스타일 명세 [Required]
 * @param {string} prompt - 생성에 사용된 프롬프트 요약 [Optional]
 *
 * Example usage:
 * <PersonaCard fig="PERSONA 1" title="Canvas Designer" description="..." src="/persona/canvas_designer_line.png" style="..." />
 */
const PersonaCard = ({ fig, title, description, src, style, prompt }) => (
  <Box
    sx={{
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 1,
      overflow: 'hidden',
      mb: 2,
    }}
  >
    <Box
      sx={{
        bgcolor: 'hsl(260, 20%, 4%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
        minHeight: 280,
        position: 'relative',
      }}
    >
      <Typography
        variant="caption"
        sx={{
          position: 'absolute',
          top: 12,
          left: 16,
          color: 'rgba(255,255,255,0.3)',
          fontFamily: 'monospace',
          fontSize: 11,
        }}
      >
        {fig}
      </Typography>
      <Box
        component="img"
        src={src}
        alt={title}
        sx={{
          maxWidth: '100%',
          maxHeight: 400,
          height: 'auto',
          objectFit: 'contain',
        }}
      />
    </Box>
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        <Chip
          label="Nano Banana"
          size="small"
          color="warning"
          variant="outlined"
          sx={{ fontSize: 11, height: 20 }}
        />
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13, mb: 1 }}>
        {description}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 0.5 }}>
        <Typography
          variant="caption"
          sx={{ fontWeight: 600, minWidth: 50, color: 'text.secondary' }}
        >
          Style
        </Typography>
        <Typography
          variant="caption"
          sx={{ fontFamily: 'monospace', color: 'text.secondary' }}
        >
          {style}
        </Typography>
      </Box>
      {prompt && (
        <Box
          sx={{
            mt: 1,
            p: 1.5,
            bgcolor: 'action.hover',
            borderRadius: 0.5,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontFamily: 'monospace',
              fontSize: 11,
              lineHeight: 1.6,
              color: 'text.secondary',
              display: 'block',
            }}
          >
            {prompt}
          </Typography>
        </Box>
      )}
    </Box>
  </Box>
);

/**
 * 개별 비주얼 에셋 카드
 *
 * Props:
 * @param {string} name - 에셋 이름 [Required]
 * @param {string} description - 무엇을 보여주는지 [Required]
 * @param {string} usage - 어디서 어떻게 쓰이는지 [Required]
 * @param {Array<{label: string, color: string}>} tags - 보조 태그 [Optional]
 * @param {Array<{label: string, value: string}>} meta - 추가 메타 정보 [Optional]
 * @param {ReactNode} children - 추가 콘텐츠 [Optional]
 *
 * Example usage:
 * <AssetCard name="Flat V" description="Seed 그대로..." usage="워드마크 옆, 파비콘" />
 */
const AssetCard = ({ name, description, usage, tags = [], meta = [], children }) => (
  <Box
    sx={{
      p: 2.5,
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 1,
      mb: 2,
    }}
  >
    {/* 타이틀 + 태그 */}
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 16 }}>
        {name}
      </Typography>
      {tags.map((tag) => (
        <Chip
          key={tag.label}
          label={tag.label}
          size="small"
          color={tag.color || 'default'}
          variant="outlined"
          sx={{ fontSize: 11, height: 20 }}
        />
      ))}
    </Box>

    {/* 무엇을 보여주는지 */}
    <Typography variant="body2" sx={{ mb: 1.5, lineHeight: 1.6 }}>
      {description}
    </Typography>

    {/* 추가 메타 (params, style, transform 등) */}
    {meta.length > 0 && (
      <Box sx={{ mb: 1.5 }}>
        {meta.map((m) => (
          <Box key={m.label} sx={{ display: 'flex', gap: 1, mb: 0.5 }}>
            <Typography
              variant="caption"
              sx={{ fontWeight: 600, minWidth: 60, color: 'text.secondary' }}
            >
              {m.label}
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontFamily: 'monospace', color: 'text.secondary' }}
            >
              {m.value}
            </Typography>
          </Box>
        ))}
      </Box>
    )}

    {/* 어디서 어떻게 쓰이는지 */}
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1,
        pt: 1.5,
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography
        variant="caption"
        sx={{ fontWeight: 600, color: 'text.secondary', minWidth: 40, pt: 0.25 }}
      >
        용도
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13 }}>
        {usage}
      </Typography>
    </Box>

    {/* children (연결 정보 등) */}
    {children}
  </Box>
);

/** 비주얼 에셋 카탈로그 */
export const Docs = {
  render: () => (
    <>
      <DocumentTitle
        title="Visual Assets"
        status="Available"
        note="브랜드 시각 자산 카탈로그 — 각 에셋의 역할과 사용처"
        brandName="Vibe Design Labs"
        systemName="UX Documentation"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Visual Assets
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          VDL 브랜드 시각 자산 카탈로그입니다.
          각 에셋이 무엇을 보여주고, 어디서 어떻게 쓰이는지 정의합니다.
          실제 이미지 제작은 별도 — 여기서는 제작 명세를 정리합니다.
        </Typography>

        {/* ── Persona 일러스트 (Nano Banana) ── */}
        <SectionTitle
          title="Persona 일러스트"
          description="VDL의 두 핵심 페르소나를 시각화한 라인아트 일러스트입니다. Gemini 2.5 Flash Image (Nano Banana)로 생성. 다크 배경(hsl 260 20% 4%) 위 흰색 컨투어 라인만으로 구성됩니다."
        />
        {PERSONA_ILLUSTRATIONS.map((item) => (
          <PersonaCard
            key={item.fig}
            fig={item.fig}
            title={item.title}
            description={item.description}
            src={item.src}
            style={item.style}
            prompt={item.prompt}
          />
        ))}

        <Divider sx={{ my: 4 }} />

        {/* ── 0. 레퍼런스 일러스트 ── */}
        <SectionTitle
          title="레퍼런스 일러스트"
          description="Linear 스타일의 아이소메트릭 SVG 일러스트 3종입니다. 다크 배경 위에 세밀한 스트로크 라인으로 구성된 비주얼 레퍼런스입니다."
        />
        {REFERENCE_ILLUSTRATIONS.map((item) => (
          <ReferenceCard
            key={item.fig}
            fig={item.fig}
            title={item.title}
            description={item.description}
            Illustration={item.Illustration}
          />
        ))}

        <Divider sx={{ my: 4 }} />

        {/* ── 1. 그래픽 모티프 ── */}
        <SectionTitle
          title="그래픽 모티프"
          description="VDL 비쥬얼의 최소 패턴 단위입니다. 로고, 일러스트, SNS 콘텐츠 등 모든 시각물에 반복 등장하며 브랜드 일관성을 만드는 기본 문법입니다."
        />
        {VISUAL_ASSETS.motifs.map((item) => (
          <AssetCard
            key={item.id}
            name={item.name}
            description={item.description}
            usage={item.usage}
            meta={item.params ? [{ label: 'Params', value: item.params }] : []}
          />
        ))}

        <Divider sx={{ my: 4 }} />

        {/* ── 3. 키 일러스트레이션 ── */}
        <SectionTitle
          title="키 일러스트레이션"
          description="VDL 세계관의 핵심 장면 3종입니다. 브랜드의 정체성을 한 장면으로 압축한 대표 시각물입니다."
        />
        {VISUAL_ASSETS.keyIllustrations.map((item) => (
          <AssetCard
            key={item.id}
            name={item.name}
            description={item.description}
            usage={item.usage}
            tags={[
              { label: item.priority === 'high' ? 'High Priority' : 'Medium', color: item.priority === 'high' ? 'error' : 'default' },
            ]}
            meta={[
              { label: 'Style', value: item.style },
            ]}
          />
        ))}

        <Divider sx={{ my: 4 }} />

        {/* ── 4. Philosophy 일러스트 ── */}
        <SectionTitle
          title="Philosophy 일러스트"
          description="VDL의 세 가지 신념 각각을 시각화합니다. 각 신념이 말하는 바를 한 장면으로 증명하는 일러스트입니다."
        />
        {VISUAL_ASSETS.philosophy.map((item) => {
          const phil = PHILOSOPHY.find((p) => p.id === item.id.replace('phil-', ''));
          return (
            <AssetCard
              key={item.id}
              name={item.name}
              description={item.description}
              usage={`Brand Story Philosophy 섹션 — "${item.belief}" 신념의 시각적 증명`}
              tags={[
                { label: item.derivedValue, color: 'primary' },
              ]}
              meta={[
                { label: 'Style', value: item.style },
              ]}
            >
              {/* 연결된 Philosophy 원문 */}
              <Box
                sx={{
                  mt: 1.5,
                  pt: 1,
                  borderTop: '1px dashed',
                  borderColor: 'divider',
                  display: 'flex',
                  gap: 1,
                  alignItems: 'flex-start',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 600, color: 'text.secondary', minWidth: 40, pt: 0.25 }}
                >
                  신념
                </Typography>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 13 }}>
                    {item.belief}
                  </Typography>
                  {phil && (
                    <Typography variant="caption" color="text.secondary">
                      {phil.description}
                    </Typography>
                  )}
                </Box>
              </Box>
            </AssetCard>
          );
        })}

        {/* Philosophy 일러스트 프리뷰 */}
        {PHILOSOPHY_ILLUSTRATIONS.map((item) => (
          <ReferenceCard
            key={item.fig}
            fig={item.fig}
            title={item.title}
            description={item.description}
            Illustration={item.Illustration}
          />
        ))}

        <Divider sx={{ my: 4 }} />

        {/* ── 5. Value Proposition 일러스트 ── */}
        <SectionTitle
          title="Value Proposition 일러스트"
          description="VDL의 세 단계 가치 제안(System Over Drawing → The Vibe Standard → Design As Build)을 각각 시각화합니다."
        />
        {VISUAL_ASSETS.valueProposition.map((item) => {
          const vp = VALUE_PROPOSITIONS.find((v) => v.step === item.step);
          return (
            <AssetCard
              key={item.id}
              name={`Step ${item.step}. ${item.name}`}
              description={item.visualConcept}
              usage={`Brand Story VP 섹션 — "${item.description}"의 시각적 표현`}
              tags={[
                { label: `Step ${item.step}`, color: 'secondary' },
              ]}
              meta={[
                { label: 'Style', value: item.style },
              ]}
            >
              {/* 연결된 VP 원문 */}
              {vp && (
                <Box
                  sx={{
                    mt: 1.5,
                    pt: 1,
                    borderTop: '1px dashed',
                    borderColor: 'divider',
                    display: 'flex',
                    gap: 1,
                    alignItems: 'flex-start',
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: 600, color: 'text.secondary', minWidth: 40, pt: 0.25 }}
                  >
                    VP
                  </Typography>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 13 }}>
                      {vp.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {vp.shortVersion}
                    </Typography>
                  </Box>
                </Box>
              )}
            </AssetCard>
          );
        })}

        <Divider sx={{ my: 4 }} />

        {/* ── 6. Myth-Busting 시각 자산 ── */}
        <SectionTitle
          title="Myth-Busting 시각 자산"
          description="VDL이 반전시키는 3가지 통념 각각을 시각적으로 증명하는 장면입니다. 통념의 허점을 한 눈에 보여주는 비교 구도를 사용합니다."
        />
        {VISUAL_ASSETS.mythBusting.map((item) => {
          const myth = MYTH_BUSTING.find((m) => m.id === item.id.replace('myth-', ''));
          return (
            <AssetCard
              key={item.id}
              name={item.myth}
              description={item.visualConcept}
              usage={`Landing, Brand Story, SNS — "${item.philosophyRef}" 철학과 연결된 편견 반전 장면`}
              tags={[
                { label: item.philosophyRef, color: 'warning' },
              ]}
            >
              {/* 연결된 Myth-Busting 원문 */}
              {myth && (
                <Box
                  sx={{
                    mt: 1.5,
                    pt: 1,
                    borderTop: '1px dashed',
                    borderColor: 'divider',
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 1, mb: 0.5 }}>
                    <Typography
                      variant="caption"
                      sx={{ fontWeight: 600, color: 'text.secondary', minWidth: 40, pt: 0.25 }}
                    >
                      반전
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: 13 }}>
                      {myth.reversal}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Typography
                      variant="caption"
                      sx={{ fontWeight: 600, color: 'text.secondary', minWidth: 40, pt: 0.25 }}
                    >
                      핵심
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                      {myth.keyPhrase}
                    </Typography>
                  </Box>
                </Box>
              )}
            </AssetCard>
          );
        })}

        <Divider sx={{ my: 4 }} />

        {/* ── 7. SNS 콘텐츠 템플릿 ── */}
        <SectionTitle
          title="SNS 콘텐츠 템플릿"
          description="VDL SNS 콘텐츠의 4가지 시각 패턴입니다. 모든 템플릿은 Grid 배경 위에 구성되며, VDL 톤앤매너를 유지합니다."
        />
        {VISUAL_ASSETS.snsTemplates.map((item) => (
          <AssetCard
            key={item.id}
            name={item.pattern}
            description={item.description}
            usage={`Instagram, X, LinkedIn 등 SNS 채널`}
            meta={[
              { label: 'Style', value: item.style },
            ]}
          />
        ))}
      </PageContainer>
    </>
  ),
};

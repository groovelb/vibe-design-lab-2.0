/**
 * Part S1-P-A — 프롤로그: 10년간의 디발자
 */
import {
  SlideChapterTitle,
  SlideHSplit,
  SlideGrid,
  SlideTypoStack,
  SlideList,
  SlideStorytelling,
  SlideImage,
  SlideDescList,
} from '../../../../components/presentation';
import Box from '@mui/material/Box';
import { presentationTokens as t } from '../../../../styles/themes/presentation';

export const prologueSlides = [
  {
    id: 'S1-P-A-0',
    title: '프롤로그',
    render: () => (
      <SlideChapterTitle
        overline="PROLOGUE"
        title="디자인의 본질은 도구일까, 의도일까?"
        summary="10년간의 디발자: 디자이너이자 개발자로서 깨달은 것"
        toc={[
          '코스 리드 소개: DDD',
          '커리어 타임라인',
          '포트폴리오',
          '왜 의도를 쪼개야 하는가',
          '시각 언어: 자동차 디자인',
          '시각 언어: 디지털 프로덕트',
          '언어는 경험을 함축한다',
          '글로 디자인하는 시대',
        ]}
      />
    ),
  },
  {
    id: 'S1-P-A-1',
    title: 'DDDesign 소개',
    render: () => (
      <SlideHSplit>
        <SlideTypoStack
          title="Data Driven Design"
          body="https://dddesign.io"
        />
        <SlideDescList
          items={[
            { title: '팀빌딩이 완성되지 않은 스타트업', desc: '이빨이 하나 없어도 사업이 돌아가게 도와줍니다.' },
            { title: 'R & D 가 필요한 MVP 시장 진출', desc: '결정장애가 왔을때 무엇을 어떻게 만들지 고민합니다.' },
            { title: '인터랙티브 웹 + 데이터 시각화', desc: '이런건 어떻게 만들지? 라는걸 만들어 줍니다.' },
          ]}
        />
      </SlideHSplit>
    ),
  },
  {
    id: 'S1-P-A-2',
    title: '커리어 타임라인',
    render: () => (
      <SlideHSplit>
        <SlideList
          items={[
            'Researcher',
            'UX Design',
            'UX Engineer',
            'UI Design',
            'Front-End Developer',
          ]}
          level="headline"
        />
        <SlideDescList
          items={[
            { title: '소셜 미디어 스타트업', desc: '사용자 리서치, UX 디자인, 프로토타이핑' },
            { title: '여행 스타트업', desc: '프로덕트 디자인, 디자인 시스템, 프론트엔드 개발' },
            { title: 'Data Driven Design', desc: '조직 체질 개선, 디자인 컨설팅, 제품 개발' },
            { title: 'Vibe Design Lab', desc: '바이브 코딩 교육, 바이브 코딩 환경 컨설팅' },
          ]}
        />
      </SlideHSplit>
    ),
  },
  {
    id: 'S1-P-A-3',
    title: '포트폴리오',
    render: () => (
      <SlideHSplit>
        <SlideTypoStack
          title={`유저 리서치 → 기획 → UX설계 → \n 디자인 시스템 → 디자인 고도화`}
          body="*위 업무간의 연결고리가 바이브 코딩에서도 중요합니다"
        />
        <SlideImage src="/presentations/project_ddd.png" alt="포트폴리오 프로젝트 그리드" />
      </SlideHSplit>
    ),
  },
  {
    id: 'S1-P-A-4',
    title: '왜 의도를 쪼개야 하는가',
    render: () => (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
        {/* Zone dividers (full height) */}
        <Box sx={{ position: 'absolute', left: '33.33%', top: 0, bottom: 0, width: '1px', background: 'repeating-linear-gradient(to bottom, var(--vdl-700) 0px, var(--vdl-700) 6px, transparent 6px, transparent 20px)', zIndex: 0 }} />
        <Box sx={{ position: 'absolute', left: '66.66%', top: 0, bottom: 0, width: '1px', background: 'repeating-linear-gradient(to bottom, var(--vdl-700) 0px, var(--vdl-700) 6px, transparent 6px, transparent 20px)', zIndex: 0 }} />
        {/* Phase labels */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', position: 'relative', zIndex: 1 }}>
          {['맥락', '구조', '표면'].map((label) => (
            <Box
              key={label}
              sx={{
                textAlign: 'center',
                fontFamily: t.fontFamily.heading,
                fontSize: t.typo.title.fontSize,
                fontWeight: t.typo.title.fontWeight,
                lineHeight: t.typo.title.lineHeight,
                color: t.color.textSecondary,
              }}
            >
              {label}
            </Box>
          ))}
        </Box>

        {/* Cycling rectangular path */}
        <Box
          component="svg"
          viewBox="0 0 1200 600"
          preserveAspectRatio="xMidYMid meet"
          sx={{ flex: 1, width: '100%', mt: `${t.spacing.section}px`, position: 'relative', zIndex: 1 }}
        >

          {/* 3 sides: left → top → right */}
          <path
            d="M40,390 V210 H1160 V390"
            fill="none" stroke="var(--vdl-100)" strokeWidth="1"
          />
          {/* Bottom */}
          <line x1="40" y1="390" x2="1160" y2="390" stroke="var(--vdl-100)" strokeWidth="1" />

          {/* Left ↑ (centered y=300) */}
          <path d="M52,308 L40,292 L28,308" fill="none" stroke="var(--vdl-100)" strokeWidth="1.5" />
          {/* Right ↓ (centered y=300) */}
          <path d="M1150,292 L1160,308 L1170,292" fill="none" stroke="var(--vdl-100)" strokeWidth="1.5" />

          {/* Process chain on top edge — bg rect + text per label */}
          <rect x="58" y="197" width="124" height="26" fill="var(--vdl-950)" />
          <text x="120" y="210" fill="var(--vdl-100)" fontSize="18" fontFamily={t.fontFamily.heading} textAnchor="middle" dominantBaseline="central">유저 리서치</text>

          <rect x="308" y="197" width="64" height="26" fill="var(--vdl-950)" />
          <text x="340" y="210" fill="var(--vdl-100)" fontSize="18" fontFamily={t.fontFamily.heading} textAnchor="middle" dominantBaseline="central">기획</text>

          <rect x="544" y="195" width="112" height="30" fill="var(--vdl-950)" />
          <text x="600" y="210" fill="var(--vdl-100)" fontSize="22" fontWeight="700" fontFamily={t.fontFamily.heading} textAnchor="middle" dominantBaseline="central">UX 설계</text>

          <rect x="812" y="197" width="136" height="26" fill="var(--vdl-950)" />
          <text x="880" y="210" fill="var(--vdl-100)" fontSize="18" fontFamily={t.fontFamily.heading} textAnchor="middle" dominantBaseline="central">디자인 시스템</text>

          <rect x="1032" y="197" width="136" height="26" fill="var(--vdl-950)" />
          <text x="1100" y="210" fill="var(--vdl-100)" fontSize="18" fontFamily={t.fontFamily.heading} textAnchor="middle" dominantBaseline="central">디자인 고도화</text>

          {/* Center message */}
          <text x="600" y="305" fill="var(--vdl-100)" fontSize="22" fontWeight="600" fontFamily={t.fontFamily.heading} textAnchor="middle">
            생각의 흐름이 깨지고, 결과물을 해석하게 됩니다.
          </text>

          {/* Bottom annotations (centered per zone) */}
          <text x="200" y="510" fill="var(--vdl-100)" fontSize="16" fontWeight="700" fontFamily={t.fontFamily.heading} textAnchor="middle">의도가 발생하는 지점</text>
          <text x="600" y="510" fill="var(--vdl-100)" fontSize="16" fontWeight="700" fontFamily={t.fontFamily.heading} textAnchor="middle">구현이 시작되야하는 지점</text>
          <text x="1000" y="510" fill="var(--vdl-100)" fontSize="16" fontWeight="700" fontFamily={t.fontFamily.heading} textAnchor="middle">실제로 개발이 시작되는 지점</text>

        </Box>
      </Box>
    ),
  },
  {
    id: 'S1-P-A-5',
    title: '시각 언어: 자동차 디자인',
    render: () => (
      <SlideGrid columns={3}>
        <SlideList
          items={['스케치', '조감도', '설계도', '부품도', '최종 렌더링']}
          variant="number"
          level="headline"
        />
        <SlideImage src="/presentations/generated/car-01-sketch_v3.webp" alt="스케치 — 아이디어를 빠르게 시각화" />
        <SlideImage src="/presentations/generated/car-02-birdseye_v3.webp" alt="조감도 — 전체 형태와 비율 확인" />
        <SlideImage src="/presentations/generated/car-03-blueprint_v3.webp" alt="설계도 — 구조와 치수를 정밀하게 정의" />
        <SlideImage src="/presentations/generated/car-04-parts_v4.webp" alt="부품도 — 개별 파트를 분리하여 제작 가능하게" />
        <SlideImage src="/presentations/generated/car-05-final_v2.webp" alt="최종 렌더링 — 실제 환경에서의 완성 모습" />
      </SlideGrid>
    ),
  },
  {
    id: 'S1-P-A-6',
    title: '시각 언어: 디지털 프로덕트',
    render: () => (
      <SlideGrid columns={3}>
        <SlideList
          items={['스케치', '목업(시안)', 'UX 설계', '디자인 시스템', '최종 GUI']}
          variant="number"
          level="headline"
        />
        <SlideImage src="/presentations/generated/app-01-sketch_v1.webp" alt="스케치 — 손으로 그리는 와이어프레임" />
        <SlideImage src="/presentations/generated/app-02-mockup_v1.webp" alt="목업(시안) — 시각적 방향성 제시" />
        <SlideImage src="/presentations/generated/app-03-ux_v1.webp" alt="UX 설계 — 구조와 흐름을 정밀하게 정의" />
        <SlideImage src="/presentations/generated/app-04-system_v1.webp" alt="디자인 시스템 — 재사용 가능한 요소 체계화" />
        <SlideImage src="/presentations/generated/app-05-final_v1.webp" alt="최종 GUI — 실제 환경에서의 완성 인터페이스" />
      </SlideGrid>
    ),
  },
  {
    id: 'S1-P-A-7',
    title: '언어는 경험을 함축한다',
    render: () => (
      <SlideHSplit>
        <SlideStorytelling
          from="BUTTON, 고작 6bit 데이터 덩어리"
          to="언어는 인간의 경험과 역사를 응축합니다"
        />
        <SlideTypoStack
          headline="대표성 있는 언어"
          body="이런 대표성 있는 언어를 조합해서 우리의 의도를 AI에게 전달해야 합니다. 단어 하나에 담긴 맥락이 AI의 해석 품질을 결정하기 때문이죠."
        />
      </SlideHSplit>
    ),
  },
  {
    id: 'S1-P-A-8',
    title: '글로 디자인하는 시대',
    render: () => (
      <SlideHSplit>
        <SlideStorytelling
          from="디자인 감각이 부족해서 항상 글로 정리해왔다"
          to="지금은 이 습관이 최대 장점이 되었다"
        />
        <SlideTypoStack
          headline="이 코스는"
          body="지난 커리어 10년의 노하우를 바이브 코딩 환경에 녹인 것입니다. 도구가 바뀌어도 유효한 디자인 언어 체계를 함께 만들어갑니다."
        />
      </SlideHSplit>
    ),
  },
];

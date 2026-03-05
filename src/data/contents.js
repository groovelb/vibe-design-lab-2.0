/**
 * VDL 컨텐츠 상수
 *
 * 브랜드 메시지 원본: src/data/verbalIdentity.js (← VDL_verbal_identity.md)
 * 이 파일은 verbalIdentity에서 import한 브랜드 데이터 + 페이지별/UI별 텍스트를 조합한다.
 * 임의 텍스트 작성 금지 — verbalIdentity.js 또는 이 파일에서 참조할 것.
 */

import {
  BRAND as _BRAND,
  PERSONAS as _PERSONAS,
  WEBSITE_COPY,
} from './verbalIdentity';

// ============================================================
// 1. 버벌 아이덴티티에서 그대로 가져오는 데이터
//    수정이 필요하면 verbalIdentity.js를 수정할 것
// ============================================================

export {
  BRAND,
  PHILOSOPHY,
  VALUE_PROPOSITIONS,
  TIME_HORIZON,
  POSITIONING,
  MYTH_BUSTING,
  ENGLISH_ONLY_TERMS,
} from './verbalIdentity';

// ============================================================
// 2. 페르소나 — verbal identity 원본 + landing 페이지 추가 데이터
// ============================================================

export const PERSONAS = {
  canvasDesigner: {
    ..._PERSONAS.canvasDesigner,
    problemOneLiner: '채용 시장은 디자인 엔지니어를 찾는데, 나는 Figma 안에서만 영향력이 있다',
  },
  sandwichPM: {
    ..._PERSONAS.sandwichPM,
    problemOneLiner: 'AI가 실행을 가져가는데, 보여줄 게 없는 기획자의 자리는 어디인가',
  },
  pipelineDev: {
    ..._PERSONAS.pipelineDev,
    problemOneLiner: '구현은 되는데 왜 어색한지 설명을 못 한다',
  },
};

// ============================================================
// 3. 페이지별 메시지 계층
// ============================================================

export const PAGES = {
  // ----- Landing (/) -----
  landing: {
    hero: {
      headline: _BRAND.slogan,
      subCopy: _BRAND.tagline,
    },
    problem: {
      headline: '시장은 바뀌는데, 배울 곳이 없다',
      career: [
        {
          persona: _PERSONAS.canvasDesigner.label,
          text: 'Figma 안에서만 영향력이 있다. 채용 시장은 디자인 엔지니어를 찾는데, 캔버스 밖으로 나가면 무력해진다. 개발팀에 넘기면 간격, 색상, 트랜지션이 의도와 달라진다. 내 디자인인데 완성은 남의 몫이다.',
        },
        {
          persona: _PERSONAS.sandwichPM.label,
          text: '위아래에 끼여 결정권 없이 조율만 한다. 검증하고 싶은 아이디어가 있는데 프로토타입을 만들 수 없다. 개발 리소스 요청하면 우선순위에서 밀린다. 말로 설득해야 하는데 보여줄 게 없다.',
        },
        {
          persona: _PERSONAS.pipelineDev.label,
          text: '할당된 티켓이 곧 업무 범위다. 레이아웃, 색상, 타이포, 간격을 "왜 이렇게" 결정하는 기준 자체를 모른다. 사이드 프로젝트를 만들려 해도 구현은 되는데 UI 의사결정에서 반복적으로 막힌다. 왜 어색한지 모르겠다.',
        },
      ],
      learning: [
        { problem: 'VOD 한계', text: '혼자 듣는 VOD는 혼자 막히고 혼자 포기한다' },
        { problem: '도구 종속', text: '도구 사용법을 배워도 도구가 바뀌면 처음부터다' },
        { problem: '학습 단절', text: '코스가 끝나면 끝이다. 쌓이는 게 없다' },
      ],
    },
    howDifferent: {
      headline: 'VOD가 아니다',
      subCopy: '코스 하나가 하나의 커뮤니티다',
    },
    courseHighlight: {
      headline: '코스',
      ctaPrimary: '자세히 보기',
      ctaSecondary: '코스 전체 보기 →',
    },
    courseReview: {
      headline: '멤버가 말하는 경험',
    },
    dictionaryPreview: {
      headline: '도구가 바뀌어도 남는 체계',
      subCopy: 'Vibe Dictionary — 디자인 패턴의 분류 체계',
      cta: '사전 탐색하기 →',
    },
    communitySnapshot: {
      headline: '지금 커뮤니티에서 일어나는 일',
    },
    footerCta: {
      headline: '시작합니다',
      cta: '코스 보기',
    },
  },

  // ----- Course (/course) -----
  course: {
    hero: {
      headline: '코스',
      subCopy: '혼자 듣는 강의가 아니라 함께 만드는 학습',
    },
    learningMethod: {
      headline: '어떻게 배우는가',
    },
  },

  // ----- Course Detail (/course/[slug]) -----
  courseDetail: {
    overview: {
      labels: {
        target: '대상',
        expectedResult: '기대 결과',
        duration: '기간',
        price: '가격',
        cohort: '코호트',
      },
    },
    curriculum: {
      headline: '커리큘럼',
    },
    learningEnvironment: {
      headline: '이런 환경에서 배운다',
      subCopy: '이전 코호트의 실제 학습 장면',
    },
    testimonials: {
      headline: '멤버 이야기',
    },
    enrollment: {
      headline: '수강 신청',
      cta: '수강 신청하기',
    },
    floatingCta: {
      label: '수강 신청하기',
    },
  },

  // ----- Dictionary (/dictionary) -----
  dictionary: {
    intro: {
      headline: 'Vibe Dictionary',
      subCopy: '디자인 패턴의 분류 체계. 도구가 바뀌어도 이 키워드는 남는다.',
    },
    bottomCta: {
      headline: '이 체계를 실전에서 쓰는 법',
      cta: '코스 보기',
    },
  },

  // ----- Experiment (/experiment) -----
  experiment: {
    intro: {
      headline: 'Brand Experiment',
      subCopy: '같은 의도, 다른 언어. 결과의 차이를 본다.',
    },
    bottomCta: {
      headline: '이 차이를 만드는 언어를 배운다',
      cta: '코스 보기',
    },
    detail: {
      beforeLabel: 'Before',
      afterLabel: 'After',
      explanationHeadline: '무엇이 달랐는가',
    },
  },

  // ----- Brand Story (/story) -----
  story: {
    mission: {
      headline: _BRAND.mission,
    },
    philosophy: {
      headline: '세 가지 신념',
    },
    valueProposition: {
      // VALUE_PROPOSITIONS 배열 참조
    },
    bottomCta: {
      headline: '실천합니다',
      cta: '코스 보기',
    },
  },

  // ----- Chapter Learning (/course/[slug]/[chapterSlug]) -----
  chapterLearning: {
    submitButton: '결과물 제출하기',
    commentPlaceholder: '댓글을 입력하세요',
    timestampToggle: '현재 시점 첨부',
    feedbackPlaceholder: '피드백을 남겨주세요',
    chapterComplete: '이 챕터를 완료했습니다',
  },
};

// ============================================================
// 4. VOD vs VDL 비교 데이터
// ============================================================

export const COMPARISON_TABLE = [
  { category: '학습 방식', vod: '혼자 재생, 혼자 정지', vdl: '챕터마다 동료의 질문과 결과물이 보인다' },
  { category: '질문', vod: '게시판에 묻힌다', vdl: '챕터 맥락에 바로 연결된다' },
  { category: '완주', vod: '완주해도 아무도 모른다', vdl: '챌린지 결과가 공유되고 반응이 온다' },
  { category: '이후', vod: '끝나면 끝', vdl: '졸업 후에도 커뮤니티에 남는다' },
  { category: '교육 대상', vod: '도구 사용법', vdl: '도구가 바뀌어도 남는 디자인 언어 체계' },
];

// ============================================================
// 5. 공통 UI 텍스트
// ============================================================

export const GNB = {
  logo: _BRAND.name,
  menus: [
    { label: 'Course', href: '/course' },
    { label: 'Dictionary', href: '/dictionary' },
    { label: 'Experiment', href: '/experiment' },
    { label: 'Story', href: '/story' },
  ],
  cta: '코스 보기',
};

export const FOOTER = {
  tagline: `${_BRAND.name} · ${_BRAND.mission}`,
  menus: ['Course', 'Dictionary', 'Experiment', 'Story'],
  communityLink: 'Discord',
  copyright: `© 2026 ${_BRAND.name}`,
};

export const CTA_LABELS = {
  gnb: '코스 보기',
  landingCourseDetailShortcut: '자세히 보기',
  landingCourseList: '코스 전체 보기 →',
  landingDictionaryPreview: '사전 탐색하기 →',
  courseDetailEnroll: '수강 신청하기',
  courseDetailFloating: '수강 신청하기',
  subpageBottomCourse: '코스 보기',
  landingFooter: '코스 보기',
};

export const COHORT_BADGES = {
  recruiting: '모집중',
  ongoing: (n) => `${n}기 진행중`,
  upcoming: (n) => `${n}기 예정`,
};

export const COURSE_CARD_LABELS = {
  target: (audience) => `대상: ${audience}`,
  link: '자세히 보기 →',
};

// ============================================================
// 6. 상태 메시지
// ============================================================

export const STATUS_MESSAGES = {
  error: {
    notFound: '페이지를 찾지 못했습니다',
    server: '문제가 발생했습니다. 잠시 후 다시 시도해주세요',
    network: '연결이 불안정합니다. 네트워크를 확인해주세요',
    commentFail: '댓글을 전송하지 못했습니다. 다시 시도해주세요',
    challengeFail: '제출에 실패했습니다. 다시 시도해주세요',
    loginFail: '이메일 또는 비밀번호를 확인해주세요',
    noAccess: '이 챕터는 수강 신청 후 이용할 수 있습니다',
  },
  empty: {
    noComments: '아직 댓글이 없습니다. 첫 댓글을 남겨보세요',
    noSubmissions: '아직 제출된 결과물이 없습니다',
    noFeedback: '아직 피드백이 없습니다',
    noCourses: '준비중인 코스가 있습니다. 곧 만나요',
  },
  success: {
    challengeSubmit: '결과물이 제출되었습니다',
    feedbackSent: '피드백이 전송되었습니다',
  },
};

// ============================================================
// 7. 대체 텍스트 (alt) 템플릿
// ============================================================

export const ALT_TEXT = {
  memberResult: (memberName, courseTitle) => `${memberName}의 ${courseTitle} 결과물`,
  experimentBefore: (title) => `${title} Before 결과`,
  experimentAfter: (title) => `${title} After 결과`,
  memberAvatar: (memberName) => memberName,
  decorative: '',
};

// ============================================================
// 8. 브랜드 시각 자산 리스팅
//    출처: VDL_visual_identity_v0.4.md
//    제작 대상만 리스팅 — 실제 제작은 별도
// ============================================================

export const VISUAL_ASSETS = {
  /** 로고 시스템 — visual_identity §6 */
  logo: [
    { id: 'flat-v', name: 'Flat V', description: 'Seed 그대로. 2D, 1px monoline 선만', transform: 'none', usage: '워드마크 옆, 파비콘, 기본 로고' },
    { id: 'iso-line-v', name: 'Iso Line V', description: '30° 아이소메트릭 투영. 선만', transform: 'isometric', usage: '히어로, 브랜드 그래픽' },
    { id: 'iso-solid-v', name: 'Iso Solid V', description: 'Iso + 면 채움 (depth + opacity 차등)', transform: 'isometric → extrude', usage: '앱 아이콘, SNS 프로필' },
    { id: 'anatomy-v', name: 'Anatomy V', description: 'Flat/Iso + Naming Line (로고 파라미터를 레이블로 노출)', transform: 'attach-naming', usage: '키비쥬얼 확장, 교육 콘텐츠' },
    { id: 'grid-v', name: 'Grid V', description: 'Flat + 8px Grid 오버레이', transform: 'overlay-grid', usage: '시스템 사고 맥락, 체계 강조' },
    { id: 'code-v', name: 'Code V', description: 'Flat + SVG path 소스 코드 노출', transform: 'expose-source', usage: '개발자 맥락, 기술 콘텐츠' },
  ],

  /** 그래픽 모티프 — visual_identity §7 */
  motifs: [
    { id: 'naming-line', name: 'Naming Line', description: '"보이는 것에 이름을 붙이는 행위"의 시각화. dot(4px) + 1px 직각선 + 모노스페이스 레이블', params: 'dot-size: 4px, line-weight: 1px, 직각 꺾임만, label-font: monospace, label-gap: 8px', usage: '모든 해부 장면, 키워드 설명, 구조 분석' },
    { id: 'circuitry', name: 'Circuitry 연결선', description: 'Naming Line의 확장. 복수 요소를 1px monoline 직각선으로 연결', params: '1px stroke, round cap/join, 직각 꺾임, 대각선 없음', usage: '등가 다이어그램, 관계 시각화, 플로우 연결' },
    { id: 'border-highlight', name: 'Border Highlight', description: '해부 대상 윤곽 강조. Naming Line이 가리키는 대상을 시각적으로 분리', usage: 'UI 해부 장면에서 대상 영역 표시' },
    { id: 'grid-background', name: 'Grid 배경 패턴', description: '8px 단위 dot/line grid. 콘텐츠의 기본 무대', params: 'grid-unit: 8px, color: line-subtle, weight: 1px', usage: '웹 배경, SNS 콘텐츠 배경 (VDL 브랜드 콘텐츠에 필수)' },
  ],

  /** 키 일러스트레이션 — visual_identity §8.2 */
  keyIllustrations: [
    { id: 'key-visual', name: '키비쥬얼 대표 장면', description: 'UI 해부 + Naming Line + 아이소메트릭 분해. VDL의 대표 시각', style: '30° 아이소메트릭, UI 컴포넌트를 z축 분해해 레이어 구조 노출, 각 요소에 Naming Line 부착', priority: 'high', usage: 'Landing Hero, 대표 브랜드 이미지' },
    { id: 'before-after', name: 'Before/After 비교', description: '이름 없는 프롬프트 vs 이름 있는 프롬프트 결과 대비. VDL의 가장 강력한 증명 도구', style: '좌우 분할. Before: 모호한 프롬프트 + 불일치 결과. After: 디자인 언어 프롬프트 + 정밀한 결과', priority: 'high', usage: 'Experiment, Landing, SNS, 블로그' },
    { id: 'equivalence-diagram', name: '등가 다이어그램', description: '[디자인 키워드] — [토큰] — [코드] 3컬럼 연결. Circuitry 연결선으로 등가 관계 시각화', style: '3컬럼, 산세리프(키워드) + 모노스페이스(토큰/코드) 공존, Circuitry로 연결', priority: 'medium', usage: 'Dictionary, 교육 콘텐츠, SNS' },
  ],

  /** Philosophy 일러스트 — verbal_identity §1.2 + visual_identity §8.2 */
  philosophy: [
    { id: 'phil-implementation', belief: '구현은 언어를 따른다', name: '입력↔결과 대응', description: '정밀한 입력(디자인 언어)이 정밀한 결과물로 대응되는 구조. 모호한 입력 → 불일치 결과 vs 정밀한 입력 → 의도대로', derivedValue: 'Design As Build', style: '아이소메트릭, Naming Line으로 입력-결과 대응 관계 표기' },
    { id: 'phil-language', belief: '언어는 경험을 함축한다', name: '함축→전개', description: '하나의 디자인 키워드가 수십 개의 설계 결정으로 전개되는 구조. 압축과 해제의 시각화', derivedValue: 'The Vibe Standard', style: '단일 키워드에서 Circuitry 연결선이 방사형으로 퍼지며 세부 결정들을 Naming Line으로 표기' },
    { id: 'phil-design', belief: '감각도 쪼개면 로직이다', name: '결과물 분해', description: '하나의 디자인 결과물을 명명 가능한 결정들의 조합으로 분해. 감각을 구조로 해체', derivedValue: 'System Over Drawing', style: 'UI 컴포넌트 아이소메트릭 분해, 각 레이어에 Naming Line으로 토큰명/규칙 표기' },
  ],

  /** Value Proposition 일러스트 — verbal_identity §1.3 + visual_identity §8.2 */
  valueProposition: [
    { id: 'vp-system-over-drawing', step: 1, name: 'System Over Drawing', description: '기준을 먼저 설계하는 과정. 결과물이 아니라 Grid + 토큰 + 규칙이 먼저 배치되는 장면', visualConcept: '빈 캔버스 위에 8px Grid → 토큰 정의 → 그 위에 결과물이 올라오는 레이어 순서', style: 'Grid 배경 위에 Naming Line으로 기준값 표기, 최종 결과물은 반투명으로 뒤에' },
    { id: 'vp-the-vibe-standard', step: 2, name: 'The Vibe Standard', description: 'AI가 알아듣는 표준 디자인 언어. 같은 키워드가 일관된 결과를 만드는 장면', visualConcept: '하나의 프롬프트(모노스페이스) → 복수의 일관된 결과물. 등가 다이어그램 변형', style: '입력(모노스페이스 텍스트) → Circuitry → 복수 결과물(일관된 스타일), Naming Line으로 공통 규칙 표기' },
    { id: 'vp-design-as-build', step: 3, name: 'Design As Build', description: '설계가 곧 구현이 되는 장면. 디자인 명세와 코드가 1:1 대응', visualConcept: '좌: 디자인 명세(Naming Line 해부), 우: 실행 결과(동일 구조). 등가 구조', style: '좌우 분할, Circuitry로 1:1 대응 표시, "설계 = 구현" 등가 관계를 시각적으로 증명' },
  ],

  /** Myth-Busting 시각 자산 — verbal_identity §1.7 */
  mythBusting: [
    { id: 'myth-tool-performance', myth: '도구 성능이 올라가면 결과도 좋아질 거다', visualConcept: '도구가 바뀌어도(여러 도구 아이콘) 동일하게 부정확한 결과 vs 언어가 정밀하면 어떤 도구든 정확한 결과', philosophyRef: 'implementation' },
    { id: 'myth-design-later', myth: '디자인은 구현 다음에 다듬는 것이다', visualConcept: '디자인 결정(간격 8px, 색상 토큰 위계)이 곧 구현 설계임을 보여주는 분해 장면', philosophyRef: 'design' },
    { id: 'myth-new-skills-fast', myth: 'AI 시대에는 새로운 스킬을 빨리 익히는 게 중요하다', visualConcept: '의도→결과 격차 다이어그램. 스킬 축적이 아닌 격차 축소가 핵심임을 시각화', philosophyRef: 'language' },
  ],

  /** SNS 콘텐츠 시각 템플릿 — visual_identity §9.1 */
  snsTemplates: [
    { id: 'sns-repetition', pattern: '반복 구문형', description: '타이포 카드. 동일 구조 5회+ 반복, 마지막만 text-primary 강조로 반전', style: 'Grid 배경, 산세리프 본문, 마지막 줄 Display 웨이트' },
    { id: 'sns-declaration', pattern: '선언/이분법형', description: 'Display ExtraBold 한 문장. 100자 미만. 여백 극대화', style: 'Grid 배경, Display 서체 중앙 배치, 최소 요소' },
    { id: 'sns-numbered-list', pattern: '넘버링 리스트형', description: '키워드 캐러셀 + Naming Line. 3~10개 항목', style: 'Grid 배경, 모노스페이스 키워드, 각 항목에 Naming Line 부착' },
    { id: 'sns-before-after', pattern: '비유 서사형 / Before-After', description: 'Before/After 스플릿. 좌우 또는 상하 비교', style: 'Grid 배경, 좌우 분할, Before(흐림/모호) vs After(선명/정밀)' },
  ],
};

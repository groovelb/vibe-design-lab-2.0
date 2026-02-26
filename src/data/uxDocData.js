/**
 * UX 문서용 구조화 데이터
 *
 * 출처: ux-flow.md v1.1, contents.md v1.0
 * Storybook Overview/UX/ 스토리에서 참조하는 IA, 플로우, 블루프린트, 인터랙션 규칙.
 * 제품 UI 텍스트(contents.js)와 분리된 문서 메타데이터.
 */

// ============================================================
// 1. 사이트 맵 (IA 계층 트리)
// ============================================================

export const SITE_MAP = {
  id: 'root',
  label: 'VDL Platform',
  children: [
    {
      id: 'landing',
      label: 'Landing',
      path: '/',
      contentType: '전환 + 정체성',
      sections: [
        { id: 'hero', label: 'Hero', narrativeRole: 'Hook' },
        { id: 'problem', label: 'Problem', narrativeRole: 'Pain' },
        { id: 'how-different', label: 'How We\'re Different', narrativeRole: 'Solution' },
        { id: 'course-highlight', label: 'Course Highlight', narrativeRole: 'First CTA' },
        { id: 'course-review', label: 'Course Review', narrativeRole: 'Proof' },
        { id: 'dictionary-preview', label: 'Dictionary Preview', narrativeRole: 'Trust' },
        { id: 'community-snapshot', label: 'Community Snapshot', narrativeRole: 'Belonging' },
        { id: 'footer-cta', label: 'Footer CTA', narrativeRole: 'Final CTA' },
      ],
    },
    {
      id: 'course',
      label: 'Course',
      path: '/course',
      contentType: '전환',
      sections: [
        { id: 'learning-method', label: '학습 방식 소개' },
        { id: 'course-list', label: '코스 카드 리스트' },
      ],
    },
    {
      id: 'course-detail',
      label: 'Course Detail',
      path: '/course/[slug]',
      contentType: '전환',
      sections: [
        { id: 'course-hero', label: '코스 Hero' },
        { id: 'course-overview', label: '코스 개요' },
        { id: 'curriculum', label: '커리큘럼' },
        { id: 'learning-env', label: '학습 환경 미리보기' },
        { id: 'testimonials', label: '멤버 증언' },
        { id: 'enrollment', label: '수강 신청' },
      ],
    },
    {
      id: 'dictionary',
      label: 'Vibe Dictionary',
      path: '/dictionary',
      contentType: '신뢰',
      sections: [
        { id: 'dict-intro', label: '소개' },
        { id: 'taxonomy-tree', label: 'Taxonomy Tree' },
        { id: 'dict-course-cta', label: '하단 Course 유도' },
      ],
    },
    {
      id: 'experiment',
      label: 'Brand Experiment',
      path: '/experiment',
      contentType: '신뢰',
      sections: [
        { id: 'exp-intro', label: '소개' },
        { id: 'exp-gallery', label: '예제 갤러리' },
        { id: 'exp-course-cta', label: '하단 Course 유도' },
      ],
      children: [
        {
          id: 'experiment-detail',
          label: 'Experiment Detail',
          path: '/experiment/[slug]',
          sections: [
            { id: 'exp-overview', label: '실험 개요' },
            { id: 'exp-before', label: 'Before' },
            { id: 'exp-after', label: 'After' },
            { id: 'exp-explanation', label: '해설' },
          ],
        },
      ],
    },
    {
      id: 'story',
      label: 'Brand Story',
      path: '/story',
      contentType: '정체성',
      sections: [
        { id: 'mission', label: 'Mission' },
        { id: 'philosophy', label: 'Philosophy' },
        { id: 'value-proposition', label: 'Value Proposition' },
        { id: 'story-course-cta', label: '하단 Course 유도' },
      ],
    },
  ],
};

// ============================================================
// 2. 콘텐츠 분류 원칙
// ============================================================

export const CONTENT_CLASSIFICATION = [
  { type: '전환 콘텐츠', criterion: '코스 구매 결심에 직접 기여', pages: ['Landing (핵심)', 'Course', 'Course Detail'] },
  { type: '신뢰 콘텐츠', criterion: '"이 체계가 진짜다"를 증명', pages: ['Landing (Dictionary Preview)', 'Dictionary', 'Brand Experiment'] },
  { type: '정체성 콘텐츠', criterion: 'VDL이 어떤 곳인지 전달', pages: ['Landing (Hero, Problem, How We\'re Different)', 'Brand Story'] },
  { type: '소셜 프루프', criterion: '멤버의 결과물·증언으로 신뢰 강화', pages: ['Landing (Course Review, Community Snapshot)', 'Course Detail'] },
];

// ============================================================
// 3. 유저 플로우 A/B/C/D
// ============================================================

export const USER_FLOWS = [
  {
    id: 'flow-a',
    name: '핵심 전환',
    nameEn: 'Primary Conversion',
    priority: 'Primary',
    description: '코스 발견 → 수강 결심',
    rationale: '이 플로우가 사이트의 존재 이유다',
    steps: [
      { label: '외부 유입', detail: 'SNS / 검색 / 멤버 공유 / 졸업생 증언', type: 'entry' },
      { label: 'Landing — 전환 내러티브', detail: '8 섹션 스크롤 (Hook→Pain→Solution→CTA→Proof→Trust→Belonging→Final CTA)', type: 'page' },
      { label: 'Course Detail (숏컷)', detail: 'Landing ④에서 바로 진입', type: 'branch-a' },
      { label: 'Course', detail: 'GNB 또는 Footer CTA 경유', type: 'branch-b' },
      { label: 'Course Detail', detail: '코스 개요 → 커리큘럼 → 학습 환경 → 멤버 증언', type: 'page' },
      { label: '외부 결제 페이지', detail: '수강 신청 CTA 클릭', type: 'exit' },
    ],
  },
  {
    id: 'flow-b',
    name: '신뢰 구축',
    nameEn: 'Trust Building',
    priority: 'Secondary',
    description: '체계가 진짜인가?',
    rationale: 'VDL의 디자인 언어 체계가 실제로 존재하고 작동하는지 확인',
    steps: [
      { label: 'Landing 또는 GNB', type: 'entry' },
      { label: 'Vibe Dictionary', detail: 'Taxonomy Tree 탐색 → "이런 체계가 있었어?"', type: 'branch-a' },
      { label: 'Brand Experiment', detail: 'Before/After 체감 → "정밀하게 말하면 정밀하게 나온다"', type: 'branch-b' },
      { label: 'Course → Course Detail', detail: 'GNB CTA 또는 하단 유도', type: 'page' },
      { label: '수강 결심 강화', type: 'exit' },
    ],
  },
  {
    id: 'flow-c',
    name: '정체성 탐색',
    nameEn: 'Identity Exploration',
    priority: 'Secondary',
    description: '이 곳은 어떤 곳인가?',
    rationale: 'VDL의 철학과 정체성을 깊이 이해하려는 방문자',
    steps: [
      { label: 'Landing 또는 GNB', type: 'entry' },
      { label: 'Brand Story', detail: 'Mission → Philosophy → Value Proposition', type: 'page' },
      { label: 'Course → Course Detail', detail: '철학에 공감한 경우', type: 'page' },
      { label: '수강 결심', type: 'exit' },
    ],
  },
  {
    id: 'flow-d',
    name: '순환',
    nameEn: 'Circular Growth',
    priority: 'Circular',
    description: '멤버 → 마케팅 → 신규 유입',
    rationale: '서비스 운영 레벨의 순환 플로우',
    steps: [
      { label: '멤버 학습 완료', type: 'entry' },
      { label: '결과물 + 증언 축적', type: 'page' },
      { label: 'Landing 반영', detail: 'Course Review, Community Snapshot, Course Detail 멤버 증언', type: 'page' },
      { label: '멤버 자발적 SNS 공유', type: 'page' },
      { label: '신규 방문자 유입 → 플로우 A', type: 'exit' },
    ],
  },
];

// ============================================================
// 4. Landing 전환 내러티브 8단계
// ============================================================

export const LANDING_NARRATIVE = [
  { step: 1, section: 'Hero', role: 'Hook', message: '"여기가 뭐 하는 곳인지"' },
  { step: 2, section: 'Problem', role: 'Pain', message: '커리어: "시장은 바뀌는데 나만 그대로다" + 학습: "배우려 해도 혼자 듣고 혼자 포기했다"' },
  { step: 3, section: 'How We\'re Different', role: 'Solution', message: '"다른 방식이 있구나"' },
  { step: 4, section: 'Course Highlight', role: 'First CTA', message: '"이 코스로 해결하는구나"' },
  { step: 5, section: 'Course Review', role: 'Proof', message: '"실제로 해본 사람이 이렇게 말하네"' },
  { step: 6, section: 'Dictionary Preview', role: 'Trust', message: '"체계가 진짜 있네"' },
  { step: 7, section: 'Community Snapshot', role: 'Belonging', message: '"이 사람들이랑 같이 하고 싶다"' },
  { step: 8, section: 'Footer CTA', role: 'Final CTA', message: '"시작하자"' },
];

// ============================================================
// 5. 페이지 블루프린트
// ============================================================

export const PAGE_BLUEPRINTS = {
  landing: {
    title: 'Landing',
    path: '/',
    purpose: '브랜드 스토리텔링 + 코스 전환 퍼널 (Landing 단독으로 전환 내러티브 완결)',
    entry: '외부 유입 (SNS, 검색, 멤버 공유, 직접 URL)',
    exit: 'Course Detail (숏컷), Course, Dictionary, Experiment, Story',
    sections: [
      { order: 1, name: 'Hero', narrativeRole: 'Hook', description: '한 문장 정의 + 태그라인으로 정체성 즉시 전달', keyElements: '타이포그래피 중심, 최소 시각 요소, 스크롤 유도' },
      { order: 2, name: 'Problem', narrativeRole: 'Pain', description: '커리어 문제(왜 배워야 하는가) → 학습 환경 문제(왜 기존 교육은 안 되는가)', keyElements: '페르소나별 1문장 + 학습 문제 3항목' },
      { order: 3, name: 'How We\'re Different', narrativeRole: 'Solution', description: '"VOD가 아닌 커뮤니티 학습"이라는 핵심 차별점', keyElements: 'VOD vs VDL 비교 구조' },
      { order: 4, name: 'Course Highlight', narrativeRole: 'First CTA', description: '코스 카드 미리보기 + Course Detail 직접 진입 CTA', keyElements: '코스 카드 1~2개, 숏컷 CTA' },
      { order: 5, name: 'Course Review', narrativeRole: 'Proof', description: '수강생의 실제 학습 경험 증언 + 결과물', keyElements: '증언 2~3개, 페르소나 다양성' },
      { order: 6, name: 'Dictionary Preview', narrativeRole: 'Trust', description: 'Taxonomy 일부 노출 → 전문성 증거', keyElements: '트리 구조 일부 + Dictionary CTA' },
      { order: 7, name: 'Community Snapshot', narrativeRole: 'Belonging', description: '커뮤니티 활동의 실제 모습', keyElements: '질문·답변, 챌린지 결과물 공유 스냅샷' },
      { order: 8, name: 'Footer CTA', narrativeRole: 'Final CTA', description: 'Landing을 끝까지 본 사람이 받는 최종 전환 기회', keyElements: '단일 CTA' },
    ],
  },
  course: {
    title: 'Course',
    path: '/course',
    purpose: '코스 목록 탐색 + Course Detail 진입',
    entry: 'Landing CTA, GNB',
    exit: 'Course Detail, Landing, 다른 GNB 메뉴',
    sections: [
      { order: 1, name: '학습 방식 소개', description: '"VOD가 아닌 커뮤니티 학습" 차별점 명시', keyElements: 'VOD vs VDL 비교 (짧고 단정적)' },
      { order: 2, name: '코스 카드 리스트', description: '각 코스의 핵심 정보를 한눈에', keyElements: '코스명, 대상, 기간, 가격, 코호트 상태' },
    ],
  },
  courseDetail: {
    title: 'Course Detail',
    path: '/course/[slug]',
    purpose: '개별 코스 상세 + 커뮤니티 학습 경험 미리보기 + 수강 결심',
    entry: 'Course 코스 카드, Landing Course Highlight',
    exit: '외부 결제 링크, Course, 다른 GNB 메뉴',
    sections: [
      { order: 1, name: '코스 Hero', description: '코스명 + 핵심 메시지 + 대상', keyElements: '대형 타이포그래피' },
      { order: 2, name: '코스 개요', description: '대상, 기대 결과, 기간, 가격, 구성 요약', keyElements: '스캔 가능한 구조' },
      { order: 3, name: '커리큘럼', description: '챕터 목록 + 각 챕터별 학습 내용·챌린지', keyElements: '아코디언 리스트' },
      { order: 4, name: '학습 환경 미리보기', description: '질문 피드·챌린지 결과물·피어 피드백 스냅샷', keyElements: '이전 코호트 실제 데이터 기반' },
      { order: 5, name: '멤버 증언', description: '이전 코호트 멤버의 결과물 + 증언', keyElements: '페르소나별 1건 이상' },
      { order: 6, name: '수강 신청', description: 'CTA + 가격 + 다음 코호트 일정', keyElements: 'Floating CTA 별도 존재' },
    ],
  },
  dictionary: {
    title: 'Vibe Dictionary',
    path: '/dictionary',
    purpose: 'VDL 연구 자산의 체험 — "이 체계가 진짜다"의 물적 증거',
    entry: 'Landing Dictionary Preview, GNB',
    exit: 'Course (하단 CTA), 다른 GNB 메뉴',
    sections: [
      { order: 1, name: '소개', description: 'Dictionary의 목적과 사용법', keyElements: '1~2문장' },
      { order: 2, name: 'Taxonomy Tree', description: '디자인 패턴 분류 체계 인터랙티브 트리', keyElements: '카테고리 → 하위 패턴 → 키워드' },
      { order: 3, name: '하단 Course 유도', description: '체계 확인 후 자연스러운 학습 유도', keyElements: '"이 체계를 실전에서 쓰는 법" → CTA' },
    ],
  },
  experiment: {
    title: 'Brand Experiment',
    path: '/experiment',
    purpose: 'VDL 연구 결과물 시연 — "정밀하게 말하면 정밀하게 나온다"의 실물 증거',
    entry: 'Landing, GNB',
    exit: 'Experiment Detail, Course (하단 CTA), 다른 GNB 메뉴',
    sections: [
      { order: 1, name: '소개', description: 'Brand Experiment의 목적', keyElements: '"같은 의도, 다른 언어. 결과의 차이를 봅니다"' },
      { order: 2, name: '예제 갤러리', description: '예제 카드 리스트', keyElements: '썸네일 + 제목 + 한 줄 설명' },
      { order: 3, name: '하단 Course 유도', description: '체계 확인 후 학습 유도', keyElements: '"이 차이를 만드는 언어를 배웁니다" → CTA' },
    ],
  },
  story: {
    title: 'Brand Story',
    path: '/story',
    purpose: 'VDL의 정체성과 철학을 깊이 있게 전달',
    entry: 'Landing, GNB',
    exit: 'Course (하단 CTA), 다른 GNB 메뉴',
    sections: [
      { order: 1, name: 'Mission', description: '한 문장 — "사고와 구현의 주체를 일치시킨다"', keyElements: '대형 타이포그래피, 단독 섹션' },
      { order: 2, name: 'Philosophy', description: '세 가지 신념', keyElements: '각 신념 독립 블록 + 짧은 해설' },
      { order: 3, name: 'Value Proposition', description: 'System Over Drawing → The Vibe Standard → Design As Build', keyElements: '세 단계 진행을 시각적으로 표현' },
      { order: 4, name: '하단 Course 유도', description: '철학에 공감한 후 학습으로 연결', keyElements: '"실천합니다" → CTA' },
    ],
  },
};

// ============================================================
// 6. 인터랙션 원칙
// ============================================================

export const INTERACTION_PRINCIPLES = {
  navigation: [
    { principle: '명확한 위치 인식', rule: 'GNB에서 현재 페이지 active state 항상 표시. 사용자가 "나 지금 어디 있지?"를 묻지 않게' },
    { principle: '숏컷 허용', rule: 'Landing → Course Detail 직접 이동 가능 (Course 페이지를 건너뛰는 숏컷). 강제 순서 없음' },
    { principle: '뒤로 가기 자연스러움', rule: '브라우저 뒤로 가기가 항상 예상대로 작동. SPA 라우팅에서도 히스토리 스택 정상 유지' },
    { principle: 'GNB CTA 일관성', rule: 'GNB의 CTA 버튼은 어느 페이지에서든 Course 페이지로 이동' },
  ],
  scrollLayout: [
    { principle: '수직 스크롤 기본', rule: '모든 페이지는 수직 스크롤 기반. 수평 스크롤, 페이지네이션은 사용하지 않음' },
    { principle: '섹션 리듬', rule: '각 섹션 사이에 충분한 여백. 콘텐츠 밀도보다 호흡이 우선' },
    { principle: '스캔 가능한 구조', rule: '긴 텍스트 블록 지양. 제목 → 핵심 메시지 → 상세의 계층 구조 유지' },
    { principle: 'Responsive', rule: '데스크탑 우선 설계, 모바일 최적화. 브레이크포인트: 360 / 768 / 1200 / 1440' },
  ],
  transitionMotion: [
    { principle: '절제', rule: '모션은 의미가 있을 때만. 장식적 애니메이션 금지' },
    { principle: '스크롤 기반 진입', rule: '섹션이 뷰포트에 진입할 때 subtle fade-in + translate. 과하지 않게' },
    { principle: '페이지 전환', rule: '부드러운 fade 전환. 슬라이드, 모핑 등 복잡한 전환 지양' },
    { principle: 'Hover 피드백', rule: '클릭 가능한 요소에만 hover 상태. cursor: pointer + subtle 변화' },
    { principle: 'prefers-reduced-motion', rule: '접근성 필수 대응. 모션 비활성화 시 즉시 표시' },
  ],
  feedbackStates: [
    { principle: '로딩', rule: '콘텐츠 영역에 skeleton UI. 전역 스피너 사용 금지' },
    { principle: '빈 상태', rule: '데이터가 없는 경우 명확한 빈 상태 메시지' },
    { principle: '에러', rule: '인라인 에러 메시지. 모달 에러 다이얼로그 사용 금지' },
    { principle: '외부 링크', rule: '외부로 나가는 링크는 새 탭. 플랫폼 내 이동은 같은 탭' },
  ],
  accessibility: [
    { principle: '키보드 내비게이션', rule: '모든 인터랙티브 요소에 focus 상태. Tab 순서가 시각적 순서와 일치' },
    { principle: '색상 대비', rule: 'WCAG AA 기준 충족 (일반 텍스트 4.5:1, 대형 텍스트 3:1)' },
    { principle: '이미지 대체 텍스트', rule: '장식 이미지 외 모든 이미지에 alt 텍스트' },
    { principle: '시맨틱 마크업', rule: 'heading 계층 (h1 → h2 → h3) 순서 유지. landmark role 사용' },
  ],
};

// ============================================================
// 7. 반복 컴포넌트 패턴
// ============================================================

export const REPEATING_PATTERNS = [
  { pattern: '섹션 + 제목 + 설명', pages: '모든 페이지', description: '섹션 단위 레이아웃의 기본 블록' },
  { pattern: '카드', pages: 'Landing, Course, Experiment', description: '코스 카드, 예제 카드' },
  { pattern: 'CTA 버튼', pages: '모든 페이지', description: 'Primary (Course Detail 유도), Secondary (상세 보기)' },
  { pattern: 'Before/After 비교', pages: 'Landing (How We\'re Different), Experiment Detail', description: '좌우 또는 상하 비교 레이아웃' },
  { pattern: '아코디언/펼침', pages: 'Course Detail (커리큘럼), Dictionary (Taxonomy)', description: '클릭으로 내용 펼침/접기' },
  { pattern: 'Floating CTA', pages: 'Course Detail', description: '스크롤 시 하단 고정 CTA 바' },
  { pattern: '증언 블록', pages: 'Landing (Course Review), Course Detail', description: '증언 인용 + 결과물. Landing은 짧은 핵심, Detail은 상세' },
  { pattern: '커뮤니티 스냅샷', pages: 'Landing', description: '질문, 챌린지, 멤버 반응의 캡처/요약' },
  { pattern: '문제-솔루션 블록', pages: 'Landing (Problem → How We\'re Different)', description: '문제 제시 후 솔루션으로 이어지는 대비 구조' },
  { pattern: '하단 Course 유도', pages: 'Dictionary, Experiment, Story', description: '각 페이지 하단의 Course 전환 블록' },
  { pattern: '인터랙티브 트리', pages: 'Landing (Dictionary Preview), Dictionary', description: '카테고리 → 하위 패턴 → 키워드 구조' },
];

// ============================================================
// 8. 인터랙션 패턴
// ============================================================

export const INTERACTION_PATTERNS = [
  { pattern: '스크롤 진입 애니메이션', pages: '모든 페이지', description: '섹션 진입 시 fade-in + translate' },
  { pattern: '아코디언 토글', pages: 'Course Detail, Dictionary', description: '클릭으로 콘텐츠 영역 확장/축소' },
  { pattern: 'Hover 카드', pages: 'Course, Experiment', description: '카드에 마우스 올리면 subtle elevation 변화' },
  { pattern: 'Floating 요소 show/hide', pages: 'Course Detail', description: '스크롤 위치에 따른 Floating CTA 표시/숨김' },
];

// ============================================================
// 9. 데이터 엔티티
// ============================================================

export const DATA_ENTITIES = [
  { entity: 'Course', fields: 'id, slug, title, subtitle, description, target_audience, duration, price, cohort_status, cohort_number', usedIn: 'Course, Course Detail, Landing' },
  { entity: 'Chapter', fields: 'id, course_id, order, title, description, challenge_description', usedIn: 'Course Detail' },
  { entity: 'Testimonial', fields: 'id, course_id, member_name, member_role, member_persona, quote, quote_short, result_url, result_image', usedIn: 'Landing, Course Detail' },
  { entity: 'CommunityActivity', fields: 'id, type, content_preview, member_name, timestamp', usedIn: 'Landing' },
  { entity: 'DictionaryCategory', fields: 'id, name, order, parent_id', usedIn: 'Dictionary' },
  { entity: 'DictionaryEntry', fields: 'id, category_id, term, description, related_terms', usedIn: 'Dictionary (Phase 2)' },
  { entity: 'Experiment', fields: 'id, slug, title, description, thumbnail', usedIn: 'Experiment' },
  { entity: 'ExperimentDetail', fields: 'id, experiment_id, before_prompt, before_result, after_prompt, after_result, explanation', usedIn: 'Experiment Detail' },
];

// ============================================================
// 10. 핵심 가치 ↔ 화면 매핑
// ============================================================

export const VALUE_MAP = [
  { value: '혼자 듣는 강의가 아니라 함께 만드는 학습', landingTouchpoint: 'How We\'re Different, Community Snapshot', otherTouchpoints: 'Course (학습 방식 소개), Course Detail (학습 환경 미리보기)' },
  { value: '도구가 바뀌어도 남는 것을 배운다', landingTouchpoint: 'Dictionary Preview', otherTouchpoints: 'Dictionary, Course Detail (커리큘럼)' },
  { value: '"감이 아니라 설계"를 직접 체감', landingTouchpoint: '사이트 자체의 정밀함, Problem → Solution 구조', otherTouchpoints: 'Brand Experiment (Before/After)' },
  { value: '멤버의 성장이 플랫폼의 성장', landingTouchpoint: 'Course Review, Community Snapshot', otherTouchpoints: 'Course Detail (멤버 증언)' },
];

// ============================================================
// 11. 메시지 톤
// ============================================================

export const MESSAGE_TONE = [
  { axis: '단정', rule: '"~할 수 있습니다" 금지. "~입니다", "~한다"', example: '❌ 도움이 될 수 있습니다 → ✅ 달라집니다' },
  { axis: '구체', rule: '추상 형용사 대신 키워드·수치', example: '❌ 혁신적인 교육 → ✅ 8주, 챕터별 챌린지, 동료 피드백' },
  { axis: '절제', rule: '느낌표 최소. 감탄사 금지. 문장 하나가 하나만 말한다', example: '❌ 정말 놀라운 변화! → ✅ Before/After 차이를 보세요' },
  { axis: '독립', rule: '"XX 추천", "YY 선정" 등 외부 권위 인용 금지. 자체 증거로 말한다', example: '❌ 전문가들이 추천하는 → ✅ 직접 해보면 압니다' },
  { axis: '본질', rule: '"최신 AI 도구" 대신 "도구가 바뀌어도 남는 것"', example: '❌ 2026년 핫한 AI 도구 → ✅ 도구가 바뀌어도 남는 것' },
];

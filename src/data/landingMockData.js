/**
 * Landing 페이지 목 데이터
 *
 * Phase 1 정적 데이터. 실제 Supabase 연동 전까지 사용.
 * 출처: contents.md, ux-flow.md의 Landing 섹션 정의
 */

// ============================================================
// 코스 카드 (1개 — Vibe Design Starter Kit)
// ============================================================

export const COURSES = [
  {
    slug: 'vibe-design-starter-kit',
    title: 'Vibe Design Starter Kit',
    subtitle: '디자인 사고로 제품을 설계하는 바이브 코딩',
    target: '프로덕트 디자이너 · 프론트엔드 개발자',
    duration: '8주',
    chapters: 4,
    cohortStatus: 'recruiting',
    cohortNumber: 1,
  },
];

/** @deprecated COURSES를 사용하세요 */
export const MOCK_COURSES = COURSES;

// ============================================================
// 멤버 후기 (3개 — 페르소나별 1명)
// ============================================================

export const MOCK_TESTIMONIALS = [
  {
    id: 'testimonial-1',
    quote: '디자인 시스템이라는 말은 들어봤지만, 언어로 설계하는 경험은 처음이었다. 토큰 하나를 정하는 데 이렇게 많은 결정이 들어가는지 몰랐다.',
    quoteShort: '언어로 설계하는 경험은 처음이었다',
    memberName: '김지원',
    memberRole: 'UX 디자이너 · 5년차',
    memberPersona: 'canvasDesigner',
  },
  {
    id: 'testimonial-2',
    quote: '기획서 대신 프로토타입을 들고 회의에 들어갔다. 설득이 아니라 증명으로 일하는 게 이런 거구나.',
    quoteShort: '설득이 아니라 증명으로 일한다',
    memberName: '박서진',
    memberRole: 'PM · 4년차',
    memberPersona: 'sandwichPM',
  },
  {
    id: 'testimonial-3',
    quote: '간격이 어색한 건 알았는데 왜 어색한지 설명을 못 했다. 디자인 언어를 배우니까 기준이 생겼다.',
    quoteShort: '기준이 생기면 판단이 된다',
    memberName: '이현우',
    memberRole: 'FE 개발자 · 3년차',
    memberPersona: 'pipelineDev',
  },
];

// ============================================================
// 커뮤니티 활동 (4개)
// ============================================================

export const MOCK_COMMUNITY = [
  {
    id: 'activity-1',
    type: 'question',
    contentPreview: '간격을 8px 단위로 쓰는데, 12px가 필요한 경우는 어떻게 처리하나요?',
    memberName: '최예린',
    courseName: '바이브 코딩 입문',
    timestamp: '2분 전',
  },
  {
    id: 'activity-2',
    type: 'challenge',
    contentPreview: '챕터 4 챌린지 — 색상 토큰 위계 설계 결과물 공유합니다',
    memberName: '한도윤',
    courseName: '디자인 시스템 언어',
    timestamp: '1시간 전',
  },
  {
    id: 'activity-3',
    type: 'feedback',
    contentPreview: '토큰 네이밍 컨벤션이 일관적이에요. primary 계열 분리가 깔끔합니다.',
    memberName: '정서아',
    courseName: '바이브 코딩 입문',
    timestamp: '3시간 전',
  },
  {
    id: 'activity-4',
    type: 'question',
    contentPreview: '반응형에서 타이포 스케일을 clamp로 처리하는 기준이 궁금합니다',
    memberName: '오민재',
    courseName: '디자인 시스템 언어',
    timestamp: '5시간 전',
  },
];

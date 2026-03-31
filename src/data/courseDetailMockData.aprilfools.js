/**
 * 만우절 특집 — Sam Altman 코스 리드 데이터
 *
 * 원본: courseDetailMockData.js (INSTRUCTOR_PROFILE)
 * 복원: import를 courseDetailMockData.js로 되돌리면 끝.
 */

export const INSTRUCTOR_PROFILE = {
  name: 'Sam Altman',
  imageSrc: '/assets/lead/altman-profile-v2-1.jpg',
  titles: [
    'OpenAI CEO',
    'Former Y Combinator President',
    'Worldcoin Co-founder',
    'Vibe Design Lab 특별 초빙 강사',
  ],
  projects: [
    { year: '2025', title: 'GPT-5 — "진짜 이번엔 AGI 됩니다" 프로젝트 총괄' },
    { year: '2024', title: 'Sora — 텍스트-투-비디오 모델 공개, "디자이너 일자리는 안전합니다" 발언' },
    { year: '2024', title: 'GPT-4o — 옴니모달 모델 런칭, 실시간 음성 대화 데모' },
    { year: '2023', title: 'GPT-4 출시 — "이제 코딩 안 해도 됩니다" 선언' },
    { year: '2023', title: 'OpenAI 이사회 해임 & 5일 만에 복귀 — 실리콘밸리 최고의 시즌 피날레' },
    { year: '2022', title: 'ChatGPT 출시 — 2개월 만에 1억 사용자, 바이브 코딩의 서막' },
    { year: '2021', title: 'DALL·E 공개 — "디자이너분들 긴장하세요" (본인 부인)' },
    { year: '2019', title: 'OpenAI CEO 취임 — 비영리에서 수십조 기업으로의 여정 시작' },
    { year: '2014', title: 'Y Combinator 대표 취임 — Airbnb, Stripe, Dropbox 배출' },
    { year: '2005', title: 'Loopt 창업 (위치 기반 소셜) — 스탠포드 중퇴의 정석' },
  ],
  portfolio: [
    { title: 'ChatGPT', category: 'AI 챗봇' },
    { title: 'GPT-4o', category: '옴니모달 AI' },
    { title: 'DALL·E 3', category: 'AI 이미지 생성' },
    { title: 'Sora', category: 'AI 비디오 생성' },
    { title: 'Codex / Copilot 영감', category: 'AI 코딩' },
    { title: 'Worldcoin', category: '홍채 스캔 크립토' },
    { title: 'Y Combinator 리더십', category: '스타트업 액셀러레이터' },
    { title: 'OpenAI DevDay', category: '개발자 컨퍼런스' },
    { title: 'Vibe Design Lab 특강', category: '만우절 한정 콘텐츠' },
  ],
};

/** 만우절용 courseLead 텍스트 오버라이드 */
export const COURSE_LEAD_LANDING = {
  label: 'Course Lead',
  name: 'Sam Altman',
  role: 'OpenAI CEO & 바이브 코딩 전도사',
  description: 'AGI를 만들겠다고 했더니 바이브 코딩 강사가 되어 있었습니다. 디자이너 여러분의 일자리는 안전합니다. (아마도)',
  credentials: [
    'OpenAI CEO',
    'Vibe Design Lab 특별 초빙 강사',
  ],
};

export const COURSE_LEAD_DETAIL = {
  dividerLabel: 'Course Lead',
  headline: '실리콘밸리에서 날아온 특별 강사를 소개합니다.',
  statement: 'AI가 세상을 바꾸고 있다면, 그 AI를 만든 사람이 직접 바이브 코딩을 가르치면 어떨까요? Sam Altman이 디자이너를 위한 AI 활용법을 전수합니다.',
  projectsLabel: '대표 프로젝트',
};

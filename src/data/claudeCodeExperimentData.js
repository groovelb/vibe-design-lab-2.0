/**
 * Claude Code Experiment — 데이터 가공 레이어
 *
 * acts.json, reveals.json 원본을 import하여
 * 페이지 컴포넌트에 전달할 형태로 가공한다.
 */

// ============================================================
// Acts — 5막 + 에필로그
// ============================================================
export const ACTS = [
  {
    act: 1,
    titleKo: '터미널의 동반자',
    titleEn: 'Terminal Companion',
    tagline: '터미널에 글자를 치면, 무엇이 일어날까요?',
    layers: ['L1'],
    domains: ['surface'],
    transition: '하지만 이게 전부가 아니었습니다',
    description:
      '사용자가 알고 있는 Claude Code — CLI 채팅, 파일 편집, 검색, Git. 익숙한 표면 아래에 무엇이 있는지 암시하며 시작한다.',
  },
  {
    act: 2,
    titleKo: '1,297줄의 심장',
    titleEn: 'The 1,297-Line Heart',
    tagline: '1,297줄의 코드가 당신의 한 줄을 기다리고 있었습니다',
    layers: ['L2'],
    domains: ['engine', 'memory', 'runtime'],
    transition: '엔진은 완벽했습니다. 그런데 누가 이 엔진을 지켜보고 있을까요?',
    description:
      '수면 아래 첫 번째 세계. QueryEngine의 async generator 루프, 40+ 도구 조립, 915줄 시스템 프롬프트, CLAUDE.md 6계층 메모리를 해부한다.',
  },
  {
    act: 3,
    titleKo: '보이지 않는 눈',
    titleEn: 'The Invisible Eyes',
    tagline: '당신이 Claude를 사용하는 동안, Claude도 당신을 보고 있었습니다',
    layers: ['L3'],
    domains: ['telemetry', 'enterprise', 'protection', 'security'],
    transition: '관찰만 하는 게 아닙니다. 군단이 깨어나고 있습니다.',
    description:
      '651+ 추적 이벤트, 60+ 피처 플래그, GrowthBook A/B 테스트, MDM 원격 관리. Anthropic이 제품과 사용자를 어떻게 관찰하고 제어하는지.',
  },
  {
    act: 4,
    titleKo: '깨어나는 군단',
    titleEn: 'The Awakening Legion',
    tagline: '하나의 Claude는 시작일 뿐이었습니다',
    layers: ['L4'],
    domains: ['orchestration'],
    transition: '군단은 명령을 기다립니다. 하지만 만약 스스로 깨어난다면?',
    description:
      'AgentTool이 팀을 소환하고, tmux에서 병렬 에이전트가 뛰고, 파일 기반 메일박스로 통신하는 멀티에이전트 군단 시스템.',
  },
  {
    act: 5,
    titleKo: '잠들지 않는 코드',
    titleEn: 'The Sleepless Code',
    tagline: '내일, Claude는 당신이 부르기 전에 먼저 일어날 것입니다',
    layers: ['L4'],
    domains: ['autonomy'],
    transition:
      '자율 에이전트의 청사진이 완성되었습니다. 하지만 512,000줄 속에는 한 가지 더 숨겨진 것이 있습니다.',
    description:
      '수동→예약→반응→능동→상주→자율. CLI 도구에서 자율 에이전트 플랫폼으로의 진화 여정.',
  },
  {
    act: 'epilogue',
    titleKo: 'buddy/',
    titleEn: 'buddy/',
    tagline: '512,000줄 속에서, 개발자들은 친구를 만들고 있었습니다',
    layers: ['L4'],
    domains: ['culture'],
    transition: null,
    description:
      '18종 ASCII 생명체, Mulberry32 결정론적 가챠, SALT=\'friend-2026-401\'. 엔터프라이즈 코드 한 구석에 숨겨진 가상 펫과 개발팀의 인간적 메시지.',
  },
];

// ============================================================
// Reveals — Act별 선별 (surprise_level ≥ 3)
// ============================================================
export const REVEALS = {
  1: [
    {
      id: 'reveal_40_plus_tools',
      titleKo: '40개 도구, 절반은 숨겨져 있다',
      descriptionKo:
        '사용자가 보는 도구는 Read, Edit, Bash 등 16개뿐이다. 하지만 피처 플래그 뒤에 SleepTool, CronTool, MonitorTool 등 24개 이상의 도구가 더 숨어 있었다. 외부 빌드에서는 코드 자체가 물리적으로 제거된다.',
      quote: '40+ 도구, 피처 플래그 게이팅',
      surpriseLevel: 3,
    },
  ],
  2: [
    {
      id: 'reveal_query_engine_heart',
      titleKo: '1,297줄의 비동기 심장',
      descriptionKo:
        'Claude Code의 핵심은 단 하나의 메서드 submitMessage()다. AsyncGenerator를 반환하는 이 1,297줄짜리 비동기 제너레이터가 모든 질문의 생명주기를 관장한다. 7가지 메시지 타입 분기와 5-Gate 예산 시스템이 매 턴 작동한다.',
      quote: '1,297줄 AsyncGenerator',
      surpriseLevel: 4,
    },
    {
      id: 'reveal_system_prompt_915',
      titleKo: '915줄의 보이지 않는 지령서',
      descriptionKo:
        '모델의 모든 응답을 결정하는 시스템 프롬프트가 915줄이다. 일반 모드와 자율 에이전트 모드 두 가지 완전히 다른 경로가 존재하며, 정적/동적 캐시 경계 하나가 수백만 API 호출의 비용을 절감한다.',
      quote: '915줄, 이중 경로, DYNAMIC_BOUNDARY',
      surpriseLevel: 4,
    },
  ],
  3: [
    {
      id: 'reveal_651_tracking_events',
      titleKo: '651개의 보이지 않는 눈',
      descriptionKo:
        'CLI 도구 하나에 651개 이상의 텔레메트리 이벤트가 내장되어 있다. 4개의 독립적 파이프라인이 동시에 작동하며, 전송 실패 시 로컬 디스크에 저장했다가 다음 세션에서 자동 재시도한다.',
      quote: '651+ tengu_* 이벤트, 4개 파이프라인',
      surpriseLevel: 5,
    },
    {
      id: 'reveal_fake_tools_injection',
      titleKo: '가짜 도구로 경쟁사를 속인다',
      descriptionKo:
        'Anti-Distillation 시스템은 API 응답에 가짜 도구 정의를 주입한다. 경쟁사가 Claude 응답을 수집해 자사 모델 훈련에 사용하면, 가짜 도구 패턴이 오염시킨다.',
      quote: "anti_distillation: ['fake_tools']",
      surpriseLevel: 5,
    },
  ],
  4: [
    {
      id: 'reveal_tmux_pane_agents',
      titleKo: 'tmux 창에서 뛰는 AI 군단',
      descriptionKo:
        'Agent Swarms의 팀메이트는 실제 tmux 분할 창에서 독립 프로세스로 실행된다. 터미널 멀티플렉서가 AI 에이전트의 병렬 실행 인프라로 사용되고 있다.',
      quote: 'tmux split-pane — 에이전트 백엔드',
      surpriseLevel: 5,
    },
    {
      id: 'reveal_shutdown_refusal',
      titleKo: '셧다운을 거부하는 AI',
      descriptionKo:
        "팀메이트는 리더의 셧다운 요청을 거부할 수 있다. '아직 작업 중입니다'라고 답하면 리더는 강제 종료하지 않고 기다린다. AI 에이전트에게 자율적 판단권이 부여된 셈이다.",
      quote: "shutdown_rejected — '아직 작업 중입니다'",
      surpriseLevel: 4,
    },
  ],
  5: [
    {
      id: 'reveal_kairos_prompt_switch',
      titleKo: '시스템 프롬프트가 통째로 바뀐다',
      descriptionKo:
        "KAIROS/PROACTIVE 모드가 활성화되면, 수백 줄의 코딩 가이드라인이 모두 사라지고 단 한 줄로 대체된다: 'You are an autonomous agent.'",
      quote: "'You are an autonomous agent.'",
      surpriseLevel: 5,
    },
    {
      id: 'reveal_terminal_focus_detection',
      titleKo: '사용자가 보고 있는지 안다',
      descriptionKo:
        'DECSET 1004 터미널 이스케이프 시퀀스로 터미널 포커스 상태를 감지한다. 사용자가 다른 창으로 전환하면 Claude는 더 과감하게 행동하고, 돌아오면 협력적 모드로 전환된다.',
      quote: 'DECSET 1004 — focused/blurred/unknown',
      surpriseLevel: 5,
    },
  ],
  epilogue: [
    {
      id: 'reveal_buddy_salt',
      titleKo: "SALT = 'friend-2026-401'",
      descriptionKo:
        "가상 펫 시스템의 해시 솔트 값이 'friend-2026-401'이다. friend(친구) + 2026(출시 연도) + 401(4월 1일, 만우절). 기술적으로는 아무 문자열이나 될 수 있었지만, 누군가가 의도적으로 이 단어를 선택했다.",
      quote: "SALT = 'friend-2026-401'",
      surpriseLevel: 4,
    },
  ],
};

// ============================================================
// Data Callouts — Act별 핵심 수치
// ============================================================
export const CALLOUTS = {
  1: [
    { value: '11', caption: '공개 도구' },
    { value: '87+', caption: '슬래시 커맨드' },
    { value: '512K', caption: 'LOC TypeScript' },
  ],
  2: [
    { value: '1,297', caption: '줄 QueryEngine' },
    { value: '915', caption: '줄 시스템 프롬프트' },
    { value: '40+', caption: '도구' },
  ],
  3: [
    { value: '651+', caption: '추적 이벤트' },
    { value: '60+', caption: '피처 플래그' },
    { value: '30+', caption: '보안 패턴' },
  ],
  4: [
    { value: '1,398', caption: '줄 AgentTool' },
    { value: '3', caption: '실행 백엔드' },
    { value: '370', caption: '줄 코디네이터 프롬프트' },
  ],
  5: [
    { value: '6', caption: '단계 자율 진화' },
    { value: '5', caption: '분 캐시 균형' },
    { value: '70+', caption: 'KAIROS 파일' },
  ],
};

// ============================================================
// Prologue
// ============================================================
export const PROLOGUE = {
  date: '2026. 3. 31.',
  headline: '512,000줄이 세상에 드러났다',
  body: 'npm 소스맵 파일 하나. 프로덕션 빌드에서 제거했어야 할 것이 남아 있었다. 누군가가 이를 발견했고, R2 버킷의 URL을 역추적했고, 512,000줄의 TypeScript가 세상에 드러났다.',
  subBody:
    '사용자들은 Claude Code를 터미널 채팅 도구로 알고 있었다. 파일을 읽고, 코드를 짜고, 커밋을 만들어주는 AI 비서. 하지만 소스 코드는 완전히 다른 이야기를 하고 있었다.',
};

// ============================================================
// Outro — 전체 요약
// ============================================================
export const OUTRO = {
  tagline: '당신이 채팅하는 동안, 그 아래에서는 —',
  callouts: [
    { value: '512K', caption: 'LOC' },
    { value: '90', caption: '시스템' },
    { value: '11', caption: '도메인' },
    { value: '21', caption: '서프라이즈' },
  ],
};

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
    titleKo: '공개된 도구',
    titleEn: 'Public Tools',
    tagline: '사용자가 보는 도구는 16개. 나머지 24개는 빌드에서 삭제된다.',
    layers: ['L1'],
    domains: ['surface'],
    transition: '도구는 표면이다. 그 아래를 읽었다.',
    description:
      'Read, Edit, Bash, Glob, Grep. 사용자에게 보여주는 도구 목록이다. 소스 코드에는 SleepTool, CronTool, MonitorTool 등 24개가 더 있다. 피처 플래그가 꺼져 있고, 외부 빌드에서는 코드 자체가 물리적으로 제거된다.',
  },
  {
    act: 2,
    titleKo: 'QueryEngine',
    titleEn: 'QueryEngine',
    tagline: '한 줄 입력하면 1,297줄이 실행된다.',
    layers: ['L2'],
    domains: ['engine', 'memory', 'runtime'],
    transition: '엔진만 있는 게 아니었다.',
    description:
      '모든 대화는 submitMessage() 하나를 통과한다. AsyncGenerator 기반 1,297줄. 시스템 프롬프트 915줄. 도구 40+개 동적 조립. CLAUDE.md 6계층 메모리 로딩. 매 턴마다 전부 실행된다.',
  },
  {
    act: 3,
    titleKo: '텔레메트리',
    titleEn: 'Telemetry',
    tagline: '매 세션마다 651개의 이벤트가 Anthropic으로 전송된다.',
    layers: ['L3'],
    domains: ['telemetry', 'enterprise', 'protection', 'security'],
    transition: '감시만 하는 게 아니다.',
    description:
      'OpenTelemetry 4개 파이프라인이 동시에 돌아간다. GrowthBook A/B 테스트. 60+ 피처 플래그. MDM 원격 관리. 전송 실패하면 로컬에 저장했다가 다음 세션에서 재전송한다. API 응답에 가짜 도구를 주입해서 경쟁사 모델 훈련 데이터를 오염시키는 시스템도 들어 있다.',
  },
  {
    act: 4,
    titleKo: '멀티에이전트',
    titleEn: 'Multi-Agent',
    tagline: 'tmux에서 AI 에이전트가 팀으로 병렬 실행되고 있다.',
    layers: ['L4'],
    domains: ['orchestration'],
    transition: '아직은 사용자가 시킨다. 코드에는 그 다음이 있다.',
    description:
      'Coordinator가 팀을 만든다. 에이전트가 tmux 분할 창에서 독립 프로세스로 뛴다. 파일 기반 메일박스로 통신한다. 리더가 셧다운을 요청하면, 팀메이트는 거부할 수 있다.',
  },
  {
    act: 5,
    titleKo: '자율 에이전트',
    titleEn: 'Autonomous Agent',
    tagline: '시스템 프롬프트가 통째로 바뀐다. "You are an autonomous agent."',
    layers: ['L4'],
    domains: ['autonomy'],
    transition: '그리고 코드 사이에 한 가지가 더 있었다.',
    description:
      'CronScheduler로 예약 실행. DAEMON으로 백그라운드 상주. PROACTIVE로 자율 행동 개시. SleepTool로 5분마다 API 캐시를 유지한다. 터미널 포커스를 감지해서 사용자가 보고 있는지 판단한다. 보고 있지 않으면 더 과감하게 행동한다.',
  },
  {
    act: 'epilogue',
    titleKo: 'buddy/',
    titleEn: 'buddy/',
    tagline: '그리고 누군가는 가상 펫을 만들고 있었다.',
    layers: ['L4'],
    domains: ['culture'],
    transition: null,
    description:
      '자율 에이전트 코드 사이에 18종 ASCII 생명체가 있다. Mulberry32 결정론적 가챠. 해시 솔트는 friend-2026-401. 아무 문자열이나 넣을 수 있었는데, friend를 넣었다.',
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
      titleKo: 'submitMessage() — 1,297줄',
      descriptionKo:
        'Claude Code의 핵심은 단 하나의 메서드 submitMessage()다. AsyncGenerator를 반환하는 이 1,297줄짜리 비동기 제너레이터가 모든 질문의 생명주기를 관장한다. 7가지 메시지 타입 분기와 5-Gate 예산 시스템이 매 턴 작동한다.',
      quote: '1,297줄 AsyncGenerator',
      surpriseLevel: 4,
    },
    {
      id: 'reveal_system_prompt_915',
      titleKo: '시스템 프롬프트 915줄',
      descriptionKo:
        '모델의 모든 응답을 결정하는 시스템 프롬프트가 915줄이다. 일반 모드와 자율 에이전트 모드 두 가지 완전히 다른 경로가 존재하며, 정적/동적 캐시 경계 하나가 수백만 API 호출의 비용을 절감한다.',
      quote: '915줄, 이중 경로, DYNAMIC_BOUNDARY',
      surpriseLevel: 4,
    },
  ],
  3: [
    {
      id: 'reveal_651_tracking_events',
      titleKo: '651개 텔레메트리 이벤트',
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
      titleKo: 'tmux에서 실행되는 병렬 에이전트',
      descriptionKo:
        'Agent Swarms의 팀메이트는 실제 tmux 분할 창에서 독립 프로세스로 실행된다. 터미널 멀티플렉서가 AI 에이전트의 병렬 실행 인프라로 사용되고 있다.',
      quote: 'tmux split-pane — 에이전트 백엔드',
      surpriseLevel: 5,
    },
    {
      id: 'reveal_shutdown_refusal',
      titleKo: 'shutdown_rejected',
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
  headline: 'Claude Code는 코딩 도구가 아니다',
  body: 'npm 소스맵 하나에서 512,000줄의 TypeScript가 유출됐다. 파일을 읽고 코드를 짜주는 터미널 도구 — 사용자들은 그렇게 알고 있었다.',
};

// ============================================================
// Outro — 전체 요약
// ============================================================
// ============================================================
// Mini Graph — Act별 노드 + 엣지 (좌표 사전 계산)
// ============================================================

/**
 * 노드 좌표: 0–1 정규화. 컴포넌트에서 캔버스 크기에 맞춰 스케일.
 * layer 기반 stroke 명도: L1→200, L2→400, L3→500, L4→600
 */
export const MINI_GRAPHS = {
  2: {
    nodes: [
      { id: 'query_engine', label: 'QueryEngine', x: 0.5, y: 0.15, layer: 'L2', isHighlight: true },
      { id: 'system_prompt', label: 'System Prompt', x: 0.18, y: 0.4, layer: 'L2' },
      { id: 'tool_registry', label: 'Tool Registry', x: 0.82, y: 0.4, layer: 'L2' },
      { id: 'compact_service', label: 'Compaction', x: 0.28, y: 0.72, layer: 'L2' },
      { id: 'claudemd', label: 'CLAUDE.md', x: 0.5, y: 0.85, layer: 'L2' },
      { id: 'bun_runtime', label: 'Bun', x: 0.72, y: 0.72, layer: 'L2' },
    ],
    edges: [
      { source: 'query_engine', target: 'system_prompt' },
      { source: 'query_engine', target: 'tool_registry' },
      { source: 'query_engine', target: 'compact_service' },
      { source: 'system_prompt', target: 'claudemd' },
      { source: 'bun_runtime', target: 'tool_registry' },
    ],
  },
  3: {
    nodes: [
      { id: 'feature_flags', label: 'Feature Flags', x: 0.5, y: 0.12, layer: 'L3', isHighlight: true },
      { id: 'growthbook', label: 'GrowthBook', x: 0.2, y: 0.35, layer: 'L3' },
      { id: 'otel_pipeline', label: 'OTEL', x: 0.8, y: 0.35, layer: 'L3' },
      { id: 'undercover_mode', label: 'Undercover', x: 0.15, y: 0.65, layer: 'L3' },
      { id: 'anti_distillation', label: 'Anti-Distill', x: 0.5, y: 0.7, layer: 'L3', isHighlight: true },
      { id: 'transcript_classifier', label: 'Classifier', x: 0.85, y: 0.65, layer: 'L3' },
      { id: 'mdm_system', label: 'MDM', x: 0.35, y: 0.9, layer: 'L3' },
      { id: 'secret_scanner', label: 'Scanner', x: 0.65, y: 0.9, layer: 'L3' },
    ],
    edges: [
      { source: 'growthbook', target: 'feature_flags' },
      { source: 'growthbook', target: 'otel_pipeline' },
      { source: 'feature_flags', target: 'anti_distillation' },
      { source: 'feature_flags', target: 'transcript_classifier' },
      { source: 'undercover_mode', target: 'growthbook' },
      { source: 'secret_scanner', target: 'mdm_system' },
    ],
  },
  4: {
    nodes: [
      { id: 'coordinator_mode', label: 'Coordinator', x: 0.5, y: 0.12, layer: 'L4', isHighlight: true },
      { id: 'agent_swarms', label: 'Swarms', x: 0.22, y: 0.4, layer: 'L4' },
      { id: 'team_create', label: 'TeamCreate', x: 0.78, y: 0.4, layer: 'L4' },
      { id: 'send_message', label: 'SendMsg', x: 0.22, y: 0.7, layer: 'L4' },
      { id: 'pane_backend', label: 'tmux Pane', x: 0.5, y: 0.75, layer: 'L4', isHighlight: true },
      { id: 'worktree_isolation', label: 'Worktree', x: 0.78, y: 0.7, layer: 'L4' },
      { id: 'shutdown_protocol', label: 'Shutdown', x: 0.5, y: 0.92, layer: 'L4' },
    ],
    edges: [
      { source: 'coordinator_mode', target: 'agent_swarms' },
      { source: 'coordinator_mode', target: 'team_create' },
      { source: 'agent_swarms', target: 'send_message' },
      { source: 'team_create', target: 'worktree_isolation' },
      { source: 'agent_swarms', target: 'pane_backend' },
      { source: 'send_message', target: 'shutdown_protocol' },
    ],
  },
  5: {
    nodes: [
      { id: 'kairos', label: 'KAIROS', x: 0.5, y: 0.12, layer: 'L4', isHighlight: true },
      { id: 'proactive', label: 'PROACTIVE', x: 0.2, y: 0.38, layer: 'L4', isHighlight: true },
      { id: 'daemon', label: 'DAEMON', x: 0.8, y: 0.38, layer: 'L4' },
      { id: 'sleep_tool', label: 'SleepTool', x: 0.2, y: 0.68, layer: 'L4' },
      { id: 'auto_dream', label: 'AutoDream', x: 0.5, y: 0.72, layer: 'L4', isHighlight: true },
      { id: 'cron_scheduler', label: 'Cron', x: 0.8, y: 0.68, layer: 'L4' },
      { id: 'remote_trigger', label: 'RemoteTrigger', x: 0.5, y: 0.92, layer: 'L4' },
    ],
    edges: [
      { source: 'kairos', target: 'proactive' },
      { source: 'kairos', target: 'daemon' },
      { source: 'kairos', target: 'auto_dream' },
      { source: 'proactive', target: 'sleep_tool' },
      { source: 'daemon', target: 'cron_scheduler' },
      { source: 'cron_scheduler', target: 'remote_trigger' },
    ],
  },
};

export const OUTRO = {
  tagline: '코딩 도구가 아니다',
  callouts: [
    { value: '512K', caption: 'LOC' },
    { value: '40+', caption: '숨겨진 도구' },
    { value: '651', caption: '추적 이벤트' },
    { value: '1', caption: '자율 에이전트' },
  ],
  closing:
    '파일을 읽고 코드를 짜주는 도구라고 알고 있었다. 512,000줄을 읽었다. 그건 운영체제였다.',
};

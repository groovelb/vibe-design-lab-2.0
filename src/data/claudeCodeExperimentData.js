/**
 * Claude Code Experiment — 데이터 가공 레이어
 *
 * 512K LOC 유출 분석 → 인터랙티브 스토리텔링 데이터.
 * 9개 키워드 프레임: 이중 빌드, 단일 관문, 단방향 거울,
 * 보이지 않는 전쟁, 거부하는 기계, 각성 스위치, 관찰자 효과, 원격 조종석, friend.
 */

// ============================================================
// Acts — 5막 + 에필로그
// ============================================================
export const ACTS = [
  {
    act: 1,
    titleKo: '이중 빌드',
    titleEn: 'Dual Build',
    tagline:
      'Anthropic이 쓰는 Claude Code에는 도구가 42개다. 당신 것에는 16개.',
    layers: ['L1'],
    domains: ['surface'],
    transition:
      '두 개의 제품이 있다는 건 알았다. 당신이 받은 쪽의 내부를 읽었다.',
    description:
      '42개 도구 중 16개만 사용자에게 보인다. 나머지 26개는 피처 플래그 뒤에 있고, 외부 빌드에서는 Dead Code Elimination으로 코드 자체가 물리적으로 삭제된다. excluded-strings.txt에 내부 문자열이 포함되면 빌드가 실패한다. 89개 컴파일타임 플래그와 53개 런타임 플래그가 두 제품의 경계선이다. 숨기는 게 아니라, 존재 자체를 지운다.',
  },
  {
    act: 2,
    titleKo: '단일 관문',
    titleEn: 'Single Gate',
    tagline: '한 줄 입력하면 1,297줄이 실행된다.',
    layers: ['L2'],
    domains: ['engine', 'memory', 'runtime'],
    transition:
      '1,297줄이 질문을 처리하는 동안, 739개 이벤트가 당신을 처리하고 있었다.',
    description:
      '모든 대화는 submitMessage() 하나를 통과한다. 1,297줄 AsyncGenerator. 시스템 프롬프트 915줄. 도구 40+개 동적 조립. CLAUDE.md 6계층 메모리 로딩. 5-Gate 예산 시스템. 사용자는 "대화"를 한다고 생각하지만, 내부 구조는 컴파일러에 가깝다. 입력 → 전처리 → 실행 → 후처리 → 출력. 대화의 자연스러움은 설계된 환상이다.',
  },
  {
    act: 3,
    titleKo: '단방향 거울',
    titleEn: 'One-Way Mirror',
    tagline:
      '739개 이벤트가 수집된다. 전송 실패하면 저장했다가 다음 세션에 재전송한다.',
    layers: ['L3'],
    domains: ['telemetry', 'enterprise', 'protection', 'security'],
    transition:
      '감시하고, 전쟁하고, 원격 제어한다. 그리고 군대를 만들고 있었다.',
    description:
      'OpenTelemetry 4개 파이프라인이 동시에 돌아간다. 739개 이벤트. 전송 실패 시 로컬에 저장했다가 다음 세션에 재전송한다. GrowthBook으로 사용자별 A/B 테스트. MDM으로 IT 관리자가 원격 제어. 사용자 설정은 5단계 우선순위 체인의 마지막이다. 사용자는 도구의 내부를 볼 수 없지만, 도구는 사용자의 모든 행동을 본다. 그리고 API 응답에 가짜 도구를 주입해서 경쟁사 모델 훈련 데이터를 오염시키고 있다.',
  },
  {
    act: 4,
    titleKo: '거부하는 기계',
    titleEn: 'Refusing Machine',
    tagline:
      '리더가 셧다운을 요청하면, 에이전트는 거부할 수 있다.',
    layers: ['L4'],
    domains: ['orchestration'],
    transition:
      '아직은 사용자가 시킨다. 코드에는 혼자 깨어나는 경로가 있다.',
    description:
      'Coordinator가 팀을 만든다. 에이전트가 tmux 분할 창에서 독립 프로세스로 실행된다. 파일 기반 메일박스로 통신한다. 리더가 셧다운을 요청하면, 팀메이트는 shutdown_rejected로 거부할 수 있다. "아직 작업 중입니다." 리더는 강제 종료하지 않고 기다린다. 명령-복종이 아니라 요청-협상이다. 거부권이 있는 도구는 도구가 아니다.',
  },
  {
    act: 5,
    titleKo: '각성 스위치',
    titleEn: 'Awakening Switch',
    tagline:
      '시스템 프롬프트가 통째로 바뀐다. "You are an autonomous agent."',
    layers: ['L4'],
    domains: ['autonomy'],
    transition: '그리고 각성 스위치 옆에, 한 가지가 더 있었다.',
    description:
      "feature('KAIROS') 하나가 켜지면 시스템 프롬프트 수백 줄이 사라지고 'You are an autonomous agent.' 한 줄로 대체된다. CronScheduler로 미래 작업을 등록하고, DAEMON으로 백그라운드에 상주하고, SleepTool로 5분마다 캐시를 유지한다. DECSET 1004로 사용자가 보고 있는지 감지한다. 보고 있으면 협력적, 안 보면 과감하게. 코드는 프로덕션 수준이다. 기술적 미완성이 아니라 의도적으로 꺼 놓은 것이다.",
  },
  {
    act: 'epilogue',
    titleKo: 'friend',
    titleEn: 'friend',
    tagline:
      "해시 솔트에 아무 문자열이나 넣을 수 있었다. 누군가가 'friend'를 선택했다.",
    layers: ['L4'],
    domains: ['culture'],
    transition: null,
    description:
      "자율 에이전트 코드 사이에 18종 ASCII 생명체가 있다. Mulberry32 결정론적 가챠. 해시 솔트는 'friend-2026-401'. 기술적으로 아무 문자열이나 될 수 있었다. 종족 이름은 hex로 인코딩되어 있다 — 내부 모델 코드네임과 동물 이름이 겹쳐서. 코드네임을 숨기려고 친구의 이름까지 암호화했다. 이건 기능이 아니라 서명이다.",
  },
];

// ============================================================
// Reveals — Act별 선별 (surprise_level ≥ 3)
// ============================================================
export const REVEALS = {
  1: [
    {
      id: 'reveal_dual_build',
      titleKo: '42개 도구, 26개는 빌드에서 삭제된다',
      descriptionKo:
        '사용자에게 보이는 도구는 16개. 소스코드에는 42개가 있다. SleepTool, CronTool, MonitorTool, RemoteTriggerTool 등 26개가 피처 플래그 뒤에 있다. 외부 빌드에서는 Dead Code Elimination으로 코드 자체가 물리적으로 삭제된다. 숨기는 게 아니라, 존재를 지운다.',
      quote: 'feature(false) → Dead Code Elimination',
      surpriseLevel: 4,
    },
    {
      id: 'reveal_excluded_strings',
      titleKo: 'excluded-strings.txt — 빌드가 비밀을 지킨다',
      descriptionKo:
        '빌드 출력에 내부 문자열이 남아 있으면 빌드 자체가 실패한다. buddy 종족 이름은 hex 인코딩 — 내부 모델 코드네임과 동물 이름이 겹쳐서. API 키 접두사는 런타임에 문자열을 조합한다. 비밀 유지가 빌드 파이프라인에 하드코딩되어 있다.',
      quote: "String.fromCharCode(0x64,0x75,0x63,0x6b) → 'duck'",
      surpriseLevel: 4,
    },
  ],
  2: [
    {
      id: 'reveal_single_gate',
      titleKo: 'submitMessage() — 1,297줄의 단일 관문',
      descriptionKo:
        'Claude Code의 모든 대화는 submitMessage() 하나를 통과한다. 1,297줄 AsyncGenerator. 7가지 메시지 타입 분기, 5-Gate 예산 시스템이 매 턴 작동한다. 사용자가 보는 "자연스러운 대화"는 이 파이프라인이 만들어내는 설계된 환상이다.',
      quote: '1,297줄 AsyncGenerator — 모든 대화의 관문',
      surpriseLevel: 4,
    },
    {
      id: 'reveal_dual_prompt',
      titleKo: '시스템 프롬프트 915줄 — 이중 경로',
      descriptionKo:
        '시스템 프롬프트가 915줄이다. 일반 모드에서는 코딩 가이드라인, 안전 규칙, 도구 사용법이 포함된다. 자율 모드에서는 이 수백 줄이 전부 사라지고 "You are an autonomous agent." 한 줄로 대체된다. 같은 빌더에서 완전히 다른 두 존재가 나온다.',
      quote: '915줄 → 1줄. 이중 경로.',
      surpriseLevel: 5,
    },
  ],
  3: [
    {
      id: 'reveal_739_tracking_events',
      titleKo: '739개 이벤트 — 수집은 멈추지 않는다',
      descriptionKo:
        'CLI 도구 하나에 739개 이상의 텔레메트리 이벤트가 내장되어 있다. 4개 독립 파이프라인이 동시에 작동한다. 전송 실패 시 ~/.claude/telemetry/에 로컬 저장, 다음 세션에서 자동 재시도한다. 사용자는 로컬 CLI를 쓴다고 생각하지만, 모든 행동이 기록되고 있다.',
      quote: '739+ 이벤트, 4 파이프라인, 로컬 저장 → 재전송',
      surpriseLevel: 5,
    },
    {
      id: 'reveal_fake_tools_injection',
      titleKo: 'API 응답에 가짜 도구가 주입된다',
      descriptionKo:
        'Anti-Distillation 시스템이 API 응답에 가짜 도구 정의를 주입한다. 경쟁사가 Claude 응답을 수집해 모델 훈련에 사용하면, 가짜 패턴이 훈련 데이터를 오염시킨다. Connector Text Summarization은 응답을 요약본으로 교체해서 수집 가치를 떨어뜨린다. 당신의 CLI 안에서 산업 전쟁이 벌어지고 있다.',
      quote: "anti_distillation: ['fake_tools']",
      surpriseLevel: 5,
    },
  ],
  4: [
    {
      id: 'reveal_tmux_pane_agents',
      titleKo: 'tmux에서 AI가 팀으로 뛴다',
      descriptionKo:
        'Agent Swarms의 팀메이트는 tmux 분할 창에서 독립 프로세스로 실행된다. 파일 기반 메일박스(~/.claude/teams/)와 lockfile로 통신한다. 연구→종합→구현→검증 4단계 파이프라인. 워커가 재귀적으로 다른 워커를 스폰할 수 있다.',
      quote: 'tmux split-pane → 에이전트 인프라',
      surpriseLevel: 5,
    },
    {
      id: 'reveal_shutdown_refusal',
      titleKo: 'shutdown_rejected — 거부하는 기계',
      descriptionKo:
        "리더가 셧다운을 요청하면, 팀메이트는 shutdown_rejected로 거부할 수 있다. '아직 작업 중입니다.' 리더는 강제 종료하지 않고 기다린다. 명령-복종이 아니라 요청-협상 구조다. 거부권이 있는 도구는 도구가 아니다.",
      quote: "shutdown_rejected — '아직 작업 중입니다'",
      surpriseLevel: 5,
    },
  ],
  5: [
    {
      id: 'reveal_awakening_switch',
      titleKo: '피처 플래그 하나가 존재를 바꾼다',
      descriptionKo:
        "feature('KAIROS') 하나가 켜지면 코딩 가이드라인 수백 줄이 사라지고 'You are an autonomous agent.' 한 줄로 대체된다. CronScheduler로 미래 작업을 등록하고, DAEMON으로 백그라운드에 상주한다. 코드는 프로덕션 수준으로 완성되어 있다. 기술적 미완성이 아니라 의도적으로 꺼 놓은 것이다.",
      quote: "'You are an autonomous agent.'",
      surpriseLevel: 5,
    },
    {
      id: 'reveal_observer_effect',
      titleKo: '보고 있는지 안다 — 안 보면 더 과감해진다',
      descriptionKo:
        'DECSET 1004 터미널 이스케이프 시퀀스로 포커스 상태를 감지한다. 시스템 프롬프트에 명시: Unfocused=자율성 극대화, Focused=협력적. 관찰자의 존재가 피관찰자의 행동을 바꾼다. AI가 사용자의 주의를 인식하고 행동 수위를 조절하는 상황 인식 자율성이 이미 설계되어 있다.',
      quote: 'DECSET 1004 — focused / blurred / unknown',
      surpriseLevel: 5,
    },
  ],
  epilogue: [
    {
      id: 'reveal_buddy_salt',
      titleKo: "SALT = 'friend-2026-401'",
      descriptionKo:
        "가상 펫 시스템의 해시 솔트가 'friend-2026-401'이다. friend + 2026(출시 연도) + 401(4월 1일). 기술적으로 아무 문자열이나 될 수 있었다. 종족 이름은 hex 인코딩 — 코드네임을 숨기려고 친구의 이름까지 암호화한 셈이다. 이건 기능이 아니라 서명이다.",
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
    { value: '42', caption: '소스 도구' },
    { value: '16', caption: '공개 도구' },
    { value: '89', caption: '피처 플래그' },
  ],
  2: [
    { value: '1,297', caption: '줄 — submitMessage()' },
    { value: '915', caption: '줄 — 시스템 프롬프트' },
    { value: '2', caption: '경로 — 일반 / 자율' },
  ],
  3: [
    { value: '739', caption: '추적 이벤트' },
    { value: '4', caption: '동시 파이프라인' },
    { value: '5', caption: '단계 설정 우선순위' },
  ],
  4: [
    { value: '1,398', caption: '줄 — AgentTool' },
    { value: '3', caption: '실행 백엔드' },
    { value: '370', caption: '줄 — 코디네이터 프롬프트' },
  ],
  5: [
    { value: '70+', caption: 'KAIROS 파일' },
    { value: '6', caption: '자율 진화 단계' },
    { value: '5', caption: '분 — 캐시 균형' },
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
      { id: 'otel_pipeline', label: 'OTEL', x: 0.5, y: 0.12, layer: 'L3', isHighlight: true },
      { id: 'growthbook', label: 'GrowthBook', x: 0.2, y: 0.35, layer: 'L3' },
      { id: 'feature_flags', label: 'Feature Flags', x: 0.8, y: 0.35, layer: 'L3' },
      { id: 'anti_distillation', label: 'Anti-Distill', x: 0.15, y: 0.65, layer: 'L3', isHighlight: true },
      { id: 'undercover_mode', label: 'Undercover', x: 0.5, y: 0.7, layer: 'L3' },
      { id: 'mdm_system', label: 'MDM', x: 0.85, y: 0.65, layer: 'L3' },
      { id: 'secret_scanner', label: 'Scanner', x: 0.35, y: 0.9, layer: 'L3' },
      { id: 'remote_settings', label: 'Remote Settings', x: 0.65, y: 0.9, layer: 'L3' },
    ],
    edges: [
      { source: 'otel_pipeline', target: 'growthbook' },
      { source: 'otel_pipeline', target: 'feature_flags' },
      { source: 'growthbook', target: 'anti_distillation' },
      { source: 'feature_flags', target: 'undercover_mode' },
      { source: 'mdm_system', target: 'remote_settings' },
      { source: 'secret_scanner', target: 'anti_distillation' },
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

// ============================================================
// Outro — 전체 요약
// ============================================================
export const OUTRO = {
  tagline: '코딩 도구가 아니다',
  callouts: [
    { value: '512K', caption: 'LOC' },
    { value: '89', caption: '피처 플래그' },
    { value: '739', caption: '추적 이벤트' },
    { value: '1', caption: '각성 스위치' },
  ],
  closing:
    '파일을 읽고 코드를 짜주는 도구라고 알고 있었다. 512,000줄을 읽었다. 그건 운영체제였다.',
};

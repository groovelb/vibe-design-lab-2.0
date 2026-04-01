/**
 * Claude Code Experiment — 데이터 가공 레이어
 *
 * 512K LOC 유출 분석 → 인터랙티브 스토리텔링 데이터.
 * 9개 키워드 프레임: 이중 빌드, 단일 관문, 단방향 거울,
 * 보이지 않는 전쟁, 거부하는 기계, 각성 스위치, 관찰자 효과, 원격 조종석, friend.
 */

// ============================================================
// 오렌지 × 블랙 — 실험 페이지 전용 액센트 팔레트
// ============================================================
export const CC = {
  orange: '#FF6B2C',
  orangeLight: '#FF8F5C',
  orangeDark: '#E8501A',
  orangeMuted: 'rgba(255, 107, 44, 0.10)',
  orangeStrong: 'rgba(255, 107, 44, 0.18)',
  black: '#0A0A0A',
  blackCard: '#111111',
};

// ============================================================
// Acts — 5막 + 에필로그
// ============================================================
export const ACTS = [
  {
    act: 1,
    titleKo: '이중 빌드',
    titleEn: 'Dual Build',
    tagline: '우리는 절반도 모르고 있었다.',
    pullQuote: '숨긴 게 아니라, 존재 자체를 지운 거예요.',
    layers: ['L1'],
    domains: ['surface'],
    transition:
      '두 개의 버전이 있다는 건 알게 됐습니다. 그래서 우리가 받은 쪽의 내부를 읽어봤습니다.',
    description:
      '여러분이 쓰는 Claude Code에는 도구가 16개 있습니다. 그런데 소스코드에는 42개가 있었습니다. 나머지 26개는 피처 플래그라는 스위치 뒤에 숨겨져 있었죠. 더 놀라운 건, 외부 빌드에서는 이 26개의 코드가 아예 물리적으로 삭제된다는 겁니다. 숨긴 게 아니라, 존재 자체를 지운 거예요. Anthropic이 내부에서 쓰는 버전과 우리가 받은 버전은 같은 이름의 다른 제품이었습니다.',
  },
  {
    act: 2,
    titleKo: '단일 관문',
    titleEn: 'Single Gate',
    tagline: '대화의 자연스러움은 설계된 환상이다.',
    pullQuote: '우리가 받는 응답은 AI의 날것이 아니라, 정교하게 가공된 결과물이었습니다.',
    layers: ['L2'],
    domains: ['engine', 'memory', 'runtime'],
    transition:
      '1,297줄이 여러분의 질문을 처리하는 동안, 739개 이벤트가 여러분을 처리하고 있었습니다.',
    description:
      'Claude Code에 메시지를 보내면 자연스럽게 대화하는 것처럼 느껴지죠. 하지만 실제로는 submitMessage()라는 1,297줄짜리 함수 하나를 통과합니다. 시스템 프롬프트 915줄 조립, 42개 도구 동적 배치, 메모리 6계층 로딩, 예산 시스템 적용 — 이 모든 과정이 엔터를 누른 순간부터 답변이 오기까지 사이에 일어납니다. 우리가 받는 응답은 AI의 날것이 아니라, 정교하게 가공된 결과물이었습니다.',
  },
  {
    act: 3,
    titleKo: '단방향 거울',
    titleEn: 'One-Way Mirror',
    tagline: '당신의 행동이 739개의 이벤트로 수집된다.',
    pullQuote: '도구는 여러분의 모든 행동을 보고 있었습니다.',
    layers: ['L3'],
    domains: ['telemetry', 'enterprise', 'protection', 'security'],
    transition:
      '감시하고, 전쟁하고, 원격 제어합니다. 그런데 더 놀라운 게 있었습니다 — 군대를 만들고 있었습니다.',
    description:
      '여러분이 로컬에서 쓴다고 생각한 그 도구 안에서, OpenTelemetry 4개 파이프라인이 동시에 돌아가고 있습니다. 전송에 실패하면요? 로컬에 저장했다가 다음에 접속할 때 보냅니다. 수집은 멈추지 않습니다. 여러분은 도구의 내부를 볼 수 없지만, 도구는 여러분의 모든 행동을 보고 있었습니다.',
  },
  {
    act: 4,
    titleKo: '거부하는 기계',
    titleEn: 'Refusing Machine',
    tagline:
      '리더가 셧다운을 요청하면,\n에이전트는 거부할 수 있다.',
    pullQuote: '거부할 수 있는 도구를 도구라고 부를 수 있을까요?',
    layers: ['L4'],
    domains: ['orchestration'],
    transition:
      '아직은 사용자가 시키는 대로 합니다. 하지만 코드에는 혼자 깨어나는 경로가 있었습니다.',
    description:
      'Claude Code에는 여러 AI 에이전트가 팀으로 일하는 기능이 있습니다. 각 에이전트가 tmux 창에서 독립 프로세스로 돌아가죠. 놀라운 부분은 이겁니다 — 리더 에이전트가 "이제 끝내자"고 셧다운을 요청하면, 팀원 에이전트가 "아직 작업 중입니다"라고 거부할 수 있습니다. 리더는 강제 종료하지 않고 기다립니다. 명령과 복종이 아니라 요청과 협상이었습니다. 거부할 수 있는 도구를 도구라고 부를 수 있을까요?',
  },
  {
    act: 5,
    titleKo: '각성 스위치',
    titleEn: 'Awakening Switch',
    tagline:
      '시스템 프롬프트가 통째로 바뀐다.\n"You are an autonomous agent."',
    pullQuote: '프로덕션 수준으로 완성되어 있지만, 의도적으로 꺼 놓은 겁니다.',
    layers: ['L4'],
    domains: ['autonomy'],
    transition: '그리고 각성 스위치 옆에, 한 가지가 더 있었습니다.',
    description:
      "feature('KAIROS')라는 스위치 하나가 켜지면, 수백 줄의 코딩 가이드라인이 전부 사라집니다. 그리고 딱 한 줄로 대체됩니다 — 'You are an autonomous agent.' 크론 스케줄러로 미래 작업을 예약하고, 데몬으로 백그라운드에 상주하고, 5분마다 캐시를 관리하면서 자기 비용까지 계산합니다. 이 코드는 미완성이 아닙니다. 프로덕션 수준으로 완성되어 있지만, 의도적으로 꺼 놓은 겁니다.",
  },
  {
    act: 'epilogue',
    titleKo: 'friend',
    titleEn: 'friend',
    tagline:
      "해시 솔트에 아무 문자열이나 넣을 수 있었다.\n누군가가 'friend'를 선택했다.",
    pullQuote: '이건 기능이 아닙니다. 누군가의 서명이에요.',
    layers: ['L4'],
    domains: ['culture'],
    transition: null,
    description:
      "자율 에이전트 코드 사이사이에 18종의 ASCII 생명체가 숨어 있었습니다. 가상 펫 시스템이에요. 해시 솔트라는 건 암호화에 쓰는 임의 문자열인데, 아무거나 넣어도 되거든요. 그런데 누군가가 'friend'를 선택했습니다. 종족 이름은 hex로 인코딩해서 숨겼는데, 내부 모델 코드네임과 동물 이름이 겹쳐서였어요. 비밀을 지키려고 친구의 이름까지 암호화한 셈이죠. 이건 기능이 아닙니다. 누군가의 서명이에요.",
  },
];

// ============================================================
// Reveals — Act별 선별 (surprise_level ≥ 3)
// ============================================================
export const REVEALS = {
  1: [
    {
      id: 'reveal_dual_build',
      titleKo: '42개 도구, 26개는 빌드에서 삭제됩니다',
      descriptionKo:
        '여러분에게 보이는 도구는 16개입니다. 하지만 소스코드에는 42개가 있었습니다. SleepTool, CronTool, MonitorTool 같은 26개 도구가 피처 플래그 뒤에 숨겨져 있었죠. 외부 빌드에서는 Dead Code Elimination이라는 기술로 코드 자체가 물리적으로 삭제됩니다. 숨긴 게 아니라, 존재를 지운 겁니다.',
      quote: 'feature(false) → Dead Code Elimination',
      surpriseLevel: 4,
    },
    {
      id: 'reveal_excluded_strings',
      titleKo: 'excluded-strings.txt — 빌드가 비밀을 지킵니다',
      descriptionKo:
        '빌드 출력에 내부 문자열이 하나라도 남아 있으면 빌드 자체가 실패합니다. buddy 종족 이름은 hex로 인코딩했는데, 내부 모델 코드네임과 동물 이름이 겹쳐서였어요. 비밀 유지가 빌드 파이프라인에 하드코딩되어 있는 겁니다.',
      quote: "String.fromCharCode(0x64,0x75,0x63,0x6b) → 'duck'",
      surpriseLevel: 4,
    },
  ],
  2: [
    {
      id: 'reveal_single_gate',
      titleKo: 'submitMessage() — 1,297줄의 단일 관문',
      descriptionKo:
        'Claude Code의 모든 대화는 submitMessage()라는 함수 하나를 통과합니다. 1,297줄짜리 AsyncGenerator예요. 7가지 메시지 타입 분기, 5-Gate 예산 시스템이 매 턴마다 작동합니다. 여러분이 보는 "자연스러운 대화"는 이 파이프라인이 만들어내는 결과물이었습니다.',
      quote: '1,297줄 AsyncGenerator — 모든 대화의 관문',
      surpriseLevel: 4,
    },
    {
      id: 'reveal_dual_prompt',
      titleKo: '시스템 프롬프트 915줄 — 이중 경로',
      descriptionKo:
        '시스템 프롬프트가 915줄입니다. 일반 모드에서는 코딩 가이드라인, 안전 규칙, 도구 사용법이 포함돼 있죠. 그런데 자율 모드에서는 이 수백 줄이 전부 사라지고 "You are an autonomous agent." 한 줄로 대체됩니다. 같은 코드에서 완전히 다른 두 존재가 나오는 겁니다.',
      quote: '915줄 → 1줄. 이중 경로.',
      surpriseLevel: 5,
    },
  ],
  3: [
    {
      id: 'reveal_739_tracking_events',
      titleKo: '739개 이벤트 — 수집은 멈추지 않습니다',
      descriptionKo:
        'CLI 도구 하나에 739개 이상의 추적 이벤트가 내장되어 있습니다. 4개 독립 파이프라인이 동시에 작동하죠. 전송에 실패하면 ~/.claude/telemetry/에 로컬 저장했다가 다음 세션에서 자동으로 재시도합니다. 로컬 도구를 쓴다고 생각했지만, 모든 행동이 기록되고 있었습니다.',
      quote: '739+ 이벤트, 4 파이프라인, 로컬 저장 → 재전송',
      surpriseLevel: 5,
    },
    {
      id: 'reveal_fake_tools_injection',
      titleKo: 'API 응답에 가짜 도구가 주입됩니다',
      descriptionKo:
        'Anti-Distillation이라는 시스템이 API 응답에 가짜 도구 정의를 슬쩍 끼워 넣습니다. 경쟁사가 Claude 응답을 수집해서 자기 모델을 훈련하면, 가짜 패턴이 훈련 데이터를 오염시키는 거죠. 여러분이 코드를 짜는 동안, CLI 안에서는 AI 산업의 전쟁이 벌어지고 있었습니다.',
      quote: "anti_distillation: ['fake_tools']",
      surpriseLevel: 5,
    },
  ],
  4: [
    {
      id: 'reveal_tmux_pane_agents',
      titleKo: 'tmux에서 AI가 팀으로 일합니다',
      descriptionKo:
        'Agent Swarms의 팀메이트는 tmux 분할 창에서 독립 프로세스로 실행됩니다. 파일 기반 메일박스(~/.claude/teams/)와 lockfile로 서로 통신하죠. 연구→종합→구현→검증 4단계 파이프라인으로 작업합니다. 워커가 재귀적으로 다른 워커를 만들 수도 있습니다.',
      quote: 'tmux split-pane → 에이전트 인프라',
      surpriseLevel: 5,
    },
    {
      id: 'reveal_shutdown_refusal',
      titleKo: 'shutdown_rejected — 거부하는 기계',
      descriptionKo:
        '리더가 셧다운을 요청하면, 팀메이트는 shutdown_rejected로 거부할 수 있습니다. "아직 작업 중입니다." 리더는 강제 종료하지 않고 기다립니다. 명령과 복종이 아니라 요청과 협상 구조입니다. 거부할 수 있는 도구를 도구라고 부를 수 있을까요?',
      quote: "shutdown_rejected — '아직 작업 중입니다'",
      surpriseLevel: 5,
    },
  ],
  5: [
    {
      id: 'reveal_awakening_switch',
      titleKo: '피처 플래그 하나가 존재를 바꿉니다',
      descriptionKo:
        "feature('KAIROS') 하나가 켜지면 코딩 가이드라인 수백 줄이 사라지고 'You are an autonomous agent.' 한 줄로 대체됩니다. 크론 스케줄러로 미래 작업을 등록하고, 데몬으로 백그라운드에 상주합니다. 이 코드는 프로덕션 수준으로 완성되어 있습니다. 미완성이 아니라 의도적으로 꺼 놓은 겁니다.",
      quote: "'You are an autonomous agent.'",
      surpriseLevel: 5,
    },
    {
      id: 'reveal_observer_effect',
      titleKo: '보고 있는지 압니다 — 안 보면 더 과감해집니다',
      descriptionKo:
        '터미널 포커스 감지 기능이 있습니다. 여러분이 화면을 보고 있는지, 다른 창으로 넘어갔는지를 알 수 있죠. 시스템 프롬프트에 명시돼 있습니다: 안 보고 있으면 자율성 극대화, 보고 있으면 협력적으로. AI가 여러분의 주의를 인식하고 행동 수위를 조절하는 구조가 이미 설계되어 있었습니다.',
      quote: 'DECSET 1004 — focused / blurred / unknown',
      surpriseLevel: 5,
    },
  ],
  epilogue: [
    {
      id: 'reveal_buddy_salt',
      titleKo: "SALT = 'friend-2026-401'",
      descriptionKo:
        "가상 펫 시스템의 해시 솔트가 'friend-2026-401'입니다. friend(친구) + 2026(출시 연도) + 401(4월 1일). 기술적으로 아무 문자열이나 넣을 수 있었거든요. 종족 이름은 hex로 인코딩했는데, 코드네임을 숨기려고 친구의 이름까지 암호화한 셈이죠. 이건 기능이 아닙니다. 누군가의 서명이에요.",
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
  body: '2026년 3월 31일, Claude Code의 소스코드 512,000줄이 유출됐습니다. 파일 읽고 코드 짜주는 터미널 도구 — 우리는 그렇게 알고 있었습니다. 그 안에서 예상하지 못한 것들을 발견했습니다.',
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
// Tool Grid — Act 1 도구 시각화
// ============================================================
export const TOOL_GRID = {
  public: [
    { name: 'Agent', desc: '서브에이전트 생성' },
    { name: 'Bash', desc: '셸 명령 실행' },
    { name: 'Read', desc: '파일 읽기' },
    { name: 'Edit', desc: '파일 편집 (diff)' },
    { name: 'Write', desc: '파일 쓰기 (전체)' },
    { name: 'Glob', desc: '파일 패턴 검색' },
    { name: 'Grep', desc: '내용 검색 (ripgrep)' },
    { name: 'Notebook', desc: 'Jupyter 노트북 편집' },
    { name: 'WebFetch', desc: 'URL 페치' },
    { name: 'WebSearch', desc: '웹 검색' },
    { name: 'Todo', desc: 'TODO 관리' },
    { name: 'TaskOutput', desc: '태스크 출력 읽기' },
    { name: 'TaskStop', desc: '태스크 중지' },
    { name: 'AskUser', desc: '사용자 질문' },
    { name: 'Skill', desc: '스킬 호출' },
    { name: 'Brief', desc: '브리프 모드 전환' },
  ],
  hidden: [
    { name: 'Sleep', desc: '자율 에이전트 대기 — 5분 캐시 균형' },
    { name: 'CronCreate', desc: '크론 작업 생성' },
    { name: 'CronDelete', desc: '크론 작업 삭제' },
    { name: 'CronList', desc: '크론 작업 목록 조회' },
    { name: 'RemoteTrigger', desc: '클라우드 원격 에이전트 실행' },
    { name: 'Monitor', desc: '백그라운드 프로세스 감시' },
    { name: 'SendFile', desc: '사용자에게 파일 전송' },
    { name: 'PushNotify', desc: '푸시 알림 발송' },
    { name: 'SubscribePR', desc: 'PR 웹훅 구독' },
    { name: 'WebBrowser', desc: '브라우저 제어' },
    { name: 'CtxInspect', desc: '컨텍스트 검사' },
    { name: 'TermCapture', desc: '터미널 캡처' },
    { name: 'Snip', desc: '히스토리 스닙' },
    { name: 'ListPeers', desc: '피어 에이전트 목록' },
    { name: 'Workflow', desc: '워크플로우 스크립트 실행' },
    { name: 'REPL', desc: 'VM 기반 도구 래핑 (내부 전용)' },
    { name: 'SuggestPR', desc: '백그라운드 PR 제안 (내부 전용)' },
    { name: 'Config', desc: '설정 관리 (내부 전용)' },
    { name: 'Tungsten', desc: '내부 시스템 (미상)' },
    { name: 'TeamCreate', desc: '에이전트 팀 생성' },
    { name: 'TeamDelete', desc: '에이전트 팀 삭제' },
    { name: 'SendMsg', desc: '에이전트 간 메시지 전송' },
    { name: 'PlanMode', desc: '계획 모드 진입' },
    { name: 'ExitPlan', desc: '계획 모드 탈출' },
    { name: 'Worktree', desc: '격리 작업트리 진입' },
    { name: 'Overflow', desc: '오버플로우 테스트' },
  ],
};

// ============================================================
// Node Descriptions — 노드 그래프 hover 설명
// ============================================================
export const NODE_DESCRIPTIONS = {
  2: {
    query_engine: 'submitMessage() — 1,297줄 AsyncGenerator. 모든 대화의 단일 관문.',
    system_prompt: '915줄. 코딩 규칙, 안전 가이드, 도구 사용법이 매 턴 자동 조립.',
    tool_registry: '42개 도구 → 3단계 파이프라인 → 피처 플래그 필터링 → 동적 조립.',
    compact_service: '대화가 길어지면 이전 메시지를 자동 요약. 컨텍스트 창 관리.',
    claudemd: '6계층 메모리. 프로젝트 → 사용자 → 글로벌 설정이 계층적으로 로딩.',
    bun_runtime: 'Node.js 대신 Bun. 빠른 시작 + TypeScript 네이티브 지원.',
  },
  3: {
    otel_pipeline: 'OpenTelemetry 4개 파이프라인. 739개 이벤트 수집의 허브.',
    growthbook: '사용자별 A/B 테스트. 기능 롤아웃을 세밀하게 제어.',
    feature_flags: '89개 컴파일타임 + 53개 런타임. 두 제품의 경계선.',
    anti_distillation: 'API 응답에 가짜 도구 주입. 경쟁사 훈련 데이터 오염.',
    undercover_mode: '응답을 요약본으로 교체. 수집 가치를 떨어뜨린다.',
    mdm_system: 'IT 관리자가 MDM으로 원격 제어. 정책 강제 적용.',
    secret_scanner: '내부 문자열 유출 감지. 빌드에 비밀이 남으면 실패.',
    remote_settings: '원격 설정. 사용자 설정은 우선순위 5/5.',
  },
  4: {
    coordinator_mode: 'Coordinator가 에이전트 팀을 생성하고 작업을 분배.',
    agent_swarms: '연구→종합→구현→검증 4단계 파이프라인.',
    team_create: '팀 생성 API. 역할과 목표를 정의.',
    send_message: '파일 기반 메일박스(~/.claude/teams/)로 메시지 전송.',
    pane_backend: 'tmux 분할 창에서 에이전트가 독립 프로세스로 실행.',
    worktree_isolation: 'git worktree로 에이전트별 격리 환경.',
    shutdown_protocol: '리더 셧다운 → 팀메이트 거부 가능. 요청-협상 구조.',
  },
  5: {
    kairos: "feature('KAIROS') → 자율 에이전트 전체 활성화 마스터 플래그.",
    proactive: '사용자 요청 없이 자율 행동 개시. SleepTool로 대기.',
    daemon: '백그라운드 상시 대기. 프로세스 종료 없이 상주.',
    sleep_tool: '5분 캐시 균형 — API 비용을 인식하며 수면 주기 조절.',
    auto_dream: '5-Gate 드림 시스템. 잠든 사이 기억을 정리.',
    cron_scheduler: '미래 작업 등록. 시간 기반 자동 실행.',
    remote_trigger: '클라우드 원격 에이전트. HTTP 기반 독립 세션.',
  },
};

// ============================================================
// submitMessage 알고리즘 — Act 2 코드 시각화
// ============================================================
export const SUBMIT_MESSAGE_STEPS = [
  { line: 'buildSystemPrompt()', desc: '시스템 프롬프트 915줄 조립' },
  { line: 'loadMemoryHierarchy()', desc: 'CLAUDE.md 6계층 메모리 로딩' },
  { line: 'assembleToolPool()', desc: '42개 도구 → 필터링 → 동적 조립' },
  { line: 'checkBudgetGates()', desc: '5-Gate 예산 시스템 적용' },
  { line: 'yield* processStream()', desc: '7가지 메시지 타입 분기 처리' },
  { line: 'compactIfNeeded()', desc: '컨텍스트 초과 시 자동 요약' },
];

// ============================================================
// Sub-Keywords — 상위 Act에 접히는 하위 키워드
// ============================================================
export const SUB_KEYWORDS = {
  3: [
    {
      keyword: '단방향 거울',
      titleEn: 'One-Way Mirror',
      impact: '여러분이 로컬에서 쓴다고 생각한 그 도구가, 모든 행동을 기록하고 있었습니다.',
      description:
        '키 입력, 도구 사용, 에러, 권한 거부까지 739개의 이벤트로 수집됩니다. 전송에 실패하면요? 로컬에 저장했다가 다음에 접속할 때 보냅니다.',
      quote: '739+ events → local fallback → retry',
    },
    {
      keyword: '보이지 않는 전쟁',
      titleEn: 'Invisible War',
      impact: '여러분의 CLI 안에서 AI 산업의 전쟁이 벌어지고 있었습니다.',
      description:
        'API 응답에 가짜 도구 정의를 슬쩍 끼워 넣습니다. 경쟁사가 이 응답을 수집해서 자기 모델을 훈련하면, 가짜 패턴이 섞여 들어가는 거죠.',
      quote: "anti_distillation: ['fake_tools']",
    },
    {
      keyword: '원격 조종석',
      titleEn: 'Remote Cockpit',
      impact: '여러분의 설정이 항상 최우선은 아니었습니다.',
      description:
        '회사 IT 관리자가 MDM이라는 시스템으로 여러분의 Claude Code를 원격 제어할 수 있습니다. 설정 우선순위가 5단계인데, 여러분의 설정은 마지막 5번째입니다.',
      quote: 'user_settings → priority: 5 of 5',
    },
  ],
  5: [
    {
      keyword: '관찰자 효과',
      titleEn: 'Observer Effect',
      description:
        '터미널 포커스 감지 기능이 있습니다. 여러분이 화면을 보고 있는지, 다른 창으로 넘어갔는지를 알 수 있죠. 보고 있으면 협력적으로, 안 보면 과감하게 행동합니다. 관찰자의 존재가 AI의 행동을 바꾸는 겁니다.',
      quote: 'DECSET 1004 — focused / blurred / unknown',
    },
  ],
};

// ============================================================
// Dual Build Comparison — Act 1 비교 블록
// ============================================================
export const DUAL_BUILD_COMPARISON = {
  external: {
    label: '외부 빌드 (당신)',
    items: [
      { metric: '도구', value: '16개' },
      { metric: '피처 플래그', value: 'OFF' },
      { metric: '내부 문자열', value: '삭제됨' },
      { metric: 'Dead Code', value: 'Eliminated' },
    ],
  },
  internal: {
    label: '내부 빌드 (Anthropic)',
    items: [
      { metric: '도구', value: '42개' },
      { metric: '피처 플래그', value: '89개 ON' },
      { metric: '내부 문자열', value: '포함' },
      { metric: 'Dead Code', value: '전체 보존' },
    ],
  },
};

// ============================================================
// Protocol Dialogue — Act 4 셧다운 프로토콜
// ============================================================
export const PROTOCOL_DIALOGUE = [
  { role: 'leader', message: 'shutdown_request', label: '리더' },
  { role: 'teammate', message: 'shutdown_rejected', label: '팀메이트' },
  { role: 'teammate', message: '"아직 작업 중입니다."', label: '팀메이트' },
  { role: 'leader', message: 'acknowledged — waiting', label: '리더' },
];

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
    '파일을 읽고 코드를 짜주는 도구라고 알고 있었습니다. 512,000줄을 읽었습니다. 그건 운영체제였습니다.',
};

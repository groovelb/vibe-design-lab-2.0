# R3-B: 전체 Feature Flag 맵 — 60+ 컴파일 타임 플래그

## 소스: `src/shims/bun-bundle.ts` + 소스 전체 grep

---

## 핵심 발견: 외부 빌드에 노출된 28개 vs 내부 전용 32개+

### Shim에 노출된 플래그 (28개, 모두 기본값 false)

| # | 플래그 | 카테고리 | 역할 |
|---|--------|----------|------|
| 1 | `PROACTIVE` | 자율 | 자율 에이전트 모드 |
| 2 | `KAIROS` | 자율 | 풀 자율 어시스턴트 모드 |
| 3 | `KAIROS_BRIEF` | 자율 | Brief 도구만 활성화 |
| 4 | `KAIROS_GITHUB_WEBHOOKS` | 자율 | GitHub 웹훅 통합 |
| 5 | `BRIDGE_MODE` | IDE | VS Code/JetBrains 브리지 |
| 6 | `DAEMON` | 자율 | 데몬 프로세스 모드 |
| 7 | `VOICE_MODE` | UI | 음성 입력 |
| 8 | `AGENT_TRIGGERS` | 자율 | Cron 스케줄러, /loop |
| 9 | `MONITOR_TOOL` | 도구 | 모니터 MCP 도구 |
| 10 | `COORDINATOR_MODE` | 멀티에이전트 | 코디네이터 오케스트레이션 |
| 11 | `ABLATION_BASELINE` | 실험 | 항상 off (기능 제거 기준선) |
| 12 | `DUMP_SYSTEM_PROMPT` | 디버그 | 시스템 프롬프트 덤프 |
| 13 | `BG_SESSIONS` | 태스크 | 백그라운드 세션 |
| 14 | `HISTORY_SNIP` | 메모리 | 히스토리 스닙 압축 |
| 15 | `WORKFLOW_SCRIPTS` | 자동화 | 워크플로우 스크립트 |
| 16 | `CCR_REMOTE_SETUP` | 원격 | CCR 원격 설정 |
| 17 | `EXPERIMENTAL_SKILL_SEARCH` | 스킬 | DiscoverSkills 도구 |
| 18 | `ULTRAPLAN` | 계획 | 울트라 플래닝 모드 |
| 19 | `TORCH` | 미상 | 미상 |
| 20 | `UDS_INBOX` | 통신 | Unix Domain Socket 수신함 |
| 21 | `FORK_SUBAGENT` | 에이전트 | Fork 기반 서브에이전트 |
| 22 | `BUDDY` | 이스터에그 | 가챠 컴패니언 |
| 23 | `MCP_SKILLS` | 스킬 | MCP 기반 스킬 |
| 24 | `REACTIVE_COMPACT` | 메모리 | 리액티브 컴팩션 |

### 내부 전용 플래그 (코드에만 존재, 36개+)

| # | 플래그 | 카테고리 | 역할 |
|---|--------|----------|------|
| 25 | `KAIROS_DREAM` | 자율/메모리 | Dream 스킬 (KAIROS 없이도) |
| 26 | `KAIROS_CHANNELS` | 자율/통신 | 채널 기반 통신 |
| 27 | `REVIEW_ARTIFACT` | 품질 | 코드 리뷰 아티팩트 (/hunter) |
| 28 | `AGENT_TRIGGERS_REMOTE` | 자율 | 원격 에이전트 스케줄링 |
| 29 | `BUILDING_CLAUDE_APPS` | 스킬 | Claude API 개발 스킬 |
| 30 | `RUN_SKILL_GENERATOR` | 스킬 | 스킬 생성기 |
| 31 | `EXTRACT_MEMORIES` | 메모리 | 자동 메모리 추출 |
| 32 | `TEMPLATES` | 자동화 | 작업 템플릿/분류기 |
| 33 | `CHICAGO_MCP` | 도구 | 컴퓨터 유즈 (MCP) |
| 34 | `QUICK_SEARCH` | UI | 빠른 검색 |
| 35 | `TERMINAL_PANEL` | UI | 터미널 패널 |
| 36 | `MESSAGE_ACTIONS` | UI | 메시지 액션 |
| 37 | `MEMORY_SHAPE_TELEMETRY` | 텔레메트리 | 메모리 형태 텔레메트리 |
| 38 | `COWORKER_TYPE_TELEMETRY` | 텔레메트리 | 코워커 유형 텔레메트리 |
| 39 | `DIRECT_CONNECT` | 원격 | 직접 연결 서버 |
| 40 | `SSH_REMOTE` | 원격 | SSH 원격 접속 |
| 41 | `LODESTONE` | 미상 | Lodestone 시스템 |
| 42 | `TRANSCRIPT_CLASSIFIER` | 보안 | 트랜스크립트 분류기 (auto 권한) |
| 43 | `BASH_CLASSIFIER` | 보안 | Bash 명령 분류기 |
| 44 | `TOKEN_BUDGET` | 실행 | 토큰 예산 시스템 |
| 45 | `CACHED_MICROCOMPACT` | 성능 | 캐시된 마이크로 컴팩션 |
| 46 | `CONTEXT_COLLAPSE` | 메모리 | 컨텍스트 접기 |
| 47 | `VERIFICATION_AGENT` | 품질 | 검증 에이전트 프로토콜 |
| 48 | `DOWNLOAD_USER_SETTINGS` | 설정 | 사용자 설정 다운로드 |
| 49 | `UPLOAD_USER_SETTINGS` | 설정 | 사용자 설정 업로드 |
| 50 | `WEB_BROWSER_TOOL` | 도구 | 웹 브라우저 도구 |
| 51 | `AGENT_MEMORY_SNAPSHOT` | 메모리 | 에이전트 메모리 스냅샷 |
| 52 | `CCR_MIRROR` | 원격 | CCR 미러링 |
| 53 | `COMMIT_ATTRIBUTION` | VCS | 커밋 귀속 추적 |
| 54 | `STREAMLINED_OUTPUT` | UI | 간소화된 출력 |
| 55 | `FILE_PERSISTENCE` | 데이터 | 파일 영속화 |
| 56 | `ANTI_DISTILLATION_CC` | 보안 | 안티 디스틸레이션 |
| 57 | `CONNECTOR_TEXT` | API | 커넥터 텍스트 블록 |
| 58 | `PROMPT_CACHE_BREAK_DETECTION` | 성능 | 프롬프트 캐시 브레이크 감지 |
| 59 | `HARD_FAIL` | 에러 | 하드 실패 모드 |
| 60 | `TEAMMEM` | 팀 | 팀 메모리 시스템 |

---

## 카테고리별 분류

### 자율 에이전트 (10개)
`PROACTIVE`, `KAIROS`, `KAIROS_BRIEF`, `KAIROS_DREAM`, `KAIROS_CHANNELS`, `KAIROS_GITHUB_WEBHOOKS`, `DAEMON`, `AGENT_TRIGGERS`, `AGENT_TRIGGERS_REMOTE`, `AGENT_MEMORY_SNAPSHOT`

### 메모리/컨텍스트 (7개)
`EXTRACT_MEMORIES`, `HISTORY_SNIP`, `REACTIVE_COMPACT`, `CACHED_MICROCOMPACT`, `CONTEXT_COLLAPSE`, `MEMORY_SHAPE_TELEMETRY`, `TEAMMEM`

### 멀티에이전트 (3개)
`COORDINATOR_MODE`, `FORK_SUBAGENT`, `VERIFICATION_AGENT`

### UI/UX (6개)
`VOICE_MODE`, `QUICK_SEARCH`, `TERMINAL_PANEL`, `MESSAGE_ACTIONS`, `STREAMLINED_OUTPUT`, `BUDDY`

### 보안/권한 (4개)
`TRANSCRIPT_CLASSIFIER`, `BASH_CLASSIFIER`, `ANTI_DISTILLATION_CC`, `HARD_FAIL`

### 원격/IDE (6개)
`BRIDGE_MODE`, `DIRECT_CONNECT`, `SSH_REMOTE`, `CCR_REMOTE_SETUP`, `CCR_MIRROR`, `UDS_INBOX`

### 도구/스킬 (7개)
`MONITOR_TOOL`, `CHICAGO_MCP`, `WEB_BROWSER_TOOL`, `EXPERIMENTAL_SKILL_SEARCH`, `MCP_SKILLS`, `BUILDING_CLAUDE_APPS`, `RUN_SKILL_GENERATOR`

### 성능/최적화 (3개)
`CACHED_MICROCOMPACT`, `PROMPT_CACHE_BREAK_DETECTION`, `FILE_PERSISTENCE`

### 자동화 (3개)
`WORKFLOW_SCRIPTS`, `TEMPLATES`, `TOKEN_BUDGET`

### 실험/디버그 (3개)
`ABLATION_BASELINE`, `DUMP_SYSTEM_PROMPT`, `ULTRAPLAN`

### 미분류 (3개)
`TORCH`, `LODESTONE`, `REVIEW_ARTIFACT`

---

## 주목할 점

1. **외부 빌드에서 모든 플래그가 기본 false** — 공개 빌드는 모든 고급 기능이 꺼진 상태
2. **내부 빌드(ant)는 다수 활성화** — EXTRACT_MEMORIES, TRANSCRIPT_CLASSIFIER 등
3. **Dead Code Elimination** — `if (feature('X'))` 패턴으로 false인 코드는 빌드에서 완전 제거
4. **ANTI_DISTILLATION_CC** — 모델 디스틸레이션(지식 증류) 방지 기능이 존재
5. **CHICAGO_MCP** — Computer Use가 MCP로 구현됨 (코드네임: Chicago)
6. **종족 이름과 모델 코드네임 충돌** — buddy/types.ts에서 hex 인코딩으로 우회

---

## 스토리텔링 노드/엣지

### 새 노드
| ID | Label | Layer | Category |
|----|-------|-------|----------|
| `feature_flags` | 60+ Feature Flags | control | gating |
| `dead_code_elim` | Dead Code Elimination | engine | build |
| `anti_distillation` | Anti-Distillation | control | security |
| `chicago_mcp` | Computer Use (Chicago) | future | tools |

### 새 엣지
| Source → Target | Type | Label |
|----------------|------|-------|
| `feature_flags` → 모든 future 레이어 노드 | gates | 컴파일 타임 게이팅 |
| `feature_flags` → `dead_code_elim` | enables | 미사용 코드 제거 |
| `bun_bundle` → `feature_flags` | provides | feature() 함수 |

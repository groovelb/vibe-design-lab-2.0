# 전체 택소노미 — Claude Code 세계관 개념 체계

> 이 프로젝트에서 반복적으로 등장하는 모든 개념을 3계위(Domain → System → Detail)로 정리한 마스터 택소노미.
> `graph-data.json`이 이 체계에서 어떤 위치를 차지하는지 명확히 한다.

---

## 1. 택소노미 구조 — 3계위 모델

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   Tier 0: Domain (도메인)                                    │
│   ─────────────────                                         │
│   "어떤 영역인가" — 빙산 레이어(L1~L4) + 기능 도메인          │
│   11개 도메인. 내러티브 챕터 단위. 시각화의 색상/영역 구분       │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                                                     │   │
│   │   Tier 1: System (시스템 컴포넌트)                    │   │
│   │   ─────────────────────────────                     │   │
│   │   "무엇이 존재하는가" — 독립적으로 식별 가능한 시스템 단위  │   │
│   │   ~90개. graph-data.json의 노드. 시각화의 클릭 대상      │   │
│   │                                                     │   │
│   │   ┌─────────────────────────────────────────────┐   │   │
│   │   │                                             │   │   │
│   │   │   Tier 2: Detail (구현 상세)                  │   │   │
│   │   │   ─────────────────────                     │   │   │
│   │   │   "어떻게 구현되었는가" — 함수, 이벤트, 종족 등  │   │   │
│   │   │   ~160개. 리서치 문서 내부. 팝업/드릴다운 콘텐츠  │   │   │
│   │   │                                             │   │   │
│   │   └─────────────────────────────────────────────┘   │   │
│   │                                                     │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Tier 0 — Domain (11개 도메인)

| # | Domain ID | 한국어 | Layer | Act | 색상 | 설명 |
|---|-----------|--------|-------|-----|------|------|
| D1 | `surface` | 표면 | L1 | 1 | `#4CAF50` | 사용자가 직접 보고 쓰는 CLI, 도구, 슬래시 커맨드 |
| D2 | `engine` | 엔진 | L2 | 2 | `#2196F3` | QueryEngine, 시스템 프롬프트, 도구 조립, 부팅 |
| D3 | `memory` | 기억 | L2 | 2 | `#00BCD4` | CLAUDE.md, 메모리 디렉토리, 컴팩션, 회상 |
| D4 | `runtime` | 런타임 | L2 | 2 | `#607D8B` | Bun, React+Ink, esbuild, IDE 브릿지 |
| D5 | `security` | 보안 | L2–L3 | 3 | `#F44336` | 권한 시스템, 샌드박스, AI 분류기, Undercover |
| D6 | `telemetry` | 감시 | L3 | 3 | `#FF9800` | OpenTelemetry, Datadog, BigQuery, GrowthBook |
| D7 | `enterprise` | 엔터프라이즈 | L3 | 3 | `#795548` | MDM, 원격 설정, 정책 제한, 5-tier 우선순위 |
| D8 | `protection` | 방어 | L3 | 3 | `#E91E63` | Anti-distillation, 비밀 스캐너, 모델 위장 |
| D9 | `orchestration` | 군단 | L4 | 4 | `#9C27B0` | AgentTool, 코디네이터, Swarms, 메일박스 |
| D10 | `autonomy` | 자율 | L4 | 5 | `#673AB7` | KAIROS, PROACTIVE, Dream, 크론, 트리거 |
| D11 | `culture` | 문화 | L4 | Epilogue | `#FFEB3B` | buddy 가상 펫, 이스터에그, 개발팀 메시지 |

---

## 3. Tier 1 — System (시스템 컴포넌트) — 전체 목록

### D1: Surface (표면) — 11개

| ID | Label | 설명 |
|----|-------|------|
| `cli_repl` | CLI/REPL Interface | 터미널 메인 루프, 사용자 입출력 인터페이스 |
| `slash_commands` | Slash Commands (87+) | `/commit`, `/review` 등 슬래시 커맨드 레지스트리 |
| `file_tools` | File I/O Tools | FileRead, FileEdit, FileWrite — 파일 조작 도구 3종 |
| `bash_tool` | BashTool | 셸 명령 실행 도구 |
| `search_tools` | Search Tools | GlobTool(패턴), GrepTool(내용) — 검색 도구 2종 |
| `web_tools` | Web Tools | WebFetchTool, WebSearchTool — 웹 접근 도구 2종 |
| `agent_tool` | AgentTool | 서브에이전트 생성 도구 (L4 orchestration과 교차) |
| `permission_prompt` | Permission Prompt | 도구 실행 전 사용자 승인 UI |
| `mcp_public` | MCP Server Integration | Model Context Protocol 외부 서버 연동 |
| `notebook_tool` | NotebookEditTool | Jupyter 노트북 편집 도구 |
| `skill_tool` | SkillTool | 스킬 호출 도구 |

### D2: Engine (엔진) — 14개

| ID | Label | 설명 |
|----|-------|------|
| `query_engine` | QueryEngine (1,297줄) | **핵심 엔진** — async generator 실행 루프, API 스트리밍, 도구 루프 |
| `system_prompt` | System Prompt Builder (915줄) | 정적/동적 분리 프롬프트 조립기, 15+ 동적 섹션 |
| `tool_registry` | Tool Registry (40+) | 전체 도구 목록 관리, feature-gated 포함/제외 |
| `tool_assembly` | Tool Assembly Pipeline | 3단계: getAllBaseTools → getTools → assembleToolPool |
| `tool_use_context` | ToolUseContext (40+ 필드) | 도구 실행에 필요한 모든 컨텍스트 객체 |
| `cache_boundary` | Static/Dynamic Cache Boundary | 프롬프트 캐시 효율을 위한 정적/동적 분리선 |
| `compact_service` | Context Compaction | 컨텍스트 초과 시 자동 압축 서비스 |
| `micro_compact` | MicroCompact | 도구 결과 단위 즉시 압축 |
| `auto_compact` | AutoCompact | 토큰 한도 도달 시 전체 대화 압축 |
| `app_state` | AppState Store | React 기반 전역 상태 스토어 |
| `session_storage` | Session JSONL Storage | 대화 히스토리 영속 저장 (JSONL 트랜스크립트) |
| `stop_hooks` | Stop Hooks Pipeline | 턴 종료 시 실행되는 파이프라인 (Dream, 메모리 추출 트리거) |
| `frc` | Function Result Clearing | API 재전송 시 도구 결과 제거/요약 |
| `tool_search` | Tool Search (Deferred Loading) | MCP 도구 수가 많을 때 지연 검색/로딩 |

### D3: Memory (기억) — 7개

| ID | Label | 설명 |
|----|-------|------|
| `claudemd` | CLAUDE.md Hierarchy (6계층) | Managed→User→Project→Local→AutoMem→TeamMem 설정 체인 |
| `memdir` | Memory Directory System | `~/.claude/memory/` 영속 메모리 파일 시스템 |
| `memory_index` | MEMORY.md Index (200줄 캡) | 메모리 파일 목록 인덱스, 200줄 이후 잘림 |
| `extract_memories` | Extract Memories Agent | 대화에서 메모리 자동 추출하는 포크 에이전트 |
| `session_memory` | Session Memory Auto-Extract | 세션 종료 시 자동 메모리 노트 생성 |
| `find_relevant_memories` | Sonnet Memory Selector (top 5) | Sonnet sideQuery로 관련 메모리 5개 선택 |
| `team_memory_sync` | Team Memory Sync | 팀 간 메모리 동기화 + 비밀 스캐너 연동 |

### D4: Runtime (런타임) — 5개

| ID | Label | 설명 |
|----|-------|------|
| `bun_runtime` | Bun Runtime | Node.js 대신 Bun 1.1.0+ 사용, JSX 네이티브 지원 |
| `react_ink` | React 19 + Ink Terminal UI | 터미널을 브라우저처럼 렌더링하는 React 기반 UI |
| `esbuild_bundle` | esbuild Build System | 단일 번들 빌드, feature flag → dead code elimination |
| `bridge_system` | IDE Bridge (VS Code/JetBrains) | IDE 확장과 양방향 통신, JWT 인증, 권한 프록시 |
| `mcp_client` | MCP Client Internal | MCP 프로토콜 클라이언트 내부 구현 |

### D5: Security (보안) — 10개

| ID | Label | 설명 |
|----|-------|------|
| `permission_system` | 6-Mode Permission System | default/acceptEdits/plan/auto/bypassPermissions/dontAsk |
| `permission_rules` | Permission Rules (8 sources) | 와일드카드 규칙, 8개 소스(CLI, 설정, MDM 등)에서 수집 |
| `sandbox` | Sandbox System | macOS seatbelt, Linux bubblewrap(bwrap)/Docker 샌드박스 |
| `transcript_classifier` | AI Transcript Classifier | auto 모드에서 도구 호출 안전성을 AI가 2단계 판단 |
| `bash_classifier` | AI Bash Classifier | Bash 명령 위험도를 AI가 분류 |
| `denial_tracking` | Denial Tracking (3/20) | 연속 3회 또는 총 20회 거부 시 fallback 발동 |
| `iron_gate` | Iron Gate (Fail-Closed) | AI 분류기 실패 시 무조건 차단하는 안전 장치 |
| `commit_attribution` | Commit Attribution Tracking | 파일별 Claude vs Human 기여도를 문자 수준으로 추적 |
| `oauth_system` | OAuth 2.0 Auth | 인증 토큰 관리, Keychain 연동 |
| `undercover_mode` | Undercover Mode | 공개 저장소에서 AI 정체를 숨기는 위장 모드 |

### D6: Telemetry (감시) — 4개

| ID | Label | 설명 |
|----|-------|------|
| `otel_pipeline` | OpenTelemetry Pipeline | 4-layer 수집: 1P OTEL, Datadog, BigQuery, 3P OTLP |
| `feature_flags` | 60+ Feature Flags | 컴파일타임 DCE + 런타임 GrowthBook 이중 게이팅 |
| `dead_code_elim` | Dead Code Elimination | `feature(false)` 분기를 빌드 시 완전 제거 |
| `growthbook` | GrowthBook A/B Testing | 서버사이드 실험 평가, tengu_* 코드네임, 노출 추적 |

### D7: Enterprise (엔터프라이즈) — 3개

| ID | Label | 설명 |
|----|-------|------|
| `mdm_system` | MDM Settings | macOS plist(Jamf) / Windows 레지스트리(GPO) / Linux JSON |
| `remote_managed` | Remote Managed Settings | API 폴링 기반 원격 설정 동기화 (30분 주기) |
| `settings_pipeline` | 5-Tier Settings Priority | MDM→Remote→Org→Team→User 5단계 설정 우선순위 체인 |

### D8: Protection (방어) — 7개

| ID | Label | 설명 |
|----|-------|------|
| `anti_distillation` | Anti-Distillation (fake_tools) | 경쟁사 모델 학습 방해용 가짜 도구 주입 |
| `connector_summarize` | Connector Text Summarization | 응답 텍스트를 요약해서 학습 가치를 감소 |
| `secret_scanner` | Secret Scanner (30+) | gitleaks 기반 API 키/비밀 30+ 패턴 감지 |
| `cyber_risk` | CYBER_RISK Instruction | 모든 프롬프트에 삽입되는 사이버 보안 지시문 |
| `model_sanitizer` | Model Name Sanitizer | 내부 코드네임을 공개 모델명으로 변환 |
| `excluded_strings` | excluded-strings.txt | 빌드 출력물에 금지 문자열이 포함되지 않았는지 검증 |
| `internal_repos` | Internal Repo Allowlist (22개) | Undercover/Attribution 비활성화 대상 내부 저장소 목록 |

### D9: Orchestration (군단) — 15개

| ID | Label | 설명 |
|----|-------|------|
| `coordinator_mode` | Coordinator Mode | 순수 오케스트레이터 — AgentTool만 4개 도구 사용 |
| `coordinator_prompt` | Coordinator Prompt (370줄) | 연구→종합→구현→검증 4단계 파이프라인 지시 |
| `agent_swarms` | Agent Swarms (Teams) | 팀 기반 멀티에이전트, TeamFile 기반 구성 |
| `team_create` | TeamCreateTool | 팀 생성, 팀원 설정(모델/도구/역할) 전파 |
| `team_delete` | TeamDeleteTool | 팀 해체, graceful shutdown 필수 |
| `send_message` | SendMessageTool | 에이전트 간 메시지 전달, 5종 메시지 타입 |
| `teammate_mailbox` | File-Based Mailbox | `~/.claude/teams/` 파일 기반 메시지 큐 + lockfile |
| `task_notification` | Task Notification XML | 워커→코디네이터 결과 전달 XML 포맷 |
| `in_process_backend` | In-Process Backend | 동일 프로세스 내 에이전트 실행 |
| `pane_backend` | Pane Backend (tmux/iTerm2) | 터미널 탭/패널에서 에이전트를 독립 프로세스로 실행 |
| `worktree_isolation` | Git Worktree Isolation | 에이전트에게 독립 git worktree 제공 |
| `shutdown_protocol` | Graceful Shutdown Protocol | shutdown_request → shutdown_response 프로토콜 |
| `verification_agent` | Verification Agent | 구현 결과를 적대적으로 검증하는 전담 에이전트 |
| `agent_tool` | AgentTool (1,398줄) | Fork/Async/Team 3경로 라우터 (D1에도 교차 등장) |
| `buddy_system` | Buddy Companion | 가상 펫 시스템 (D11에도 교차 등장) |

### D10: Autonomy (자율) — 11개

| ID | Label | 설명 |
|----|-------|------|
| `kairos` | KAIROS Subsystem | 자율 에이전트 기능의 상위 컨테이너 (70+ 파일) |
| `proactive` | PROACTIVE Mode | 사용자 명령 없이 자율 행동 개시 |
| `daemon` | DAEMON Mode | 터미널 없이 백그라운드 상시 대기 |
| `sleep_tool` | SleepTool | 자율 에이전트 페이싱 — 5분 캐시 만료 균형 |
| `auto_dream` | AutoDream | 5-gate 배경 메모리 통합, PID 잠금 |
| `dream_prompt` | Dream 4-Phase Prompt | 드림 통합 프롬프트 4단계 구조 |
| `cron_scheduler` | CronScheduler (3 도구) | 시간 기반 에이전트 스케줄링, jitter, 7일 만료 |
| `remote_trigger` | RemoteTriggerTool | HTTP 기반 외부 에이전트 활성화 |
| `push_notification` | PushNotificationTool | 모바일 푸시 알림 전송 |
| `subscribe_pr` | SubscribePRTool | GitHub PR 웹훅 구독 |
| `send_user_file` | SendUserFileTool | 사용자에게 파일 전송 |
| `monitor_tool` | MonitorTool | 백그라운드 프로세스 감시 |

### D11: Culture (문화) — 4개

| ID | Label | 설명 |
|----|-------|------|
| `buddy_system` | Buddy Companion System | 가상 펫 시스템 전체 |
| `gacha_rng` | Gacha RNG (Mulberry32) | userId 기반 결정론적 가챠 |
| `ascii_sprites` | 18 ASCII Species (3-frame) | 18종 ASCII 생명체, 6 눈/8 모자/3 프레임 |
| `companion_soul` | AI Soul Generation | Claude가 이름/성격을 생성하는 AI 소울 시스템 |

---

## 4. Tier 2 — Detail (구현 상세) — 도메인별

Tier 2는 시각화에 직접 노출하지 않지만, 리포트/팝업의 **드릴다운 콘텐츠**로 사용한다.

### D2 Engine — Detail

| Parent (Tier 1) | Detail ID | Label | 출처 |
|-----------------|-----------|-------|------|
| `query_engine` | `submit_message` | submitMessage() async generator | R1-A |
| `query_engine` | `message_loop` | Message Processing Loop (7 타입 분기) | R1-A |
| `query_engine` | `session_persistence` | Session Persistence (crash-safe JSONL) | R1-A |
| `query_engine` | `permission_wrapper` | Permission Wrapper (도구 호출 전 체크) | R1-A |
| `query_engine` | `snip_compact` | History Snip (HISTORY_SNIP 플래그) | R1-A |
| `system_prompt` | `proactive_prompt` | Autonomous Mode Prompt (PROACTIVE 전용) | R1-B |
| `system_prompt` | `ant_only_sections` | ANT-Only Prompt Sections (내부 전용) | R1-B |
| `tool_registry` | `tool_permission_filter` | Tool Permission Filter (deny rule 사전 제거) | R4-E |
| `tool_registry` | `repl_tool` | REPL VM Tool (ant-only, Bash/Read/Edit 래핑) | R4-E |
| `tool_registry` | `embedded_search` | Embedded Search (bfs/ugrep, ant 바이너리 임베드) | R4-E |

### D3 Memory — Detail

| Parent | Detail ID | Label | 출처 |
|--------|-----------|-------|------|
| `memdir` | `user_memory` | 사용자 역할/목표/전문성 메모리 타입 | R3-C |
| `memdir` | `feedback_memory` | 작업 방식 교정 메모리 타입 | R3-C |
| `memdir` | `project_memory` | 진행 중 작업/버그/인시던트 메모리 타입 | R3-C |
| `memdir` | `reference_memory` | 외부 시스템 포인터 메모리 타입 | R3-C |

### D4 Runtime — Detail

| Parent | Detail ID | Label | 출처 |
|--------|-----------|-------|------|
| `bun_runtime` | `cli_entrypoint` | CLI Entrypoint (cli.tsx) — 13 fast-path | R5-A |
| `bun_runtime` | `init_system` | Init System (init.ts) — memoized 초기화 | R5-A |
| `bun_runtime` | `main_orchestrator` | Main Boot Orchestrator (main.tsx ~4,500줄) | R5-A |
| `bun_runtime` | `setup_screens` | Setup Screen Sequence (15 대화상자) | R5-A |
| `bun_runtime` | `deferred_prefetches` | Deferred Prefetch System (15개) | R5-A |
| `bun_runtime` | `keychain_prefetch` | Keychain Prefetch (모듈 로드 시점 병렬) | R5-A |
| `bun_runtime` | `mdm_raw_read` | MDM Raw Read (plutil/reg subprocess) | R5-A |
| `bun_runtime` | `preaction_hook` | PreAction Hook (MDM→init→migration→remote) | R5-A |
| `bun_runtime` | `commander_program` | Commander CLI Program (52 subcommands) | R5-A |
| `growthbook` | `growthbook_init` | GrowthBook Initialization (disk cache + re-init) | R5-A |

### D6 Telemetry — Detail

| Parent | Detail ID | Label | 출처 |
|--------|-----------|-------|------|
| `otel_pipeline` | `analytics_sink` | Analytics Sink (Datadog/1P 라우터) | R3-A |
| `otel_pipeline` | `datadog_backend` | Datadog Logs Backend (36 이벤트 화이트리스트) | R3-A |
| `otel_pipeline` | `first_party_logger` | 1P Event Logger (OTEL BatchLogRecordProcessor) | R3-A |
| `otel_pipeline` | `first_party_exporter` | 1P Exporter (HTTP + 디스크 retry) | R3-A |
| `otel_pipeline` | `bigquery_exporter` | BigQuery Metrics Exporter (5분 주기) | R3-A |
| `otel_pipeline` | `event_queue` | Event Queue (pre-sink 버퍼) | R3-A |
| `otel_pipeline` | `metadata_enricher` | Metadata Enricher (8 카테고리 부착) | R3-A |
| `otel_pipeline` | `sink_killswitch` | Sink Killswitch (per-sink 비활성화) | R3-A |
| `otel_pipeline` | `failed_event_store` | Failed Event Store (~/.claude/telemetry/) | R3-A |
| `otel_pipeline` | `privacy_level` | Privacy Level Controller (3-tier opt-out) | R3-A |
| `growthbook` | `experiment_tracker` | Experiment Exposure Tracker (dedup) | R3-A |
| `growthbook` | `disk_cache` | Disk Cache (~/.claude.json features) | R3-A |

### D9 Orchestration — Detail

| Parent | Detail ID | Label | 출처 |
|--------|-----------|-------|------|
| `agent_tool` | `fork_subagent` | Fork Subagent (parent 컨텍스트 상속) | R2-B |
| `agent_tool` | `async_lifecycle` | Async Agent Lifecycle (120초 자동 배경화) | R2-B |
| `agent_tool` | `teammate_spawn` | Teammate Spawn (팀 멤버 실행 경로) | R2-B |
| `agent_tool` | `agent_routing` | Agent Routing (Fork/Async/Team 분기) | R2-B |
| `agent_tool` | `mid_flight_bg` | Mid-flight Backgrounding (실행 중 배경 전환) | R2-B |
| `agent_tool` | `run_agent` | runAgent() (실제 에이전트 실행 함수) | R2-B |
| `agent_tool` | `builtin_agents` | Built-in Agents (6종: Explore/Plan/General 등) | R2-B |
| `agent_tool` | `agent_definition` | Agent Definition (.claude/agents/*.md) | R2-B |
| `agent_tool` | `cache_safe_params` | CacheSafeParams (byte-identical prefix 공유) | R2-B |
| `agent_tool` | `handoff_classifier` | Handoff Classifier (에이전트 전환 판단 AI) | R2-B |
| `agent_swarms` | `team_file` | TeamFile (config.json 팀 구성) | R2-A |
| `agent_swarms` | `backend_registry` | Backend Registry (3 백엔드 자동 감지) | R2-A |
| `agent_swarms` | `plan_approval` | Plan Approval Flow (코디네이터 승인) | R2-A |
| `agent_swarms` | `scratchpad` | Scratchpad Directory (팀 공유 임시 폴더) | R2-A |
| `agent_swarms` | `spawn_multi_agent` | spawnMultiAgent (팀원 병렬 생성) | R2-A |

### D10 Autonomy — Detail

| Parent | Detail ID | Label | 출처 |
|--------|-----------|-------|------|
| `proactive` | `tick_system` | Tick Awakening Loop (XML tick 주입) | R4-C |
| `proactive` | `terminal_focus` | Terminal Focus Detection (DECSET 1004) | R4-C |
| `proactive` | `context_blocking` | Context Blocking (작업 중 tick 억제) | R4-C |
| `kairos` | `channel_notifications` | MCP Channel Notifications (6-layer 게이트) | R4-C |
| `kairos` | `daemon_mode` | Daemon Supervisor (헤드리스 백그라운드) | R4-C |
| `kairos` | `github_webhooks` | GitHub PR Webhooks (subscribe_pr) | R4-C |
| `kairos` | `loop_skill` | /loop Skill (반복 감시 스킬) | R4-C |
| `cron_scheduler` | `cron_tasks` | Cron Tasks Storage (dual: file/session) | R4-C |
| `cron_scheduler` | `jitter_config` | Cron Jitter Config (thundering herd 방지) | R4-C |
| `cron_scheduler` | `scheduler_lock` | Scheduler Lock (per-project 잠금) | R4-C |
| `auto_dream` | `consolidation_lock` | Consolidation Lock (PID 기반) | R4-A |
| `auto_dream` | `dream_task` | DreamTask UI (진행 표시) | R4-A |
| `auto_dream` | `prompt_suggestion` | PromptSuggestion (드림 후 후속 제안) | R4-A |

### D11 Culture — Detail (buddy 18종)

| Parent | Detail ID | ASCII | 출처 |
|--------|-----------|-------|------|
| `ascii_sprites` | `cat` | `=·ω·=` | R5-B |
| `ascii_sprites` | `duck` | `<(· )___` | R5-B |
| `ascii_sprites` | `robot` | `[··]` | R5-B |
| `ascii_sprites` | `ghost` | `/··\` | R5-B |
| `ascii_sprites` | `dragon` | `<·~·>` | R5-B |
| `ascii_sprites` | `owl` | `(·)(·)` | R5-B |
| `ascii_sprites` | `axolotl` | `}·.·{` | R5-B |
| `ascii_sprites` | `capybara` | `(·oo·)` | R5-B |
| `ascii_sprites` | `penguin` | `(·>)` | R5-B |
| `ascii_sprites` | `octopus` | `~(··)~` | R5-B |
| `ascii_sprites` | `snail` | `·(@)` | R5-B |
| `ascii_sprites` | `turtle` | `[·_·]` | R5-B |
| `ascii_sprites` | `blob` | `( · · )` | R5-B |
| `ascii_sprites` | `mushroom` | `\|· ·\|` | R5-B |
| `ascii_sprites` | `cactus` | `\|· ·\|` | R5-B |
| `ascii_sprites` | `rabbit` | `(·..·)` | R5-B |
| `ascii_sprites` | `goose` | `(·>)` | R5-B |
| `ascii_sprites` | `chonk` | `(·.·)` | R5-B |

---

## 5. graph-data.json의 역할

### 정의

`graph-data.json`은 **Tier 1 (System) 수준의 시각화 그래프 데이터**다.

```
택소노미 전체          graph-data.json이 커버하는 범위
───────────          ─────────────────────────────

Tier 0 (Domain)      ✗ 포함하지 않음 — metadata.layers에 L1~L4만 있음
                      → 11개 도메인 구분은 category 필드로 간접 표현

Tier 1 (System)      ✓ 핵심 커버 대상 — 90개 노드 + 95개 엣지
                      → 시각화에서 클릭 가능한 노드 = Tier 1 항목

Tier 2 (Detail)      ✗ 포함하지 않음 — ~160개 상세 항목
                      → 리서치 문서(research/*.md)에만 존재
```

### 현재 상태와 한계

| 측면 | 현재 상태 | 한계 |
|------|-----------|------|
| **노드** | 90개 (Tier 1) | Tier 0(도메인)가 명시적 노드로 없음 → 시각화에서 영역 그룹핑이 `layer`+`category` 조합으로만 가능 |
| **엣지** | 95개 | 리서치 문서들이 제안한 엣지(~180+)의 약 53%만 반영. 특히 D6(텔레메트리 내부 흐름), D9(에이전트 내부 라우팅)이 sparse |
| **Tier 2 연결** | 없음 | Tier 1 노드에서 Tier 2 상세로 드릴다운하는 매핑이 JSON에 없음 → 팝업 콘텐츠를 어디서 가져올지 불명확 |
| **metadata** | `layer`, `category`, `act` | `domain` 필드가 없어서 11개 도메인 분류를 알려면 category→domain 매핑이 별도 필요 |

### graph-data.json이 해야 하는 일 (역할 정의)

```
1. 시각화 렌더링의 유일한 데이터 소스
   → D3.js/Cytoscape가 이 파일 하나만 읽고 그래프를 그린다

2. 노드 = 클릭/호버 대상
   → 각 노드가 빙산 위의 점 하나. 클릭하면 상세 팝업

3. 엣지 = 관계선
   → 노드 간 화살표. type별 색상/스타일 분기

4. 필터링 축
   → layer(L1~L4): 빙산 깊이 필터
   → act(1~5+epilogue): 내러티브 진행 필터
   → category: 기능 도메인 필터
```

### graph-data.json에 없는 것 (다른 곳에서 가져와야 하는 것)

| 필요한 데이터 | 현재 위치 | 용도 |
|--------------|-----------|------|
| Tier 2 상세 목록 | 이 문서 (taxonomy.md) §4 | 노드 클릭 시 드릴다운 콘텐츠 목록 |
| 상세 설명 텍스트 | research/*.md | 팝업/사이드패널에 표시할 분석 내용 |
| 내러티브 텍스트 | reports/*.md | "이 노드가 스토리에서 왜 중요한가" |
| 도메인 정의 | 이 문서 §2 | 시각화 영역 색상/라벨 |
| 엣지 스타일 가이드 | storytelling-blueprint.md §4.3 | 선 색상/스타일 매핑 |

---

## 6. 택소노미 커버리지 요약

```
Tier 0 — Domain:    11개 정의 완료
Tier 1 — System:    92개 정의 (graph-data.json 90 + 교차참조 2)
Tier 2 — Detail:   ~90개 정의 (이 문서에 기록된 것)
                   ~70개 미기록 (리서치 문서에 산재)
────────────────────────────
총 개념 수:         ~260개
```

| Tier | 정의 위치 | 시각화 역할 | 수량 |
|------|-----------|------------|------|
| 0 Domain | taxonomy.md §2 | 색상/영역 구분 | 11 |
| 1 System | graph-data.json nodes[] | 클릭 가능 노드 | 90 |
| 2 Detail | taxonomy.md §4 + research/*.md | 드릴다운 팝업 | ~160 |

---

*마지막 갱신: 2026-04-01*

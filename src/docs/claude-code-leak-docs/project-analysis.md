# Claude Code 소스 분석 — 전체 구조 및 인덱싱

## 프로젝트 개요

| 항목 | 내용 |
|------|------|
| **정체** | Anthropic의 공식 CLI 도구 "Claude Code"의 유출 소스 (2026-03-31) |
| **규모** | ~1,920 파일 · 512,000+ LOC |
| **언어** | TypeScript (strict mode, ES modules) |
| **런타임** | Bun 1.1.0+ (Node.js 아님) |
| **터미널 UI** | React 19 + Ink (터미널용 React 렌더러) |
| **빌드** | esbuild (번들링) · Biome (lint/format) |
| **패키지** | `@anthropic-ai/claude-code` (private, unlicensed) |

---

## 최상위 디렉토리 구조

```
claude-code-main/
├── src/                  # 핵심 소스코드 (~1,920 files)
├── mcp-server/           # MCP Explorer 서버 (별도 서브 프로젝트, Node.js)
├── prompts/              # 16개 순차 빌드 프롬프트 (재구축 가이드)
├── docs/                 # 아키텍처/도구/커맨드/서브시스템 문서
├── scripts/              # 빌드/테스트 스크립트 (esbuild, dev runner)
├── .github/              # CI/CD (typecheck + lint, npm publish)
├── Dockerfile            # 프로덕션 Docker (Bun alpine 멀티스테이지)
├── package.json          # 메인 프로젝트 설정
├── tsconfig.json         # TypeScript 설정 (ESNext, bundler moduleResolution)
├── biome.json            # Linter/Formatter 설정
├── vercel.json           # MCP 서버 Vercel 배포 설정
├── Skill.md              # 스킬 시스템 문서
└── agent.md              # 에이전트 운영 가이드
```

---

## `src/` 핵심 구조 (37개 디렉토리 + 18개 루트 파일)

### 핵심 엔진 파일 (Load-bearing files)

| 파일 | 라인 수 | 역할 |
|------|---------|------|
| **`main.tsx`** | ~4,684 | 앱 진입점 — Commander.js CLI 파서, React/Ink 렌더러, 병렬 프리페치 |
| **`QueryEngine.ts`** | ~46K | **핵심 엔진** — LLM API 스트리밍, 도구 호출 루프, thinking mode, 재시도, 토큰 카운팅 |
| **`query.ts`** | ~1,730 | 쿼리 상태 머신, 토큰 예산, 상태 전환 |
| **`Tool.ts`** | ~794 | 도구 타입 정의, 입력 스키마, 권한 모델, 진행상태 타입 |
| **`commands.ts`** | ~758 | 커맨드 레지스트리, 조건부 임포트, 모드별 필터링 |
| **`tools.ts`** | ~390 | 도구 풀 조립, MCP 도구 통합, 프리셋/필터링 |
| **`context.ts`** | ~190 | 시스템/유저 컨텍스트 수집 (OS, Git, 프로젝트 정보) |
| **`cost-tracker.ts`** | ~336 | 토큰 사용량/비용 추적 및 영속화 |

### 실행 파이프라인

```
User Input → CLI Parser (main.tsx)
           → Query Engine (QueryEngine.ts)
           → Anthropic API (services/api/)
           → Tool Execution Loop (tools/)
           → Terminal UI Render (components/ + Ink)
```

---

## 핵심 서브시스템 상세

### 1. Tool System — `src/tools/` (184 파일, 42개 도구)

`buildTool()` 팩토리 패턴으로 정의. 각 도구는 **입력 스키마(Zod) + 권한 체크 + 실행 로직 + UI 렌더링**을 갖춤.

| 카테고리 | 도구들 |
|----------|--------|
| **파일 I/O** | `FileReadTool`, `FileWriteTool`, `FileEditTool`, `NotebookEditTool`, `GlobTool`, `GrepTool` |
| **실행** | `BashTool`, `PowerShellTool`, `REPLTool` |
| **웹** | `WebFetchTool`, `WebSearchTool` |
| **에이전트** | `AgentTool`, `SendMessageTool`, `TeamCreateTool`, `TeamDeleteTool` |
| **태스크** | `TaskCreateTool`, `TaskUpdateTool`, `TaskGetTool`, `TaskListTool`, `TaskStopTool`, `TaskOutputTool` |
| **모드 전환** | `EnterPlanModeTool`, `ExitPlanModeTool`, `EnterWorktreeTool`, `ExitWorktreeTool` |
| **MCP** | `MCPTool`, `ListMcpResourcesTool`, `ReadMcpResourceTool`, `McpAuthTool`, `ToolSearchTool` |
| **스케줄링** | `ScheduleCronTool`, `RemoteTriggerTool`, `SleepTool` |
| **기타** | `SkillTool`, `LSPTool`, `ConfigTool`, `BriefTool`, `AskUserQuestionTool`, `SyntheticOutputTool`, `TodoWriteTool` |

### 2. Command System — `src/commands/` (209 파일, ~87개 커맨드)

3가지 커맨드 타입:

- **PromptCommand** — 포맷된 프롬프트를 도구와 함께 LLM에 전송
- **LocalCommand** — 인프로세스 실행, 텍스트 반환
- **LocalJSXCommand** — 인프로세스 실행, React JSX 반환

주요 커맨드: `/commit`, `/review`, `/compact`, `/mcp`, `/config`, `/doctor`, `/login`, `/memory`, `/skills`, `/tasks`, `/vim`, `/diff`, `/cost`, `/theme`, `/share`, `/resume`, `/desktop`, `/mobile`, `/pr_comments` 등

### 3. Service Layer — `src/services/` (136 파일)

| 서비스 | 파일 수 | 역할 |
|--------|---------|------|
| **mcp/** | 23 | MCP 클라이언트 연결 및 도구/리소스 탐색 |
| **api/** | 20 | Anthropic API 클라이언트, 세션 관리, 파일 업로드 |
| **compact/** | 11 | 컨텍스트 압축 (긴 대화 관리) |
| **analytics/** | 9 | GrowthBook 피처플래그 + OpenTelemetry |
| **lsp/** | 7 | Language Server Protocol 매니저 |
| **x402/** | 6 | HTTP 402 결제/빌링 |
| **oauth/** | 5 | OAuth 2.0 인증 |
| **remoteManagedSettings/** | 5 | 엔터프라이즈 원격 설정 동기화 |
| **teamMemorySync/** | 5 | 팀 메모리 동기화 |
| **autoDream/** | 4 | 자율 드리밍 기능 |
| **extractMemories/** | 2 | 자동 메모리 추출 |
| **plugins/** | 3 | 플러그인 로더 |

### 4. UI Layer — `src/components/` (146 파일)

React + Ink 기반 터미널 UI. 주요 컴포넌트:

- **App.tsx** — 루트 앱 컴포넌트
- **PromptInput/** — 사용자 입력 영역
- **Messages.tsx**, **MessageRow.tsx** — 대화 메시지 표시
- **StructuredDiff.tsx** — 파일 diff 표시
- **StatusLine.tsx** — 상태바
- **Spinner.tsx** — 로딩 인디케이터
- **ModelPicker.tsx**, **ThemePicker.tsx** — 설정 다이얼로그
- **design-system/** — 디자인 시스템 컴포넌트
- **permissions/**, **sandbox/** — 권한/샌드박스 UI

### 5. State Management — `src/state/` (6 파일)

| 파일 | 역할 |
|------|------|
| `AppState.tsx` | 메인 상태 타입 정의 |
| `AppStateStore.ts` | 스토어 구현 |
| `store.ts` | 스토어 인스턴스화 |
| `selectors.ts` | 파생 상태 셀렉터 |
| `onChangeAppState.ts` | 상태 변경 사이드이펙트 핸들러 |

### 6. Permission System — `src/hooks/toolPermission/`

4가지 권한 모드:

| 모드 | 동작 |
|------|------|
| `default` | 매 도구 호출 시 사용자 승인 요청 |
| `plan` | 전체 계획 표시 후 일괄 승인 |
| `bypassPermissions` | 자동 승인 |
| `auto` | ML 분류기가 판단 |

와일드카드 규칙 지원: `Bash(git *)`, `FileEdit(/src/*)`, `FileRead(*)`

### 7. Bridge (IDE 통합) — `src/bridge/` (32 파일)

VS Code / JetBrains와의 양방향 통신 레이어:

- JWT 기반 인증
- 메시지 라우팅 + 권한 프록시
- `BRIDGE_MODE` 피처 플래그로 게이팅

### 8. Query Pipeline — `src/query/` (5 파일)

| 파일 | 역할 |
|------|------|
| `config.ts` | 쿼리 설정 |
| `deps.ts` | 쿼리 의존성 |
| `stopHooks.ts` | 쿼리 중단 훅 |
| `tokenBudget.ts` | 토큰 예산 관리 |
| `transitions.ts` | 쿼리 상태 전환 |

### 9. 기타 주요 서브시스템

| 디렉토리 | 파일 수 | 역할 |
|----------|---------|------|
| **hooks/** | 104 | React 훅 (권한, UI, 입력, 세션, 플러그인 등 ~80개) |
| **utils/** | 564 | 유틸리티 (permissions, bash, swarm, settings, model, auth 등 31개 하위 디렉토리) |
| **ink/** | 53 | Ink 렌더러 래퍼 (components, events, hooks, layout, termio) |
| **entrypoints/** | 8+ | 진입점 (cli.tsx, init.ts, mcp.ts, sdk/) |
| **coordinator/** | 1 | 멀티 에이전트 오케스트레이션 |
| **tasks/** | 12 | 태스크 실행 (DreamTask, LocalAgentTask, RemoteAgentTask 등) |
| **memdir/** | 8 | 영속 메모리 디렉토리 시스템 |
| **skills/** | 20 | 스킬 시스템 (번들 + 커스텀 스킬) |
| **plugins/** | 2+ | 플러그인 시스템 (번들 + 서드파티) |
| **remote/** | 4 | 원격 세션 매니저, WebSocket |
| **server/** | 3 | Direct Connect 서버 |
| **voice/** | 1 | 음성 입력 피처 플래그 |
| **vim/** | 5 | Vim 모드 (motions, operators, textObjects) |
| **schemas/** | 1 | Hook JSON 스키마 (Zod) |
| **constants/** | 24 | 앱 상수 (OAuth, 프롬프트, 도구 설정 등) |
| **migrations/** | 13 | 설정 스키마 마이그레이션 |
| **screens/** | 3 | 풀스크린 UI (Doctor, REPL, ResumeConversation) |
| **keybindings/** | 16 | 키바인딩 설정 |
| **buddy/** | 8 | 컴패니언 스프라이트 (이스터에그) |
| **cli/** | 10 | CLI 인자 파싱 |

---

## 빌드 시스템

```
scripts/build-bundle.ts  →  esbuild  →  dist/cli.mjs (단일 번들)
```

- **Entry**: `src/entrypoints/cli.tsx`
- **Feature Flags**: `bun:bundle`의 `feature()` 함수로 빌드 타임 데드코드 제거
  - `PROACTIVE`, `KAIROS`, `BRIDGE_MODE`, `DAEMON`, `VOICE_MODE`, `COORDINATOR_MODE`, `WORKFLOW_SCRIPTS` 등
- **Dev**: `scripts/dev.ts` — 매크로 로드 후 CLI 진입점 직접 실행

---

## 인증 체계 (우선순위 순)

1. **Provider 선택**: `CLAUDE_CODE_USE_BEDROCK` / `VERTEX` / `FOUNDRY` → 아니면 Direct Anthropic API
2. **인증 방식**: `--bare` 모드 또는 `ANTHROPIC_API_KEY` 있으면 API Key, 아니면 OAuth
3. **API Key 해석**: 파일 디스크립터 → apiKeyHelper → 환경변수 → 시스템 키체인 → credentials 파일

---

## MCP Server 서브프로젝트 (`mcp-server/`)

Claude Code 소스를 탐색할 수 있는 **독립 MCP 서버** (Node.js 기반, npm 배포):

- **8개 도구**: `list_tools`, `list_commands`, `get_tool_source`, `get_command_source`, `read_source_file`, `search_source`, `list_directory`, `get_architecture`
- **5개 프롬프트**: `explain_tool`, `explain_command`, `architecture_overview`, `how_does_it_work`, `compare_tools`
- **Transport**: STDIO / Streamable HTTP / Legacy SSE

---

## 설계 패턴 요약

| 패턴 | 적용 위치 |
|------|-----------|
| **Tool Factory** (`buildTool()`) | 모든 도구 정의 |
| **Parallel Prefetch** | 스타트업 시 MDM, Keychain, API 병렬 로드 |
| **Lazy Loading** | OpenTelemetry, gRPC 등 무거운 모듈 동적 import |
| **Feature Flag Dead Code** | `bun:bundle`의 `feature()` 함수 |
| **React Context + Store** | AppState + 셀렉터 기반 상태 관리 |
| **Permission Middleware** | 모든 도구 호출에 `checkPermissions()` |
| **Streaming UI** | QueryEngine 스트리밍 → React 컴포넌트 실시간 렌더 |
| **Agent Swarm** | AgentTool + coordinator로 멀티에이전트 오케스트레이션 |

---

## 핵심 의존성

| 패키지 | 용도 |
|--------|------|
| `@anthropic-ai/sdk` 0.39.0 | Anthropic API 클라이언트 |
| `@modelcontextprotocol/sdk` 1.12.1 | MCP 프로토콜 |
| `react` 19 + `react-reconciler` | 터미널 UI |
| `@commander-js/extra-typings` | CLI 파싱 |
| `zod` 3.24 | 스키마 검증 |
| `@growthbook/growthbook` | 피처 플래그 |
| `@opentelemetry/*` | 텔레메트리 |
| `chalk`, `highlight.js`, `marked` | 터미널 스타일링/마크다운 |
| `fuse.js` | 퍼지 검색 |
| `ws` | WebSocket |
| `execa` | 프로세스 실행 |
| `chokidar` | 파일 워치 |

---

> 이 프로젝트는 **LLM 기반 코딩 에이전트의 가장 완성도 높은 프로덕션 구현체** 중 하나로, 도구 시스템 · 권한 모델 · 멀티에이전트 · IDE 통합 · 원격 실행 · 플러그인/스킬 확장 등 거의 모든 에이전트 패턴을 포함하고 있습니다.

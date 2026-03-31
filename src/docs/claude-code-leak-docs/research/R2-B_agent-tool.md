# R2-B: Agent Tool / SubAgent 시스템 분석

## 파일: `src/tools/AgentTool/` (19개 파일)

---

## 핵심 발견

### 핵심 파일

| 파일 | 줄 수 (추정) | 역할 |
|------|------------|------|
| `src/tools/AgentTool/AgentTool.tsx` | ~1,400 | Agent 도구 메인 진입점 (스키마, call(), 라우팅) |
| `src/tools/AgentTool/runAgent.ts` | ~975 | 서브에이전트 실행 루프 (query 호출, 메시지 수집) |
| `src/tools/AgentTool/agentToolUtils.ts` | ~690 | 도구 필터링, 결과 생성, 비동기 라이프사이클 |
| `src/tools/AgentTool/forkSubagent.ts` | ~212 | Fork 서브에이전트 (부모 컨텍스트 상속) |
| `src/tools/AgentTool/resumeAgent.ts` | ~266 | 중단된 에이전트 이력 기반 재개 |
| `src/tools/AgentTool/loadAgentsDir.ts` | ~756 | 에이전트 정의 로딩 (빌트인/커스텀/플러그인) |
| `src/tools/AgentTool/builtInAgents.ts` | ~73 | 빌트인 에이전트 레지스트리 |
| `src/tools/AgentTool/constants.ts` | ~13 | 도구명, 레거시 별명, 원샷 타입 |
| `src/tools/AgentTool/prompt.ts` | ~288 | Agent 도구 시스템 프롬프트 생성 |
| `src/tools/AgentTool/agentMemory.ts` | ~179 | 에이전트 영속 메모리 (user/project/local) |
| `src/tools/AgentTool/agentColorManager.ts` | ~67 | 에이전트 UI 색상 관리 |
| `src/tools/AgentTool/agentDisplay.ts` | ~106 | 에이전트 표시 유틸리티 (소스 그룹, 오버라이드 해석) |
| `src/tools/AgentTool/built-in/generalPurposeAgent.ts` | ~35 | 범용 에이전트 정의 |
| `src/tools/AgentTool/built-in/exploreAgent.ts` | ~84 | 코드 탐색 전용 에이전트 |
| `src/tools/AgentTool/built-in/planAgent.ts` | ~93 | 아키텍처 설계 에이전트 |
| `src/tools/AgentTool/built-in/verificationAgent.ts` | ~153 | 구현 검증 에이전트 |
| `src/tools/AgentTool/built-in/claudeCodeGuideAgent.ts` | ~206 | Claude Code/SDK/API 가이드 에이전트 |
| `src/tools/AgentTool/built-in/statuslineSetup.ts` | ~145 | 상태줄 설정 에이전트 |
| `src/utils/forkedAgent.ts` | - | 포크 에이전트 실행, CacheSafeParams, 컨텍스트 격리 |
| `src/utils/worktree.ts` | ~1,160 | Git Worktree 생성/제거/변경감지 |
| `src/tools/shared/spawnMultiAgent.ts` | - | 팀메이트 스폰 (Tmux/iTerm2/In-process) |
| `src/tools/SendMessageTool/SendMessageTool.ts` | - | 에이전트 간 메시지 전달 |
| `src/constants/tools.ts` | - | 에이전트 허용/차단 도구 목록 |

---

## 1. Agent 도구 아키텍처 개요

### 1.1 입력 스키마

```
AgentToolInput {
  description: string        // 3-5 단어 태스크 설명
  prompt: string             // 에이전트에게 전달할 전체 지시
  subagent_type?: string     // 전문 에이전트 타입 (생략 시 fork 또는 general-purpose)
  model?: 'sonnet'|'opus'|'haiku'  // 모델 오버라이드
  run_in_background?: boolean      // 비동기 실행
  name?: string              // 이름 (SendMessage 라우팅용)
  team_name?: string         // 팀 스폰 시 팀 이름
  mode?: PermissionMode      // 'plan' 등 권한 모드
  isolation?: 'worktree'|'remote'  // 격리 모드
  cwd?: string               // 작업 디렉토리 오버라이드
}
```

### 1.2 출력 스키마

```
// 동기 완료
{
  status: 'completed',
  agentId: string,
  agentType?: string,
  content: [{type: 'text', text: string}],
  totalToolUseCount: number,
  totalDurationMs: number,
  totalTokens: number,
  usage: { input_tokens, output_tokens, cache_*, server_tool_use, service_tier }
}

// 비동기 실행
{
  status: 'async_launched',
  agentId: string,
  description: string,
  prompt: string,
  outputFile: string,         // TaskOutput으로 진행 확인 가능
  canReadOutputFile?: boolean
}

// 팀메이트 스폰 (내부)
{ status: 'teammate_spawned', ... }

// 원격 실행 (ant-only)
{ status: 'remote_launched', taskId, sessionUrl, ... }
```

---

## 2. 에이전트 생성 흐름 (call 함수)

### 2.1 라우팅 결정 트리

```
AgentTool.call()
  │
  ├── team_name + name 있음?
  │   └── YES → spawnTeammate() → teammate_spawned 반환
  │
  ├── subagent_type 결정
  │   ├── 명시적 지정 → 해당 에이전트 사용
  │   ├── 미지정 + FORK_SUBAGENT 활성 → FORK_AGENT (fork 경로)
  │   └── 미지정 + FORK 비활성 → GENERAL_PURPOSE_AGENT
  │
  ├── isolation === 'remote'? (ant-only)
  │   └── teleportToRemote() → remote_launched 반환
  │
  ├── isolation === 'worktree'?
  │   └── createAgentWorktree(slug) → 격리된 작업 복사본 생성
  │
  ├── shouldRunAsync? (background/coordinator/fork/proactive)
  │   ├── YES → registerAsyncAgent() + void runAsyncAgentLifecycle()
  │   │         → async_launched 즉시 반환
  │   └── NO  → 동기 실행 루프 (Race: message vs background signal)
  │             → completed 반환
  │
  └── 동기 실행 중 backgrounded?
      └── YES → runAgent 재시작(isAsync=true) → async_launched 반환
```

### 2.2 비동기 전환 조건 (`shouldRunAsync`)

다음 중 하나라도 참이면 비동기 실행:

| 조건 | 설명 |
|------|------|
| `run_in_background === true` | 사용자 명시적 요청 |
| `selectedAgent.background === true` | 에이전트 정의에 background 플래그 |
| `isCoordinator` | 코디네이터 모드 |
| `isForkSubagentEnabled()` | Fork 실험 활성 → **모든** 스폰 비동기 |
| `assistantForceAsync` (KAIROS) | 어시스턴트 모드 |
| `proactiveModule?.isProactiveActive()` | 프로액티브 모드 |

비활성 조건: `isBackgroundTasksDisabled` (`CLAUDE_CODE_DISABLE_BACKGROUND_TASKS`)

---

## 3. Fork 에이전트 vs 일반 에이전트

### 3.1 Fork 경로 (`isForkSubagentEnabled()`)

**게이트 조건**: `FORK_SUBAGENT` 피처 활성 + 비-코디네이터 + 비-SDK

| 속성 | Fork 에이전트 | 일반 에이전트 |
|------|-------------|-------------|
| **컨텍스트** | 부모 대화 전체 상속 | 빈 컨텍스트에서 시작 |
| **시스템 프롬프트** | 부모의 렌더링된 시스템 프롬프트 그대로 | 자체 `getSystemPrompt()` |
| **도구 풀** | 부모의 정확한 도구 풀 (`useExactTools`) | 독립 `assembleToolPool()` |
| **thinking** | 부모의 thinkingConfig 상속 | `disabled` |
| **모델** | 부모 모델 상속 (`model: 'inherit'`) | 에이전트 정의의 모델 또는 기본값 |
| **permissionMode** | `bubble` (부모 터미널에 표시) | 에이전트 정의 값 또는 `acceptEdits` |
| **maxTurns** | 200 | 에이전트 정의 값 |
| **프롬프트 캐시** | 부모와 동일 API prefix → 캐시 히트 | 독립 캐시 체인 |
| **재귀 방지** | `isInForkChild()` 검사 (fork 자식 내부에서 fork 불가) | AgentTool 자체가 도구 풀에서 제외 |

### 3.2 Fork 메시지 구조 (`buildForkedMessages`)

```
[
  assistantMessage (모든 tool_use 블록 포함, 원본 복제),
  userMessage {
    tool_result[] (각 tool_use에 대해 "Fork started — processing in background"),
    text: "<fork_boilerplate>STOP. READ THIS FIRST...지시사항...</fork_boilerplate>
           [fork_directive]실제 지시문"
  }
]
```

**핵심 설계**: 모든 fork 자식이 동일한 placeholder tool_result를 사용 → 마지막 text 블록만 다름 → **바이트 동일 API prefix** → 프롬프트 캐시 공유 극대화

### 3.3 Fork Boilerplate 규칙

Fork 자식에게 주입되는 10개 규칙:
1. 하위 에이전트 스폰 금지 (직접 실행)
2. 대화/질문 금지
3. 메타 코멘터리 금지
4. 도구 직접 사용
5. 파일 수정 시 커밋 후 해시 포함
6. 도구 호출 사이에 텍스트 출력 금지
7. 지시 범위 내에서만 작업
8. 보고서 500단어 이하
9. "Scope:"로 시작
10. 구조화된 사실 보고 후 중지

---

## 4. 에이전트 타입 시스템

### 4.1 에이전트 정의 타입 계층

```
AgentDefinition = BuiltInAgentDefinition | CustomAgentDefinition | PluginAgentDefinition

BaseAgentDefinition {
  agentType: string              // 고유 식별자
  whenToUse: string              // 사용 시기 설명 (프롬프트에 포함)
  tools?: string[]               // 허용 도구 ('*' = 전체, 미지정 = 전체)
  disallowedTools?: string[]     // 차단 도구
  skills?: string[]              // 사전 로드할 스킬
  mcpServers?: AgentMcpServerSpec[]  // 에이전트 전용 MCP 서버
  hooks?: HooksSettings          // 세션 스코프 훅
  color?: AgentColorName         // UI 색상
  model?: string                 // 모델 ('inherit' = 부모 상속)
  effort?: EffortValue           // 노력 수준
  permissionMode?: PermissionMode // 권한 모드 오버라이드
  maxTurns?: number              // 최대 턴 수
  background?: boolean           // 항상 백그라운드 실행
  initialPrompt?: string         // 첫 턴에 앞에 추가
  memory?: 'user'|'project'|'local'  // 영속 메모리 스코프
  isolation?: 'worktree'|'remote'    // 격리 모드
  omitClaudeMd?: boolean         // CLAUDE.md 제외 (읽기 전용 에이전트)
  requiredMcpServers?: string[]  // 필수 MCP 서버 패턴
  criticalSystemReminder_EXPERIMENTAL?: string  // 매 턴 재주입 메시지
}

BuiltInAgentDefinition extends Base {
  source: 'built-in'
  baseDir: 'built-in'
  callback?: () => void
  getSystemPrompt: (params: { toolUseContext }) => string  // 동적 프롬프트
}

CustomAgentDefinition extends Base {
  source: SettingSource  // 'userSettings' | 'projectSettings' | 'policySettings' | 'flagSettings'
  getSystemPrompt: () => string  // 마크다운 본문
}

PluginAgentDefinition extends Base {
  source: 'plugin'
  plugin: string
  getSystemPrompt: () => string
}
```

### 4.2 빌트인 에이전트 목록

| 에이전트 타입 | 모델 | 도구 | 역할 | 특수 속성 |
|-------------|------|------|------|----------|
| `general-purpose` | 기본 서브에이전트 모델 | `['*']` | 범용 작업 실행 | 기본 fallback |
| `Explore` | haiku (외부), inherit (ant) | Glob, Grep, Read, Bash 등 | 읽기 전용 코드 탐색 | `omitClaudeMd: true` |
| `Plan` | inherit | Explore와 동일 | 읽기 전용 아키텍처 설계 | `omitClaudeMd: true` |
| `verification` | inherit | Bash, Read (편집 도구 차단) | 구현 검증 (PASS/FAIL/PARTIAL) | `background: true`, `color: 'red'` |
| `claude-code-guide` | haiku | Read, WebFetch, WebSearch 등 | Claude Code/SDK/API 가이드 | `permissionMode: 'dontAsk'` |
| `statusline-setup` | sonnet | Read, Edit | 상태줄 설정 | `color: 'orange'` |
| `fork` (합성) | inherit | `['*']` | 부모 컨텍스트 포크 | `permissionMode: 'bubble'`, `maxTurns: 200` |

**ONE_SHOT_BUILTIN_AGENT_TYPES**: `Explore`, `Plan` — SendMessage 힌트 생략으로 토큰 절약

### 4.3 커스텀 에이전트 정의 방식

**마크다운 파일** (`.claude/agents/*.md`):
```yaml
---
name: my-agent
description: 이 에이전트의 사용 시기
tools: [Bash, Read, Write]
disallowedTools: [Agent]
model: sonnet
permissionMode: acceptEdits
maxTurns: 50
background: true
memory: project
isolation: worktree
color: blue
skills: [my-skill]
mcpServers: [slack]
hooks:
  SubagentStart:
    - command: echo "started"
---
에이전트 시스템 프롬프트 본문...
```

**JSON 설정** (`settings.json`의 `agents` 키):
```json
{
  "my-agent": {
    "description": "사용 시기",
    "prompt": "시스템 프롬프트",
    "tools": ["Bash", "Read"],
    "model": "haiku",
    "maxTurns": 30
  }
}
```

### 4.4 에이전트 우선순위 (덮어쓰기 순서)

```
built-in → plugin → userSettings → projectSettings → flagSettings → policySettings
```

동일 `agentType`이면 나중 소스가 이전 소스를 덮어씀 (`getActiveAgentsFromList`).

---

## 5. 서브에이전트 실행 (`runAgent`)

### 5.1 실행 파이프라인

```
runAgent(params)
  ├── 1. 모델 해석 (getAgentModel)
  ├── 2. agentId 생성 (createAgentId)
  ├── 3. 컨텍스트 메시지 구성
  │     ├── forkContextMessages? → filterIncompleteToolCalls() + clone
  │     └── promptMessages (사용자 프롬프트)
  ├── 4. 파일 상태 캐시 (clone 또는 새로 생성)
  ├── 5. userContext / systemContext 준비
  │     ├── omitClaudeMd? → CLAUDE.md 제거 (Explore/Plan)
  │     └── Explore/Plan → gitStatus도 제거
  ├── 6. 권한 모드 결정
  │     ├── agentDefinition.permissionMode (bypassPermissions/acceptEdits/auto는 부모 우선)
  │     ├── isAsync → shouldAvoidPermissionPrompts = true
  │     └── bubble 모드 → 부모 터미널에 권한 프롬프트 표시
  ├── 7. 도구 해석 (resolveAgentTools / useExactTools)
  ├── 8. 시스템 프롬프트 구성
  │     ├── override.systemPrompt? → 그대로 사용 (fork 경로)
  │     └── getAgentSystemPrompt() + enhanceSystemPromptWithEnvDetails()
  ├── 9. AbortController 결정
  │     ├── override → 오버라이드 값
  │     ├── isAsync → 새 독립 컨트롤러
  │     └── sync → 부모 공유
  ├── 10. SubagentStart 훅 실행
  ├── 11. 프론트매터 훅 등록
  ├── 12. 스킬 사전 로드
  ├── 13. 에이전트 전용 MCP 서버 초기화
  ├── 14. createSubagentContext() → 격리된 ToolUseContext
  ├── 15. onCacheSafeParams 콜백 (요약 생성용)
  ├── 16. 초기 트랜스크립트 기록
  │
  ├── 17. query() 루프 ← 핵심
  │     for await (message of query({
  │       messages, systemPrompt, userContext, systemContext,
  │       canUseTool, toolUseContext, querySource,
  │       maxTurns: maxTurns ?? agentDefinition.maxTurns
  │     }))
  │       ├── stream_event (message_start) → TTFT 메트릭 전달
  │       ├── attachment (max_turns_reached) → 루프 종료
  │       ├── recordable message → 사이드체인 트랜스크립트 기록 + yield
  │       └── abort → AbortError
  │
  └── 18. 정리 (finally)
        ├── MCP 서버 정리
        ├── 세션 훅 정리
        ├── 프롬프트 캐시 추적 정리
        ├── 파일 상태 캐시 해제
        ├── initialMessages 해제
        ├── Perfetto 에이전트 해제
        ├── todos 엔트리 해제
        ├── 배경 bash 태스크 종료
        └── MonitorMcp 태스크 종료
```

### 5.2 createSubagentContext (격리된 컨텍스트 생성)

`src/utils/forkedAgent.ts`의 `createSubagentContext()`:

```
부모 ToolUseContext로부터:

격리되는 것 (기본값):
  - readFileState: cloned
  - abortController: 자식 컨트롤러 (부모 abort 전파)
  - nestedMemoryAttachmentTriggers: 새 Set
  - toolDecisions: undefined
  - contentReplacementState: cloned
  - setAppState: no-op (shareSetAppState로 공유 가능)
  - setResponseLength: no-op (shareSetResponseLength로 공유 가능)
  - UI 콜백: undefined (addNotification, setToolJSX, etc.)

공유되는 것:
  - setAppStateForTasks: 항상 루트 스토어 연결
  - updateAttributionState: 부모와 공유
  - fileReadingLimits: 부모와 동일
  - queryTracking: depth 증가 (부모 depth + 1)
```

---

## 6. 도구 필터링 및 제한

### 6.1 도구 차단 계층

```
ALL_AGENT_DISALLOWED_TOOLS (모든 에이전트):
  - TaskOutput, ExitPlanMode, EnterPlanMode
  - Agent (외부 빌드에서만, ant는 허용)
  - AskUserQuestion, TaskStop
  - Workflow (WORKFLOW_SCRIPTS 피처)

CUSTOM_AGENT_DISALLOWED_TOOLS (커스텀 에이전트):
  - ALL_AGENT_DISALLOWED_TOOLS 전체

ASYNC_AGENT_ALLOWED_TOOLS (비동기 에이전트 허용 목록):
  - Read, WebSearch, TodoWrite, Grep, WebFetch, Glob
  - Bash/PowerShell, Edit, Write, NotebookEdit
  - Skill, SyntheticOutput, ToolSearch
  - EnterWorktree, ExitWorktree

IN_PROCESS_TEAMMATE_ALLOWED_TOOLS (인프로세스 팀메이트 추가):
  - TaskCreate, TaskGet, TaskList, TaskUpdate
  - SendMessage
  - CronCreate, CronDelete, CronList (AGENT_TRIGGERS)
```

### 6.2 resolveAgentTools 로직

```
resolveAgentTools(agentDefinition, availableTools, isAsync)
  ├── 1. filterToolsForAgent()
  │     ├── MCP 도구 (mcp__*): 항상 허용
  │     ├── ExitPlanMode: plan 모드일 때만 허용
  │     ├── ALL_AGENT_DISALLOWED_TOOLS: 차단
  │     ├── CUSTOM_AGENT_DISALLOWED_TOOLS: 커스텀 에이전트만 차단
  │     └── isAsync → ASYNC_AGENT_ALLOWED_TOOLS 화이트리스트
  │
  ├── 2. disallowedTools 제거
  │
  └── 3. 에이전트 tools 해석
        ├── undefined 또는 ['*'] → 전체 허용
        └── 명시적 목록 → availableToolMap에서 매칭
            └── Agent(x,y) 구문 → allowedAgentTypes 파싱
```

---

## 7. 에이전트 간 통신

### 7.1 SendMessage 도구

`src/tools/SendMessageTool/SendMessageTool.ts`:

**입력**:
```
{
  to: string,       // 수신자: 팀메이트 이름, "*" (브로드캐스트), "uds:<socket>", "bridge:<session>"
  summary?: string,  // UI 미리보기 (문자열 메시지 시 필수)
  message: string | StructuredMessage
}
```

**StructuredMessage 타입**:
- `shutdown_request`: 종료 요청
- `shutdown_response`: 종료 승인/거부
- `plan_approval_response`: 계획 승인/거부

### 7.2 메시지 라우팅 경로

```
SendMessage.call()
  ├── bridge: 주소 → postInterClaudeMessage() (크로스 세션)
  ├── uds: 주소 → sendToUdsSocket() (로컬 피어)
  │
  ├── 문자열 메시지 + 이름/ID로 보내기:
  │   ├── agentNameRegistry에서 검색 → agentId 확인
  │   ├── LocalAgentTask(running) → queuePendingMessage() (큐에 추가)
  │   ├── LocalAgentTask(stopped) → resumeAgentBackground() (자동 재개)
  │   └── 태스크 없음 → resumeAgentBackground() (디스크 트랜스크립트에서 재개)
  │
  ├── "*" → handleBroadcast() (팀 전체)
  └── 이름 → handleMessage() → writeToMailbox()
```

### 7.3 Mailbox 기반 통신 (팀메이트)

```
writeToMailbox(recipientName, { from, text, summary, timestamp, color }, teamName)
  → 파일 기반 메일박스에 메시지 기록
  → 수신 팀메이트의 inbox poller가 폴링하여 수신
  → 첫 번째 메시지로 제출
```

### 7.4 에이전트 이름 레지스트리

```
AppState.agentNameRegistry: Map<string, AgentId>
  - 비동기 에이전트 등록 시 name → agentId 매핑
  - SendMessage(to: name) → agentId 검색
  - 실행 중 에이전트에 queuePendingMessage()
  - 중단된 에이전트 자동 재개
```

---

## 8. Worktree 격리

### 8.1 `createAgentWorktree(slug)`

```
createAgentWorktree("agent-<agentId[:8]>")
  ├── validateWorktreeSlug() → 경로 탈출 방지
  ├── hasWorktreeCreateHook()?
  │   └── YES → executeWorktreeCreateHook() → { worktreePath, hookBased: true }
  └── NO → Git 기반
      ├── findCanonicalGitRoot() → 메인 저장소 루트 (중첩 방지)
      ├── getOrCreateWorktree(gitRoot, slug)
      │   → <gitRoot>/.claude/worktrees/<slug>/
      │   → 임시 브랜치 생성
      ├── performPostCreationSetup() → .claude/settings 심볼릭 링크 등
      └── { worktreePath, worktreeBranch, headCommit, gitRoot }
```

### 8.2 Worktree 정리

```
cleanupWorktreeIfNeeded()
  ├── hookBased? → 항상 유지 (변경 감지 불가)
  ├── hasWorktreeChanges(worktreePath, headCommit)?
  │   ├── NO → removeAgentWorktree() (git worktree remove + 브랜치 삭제)
  │   └── YES → 유지 (경로와 브랜치 반환)
  └── 메타데이터 업데이트 (worktreePath 제거 또는 유지)
```

### 8.3 Fork + Worktree 조합

Fork 에이전트가 worktree에서 실행될 때:
1. `buildForkedMessages()` → fork 지시 메시지 생성
2. `buildWorktreeNotice(parentCwd, worktreeCwd)` → 경로 변환 안내 주입
3. 자식 에이전트는 부모 경로를 worktree 경로로 변환 필요

```
"You've inherited the conversation context above from a parent agent working in
${parentCwd}. You are operating in an isolated git worktree at ${worktreeCwd}..."
```

---

## 9. 리소스 제한

### 9.1 턴 수 제한 (`maxTurns`)

| 소스 | 기본값 | 적용 |
|------|--------|------|
| 에이전트 정의 `maxTurns` | 없음 (query.ts 기본값 적용) | `runAgent` → `query({ maxTurns })` |
| Fork 에이전트 | 200 | `FORK_AGENT.maxTurns = 200` |
| `runAgent` 파라미터 | `maxTurns ?? agentDefinition.maxTurns` | 파라미터 우선 |
| 마크다운/JSON 정의 | `maxTurns: <양의 정수>` | `parsePositiveIntFromFrontmatter()` |

`query.ts`에서 `maxTurns` 초과 시 `attachment({ type: 'max_turns_reached' })` 방출 → `runAgent`가 루프 종료.

### 9.2 토큰 예산

- `maxOutputTokens` (ForkedAgentParams): 출력 토큰 제한 (캐시 공유 주의)
- `maxBudgetUsd` (QueryEngine): USD 기반 예산 제한 (에이전트 레벨이 아닌 세션 레벨)
- 에이전트 별 토큰 추적: `getTokenCountFromUsage()` → `finalizeAgentTool()`에서 합산

### 9.3 자동 백그라운드 전환

```
getAutoBackgroundMs(): number
  ├── CLAUDE_AUTO_BACKGROUND_TASKS=true → 120_000ms (2분)
  ├── tengu_auto_background_agents 피처 → 120_000ms
  └── 기본: 0 (비활성)
```

동기 에이전트가 2분 이상 실행되면 자동으로 백그라운드로 전환.

### 9.4 비동기 에이전트 라이프사이클 (`runAsyncAgentLifecycle`)

```
runAsyncAgentLifecycle()
  ├── createProgressTracker() → 진행 추적
  ├── onCacheSafeParams → startAgentSummarization() (주기적 요약)
  ├── for await (message of makeStream())
  │     ├── 메시지 저장
  │     ├── 태스크 retain 시 AppState에 추가
  │     ├── updateProgressFromMessage()
  │     ├── updateAsyncAgentProgress()
  │     └── emitTaskProgress() (SDK tool_progress)
  ├── 완료 시:
  │     ├── finalizeAgentTool() → 결과 생성
  │     ├── completeAsyncAgent() → 상태 전이 (먼저!)
  │     ├── classifyHandoffIfNeeded() → 보안 분류
  │     └── enqueueAgentNotification() → 완료 알림
  ├── AbortError 시:
  │     ├── killAsyncAgent() → 상태 전이
  │     ├── extractPartialResult() → 부분 결과 추출
  │     └── enqueueAgentNotification({ status: 'killed' })
  └── 기타 에러 시:
        ├── failAsyncAgent()
        └── enqueueAgentNotification({ status: 'failed' })
```

---

## 10. 팀메이트 스폰 시스템

### 10.1 spawnTeammate 경로

```
spawnTeammate(config, context)
  └── handleSpawn()
      ├── isInProcessEnabled()? → handleSpawnInProcess()
      │     └── spawnInProcessTeammate() + startInProcessTeammate()
      │         → 동일 Node.js 프로세스, AsyncLocalStorage
      │
      ├── detectAndGetBackend() 성공?
      │   ├── iTerm2 → createTeammatePaneInSwarmView() (네이티브 분할)
      │   └── tmux → createTeammatePaneInSwarmView() (tmux 분할)
      │         → sendCommandToPane() (claude 바이너리 실행)
      │
      └── 백엔드 없음 (auto 모드) → handleSpawnInProcess() 폴백
```

### 10.2 팀메이트 등록 흐름

1. 고유 이름 생성 (`generateUniqueTeammateName`)
2. 에이전트 ID 생성 (`formatAgentId(name, teamName)`)
3. 색상 할당 (`assignTeammateColor`)
4. 팀 파일에 등록 (`writeTeamFileAsync`)
5. AppState.teamContext에 추적
6. 초기 지시 전달:
   - tmux/iTerm2: `writeToMailbox()` → inbox poller 수신
   - in-process: `startInProcessTeammate()` 직접 전달

### 10.3 팀메이트 CLI 인자

```
--agent-id <id>
--agent-name <name>
--team-name <teamName>
--agent-color <color>
--parent-session-id <sessionId>
--plan-mode-required (선택)
--agent-type <type> (선택)
```

상속되는 플래그: `--dangerously-skip-permissions`, `--permission-mode`, `--model`, `--settings`, `--plugin-dir`, `--chrome`/`--no-chrome`

---

## 11. 에이전트 재개 (`resumeAgentBackground`)

```
resumeAgentBackground({ agentId, prompt, ... })
  ├── getAgentTranscript() → 디스크에서 이전 대화 복원
  ├── readAgentMetadata() → agentType, worktreePath, description
  ├── 메시지 필터링:
  │     filterWhitespaceOnlyAssistantMessages()
  │     filterOrphanedThinkingOnlyMessages()
  │     filterUnresolvedToolUses()
  ├── contentReplacementState 재구성
  ├── worktreePath 존재 확인 (없으면 부모 cwd 폴백)
  ├── 에이전트 정의 결정:
  │     ├── fork → FORK_AGENT
  │     ├── meta.agentType → 매칭되는 정의
  │     └── 없으면 → GENERAL_PURPOSE_AGENT
  ├── registerAsyncAgent()
  └── void runAsyncAgentLifecycle() (백그라운드 실행)
```

**용도**: `SendMessage(to: stoppedAgent)` → 자동 재개

---

## 12. 보안 및 안전장치

### 12.1 핸드오프 분류기 (`classifyHandoffIfNeeded`)

`TRANSCRIPT_CLASSIFIER` 피처 활성 + `auto` 모드일 때:
- 서브에이전트 작업 완료 시 안전성 분류
- `classifyYoloAction()` → `shouldBlock` 판단
- 차단 시: "SECURITY WARNING" 메시지 추가
- 분류기 불가 시: "safety classifier was unavailable" 경고

### 12.2 권한 격리

```
agentGetAppState()
  ├── agentPermissionMode 적용 (bypassPermissions/acceptEdits/auto는 부모 우선)
  ├── shouldAvoidPermissionPrompts: 비동기 에이전트는 true
  ├── bubble 모드: 부모 터미널에 프롬프트 전달
  ├── awaitAutomatedChecksBeforeDialog: 비동기 + 프롬프트 가능 시
  └── allowedTools: 제공 시 세션 규칙 대체 (SDK cliArg 보존)
```

### 12.3 재귀 방지

| 메커니즘 | 대상 | 구현 |
|---------|------|------|
| `ALL_AGENT_DISALLOWED_TOOLS` | Agent 도구 | 외부 빌드에서 서브에이전트의 Agent 도구 차단 |
| `isInForkChild()` | Fork 재귀 | 메시지에 `<fork_boilerplate>` 태그 검색 |
| `querySource` 검사 | Fork 재귀 | `options.querySource === 'agent:builtin:fork'` |
| 팀메이트 제한 | 팀메이트 중첩 | `isTeammate() && name` → 에러 |

### 12.4 Plugin-only 정책

`strictPluginOnlyCustomization` 설정 시:
- 사용자 에이전트의 프론트매터 MCP 서버 차단
- 사용자 에이전트의 프론트매터 훅 차단
- 플러그인/빌트인/정책 에이전트는 허용 (admin-trusted)

---

## 13. 프롬프트 캐시 최적화

### 13.1 CacheSafeParams

```typescript
type CacheSafeParams = {
  systemPrompt: SystemPrompt       // 시스템 프롬프트 (캐시 키)
  userContext: { [k: string]: string }   // 사용자 컨텍스트
  systemContext: { [k: string]: string } // 시스템 컨텍스트
  toolUseContext: ToolUseContext    // 도구, 모델, 옵션
  forkContextMessages: Message[]   // 부모 컨텍스트 메시지
}
```

- Fork 경로: 부모의 렌더링된 시스템 프롬프트를 그대로 전달 → 바이트 동일 prefix
- 요약 생성: `startAgentSummarization(taskId, agentId, cacheSafeParams)` → 별도 API 호출로 주기적 요약
- `lastCacheSafeParams`: 전역 슬롯에 저장 → post-turn fork가 부모 캐시 공유

### 13.2 Thinking 설정

```
Fork 경로 (useExactTools):
  thinkingConfig: 부모에서 상속 (캐시 동일성)

일반 에이전트:
  thinkingConfig: { type: 'disabled' }  // 출력 토큰 비용 제어
```

---

## 14. 에이전트 트랜스크립트 기록

```
recordSidechainTranscript(messages, agentId, lastRecordedUuid?)
  → 세션 저장소에 에이전트 대화 기록
  → 메시지별 O(1) 추가 (전체 대화 재기록 아님)
  → 재개 시 getAgentTranscript()로 복원

writeAgentMetadata(agentId, { agentType, worktreePath, description })
  → 에이전트 메타데이터 영속화
  → 재개 시 readAgentMetadata()로 복원
```

---

## 15. 주요 설계 패턴 요약

### 15.1 동기→비동기 전환 (Mid-flight Backgrounding)

동기 에이전트가 실행 중에 사용자가 백그라운드로 보낼 수 있음:
1. `registerAgentForeground()` → 포그라운드 태스크 등록 + `backgroundSignal` 생성
2. `Promise.race([nextMessage, backgroundSignal])` → 매 메시지마다 레이스
3. `backgroundSignal` 승리 시:
   - 기존 이터레이터 `.return()` (정리)
   - 새 `runAgent(isAsync: true)` 시작
   - `async_launched` 즉시 반환

### 15.2 에이전트 MCP 서버

에이전트가 자체 MCP 서버를 정의할 수 있음:
```yaml
mcpServers:
  - slack              # 기존 서버 참조 (이름)
  - my-server:         # 인라인 정의
      command: node
      args: [server.js]
```

- 참조형: 부모의 memoized 연결 공유 (정리 불필요)
- 인라인형: 에이전트 종료 시 cleanup

### 15.3 에이전트 메모리

```
memory: 'user' | 'project' | 'local'

loadAgentMemoryPrompt(agentType, scope)
  → 영속 메모리 파일 로드
  → 시스템 프롬프트에 추가

checkAgentMemorySnapshot()
  → 프로젝트 스냅샷과 비교
  → 'initialize': 스냅샷에서 초기화
  → 'prompt-update': 새 스냅샷 사용 가능 알림

메모리 디렉토리 경로:
  - user:    ~/.claude/agent-memory/<agentType>/MEMORY.md
  - project: <cwd>/.claude/agent-memory/<agentType>/MEMORY.md
  - local:   <cwd>/.claude/agent-memory-local/<agentType>/MEMORY.md
  - (CLAUDE_CODE_REMOTE_MEMORY_DIR 설정 시 원격 마운트 경로)
```

### 15.4 에이전트 색상 시스템 (`agentColorManager.ts`)

```
AgentColorName = 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'orange' | 'pink' | 'cyan'

setAgentColor(agentType, color)
  → getAgentColorMap() (전역 Map) 에 저장
  → 에이전트 로드 시 (getActiveAgentsFromList) 및 선택 시 초기화

getAgentColor(agentType)
  → AGENT_COLOR_TO_THEME_COLOR 매핑 (예: 'red' → 'red_FOR_SUBAGENTS_ONLY')
  → general-purpose는 색상 없음 (undefined)
```

### 15.5 에이전트 표시 유틸리티 (`agentDisplay.ts`)

에이전트 소스 그룹 표시 순서:
```
AGENT_SOURCE_GROUPS:
  1. User agents (userSettings)
  2. Project agents (projectSettings)
  3. Local agents (localSettings)
  4. Managed agents (policySettings)
  5. Plugin agents (plugin)
  6. CLI arg agents (flagSettings)
  7. Built-in agents (built-in)
```

`resolveAgentOverrides(allAgents, activeAgents)`:
- 동일 `agentType`의 복수 소스 에이전트를 비교
- 낮은 우선순위 에이전트에 `overriddenBy` 소스 표기
- `(agentType, source)` 기준 중복 제거 (worktree 중복 방지)

### 15.6 에이전트 알림 인터랙션 모델

```
비동기 에이전트 완료 시:
  enqueueAgentNotification()
    → AppState.pendingAgentNotifications에 추가
    → 메인 루프의 다음 턴에서 user-role 메시지로 주입
    → <task-notification> XML 형식

알림 상태:
  - 'completed': 정상 완료 + finalMessage + usage 통계
  - 'killed': 사용자 중단 + partialResult
  - 'failed': 에러 발생 + error 메시지

Worktree 결과 포함:
  - worktreePath: 변경사항 있을 때만 포함
  - worktreeBranch: 변경사항 있는 worktree의 브랜치명
```

---

## 스토리텔링 관련 노드/엣지

### 새 노드
| ID | Label | Layer | Category |
|----|-------|-------|----------|
| `agent_tool` | Agent Tool | tool | delegation |
| `run_agent` | runAgent() | engine | execution |
| `fork_subagent` | Fork Subagent | tool | delegation |
| `agent_definition` | Agent Definition | config | definition |
| `builtin_agents` | Built-in Agents | config | definition |
| `agent_type_system` | Agent Type System | config | definition |
| `agent_routing` | Agent Routing | control | routing |
| `worktree_isolation` | Worktree Isolation | infra | isolation |
| `agent_tool_filter` | Tool Filtering | control | security |
| `async_lifecycle` | Async Agent Lifecycle | engine | execution |
| `sync_agent_loop` | Sync Agent Loop | engine | execution |
| `agent_resume` | Agent Resume | engine | execution |
| `agent_notification` | Agent Notification | engine | communication |
| `agent_memory` | Agent Memory | data | persistence |
| `agent_mcp` | Agent MCP Servers | infra | integration |
| `cache_safe_params` | CacheSafeParams | engine | optimization |
| `teammate_spawn` | Teammate Spawn | tool | multiagent |
| `send_message` | SendMessage Tool | tool | communication |
| `agent_name_registry` | Agent Name Registry | data | routing |
| `handoff_classifier` | Handoff Classifier | control | security |
| `mid_flight_bg` | Mid-flight Backgrounding | control | execution |

### 새 엣지
| Source | Target | Type | Label |
|--------|--------|------|-------|
| `agent_tool` → `agent_routing` | triggers | 에이전트 타입 결정 + fork/일반 분기 |
| `agent_routing` → `fork_subagent` | routes | subagent_type 미지정 + FORK gate on |
| `agent_routing` → `builtin_agents` | routes | subagent_type 매칭 |
| `agent_routing` → `teammate_spawn` | routes | team_name + name 있을 때 |
| `agent_routing` → `worktree_isolation` | triggers | isolation === 'worktree' |
| `agent_routing` → `async_lifecycle` | triggers | shouldRunAsync 조건 충족 |
| `agent_routing` → `sync_agent_loop` | triggers | 동기 실행 경로 |
| `sync_agent_loop` → `mid_flight_bg` | enables | Promise.race(message, backgroundSignal) |
| `mid_flight_bg` → `async_lifecycle` | transitions | backgrounded 시 비동기 전환 |
| `fork_subagent` → `run_agent` | invokes | 부모 컨텍스트 + 시스템 프롬프트 상속 |
| `builtin_agents` → `run_agent` | invokes | 독립 시스템 프롬프트 + 도구 풀 |
| `run_agent` → `query_loop` | enters | query() AsyncGenerator 실행 |
| `run_agent` → `agent_tool_filter` | uses | resolveAgentTools() 도구 해석 |
| `run_agent` → `agent_mcp` | initializes | 에이전트 전용 MCP 서버 연결 |
| `run_agent` → `agent_memory` | loads | loadAgentMemoryPrompt() |
| `run_agent` → `cache_safe_params` | exposes | onCacheSafeParams 콜백 |
| `async_lifecycle` → `agent_notification` | emits | 완료/실패/중단 알림 |
| `async_lifecycle` → `handoff_classifier` | invokes | 보안 분류 (auto 모드) |
| `agent_resume` → `async_lifecycle` | feeds | 트랜스크립트 복원 + 재실행 |
| `send_message` → `agent_name_registry` | queries | 이름 → agentId 검색 |
| `send_message` → `agent_resume` | triggers | 중단된 에이전트 자동 재개 |
| `agent_definition` → `agent_type_system` | defines | BaseAgent → Built-in/Custom/Plugin |
| `worktree_isolation` → `run_agent` | wraps | runWithCwdOverride() |
| `agent_tool_filter` → `agent_definition` | reads | tools/disallowedTools 설정 |
| `cache_safe_params` → `fork_subagent` | optimizes | 바이트 동일 API prefix 공유 |

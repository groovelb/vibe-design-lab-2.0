# R2-A: Coordinator / Multi-Agent 오케스트레이션 분석

## 분석 파일 목록

| 파일 | 줄수 | 역할 |
|------|------|------|
| `src/coordinator/coordinatorMode.ts` | 370 | 코디네이터 모드 진입/시스템 프롬프트/세션 복원 |
| `src/tools/AgentTool/AgentTool.tsx` | 1,398 | 에이전트 스폰 핵심 도구 (동기/비동기/팀메이트) |
| `src/tools/AgentTool/builtInAgents.ts` | 73 | 코디네이터 모드별 빌트인 에이전트 전환 |
| `src/tools/TeamCreateTool/TeamCreateTool.ts` | 241 | 팀 생성 + config.json + 태스크 디렉토리 |
| `src/tools/TeamCreateTool/prompt.ts` | 114 | 팀 워크플로우 가이드 프롬프트 |
| `src/tools/TeamDeleteTool/TeamDeleteTool.ts` | 140 | 팀 정리 (active 멤버 체크 후 삭제) |
| `src/tools/TeamDeleteTool/prompt.ts` | 17 | 팀 삭제 프롬프트 |
| `src/tools/SendMessageTool/SendMessageTool.ts` | 918 | 에이전트 간 메시징 (일반/브로드캐스트/셧다운/플랜승인) |
| `src/tools/SendMessageTool/prompt.ts` | 50 | SendMessage 프롬프트 |
| `src/tools/TaskStopTool/TaskStopTool.ts` | 132 | 실행 중인 워커 강제 중단 |
| `src/tools/shared/spawnMultiAgent.ts` | 1,094 | 팀메이트 스폰 공유 모듈 (pane/in-process) |
| `src/utils/swarm/teamHelpers.ts` | 684 | TeamFile CRUD, 멤버 관리, 워크트리 정리 |
| `src/utils/swarm/inProcessRunner.ts` | 1,553 | in-process 팀메이트 실행 루프 (runAgent 래퍼) |
| `src/utils/swarm/spawnInProcess.ts` | 329 | in-process 팀메이트 스폰/킬 |
| `src/utils/swarm/constants.ts` | 34 | swarm 상수 (TEAM_LEAD_NAME 등) |
| `src/utils/swarm/backends/registry.ts` | 465 | 백엔드 감지 (tmux/iTerm2/in-process) |
| `src/utils/swarm/backends/types.ts` | 312 | 백엔드 타입 정의 (PaneBackend, TeammateExecutor) |
| `src/utils/swarm/backends/InProcessBackend.ts` | 340 | in-process 팀메이트 실행 백엔드 |
| `src/utils/agentSwarmsEnabled.ts` | 45 | 에이전트 스웜 활성화 게이트 |
| `src/utils/teammateMailbox.ts` | 1,184 | 파일 기반 메일박스 시스템 |
| `src/constants/tools.ts` | 114 | 모드별 도구 허용 목록 |
| **합계** | **~9,657** | |

---

## 핵심 발견

### 1. 이중 오케스트레이션 아키텍처: Coordinator Mode vs. Agent Swarms

Claude Code는 **두 가지** 독립적 멀티에이전트 패턴을 가진다:

```
┌──────────────────────────────────────────────────────────────────┐
│  Mode A: COORDINATOR_MODE (feature flag + env var)              │
│  ┌──────────┐     Agent()     ┌──────────┐                     │
│  │Coordinator├───────────────►│  Worker   │  (async subagent)   │
│  │ (only 4   │  SendMessage() │  Worker   │                     │
│  │  tools)   │◄──────────────►│  Worker   │                     │
│  └──────────┘   TaskStop()    └──────────┘                     │
│  도구: Agent, SendMessage, TaskStop, SyntheticOutput만 허용     │
│  워커 결과는 <task-notification> XML로 user 메시지에 주입       │
├──────────────────────────────────────────────────────────────────┤
│  Mode B: AGENT_SWARMS (env var/CLI flag + GrowthBook gate)     │
│  ┌──────────┐  TeamCreate()  ┌────────────┐                    │
│  │Team Lead  ├──────────────►│ Team File  │  ~/.claude/teams/  │
│  │           │  Agent(name,  │ config.json│                    │
│  │           │  team_name)   └──────┬─────┘                    │
│  │           │◄──SendMessage()──────┤                           │
│  │           │                ┌─────┴──────┐                   │
│  │           │                │ Teammates  │ (tmux/iTerm2/     │
│  │           │                │ (각자 별도  │  in-process)      │
│  │           │                │  프로세스)  │                   │
│  └──────────┘  TeamDelete()  └────────────┘                    │
│  팀메이트는 Task CRUD, SendMessage 등 사용 가능                │
└──────────────────────────────────────────────────────────────────┘
```

**핵심 차이**: Coordinator Mode는 코디네이터가 도구를 4개만 가지고 모든 실제 작업을 워커에 위임하는 "순수 오케스트레이터" 패턴. Agent Swarms는 팀 리더가 직접 도구를 사용하면서 동시에 팀메이트를 관리하는 "팀 리더" 패턴.

### 2. COORDINATOR_MODE 피처 플래그 동작 (coordinatorMode.ts L36-41)

```typescript
export function isCoordinatorMode(): boolean {
  if (feature('COORDINATOR_MODE')) {           // 빌드타임 dead code elimination
    return isEnvTruthy(process.env.CLAUDE_CODE_COORDINATOR_MODE)  // 런타임 env 체크
  }
  return false
}
```

- **빌드타임**: `feature('COORDINATOR_MODE')` — Bun bundler가 false 분기를 제거
- **런타임**: `CLAUDE_CODE_COORDINATOR_MODE` env var 확인
- **세션 복원**: `matchSessionMode()` — 재개된 세션의 모드가 현재 모드와 다르면 env var를 뒤집어서 일치시킴

### 3. 코디네이터 시스템 프롬프트 (coordinatorMode.ts L111-369)

`getCoordinatorSystemPrompt()`가 반환하는 370줄짜리 프롬프트가 코디네이터 행동을 정의한다:

```
코디네이터 시스템 프롬프트 구조:
├── 1. Your Role — "coordinator"로 자기인식
├── 2. Your Tools — Agent, SendMessage, TaskStop만 사용
│     └── <task-notification> XML 포맷으로 워커 결과 수신
├── 3. Workers — subagent_type: "worker"로 스폰
├── 4. Task Workflow
│     ├── Research (병렬 워커)
│     ├── Synthesis (코디네이터가 직접)   ← 핵심: "synthesize findings"
│     ├── Implementation (워커)
│     └── Verification (워커)
├── 5. Writing Worker Prompts
│     ├── 자기완결적(self-contained) 프롬프트 작성 필수
│     ├── "Based on your findings" 금지 (lazy delegation)
│     ├── continue vs. spawn 결정 기준: context overlap
│     └── SendMessage로 기존 워커 계속 활용
└── 6. Example Session — 완전한 2-turn 예시
```

**핵심 원칙**: 코디네이터는 워커 결과를 *이해*하고 구체적 구현 스펙으로 *합성*한 후에만 다음 단계를 지시해야 함.

### 4. 코디네이터 전용 도구 제한 (constants/tools.ts L107-112)

```typescript
export const COORDINATOR_MODE_ALLOWED_TOOLS = new Set([
  AGENT_TOOL_NAME,          // "Agent" — 워커 스폰
  TASK_STOP_TOOL_NAME,      // "TaskStop" — 워커 중단
  SEND_MESSAGE_TOOL_NAME,   // "SendMessage" — 워커와 통신
  SYNTHETIC_OUTPUT_TOOL_NAME, // "SyntheticOutput" — 구조화 출력
])
```

코디네이터는 Bash, Read, Edit, Write 등 실행 도구에 접근 불가. 모든 실제 작업은 워커를 통해서만 수행.

### 5. 코디네이터 모드 시 에이전트 정의 전환 (builtInAgents.ts L35-43)

```typescript
if (feature('COORDINATOR_MODE')) {
  if (isEnvTruthy(process.env.CLAUDE_CODE_COORDINATOR_MODE)) {
    const { getCoordinatorAgents } =
      require('../../coordinator/workerAgent.js')
    return getCoordinatorAgents()    // "worker" 에이전트만 반환
  }
}
// 기본: GENERAL_PURPOSE_AGENT, EXPLORE_AGENT, PLAN_AGENT 등
```

코디네이터 모드에서는 빌트인 에이전트가 "worker" 타입 하나로 교체됨. 일반 모드에서는 general-purpose, explore, plan, verification, claude-code-guide 등 다양한 에이전트 제공.

### 6. 워커 도구 컨텍스트 주입 (coordinatorMode.ts L80-108)

```typescript
export function getCoordinatorUserContext(
  mcpClients, scratchpadDir
): { [k: string]: string } {
  if (!isCoordinatorMode()) return {}

  // 워커가 사용 가능한 도구 목록을 코디네이터에게 알려줌
  const workerTools = isEnvTruthy(process.env.CLAUDE_CODE_SIMPLE)
    ? [BASH_TOOL_NAME, FILE_READ_TOOL_NAME, FILE_EDIT_TOOL_NAME]
    : Array.from(ASYNC_AGENT_ALLOWED_TOOLS)
        .filter(name => !INTERNAL_WORKER_TOOLS.has(name))

  // MCP 서버 정보 + 스크래치패드 디렉토리 안내
  if (scratchpadDir && isScratchpadGateEnabled()) {
    content += `\nScratchpad directory: ${scratchpadDir}
Workers can read and write here without permission prompts.`
  }
}
```

**스크래치패드**: `tengu_scratch` 게이트가 활성화되면 워커 간 영속적 지식 공유를 위한 공유 디렉토리 제공.

### 7. TeamCreate — 팀 생명주기 시작 (TeamCreateTool.ts)

```
TeamCreate 호출 흐름:
  1. 이미 팀 리딩 중이면 Error (1 리더 = 1 팀)
  2. 고유 팀 이름 생성 (충돌 시 wordSlug로 재생성)
  3. 리더 에이전트 ID: "team-lead@{teamName}" (결정적)
  4. TeamFile 생성 → ~/.claude/teams/{team-name}/config.json
  5. registerTeamForSessionCleanup() — 세션 종료 시 자동 정리 등록
  6. 태스크 리스트 디렉토리 → ~/.claude/tasks/{team-name}/
  7. AppState.teamContext 업데이트
  8. 로깅: tengu_team_created
```

**TeamFile 구조**:
```typescript
type TeamFile = {
  name: string
  createdAt: number
  leadAgentId: string          // "team-lead@{teamName}"
  leadSessionId?: string       // 실제 세션 UUID
  members: Array<{
    agentId: string            // "agentName@teamName"
    name: string               // 사람 읽기 가능한 이름
    agentType?: string
    model?: string
    isActive?: boolean         // false=idle, undefined/true=active
    mode?: PermissionMode
    tmuxPaneId: string
    cwd: string
    worktreePath?: string
    backendType?: BackendType  // 'tmux' | 'iterm2' | 'in-process'
    subscriptions: string[]
  }>
}
```

### 8. TeamDelete — 팀 정리 (TeamDeleteTool.ts)

```
TeamDelete 호출 흐름:
  1. 활성(active) 멤버 존재하면 거부 — 먼저 shutdown 필요
  2. cleanupTeamDirectories(teamName):
     a. 모든 멤버 worktree 제거 (git worktree remove)
     b. ~/.claude/teams/{team-name}/ 제거
     c. ~/.claude/tasks/{team-name}/ 제거
  3. unregisterTeamForSessionCleanup() — 이중 정리 방지
  4. clearTeammateColors() + clearLeaderTeamName()
  5. AppState: teamContext=undefined, inbox.messages=[]
```

**세션 종료 시 자동 정리**: `cleanupSessionTeams()` — SIGINT/SIGTERM 시 고아 팀 디렉토리 정리 + 고아 tmux/iTerm2 pane kill.

### 9. SendMessage — 에이전트 간 통신 프로토콜 (SendMessageTool.ts)

```
SendMessage 라우팅:
  ├── to="*" (브로드캐스트)
  │     └── 팀 파일에서 모든 멤버에게 writeToMailbox()
  ├── to="researcher" (일반 메시지)
  │     ├── 1차: appState.agentNameRegistry에서 in-process 에이전트 검색
  │     │     ├── running → queuePendingMessage() (다음 tool round에 전달)
  │     │     └── stopped → resumeAgentBackground() (자동 재개)
  │     └── 2차: writeToMailbox() (파일 기반)
  ├── to="bridge:session_..." (Remote Control)
  │     └── postInterClaudeMessage() (크로스 머신)
  ├── to="uds:/path/to.sock" (로컬 UDS)
  │     └── sendToUdsSocket()
  └── message={type: "shutdown_request"|"shutdown_response"|"plan_approval_response"}
        ├── shutdown_request → writeToMailbox(target, JSON)
        ├── shutdown_response + approve=true → abort + gracefulShutdown
        ├── shutdown_response + approve=false → writeToMailbox(team-lead, rejection)
        └── plan_approval_response → writeToMailbox(target, approval/rejection)
```

### 10. 메일박스 시스템 (teammateMailbox.ts)

```
파일 기반 메일박스:
  위치: ~/.claude/teams/{team_name}/inboxes/{agent_name}.json

  writeToMailbox(recipientName, message, teamName):
    1. lockfile으로 동시접근 보호 (retries: 10, minTimeout: 5ms)
    2. 기존 메시지 읽기
    3. 새 메시지 append (read: false)
    4. 원자적 쓰기

  readInbox(agentName, teamName):
    1. lockfile 획득
    2. JSON 파싱 후 반환

  구조화 메시지 타입:
    - shutdown_request: {requestId, from, reason?}
    - shutdown_approved: {requestId, from, paneId?, backendType?}
    - shutdown_rejected: {requestId, from, reason}
    - plan_approval: {requestId, from, approved, feedback?, permissionMode?}
    - idle_notification: {agentName, reason, lastToolUse, dmSummary?}
```

### 11. 팀메이트 스폰 3-Backend 아키텍처 (spawnMultiAgent.ts + backends/)

```
spawnTeammate()
  └── handleSpawn()
        ├── isInProcessEnabled() → handleSpawnInProcess()
        │     └── spawnInProcessTeammate() → startInProcessTeammate()
        │           ├── AsyncLocalStorage 기반 컨텍스트 격리
        │           ├── 독립 AbortController (리더 중단과 분리)
        │           └── 동일 프로세스에서 runAgent() 실행
        └── else → handleSpawnSplitPane()
              ├── detectAndGetBackend()
              │     ├── insideTmux → TmuxBackend (항상 우선)
              │     ├── inITerm2 + it2 → ITermBackend
              │     ├── inITerm2 + tmux → TmuxBackend (it2 설치 권유)
              │     └── tmux 가능 → TmuxBackend (외부 세션)
              ├── createTeammatePaneInSwarmView() — 시각적 분할 창
              └── sendCommandToPane() — claude CLI 명령 전송
```

**백엔드 감지 우선순위**:
1. tmux 안에서 실행 중 → tmux (항상)
2. iTerm2 + it2 CLI → iTerm2 네이티브 분할 창
3. iTerm2 + tmux → tmux (it2 설치 권유)
4. tmux 사용 가능 → tmux 외부 세션
5. 비대화형 세션(-p) → in-process (항상)
6. auto 모드 + 백엔드 없음 → in-process 폴백

### 12. In-Process 팀메이트 실행 (inProcessRunner.ts)

```
startInProcessTeammate():
  1. runWithTeammateContext() — AsyncLocalStorage로 격리된 컨텍스트
  2. runAgent() 래퍼:
     a. 도구 필터링: ASYNC_AGENT_ALLOWED_TOOLS + IN_PROCESS_TEAMMATE_ALLOWED_TOOLS
     b. 자동 컴팩션 (autoCompact)
     c. 메일박스 폴링 → pendingUserMessages
     d. idle 감지 → 리더에게 idle_notification 전송
     e. shutdown_request 처리 → abort 또는 rejection
  3. 완료 시: setMemberActive(false), idle 알림, AppState 업데이트

  컨텍스트 격리:
  ├── 독립 AbortController
  ├── 독립 메시지 히스토리
  ├── 동일 API 클라이언트 공유
  ├── 동일 MCP 연결 공유
  └── 파일 기반 메일박스로 통신
```

### 13. 코디네이터 모드의 워커 결과 수신 (coordinatorMode.ts L148-159)

워커가 완료되면 코디네이터에게 **user 메시지**로 XML을 주입:

```xml
<task-notification>
  <task-id>{agentId}</task-id>
  <status>completed|failed|killed</status>
  <summary>Agent "Investigate auth bug" completed</summary>
  <result>{agent의 최종 텍스트 응답}</result>
  <usage>
    <total_tokens>N</total_tokens>
    <tool_uses>N</tool_uses>
    <duration_ms>N</duration_ms>
  </usage>
</task-notification>
```

코디네이터는 이를 user 메시지처럼 수신하지만 `<task-notification>` 태그로 구별.

### 14. Agent Swarms 활성화 게이트 (agentSwarmsEnabled.ts)

```typescript
export function isAgentSwarmsEnabled(): boolean {
  // Ant(Anthropic 내부): 항상 활성화
  if (process.env.USER_TYPE === 'ant') return true

  // 외부: 옵트인 필수
  if (!isEnvTruthy(process.env.CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS)
      && !process.argv.includes('--agent-teams'))
    return false

  // 킬스위치: GrowthBook 'tengu_amber_flint' 게이트
  if (!getFeatureValue('tengu_amber_flint', true)) return false

  return true
}
```

TeamCreate, TeamDelete, SendMessage 도구의 `isEnabled()`이 모두 이 게이트를 확인.

### 15. AgentTool 이중 경로: 코디네이터 워커 vs. 팀메이트 스폰 (AgentTool.tsx L239-316)

```typescript
async call(input, toolUseContext, ...) {
  // 경로 1: team_name + name → 팀메이트 스폰 (Agent Swarms)
  if (teamName && name) {
    return spawnTeammate({...})  // tmux/iTerm2/in-process
  }

  // 경로 2: 일반 subagent (코디네이터 워커 포함)
  // fork subagent 실험 라우팅
  const effectiveType = subagent_type ??
    (isForkSubagentEnabled() ? undefined : GENERAL_PURPOSE_AGENT.agentType)

  // selectedAgent 결정 후 runAgent() 또는 async launch
  if (run_in_background || selectedAgent.background) {
    return runAsyncAgentLifecycle(...)  // 비동기 실행
  }
  return runAgent(...)  // 동기 실행
}
```

### 16. 셧다운 프로토콜 (SendMessageTool.ts L268-432)

```
Graceful Shutdown 흐름:
  1. 리더 → SendMessage(to: "researcher", message: {type: "shutdown_request"})
     └── handleShutdownRequest() → writeToMailbox(target)

  2. 팀메이트 → 메일박스에서 shutdown_request 수신
     └── 자율 판단: 진행 중 작업 완료 후 응답

  3a. 승인: SendMessage(to: "team-lead", message: {type: "shutdown_response", approve: true})
      └── handleShutdownApproval():
          ├── in-process → task.abortController.abort()
          └── pane-based → gracefulShutdown(0, 'other')

  3b. 거부: SendMessage(to: "team-lead", message: {type: "shutdown_response", approve: false, reason: "..."})
      └── handleShutdownRejection() → writeToMailbox(team-lead)
```

### 17. Plan Mode 승인 흐름 (SendMessageTool.ts L434-518)

```
Plan Mode Approval 흐름:
  1. 팀메이트 (plan_mode_required=true) → 구현 전 계획 수립
  2. 팀메이트 → 리더에게 plan_approval_request 전송
  3. 리더 → SendMessage(to: "researcher", message: {
       type: "plan_approval_response",
       request_id: "...",
       approve: true/false,
       feedback: "add error handling"  // 거부 시
     })
  4a. 승인 → 리더의 permissionMode 상속 (plan → default로 변환)
  4b. 거부 → 피드백과 함께 팀메이트에게 반려
```

### 18. 팀메이트 idle 상태 관리 (teamHelpers.ts L453-485)

```typescript
export async function setMemberActive(
  teamName: string, memberName: string, isActive: boolean
): Promise<void> {
  // config.json의 members[].isActive 필드 업데이트
  // false=idle (턴 종료), true=active (작업 중)
}
```

- 팀메이트는 매 턴 종료 후 자동으로 idle 상태
- idle != 종료. idle 팀메이트에게 SendMessage 전송 시 재활성화
- idle notification에 peer DM 요약 포함 → 리더에게 가시성 제공

### 19. 워크트리 격리 (teamHelpers.ts L492-551)

```
worktree 격리 모드:
  1. Agent(isolation: "worktree") → createAgentWorktree()
     └── git worktree add — 별도 디렉토리에서 독립 작업
  2. 정리: destroyWorktree()
     └── git worktree remove --force 또는 rm -rf 폴백
  3. TeamDelete 시 모든 멤버 worktreePath 순회하여 정리
```

### 20. SendMessage의 코디네이터 모드 라우팅 (SendMessageTool.ts L800-873)

코디네이터 모드에서 SendMessage(to: "agent-id")는:

```typescript
// 1차: appState.agentNameRegistry 또는 toAgentId()로 in-process task 검색
const task = appState.tasks[agentId]
if (isLocalAgentTask(task)) {
  if (task.status === 'running') {
    queuePendingMessage(agentId, message)  // 실행 중 → 큐잉
  } else {
    resumeAgentBackground({agentId, prompt: message})  // 중단됨 → 자동 재개
  }
}
```

코디네이터 모드에서의 SendMessage는 팀 기반 메일박스가 아닌 **in-process task 직접 라우팅**을 우선 시도.

---

## 스토리텔링 관련 노드/엣지

### 새 노드
| ID | Label | Layer | Category |
|----|-------|-------|----------|
| `coordinator_mode` | Coordinator Mode | control | orchestration |
| `agent_swarms` | Agent Swarms | control | orchestration |
| `team_create` | TeamCreate Tool | tool | lifecycle |
| `team_delete` | TeamDelete Tool | tool | lifecycle |
| `send_message` | SendMessage Tool | tool | communication |
| `task_stop` | TaskStop Tool | tool | lifecycle |
| `agent_tool` | Agent Tool | tool | execution |
| `team_file` | TeamFile (config.json) | data | state |
| `teammate_mailbox` | Teammate Mailbox | data | communication |
| `in_process_backend` | In-Process Backend | execution | backend |
| `pane_backend` | Pane Backend (tmux/iTerm2) | execution | backend |
| `backend_registry` | Backend Registry | control | detection |
| `spawn_multi_agent` | spawnMultiAgent | execution | spawn |
| `in_process_runner` | inProcessRunner | execution | agent-loop |
| `scratchpad` | Scratchpad Directory | data | shared-state |
| `task_notification` | Task Notification XML | protocol | communication |
| `shutdown_protocol` | Shutdown Protocol | protocol | lifecycle |
| `plan_approval` | Plan Approval Flow | protocol | permission |
| `worktree_isolation` | Worktree Isolation | execution | isolation |
| `coordinator_prompt` | Coordinator System Prompt | prompt | orchestration |

### 새 엣지
| Source | Target | Type | Label |
|--------|--------|------|-------|
| `coordinator_mode` | `coordinator_prompt` | activates | 코디네이터 시스템 프롬프트 주입 |
| `coordinator_mode` | `agent_tool` | restricts | 4개 도구만 허용 |
| `agent_tool` | `spawn_multi_agent` | delegates | 팀메이트 스폰 (name+team_name) |
| `agent_tool` | `in_process_runner` | delegates | 워커 실행 (코디네이터 모드) |
| `team_create` | `team_file` | creates | config.json + tasks/ 생성 |
| `team_delete` | `team_file` | destroys | 디렉토리 + 워크트리 정리 |
| `send_message` | `teammate_mailbox` | writes | 파일 기반 메시지 전송 |
| `send_message` | `in_process_runner` | routes | in-process 직접 큐잉 |
| `send_message` | `shutdown_protocol` | triggers | 셧다운 요청/응답 |
| `send_message` | `plan_approval` | triggers | 계획 승인/거절 |
| `task_stop` | `agent_tool` | controls | 실행 중 워커 중단 |
| `spawn_multi_agent` | `backend_registry` | queries | 백엔드 감지 |
| `backend_registry` | `pane_backend` | selects | tmux/iTerm2 선택 |
| `backend_registry` | `in_process_backend` | selects | in-process 선택 |
| `in_process_backend` | `in_process_runner` | starts | 에이전트 루프 시작 |
| `in_process_runner` | `teammate_mailbox` | polls | 메일박스 폴링 |
| `in_process_runner` | `team_file` | updates | isActive 상태 업데이트 |
| `task_notification` | `coordinator_mode` | delivers | 워커 결과를 user 메시지로 주입 |
| `agent_swarms` | `team_create` | enables | 팀 도구 활성화 |
| `coordinator_prompt` | `scratchpad` | references | 워커 간 공유 디렉토리 안내 |
| `worktree_isolation` | `team_file` | stores | 워크트리 경로 기록 |
| `team_delete` | `worktree_isolation` | cleans | 워크트리 정리 |

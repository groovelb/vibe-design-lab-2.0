# R4-E: 도구 시스템 아키텍처 분석

## 파일들
- `src/tools.ts` (391줄) — 도구 레지스트리/조립
- `src/Tool.ts` (299+줄) — 도구 타입 정의
- `src/services/tools/toolExecution.ts` — 도구 실행 엔진
- `src/utils/toolSearch.ts` — 도구 검색 시스템

---

## 핵심 발견

### 1. 전체 도구 인벤토리 — 40+ 도구

**항상 활성 (핵심 도구 16개)**:
| 도구 | 역할 |
|------|------|
| `AgentTool` | 서브에이전트 생성 |
| `BashTool` | 셸 명령 실행 |
| `FileReadTool` | 파일 읽기 |
| `FileEditTool` | 파일 편집 (diff) |
| `FileWriteTool` | 파일 쓰기 (전체) |
| `GlobTool` | 파일 패턴 검색 |
| `GrepTool` | 내용 검색 (ripgrep) |
| `NotebookEditTool` | Jupyter 노트북 편집 |
| `WebFetchTool` | URL 페치 |
| `WebSearchTool` | 웹 검색 |
| `TodoWriteTool` | TODO 관리 |
| `TaskOutputTool` | 태스크 출력 읽기 |
| `TaskStopTool` | 태스크 중지 |
| `AskUserQuestionTool` | 사용자 질문 |
| `SkillTool` | 스킬 호출 |
| `BriefTool` | Brief 모드 전환 |

**조건부 활성 (피처 플래그/환경)**:
| 도구 | 조건 | 역할 |
|------|------|------|
| `SleepTool` | PROACTIVE/KAIROS | 자율 에이전트 대기 |
| `CronCreate/Delete/ListTool` | AGENT_TRIGGERS | 크론 스케줄링 |
| `RemoteTriggerTool` | AGENT_TRIGGERS_REMOTE | 원격 트리거 |
| `MonitorTool` | MONITOR_TOOL | 모니터링 |
| `SendUserFileTool` | KAIROS | 파일 전송 |
| `PushNotificationTool` | KAIROS | 푸시 알림 |
| `SubscribePRTool` | KAIROS_GITHUB_WEBHOOKS | PR 웹훅 구독 |
| `WebBrowserTool` | WEB_BROWSER_TOOL | 브라우저 도구 |
| `CtxInspectTool` | CONTEXT_COLLAPSE | 컨텍스트 검사 |
| `TerminalCaptureTool` | TERMINAL_PANEL | 터미널 캡처 |
| `SnipTool` | HISTORY_SNIP | 히스토리 스닙 |
| `ListPeersTool` | UDS_INBOX | 피어 목록 |
| `WorkflowTool` | WORKFLOW_SCRIPTS | 워크플로우 |
| `OverflowTestTool` | OVERFLOW_TEST_TOOL | 오버플로우 테스트 |

**ant-only (내부 전용)**:
| 도구 | 역할 |
|------|------|
| `REPLTool` | REPL VM (Bash/Read/Edit 래핑) |
| `SuggestBackgroundPRTool` | 백그라운드 PR 제안 |
| `ConfigTool` | 설정 관리 |
| `TungstenTool` | Tungsten 시스템 (미상) |

**멀티에이전트 (조건부)**:
| 도구 | 조건 | 역할 |
|------|------|------|
| `TeamCreateTool` | isAgentSwarmsEnabled() | 팀 생성 |
| `TeamDeleteTool` | isAgentSwarmsEnabled() | 팀 삭제 |
| `SendMessageTool` | 항상 (import는 lazy) | 에이전트 간 메시지 |

**계획 모드**:
| 도구 | 역할 |
|------|------|
| `EnterPlanModeTool` | 계획 모드 진입 |
| `ExitPlanModeV2Tool` | 계획 모드 탈출 |
| `EnterWorktreeTool` | Worktree 격리 진입 |
| `ExitWorktreeTool` | Worktree 격리 탈출 |

**태스크 시스템** (isTodoV2Enabled):
| 도구 | 역할 |
|------|------|
| `TaskCreateTool` | 태스크 생성 |
| `TaskGetTool` | 태스크 조회 |
| `TaskUpdateTool` | 태스크 갱신 |
| `TaskListTool` | 태스크 목록 |

### 2. 3단계 도구 조립 파이프라인

```
getAllBaseTools()    — 모든 기본 도구 목록 (40+)
    ↓
getTools(permCtx)   — 권한 필터링 + 모드 필터링
    ↓
assembleToolPool()  — MCP 도구 병합 + 정렬 + 중복 제거
```

**assembleToolPool 설계 포인트**:
- 빌트인 도구가 MCP 도구보다 우선 (uniqBy — name 기준)
- 빌트인을 연속 prefix로 유지 — 프롬프트 캐시 안정성
- MCP 도구가 빌트인 사이에 끼면 캐시 키 무효화
- `byName` 정렬로 결정론적 순서 보장

### 3. Dead Code Elimination 패턴

```typescript
// 패턴 1: 피처 플래그 게이팅
const SleepTool = feature('PROACTIVE') || feature('KAIROS')
  ? require('./tools/SleepTool/SleepTool.js').SleepTool
  : null

// 패턴 2: 환경 변수 게이팅
const REPLTool = process.env.USER_TYPE === 'ant'
  ? require('./tools/REPLTool/REPLTool.js').REPLTool
  : null

// 패턴 3: Lazy require (순환 의존성 방지)
const getTeamCreateTool = () =>
  require('./tools/TeamCreateTool/TeamCreateTool.js').TeamCreateTool
```

- `feature()` = 컴파일 타임 → esbuild가 false 분기 완전 제거
- `process.env.USER_TYPE` = 빌드 타임 --define → 동일하게 DCE
- **외부 빌드에서는 ant-only, feature-gated 도구의 코드 자체가 존재하지 않음**

### 4. 임베디드 검색 도구 최적화

```typescript
// Ant 네이티브 빌드에서는 bfs/ugrep가 bun 바이너리에 임베드
...(hasEmbeddedSearchTools() ? [] : [GlobTool, GrepTool]),
```

- ant 내부 빌드: `bfs` (faster find), `ugrep` (faster grep)이 bun 바이너리에 포함
- 셸에서 find/grep이 자동 alias → 별도 Glob/Grep 도구 불필요
- 외부 빌드: 전용 Glob/Grep 도구 포함

### 5. REPL 모드 — VM 기반 도구 래핑

```typescript
if (isReplModeEnabled()) {
  // REPL이 활성화되면 원시 도구 숨김 (VM 내에서 접근)
  allowedTools = allowedTools.filter(
    tool => !REPL_ONLY_TOOLS.has(tool.name)
  )
}
```

- `REPLTool`이 Bash/Read/Edit 등을 VM 컨텍스트 안으로 래핑
- 모델에게는 REPL만 보임 → 도구 토큰 절감
- ant-only 기능

### 6. Simple 모드 — 최소 도구 세트

```typescript
if (isEnvTruthy(process.env.CLAUDE_CODE_SIMPLE)) {
  // Bash + FileRead + FileEdit 만
  const simpleTools = [BashTool, FileReadTool, FileEditTool]
  // 코디네이터 모드와 결합 가능
  if (coordinatorModeModule?.isCoordinatorMode()) {
    simpleTools.push(AgentTool, TaskStopTool, getSendMessageTool())
  }
}
```

### 7. ToolUseContext — 거대한 실행 컨텍스트 객체

```typescript
export type ToolUseContext = {
  options: {
    commands, debug, mainLoopModel, tools, verbose,
    thinkingConfig, mcpClients, mcpResources,
    agentDefinitions, maxBudgetUsd,
    customSystemPrompt, appendSystemPrompt
  }
  abortController: AbortController
  readFileState: FileStateCache
  getAppState / setAppState
  updateAttributionState        // 파일 변경 추적
  updateFileHistoryState        // 파일 히스토리
  setInProgressToolUseIDs       // 진행 중 도구 추적
  agentId / agentType           // 서브에이전트 식별
  messages: Message[]           // 전체 대화
  toolDecisions                 // 권한 결정 캐시
  contentReplacementState       // 도구 결과 예산
  renderedSystemPrompt          // 캐시 공유용 프롬프트
  ...
}
```

- **40+ 필드** — 도구 실행에 필요한 모든 컨텍스트
- `contentReplacementState`: 도구 결과 크기 예산 관리 (큰 결과 자동 요약)
- `renderedSystemPrompt`: 포크 서브에이전트가 부모의 프롬프트 캐시 공유

### 8. ToolSearchTool — 도구 지연 로딩

```typescript
// 도구 수가 많으면 자동 활성화 (MCP 도구 포함)
...(isToolSearchEnabledOptimistic() ? [ToolSearchTool] : []),
```

- MCP 서버가 많은 도구를 제공하면 **도구 검색 모드** 활성화
- 모든 도구를 시스템 프롬프트에 넣지 않고, 필요 시 검색
- `select:tool_name` 또는 키워드 검색으로 도구 로딩
- 토큰 절감 + 캐시 안정성 향상

### 9. 도구 권한 필터링

```typescript
export function filterToolsByDenyRules(tools, permCtx) {
  return tools.filter(tool => !getDenyRuleForTool(permCtx, tool))
}
```

- 거부 규칙(deny rules)에 매칭되는 도구는 모델에게 **보이지도 않음**
- MCP 서버 prefix 규칙 (`mcp__server`)으로 서버 전체 도구 차단 가능
- 런타임 호출 시 뿐 아니라 도구 목록 단계에서 사전 제거

---

## 스토리텔링 관련 노드/엣지

### 새 노드
| ID | Label | Layer | Category |
|----|-------|-------|----------|
| `tool_registry` | Tool Registry | engine | core |
| `tool_assembly` | Tool Assembly Pipeline | engine | core |
| `tool_search` | Tool Search (Deferred Loading) | engine | optimization |
| `repl_tool` | REPL VM Tool | engine | ant-only |
| `embedded_search` | Embedded Search (bfs/ugrep) | engine | ant-only |
| `tool_permission_filter` | Tool Permission Filter | engine | security |
| `tool_use_context` | ToolUseContext | engine | core |

### 새 엣지
| Source → Target | Type | Label |
|----------------|------|-------|
| `tool_registry` → `tool_assembly` | feeds | 40+ 도구 목록 |
| `tool_assembly` → `mcp_tools` | merges | MCP 도구 병합 |
| `tool_permission_filter` → `tool_assembly` | filters | deny rule 적용 |
| `feature_flags` → `tool_registry` | gates | DCE로 도구 제거 |
| `tool_search` → `tool_registry` | defers | 지연 로딩 |
| `repl_tool` → `tool_registry` | wraps | Bash/Read/Edit VM 래핑 |
| `tool_use_context` → `commit_attribution` | updates | 파일 변경 추적 |
